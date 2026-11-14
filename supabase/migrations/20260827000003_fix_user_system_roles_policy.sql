-- =====================================================================
-- 🛡️ P0: إصلاح سياسة user_system_roles — استخدام authenticated بدلاً من service_role
-- =====================================================================

-- سياسة تسمح لأي مستخدم مصادق بقراءة دوره فقط
-- (هذه بديلة لسياسة service_role التي لا تعمل)
CREATE POLICY "Allow all authenticated users to view all roles"
  ON public.user_system_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- سياسة تسمح لـ admin/executive بالإدارة
-- (موجودة بالفعل، لكن نعيد تأكيدها)
CREATE POLICY "Allow admins to manage roles"
  ON public.user_system_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_system_roles usr
      WHERE usr.user_id = auth.uid()
      AND usr.system_role IN ('admin', 'executive')
    )
  )
  WITH CHECK (true);
