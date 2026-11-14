-- Tighten the existing authenticated KYC submission RPC without changing the
-- historical containment migration or its public signature.
BEGIN;

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
  current_status text;
  updated_rows integer;
BEGIN
  IF caller_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_document_type IS NULL
    OR p_document_type NOT IN ('national_id', 'passport') THEN
    RAISE EXCEPTION 'Invalid KYC document type';
  END IF;

  IF p_document_path IS NULL
    OR length(p_document_path) > 512
    OR p_document_path !~ (
      '^kyc-docs/' || caller_id::text || '/[A-Za-z0-9][A-Za-z0-9._-]{0,159}$'
    )
    OR p_document_path ~ '\.\.' THEN
    RAISE EXCEPTION 'Invalid KYC document path';
  END IF;

  -- Lock and validate the state before touching the object or writing. This
  -- serializes duplicate requests and preserves rejected-only resubmission.
  SELECT profile_record.kyc_status
  INTO current_status
  FROM public.profiles AS profile_record
  WHERE profile_record.id = caller_id
  FOR UPDATE;

  IF current_status IS NULL THEN
    RAISE EXCEPTION 'Authenticated profile not found';
  END IF;
  IF current_status NOT IN ('none', 'rejected') THEN
    RAISE EXCEPTION 'KYC submission is not allowed in the current state';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM storage.objects AS object_record
    WHERE object_record.bucket_id = 'secure-vault'
      AND object_record.name = p_document_path
  ) THEN
    RAISE EXCEPTION 'KYC document object is missing';
  END IF;

  UPDATE public.profiles
  SET kyc_status = 'pending',
      kyc_submitted_at = now(),
      document_id = p_document_path,
      document_type = p_document_type
  WHERE id = caller_id
    AND kyc_status = current_status;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  IF updated_rows <> 1 THEN
    RAISE EXCEPTION 'KYC submission state changed; retry the request';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION mcos_private.submit_own_kyc(text, text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT USAGE ON SCHEMA mcos_private TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.submit_own_kyc(text, text)
  TO authenticated;

COMMIT;
