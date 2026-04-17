-- ==============================================================================
-- Monteerly OS V5.0 - Ultimate Sovereign Database Schema
-- ==============================================================================

-- 1. الأنواع المخصصة (Enums)
CREATE TYPE user_role AS ENUM ('editor', 'creator', 'agency', 'investor', 'admin', 'sysadmin');
CREATE TYPE escrow_status AS ENUM ('pending', 'funded', 'locked', 'released', 'disputed', 'refunded');
CREATE TYPE project_state AS ENUM ('draft', 'hiring', 'in_progress', 'review', 'completed', 'canceled');

-- 2. جدول المستخدمين السيادي (Core Identity)
CREATE TABLE users (
    id UUID PRIMARY KEY, -- مرتبط بـ Supabase Auth
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'editor',
    architecture_level INT DEFAULT 1 CHECK (architecture_level BETWEEN 1 AND 6), -- (Core to Intelligence)
    fraud_score INT DEFAULT 0, -- يبدأ من 0، ترتفع النقاط عند المخالفات
    gamification_points INT DEFAULT 0, -- نقاط المجتمع والتلعيب
    badge_tier TEXT DEFAULT 'novice', -- (novice, pro, elite, master)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active TIMESTAMPTZ DEFAULT NOW()
);

-- 3. جدول المشاريع والعمليات (Workspace & Workflow)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) NOT NULL,
    editor_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    budget DECIMAL(12, 2) NOT NULL CHECK (budget > 0),
    state project_state DEFAULT 'draft',
    escrow_status escrow_status DEFAULT 'pending',
    is_watermarked BOOLEAN DEFAULT true, -- القبة الحديدية: التفعيل الافتراضي للبصمة
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. المحرك المالي والضمان (Financial Ledger)
CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) NOT NULL,
    gateway_transaction_id TEXT UNIQUE NOT NULL,
    payment_method TEXT, -- (visa, wallet, fawry, apple_pay)
    amount_gross DECIMAL(12, 2) NOT NULL,
    platform_fee DECIMAL(12, 2) NOT NULL,
    amount_net DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'succeeded', 'failed', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. استوديو الذكاء الاصطناعي (AI Studio Usage)
CREATE TABLE ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    tool_used TEXT NOT NULL CHECK (tool_used IN ('digital_twin', 'dubbing', 'script_writer', 'qc_analyzer')),
    credits_consumed INT NOT NULL,
    job_status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. القبة الحديدية (Security & Zero Trust)
CREATE TABLE security_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id), -- قد يكون NULL إذا كانت المحاولة من خارج النظام
    event_type TEXT NOT NULL, -- (login_failed, pii_leak_attempt, unauthorized_access)
    risk_level INT NOT NULL CHECK (risk_level BETWEEN 1 AND 10),
    ip_address TEXT,
    action_taken TEXT NOT NULL, -- (blocked, flagged, session_terminated)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- انتهى تخطيط قاعدة البيانات. جاهز للتنفيذ على Supabase SQL Editor.
-- ==============================================================================
