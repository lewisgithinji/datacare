# Demo Account Setup Instructions

**Status**: Ready to implement
**Created**: 2025-01-08
**Files Ready**: ✅ Migration 005, ✅ Setup Script

---

## Quick Setup (5 minutes)

You're using **cloud Supabase** (not local Docker), so follow these steps:

### Step 1: Create Demo User (2 minutes)

**Option A: Supabase Dashboard (Recommended - Fastest)**

1. Go to: https://supabase.com/dashboard/project/akffppqsrwveplnbeisx
2. Navigate to: **Authentication** → **Users**
3. Click: **"Add User"** button
4. Fill in:
   ```
   Email: demo@datacare.co.ke
   Password: Demo2025!Preview
   ```
5. ✅ Check: **"Auto Confirm User"** (or "Email Confirmed")
6. Click: **"Create User"**
7. ✅ Copy the User ID (UUID) - you'll need this

**Option B: Using the Script** (if you have SERVICE_ROLE_KEY)

```bash
# Set environment variable
set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Run script
node scripts/create-demo-user.js
```

---

### Step 2: Apply Migration 005 (2 minutes)

Since you're using cloud Supabase, you need to run the migration SQL directly:

1. Go to: https://supabase.com/dashboard/project/akffppqsrwveplnbeisx
2. Navigate to: **SQL Editor**
3. Click: **"New Query"**
4. Open file: `supabase/migrations/005_demo_user_and_sample_data.sql`
5. Copy the entire contents
6. Paste into SQL Editor
7. Click: **"Run"** or press `Ctrl+Enter`

**What this does**:
- ✅ Creates demo team member (links user to organization)
- ✅ Seeds 10 sample contacts (John Kamau, Sarah Wanjiru, etc.)
- ✅ Seeds 5 sample conversations
- ✅ Seeds 8 messages in first conversation
- ✅ Seeds 5 additional templates
- ✅ Seeds 3 campaigns with realistic stats

---

### Step 3: Test Demo Login (1 minute)

1. Go to: http://localhost:8081/login (or your dev server URL)
2. Look for the **"Try Demo Account"** card (blue background)
3. Click: **"Login with Demo Account"** button
4. ✅ Should redirect to: `/dashboard`
5. ✅ Demo banner should appear at top
6. ✅ Dashboard should show data:
   - Overview: Stats and activity feed
   - Contacts: 10 contacts visible
   - Inbox: 5 conversations (2 open, 1 pending, 2 resolved)
   - Analytics: Charts with data
   - Campaigns: 3 campaigns listed
   - Settings: Full access

---

## Verification Checklist

After completing the steps above, verify:

- [ ] Demo user exists in **Authentication → Users** (email: demo@datacare.co.ke)
- [ ] Can login via "Login with Demo Account" button
- [ ] Dashboard shows **"Demo Mode"** banner at top
- [ ] **Overview page** shows:
  - Total Conversations: 5
  - Active Conversations: 2
  - Total Contacts: 10
  - Recent activity feed has entries
- [ ] **Contacts page** shows 10 contacts:
  - John Kamau (TechCorp Kenya)
  - Sarah Wanjiru (HealthPlus Medical)
  - Michael Odhiambo (Odhiambo & Associates)
  - etc.
- [ ] **Inbox page** shows 5 conversations
- [ ] **Campaigns page** shows 3 campaigns:
  - January Product Launch 2025 (completed)
  - VIP Customer Appreciation (completed)
  - February Webinar Invite (scheduled)
- [ ] **Settings page** is accessible (admin role)

---

## Troubleshooting

### Issue: "Invalid login credentials"

**Cause**: Demo user not created or email not confirmed

**Fix**:
1. Check Supabase Dashboard → Authentication → Users
2. Verify `demo@datacare.co.ke` exists
3. Check "Email Confirmed At" column has a date (not empty)
4. If empty, click user → Click "Send Email Confirmation" or manually set confirmed

---

### Issue: Dashboard shows all zeros / empty

**Cause**: Migration 005 not applied

**Fix**:
1. Go to SQL Editor in Supabase Dashboard
2. Run this quick check:
   ```sql
   SELECT COUNT(*) as contacts FROM whatsapp_contacts
   WHERE organization_id = '00000000-0000-0000-0000-000000000001';

   SELECT COUNT(*) as conversations FROM whatsapp_conversations
   WHERE organization_id = '00000000-0000-0000-0000-000000000001';
   ```
3. If both return 0, migration wasn't applied
4. Copy and run entire `005_demo_user_and_sample_data.sql` file

---

### Issue: "Organization not found" after login

**Cause**: Demo team member not created

**Fix**:
1. Check if team member exists:
   ```sql
   SELECT * FROM whatsapp_team_members
   WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke');
   ```
2. If empty, run this manually (replace `YOUR_USER_ID` with actual UUID):
   ```sql
   INSERT INTO whatsapp_team_members (
     id,
     organization_id,
     user_id,
     role,
     is_active,
     status,
     display_name,
     max_concurrent_conversations,
     skills
   ) VALUES (
     '00000000-0000-0000-0000-000000000002'::uuid,
     '00000000-0000-0000-0000-000000000001'::uuid,
     'YOUR_USER_ID'::uuid,  -- Replace with actual user ID
     'admin',
     true,
     'online',
     'Demo Admin',
     10,
     ARRAY['sales', 'support', 'technical']
   );
   ```

---

## Alternative: Apply All Migrations to Cloud Database

If you want to apply ALL migrations (001-005) to your cloud Supabase:

1. Go to: SQL Editor in Supabase Dashboard
2. Run migrations in order:
   - `001_whatsapp_platform_core.sql` (if not already applied)
   - `002_campaigns_management.sql` (if not already applied)
   - `003_settings_configuration.sql` (if not already applied)
   - `004_disable_email_dev.sql` (if not already applied)
   - `005_demo_user_and_sample_data.sql` ← **This one is new**

**Note**: Migrations 001-004 may already be applied since you can login. Only migration 005 is new.

---

## Next Steps After Demo Works

Once demo account is working:

1. **Test All Features**:
   - Create a new contact
   - View conversation details
   - Try creating a campaign (will use existing templates)
   - Check analytics charts
   - Update settings

2. **Deploy to Production**:
   - Set Cloudflare Pages environment variables
   - Apply migrations 001-005 to production Supabase
   - Create demo user in production
   - Test live demo

3. **Implement Missing Features** (from roadmap):
   - Template Builder UI (`src/pages/dashboard/Templates.tsx`)
   - Bulk Messaging Interface
   - Campaign Creation Flow (complete)
   - Contact Import/Export

---

## Files Reference

**Migration File**: `supabase/migrations/005_demo_user_and_sample_data.sql`
- 507 lines
- Creates demo team member
- Seeds 10 contacts, 5 conversations, 8 messages, 5 templates, 3 campaigns

**Setup Script**: `scripts/create-demo-user.js`
- Interactive Node.js script
- Requires SERVICE_ROLE_KEY
- Auto-checks if user exists
- Provides detailed next steps

**Demo Credentials**: `src/data/demo-credentials.ts`
- Email: demo@datacare.co.ke
- Password: Demo2025!Preview
- Organization ID: 00000000-0000-0000-0000-000000000001

---

## Summary

**What's Complete**:
- ✅ Migration file with sample data created
- ✅ Setup script created
- ✅ Frontend already has demo login button
- ✅ Demo organization exists in database

**What You Need to Do** (5 minutes total):
1. Create demo user in Supabase Dashboard (2 min)
2. Run migration 005 in SQL Editor (2 min)
3. Test demo login (1 min)

**Expected Result**:
- Demo login works
- Dashboard populated with realistic data
- All features explorable
- Ready to showcase or deploy
