-- =====================================================================
-- 🛡️ ADR-003: إضافة account_type إلى profiles
-- =====================================================================

-- 1. إضافة عمود account_type
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS account_type TEXT DEFAULT 'client' CHECK (account_type IN ('client', 'freelancer', 'agency'));

-- 2. إنشاء index للبحث السريع
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON public.profiles(account_type);

-- 3. تعليق توضيحي
COMMENT ON COLUMN public.profiles.account_type IS 'ADR-003: account_type منفصل عن system_role — client/freelancer/agency';

-- 4. ملاحظة: role القديم يُعتبر deprecated
COMMENT ON COLUMN public.profiles.role IS 'DEPRECATED ADR-003 — استخدم account_type و user_system_roles بدلاً من ذلك';
