-- =====================================================================
-- 🛡️ P0: حذف السياسة القديمة المسببة للتعطل
-- =====================================================================

-- حذف السياسة القديمة
DROP POLICY IF EXISTS "Users can view own system_role" ON public.user_system_roles;

-- حذف سياسة admins التي تسبب recursion
DROP POLICY IF EXISTS "Allow admins to manage roles" ON public.user_system_roles;
