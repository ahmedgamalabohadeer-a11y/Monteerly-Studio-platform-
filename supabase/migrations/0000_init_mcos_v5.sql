-- تفعيل التشفير وبناء البنية العلائقية الصارمة 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول المستخدمين وتقسيم الأدوار (RBAC Vacuum Fix)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'freelancer', -- freelancer, client, agency_admin, security_officer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. جدول المحافظ المالية للضمان (Escrow & FinTech Core Fix)
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance_cents BIGINT DEFAULT 0,
    pending_cents BIGINT DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- 3. آلة حالة حسابات الضمان (Escrow State Machine)
CREATE TYPE escrow_status AS ENUM ('created', 'funded', 'guard_period', 'held', 'released', 'disputed', 'refunded');

CREATE TABLE IF NOT EXISTS escrow_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    client_id UUID REFERENCES users(id),
    freelancer_id UUID REFERENCES users(id),
    amount_cents BIGINT NOT NULL,
    platform_fee_cents BIGINT NOT NULL,
    status escrow_status DEFAULT 'created',
    paymob_order_id VARCHAR(255),
    funded_at TIMESTAMP WITH TIME ZONE
);
ALTER TABLE escrow_accounts ENABLE ROW LEVEL SECURITY;

-- 4. إرساء السياسات الأمنية المبدئية (Policies)
CREATE POLICY "Allow authenticated read" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid() = user_id);
