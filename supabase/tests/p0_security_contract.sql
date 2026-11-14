-- Run only after the P0 containment migration has been applied to an
-- isolated disposable database. It creates disposable test rows inside one
-- transaction, raises on any privilege regression, and rolls everything back.

BEGIN;

DO $$
DECLARE
  role_policy_count integer;
  role_own_policy_count integer;
  function_search_path text[];
BEGIN
  IF NOT (
    SELECT relrowsecurity
    FROM pg_class
    WHERE oid = 'public.user_system_roles'::regclass
  ) THEN
    RAISE EXCEPTION 'user_system_roles RLS must be enabled';
  END IF;

  IF has_table_privilege('anon', 'public.user_system_roles', 'SELECT') THEN
    RAISE EXCEPTION 'anon must not read user_system_roles';
  END IF;

  IF has_table_privilege(
    'authenticated',
    'public.user_system_roles',
    'INSERT, UPDATE, DELETE'
  ) THEN
    RAISE EXCEPTION 'authenticated must not mutate user_system_roles';
  END IF;

  SELECT count(*)
  INTO role_policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'user_system_roles';

  SELECT count(*)
  INTO role_own_policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'user_system_roles'
    AND policyname = 'Users can view own system_role'
    AND cmd = 'SELECT'
    AND roles = ARRAY['authenticated']::name[];

  IF role_policy_count <> 1 OR role_own_policy_count <> 1 THEN
    RAISE EXCEPTION 'role table must expose only the authenticated own-row policy';
  END IF;

  IF has_table_privilege('anon', 'public.profiles', 'SELECT') THEN
    RAISE EXCEPTION 'anon must not read profiles directly';
  END IF;

  IF has_column_privilege(
    'authenticated',
    'public.profiles',
    'role',
    'UPDATE'
  ) THEN
    RAISE EXCEPTION 'authenticated must not update legacy profiles.role';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'kyc_status'
  ) AND has_column_privilege(
    'authenticated',
    'public.profiles',
    'kyc_status',
    'UPDATE'
  ) THEN
    RAISE EXCEPTION 'authenticated must not update profiles.kyc_status directly';
  END IF;

  IF has_function_privilege(
    'anon',
    'public.submit_own_kyc(text,text)',
    'EXECUTE'
  ) THEN
    RAISE EXCEPTION 'anon must not execute submit_own_kyc';
  END IF;

  IF NOT has_function_privilege(
    'authenticated',
    'public.submit_own_kyc(text,text)',
    'EXECUTE'
  ) THEN
    RAISE EXCEPTION 'authenticated must be able to execute submit_own_kyc';
  END IF;

  SELECT proconfig
  INTO function_search_path
  FROM pg_proc
  WHERE oid = 'public.handle_new_user()'::regprocedure;

  IF function_search_path IS NULL
    OR NOT EXISTS (
      SELECT 1
      FROM unnest(function_search_path) AS setting(value)
      WHERE value IN ('search_path=', 'search_path=""')
    )
  THEN
    RAISE EXCEPTION 'handle_new_user search_path must be empty';
  END IF;

  IF to_regclass('public.production_projects') IS NOT NULL THEN
    IF has_table_privilege('anon', 'public.production_projects', 'SELECT') THEN
      RAISE EXCEPTION 'production_projects must deny anon Data API access';
    END IF;
    IF NOT (
      SELECT relrowsecurity
      FROM pg_class
      WHERE oid = 'public.production_projects'::regclass
    ) THEN
      RAISE EXCEPTION 'production_projects must enforce member-aware RLS';
    END IF;
  END IF;
END;
$$;

-- Runtime RLS checks. The fixed UUIDs are reserved for this disposable,
-- transactional harness and are removed by the final ROLLBACK.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id IN (
      '00000000-0000-4000-8000-0000000000a1'::uuid,
      '00000000-0000-4000-8000-0000000000b2'::uuid
    )
  ) THEN
    RAISE EXCEPTION 'P0 test user UUID collision';
  END IF;
END;
$$;

INSERT INTO auth.users (
  id,
  email,
  aud,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES
  (
    '00000000-0000-4000-8000-0000000000a1'::uuid,
    'p0-user-a@example.invalid',
    'authenticated',
    'authenticated',
    '{}'::jsonb,
    '{"role":"executive","account_type":"client"}'::jsonb,
    now(),
    now()
  ),
  (
    '00000000-0000-4000-8000-0000000000b2'::uuid,
    'p0-user-b@example.invalid',
    'authenticated',
    'authenticated',
    '{}'::jsonb,
    '{"role":"admin","account_type":"freelancer"}'::jsonb,
    now(),
    now()
  );

DO $$
DECLARE
  user_a_role text;
  user_b_role text;
BEGIN
  SELECT system_role
  INTO user_a_role
  FROM public.user_system_roles
  WHERE user_id = '00000000-0000-4000-8000-0000000000a1'::uuid;

  SELECT system_role
  INTO user_b_role
  FROM public.user_system_roles
  WHERE user_id = '00000000-0000-4000-8000-0000000000b2'::uuid;

  IF user_a_role IS DISTINCT FROM 'user'
    OR user_b_role IS DISTINCT FROM 'user'
  THEN
    RAISE EXCEPTION 'forged metadata must not change the default system role';
  END IF;

  IF (SELECT count(*) FROM public.profiles WHERE id IN (
    '00000000-0000-4000-8000-0000000000a1'::uuid,
    '00000000-0000-4000-8000-0000000000b2'::uuid
  )) <> 2 OR NOT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = '00000000-0000-4000-8000-0000000000a1'::uuid
      AND account_type = 'client'
  ) OR NOT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = '00000000-0000-4000-8000-0000000000b2'::uuid
      AND account_type = 'freelancer'
  ) THEN
    RAISE EXCEPTION 'profile trigger must create validated account types';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id IN (
      '00000000-0000-4000-8000-0000000000a1'::uuid,
      '00000000-0000-4000-8000-0000000000b2'::uuid
    )
      AND role IN ('admin', 'executive')
  ) THEN
    RAISE EXCEPTION 'forged metadata must not populate a privileged legacy role';
  END IF;

  IF position(
    'ON CONFLICT (user_id) DO NOTHING'
    IN pg_get_functiondef(
      'public.handle_new_user_system_role()'::regprocedure
    )
  ) = 0 THEN
    RAISE EXCEPTION 'default role trigger must be idempotent';
  END IF;
END;
$$;

SET LOCAL ROLE anon;

DO $$
BEGIN
  BEGIN
    PERFORM 1
    FROM public.user_system_roles
    LIMIT 1;
    RAISE EXCEPTION 'anon unexpectedly read user_system_roles';
  EXCEPTION
    WHEN insufficient_privilege THEN
      NULL;
  END;
END;
$$;

RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT set_config(
  'request.jwt.claim.sub',
  '00000000-0000-4000-8000-0000000000a1',
  true
);

DO $$
DECLARE
  visible_role_count integer;
BEGIN
  SELECT count(*)
  INTO visible_role_count
  FROM public.user_system_roles;

  IF visible_role_count <> 1 OR NOT EXISTS (
    SELECT 1
    FROM public.user_system_roles
    WHERE user_id = '00000000-0000-4000-8000-0000000000a1'::uuid
      AND system_role = 'user'
  ) THEN
    RAISE EXCEPTION 'user A must see only its own default role';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.user_system_roles
    WHERE user_id = '00000000-0000-4000-8000-0000000000b2'::uuid
  ) THEN
    RAISE EXCEPTION 'user A unexpectedly read user B role';
  END IF;

  BEGIN
    UPDATE public.user_system_roles
    SET system_role = 'admin'
    WHERE user_id = '00000000-0000-4000-8000-0000000000a1'::uuid;
    RAISE EXCEPTION 'user A unexpectedly updated its system role';
  EXCEPTION
    WHEN insufficient_privilege THEN
      NULL;
  END;

  BEGIN
    INSERT INTO public.user_system_roles (user_id, system_role)
    VALUES (
      '00000000-0000-4000-8000-0000000000b2'::uuid,
      'admin'
    )
    ON CONFLICT (user_id) DO UPDATE
    SET system_role = EXCLUDED.system_role;
    RAISE EXCEPTION 'user A unexpectedly wrote user B role';
  EXCEPTION
    WHEN insufficient_privilege THEN
      NULL;
  END;

  BEGIN
    DELETE FROM public.user_system_roles
    WHERE user_id = '00000000-0000-4000-8000-0000000000a1'::uuid;
    RAISE EXCEPTION 'user A unexpectedly deleted its system role';
  EXCEPTION
    WHEN insufficient_privilege THEN
      NULL;
  END;
END;
$$;

SELECT set_config(
  'request.jwt.claim.sub',
  '00000000-0000-4000-8000-0000000000b2',
  true
);

DO $$
BEGIN
  IF (SELECT count(*) FROM public.user_system_roles) <> 1 OR NOT EXISTS (
    SELECT 1
    FROM public.user_system_roles
    WHERE user_id = '00000000-0000-4000-8000-0000000000b2'::uuid
      AND system_role = 'user'
  ) THEN
    RAISE EXCEPTION 'user B must see only its own default role';
  END IF;
END;
$$;

RESET ROLE;

ROLLBACK;
