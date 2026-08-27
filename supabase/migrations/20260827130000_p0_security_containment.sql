-- P0 containment migration.
-- Additive only: historical migrations remain immutable.
-- IMPORTANT: create/review locally; do not apply without explicit approval and
-- an isolated migration replay against an inventory of the target schema.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.user_system_roles') IS NULL THEN
    RAISE EXCEPTION 'P0 precondition failed: public.user_system_roles is missing';
  END IF;

  IF to_regclass('public.profiles') IS NULL THEN
    RAISE EXCEPTION 'P0 precondition failed: public.profiles is missing';
  END IF;
END;
$$;

CREATE SCHEMA IF NOT EXISTS mcos_private;
REVOKE ALL ON SCHEMA mcos_private FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION mcos_private.is_system_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_system_roles AS role_record
    WHERE role_record.user_id = (SELECT auth.uid())
      AND role_record.system_role IN ('admin', 'executive')
  );
$$;

REVOKE ALL ON FUNCTION mcos_private.is_system_admin()
  FROM PUBLIC, anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- System roles: client callers may read their own row only. Creation and
-- management are confined to trusted triggers/service-role code.
-- ---------------------------------------------------------------------
ALTER TABLE public.user_system_roles ENABLE ROW LEVEL SECURITY;

UPDATE public.user_system_roles
SET system_role = 'user'
WHERE system_role IS NULL;

ALTER TABLE public.user_system_roles
  ALTER COLUMN system_role SET DEFAULT 'user',
  ALTER COLUMN system_role SET NOT NULL;

DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_system_roles'
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON public.user_system_roles',
      policy_record.policyname
    );
  END LOOP;
END;
$$;

REVOKE ALL PRIVILEGES ON TABLE public.user_system_roles
  FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.user_system_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.user_system_roles
  TO service_role;

CREATE POLICY "Users can view own system_role"
  ON public.user_system_roles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user_system_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_system_roles (user_id, system_role)
  VALUES (new.id, 'user')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN new;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user_system_role()
  FROM PUBLIC, anon, authenticated;

-- ---------------------------------------------------------------------
-- Profiles: account_type is self-service; role and compliance decisions
-- are not. Column grants complement RLS because RLS alone cannot protect
-- individual columns.
-- ---------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON public.profiles',
      policy_record.policyname
    );
  END LOOP;
END;
$$;

REVOKE ALL PRIVILEGES ON TABLE public.profiles
  FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.profiles
  TO service_role;

CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

DO $$
DECLARE
  safe_column text;
BEGIN
  FOREACH safe_column IN ARRAY ARRAY[
    'full_name',
    'avatar_url',
    'bio',
    'experience_years',
    'account_type',
    'tax_id',
    'metadata'
  ]
  LOOP
    IF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'profiles'
        AND column_name = safe_column
    ) THEN
      EXECUTE format(
        'GRANT UPDATE (%I) ON TABLE public.profiles TO authenticated',
        safe_column
      );
    END IF;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  selected_account_type text;
BEGIN
  selected_account_type := CASE
    WHEN new.raw_user_meta_data->>'account_type' IN (
      'client',
      'freelancer',
      'agency'
    )
      THEN new.raw_user_meta_data->>'account_type'
    ELSE 'client'
  END;

  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    account_type
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    selected_account_type
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user()
  FROM PUBLIC, anon, authenticated;

-- The RPC deliberately uses dynamic SQL so a repository/target schema drift
-- fails closed at call time instead of granting direct writes to KYC columns.
CREATE OR REPLACE FUNCTION mcos_private.submit_own_kyc(
  p_document_path text,
  p_document_type text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  caller_id uuid := auth.uid();
  updated_rows integer;
  required_prefix text;
BEGIN
  IF caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  required_prefix := 'kyc-docs/' || caller_id::text || '/';

  IF p_document_path IS NULL
    OR length(p_document_path) > 512
    OR position(required_prefix IN p_document_path) <> 1
  THEN
    RAISE EXCEPTION 'Invalid KYC document path';
  END IF;

  IF p_document_type NOT IN ('national_id', 'passport') THEN
    RAISE EXCEPTION 'Invalid KYC document type';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name IN (
        'kyc_status',
        'kyc_submitted_at',
        'document_id',
        'document_type'
      )
    GROUP BY table_schema, table_name
    HAVING count(*) = 4
  ) THEN
    RAISE EXCEPTION 'KYC schema is incomplete';
  END IF;

  EXECUTE
    'UPDATE public.profiles
       SET kyc_status = $1,
           kyc_submitted_at = $2,
           document_id = $3,
           document_type = $4
     WHERE id = $5'
  USING 'pending', now(), p_document_path, p_document_type, caller_id;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;

  IF updated_rows <> 1 THEN
    RAISE EXCEPTION 'Authenticated profile not found';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION mcos_private.submit_own_kyc(text, text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT USAGE ON SCHEMA mcos_private TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.submit_own_kyc(text, text)
  TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_own_kyc(
  p_document_path text,
  p_document_type text
)
RETURNS void
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT mcos_private.submit_own_kyc($1, $2);
$$;

REVOKE ALL ON FUNCTION public.submit_own_kyc(text, text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.submit_own_kyc(text, text)
  TO authenticated;

-- ---------------------------------------------------------------------
-- The repository does not define production_projects ownership columns.
-- Remove direct Data API access until a membership-backed policy exists.
-- ---------------------------------------------------------------------
DO $$
DECLARE
  policy_record record;
BEGIN
  IF to_regclass('public.production_projects') IS NOT NULL THEN
    ALTER TABLE public.production_projects ENABLE ROW LEVEL SECURITY;

    FOR policy_record IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public'
        AND tablename = 'production_projects'
    LOOP
      EXECUTE format(
        'DROP POLICY %I ON public.production_projects',
        policy_record.policyname
      );
    END LOOP;

    REVOKE ALL PRIVILEGES ON TABLE public.production_projects
      FROM PUBLIC, anon, authenticated;
    GRANT SELECT, INSERT, UPDATE, DELETE
      ON TABLE public.production_projects
      TO service_role;
  END IF;
END;
$$;

-- Harden an environment-defined trigger function if it exists. This does not
-- enable, disable, create, or remove the trigger itself.
DO $$
BEGIN
  IF to_regprocedure('public.auto_confirm_email()') IS NOT NULL THEN
    EXECUTE 'ALTER FUNCTION public.auto_confirm_email() SET search_path = ''''';
    EXECUTE
      'REVOKE ALL ON FUNCTION public.auto_confirm_email()
       FROM PUBLIC, anon, authenticated';
  END IF;
END;
$$;

COMMENT ON TABLE public.user_system_roles IS
  'P0: privileged system roles; client access is own-row SELECT only';
COMMENT ON FUNCTION public.submit_own_kyc(text, text) IS
  'P0: authenticated self-submission only; operator decisions are separate';

COMMIT;
