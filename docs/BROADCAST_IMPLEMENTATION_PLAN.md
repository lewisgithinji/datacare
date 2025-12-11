# Phase 1: Broadcast Implementation Plan (WhatsApp Official API)

## Overview
This plan outlines the steps to build the **Broadcast Messaging** engine, allowing users to send bulk template messages to contacts. This is a critical marketing feature missing from the current platform.

We validated that the current webhook handler (`supabase/functions/whatsapp-webhook`) is built for the **Official Meta Cloud API** but is currently single-tenant (hardcoded env vars). We need to refactor this for multi-tenancy.

## 1. Database Schema Updates (Multi-Tenancy)

We need to store WhatsApp API credentials *per organization* so each customer can have their own number.

### 1.1 New Table: `whatsapp_providers`
Stores connection details for each organization.

```sql
CREATE TABLE whatsapp_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL UNIQUE,
  provider_type text DEFAULT 'meta', -- 'meta' or '360dialog' etc
  phone_number_id text NOT NULL,
  waba_id text NOT NULL, -- WhatsApp Business Account ID
  access_token text NOT NULL, -- Permanent System User Token
  webhook_verify_token text NOT NULL,
  phone_number text,
  display_name text,
  status text DEFAULT 'active', -- active, disconnected, banned
  quality_rating text, -- GREEN, YELLOW, RED
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 1.2 New Table: `whatsapp_templates`
Stores approved HSM templates synced from Meta.

```sql
CREATE TABLE whatsapp_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  whatsapp_template_id text, -- ID from Meta
  name text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  category text NOT NULL, -- MARKETING, UTILITY, AUTHENTICATION
  status text NOT NULL, -- APPROVED, REJECTED, PENDING
  components jsonb NOT NULL, -- Structure (HEADER, BODY, FOOTER, BUTTONS)
  quality_score text, -- UNKNOWN, HIGH, MEDIUM, LOW
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, name, language)
);
```

### 1.3 New Table: `whatsapp_broadcasts`
Stores the campaign details.

```sql
CREATE TABLE whatsapp_broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  template_id uuid REFERENCES whatsapp_templates(id),
  segment_criteria jsonb, -- Filter logic (e.g. { tag: 'vip' })
  status text DEFAULT 'draft', -- draft, scheduled, sending, completed, failed
  scheduled_at timestamptz,
  total_recipients int DEFAULT 0,
  successful_sends int DEFAULT 0,
  failed_sends int DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);
```

## 2. Backend Implementation (Supabase Edge Functions)

### 2.1 Refactor Webhook (`whatsapp-webhook`)
**Goal**: Identify which organization owns the `phone_number_id` receiving the message.
- Remove hardcoded `WHATSAPP_PHONE_NUMBER_ID` from env vars.
- Look up `organization_id` from `whatsapp_providers` table based on `body.entry[0].changes[0].value.metadata.phone_number_id`.

### 2.2 Template Sync Function (`sync-templates`)
**Goal**: Fetch templates from Meta API and store them in DB.
- Endpoint: `GET /v18.0/{waba_id}/message_templates`
- Run daily via Cron or on-demand button in UI.

### 2.3 Broadcast Dispatcher (`send-broadcast`)
**Goal**: The engine that actually sends messages.
- Input: `broadcast_id`
- Logic:
  1. Fetch broadcast details and template.
  2. Query contacts matching `segment_criteria`.
  3. Loop through contacts (with rate limiting/queueing).
  4. Call `POST /v18.0/{phone_number_id}/messages` for each.
  5. Update `broadcasts` stats.

## 3. Frontend Implementation (React)

### 3.1 Settings > WhatsApp Connection
- Form to input `Access Token`, `Phone Number ID`, `WABA ID`.
- Display connection status and specific Webhook URL (if needed).

### 3.2 Campaigns > Templates
- Grid view of templates.
- "Sync from Meta" button.
- "Create Template" button (Phase 1.5 - for now, just sync existing).
- Preview component to render the template visually.

### 3.3 Campaigns > Broadcast Builder
- **Step 1: Setup**: Name, Schedule.
- **Step 2: Audience**: Filter contacts by Tag/Attribute.
- **Step 3: Content**: Select Template, Map variables (e.g. {{1}} = Contact Name).
- **Step 4: Review & Send**.

## 4. Immediate Next Steps (Priority)

1.  **Run Migration**: Create the tables above.
2.  **Mock Data**: Insert a fake provider connecting "Datacare Demo" to the hardcoded env vars (so we don't break current demo flow, but start shifting to DB-driven config).
3.  **Build Template Sync**: So we can see templates in the UI.
