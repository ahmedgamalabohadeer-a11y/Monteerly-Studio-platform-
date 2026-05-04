-- 1. جدول العقود الذكية
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.jobs(id),
    client_id UUID REFERENCES public.profiles(id),
    freelancer_id UUID REFERENCES public.profiles(id),
    title TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    current_version INT DEFAULT 1,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. جدول حسابات الضمان (Escrow)
CREATE TABLE IF NOT EXISTS public.escrow_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.jobs(id),
    client_id UUID REFERENCES public.profiles(id),
    freelancer_id UUID REFERENCES public.profiles(id),
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'held',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrow_accounts ENABLE ROW LEVEL SECURITY;
