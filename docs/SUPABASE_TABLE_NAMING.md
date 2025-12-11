# Supabase Table Naming Convention

## Clear Differentiation Between Systems

To avoid conflicts and provide clear differentiation, all tables use prefixes:

---

## Website Chatbot Tables

**Prefix:** `chatbot_`

| Table Name | Purpose |
|------------|---------|
| `chatbot_conversations` | Wizard chat sessions from website |
| `chatbot_messages` | Individual chat messages |
| `chatbot_recommendations` | Product recommendations generated |
| `chatbot_analytics` | Analytics events and tracking |
| `chatbot_faq_responses` | FAQ knowledge base |

---

## WhatsApp Messaging Platform Tables

**Prefix:** `whatsapp_`

| Table Name | Purpose |
|------------|---------|
| `whatsapp_organizations` | Multi-tenant organizations/clients |
| `whatsapp_team_members` | Agents and staff members |
| `whatsapp_contacts` | WhatsApp customer contacts |
| `whatsapp_conversations` | WhatsApp chat conversations |
| `whatsapp_messages` | Individual WhatsApp messages |
| `whatsapp_templates` | WhatsApp message templates |
| `whatsapp_campaigns` | Bulk messaging campaigns |

---

## Migration Order

Run migrations in this order:

1. **`20250107000002_rename_chatbot_tables.sql`**
   - Renames chatbot tables to use `chatbot_` prefix
   - Fixes conflicts from old migration

2. **`20250107000001_create_whatsapp_platform_schema.sql`**
   - Creates WhatsApp platform tables with `whatsapp_` prefix
   - ⚠️ **UPDATE THIS FILE**: Replace all table names with `whatsapp_` prefix before running

3. **`seed-test-data.sql`**
   - Populates WhatsApp tables with test data
   - ✅ Already updated with `whatsapp_` prefixes

---

## Code References

### React Components (Already Updated)

- `src/pages/messaging/Inbox.tsx` ✅
  - Uses `whatsapp_conversations`, `whatsapp_messages`, `whatsapp_contacts`
  - Realtime subscriptions updated

### Need to Update

- `supabase/migrations/20250107000001_create_whatsapp_platform_schema.sql`
  - Find/replace all table names to add `whatsapp_` prefix

### Edge Function (Future)

When building the WhatsApp webhook Edge Function, use:
- `whatsapp_organizations`
- `whatsapp_contacts`
- `whatsapp_conversations`
- `whatsapp_messages`

---

## Quick Reference

### Chatbot System
```typescript
// Chatbot queries
supabase.from('chatbot_conversations')
supabase.from('chatbot_messages')
supabase.from('chatbot_recommendations')
```

### WhatsApp System
```typescript
// WhatsApp queries
supabase.from('whatsapp_organizations')
supabase.from('whatsapp_conversations')
supabase.from('whatsapp_messages')
supabase.from('whatsapp_contacts')
```

---

## Benefits of This Approach

✅ **Clear separation** - Easy to identify which system a table belongs to
✅ **No conflicts** - Different prefixes prevent naming collisions
✅ **Scalable** - Can add more systems without conflicts
✅ **Maintainable** - Code is self-documenting
✅ **Database clarity** - Table list shows system boundaries

---

## Example Database View

```
Tables (sorted alphabetically):
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
