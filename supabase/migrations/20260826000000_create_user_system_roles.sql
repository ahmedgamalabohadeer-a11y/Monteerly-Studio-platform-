-- =====================================================================
-- 🛡️ ADR-003: فصل system_role عن account_type
-- =====================================================================

-- 1. إنشاء جدول user_system_roles
CREATE TABLE IF NOT EXISTS public.user_system_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  system_role TEXT DEFAULT 'user' CHECK (system_role IN ('user', 'support', 'moderator', 'kyc_operator', 'finance_operator', 'admin', 'executive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. تفعيل RLS
ALTER TABLE public.user_system_roles ENABLE ROW LEVEL SECURITY;

-- 3. إنشاء index للبحث السريع
CREATE INDEX IF NOT EXISTS idx_user_system_roles_user_id ON public.user_system_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_system_roles_role ON public.user_system_roles(system_role);

-- 4. Policies: المستخدم يرى دوره فقط
CREATE POLICY "Users can view own system_role"
  ON public.user_system_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Policy: فقط admin/executive يمكنهم تعديل الأدوار
CREATE POLICY "Admins can manage system_roles"
  ON public.user_system_roles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_system_roles usr
      WHERE usr.user_id = auth.uid()
      AND usr.system_role IN ('admin', 'executive')
    )
  );

-- 6. Trigger: إنشاء سجل تلقائي عند تسجيل مستخدم جديد
CREATE OR REPLACE FUNCTION public.handle_new_user_system_role()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_system_roles (user_id, system_role)
  VALUES (new.id, 'user') -- كل مستخدم جديد يبدأ بـ system_role='user'
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. ربط trigger بـ auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_system_role ON auth.users;
CREATE TRIGGER on_auth_user_created_system_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_system_role();

-- 8. تعليق توضيحي
COMMENT ON TABLE public.user_system_roles IS 'ADR-003: فصل system_role عن account_type — كل مستخدم جديد يبدأ بـ user';
