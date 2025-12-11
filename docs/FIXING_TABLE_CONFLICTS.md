# Fixing Table Name Conflicts

## The Problem

Your Supabase database has **table name conflicts** between two different systems:

1. **Website Chatbot** (older system)
   - Uses: `conversations`, `conversation_messages`, `recommendations`
   - Purpose: Store chatbot wizard sessions and analytics

2. **WhatsApp Messaging Platform** (new system)
   - Uses: `conversations`, `messages`, `contacts`
   - Purpose: Multi-tenant WhatsApp messaging

Both systems tried to create a `conversations` table with different schemas, causing conflicts.

---

## The Solution

Rename chatbot tables to use `chatbot_` prefix:

| Old Table Name | New Table Name |
|----------------|----------------|
| `conversations` | `chatbot_conversations` |
| `conversation_messages` | `chatbot_messages` |
| `recommendations` | `chatbot_recommendations` |
| `chatbot_analytics` | *(stays the same)* |
| `faq_responses` | `chatbot_faq_responses` |

---

## Step-by-Step Fix

### Step 1: Run the Rename Migration

Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/akffppqsrwveplnbeisx/sql

1. Click **New Query**
2. Copy the entire contents of: `supabase/migrations/20250107000002_rename_chatbot_tables.sql`
3. Paste and click **Run**

This will:
- ✅ Drop old conflicting tables
- ✅ Create new chatbot tables with `chatbot_` prefix
- ✅ Set up proper RLS policies
- ✅ Insert FAQ data

### Step 2: Run the WhatsApp Platform Migration

Now that the conflict is resolved, run the WhatsApp migration:

1. Click **New Query**
2. Copy the entire contents of: `supabase/migrations/20250107000001_create_whatsapp_platform_schema.sql`
3. Paste and click **Run**

This will create:
- ✅ `organizations` - Multi-tenant support
- ✅ `team_members` - Agents
- ✅ `contacts` - Customers
- ✅ `conversations` - WhatsApp conversations
- ✅ `messages` - WhatsApp messages
- ✅ `templates` - Message templates
- ✅ `campaigns` - Bulk messaging

### Step 3: Add Test Data

1. Click **New Query**
2. Copy the entire contents of: `supabase/seed-test-data.sql`
3. Paste and click **Run**

This will create 4 sample conversations with realistic messages.

### Step 4: Verify Everything Works

Visit the inbox:
- **Local**: http://localhost:8081/messaging/inbox

You should see 4 conversations!

---

## What Changed

### Before (CONFLICT)
```
Database Tables:
├── conversations (chatbot) ❌ CONFLICT
├── conversations (whatsapp) ❌ CONFLICT
└── ERROR: relation "conversations" already exists
```

### After (FIXED)
```
Database Tables:
├── chatbot_conversations (website chatbot)
├── chatbot_messages (chatbot messages)
├── chatbot_recommendations (product suggestions)
├── chatbot_analytics (chatbot tracking)
├── chatbot_faq_responses (FAQ data)
├── organizations (WhatsApp multi-tenant)
├── team_members (WhatsApp agents)
├── contacts (WhatsApp customers)
├── conversations (WhatsApp conversations) ✅
├── messages (WhatsApp messages) ✅
├── templates (WhatsApp templates)
└── campaigns (WhatsApp campaigns)
```

---

## Future Updates Needed

If the website chatbot currently uses Supabase (it might just be client-side), you'll need to update references:

**Search for:**
- `from('conversations')`
- `from('conversation_messages')`
- `from('recommendations')`

**Replace with:**
- `from('chatbot_conversations')`
- `from('chatbot_messages')`
- `from('chatbot_recommendations')`

Let me know if the chatbot is currently using the database and I'll help update those references!

---

## Summary

The issue was that both systems wanted the same table name. By prefixing chatbot tables with `chatbot_`, we now have:

- ✅ **Website chatbot** uses `chatbot_*` tables
- ✅ **WhatsApp platform** uses standard table names
- ✅ No conflicts!
- ✅ Both systems work independently

Run the migrations in order (1 → 2 → 3) and you're all set! 🎉
