# WhatsApp/Chatbot Dashboard Setup Guide

## Current Status

✅ Database schema created with `whatsapp_` prefix
✅ Seed data available in `supabase/seed-test-data.sql`
✅ Frontend dashboard UI built (`/messaging/inbox`)
✅ Supabase client configured
❌ Data not visible due to Row Level Security (RLS)
❌ No authentication system implemented

---

## Quick Start: Make Data Visible (Choose One Option)

### Option A: Enable Public Access (Fastest - Development Only)

**⚠️ WARNING: Only for development! Never use in production!**

1. **Run the public access policy script:**
   ```bash
   # Open Supabase SQL Editor and run:
   ```
   - Navigate to your Supabase project
   - Go to SQL Editor
   - Copy contents of `supabase/enable-public-access-dev-only.sql`
   - Execute the script

2. **Verify the seed data exists:**
   ```bash
   # In Supabase SQL Editor, run:
   ```
   - Copy contents of `supabase/seed-test-data.sql`
   - Execute to insert test data

3. **Access the dashboard:**
   ```bash
   npm run dev
   ```
   - Visit: `http://localhost:5173/messaging/inbox`
   - You should now see the 4 test conversations!

---

### Option B: Create Test User (Recommended - Production-Ready)

1. **Create a test user in Supabase:**
   - Go to Supabase Dashboard
   - Navigate to: **Authentication** > **Users** > **Add User**
   - Email: `demo@datacare.co.ke`
   - Password: `DatacareDemo2025!`
   - Click "Create User"
   - **Copy the User ID** (UUID)

2. **Link user to demo organization:**
   - Open Supabase SQL Editor
   - Run the following (replace `YOUR-USER-ID-HERE`):

   ```sql
   INSERT INTO whatsapp_team_members (
     organization_id,
     user_id,
     role,
     permissions,
     is_active,
     status,
     max_concurrent_conversations,
     skills,
     display_name
   ) VALUES (
     '00000000-0000-0000-0000-000000000001'::uuid,
     'YOUR-USER-ID-HERE'::uuid,  -- Replace with copied User ID
     'admin',
     '["manage_users", "manage_conversations", "manage_settings", "view_analytics"]'::jsonb,
     true,
     'online',
     10,
     ARRAY['sales', 'support', 'technical'],
     'Demo Admin'
   );
   ```

3. **Run seed data:**
   - In SQL Editor, run: `supabase/seed-test-data.sql`

4. **Create login page** (Coming in Phase 2)
   - For now, you can use Supabase's built-in auth UI
   - Or I can help build a custom login page

---

## Verify Data Visibility

Run this query in Supabase SQL Editor:

```sql
-- Check data counts
SELECT
  (SELECT COUNT(*) FROM whatsapp_organizations WHERE id = '00000000-0000-0000-0000-000000000001') as orgs,
  (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = '00000000-0000-0000-0000-000000000001') as contacts,
  (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = '00000000-0000-0000-0000-000000000001') as conversations,
  (SELECT COUNT(*) FROM whatsapp_messages WHERE organization_id = '00000000-0000-0000-0000-000000000001') as messages;
```

Expected results:
- orgs: 1
- contacts: 4
- conversations: 4
- messages: 17

---

## Understanding the Problem

### Why Was Data Not Visible?

1. **Row Level Security (RLS) Enabled**
   - All WhatsApp tables have RLS enabled
   - Policies require authenticated users linked to an organization
   - Anonymous/unauthenticated requests are blocked

2. **Missing User-Organization Link**
   - Seed data creates contacts/conversations
   - But no entries in `whatsapp_team_members` to link users to the org
   - RLS function `user_whatsapp_organization_ids()` returns empty

3. **No Authentication Flow**
   - No login page exists
   - Dashboard expects authenticated user
   - Supabase client has no valid session

---

## Next Steps (After Data is Visible)

### Phase 2: Authentication System
- [ ] Build login/signup pages
- [ ] Add protected routes
- [ ] Create user profile management
- [ ] Add password reset flow

### Phase 3: Enhanced Dashboard
- [ ] Main dashboard with statistics
- [ ] Contact/lead management
- [ ] Campaign builder
- [ ] Analytics and reporting

### Phase 4: Integration
- [ ] Merge with existing chatbot conversations
- [ ] Add lead scoring from chatbot data
- [ ] Product catalog integration
- [ ] Revenue tracking

### Phase 5: Production Readiness
- [ ] Remove public access policies
- [ ] Set up proper RLS for multi-tenant
- [ ] Add audit logging
- [ ] Performance optimization

---

## Test Data Overview

The seed data includes:

**4 Contacts:**
1. John Kamau - Enterprise customer (Microsoft 365 inquiry)
2. Grace Wanjiru - School principal (Google Workspace)
3. David Omondi - Support ticket (license issue)
4. Sarah Akinyi - New lead (just started conversation)

**4 Conversations:**
- 1 open, 1 assigned, 1 pending, 1 open
- Different priorities: high, normal, urgent
- Categories: sales, support, general_inquiry
- 17 total messages across all conversations

---

## Dashboard Routes

Currently available:
- `/messaging/inbox` - WhatsApp messaging dashboard

Coming soon:
- `/dashboard` - Main overview
- `/dashboard/inbox` - Move messaging here
- `/dashboard/chatbot` - AI chatbot conversations
- `/dashboard/contacts` - Contact management
- `/dashboard/analytics` - Metrics & insights
- `/dashboard/campaigns` - Bulk messaging
- `/dashboard/settings` - Organization settings

---

## Troubleshooting

### "No conversations yet" message appears

**Check:**
1. Is the seed data actually inserted?
   ```sql
   SELECT COUNT(*) FROM whatsapp_conversations;
   ```

2. Are RLS policies allowing access?
   ```sql
   SELECT * FROM whatsapp_conversations LIMIT 1;
   ```
   If this returns nothing but count shows data, RLS is blocking.

3. Check browser console for errors
   - Open DevTools (F12)
   - Look for Supabase query errors
   - Check Network tab for failed requests

### Supabase connection errors

**Verify environment variables:**
```bash
# Check .env file has:
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Restart dev server after .env changes:**
```bash
npm run dev
```

### TypeScript errors

**Regenerate types:**
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

---

## Files Created

- `supabase/enable-public-access-dev-only.sql` - Public access policies
- `supabase/create-test-user.sql` - Test user setup guide
- `supabase/seed-test-data.sql` - Sample data (already existed)
- `DASHBOARD_SETUP_GUIDE.md` - This file

---

## Security Notes

**Development vs Production:**

| Feature | Development | Production |
|---------|-------------|------------|
| Public access policies | ✅ OK | ❌ Never |
| Anonymous queries | ✅ OK | ❌ Never |
| Test data | ✅ OK | ❌ Remove |
| Hardcoded UUIDs | ✅ OK | ❌ Use real IDs |
| Auth required | ⚠️ Optional | ✅ Always |

**Before deploying to production:**
1. Drop all `dev_public_*` policies
2. Implement proper authentication
3. Test RLS with multiple users/organizations
4. Add rate limiting
5. Enable audit logging

---

## Support

Need help? Check:
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/overview)
- Supabase Dashboard > Logs for query errors

---

**Ready to proceed?** Run Option A or B above to make your data visible! 🚀
