# Pages Stuck Loading - Diagnosis & Fix

**Issue**: Templates, Analytics, Settings pages appear frozen/stuck loading
**Date**: 2025-12-08
**Status**: 🔍 Investigating

---

## What's Happening

Multiple issues detected:
1. **Pages loading forever** (stuck on loading spinner)
2. **"Multiple GoTrueClient instances"** warning
3. **aria-hidden dialog error** (focus management issue)

---

## Step 1: Check Browser Console

I've added detailed logging to AuthContext. Now when you refresh the page, you should see:

```
[AuthContext] Initializing auth context
[AuthContext] Initial session check: Has session (or No session)
[AuthContext] Loading organization data for user: xxx-xxx-xxx
[AuthContext] Team member loaded: Demo Admin
[AuthContext] Organization loaded: Datacare Demo
[AuthContext] Setting loading to false
```

### Do This Now:
1. **Open DevTools** (F12)
2. **Go to Console tab**
3. **Clear console** (trash icon)
4. **Refresh the page** (F5)
5. **Watch for the [AuthContext] messages**

### What You Should See:

**✅ Good** (loading completes):
```
[AuthContext] Initializing auth context
[AuthContext] Initial session check: Has session
[AuthContext] Loading organization data for user: xxx
[AuthContext] Team member loaded: Demo Admin
[AuthContext] Organization loaded: Datacare Demo
[AuthContext] Setting loading to false  ← THIS IS KEY!
```

**❌ Bad** (stuck loading):
```
[AuthContext] Initializing auth context
[AuthContext] Initial session check: Has session
[AuthContext] Loading organization data for user: xxx
... then nothing (stuck)
```

**❌ Bad** (no session):
```
[AuthContext] Initializing auth context
[AuthContext] Initial session check: No session
[AuthContext] No session, setting loading to false
... then redirect to /login
```

---

## Step 2: Check What's Failing

If you see logs stopping at "Loading organization data", check Network tab:

1. **Open Network tab** (F12 → Network)
2. **Filter by**: "team_members"
3. **Refresh page**
4. **Look for**:
   - GET request to `whatsapp_team_members`
   - Status should be `200 OK`
   - If `404` or `401`, there's a problem

---

## Step 3: Quick Fixes

### Fix 1: Clear All Browser Data

Sometimes stale auth tokens cause issues:

```
1. Press Ctrl + Shift + Delete
2. Select "All time"
3. Check:
   ✅ Cookies and other site data
   ✅ Cached images and files
4. Click "Clear data"
5. Close ALL browser tabs
6. Reopen and go to: http://localhost:8081/login
7. Try demo login again
```

### Fix 2: Check localStorage

In Console, run:
```javascript
// Check if session exists
localStorage.getItem('datacare-auth')

// If it shows a token, session is saved
// If it shows null, session isn't persisting
```

**If null**, auth isn't persisting. Clear and re-login:
```javascript
localStorage.clear()
location.reload()
```

### Fix 3: Force Logout and Re-login

In Console:
```javascript
// Import supabase
const { supabase } = await import('/src/lib/supabase.ts')

// Force logout
await supabase.auth.signOut()

// Reload
location.reload()

// Then login again
```

---

## Step 4: Check Each Page Individually

### Test Templates Page:
1. Go to: http://localhost:8081/dashboard/templates
2. Check console for:
   - [AuthContext] messages
   - Any errors from Templates.tsx
   - Network requests

### Test Analytics Page:
1. Go to: http://localhost:8081/dashboard/analytics
2. Same checks as above

### Test Settings Page:
1. Go to: http://localhost:8081/dashboard/settings
2. Same checks

---

## Common Issues & Solutions

### Issue 1: AuthContext Stuck Loading

**Symptom**: Console shows "Loading organization data" but never "Setting loading to false"

**Cause**: Database query hanging or returning error

**Fix**: Check Network tab for failed request to `whatsapp_team_members`

**SQL to verify**:
```sql
SELECT * FROM whatsapp_team_members
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke');
```

Should return 1 row. If empty, run:
```sql
INSERT INTO whatsapp_team_members (
  id, organization_id, user_id, role, is_active, status, display_name
) VALUES (
  '00000000-0000-0000-0000-000000000002'::uuid,
  '00000000-0000-0000-0000-000000000001'::uuid,
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke'),
  'admin', true, 'online', 'Demo Admin'
);
```

### Issue 2: Multiple Supabase Client Instances

**Symptom**: Warning "Multiple GoTrueClient instances detected"

**Cause**: Hot reload creating multiple instances (harmless but annoying)

**Fix**: Refresh the page (F5) - warning should go away

**Long-term fix**: Already implemented - we have singleton client in `src/lib/supabase.ts`

### Issue 3: aria-hidden Dialog Error

**Symptom**: "Blocked aria-hidden on an element because its descendant retained focus"

**Cause**: Dialog component (from shadcn/ui) has focus management issue

**Impact**: Doesn't break functionality, just accessibility warning

**Fix**: Can be ignored for now, or update @radix-ui/react-dialog package

---

## Step 5: Nuclear Option (If Nothing Works)

If all else fails, do a complete reset:

```bash
# 1. Clear browser completely
- Close ALL browser tabs/windows
- Clear ALL site data (Ctrl+Shift+Delete)

# 2. Restart dev server
- Stop server (Ctrl+C in terminal)
- Run: npm run dev

# 3. Open in Incognito
- Ctrl+Shift+N (Chrome)
- Go to: http://localhost:8081/login
- Try demo login
```

---

## Diagnostic Commands

Run these in browser Console to check state:

```javascript
// 1. Check if logged in
const { data } = await supabase.auth.getSession()
console.log('Session:', data.session ? 'YES' : 'NO')

// 2. Check team member
const { data: tm, error } = await supabase
  .from('whatsapp_team_members')
  .select('*, organization:whatsapp_organizations(*)')
  .eq('user_id', data.session?.user?.id)
  .single()
console.log('Team member:', tm, 'Error:', error)

// 3. Check if stuck in loading
// (React DevTools needed)
// Look for AuthProvider state: loading should be false

// 4. Force clear everything
localStorage.clear()
sessionStorage.clear()
await supabase.auth.signOut()
location.reload()
```

---

## What to Report Back

Please run the diagnostics and tell me:

1. **Console logs after refresh**:
   - Do you see all [AuthContext] messages?
   - Does it reach "Setting loading to false"?
   - Any red errors?

2. **Network tab**:
   - Is `whatsapp_team_members` request succeeding (200)?
   - Any failed requests (404, 401)?

3. **localStorage check**:
   - Does `localStorage.getItem('datacare-auth')` show a token?
   - Or is it null?

4. **Which pages work**:
   - Inbox: ✅ or ❌
   - Contacts: ✅ or ❌
   - Templates: ✅ or ❌
   - Analytics: ✅ or ❌
   - Settings: ✅ or ❌

This will tell me exactly what's wrong!

---

## Expected Behavior

After login, navigating to any page should:
1. Show ProtectedRoute loading spinner (briefly)
2. AuthContext loads org data
3. Page component starts loading
4. Page renders with data

If stuck at step 1 or 2, it's an AuthContext issue.
If stuck at step 3, it's a page-specific issue.

---

## Quick Check: Is Auth Working at All?

Try the Inbox page first:
1. Go to: http://localhost:8081/dashboard/inbox
2. Does it load? ✅ or ❌

If Inbox works but other pages don't, it's page-specific issues.
If Inbox also doesn't work, it's AuthContext stuck.

Let me know what happens!
