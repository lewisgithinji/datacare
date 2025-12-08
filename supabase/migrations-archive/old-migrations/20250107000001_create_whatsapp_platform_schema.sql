-- DataCare WhatsApp Platform - Multi-Tenant Database Schema
-- Migration: Initial Schema Setup
-- Created: 2025-01-07

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ORGANIZATIONS (Multi-tenant support)
-- ============================================================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,

  -- WhatsApp credentials (encrypted)
  whatsapp_phone_number_id TEXT UNIQUE,
  whatsapp_business_account_id TEXT,
  whatsapp_access_token TEXT,
  whatsapp_verify_token TEXT,

  -- Plan & billing
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'professional', 'enterprise')),
  plan_expires_at TIMESTAMPTZ,

  -- Features & settings
  features JSONB DEFAULT '{
    "ai_chatbot": true,
    "workflows": false,
    "analytics": true,
    "campaigns": false,
    "api_access": false
  }'::jsonb,

  -- Branding (white-label)
  branding JSONB DEFAULT '{
    "logo_url": null,
    "primary_color": "#3B82F6",
    "company_name": null,
    "custom_domain": null
  }'::jsonb,

  -- Settings
  settings JSONB DEFAULT '{
    "business_hours": {
      "enabled": true,
      "timezone": "Africa/Nairobi",
      "schedule": {
        "monday": {"start": "08:00", "end": "18:00"},
        "tuesday": {"start": "08:00", "end": "18:00"},
        "wednesday": {"start": "08:00", "end": "18:00"},
        "thursday": {"start": "08:00", "end": "18:00"},
        "friday": {"start": "08:00", "end": "18:00"},
        "saturday": null,
        "sunday": null
      }
    },
    "auto_response": {
      "enabled": true,
      "outside_hours_message": "Thank you for contacting us. We will respond during business hours."
    },
    "languages": ["en", "sw"]
  }'::jsonb,

  billing_info JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_active ON organizations(is_active) WHERE is_active = true;

-- (Truncated here in archive copy)
