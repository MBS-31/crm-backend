-- ============================================================================
-- CRM Backend PostgreSQL Database Schema
-- Database: crm_db
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations (Multi-Tenancy)
CREATE TABLE IF NOT EXISTS organizations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(64) NOT NULL DEFAULT 'Growth Plan', -- 'Enterprise Plan', 'Growth Plan', 'Starter Plan'
    active_users INT NOT NULL DEFAULT 1,
    region VARCHAR(100) NOT NULL DEFAULT 'India (Mumbai)',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users & Roles
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('SUPER ADMIN', 'SALES OPS', 'MANAGER', 'EXECUTIVE', 'READONLY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'EXECUTIVE',
    avatar TEXT,
    title VARCHAR(150),
    department VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Customers
DO $$ BEGIN
    CREATE TYPE sentiment_type AS ENUM ('Positive', 'Neutral', 'Negative', 'At Risk');
    CREATE TYPE churn_risk_type AS ENUM ('Low', 'Medium', 'High', 'Critical');
    CREATE TYPE health_status_type AS ENUM ('Healthy', 'Monitor', 'At Risk', 'Critical');
    CREATE TYPE customer_stage_type AS ENUM ('Onboarding', 'Active', 'Expansion', 'At-Risk');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255) NOT NULL,
    arr BIGINT NOT NULL DEFAULT 0, -- Annual Recurring Revenue in INR (e.g. 4800000 = ₹48L)
    health_score INT NOT NULL DEFAULT 85 CHECK (health_score >= 0 AND health_score <= 100),
    sentiment sentiment_type NOT NULL DEFAULT 'Positive',
    churn_risk churn_risk_type NOT NULL DEFAULT 'Low',
    health_category health_status_type NOT NULL DEFAULT 'Healthy',
    next_best_action TEXT,
    stage customer_stage_type NOT NULL DEFAULT 'Active',
    assigned_rep_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    assigned_rep_name VARCHAR(255),
    joined_date VARCHAR(50) DEFAULT 'Today',
    last_contact VARCHAR(50) DEFAULT 'Just now',
    tags TEXT[] DEFAULT ARRAY['New'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customer Relationship Counts Telemetry
CREATE TABLE IF NOT EXISTS customer_relationships (
    customer_id VARCHAR(64) PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
    deals_count INT NOT NULL DEFAULT 0,
    emails_count INT NOT NULL DEFAULT 0,
    whatsapp_count INT NOT NULL DEFAULT 0,
    calls_count INT NOT NULL DEFAULT 0,
    tasks_count INT NOT NULL DEFAULT 0,
    documents_count INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Leads
DO $$ BEGIN
    CREATE TYPE lead_tier_enum AS ENUM ('HOT', 'WARM', 'COLD');
    CREATE TYPE lead_status_enum AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'NURTURING', 'UNQUALIFIED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255) NOT NULL,
    title VARCHAR(150),
    status lead_status_enum NOT NULL DEFAULT 'NEW',
    score INT NOT NULL DEFAULT 85 CHECK (score >= 0 AND score <= 100),
    tier lead_tier_enum NOT NULL DEFAULT 'HOT',
    fit_weight INT NOT NULL DEFAULT 80,
    engagement_weight INT NOT NULL DEFAULT 85,
    intent_weight INT NOT NULL DEFAULT 90,
    uncontacted_days INT NOT NULL DEFAULT 0,
    value BIGINT NOT NULL DEFAULT 0, -- Deal Value in INR
    assigned_to_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    assigned_to_name VARCHAR(255),
    last_activity TEXT,
    notes TEXT,
    industry VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Deals & Pipeline
DO $$ BEGIN
    CREATE TYPE deal_stage_enum AS ENUM ('DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CLOSED WON', 'CLOSED LOST');
    CREATE TYPE deal_risk_enum AS ENUM ('LOW', 'MEDIUM', 'HIGH');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS deals (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    amount BIGINT NOT NULL DEFAULT 0, -- Deal size in INR
    stage deal_stage_enum NOT NULL DEFAULT 'DISCOVERY',
    risk deal_risk_enum NOT NULL DEFAULT 'LOW',
    close_date VARCHAR(50),
    probability INT NOT NULL DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
    owner_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    owner_name VARCHAR(255),
    ai_insight TEXT,
    recommended_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Softphone Telephony & Call Recordings
CREATE TABLE IF NOT EXISTS call_recordings (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) REFERENCES customers(id) ON DELETE SET NULL,
    contact_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    rep_name VARCHAR(255) NOT NULL,
    duration INT NOT NULL DEFAULT 0, -- In seconds
    audio_url TEXT,
    minio_key VARCHAR(255),
    sentiment sentiment_type NOT NULL DEFAULT 'Positive',
    talk_ratio INT NOT NULL DEFAULT 50, -- e.g. 42%
    listen_ratio INT NOT NULL DEFAULT 50, -- e.g. 58%
    silence_count INT NOT NULL DEFAULT 0,
    ai_summary TEXT,
    recommended_next_step TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS call_transcripts (
    id BIGSERIAL PRIMARY KEY,
    call_id VARCHAR(64) NOT NULL REFERENCES call_recordings(id) ON DELETE CASCADE,
    time_offset VARCHAR(20) NOT NULL,
    speaker VARCHAR(50) NOT NULL, -- 'Sales Rep', 'Customer'
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS call_action_items (
    id VARCHAR(64) PRIMARY KEY,
    call_id VARCHAR(64) NOT NULL REFERENCES call_recordings(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- 7. Unified Omnichannel Inbox
CREATE TABLE IF NOT EXISTS conversations (
    id VARCHAR(64) PRIMARY KEY,
    contact_id VARCHAR(64) REFERENCES customers(id) ON DELETE SET NULL,
    contact_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    channel VARCHAR(30) NOT NULL DEFAULT 'email', -- 'whatsapp', 'email', 'sms', 'calls'
    last_message TEXT,
    unread_count INT NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'active', 'waiting', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id VARCHAR(64) PRIMARY KEY,
    conversation_id VARCHAR(64) NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    channel VARCHAR(30) NOT NULL DEFAULT 'email',
    sender VARCHAR(30) NOT NULL, -- 'customer', 'rep', 'ai_agent'
    sender_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'sent', -- 'sent', 'delivered', 'read'
    ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Autonomous AI Agent Executions
CREATE TABLE IF NOT EXISTS ai_agent_executions (
    id VARCHAR(64) PRIMARY KEY,
    prompt TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'planning', -- 'planning', 'ready_to_approve', 'executing', 'completed', 'failed'
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_agent_plan_steps (
    id BIGSERIAL PRIMARY KEY,
    execution_id VARCHAR(64) NOT NULL REFERENCES ai_agent_executions(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    audit_detail TEXT
);

CREATE TABLE IF NOT EXISTS ai_agent_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    execution_id VARCHAR(64) NOT NULL REFERENCES ai_agent_executions(id) ON DELETE CASCADE,
    timestamp VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'info' -- 'info', 'action', 'success'
);

-- 9. Workflows & Automation
CREATE TABLE IF NOT EXISTS workflows (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'active', 'draft', 'paused'
    last_run VARCHAR(50),
    run_count INT NOT NULL DEFAULT 0,
    nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
    edges JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Radar & Proactive Intelligence
CREATE TABLE IF NOT EXISTS radar_items (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- 'hot_lead', 'at_risk_deal', 'upsell_candidate', 'churn_alert', 'overdue_followup'
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    value VARCHAR(100),
    risk_level VARCHAR(30) DEFAULT 'info', -- 'critical', 'warning', 'high_positive', 'info'
    entity_id VARCHAR(64) NOT NULL,
    entity_type VARCHAR(30) NOT NULL, -- 'lead', 'deal', 'customer', 'task'
    action_text VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Sales Rep Coaching
CREATE TABLE IF NOT EXISTS sales_rep_coaching (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar TEXT,
    quota_pacing INT NOT NULL DEFAULT 100, -- in %
    talk_ratio INT NOT NULL DEFAULT 45,
    listen_ratio INT NOT NULL DEFAULT 55,
    objection_handling INT NOT NULL DEFAULT 80, -- in %
    rating DECIMAL(2,1) NOT NULL DEFAULT 4.5, -- 1.0 to 5.0
    strengths TEXT[] DEFAULT ARRAY[]::TEXT[],
    weaknesses TEXT[] DEFAULT ARRAY[]::TEXT[],
    coaching_recommendations TEXT[] DEFAULT ARRAY[]::TEXT[],
    recent_calls_count INT NOT NULL DEFAULT 0,
    win_rate INT NOT NULL DEFAULT 50,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Security Audit Logs & RBAC
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(100) NOT NULL,
    action VARCHAR(255) NOT NULL,
    entity VARCHAR(150) NOT NULL,
    ip_address VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'success', -- 'success', 'warning', 'error'
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    can_view BOOLEAN NOT NULL DEFAULT TRUE,
    can_create BOOLEAN NOT NULL DEFAULT FALSE,
    can_edit BOOLEAN NOT NULL DEFAULT FALSE,
    can_delete BOOLEAN NOT NULL DEFAULT FALSE
);

-- 13. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_customers_org ON customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_customers_health ON customers(health_score);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_tier ON leads(tier);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_customer ON deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, read);
