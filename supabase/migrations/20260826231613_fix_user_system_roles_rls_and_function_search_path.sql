-- =====================================================================
-- ADR-003 follow-up: remove recursive role policies and harden definer
-- functions. This migration is intentionally additive; historical
-- migrations remain unchanged.
-- =====================================================================

-- Keep privileged role lookups outside exposed schemas. The caller's
-- identity is still checked explicitly through auth.uid().
CREATE SCHEMA IF NOT EXISTS mcos_private;

REVOKE ALL ON SCHEMA mcos_private FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION mcos_private.is_system_admin()
RETURNS BOOLEAN
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
GRANT USAGE ON SCHEMA mcos_private TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.is_system_admin() TO authenticated;

-- Make Data API privileges explicit. RLS remains the authorization layer.
REVOKE ALL ON TABLE public.user_system_roles FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.user_system_roles
  TO authenticated;

-- Remove the self-referencing policy and replace all role policies with
-- non-recursive, operation-specific policies.
DROP POLICY IF EXISTS "Users can view own system_role"
  ON public.user_system_roles;
DROP POLICY IF EXISTS "Admins can manage system_roles"
  ON public.user_system_roles;
DROP POLICY IF EXISTS "Admins can select system_roles"
  ON public.user_system_roles;
DROP POLICY IF EXISTS "Admins can insert system_roles"
  ON public.user_system_roles;
DROP POLICY IF EXISTS "Admins can update system_roles"
  ON public.user_system_roles;
DROP POLICY IF EXISTS "Admins can delete system_roles"
  ON public.user_system_roles;

CREATE POLICY "Users can view own system_role"
  ON public.user_system_roles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Admins can select system_roles"
  ON public.user_system_roles
  FOR SELECT
  TO authenticated
  USING ((SELECT mcos_private.is_system_admin()));

CREATE POLICY "Admins can insert system_roles"
  ON public.user_system_roles
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT mcos_private.is_system_admin()));

CREATE POLICY "Admins can update system_roles"
  ON public.user_system_roles
  FOR UPDATE
  TO authenticated
  USING ((SELECT mcos_private.is_system_admin()))
  WITH CHECK ((SELECT mcos_private.is_system_admin()));

CREATE POLICY "Admins can delete system_roles"
  ON public.user_system_roles
  FOR DELETE
  TO authenticated
  USING ((SELECT mcos_private.is_system_admin()));

-- Pin the lookup path of every SECURITY DEFINER function currently defined
-- by repository migrations. All referenced relations are schema-qualified.
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.handle_new_user_system_role() SET search_path = '';

COMMENT ON FUNCTION mcos_private.is_system_admin() IS
  'ADR-003: non-recursive admin/executive check for user_system_roles RLS';
