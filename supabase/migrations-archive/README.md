# Archived Migrations

## Why These Were Archived

These migration files were superseded by the consolidated migrations in the main `../migrations/` folder.

## Timeline

1. **2024-08-24**: Initial chatbot system migrations created with UUID names
2. **2025-01-07**: WhatsApp platform migrations created with timestamp prefix
3. **2025-01-08**: Cleanup and consolidation into sequential numbered migrations

## Old Migration History

### Chatbot Migrations (August 2024)
- `20250824080257_2f0d65a7-a4e1-430b-818c-e92f53601159.sql` - Initial chatbot system
- `20250824080318_23d0f108-d2c3-42f7-8deb-2924dd27bc28.sql` - Chatbot analytics

### Initial WhatsApp Migrations (January 2025)
- `20250107000001_create_whatsapp_platform_schema.sql` - Tables WITHOUT `whatsapp_` prefix (superseded)
- `20250107000002_rename_chatbot_tables.sql` - Attempted table rename (superseded)
- `20250107000003_rename_to_whatsapp_prefix.sql` - Another rename attempt (superseded)
- `20250107000004_whatsapp_platform_final.sql` - Empty file (0 bytes)
- `20250107000005_complete_cleanup_and_setup.sql` - Cleanup attempt (superseded)

## Current Active Migrations

The following migrations in `../migrations/` are the **ONLY** ones that should be applied:

1. `001_whatsapp_platform_core.sql` (26K) - Complete WhatsApp platform schema with `whatsapp_` prefix
2. `002_campaigns_management.sql` (13K) - Campaign tables and templates
3. `003_settings_configuration.sql` (14K) - Settings, preferences, API keys
4. `004_disable_email_dev.sql` (2.7K) - Disable email confirmation in dev

## Important Notes

- **DO NOT** apply migrations from this archive folder
- They exist purely for historical reference
- The main migrations folder contains the consolidated, production-ready migrations
- Table naming convention: All WhatsApp platform tables use `whatsapp_` prefix

## What Changed During Consolidation

### Table Name Changes
- `organizations` → `whatsapp_organizations`
- `team_members` → `whatsapp_team_members`
- `contacts` → `whatsapp_contacts`
- `conversations` → `whatsapp_conversations`
- `messages` → `whatsapp_messages`
- `templates` → `whatsapp_templates`
- `campaigns` → `whatsapp_campaigns`
- `automation_workflows` → `whatsapp_automation_workflows`
- `analytics_events` → `whatsapp_analytics_events`

### Schema Improvements
- Consolidated all related tables into single migrations
- Added comprehensive indexes
- Implemented Row Level Security (RLS) policies
- Added triggers for updated_at timestamps
- Created helper functions and views
- Added demo organization seed data

## Migration Strategy Going Forward

**New migrations should:**
1. Use sequential numbering: `005_*.sql`, `006_*.sql`, etc.
2. Include descriptive names: `005_add_webhooks.sql`
3. Be self-contained and idempotent where possible
4. Include rollback comments if complex
5. Follow the established naming convention (`whatsapp_` prefix for platform tables)

## Cleanup Performed

- **Date**: 2025-01-08
- **By**: Claude Code
- **Reason**: Multiple duplicate and conflicting migration files causing database setup issues
- **Result**: 11 old migrations archived, 4 clean sequential migrations active
