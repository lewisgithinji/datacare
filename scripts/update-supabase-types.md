# Update Supabase TypeScript Types

## Why Update Types?

Your current `src/integrations/supabase/types.ts` only includes the old chatbot tables. It's missing all the new WhatsApp platform tables (whatsapp_contacts, whatsapp_conversations, etc.).

## Option 1: Using Supabase CLI (Recommended)

### Prerequisites
```bash
# Install Supabase CLI if not already installed
npm install -g supabase
```

### Steps

1. **Login to Supabase:**
   ```bash
   npx supabase login
   ```

2. **Link your project:**
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

   Find your project ref in Supabase Dashboard:
   - Go to Settings > General
   - Copy "Reference ID"

3. **Generate types:**
   ```bash
   npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
   ```

4. **Verify the output:**
   ```bash
   # Check that new types are included
   grep -i "whatsapp" src/integrations/supabase/types.ts
   ```

## Option 2: Manual from Supabase Dashboard

1. **Get your project details:**
   - Project URL: From Supabase Dashboard > Settings > API
   - Project ID: From the URL (https://app.supabase.com/project/YOUR_ID)

2. **Use Supabase API:**
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/integrations/supabase/types.ts
   ```

3. **Or use the project ref directly:**
   ```bash
   curl "https://YOUR_PROJECT_REF.supabase.co/rest/v1/?apikey=YOUR_ANON_KEY" \
     -H "Accept: application/vnd.pgrst.object+json" | \
     npx supabase gen types typescript --stdin > src/integrations/supabase/types.ts
   ```

## Option 3: Copy from Supabase Studio

1. **Go to Supabase Dashboard**
2. **Navigate to:** Database > Types
3. **Click:** "Generate Types" button
4. **Copy the generated TypeScript code**
5. **Paste into:** `src/integrations/supabase/types.ts`

## After Updating Types

### Update your imports:

**Before:**
```typescript
import { Database } from '@/integrations/supabase/types'

// Limited to old tables
type Conversation = Database['public']['Tables']['conversations']['Row']
```

**After:**
```typescript
import { Database } from '@/integrations/supabase/types'

// Now includes WhatsApp tables
type WhatsAppConversation = Database['public']['Tables']['whatsapp_conversations']['Row']
type WhatsAppContact = Database['public']['Tables']['whatsapp_contacts']['Row']
type WhatsAppMessage = Database['public']['Tables']['whatsapp_messages']['Row']
```

### Use with Supabase queries:

```typescript
import { supabase } from '@/lib/supabase'
import { Database } from '@/integrations/supabase/types'

type WhatsAppConversation = Database['public']['Tables']['whatsapp_conversations']['Row']

const { data, error } = await supabase
  .from('whatsapp_conversations')
  .select('*')
  .returns<WhatsAppConversation[]>()
```

## Expected New Tables in Types

After updating, you should see these table definitions:

- ✅ `whatsapp_organizations`
- ✅ `whatsapp_team_members`
- ✅ `whatsapp_contacts`
- ✅ `whatsapp_conversations`
- ✅ `whatsapp_messages`
- ✅ `whatsapp_templates`
- ✅ `whatsapp_campaigns`
- ✅ `whatsapp_automation_workflows`
- ✅ `whatsapp_analytics_events`

Plus existing chatbot tables:
- ✅ `conversations`
- ✅ `conversation_messages`
- ✅ `chatbot_analytics`
- ✅ `faq_responses`
- ✅ `recommendations`

## Troubleshooting

### "Project not found" error
- Verify your project ID/ref is correct
- Check you're logged into the right Supabase account
- Ensure you have access to the project

### "Permission denied" error
- Make sure you're the project owner or have admin access
- Try logging in again: `npx supabase login`

### Generated file is empty
- Check your database has tables
- Verify you're targeting the correct schema (usually 'public')
- Try with `--schema public` flag explicitly

### Old types still present
- Clear TypeScript cache: Delete `node_modules/.cache`
- Restart your IDE/editor
- Run `npm run build` to verify no type errors

## Quick Command Reference

```bash
# One-liner to update types (after linking project)
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts

# With specific project ID
npx supabase gen types typescript --project-id abcdefghijklmnop > src/integrations/supabase/types.ts

# Multiple schemas
npx supabase gen types typescript --linked --schema public,auth > src/integrations/supabase/types.ts
```

---

**Pro Tip:** Add this as an npm script in `package.json`:

```json
{
  "scripts": {
    "types:update": "npx supabase gen types typescript --linked > src/integrations/supabase/types.ts"
  }
}
```

Then simply run:
```bash
npm run types:update
```
