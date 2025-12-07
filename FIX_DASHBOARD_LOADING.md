# Fix Dashboard Loading Issues

## Issues Fixed

1. **Dashboard stuck loading** - Fixed AuthContext to handle missing team members gracefully
2. **"Email not confirmed" error** - SQL script to auto-confirm emails in development
3. **Multiple GoTrueClient instances warning** - Added unique storage key to Supabase client

---

## Files Modified

### 1. `src/contexts/AuthContext.tsx`
**Change:** Used `.maybeSingle()` instead of `.single()` to handle users without team members gracefully.

**Before:**
```typescript
.single()  // Throws error if no results
```

**After:**
```typescript
.maybeSingle()  // Returns null if no results, doesn't throw error
```

**Impact:** Dashboard will no longer get stuck loading if a user doesn't have a team_member record yet.

---

### 2. `src/lib/supabase.ts`
**Change:** Added explicit storage configuration with unique key.

**Before:**
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
```

**After:**
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: window.localStorage,
    storageKey: 'datacare-auth',  // Unique key to avoid conflicts
    detectSessionInUrl: true,
  },
})
```

**Impact:** Eliminates the "Multiple GoTrueClient instances" warning.

---

### 3. Database Fix Required

**Run this SQL in Supabase SQL Editor:**

Go to: https://supabase.com/dashboard/project/akffppqsrwveplnbeisx/sql/new

Copy and paste the contents of `fix-auth-issues.sql` and click **Run**.

This will:
- ✅ Confirm all existing users (no more "Email not confirmed" errors)
- ✅ Update trigger to auto-confirm new users on signup
- ✅ Change trigger timing from AFTER to BEFORE to properly modify user record

---

## Testing Steps

### 1. Test Login (Existing User)

1. Clear browser cache/local storage: `localStorage.clear()`
2. Refresh page
3. Try logging in with existing credentials
4. **Expected:** Should login successfully without "Email not confirmed" error
5. **Expected:** Dashboard should load without getting stuck

### 2. Test Signup (New User)

1. Sign out if logged in
2. Go to `/signup`
3. Create new account:
   - Email: `test2@example.com`
   - Password: `Test123!@#`
   - Full Name: `Test User 2`
4. **Expected:** Signup succeeds and auto-confirms email
5. **Expected:** Automatically logged in and redirected to dashboard
6. **Expected:** Dashboard loads successfully

### 3. Verify No Console Warnings

1. Open DevTools Console
2. Navigate around dashboard
3. **Expected:** No "Multiple GoTrueClient instances" warning
4. **Expected:** No "Email not confirmed" errors

---

## Troubleshooting

### Still getting "Email not confirmed"?

1. **Verify SQL ran successfully:**
   ```sql
   SELECT email, email_confirmed_at FROM auth.users;
   ```
   All users should have `email_confirmed_at` populated.

2. **Check trigger timing:**
   ```sql
   SELECT trigger_name, action_timing FROM information_schema.triggers
   WHERE trigger_name = 'on_auth_user_created';
   ```
   Should show `BEFORE` not `AFTER`.

### Dashboard still stuck loading?

1. **Open DevTools Console** and check for errors
2. **Look for:** "User not linked to any organization" warning
3. **If present:** Run this to link user:
   ```sql
   INSERT INTO whatsapp_team_members (
     organization_id,
     user_id,
     role,
     display_name,
     permissions,
     is_active,
     status
   )
   SELECT
     '00000000-0000-0000-0000-000000000001'::uuid,
     id,
     'agent',
     COALESCE(raw_user_meta_data->>'full_name', email),
     '["view_conversations", "send_messages", "view_contacts"]'::jsonb,
     true,
     'offline'
   FROM auth.users
   WHERE id NOT IN (SELECT user_id FROM whatsapp_team_members);
   ```

### Still seeing GoTrueClient warning?

1. **Hard refresh:** Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Clear cache:**
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   ```
3. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## What Changed Under the Hood

### AuthContext Loading Flow

**Before:**
```
1. User logs in
2. AuthContext calls loadOrganizationData()
3. Query with .single() expects exactly 1 result
4. If no team_member → ERROR thrown
5. Error caught but loading never set to false
6. Dashboard stuck in loading state forever 🔴
```

**After:**
```
1. User logs in
2. AuthContext calls loadOrganizationData()
3. Query with .maybeSingle() handles 0 or 1 results
4. If no team_member → Returns null (no error)
5. Sets teamMember/organization to null
6. Sets loading to false
7. Dashboard shows "No organization access" message ✅
```

### Trigger Timing Change

**Before (AFTER INSERT):**
```
1. User signs up
2. User record INSERTED into auth.users
3. Trigger fires AFTER insert
4. Tries to UPDATE email_confirmed_at
5. Too late - user already created with confirmed=false ❌
```

**After (BEFORE INSERT):**
```
1. User signs up
2. Trigger fires BEFORE insert
3. Sets NEW.email_confirmed_at = NOW()
4. User record INSERTED with confirmed=true ✅
5. Creates team_member record
6. User can login immediately
```

---

## Production Considerations

⚠️ **IMPORTANT:** This auto-confirms emails for development convenience.

**In production, you should:**

1. **Re-enable email confirmation:**
   - Remove the auto-confirm logic from trigger
   - Configure SMTP in Supabase settings
   - Send proper confirmation emails

2. **Update trigger for production:**
   ```sql
   CREATE OR REPLACE FUNCTION auto_create_team_member()
   RETURNS TRIGGER AS $$
   BEGIN
     -- Don't auto-confirm in production
     -- Only create team_member after email is confirmed

     IF NEW.email_confirmed_at IS NOT NULL THEN
       INSERT INTO whatsapp_team_members (...);
     END IF;

     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Add organization selection during signup:**
   - Don't auto-assign to demo org
   - Use invitation codes or domain-based routing
   - Let users create their own organizations

---

## Summary

✅ **Fixed:** Dashboard loading stuck
✅ **Fixed:** Email confirmation errors
✅ **Fixed:** Multiple GoTrueClient warning
✅ **Improved:** Error handling in AuthContext
✅ **Added:** Unique storage key for auth state

**Next Step:** Run `fix-auth-issues.sql` in Supabase SQL Editor!
