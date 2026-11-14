-- =====================================================================
-- 🛡️ P0: إصلاح سياسة service_role — إزالة recursion
-- =====================================================================

-- حذف السياسة المسببة للـ recursion
DROP POLICY IF EXISTS "service_role can select via anon" ON public.user_system_roles;

-- السياسة الأولى كافية:
-- CREATE POLICY "service_role can manage user_system_roles"
--   ON public.user_system_roles
--   FOR ALL
--   TO service_role
--   USING (true)
--   WITH CHECK (true);
