-- Canonical profile extensions required by containment and application callers.
-- The immutable master schema is preserved. Email remains nullable because an
-- auth user can exist without a deliverable email; uniqueness applies only to
-- populated addresses.
BEGIN;

ALTER TABLE public.profiles
  ADD COLUMN email text,
  ADD COLUMN bio text,
  ADD COLUMN experience_years integer,
  ADD COLUMN tax_id text,
  ADD COLUMN metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN kyc_status text NOT NULL DEFAULT 'none',
  ADD COLUMN document_id text,
  ADD COLUMN document_type text,
  ADD COLUMN kyc_submitted_at timestamptz;

UPDATE public.profiles AS profile
SET email = auth_user.email
FROM auth.users AS auth_user
WHERE auth_user.id = profile.id
  AND profile.email IS NULL
  AND auth_user.email IS NOT NULL;

CREATE UNIQUE INDEX profiles_email_unique_nonnull_idx
  ON public.profiles(email)
  WHERE email IS NOT NULL;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_experience_years_nonnegative_check
    CHECK (experience_years IS NULL OR experience_years >= 0) NOT VALID,
  ADD CONSTRAINT profiles_kyc_status_check
    CHECK (kyc_status IN ('none', 'pending', 'approved', 'rejected')) NOT VALID,
  ADD CONSTRAINT profiles_document_type_check
    CHECK (document_type IS NULL OR document_type IN (
      'id', 'passport', 'license', 'other', 'national_id'
    )) NOT VALID,
  ADD CONSTRAINT profiles_metadata_object_check
    CHECK (jsonb_typeof(metadata) = 'object') NOT VALID;

ALTER TABLE public.profiles
  VALIDATE CONSTRAINT profiles_experience_years_nonnegative_check,
  VALIDATE CONSTRAINT profiles_kyc_status_check,
  VALIDATE CONSTRAINT profiles_document_type_check,
  VALIDATE CONSTRAINT profiles_metadata_object_check;

CREATE OR REPLACE FUNCTION public.mcos_sync_profile_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.mcos_sync_profile_email()
  FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER mcos_sync_profile_email_after_auth_update
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.mcos_sync_profile_email();

COMMIT;
