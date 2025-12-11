# WhatsApp Tables - Final Setup with whatsapp_ Prefix

## Summary

All code has been updated to use `whatsapp_` prefix for WhatsApp messaging tables.

✅ React components updated (`Inbox.tsx`)
✅ Seed data updated (`seed-test-data.sql`)
⚠️ **Main migration needs manual update** (see below)

---

## What's Already Done

### 1. Code References ✅
**File:** `src/pages/messaging/Inbox.tsx`

All Supabase queries now use:
- `whatsapp_conversations`
- `whatsapp_messages`
- `whatsapp_contacts`
- `whatsapp_team_members`

Realtime subscriptions also updated.

### 2. Test Data ✅
**File:** `supabase/seed-test-data.sql`

All INSERT statements use:
- `INSERT INTO whatsapp_contacts`
- `INSERT INTO whatsapp_conversations`
- `INSERT INTO whatsapp_messages`

---

## What Needs to Be Done

### Option 1: Manual Find/Replace (Recommended)

Open `supabase/migrations/20250107000001_create_whatsapp_platform_schema.sql` and do find/replace:

| Find | Replace With |
|------|--------------|
| `CREATE TABLE organizations` | `CREATE TABLE whatsapp_organizations` |
| `CREATE TABLE team_members` | `CREATE TABLE whatsapp_team_members` |
| `CREATE TABLE contacts` | `CREATE TABLE whatsapp_contacts` |
| `CREATE TABLE conversations` | `CREATE TABLE whatsapp_conversations` |
| `CREATE TABLE messages` | `CREATE TABLE whatsapp_messages` |
| `CREATE TABLE templates` | `CREATE TABLE whatsapp_templates` |
| `CREATE TABLE campaigns` | `CREATE TABLE whatsapp_campaigns` |
| `REFERENCES organizations(` | `REFERENCES whatsapp_organizations(` |
| `REFERENCES team_members(` | `REFERENCES whatsapp_team_members(` |
| `REFERENCES contacts(` | `REFERENCES whatsapp_contacts(` |
| `REFERENCES conversations(` | `REFERENCES whatsapp_conversations(` |
| `REFERENCES templates(` | `REFERENCES whatsapp_templates(` |
| `FROM organizations` | `FROM whatsapp_organizations` |
| `FROM contacts` | `FROM whatsapp_contacts` |
| `FROM conversations` | `FROM whatsapp_conversations` |
| `FROM messages` | `FROM whatsapp_messages` |
| `UPDATE conversations` | `UPDATE whatsapp_conversations` |
| `INSERT INTO organizations` | `INSERT INTO whatsapp_organizations` |
| `INSERT INTO messages` | `INSERT INTO whatsapp_messages` |
| `ON organizations` | `ON whatsapp_organizations` |
| `ON team_members` | `ON whatsapp_team_members` |
| `ON contacts` | `ON whatsapp_contacts` |
| `ON conversations` | `ON whatsapp_conversations` |
| `ON messages` | `ON whatsapp_messages` |
| `ON templates` | `ON whatsapp_templates` |
| `ON campaigns` | `ON whatsapp_campaigns` |
| `idx_organizations_` | `idx_whatsapp_organizations_` |
| `idx_team_members_` | `idx_whatsapp_team_members_` |
| `idx_contacts_` | `idx_whatsapp_contacts_` |
| `idx_conversations_` | `idx_whatsapp_conversations_` |
| `idx_messages_` | `idx_whatsapp_messages_` |
| `idx_templates_` | `idx_whatsapp_templates_` |
| `idx_campaigns_` | `idx_whatsapp_campaigns_` |

**Do this in VS Code:**
1. Open the file
2. Press `Ctrl+H` (Find and Replace)
3. Copy each "Find" value and corresponding "Replace" value
4. Click "Replace All" for each pair
5. Save the file

### Option 2: Use the Pre-configured Editor

If your database editor supports it, use Regex find/replace:

**Find:** `CREATE TABLE (organizations|team_members|contacts|conversations|messages|templates|campaigns)`
**Replace:** `CREATE TABLE whatsapp_$1`

---

## Final Migration Steps

After updating the migration file:

### Step 1: Drop Old Tables (if any exist)
```sql
-- Run in Supabase SQL Editor
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
```

### Step 2: Rename Chatbot Tables
Run: `supabase/migrations/20250107000002_rename_chatbot_tables.sql`

### Step 3: Create WhatsApp Tables
Run: `supabase/migrations/20250107000001_create_whatsapp_platform_schema.sql` (after updating with whatsapp_ prefixes)

### Step 4: Add Test Data
Run: `supabase/seed-test-data.sql`

### Step 5: Visit Inbox
http://localhost:8081/messaging/inbox

---

## Table Structure Reference

```
Database after all migrations:

├── chatbot_analytics
├── chatbot_conversations
├── chatbot_faq_responses
├── chatbot_messages
├── chatbot_recommendations
├── whatsapp_campaigns
├── whatsapp_contacts
├── whatsapp_conversations
├── whatsapp_messages
├── whatsapp_organizations
├── whatsapp_team_members
└── whatsapp_templates
```

Clean and organized! 🎯

---

## Quick Test

After running migrations, verify in Supabase SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name LIKE 'whatsapp_%'
ORDER BY table_name;
```

Should return 7 tables starting with `whatsapp_`.

---

## If You Need Help

The file is ~1200 lines, so find/replace is fastest. If you encounter issues:
1. Check for typos in find/replace
2. Ensure you replaced ALL instances
3. Look for any remaining references to old table names

All the React code is already updated and ready to go! 🚀
