-- =========================================================================
-- Monteerly OS V5.0 - Database Master Schema (PostgreSQL)
-- =========================================================================

-- 1. تعريف حالات الضمان المالي (Escrow State Machine)
CREATE TYPE escrow_state AS ENUM (
    'pending',      -- في انتظار الدفع
    'funded',       -- تم الدفع والأموال في حساب المنصة
    'locked_48h',   -- تم تسليم العمل، الأموال محتجزة للمراجعة
    'released',     -- تم تحرير الأموال للمستقل
    'disputed',     -- يوجد نزاع مالي (تجميد)
    'refunded'      -- تم إرجاع الأموال للعميل
);

-- 2. جدول المستخدمين (الهوية، المخاطر، والاشتراكات)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'creator' CHECK (role IN ('creator', 'client', 'agency', 'admin')),
    fraud_score INT DEFAULT 0,
    subscription_tier TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول المشاريع (حاوية العمليات والضمان المالي)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) NOT NULL,
    freelancer_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    budget DECIMAL(12, 2) NOT NULL CHECK (budget > 0),
    escrow_status escrow_state DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. دفتر الأستاذ المالي (Transactions Ledger - متوافق مع Paymob & PayPal)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) NOT NULL,
    gateway_type TEXT NOT NULL CHECK (gateway_type IN ('paymob', 'paypal')),
    gateway_transaction_id TEXT UNIQUE NOT NULL, -- Paymob Order ID أو PayPal Transaction ID
    payment_method TEXT, -- لتسجيل: 'fawry', 'wallet', 'visa', 'apple_pay', 'paypal'
    amount_gross DECIMAL(12, 2) NOT NULL,
    platform_fee DECIMAL(12, 2) NOT NULL,
    amount_net DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'succeeded', 'failed', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. سجلات أمان القبة الحديدية (Security Audit Logs)
CREATE TABLE security_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    event_type TEXT NOT NULL,
    risk_level INT NOT NULL CHECK (risk_level BETWEEN 1 AND 10),
    ai_verdict JSONB,
    action_taken TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
