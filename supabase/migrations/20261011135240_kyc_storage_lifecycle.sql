-- KYC submission history, retention, legal holds, private storage boundary,
-- and service-role-only cleanup/review functions.
BEGIN;

CREATE TABLE public.kyc_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL,
  document_path text NOT NULL UNIQUE,
  document_type text NOT NULL
    CHECK (document_type IN ('id', 'passport', 'license', 'other', 'national_id')),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid,
  review_note text,
  CONSTRAINT kyc_submissions_path_shape_check
    CHECK (document_path LIKE 'kyc-docs/%')
);

CREATE INDEX kyc_submissions_profile_submitted_idx
  ON public.kyc_submissions(profile_id, submitted_at DESC);

CREATE TABLE public.kyc_document_retention (
  object_path text PRIMARY KEY,
  profile_id uuid NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  account_closed_at timestamptz,
  purge_after timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT kyc_document_retention_path_check
    CHECK (object_path LIKE 'kyc-docs/%'),
  CONSTRAINT kyc_document_retention_closure_check
    CHECK ((account_closed_at IS NULL) = (purge_after IS NULL))
);

CREATE INDEX kyc_document_retention_purge_idx
  ON public.kyc_document_retention(purge_after)
  WHERE purge_after IS NOT NULL;

CREATE TABLE public.kyc_legal_holds (
  object_path text PRIMARY KEY,
  reason text NOT NULL CHECK (length(btrim(reason)) > 0),
  set_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  released_by uuid,
  released_at timestamptz,
  CONSTRAINT kyc_legal_holds_path_check CHECK (object_path LIKE 'kyc-docs/%')
);

CREATE TABLE public.kyc_cleanup_claims (
  object_path text PRIMARY KEY
    CHECK (object_path LIKE 'kyc-docs/%'),
  claim_id uuid NOT NULL DEFAULT gen_random_uuid(),
  claimed_at timestamptz NOT NULL DEFAULT now(),
  claim_until timestamptz NOT NULL,
  CONSTRAINT kyc_cleanup_claims_lease_check CHECK (claim_until > claimed_at)
);

ALTER TABLE public.kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_document_retention ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_legal_holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_cleanup_claims ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.kyc_submissions, public.kyc_document_retention,
  public.kyc_legal_holds, public.kyc_cleanup_claims
  FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.kyc_submissions,
  public.kyc_document_retention, public.kyc_legal_holds,
  public.kyc_cleanup_claims TO service_role;

CREATE OR REPLACE FUNCTION mcos_private.enforce_kyc_state_transition()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.kyc_status IS DISTINCT FROM OLD.kyc_status THEN
    IF NEW.kyc_status = 'pending'
      AND OLD.kyc_status NOT IN ('none', 'rejected') THEN
      RAISE EXCEPTION 'KYC resubmission is permitted only after rejection';
    END IF;

    IF OLD.kyc_status = 'pending'
      AND NEW.kyc_status IN ('approved', 'rejected')
      AND auth.uid() IS NOT NULL THEN
      RAISE EXCEPTION 'KYC decisions require a privileged review flow';
    END IF;

    IF OLD.kyc_status = 'approved' AND NEW.kyc_status <> 'approved' THEN
      RAISE EXCEPTION 'Approved KYC status is terminal';
    END IF;
  END IF;

  IF NEW.kyc_status = 'pending' AND (
    NEW.document_id IS NULL
    OR NEW.document_type IS NULL
    OR NEW.document_id NOT LIKE ('kyc-docs/' || NEW.id::text || '/%')
  ) THEN
    RAISE EXCEPTION 'KYC submission requires a caller-owned document path and type';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION mcos_private.record_kyc_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.kyc_status = 'pending'
    AND OLD.kyc_status IS DISTINCT FROM 'pending' THEN
    INSERT INTO public.kyc_submissions (
      profile_id, document_path, document_type, status, submitted_at
    ) VALUES (
      NEW.id, NEW.document_id, NEW.document_type, 'pending',
      coalesce(NEW.kyc_submitted_at, now())
    );

    INSERT INTO public.kyc_document_retention (
      object_path, profile_id, uploaded_at
    ) VALUES (
      NEW.document_id, NEW.id, coalesce(NEW.kyc_submitted_at, now())
    ) ON CONFLICT (object_path) DO UPDATE
      SET profile_id = EXCLUDED.profile_id,
          updated_at = now();

    INSERT INTO public.security_audit_logs (
      actor_id, action, resource_type, resource_id, metadata
    ) VALUES (
      NEW.id, 'kyc_submitted', 'kyc_profile', NEW.id,
      jsonb_build_object('document_type', NEW.document_type)
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION mcos_private.preserve_kyc_retention_on_profile_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  closed_at timestamptz := now();
BEGIN
  INSERT INTO public.kyc_document_retention AS existing_retention (
    object_path, profile_id, uploaded_at, account_closed_at, purge_after
  )
  SELECT submission.document_path, OLD.id, submission.submitted_at,
         closed_at, closed_at + interval '7 years'
  FROM public.kyc_submissions AS submission
  WHERE submission.profile_id = OLD.id
  ON CONFLICT (object_path) DO UPDATE
      SET account_closed_at = coalesce(
          existing_retention.account_closed_at, EXCLUDED.account_closed_at
        ),
        purge_after = coalesce(
          existing_retention.purge_after, EXCLUDED.purge_after
        ),
        updated_at = now();

  IF OLD.document_id IS NOT NULL THEN
    INSERT INTO public.kyc_document_retention AS existing_retention (
      object_path, profile_id, uploaded_at, account_closed_at, purge_after
    ) VALUES (
      OLD.document_id, OLD.id, coalesce(OLD.kyc_submitted_at, closed_at),
      closed_at, closed_at + interval '7 years'
    ) ON CONFLICT (object_path) DO UPDATE
      SET account_closed_at = coalesce(
            existing_retention.account_closed_at, EXCLUDED.account_closed_at
          ),
          purge_after = coalesce(
            existing_retention.purge_after, EXCLUDED.purge_after
          ),
          updated_at = now();
  END IF;

  RETURN OLD;
END;
$$;

REVOKE ALL ON FUNCTION mcos_private.enforce_kyc_state_transition()
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.record_kyc_submission()
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.preserve_kyc_retention_on_profile_delete()
  FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER mcos_enforce_kyc_state_transition
  BEFORE UPDATE OF kyc_status, document_id, document_type
  ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION mcos_private.enforce_kyc_state_transition();

CREATE TRIGGER mcos_record_kyc_submission
  AFTER UPDATE OF kyc_status, document_id, document_type, kyc_submitted_at
  ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION mcos_private.record_kyc_submission();

CREATE TRIGGER mcos_preserve_kyc_retention_before_profile_delete
  BEFORE DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION mcos_private.preserve_kyc_retention_on_profile_delete();

CREATE OR REPLACE FUNCTION public.review_kyc_request(
  p_profile_id uuid,
  p_decision text,
  p_actor_id uuid,
  p_review_note text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  affected integer;
BEGIN
  IF p_decision NOT IN ('approved', 'rejected') THEN
    RAISE EXCEPTION 'Invalid KYC decision';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.user_system_roles AS role_record
    WHERE role_record.user_id = p_actor_id
      AND role_record.system_role IN ('admin', 'kyc_operator')
  ) THEN
    RAISE EXCEPTION 'KYC reviewer role required';
  END IF;

  UPDATE public.profiles
  SET kyc_status = p_decision
  WHERE id = p_profile_id AND kyc_status = 'pending';
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Pending KYC request not found';
  END IF;

  UPDATE public.kyc_submissions AS submission
  SET status = p_decision,
      reviewed_at = now(),
      reviewed_by = p_actor_id,
      review_note = nullif(left(btrim(coalesce(p_review_note, '')), 1000), '')
  WHERE submission.id = (
    SELECT latest.id FROM public.kyc_submissions AS latest
    WHERE latest.profile_id = p_profile_id AND latest.status = 'pending'
    ORDER BY latest.submitted_at DESC
    LIMIT 1
  );

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_actor_id, 'kyc_' || p_decision, 'kyc_profile', p_profile_id,
    jsonb_build_object('review_note', nullif(left(btrim(coalesce(p_review_note, '')), 1000), ''))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.review_kyc_request(uuid, text, uuid, text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.review_kyc_request(uuid, text, uuid, text)
  TO service_role;

CREATE OR REPLACE FUNCTION public.kyc_cleanup_candidates()
RETURNS TABLE(object_path text)
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT object_record.name
  FROM storage.objects AS object_record
  LEFT JOIN public.kyc_document_retention AS retention
    ON retention.object_path = object_record.name
  WHERE object_record.bucket_id = 'secure-vault'
    AND object_record.name LIKE 'kyc-docs/%'
    AND NOT EXISTS (
      SELECT 1 FROM public.kyc_legal_holds AS hold_record
      WHERE hold_record.object_path = object_record.name
        AND hold_record.released_at IS NULL
    )
    AND (
      (retention.object_path IS NULL
        AND NOT EXISTS (
          SELECT 1 FROM public.profiles AS profile_record
          WHERE profile_record.document_id = object_record.name
        )
        AND NOT EXISTS (
          SELECT 1 FROM public.kyc_submissions AS submission
          WHERE submission.document_path = object_record.name
        )
        AND object_record.created_at < now() - interval '30 days')
      OR (retention.object_path IS NOT NULL
        AND retention.account_closed_at IS NOT NULL
        AND retention.purge_after <= now())
    )
    AND NOT EXISTS (
      SELECT 1 FROM public.kyc_cleanup_claims AS claim_record
      WHERE claim_record.object_path = object_record.name
        AND claim_record.claim_until > now()
    )
  ORDER BY object_record.created_at
  LIMIT 100;
$$;

CREATE OR REPLACE FUNCTION public.record_kyc_object_deleted(p_object_path text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_object_path IS NULL OR p_object_path NOT LIKE 'kyc-docs/%' THEN
    RAISE EXCEPTION 'Invalid KYC object path';
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

REVOKE ALL ON FUNCTION public.kyc_cleanup_candidates()
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.kyc_cleanup_candidates() TO service_role;
REVOKE ALL ON FUNCTION public.record_kyc_object_deleted(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_kyc_object_deleted(text) TO service_role;
REVOKE ALL ON FUNCTION public.set_kyc_legal_hold(text, text, uuid, boolean)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_kyc_legal_hold(text, text, uuid, boolean)
  TO service_role;

-- Keep the canonical bucket private. Create it only when absent in a fresh
-- environment; never turn an existing public bucket private silently.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'secure-vault', 'secure-vault', false, 10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets
    WHERE id = 'secure-vault' AND name = 'secure-vault' AND public = false
  ) THEN
    RAISE EXCEPTION 'secure-vault must exist and be private';
  END IF;
END;
$$;

CREATE POLICY secure_vault_owner_upload
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'secure-vault'
    AND (storage.foldername(name))[1] = 'kyc-docs'
    AND (storage.foldername(name))[2] = (SELECT auth.uid())::text
  );

CREATE POLICY secure_vault_authenticated_read_boundary
  ON storage.objects AS RESTRICTIVE FOR SELECT TO authenticated
  USING (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_anon_read_boundary
  ON storage.objects AS RESTRICTIVE FOR SELECT TO anon
  USING (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_authenticated_insert_boundary
  ON storage.objects AS RESTRICTIVE FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id <> 'secure-vault'
    OR ((storage.foldername(name))[1] = 'kyc-docs'
      AND (storage.foldername(name))[2] = (SELECT auth.uid())::text)
  );
CREATE POLICY secure_vault_anon_insert_boundary
  ON storage.objects AS RESTRICTIVE FOR INSERT TO anon
  WITH CHECK (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_authenticated_update_boundary
  ON storage.objects AS RESTRICTIVE FOR UPDATE TO authenticated
  USING (bucket_id <> 'secure-vault') WITH CHECK (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_anon_update_boundary
  ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon
  USING (bucket_id <> 'secure-vault') WITH CHECK (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_authenticated_delete_boundary
  ON storage.objects AS RESTRICTIVE FOR DELETE TO authenticated
  USING (bucket_id <> 'secure-vault');
CREATE POLICY secure_vault_anon_delete_boundary
  ON storage.objects AS RESTRICTIVE FOR DELETE TO anon
  USING (bucket_id <> 'secure-vault');

COMMIT;
