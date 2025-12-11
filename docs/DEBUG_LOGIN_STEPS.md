# Debug Demo Login - Step by Step

Your diagnostic shows **everything is set up correctly**:
- ✅ User exists and email confirmed
- ✅ Team member exists and is active
- ✅ Linked to organization "Datacare Demo"
- ✅ Has sample data (4 contacts, 4 conversations, 3 templates)

So the "freeze" is likely a **JavaScript execution issue** or **redirect problem**.

---

## Test 1: Check Browser Console During Login

### Step 1: Open DevTools
1. Go to: http://localhost:8081/login
2. Press `F12` to open DevTools
3. Click **Console** tab
4. **Clear console** (trash icon)

### Step 2: Watch Console During Login
1. Click "Login with Demo Account"
2. Watch for these messages:

**Expected messages**:
```
Auth state changed: SIGNED_IN
✅ [Success] - User authenticated
✅ [Success] - Organization loaded
```

**Problem messages**:
```
❌ Error loading team member: [error]
❌ Error loading organization data: [error]
❌ Auth state changed: SIGNED_OUT (shouldn't happen)
```

### Step 3: Check Network Tab
1. Click **Network** tab in DevTools
2. Click "Login with Demo Account"
3. Look for:
   - POST request to `/auth/v1/token` (should be 200 OK)
   - GET request to `/rest/v1/whatsapp_team_members` (should be 200 OK)

---

## Test 2: Manual Login Test (Browser Console)

If button click freezes, try logging in via console:

### Step 1: Open Console
1. Go to: http://localhost:8081/login
2. Press `F12` → Console tab

### Step 2: Run This Code
```javascript
// Get Supabase client
const { supabase } = await import('/src/lib/supabase.ts')

// Try login
const result = await supabase.auth.signInWithPassword({
  email: 'demo@datacare.co.ke',
  password: 'Demo2025!Preview'
})

console.log('Login result:', result)

// If successful, check session
const session = await supabase.auth.getSession()
console.log('Session:', session)
```

**If this works**, the issue is with the button click handler.
**If this fails**, there's a Supabase connection issue.

---

## Test 3: Check Redirect Issue

The page might be redirecting but getting stuck. Check the redirect path:

### In Browser Console:
```javascript
// Check current location state
console.log('Current URL:', window.location.href)
console.log('Location state:', window.history.state)

// After login attempt, check where it's trying to go
setTimeout(() => {
  console.log('After login URL:', window.location.href)
}, 2000)
```

---

## Test 4: Disable Loading State (Temporary Debug)

The page might appear "frozen" because loading state never resets.

### Check in Browser:
After clicking login, open Console and run:
```javascript
// Check if button is still in loading state
document.querySelector('button[disabled]')
// If this returns the login button, loading state is stuck
```

---

## Test 5: Check Protected Route

The issue might be in the ProtectedRoute component.

### Check This:
1. After clicking login, what URL shows in address bar?
2. Does it stay at `/login` or change to `/dashboard`?
3. If it changes but shows blank, the ProtectedRoute might be blocking

---

## Common Issues & Solutions

### Issue 1: Button Stays Disabled
**Symptom**: Button shows "Signing in..." forever
**Cause**: Loading state not resetting
**Check Console For**: Any uncaught errors

**Temporary Fix**:
```javascript
// In console after clicking
document.querySelector('button').disabled = false
```

### Issue 2: Silent Authentication Failure
**Symptom**: No error toast, no redirect, just nothing
**Cause**: signIn throwing error but catch block not working
**Check**: Network tab for failed requests

### Issue 3: Redirect Loop
**Symptom**: Page flashes/reloads multiple times
**Cause**: ProtectedRoute redirecting back to login
**Check**: Console for multiple "Auth state changed" messages

### Issue 4: Supabase Connection Issue
**Symptom**: No network requests appear
**Cause**: Environment variables missing or wrong
**Check**:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
```

---

## Most Likely Issues (Based on Symptoms)

### If Button Shows Spinner Forever:
1. **Check Console** for JavaScript errors
2. **Check Network** for failed API calls
3. **Check** if toast notification appears (it should on error)

### If Button Doesn't Respond at All:
1. **Browser extension** is intercepting click (test in Incognito)
2. **JavaScript error** preventing click handler from running
3. **Loading state** already true from previous attempt

### If Page Reloads/Redirects but Shows Blank:
1. **ProtectedRoute** is blocking access
2. **Dashboard component** has an error
3. **Organization context** is null

---

## Quick Debug Commands

Run these in Console to check state:

```javascript
// 1. Check if Supabase is connected
await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/')
  .then(r => console.log('Supabase reachable:', r.status))

// 2. Check current auth state
const { data } = await supabase.auth.getSession()
console.log('Current session:', data.session ? 'Logged in' : 'Logged out')

// 3. Check if organization loaded
// (after successful login)
const { data: tm } = await supabase
  .from('whatsapp_team_members')
  .select('*, organization:whatsapp_organizations(*)')
  .eq('user_id', data.session?.user?.id)
  .single()
console.log('Team member:', tm)
```

---

## Action Items

Please do this and report back:

1. **Open browser Console** (F12)
2. **Clear console** (trash icon)
3. **Click "Login with Demo Account"**
4. **Watch console messages**
5. **Take screenshot of**:
   - Any error messages (red text)
   - Network tab (filter by "token" or "team_members")
   - What URL shows in address bar

This will tell us exactly where it's getting stuck!

---

## Expected vs Actual Behavior

### Expected:
```
1. Click button
2. Button shows "Signing in..." spinner
3. POST /auth/v1/token → 200 OK
4. GET /rest/v1/whatsapp_team_members → 200 OK
5. Toast: "Logged in to demo account"
6. Redirect to: /dashboard/inbox
7. Dashboard loads with data
```

### Actual (what's happening?):
```
1. Click button
2. Then what? (This is what we need to know)
   - Does button show spinner?
   - Does console show errors?
   - Does page stay at /login?
   - Does network show failed requests?
```

Tell me what you see at step 2 and we'll fix it!
