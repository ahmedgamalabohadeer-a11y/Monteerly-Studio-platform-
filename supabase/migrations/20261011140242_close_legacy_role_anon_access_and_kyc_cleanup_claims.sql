-- Additive post-containment closure for historical anonymous role access and
-- lease-based KYC deletion coordination. No historical migration is edited.
BEGIN;

-- The historical chain adds a public SELECT policy, disables RLS, and grants
-- anon SELECT. Containment re-enables RLS; close every remaining anon policy
-- and privilege here without changing the historical files.
ALTER TABLE public.user_system_roles ENABLE ROW LEVEL SECURITY;
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
  ON TABLE public.user_system_roles TO service_role;

CREATE POLICY "Users can view own system_role"
  ON public.user_system_roles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE OR REPLACE FUNCTION public.claim_kyc_object_cleanup(p_object_path text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_claim_id uuid := gen_random_uuid();
  changed_rows integer;
BEGIN
  IF p_object_path IS NULL OR p_object_path NOT LIKE 'kyc-docs/%' THEN
    RAISE EXCEPTION 'Invalid KYC cleanup path';
  END IF;

  -- A legal-hold writer takes the same transaction-scoped path lock. If a
  -- hold wins first, cleanup observes it; if cleanup wins, the hold writer
  -- refuses to acknowledge a hold while the deletion lease is active.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_object_path, 0)
  );

  IF EXISTS (
    SELECT 1 FROM public.kyc_legal_holds AS hold_record
    WHERE hold_record.object_path = p_object_path
      AND hold_record.released_at IS NULL
  ) THEN
    RAISE EXCEPTION 'KYC object is under legal hold';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.objects AS object_record
    WHERE object_record.bucket_id = 'secure-vault'
      AND object_record.name = p_object_path
  ) THEN
    RAISE EXCEPTION 'KYC storage object does not exist';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.kyc_document_retention AS retention
    WHERE retention.object_path = p_object_path
      AND retention.account_closed_at IS NOT NULL
      AND retention.purge_after <= now()
  ) AND NOT EXISTS (
    SELECT 1
    FROM storage.objects AS object_record
    WHERE object_record.bucket_id = 'secure-vault'
      AND object_record.name = p_object_path
      AND object_record.created_at < now() - interval '30 days'
      AND NOT EXISTS (
        SELECT 1 FROM public.kyc_document_retention AS retention
        WHERE retention.object_path = object_record.name
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.profiles AS profile_record
        WHERE profile_record.document_id = object_record.name
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.kyc_submissions AS submission
        WHERE submission.document_path = object_record.name
      )
  ) THEN
    RAISE EXCEPTION 'KYC object is not eligible for cleanup';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.profiles AS profile_record
    WHERE profile_record.document_id = p_object_path
  ) THEN
    RAISE EXCEPTION 'KYC object is still referenced by a profile';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.kyc_submissions AS submission
    WHERE submission.document_path = p_object_path
  ) AND NOT EXISTS (
    SELECT 1 FROM public.kyc_document_retention AS retention
    WHERE retention.object_path = p_object_path
      AND retention.account_closed_at IS NOT NULL
      AND retention.purge_after <= now()
  ) THEN
    RAISE EXCEPTION 'KYC object is still referenced by a submission';
  END IF;

  INSERT INTO public.kyc_cleanup_claims (
    object_path, claim_id, claimed_at, claim_until
  ) VALUES (
    p_object_path, new_claim_id, now(), now() + interval '5 minutes'
  )
  ON CONFLICT (object_path) DO UPDATE
    SET claim_id = EXCLUDED.claim_id,
        claimed_at = EXCLUDED.claimed_at,
        claim_until = EXCLUDED.claim_until
    WHERE public.kyc_cleanup_claims.claim_until <= now();

  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN
    RAISE EXCEPTION 'KYC cleanup is already claimed';
  END IF;

  RETURN new_claim_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_kyc_object_cleanup(
  p_object_path text,
  p_claim_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_object_path IS NULL OR p_object_path NOT LIKE 'kyc-docs/%' THEN
    RAISE EXCEPTION 'Invalid KYC cleanup path';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_object_path, 0)
  );

  IF EXISTS (
    SELECT 1 FROM public.kyc_legal_holds AS hold_record
    WHERE hold_record.object_path = p_object_path
      AND hold_record.released_at IS NULL
  ) THEN
    RAISE EXCEPTION 'KYC object is under legal hold';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.kyc_cleanup_claims AS claim_record
    WHERE claim_record.object_path = p_object_path
      AND claim_record.claim_id = p_claim_id
      AND claim_record.claim_until > now()
  ) THEN
    RAISE EXCEPTION 'KYC cleanup claim is missing or expired';
  END IF;
  IF EXISTS (
    SELECT 1 FROM storage.objects AS object_record
    WHERE object_record.bucket_id = 'secure-vault'
      AND object_record.name = p_object_path
  ) THEN
    RAISE EXCEPTION 'Storage object still exists; deletion is not audited';
  END IF;

  INSERT INTO public.security_audit_logs (
    action, resource_type, metadata
  ) VALUES (
    'kyc_object_deleted', 'kyc_document',
    jsonb_build_object('object_key_digest', md5(p_object_path))
  );

  DELETE FROM public.kyc_submissions WHERE document_path = p_object_path;
  DELETE FROM public.kyc_document_retention WHERE object_path = p_object_path;
  DELETE FROM public.kyc_legal_holds
    WHERE object_path = p_object_path AND released_at IS NOT NULL;
  DELETE FROM public.kyc_cleanup_claims
    WHERE object_path = p_object_path AND claim_id = p_claim_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_kyc_legal_hold(
  p_object_path text,
  p_reason text,
  p_actor_id uuid,
  p_held boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_object_path IS NULL OR p_object_path NOT LIKE 'kyc-docs/%'
    OR p_reason IS NULL OR length(btrim(p_reason)) = 0
    OR NOT EXISTS (
      SELECT 1 FROM public.user_system_roles AS role_record
      WHERE role_record.user_id = p_actor_id
        AND role_record.system_role = 'admin'
    ) THEN
    RAISE EXCEPTION 'Invalid legal hold request';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_object_path, 0)
  );

  IF p_held AND EXISTS (
    SELECT 1 FROM public.kyc_cleanup_claims AS claim_record
    WHERE claim_record.object_path = p_object_path
      AND claim_record.claim_until > now()
  ) THEN
    RAISE EXCEPTION 'KYC cleanup is in progress; hold request was not accepted';
  END IF;

  IF p_held THEN
    INSERT INTO public.kyc_legal_holds (object_path, reason, set_by)
    VALUES (p_object_path, left(btrim(p_reason), 1000), p_actor_id)
    ON CONFLICT (object_path) DO UPDATE
      SET reason = EXCLUDED.reason,
          set_by = EXCLUDED.set_by,
          created_at = now(),
          released_by = NULL,
          released_at = NULL;
  ELSE
    UPDATE public.kyc_legal_holds
    SET released_by = p_actor_id, released_at = now()
    WHERE object_path = p_object_path AND released_at IS NULL;
  END IF;

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, metadata
  ) VALUES (
    p_actor_id,
    CASE WHEN p_held THEN 'kyc_legal_hold_set' ELSE 'kyc_legal_hold_released' END,
    'kyc_document',
    jsonb_build_object('object_key_digest', md5(p_object_path))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.claim_kyc_object_cleanup(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_kyc_object_cleanup(text) TO service_role;
REVOKE ALL ON FUNCTION public.complete_kyc_object_cleanup(text, uuid)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.complete_kyc_object_cleanup(text, uuid)
  TO service_role;
REVOKE ALL ON FUNCTION public.set_kyc_legal_hold(text, text, uuid, boolean)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_kyc_legal_hold(text, text, uuid, boolean)
  TO service_role;
REVOKE ALL ON FUNCTION public.record_kyc_object_deleted(text)
  FROM PUBLIC, anon, authenticated, service_role;

COMMIT;
