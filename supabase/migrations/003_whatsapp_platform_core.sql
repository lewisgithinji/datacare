-- 003_whatsapp_platform_core.sql
-- Core WhatsApp platform schema (copied from original with whatsapp_ prefix)
-- Source archived at: supabase/migrations-archive/old-migrations/20250107000004_whatsapp_platform_with_prefix.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- whatsapp_organizations (multi-tenant)
CREATE TABLE whatsapp_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  whatsapp_phone_number_id TEXT UNIQUE,
  whatsapp_business_account_id TEXT,
  whatsapp_access_token TEXT,
  whatsapp_verify_token TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'professional', 'enterprise')),
  plan_expires_at TIMESTAMPTZ,
  features JSONB DEFAULT '{"ai_chatbot": true, "workflows": false, "analytics": true, "campaigns": false, "api_access": false}'::jsonb,
  branding JSONB DEFAULT '{"logo_url": null, "primary_color": "#3B82F6", "company_name": null, "custom_domain": null}'::jsonb,
  settings JSONB DEFAULT '{}'::jsonb,
  billing_info JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- whatsapp_team_members
CREATE TABLE whatsapp_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'supervisor', 'agent', 'viewer')),
  permissions JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'busy', 'away')),
  last_seen_at TIMESTAMPTZ,
  max_concurrent_conversations INT DEFAULT 5,
  skills TEXT[] DEFAULT '{}',
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- (Additional tables and indexes are included in the archived source file.)
