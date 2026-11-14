-- =====================================================================
-- 🛡️ P0: السماح لـ service_role بالوصول لـ user_system_roles
-- =====================================================================

-- سياسة تسمح لـ service_role بالقراءة
CREATE POLICY "service_role can manage user_system_roles"
  ON public.user_system_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- سياسة تسمح لـ service_role بالقراءة عبر anon/authenticated (للاختبار)
CREATE POLICY "service_role can select via anon"
  ON public.user_system_roles
  FOR SELECT
  USING (
    current_setting('request.jwt.claims', true)::jsonb ? 'service_role'
    OR EXISTS (
      SELECT 1 FROM public.user_system_roles usr
      WHERE usr.user_id = auth.uid()
      AND usr.system_role IN ('admin', 'executive')
    )
  );
