-- =====================================================================
-- 🏛️ MCOS SUPABASE MASTER SCHEMA v2.0 (Linked Environment)
-- =====================================================================

-- 1. جدول هويات النخب (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'client' CHECK (role IN ('editor', 'photographer', 'agency', 'client', 'admin')),
  full_name TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'rookie' CHECK (tier IN ('rookie', 'pro', 'studio')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. جدول مشاريع سوق العمل والضمان (Jobs & Escrow)
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) NOT NULL,
  freelancer_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'review', 'completed', 'disputed')),
  escrow_secured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 3. المحفظة وسجل العمليات المالية (Wallet Transactions)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  job_id UUID REFERENCES public.jobs(id),
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'escrow_hold')),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 4. سجل التدقيق الجنائي للأمان (Audit Logs)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  actor_identifier TEXT NOT NULL,
  module TEXT NOT NULL,
  snapshot JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- ⚙️ الأتمتة: محفزات قاعدة البيانات (Database Triggers)
-- =====================================================================
-- إنشاء دالة لفتح ملف تعريفي تلقائياً فور تسجيل عضو جديد
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ربط الدالة بجدول المستخدمين في Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================================
-- 🛡️ سياسات الأمان (Row Level Security Policies)
-- =====================================================================
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view open jobs" ON public.jobs FOR SELECT USING (status = 'open');
CREATE POLICY "Clients can create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = client_id);
