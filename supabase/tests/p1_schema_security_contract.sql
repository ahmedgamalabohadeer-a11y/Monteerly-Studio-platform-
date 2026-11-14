-- Disposable local-only contract checks. No remote database may run this file.
BEGIN;

DO $$
DECLARE
  required_table_name text;
  required_tables text[] := ARRAY[
    'projects', 'production_projects', 'production_project_members',
    'contracts', 'contract_revisions', 'legal_contracts',
    'financial_transactions', 'financial_ledgers', 'security_audit_logs',
    'published_freelancer_profiles', 'kyc_submissions',
    'kyc_document_retention', 'kyc_legal_holds', 'kyc_cleanup_claims'
  ];
BEGIN
  FOREACH required_table_name IN ARRAY required_tables LOOP
    IF to_regclass(format('public.%I', required_table_name)) IS NULL THEN
      RAISE EXCEPTION 'Required relation missing: %', required_table_name;
    END IF;
    IF NOT (
      SELECT relrowsecurity FROM pg_class
      WHERE oid = to_regclass(format('public.%I', required_table_name))
    ) THEN
      RAISE EXCEPTION 'RLS is disabled: %', required_table_name;
    END IF;
  END LOOP;

  IF has_table_privilege('anon', 'public.user_system_roles', 'SELECT')
    OR has_table_privilege('anon', 'public.profiles', 'SELECT')
    OR has_table_privilege('anon', 'public.published_freelancer_profiles', 'SELECT')
    OR has_table_privilege('anon', 'public.production_projects', 'SELECT')
    OR has_table_privilege('anon', 'public.security_audit_logs', 'SELECT') THEN
    RAISE EXCEPTION 'Anonymous read privilege remains on a protected table';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_system_roles'
      AND 'anon'::name = ANY(roles)
  ) THEN
    RAISE EXCEPTION 'Anonymous policy remains on user_system_roles';
  END IF;

  IF has_table_privilege(
    'authenticated', 'public.user_system_roles', 'INSERT, UPDATE, DELETE'
  ) OR has_table_privilege(
    'authenticated', 'public.financial_ledgers', 'INSERT, UPDATE, DELETE'
  ) OR has_table_privilege(
    'authenticated', 'public.security_audit_logs', 'SELECT, INSERT, UPDATE, DELETE'
  ) THEN
    RAISE EXCEPTION 'Authenticated write/read boundary is too broad';
  END IF;

  IF has_table_privilege('anon', 'public.kyc_submissions', 'SELECT')
    OR has_table_privilege('authenticated', 'public.kyc_submissions', 'SELECT')
    OR has_table_privilege('anon', 'public.kyc_document_retention', 'SELECT')
    OR has_table_privilege('authenticated', 'public.kyc_document_retention', 'SELECT')
    OR has_table_privilege('anon', 'public.kyc_legal_holds', 'SELECT')
    OR has_table_privilege('authenticated', 'public.kyc_legal_holds', 'SELECT') THEN
    RAISE EXCEPTION 'KYC metadata is directly readable by client roles';
  END IF;

  IF (
    SELECT count(*) FROM pg_proc AS function_record
    JOIN pg_namespace AS namespace_record
      ON namespace_record.oid = function_record.pronamespace
    WHERE namespace_record.nspname = 'public'
      AND function_record.proname = 'finalize_generated_contract'
  ) <> 1
    OR to_regprocedure(
      'public.finalize_generated_contract(uuid,text,text,numeric,date,text)'
    ) IS NOT NULL
    OR to_regprocedure(
      'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)'
    ) IS NULL
    OR (
      SELECT function_record.proargdefaults IS NOT NULL
        OR pg_get_function_result(function_record.oid) <> 'TABLE(success boolean)'
      FROM pg_proc AS function_record
      WHERE function_record.oid = to_regprocedure(
        'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)'
      )
    )
    OR EXISTS (
      SELECT 1
      FROM pg_proc AS function_record
      CROSS JOIN LATERAL aclexplode(function_record.proacl) AS permission
      WHERE function_record.oid = to_regprocedure(
        'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)'
      )
        AND permission.grantee = 0
        AND permission.privilege_type = 'EXECUTE'
    )
    OR has_function_privilege(
      'anon', 'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)', 'EXECUTE'
    )
    OR has_function_privilege(
      'authenticated', 'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)', 'EXECUTE'
    )
    OR NOT has_function_privilege(
      'service_role', 'public.finalize_generated_contract(uuid,text,text,numeric,date,text,uuid)', 'EXECUTE'
    ) THEN
    RAISE EXCEPTION 'Contract finalization RPC privilege boundary is invalid';
  END IF;

  IF has_function_privilege(
    'anon', 'public.claim_kyc_object_cleanup(text)', 'EXECUTE'
  ) OR has_function_privilege(
    'authenticated', 'public.claim_kyc_object_cleanup(text)', 'EXECUTE'
  ) THEN
    RAISE EXCEPTION 'KYC cleanup claim RPC is exposed to clients';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets
    WHERE id = 'secure-vault' AND name = 'secure-vault' AND public = false
  ) THEN
    RAISE EXCEPTION 'secure-vault must be private';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns AS column_record
    WHERE column_record.table_schema = 'public'
      AND column_record.table_name = 'published_freelancer_profiles'
      AND column_record.column_name = 'experience_years'
      AND column_record.is_nullable = 'YES'
  ) OR NOT EXISTS (
    SELECT 1 FROM information_schema.columns AS column_record
    WHERE column_record.table_schema = 'public'
      AND column_record.table_name = 'published_freelancer_profiles'
      AND column_record.column_name = 'rating'
      AND column_record.is_nullable = 'YES'
  ) THEN
    RAISE EXCEPTION 'Marketplace experience/rating nullability is incorrect';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.contract_revisions'::regclass
      AND conname = 'contract_revisions_contract_version_unique'
  ) THEN
    RAISE EXCEPTION 'Contract revision uniqueness constraint is missing';
  END IF;

  IF (
    SELECT column_default FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'financial_ledgers'
      AND column_name = 'currency'
  ) IS DISTINCT FROM '''EGP''::text'
    OR EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'public.financial_ledgers'::regclass
        AND contype = 'c'
        AND pg_get_constraintdef(oid) ILIKE '%currency%USD%'
    ) THEN
    RAISE EXCEPTION 'Global financial ledger currency contract is not EGP-default without USD-only constraint';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.financial_ledgers'::regclass
      AND conname = 'financial_ledgers_transaction_id_fkey'
      AND confdeltype = 'c'
  ) OR NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.financial_ledgers'::regclass
      AND conname = 'financial_ledgers_user_id_fkey'
      AND confdeltype = 'a'
  ) THEN
    RAISE EXCEPTION 'Financial ledger FK delete actions do not match latest owner contract';
  END IF;
END;
$$;

-- Build isolated Auth/profile fixtures and verify a single-RPC finalization.
CREATE TEMP TABLE p1_fixture_ids (
  actor_id uuid NOT NULL,
  member_id uuid NOT NULL,
  outsider_id uuid NOT NULL,
  project_id uuid NOT NULL,
  request_key uuid NOT NULL DEFAULT gen_random_uuid(),
  legal_contract_id uuid,
  ledger_id uuid
);

-- The authenticated role reads these disposable identifiers during RLS
-- checks; keep the grant scoped to this temporary fixture and transaction.
GRANT SELECT ON p1_fixture_ids TO authenticated;
GRANT SELECT ON p1_fixture_ids TO service_role;

DO $$
DECLARE
  actor_id uuid := gen_random_uuid();
  member_id uuid := gen_random_uuid();
  outsider_id uuid := gen_random_uuid();
  project_id uuid;
BEGIN
  INSERT INTO auth.users (
    id, email, aud, role, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at
  ) VALUES
    (actor_id, 'p1-actor@example.invalid', 'authenticated', 'authenticated',
      '{}'::jsonb, '{}'::jsonb, now(), now()),
    (member_id, 'p1-member@example.invalid', 'authenticated', 'authenticated',
      '{}'::jsonb, '{"account_type":"freelancer"}'::jsonb, now(), now()),
    (outsider_id, 'p1-outsider@example.invalid', 'authenticated', 'authenticated',
      '{}'::jsonb, '{}'::jsonb, now(), now());

  UPDATE public.user_system_roles
  SET system_role = 'admin'
  WHERE user_id = actor_id;

  UPDATE public.profiles
  SET account_type = 'freelancer',
      kyc_status = 'approved',
      full_name = 'Local test profile',
      bio = 'Design, production',
      experience_years = 4
  WHERE id = member_id;

  INSERT INTO public.production_projects (client_id, title, project_name)
  VALUES (actor_id, 'local test', 'local test')
  RETURNING id INTO project_id;

  INSERT INTO public.production_project_members (
    project_id, user_id, role, capabilities, status
  ) VALUES (project_id, member_id, 'viewer', '[]'::jsonb, 'active');

  INSERT INTO p1_fixture_ids (actor_id, member_id, outsider_id, project_id)
  VALUES (actor_id, member_id, outsider_id, project_id);
END;
$$;

-- Inject a ledger-stage failure and prove the RPC transaction leaves no partial
-- canonical, legal, production, ledger, or audit records.
CREATE FUNCTION public.p1_fail_generated_ledger_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.client_name = 'P1 rollback failure' THEN
    RAISE EXCEPTION USING
      ERRCODE = 'P0001',
      MESSAGE = 'p1 forced ledger insert failure';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.p1_fail_generated_ledger_insert()
  FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER p1_fail_generated_ledger_insert
BEFORE INSERT ON public.financial_ledgers
FOR EACH ROW
EXECUTE FUNCTION public.p1_fail_generated_ledger_insert();

DO $$
DECLARE
  fixture record;
  failure_key uuid := gen_random_uuid();
  failure_message text;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;

  BEGIN
    PERFORM * FROM public.finalize_generated_contract(
      fixture.actor_id,
      'service',
      'P1 rollback failure',
      1200.50,
      CURRENT_DATE + 30,
      'Local-only rollback test draft',
      failure_key
    );
    RAISE EXCEPTION 'Injected ledger failure did not abort finalization';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    GET STACKED DIAGNOSTICS failure_message = MESSAGE_TEXT;
    IF failure_message <> 'p1 forced ledger insert failure' THEN
      RAISE;
    END IF;
  END;

  IF EXISTS (
    SELECT 1 FROM public.legal_contracts
    WHERE idempotency_key = failure_key
  ) OR EXISTS (
    SELECT 1 FROM public.projects
    WHERE client_id = fixture.actor_id
      AND project_name = 'مشروع: P1 rollback failure'
  ) OR EXISTS (
    SELECT 1
    FROM public.contracts AS canonical_contract
    JOIN public.projects AS canonical_project
      ON canonical_project.id = canonical_contract.project_id
    WHERE canonical_contract.client_id = fixture.actor_id
      AND canonical_project.project_name = 'مشروع: P1 rollback failure'
  ) OR EXISTS (
    SELECT 1 FROM public.production_projects
    WHERE client_id = fixture.actor_id
      AND project_name = 'إنتاج: P1 rollback failure'
  ) OR EXISTS (
    SELECT 1 FROM public.financial_ledgers
    WHERE client_name = 'P1 rollback failure'
  ) OR EXISTS (
    SELECT 1 FROM public.security_audit_logs
    WHERE actor_id = fixture.actor_id
      AND metadata->>'idempotency_key' = failure_key::text
  ) THEN
    RAISE EXCEPTION 'Mid-finalization failure left partial contract records';
  END IF;
END;
$$;

DROP TRIGGER p1_fail_generated_ledger_insert ON public.financial_ledgers;
DROP FUNCTION public.p1_fail_generated_ledger_insert();

DO $$
DECLARE
  fixture record;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;
  IF NOT EXISTS (
    SELECT 1 FROM public.published_freelancer_profiles
    WHERE profile_id = fixture.member_id
      AND experience_years = 4
      AND rating IS NULL
  ) THEN
    RAISE EXCEPTION 'Approved freelancer projection or independent rating is invalid';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'published_freelancer_profiles'
      AND column_name IN (
        'email', 'tax_id', 'document_id', 'document_type', 'metadata'
      )
  ) THEN
    RAISE EXCEPTION 'Marketplace projection contains a protected profile field';
  END IF;
END;
$$;

SET LOCAL ROLE anon;
DO $$
BEGIN
  BEGIN
    PERFORM 1 FROM public.published_freelancer_profiles LIMIT 1;
    RAISE EXCEPTION 'anon unexpectedly selected marketplace projection';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END;
$$;
RESET ROLE;

SET LOCAL ROLE authenticated;
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT member_id::text FROM p1_fixture_ids),
  true
);
DO $$
DECLARE
  fixture record;
  changed_rows integer;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;
  IF NOT EXISTS (
    SELECT 1 FROM public.published_freelancer_profiles
    WHERE profile_id = fixture.member_id
  ) THEN
    RAISE EXCEPTION 'Authenticated marketplace projection read failed';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.profiles WHERE id = fixture.actor_id
  ) THEN
    RAISE EXCEPTION 'Cross-user profile read was not denied';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.production_projects
    WHERE id = fixture.project_id
  ) THEN
    RAISE EXCEPTION 'Active project member could not read the project';
  END IF;
  UPDATE public.production_projects SET title = 'forbidden'
  WHERE id = fixture.project_id;
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 0 THEN
    RAISE EXCEPTION 'Viewer membership unexpectedly updated a project';
  END IF;
  BEGIN
    INSERT INTO public.production_project_members (
      project_id, user_id, role
    ) VALUES (fixture.project_id, fixture.member_id, 'owner');
    RAISE EXCEPTION 'Client directly inserted a project membership';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END;
$$;

SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT outsider_id::text FROM p1_fixture_ids),
  true
);
DO $$
DECLARE
  fixture record;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;
  IF EXISTS (
    SELECT 1 FROM public.production_projects
    WHERE id = fixture.project_id
  ) THEN
    RAISE EXCEPTION 'Non-member unexpectedly read a production project';
  END IF;
END;
$$;
RESET ROLE;

-- Loss of account-type eligibility hard-deletes the public projection.
UPDATE public.profiles
SET account_type = 'client'
WHERE id = (SELECT member_id FROM p1_fixture_ids);
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.published_freelancer_profiles
    WHERE profile_id = (SELECT member_id FROM p1_fixture_ids)
  ) THEN
    RAISE EXCEPTION 'Marketplace projection survived account-type eligibility loss';
  END IF;
END;
$$;

-- Runtime Storage RLS checks use transaction-only object metadata fixtures.
-- No bytes are uploaded or removed by this SQL harness.
INSERT INTO storage.objects (bucket_id, name, owner_id, metadata)
SELECT 'secure-vault', 'kyc-docs/' || member_id::text || '/p1-storage.pdf',
       member_id::text, '{"mimetype":"application/pdf","size":64}'::jsonb
FROM p1_fixture_ids
UNION ALL
SELECT 'secure-vault', 'kyc-docs/' || actor_id::text || '/p1-storage.pdf',
       actor_id::text, '{"mimetype":"application/pdf","size":64}'::jsonb
FROM p1_fixture_ids;

SET LOCAL ROLE anon;
DO $$
BEGIN
  BEGIN
    IF EXISTS (
      SELECT 1 FROM storage.objects WHERE bucket_id = 'secure-vault'
    ) THEN
      RAISE EXCEPTION 'anon unexpectedly read KYC Storage metadata';
    END IF;
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
  BEGIN
    INSERT INTO storage.objects (bucket_id, name)
    VALUES ('secure-vault', 'kyc-docs/anon/p1-write.pdf');
    RAISE EXCEPTION 'anon unexpectedly inserted KYC Storage metadata';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END;
$$;
RESET ROLE;

SET LOCAL ROLE authenticated;
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT outsider_id::text FROM p1_fixture_ids),
  true
);
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM storage.objects WHERE bucket_id = 'secure-vault'
  ) THEN
    RAISE EXCEPTION 'Authenticated user read another KYC Storage object';
  END IF;
  BEGIN
    INSERT INTO storage.objects (bucket_id, name)
    VALUES ('secure-vault', 'kyc-docs/another-user/p1-write.pdf');
    RAISE EXCEPTION 'Authenticated user wrote outside its KYC path';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END;
$$;
RESET ROLE;

CREATE TEMP TABLE p1_kyc_fixture (profile_id uuid NOT NULL, document_path text NOT NULL);
GRANT SELECT ON p1_kyc_fixture TO authenticated;
INSERT INTO p1_kyc_fixture
SELECT actor_id, 'kyc-docs/' || actor_id::text || '/p1-kyc.pdf'
FROM p1_fixture_ids;
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT profile_id::text FROM p1_kyc_fixture),
  true
);
SET LOCAL ROLE authenticated;
DO $$
DECLARE
  test_path text := (SELECT document_path FROM p1_kyc_fixture);
  expected_error text;
  observed_error text;
BEGIN
  expected_error := 'Invalid KYC document path';
  BEGIN
    PERFORM public.submit_own_kyc(
      'kyc-docs/' || (SELECT profile_id::text FROM p1_kyc_fixture)
        || '/nested/p1-kyc.pdf',
      'national_id'
    );
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM expected_error THEN
    RAISE EXCEPTION 'KYC RPC path validation returned an unexpected outcome';
  END IF;

  observed_error := NULL;
  expected_error := 'Invalid KYC document type';
  BEGIN
    PERFORM public.submit_own_kyc(test_path, 'unknown');
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM expected_error THEN
    RAISE EXCEPTION 'KYC RPC document type validation returned an unexpected outcome';
  END IF;

  observed_error := NULL;
  expected_error := 'KYC document object is missing';
  BEGIN
    PERFORM public.submit_own_kyc(test_path, 'national_id');
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM expected_error THEN
    RAISE EXCEPTION 'KYC RPC did not reject a missing Storage object';
  END IF;

  IF (SELECT kyc_status FROM public.profiles
      WHERE id = (SELECT profile_id FROM p1_kyc_fixture)) <> 'none' THEN
    RAISE EXCEPTION 'Rejected KYC RPC changed profile state';
  END IF;

  -- This transaction-only metadata row allows testing the submission path.
  -- It does not represent or verify bytes in the backing object store.
  INSERT INTO storage.objects (bucket_id, name, metadata)
  VALUES (
    'secure-vault', test_path,
    '{"mimetype":"application/pdf","size":64}'::jsonb
  );
  PERFORM public.submit_own_kyc(test_path, 'national_id');

  observed_error := NULL;
  expected_error := 'KYC submission is not allowed in the current state';
  BEGIN
    PERFORM public.submit_own_kyc(test_path, 'national_id');
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM expected_error THEN
    RAISE EXCEPTION 'KYC RPC did not reject duplicate pending submission';
  END IF;
END;
$$;
RESET ROLE;

DO $$
DECLARE
  v_profile_id uuid := (SELECT profile_id FROM p1_kyc_fixture);
BEGIN
  -- Simulate a server/service-role review context with no end-user JWT.
  PERFORM set_config('request.jwt.claim.sub', '', true);
  PERFORM public.review_kyc_request(v_profile_id, 'approved', v_profile_id, NULL);
END;
$$;
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT profile_id::text FROM p1_kyc_fixture),
  true
);
SET LOCAL ROLE authenticated;
DO $$
DECLARE
  observed_error text;
BEGIN
  BEGIN
    PERFORM public.submit_own_kyc(
      (SELECT document_path FROM p1_kyc_fixture), 'national_id'
    );
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM
    'KYC submission is not allowed in the current state' THEN
    RAISE EXCEPTION 'KYC RPC did not reject resubmission after approval';
  END IF;
END;
$$;
RESET ROLE;
DO $$
DECLARE
  v_profile_id uuid := (SELECT profile_id FROM p1_kyc_fixture);
BEGIN
  IF (SELECT count(*) FROM public.kyc_submissions AS submission
      WHERE submission.profile_id = v_profile_id) <> 1
    OR NOT EXISTS (
      SELECT 1 FROM public.security_audit_logs
      WHERE actor_id = v_profile_id
        AND action = 'kyc_submitted'
        AND resource_id = v_profile_id
    ) THEN
    RAISE EXCEPTION 'KYC submission or audit record was not created exactly once';
  END IF;

  UPDATE storage.objects
  SET created_at = now() - interval '31 days'
  WHERE name = (SELECT document_path FROM p1_kyc_fixture)
    AND bucket_id = 'secure-vault';
  IF EXISTS (
    SELECT 1 FROM public.kyc_cleanup_candidates() AS candidate
    WHERE candidate.object_path = (SELECT document_path FROM p1_kyc_fixture)
  ) THEN
    RAISE EXCEPTION 'Orphan cleanup selected an object linked to a valid KYC submission';
  END IF;
END;
$$;

-- Rejected requests may submit again after a new object is present.
DO $$
DECLARE
  v_profile_id uuid := (SELECT outsider_id FROM p1_fixture_ids);
  v_document_path text;
BEGIN
  v_document_path := 'kyc-docs/' || v_profile_id::text || '/p1-retry.pdf';
  UPDATE public.profiles SET kyc_status = 'rejected' WHERE id = v_profile_id;
  INSERT INTO storage.objects (bucket_id, name, owner_id, metadata)
  VALUES (
    'secure-vault', v_document_path, v_profile_id::text,
    '{"mimetype":"application/pdf","size":64}'::jsonb
  );
END;
$$;
SELECT set_config(
  'request.jwt.claim.sub',
  (SELECT outsider_id::text FROM p1_fixture_ids),
  true
);
SET LOCAL ROLE authenticated;
DO $$
DECLARE
  v_profile_id uuid := (SELECT outsider_id FROM p1_fixture_ids);
  v_document_path text := 'kyc-docs/' || v_profile_id::text || '/p1-retry.pdf';
BEGIN
  PERFORM public.submit_own_kyc(v_document_path, 'passport');
END;
$$;
RESET ROLE;
DO $$
DECLARE
  v_profile_id uuid := (SELECT outsider_id FROM p1_fixture_ids);
BEGIN
  IF (SELECT kyc_status FROM public.profiles WHERE id = v_profile_id) <> 'pending'
    OR (SELECT count(*) FROM public.kyc_submissions
        WHERE profile_id = v_profile_id) <> 1 THEN
    RAISE EXCEPTION 'Rejected KYC profile could not submit a new audited attempt';
  END IF;
END;
$$;
SET LOCAL ROLE service_role;
DO $$
DECLARE
  v_profile_id uuid := (SELECT outsider_id FROM p1_fixture_ids);
  observed_error text;
BEGIN
  BEGIN
    PERFORM public.review_kyc_request(
      v_profile_id, 'rejected', v_profile_id, 'unauthorized test'
    );
  EXCEPTION WHEN OTHERS THEN observed_error := SQLERRM;
  END;
  IF observed_error IS DISTINCT FROM 'KYC reviewer role required' THEN
    RAISE EXCEPTION 'Unauthorized KYC reviewer role was not rejected';
  END IF;
END;
$$;
RESET ROLE;

-- This harness proves no PostgreSQL Changes publication currently exposes
-- project membership data. End-to-end Realtime delivery remains unverified.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        'projects', 'production_projects', 'production_project_members'
      )
  ) THEN
    RAISE EXCEPTION 'Project tables unexpectedly appear in a Realtime publication';
  END IF;
END;
$$;

-- The legal-hold writer and cleanup claimant serialize on the same advisory
-- lock. A hold blocks a claim; an active claim makes a hold request fail.
DO $$
DECLARE
  fixture record;
  test_path text := 'kyc-docs/local-redacted/orphan.png';
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;
  INSERT INTO public.kyc_legal_holds (object_path, reason, set_by)
  VALUES (test_path, 'local contract test', fixture.actor_id);
  BEGIN
    PERFORM public.claim_kyc_object_cleanup(test_path);
    RAISE EXCEPTION 'Cleanup claim bypassed active legal hold';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM = 'Cleanup claim bypassed active legal hold' THEN
      RAISE;
    END IF;
  END;

  DELETE FROM public.kyc_legal_holds WHERE object_path = test_path;
  INSERT INTO public.kyc_cleanup_claims (
    object_path, claim_id, claimed_at, claim_until
  ) VALUES (test_path, gen_random_uuid(), now(), now() + interval '5 minutes');
  BEGIN
    PERFORM public.set_kyc_legal_hold(
      test_path, 'local race check', fixture.actor_id, true
    );
    RAISE EXCEPTION 'Legal hold unexpectedly raced an active cleanup claim';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM = 'Legal hold unexpectedly raced an active cleanup claim' THEN
      RAISE;
    END IF;
  END;
END;
$$;

DO $$
DECLARE
  fixture record;
  finalization_success boolean;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;

  SELECT result.success INTO finalization_success
  FROM public.finalize_generated_contract(
    fixture.actor_id,
    'service',
    'Local test client',
    1200.50,
    CURRENT_DATE + 30,
    'Local-only test draft',
    fixture.request_key
  ) AS result;

  IF finalization_success IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'Generated contract finalizer did not report success';
  END IF;
END;
$$;

UPDATE p1_fixture_ids AS fixture
SET legal_contract_id = legal.id
FROM public.legal_contracts AS legal
WHERE legal.idempotency_key = fixture.request_key;

-- An identical retry must return success without creating another record set.
DO $$
DECLARE
  fixture record;
  repeated_success boolean;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids;

  SELECT result.success INTO repeated_success
  FROM public.finalize_generated_contract(
    fixture.actor_id,
    'service',
    'Local test client',
    1200.50,
    CURRENT_DATE + 30,
    'Local-only test draft',
    fixture.request_key
  ) AS result;

  IF repeated_success IS DISTINCT FROM true OR (
    SELECT count(*) FROM public.legal_contracts
    WHERE idempotency_key = fixture.request_key
  ) <> 1 THEN
    RAISE EXCEPTION 'Identical idempotency retry created duplicate legal records';
  END IF;

  BEGIN
    PERFORM * FROM public.finalize_generated_contract(
      fixture.actor_id,
      'service',
      'Different client name',
      1200.50,
      CURRENT_DATE + 30,
      'Local-only test draft',
      fixture.request_key
    );
    RAISE EXCEPTION 'Idempotency key unexpectedly accepted a different payload';
  EXCEPTION WHEN SQLSTATE '22023' THEN
    NULL;
  END;

  BEGIN
    PERFORM * FROM public.finalize_generated_contract(
      fixture.member_id,
      'service',
      'Local test client',
      1200.50,
      CURRENT_DATE + 30,
      'Local-only test draft',
      fixture.request_key
    );
    RAISE EXCEPTION 'Another actor unexpectedly reused an existing key';
  EXCEPTION WHEN SQLSTATE '22023' THEN
    NULL;
  END;
END;
$$;

-- The finalizer inserts the ledger during the preceding statement. Read it
-- in a later statement so PostgreSQL's statement snapshot sees that row.
UPDATE p1_fixture_ids AS fixture
SET ledger_id = ledger.id
FROM public.financial_ledgers AS ledger
WHERE fixture.legal_contract_id = ledger.implementation_contract_id
  AND fixture.legal_contract_id IS NOT NULL;

DO $$
DECLARE
  fixture record;
BEGIN
  SELECT * INTO fixture FROM p1_fixture_ids WHERE legal_contract_id IS NOT NULL;
  IF NOT EXISTS (
    SELECT 1 FROM public.financial_ledgers
    WHERE id = fixture.ledger_id
      AND implementation_contract_id = fixture.legal_contract_id
      AND transaction_id IS NULL
      AND currency = 'USD'
      AND status = 'pending'
      AND amount = 1200.50
  ) THEN
    RAISE EXCEPTION 'Generated contract did not create pending USD ledger';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.legal_contracts AS legal
    JOIN public.contracts AS canonical_contract
      ON canonical_contract.id = legal.contract_id
    JOIN public.projects AS canonical_project
      ON canonical_project.id = legal.project_id
    JOIN public.production_projects AS production
      ON production.implementation_contract_id = legal.id
    JOIN public.financial_ledgers AS ledger
      ON ledger.implementation_contract_id = legal.id
    WHERE legal.id = fixture.legal_contract_id
      AND legal.status = 'draft'
      AND canonical_contract.status = 'draft'
      AND canonical_project.status = 'draft'
      AND canonical_contract.client_id = fixture.actor_id
      AND canonical_project.client_id = fixture.actor_id
      AND canonical_contract.project_id = canonical_project.id
      AND production.contract_id = canonical_contract.id
      AND production.project_id = canonical_project.id
      AND ledger.contract_id = canonical_contract.id
      AND ledger.project_id = canonical_project.id
  ) THEN
    RAISE EXCEPTION 'Generated contract canonical links or draft states are incorrect';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.financial_transactions
    WHERE user_id = fixture.actor_id
      AND project_id = (
        SELECT project_id FROM public.legal_contracts
        WHERE id = fixture.legal_contract_id
      )
  ) THEN
    RAISE EXCEPTION 'Contract finalization created an automatic financial transaction';
  END IF;

  PERFORM public.approve_financial_ledger(fixture.ledger_id, fixture.actor_id);
  IF NOT EXISTS (
    SELECT 1 FROM public.financial_ledgers
    WHERE id = fixture.ledger_id AND status = 'posted'
  ) THEN
    RAISE EXCEPTION 'Admin ledger approval did not transition pending to posted';
  END IF;
END;
$$;

ROLLBACK;
