-- Migration: Create Broadcast Tables (Phase 1 Marketing Features)
-- Includes: whatsapp_providers, whatsapp_templates, whatsapp_broadcasts

-- 1. whatsapp_providers: Stores API credentials per organization
create table if not exists public.whatsapp_providers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.whatsapp_organizations(id) on delete cascade not null unique,
  provider_type text default 'meta', -- 'meta', '360dialog', etc.
  phone_number_id text not null,
  waba_id text not null, -- WhatsApp Business Account ID
  access_token text not null, -- Encrypted in app logic, but stored here
  webhook_verify_token text not null,
  phone_number text,
  display_name text,
  status text default 'active', -- active, disconnected, banned
  quality_rating text, -- GREEN, YELLOW, RED
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. whatsapp_templates: Stores approved HSM templates synced from Meta
create table if not exists public.whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.whatsapp_organizations(id) on delete cascade not null,
  whatsapp_template_id text, -- ID from Meta
  name text not null,
  language text not null default 'en',
  category text not null, -- MARKETING, UTILITY, AUTHENTICATION
  status text not null, -- APPROVED, REJECTED, PENDING
  components jsonb not null default '[]'::jsonb, -- Header, Body, Footer, Buttons
  quality_score text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(organization_id, name, language)
);

-- 3. whatsapp_broadcasts: Stores broadcast campaigns
create table if not exists public.whatsapp_broadcasts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.whatsapp_organizations(id) on delete cascade not null,
  name text not null,
  template_id uuid references public.whatsapp_templates(id),
  segment_criteria jsonb, -- Filter logic e.g. { "tag": "vip" }
  status text default 'draft', -- draft, scheduled, sending, completed, failed
  scheduled_at timestamp with time zone,
  total_recipients integer default 0,
  successful_sends integer default 0,
  failed_sends integer default 0,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.whatsapp_providers enable row level security;
alter table public.whatsapp_templates enable row level security;
alter table public.whatsapp_broadcasts enable row level security;

-- Policy Helper: Users can access data if they belong to the organization
-- Reusing the pattern from existing tables

-- Policies for whatsapp_providers
create policy "Users can view providers for their org"
  on public.whatsapp_providers for select
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members where user_id = auth.uid()
    )
  );

create policy "Admins can manage providers"
  on public.whatsapp_providers for all
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members 
      where user_id = auth.uid() and role in ('admin', 'owner')
    )
  );

-- Policies for whatsapp_templates
create policy "Users can view templates for their org"
  on public.whatsapp_templates for select
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members where user_id = auth.uid()
    )
  );

create policy "Admins can manage templates"
  on public.whatsapp_templates for all
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members 
      where user_id = auth.uid() and role in ('admin', 'owner')
    )
  );

-- Policies for whatsapp_broadcasts
create policy "Users can view broadcasts for their org"
  on public.whatsapp_broadcasts for select
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members where user_id = auth.uid()
    )
  );

create policy "Users can create broadcasts for their org"
  on public.whatsapp_broadcasts for insert
  with check (
    organization_id in (
      select organization_id from public.whatsapp_team_members where user_id = auth.uid()
    )
  );

create policy "Users can update broadcasts for their org"
  on public.whatsapp_broadcasts for update
  using (
    organization_id in (
      select organization_id from public.whatsapp_team_members where user_id = auth.uid()
    )
  );
