# Test Demo Login - Quick Checklist

**Browser Extension Error**: The `fd_content.js` error is from a browser extension, NOT your app. Ignore it.

---

## Quick Test Steps

### Step 1: Run This SQL Query in Supabase

Go to: https://supabase.com/dashboard/project/akffppqsrwveplnbeisx/sql

**Copy and paste this query**:

```sql
-- Quick diagnostic: Check demo account setup
SELECT
  -- User info
  u.email as demo_user_email,
  u.email_confirmed_at IS NOT NULL as email_confirmed,
  u.id as user_id,

  -- Team member info
  tm.id IS NOT NULL as has_team_member,
  tm.role,
  tm.is_active,
  tm.status,

  -- Organization info
  o.name as organization_name,
  o.id as org_id,
  o.is_active as org_active,

  -- Data counts
  (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = o.id) as contacts,
  (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = o.id) as conversations,
  (SELECT COUNT(*) FROM whatsapp_campaign_templates WHERE organization_id = o.id) as templates

FROM auth.users u
LEFT JOIN whatsapp_team_members tm ON tm.user_id = u.id
LEFT JOIN whatsapp_organizations o ON o.id = tm.organization_id
WHERE u.email = 'demo@datacare.co.ke';
```

---

## Expected Results:

| Column | Expected Value | What It Means |
|--------|---------------|---------------|
| `demo_user_email` | demo@datacare.co.ke | User exists ✅ |
| `email_confirmed` | **true** | Email verified ✅ |
| `has_team_member` | **true** | User linked to org ✅ |
| `role` | admin | Has admin access ✅ |
| `is_active` | true | Can login ✅ |
| `organization_name` | Datacare Demo | Org exists ✅ |
| `contacts` | 10 | Sample data ✅ |
| `conversations` | 5 | Sample data ✅ |
| `templates` | 8 | Sample data ✅ |

---

## What Each Column Tells You:

### ❌ If `email_confirmed` is FALSE or NULL:
**Problem**: Email not confirmed
**Fix**:
```sql
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'demo@datacare.co.ke';
```

### ❌ If `has_team_member` is FALSE or NULL:
**Problem**: User not linked to organization (THIS IS LIKELY YOUR ISSUE)
**Fix**:
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
)
ON CONFLICT (organization_id, user_id) DO NOTHING;
```

### ❌ If `organization_name` is NULL:
**Problem**: Demo organization doesn't exist
**Fix**: Run migration `001_whatsapp_platform_core.sql`

### ❌ If data counts are 0:
**Problem**: No sample data seeded
**Fix**: Run migration `005_demo_user_and_sample_data_v2.sql`

---

## Step 2: Test in Incognito Window

The browser extension error (`fd_content.js`) might interfere with testing.

**Open Incognito/Private Window**:
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`
- Edge: `Ctrl + Shift + N`

**Then test**:
1. Go to: http://localhost:8081/login
2. Click "Login with Demo Account"
3. Watch for:
   - ✅ Button shows spinner "Signing in..."
   - ✅ Toast notification appears
   - ✅ Redirects to /dashboard

---

## Step 3: Check Browser Console (In Incognito)

**Open DevTools**: Press `F12`
**Go to Console tab**

**Look for**:
- ✅ Green success messages
- ❌ Red error messages (ignore `fd_content.js`)

**Common errors**:
```
❌ "Invalid login credentials" → User doesn't exist or wrong password
❌ "User not linked to any organization" → Missing team member (run fix above)
❌ "Email not confirmed" → Run email confirmation fix above
```

---

## Step 4: What Should Happen

### When You Click "Login with Demo Account":

**1. Button Changes**:
```
Before: [Play icon] Login with Demo Account
During: [Spinner] Signing in...
After:  Redirect to dashboard
```

**2. Toast Notification**:
```
Success: "Logged in to demo account" (green)
OR
Error: "Demo login failed: [reason]" (red)
```

**3. Page Redirect**:
```
From: http://localhost:8081/login
To:   http://localhost:8081/dashboard/inbox
```

**4. Dashboard Loads**:
```
✅ Sidebar visible
✅ User menu in top right
✅ Stats showing on Overview
✅ Can navigate all pages
```

---

## Debugging Checklist

Run through this checklist if login still fails:

- [ ] Ran diagnostic SQL query above
- [ ] `email_confirmed` = true
- [ ] `has_team_member` = true
- [ ] `organization_name` = "Datacare Demo"
- [ ] Tested in Incognito window (to avoid extension conflicts)
- [ ] Opened DevTools Console (F12)
- [ ] Clicked "Login with Demo Account"
- [ ] Button showed spinner
- [ ] Saw toast notification (success or error)
- [ ] Checked Console for actual error (not fd_content.js)

---

## Most Common Issue

**90% of demo login freezes** are caused by:

```sql
-- User exists but team member is missing
SELECT
  (SELECT COUNT(*) FROM auth.users WHERE email = 'demo@datacare.co.ke') as user_exists,
  (SELECT COUNT(*) FROM whatsapp_team_members WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke'
  )) as team_member_exists;

-- Expected: user_exists=1, team_member_exists=1
-- Problem:  user_exists=1, team_member_exists=0  ← THIS IS THE ISSUE
```

**If `team_member_exists = 0`**, run the INSERT query from the fix above.

---

## After Applying Fix

1. **Close all browser tabs**
2. **Open new Incognito window**
3. **Go to login page**
4. **Click demo login**
5. **Should work now!**

---

## Still Not Working?

Share the output of:

1. **The diagnostic SQL query** (first query in this file)
2. **Browser console errors** (from DevTools, ignore fd_content.js)
3. **What you see when you click the button**:
   - Does it show spinner?
   - Does it show toast?
   - Does it redirect?

This will tell us exactly what's wrong!
