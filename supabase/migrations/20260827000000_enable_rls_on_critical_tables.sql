-- =====================================================================
-- 🛡️ P0: تفعيل RLS على الجداول الحرجة
-- =====================================================================

-- 1. projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view projects they own"
  ON public.projects
  FOR SELECT
  USING (auth.uid() = client_id);

-- 2. financial_transactions
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view transactions for their projects"
  ON public.financial_transactions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = public.financial_transactions.project_id
      AND p.client_id = auth.uid()
    )
  );

-- 3. security_audit_logs
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
  ON public.security_audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_system_roles usr
      WHERE usr.user_id = auth.uid()
      AND usr.system_role IN ('admin', 'executive')
    )
  );

-- 4. production_projects
-- ملاحظة: جدول contracts غير موجود، لذا نؤجل السياسة حتى إنشائه
ALTER TABLE public.production_projects ENABLE ROW LEVEL SECURITY;

-- سياسة مؤقتة: نسمح بالعرض للجميع حتى نضيف جدول contracts
CREATE POLICY "Users can view production projects"
  ON public.production_projects
  FOR SELECT
  USING (true);
