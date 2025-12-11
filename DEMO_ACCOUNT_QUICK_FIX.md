# Demo Account - Quick Fix Guide

**Issue**: Demo login button freezes/doesn't work
**Cause**: Demo user doesn't exist in Supabase database yet
**Solution**: Create demo user + apply migration

---

## Quick Fix (5 minutes)

### Step 1: Create Demo User in Supabase Dashboard

1. **Go to Supabase Dashboard**:
   ```
   https://supabase.com/dashboard/project/akffppqsrwveplnbeisx
   ```

2. **Navigate to Authentication → Users**

3. **Click "Add User" button**

4. **Fill in form**:
   ```
   Email: demo@datacare.co.ke
   Password: Demo2025!Preview
   ```

5. **IMPORTANT**: Check the box "Auto Confirm User" (or "Email Confirmed")

6. **Click "Create User"**

7. **Copy the User ID** (UUID that was generated)

---

### Step 2: Apply Migration to Seed Demo Data

**Option A: Via Supabase SQL Editor** (Recommended)

1. **Go to SQL Editor**:
   ```
   https://supabase.com/dashboard/project/akffppqsrwveplnbeisx/sql
   ```

2. **Click "New Query"**

3. **Open file on your computer**:
   ```
   F:\Projects\datacare\supabase\migrations\005_demo_user_and_sample_data_v2.sql
   ```

4. **Copy entire contents** (it's a long file ~500 lines)

5. **Paste into SQL Editor**

6. **Click "Run" or press Ctrl+Enter**

7. **Wait for success message**

8. **You should see output like**:
   ```
   NOTICE:  Creating demo data...
   NOTICE:  10 sample contacts created
   NOTICE:  5 sample conversations created
   NOTICE:  8 sample messages created
   NOTICE:  5 additional templates created
   NOTICE:  3 sample campaigns created
   NOTICE:  Demo data seeding complete!
   ```

---

**Option B: Via Node.js Script** (If you have SERVICE_ROLE_KEY)

1. **Get your SERVICE_ROLE_KEY**:
   - Go to: Settings → API
   - Copy the `service_role` key (NOT the `anon` key)

2. **Run script**:
   ```bash
   set SUPABASE_SERVICE_ROLE_KEY=your_key_here
   node scripts/create-demo-user.js
   ```

3. **Then apply migration** (SQL Editor method above)

---

### Step 3: Test Demo Login

1. **Go to login page**:
   ```
   http://localhost:8081/login
   ```

2. **Click "Login with Demo Account" button**

3. **Should redirect to**:
   ```
   http://localhost:8081/dashboard
   ```

4. **Verify you see**:
   - ✅ Dashboard loads
   - ✅ Demo banner at top (if implemented)
   - ✅ Overview shows stats (10 contacts, 5 conversations, etc.)
   - ✅ Contacts page shows 10 contacts
   - ✅ Templates page shows 8 templates
   - ✅ Campaigns page shows 3 campaigns

---

## Troubleshooting

### Issue: "Invalid login credentials"

**Cause**: User not created or email not confirmed

**Fix**:
1. Check Supabase Dashboard → Authentication → Users
2. Find user with email `demo@datacare.co.ke`
3. Check "Email Confirmed At" column has a date
4. If empty, click user → "Send Email Confirmation" or manually set confirmed

---

### Issue: Login works but dashboard is empty

**Cause**: Migration not applied

**Fix**:
1. Run this quick check in SQL Editor:
   ```sql
   -- Check if demo data exists
   SELECT
     (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = '00000000-0000-0000-0000-000000000001') as contacts,
     (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = '00000000-0000-0000-0000-000000000001') as conversations,
     (SELECT COUNT(*) FROM whatsapp_campaign_templates WHERE organization_id = '00000000-0000-0000-0000-000000000001') as templates,
     (SELECT COUNT(*) FROM whatsapp_campaigns WHERE organization_id = '00000000-0000-0000-0000-000000000001') as campaigns;
   ```

2. If all return 0, migration wasn't applied
3. Run migration from Step 2 above

---

### Issue: "User not linked to any organization"

**Cause**: Demo team member not created

**Fix**:
1. Check if team member exists:
   ```sql
   SELECT *
   FROM whatsapp_team_members
   WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke');
   ```

2. If empty, run this (replace YOUR_USER_ID with actual UUID from auth.users):
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
     (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke'),
     'admin',
     true,
     'online',
     'Demo Admin',
     10,
     ARRAY['sales', 'support', 'technical']
   ) ON CONFLICT (organization_id, user_id) DO NOTHING;
   ```

---

### Issue: Page still freezes after creating user

**Cause**: Browser cache or error not being caught

**Fix**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors
4. Clear browser cache (Ctrl+Shift+Delete)
5. Hard refresh (Ctrl+F5)
6. Try demo login again

Common errors you might see:
- `Invalid login credentials` → User doesn't exist
- `Email not confirmed` → Need to confirm email in dashboard
- `Organization not found` → Team member not linked

---

## What Gets Created

### Demo User
```
Email: demo@datacare.co.ke
Password: Demo2025!Preview
Role: Admin
Organization: Datacare Demo (00000000-0000-0000-0000-000000000001)
```

### Demo Data (from migration)
- **10 Contacts**: John Kamau, Sarah Wanjiru, Michael Odhiambo, etc.
- **5 Conversations**: 2 open, 1 pending, 2 resolved
- **8 Messages**: Realistic conversation about Microsoft 365
- **8 Templates**: Welcome, Order Confirmation, Payment Reminder, etc.
- **3 Campaigns**: 2 completed, 1 scheduled

---

## Alternative: Use Regular Account for Testing

If you don't want to set up demo account right now:

1. **Create regular account**:
   - Go to: http://localhost:8081/signup
   - Fill form and create account

2. **Problem**: No sample data for your organization

3. **Solution**: Manually create a few contacts/templates to test features

---

## After Demo Account Works

Once demo is working, you can:

1. **Test all features**:
   - View contacts (10 seeded)
   - View conversations (5 seeded)
   - Create new template
   - Edit existing template
   - Create campaign
   - View analytics

2. **Deploy to production**:
   - Create demo user in production Supabase
   - Apply migration to production
   - Test live demo

3. **Add more features**:
   - Bulk messaging
   - Campaign automation
   - Chatbot integration
   - Analytics dashboard

---

## Quick Verification Checklist

After following Steps 1-3 above:

- [ ] Demo user exists in Supabase Dashboard (Authentication → Users)
- [ ] User email is confirmed (has date in "Email Confirmed At" column)
- [ ] Migration applied successfully (saw success messages in SQL editor)
- [ ] Can click "Login with Demo Account" without freeze
- [ ] Redirected to /dashboard after login
- [ ] Overview page shows statistics (not all zeros)
- [ ] Contacts page shows 10 contacts
- [ ] Templates page shows 8 templates
- [ ] Navigation sidebar shows all menu items
- [ ] Can click through all dashboard pages

---

## Need Help?

If you're still having issues after following this guide:

1. **Check browser console** (F12 → Console tab) for error messages
2. **Check network tab** (F12 → Network tab) to see if API calls are failing
3. **Verify Supabase connection**: Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. **Check database**: Run the verification queries above to confirm data exists

---

## Summary

**To fix demo login freeze**:
1. ✅ Create demo user in Supabase Dashboard (Step 1)
2. ✅ Apply migration via SQL Editor (Step 2)
3. ✅ Test login (Step 3)

**Time required**: ~5 minutes

**Files you need**:
- Migration: `supabase/migrations/005_demo_user_and_sample_data_v2.sql`
- Credentials: Already in code (`demo@datacare.co.ke` / `Demo2025!Preview`)

That's it! Once these two steps are done, demo account will work perfectly.
