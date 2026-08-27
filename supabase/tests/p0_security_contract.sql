-- Run only after the P0 containment migration has been applied to an
-- isolated disposable database. This script is transactional and read-only
-- except for SET LOCAL state; it raises on any privilege regression.

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
    OR NOT ('search_path=' = ANY(function_search_path))
  THEN
    RAISE EXCEPTION 'handle_new_user search_path must be empty';
  END IF;

  IF to_regclass('public.production_projects') IS NOT NULL THEN
    IF has_table_privilege('anon', 'public.production_projects', 'SELECT')
      OR has_table_privilege(
        'authenticated',
        'public.production_projects',
        'SELECT, INSERT, UPDATE, DELETE'
      )
    THEN
      RAISE EXCEPTION 'production_projects must fail closed for Data API roles';
    END IF;
  END IF;
END;
$$;

ROLLBACK;
