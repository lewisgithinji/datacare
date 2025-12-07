# Phase 2: Authentication System Implementation

## Overview

After making data visible (Phase 1), the next critical step is implementing a proper authentication system for your WhatsApp/Chatbot dashboard.

---

## Current State

✅ Database schema ready with RLS
✅ Seed data visible (via public policies OR test user)
✅ Frontend dashboard UI components exist
❌ No login/signup pages
❌ No protected routes
❌ No session management
❌ Manual user-organization linking required

---

## Authentication Architecture

### Tech Stack Options

**Option A: Supabase Auth (Recommended)**
- ✅ Already integrated (`@supabase/supabase-js`)
- ✅ Built-in email/password, OAuth, magic links
- ✅ Automatic session management
- ✅ RLS integration out-of-the-box
- ❌ Less customization of UI

**Option B: Custom Auth + Supabase**
- ✅ Full UI control
- ✅ Custom workflows
- ❌ More code to maintain
- ❌ Security concerns if not done right

**Recommendation: Use Supabase Auth with custom UI**

---

## Implementation Plan

### Step 1: Create Authentication Pages

**Files to create:**
```
src/pages/auth/
├── Login.tsx          - Email/password login
├── Signup.tsx         - New user registration
├── ForgotPassword.tsx - Password reset
└── ResetPassword.tsx  - Set new password
```

**Components to create:**
```
src/components/auth/
├── AuthProvider.tsx   - Auth context wrapper
├── ProtectedRoute.tsx - Route guard component
└── UserMenu.tsx       - User profile dropdown
```

### Step 2: Update Routing

**Current routes:**
```typescript
<Route path="/messaging/inbox" element={<Inbox />} />
```

**Updated routes:**
```typescript
// Public routes
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

// Protected routes
<Route path="/dashboard/*" element={
  <ProtectedRoute>
    <DashboardLayout />
  </ProtectedRoute>
}>
  <Route path="inbox" element={<Inbox />} />
  <Route path="chatbot" element={<ChatbotConversations />} />
  <Route path="contacts" element={<Contacts />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### Step 3: Implement Auth Context

**AuthProvider features:**
- Session state management
- User profile data
- Organization info
- Login/logout methods
- Session persistence
- Token refresh

**Example usage:**
```typescript
const { user, organization, loading, signIn, signOut } = useAuth()
```

### Step 4: Auto-Link Users to Organization

**Two approaches:**

**A. Database Trigger (Recommended)**
```sql
-- Automatically create team_member when user signs up
CREATE OR REPLACE FUNCTION auto_create_team_member()
RETURNS TRIGGER AS $$
BEGIN
  -- Link new user to demo organization (for now)
  -- In production, this would be based on invite/signup flow
  INSERT INTO whatsapp_team_members (
    organization_id,
    user_id,
    role,
    display_name,
    permissions
  ) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    NEW.id,
    'agent',
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    '["view_conversations", "send_messages"]'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_team_member();
```

**B. Edge Function**
- Create Supabase Edge Function
- Trigger on user signup webhook
- More control over logic

### Step 5: Update Dashboard Components

**Add auth checks:**
```typescript
// Before
export default function Inbox() {
  const [conversations, setConversations] = useState([])
  // ...
}

// After
export default function Inbox() {
  const { user, organization } = useAuth()
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    if (!organization) return
    fetchConversations(organization.id)
  }, [organization])
  // ...
}
```

---

## Detailed Component Examples

### 1. AuthProvider.tsx

```typescript
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'
import { Organization, TeamMember } from '@/types/whatsapp'

interface AuthContextType {
  user: User | null
  session: Session | null
  organization: Organization | null
  teamMember: TeamMember | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadOrganizationData(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadOrganizationData(session.user.id)
        } else {
          setOrganization(null)
          setTeamMember(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadOrganizationData = async (userId: string) => {
    try {
      // Get team member record
      const { data: teamMemberData } = await supabase
        .from('whatsapp_team_members')
        .select('*, organization:whatsapp_organizations(*)')
        .eq('user_id', userId)
        .single()

      if (teamMemberData) {
        setTeamMember(teamMemberData)
        setOrganization(teamMemberData.organization)
      }
    } catch (error) {
      console.error('Error loading organization data:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        organization,
        teamMember,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### 2. ProtectedRoute.tsx

```typescript
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/components/auth/AuthProvider'
import { Loader2 } from 'lucide-react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

### 3. Login.tsx

```typescript
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard/inbox'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Migration Strategy

### Option 1: Fresh Start
1. Drop existing public access policies
2. Implement full auth system
3. Users must sign up

### Option 2: Hybrid (Recommended for Development)
1. Keep public policies for demo org
2. Add auth for new organizations
3. Gradual migration

---

## Testing Checklist

- [ ] User can sign up
- [ ] User receives confirmation email
- [ ] User can log in
- [ ] Session persists on page refresh
- [ ] Protected routes redirect to login
- [ ] After login, user is redirected to intended page
- [ ] User can log out
- [ ] Password reset flow works
- [ ] User is automatically linked to organization
- [ ] Organization data loads correctly
- [ ] RLS policies allow access after auth

---

## Security Considerations

### Email Verification
```typescript
// In signup
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/dashboard`,
  },
})
```

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### Session Security
- HTTPOnly cookies (Supabase default)
- Secure flag in production
- SameSite=Lax
- Auto token refresh

---

## Multi-Tenant Considerations

### Organization Assignment

**For Single Organization (Current):**
- Auto-assign all users to demo org
- Use database trigger

**For Multi-Tenant (Future):**
- Invitation-based signup
- Organization creation flow
- Domain-based routing (org1.datacare.app)

---

## Next Implementation Steps

1. **Week 1: Core Auth**
   - Create AuthProvider
   - Build Login/Signup pages
   - Set up protected routes

2. **Week 2: User Experience**
   - Password reset flow
   - Email verification
   - User profile page

3. **Week 3: Organization Management**
   - Auto-linking trigger
   - Team member invites
   - Role-based permissions

4. **Week 4: Dashboard Integration**
   - Update all pages to use auth context
   - Add user menu
   - Session management

---

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/tutorial#protected-routes)
- [Supabase RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)

---

**Ready to start?** I can help you implement any of these components. Just let me know which part you'd like to tackle first!
