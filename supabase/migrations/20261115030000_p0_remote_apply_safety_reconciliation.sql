-- Reconcile unsafe historical end states without rewriting migration history.
-- This migration assumes the full P0/P1 prerequisite chain is already present.
BEGIN;

-- Ensure legacy role access ends with own-row authenticated reads only.
ALTER TABLE public.user_system_roles ENABLE ROW LEVEL SECURITY;
DO $$
DECLARE
  policy_record record;
BEGIN
  FOR policy_record IN
    SELECT policyname
    FROM pg_catalog.pg_policies
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
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_system_roles
  TO service_role;
CREATE POLICY "Users can view own system_role"
  ON public.user_system_roles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Close storage table-level access for PUBLIC/anon and keep authenticated
-- access limited to the existing owner-scoped RLS policies.
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE storage.objects
  FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE storage.objects TO authenticated;
GRANT SELECT ON TABLE storage.objects TO service_role;
UPDATE storage.buckets
SET public = false
WHERE id = 'secure-vault' AND name = 'secure-vault';
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets
    WHERE id = 'secure-vault' AND name = 'secure-vault' AND public = false
  ) THEN
    RAISE EXCEPTION 'secure-vault must exist and remain private';
  END IF;
END;
$$;

-- Do not copy free-form profile bio into the authenticated marketplace
-- projection. Keep the approved-freelancer listing feature with display name
-- and experience; free-form skills/headline are omitted until explicit
-- publication consent exists.
CREATE OR REPLACE FUNCTION mcos_private.sync_published_freelancer_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.published_freelancer_profiles
    WHERE profile_id = OLD.id;
    RETURN OLD;
  END IF;

  IF NEW.account_type = 'freelancer' AND NEW.kyc_status = 'approved' THEN
    INSERT INTO public.published_freelancer_profiles (
      profile_id,
      display_name,
      headline,
      skills,
      experience_years,
      kyc_status_simplified
    )
    VALUES (
      NEW.id,
      coalesce(nullif(btrim(NEW.full_name), ''), 'مبدع منتيرلي'),
      NULL,
      '[]'::jsonb,
      NEW.experience_years,
      'approved'
    )
    ON CONFLICT (profile_id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        headline = NULL,
        skills = '[]'::jsonb,
        experience_years = EXCLUDED.experience_years,
        kyc_status_simplified = 'approved',
        updated_at = now();
  ELSE
    DELETE FROM public.published_freelancer_profiles
    WHERE profile_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION mcos_private.sync_published_freelancer_profile()
  FROM PUBLIC, anon, authenticated, service_role;
UPDATE public.profiles
SET bio = bio
WHERE account_type = 'freelancer' AND kyc_status = 'approved';
UPDATE public.published_freelancer_profiles
SET headline = NULL,
    skills = '[]'::jsonb,
    updated_at = now();

-- Financial history must not be deleted as a side effect of deleting a
-- transaction. RESTRICT forces an explicit, audited financial resolution.
ALTER TABLE public.financial_ledgers
  DROP CONSTRAINT IF EXISTS financial_ledgers_transaction_id_fkey,
  ADD CONSTRAINT financial_ledgers_transaction_id_fkey
    FOREIGN KEY (transaction_id)
    REFERENCES public.financial_transactions(id) ON DELETE RESTRICT;

-- Maintain a single callable finalizer and explicit service-role-only ACL.
-- The function body and mandatory idempotency key come from the immediately
-- preceding reconciliation migration; historical migration files remain
-- immutable. The migration chain still needs an atomic reviewed deployment
-- strategy because that earlier migration commits this function first.
DO $$
BEGIN
  IF to_regprocedure(
    'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)'
  ) IS NULL THEN
    RAISE EXCEPTION 'Required idempotent contract finalizer is missing';
  END IF;
  IF to_regprocedure(
    'public.finalize_generated_contract(uuid,text,text,numeric,date,text)'
  ) IS NOT NULL THEN
    RAISE EXCEPTION 'Legacy contract finalizer overload remains present';
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text, uuid
) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text, uuid
) TO service_role;

-- Preserve the account-type field's direct-write denial while allowing a
-- validated, caller-bound self-service choice through an RPC.
CREATE OR REPLACE FUNCTION public.set_own_account_type(p_account_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  caller_id uuid := auth.uid();
BEGIN
  IF caller_id IS NULL THEN
    RAISE EXCEPTION USING ERRCODE = '42501', MESSAGE = 'Authentication required';
  END IF;
  IF p_account_type IS NULL
    OR p_account_type NOT IN ('client', 'freelancer', 'agency') THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Invalid account type';
  END IF;

  UPDATE public.profiles
  SET account_type = p_account_type
  WHERE id = caller_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION USING ERRCODE = 'P0002', MESSAGE = 'Profile not found';
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.set_own_account_type(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_own_account_type(text) TO authenticated;

COMMIT;
