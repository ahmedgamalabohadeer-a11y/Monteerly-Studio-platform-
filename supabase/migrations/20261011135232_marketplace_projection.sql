-- Minimal authenticated projection; protected profile attributes are never copied.
BEGIN;

CREATE TABLE public.published_freelancer_profiles (
  profile_id uuid PRIMARY KEY
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  headline text,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(skills) = 'array'),
  portfolio_links jsonb NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(portfolio_links) = 'array'),
  availability text,
  rating numeric(3,2) CHECK (rating IS NULL OR rating BETWEEN 0 AND 5),
  kyc_status_simplified text NOT NULL DEFAULT 'approved'
    CHECK (kyc_status_simplified = 'approved'),
  experience_years integer
    CHECK (experience_years IS NULL OR experience_years >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.published_freelancer_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.published_freelancer_profiles
  FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT ON TABLE public.published_freelancer_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.published_freelancer_profiles TO service_role;

CREATE POLICY published_freelancer_profiles_authenticated_read
  ON public.published_freelancer_profiles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY published_freelancer_profiles_service_manage
  ON public.published_freelancer_profiles
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION mcos_private.sync_published_freelancer_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  skill_values jsonb;
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.published_freelancer_profiles
    WHERE profile_id = OLD.id;
    RETURN OLD;
  END IF;

  IF NEW.account_type = 'freelancer' AND NEW.kyc_status = 'approved' THEN
    SELECT jsonb_agg(candidate.skill ORDER BY candidate.ordinality)
    INTO skill_values
    FROM (
      SELECT btrim(parts.value) AS skill, parts.ordinality
      FROM unnest(regexp_split_to_array(coalesce(NEW.bio, ''), '[,،|/]'))
        WITH ORDINALITY AS parts(value, ordinality)
      WHERE char_length(btrim(parts.value)) >= 3
      ORDER BY parts.ordinality
      LIMIT 3
    ) AS candidate;

    skill_values := coalesce(skill_values, '[]'::jsonb);

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
      NEW.bio,
      skill_values,
      NEW.experience_years,
      'approved'
    )
    ON CONFLICT (profile_id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        headline = EXCLUDED.headline,
        skills = EXCLUDED.skills,
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

CREATE TRIGGER mcos_sync_published_freelancer_profile
  AFTER INSERT OR UPDATE OF full_name, bio, experience_years, account_type, kyc_status
  ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION mcos_private.sync_published_freelancer_profile();

CREATE TRIGGER mcos_delete_published_freelancer_profile
  AFTER DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION mcos_private.sync_published_freelancer_profile();

-- Initial projection is built only from already-qualified rows.
UPDATE public.profiles
SET bio = public.profiles.bio
WHERE account_type = 'freelancer' AND kyc_status = 'approved';

COMMIT;
