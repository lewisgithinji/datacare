# Demo Account Feature - Documentation

## Overview

The Datacare WhatsApp Platform includes a **public demo feature** that allows potential customers to explore the platform without creating an account. This is a standard SaaS practice used by companies like Slack, Intercom, and Zendesk.

## Architecture

### Two Distinct Applications

The codebase contains **two separate applications**:

#### 1. Marketing Website (Public)
- **Purpose**: Showcase Datacare's services and generate leads
- **Routes**: `/`, `/products`, `/solutions`, `/contact`, etc.
- **Features**:
  - Marketing chatbot for lead generation
  - Product information pages
  - Contact forms
- **Users**: Anonymous visitors
- **Data**: Static content, lead forms

#### 2. WhatsApp Platform (SaaS Product)
- **Purpose**: Multi-tenant WhatsApp management platform
- **Routes**: `/dashboard/*`
- **Features**:
  - Team Inbox
  - Contact Management
  - Campaigns
  - Quick Replies
  - Analytics
- **Users**: Authenticated users from different organizations
- **Data**: Multi-tenant (organizations, contacts, messages)

### Demo Feature

The demo feature bridges the gap between marketing and product by allowing visitors to **try the actual platform** without signing up.

## How It Works

### Demo Account

- **Email**: `demo@datacare.co.ke`
- **Organization**: "Datacare Demo" (ID: `00000000-0000-0000-0000-000000000001`)
- **Purpose**: Showcase platform features with realistic sample data

### User Flow

```
1. Visitor lands on homepage
   ↓
2. Clicks "Try Demo" button
   ↓
3. Redirected to /demo page
   ↓
4. Clicks "Launch Demo Now"
   ↓
5. Auto-logged in as demo@datacare.co.ke
   ↓
6. Redirected to /dashboard/inbox
   ↓
7. Explores platform with demo data
   ↓
8. Sees "Create Free Account" CTAs
```

## Implementation

### Files Created

#### 1. [DemoPage.tsx](file:///f:/Projects/datacare/src/pages/DemoPage.tsx)
- Landing page for the demo feature
- Auto-login functionality
- Feature showcase
- CTAs to sign up

#### 2. [DemoModeBanner.tsx](file:///f:/Projects/datacare/src/components/DemoModeBanner.tsx)
- Banner displayed when logged in as demo user
- Shows "Demo Mode" indicator
- Provides "Create Free Account" CTA
- Reminds users that data resets hourly

### Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/demo` | `DemoPage` | Demo landing page with auto-login |
| `/dashboard/*` | `DashboardLayout` | Actual platform (shows banner if demo user) |

### Auto-Login Logic

```typescript
const handleLaunchDemo = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: 'demo@datacare.co.ke',
    password: 'Demo@2024!Secure',
  });

  if (!error) {
    navigate('/dashboard/inbox');
  }
};
```

### Demo Detection

```typescript
const isDemoUser = user?.email === 'demo@datacare.co.ke';
```

## Best Practices

### 1. Data Management

**Current State:**
- Demo organization has pre-seeded data (conversations, contacts, quick replies)
- Data is shared across all demo sessions

**Recommended:**
- Reset demo data every hour via cron job
- Prevent demo users from deleting critical data

### 2. Feature Restrictions

**Recommended Restrictions:**
- ❌ Cannot delete conversations
- ❌ Cannot change organization settings
- ❌ Cannot invite team members
- ✅ Can send messages (optimistic UI only)
- ✅ Can create quick replies (resets hourly)
- ✅ Can view all features

### 3. Conversion Optimization

**CTAs Placed:**
- ✅ Demo landing page
- ✅ Demo mode banner (top of dashboard)
- 🔄 TODO: Add CTAs in sidebar
- 🔄 TODO: Add CTAs after key actions

## Data Reset Strategy

### Option 1: Scheduled Reset (Recommended)

Create a Supabase Edge Function that runs hourly:

```sql
-- Delete demo organization data
DELETE FROM whatsapp_messages 
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

DELETE FROM whatsapp_quick_replies 
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Re-insert seed data
INSERT INTO whatsapp_messages (...) VALUES (...);
INSERT INTO whatsapp_quick_replies (...) VALUES (...);
```

### Option 2: On-Demand Reset

Add a "Reset Demo Data" button (admin only) to manually trigger reset.

## Security Considerations

### Demo Account Password

- ⚠️ **Current**: Hardcoded in `DemoPage.tsx`
- ✅ **Better**: Store in environment variable
- ✅ **Best**: Use Supabase magic link or OTP

### RLS Policies

Demo account uses the same RLS policies as regular users:
- ✅ Can only access "Datacare Demo" organization data
- ✅ Cannot access other organizations' data
- ✅ Multi-tenant isolation maintained

## Analytics

### Tracking Demo Usage

**Recommended Events:**
- `demo_launched` - User clicked "Launch Demo"
- `demo_feature_explored` - User clicked on specific features
- `demo_to_signup` - User clicked "Create Account" from demo
- `demo_session_duration` - Time spent in demo

## Comparison with Industry

| Company | Demo Approach |
|---------|---------------|
| **Slack** | Shared demo workspace, auto-login |
| **Intercom** | Shared demo account, read-only |
| **Zendesk** | Sandbox environment per visitor |
| **HubSpot** | Video tours + limited sandbox |
| **Datacare** | Shared demo account, auto-login ✅ |

## Future Enhancements

### Phase 1 (Current)
- ✅ Demo landing page
- ✅ Auto-login
- ✅ Demo mode banner
- ✅ Sample data

### Phase 2 (Recommended)
- [ ] Hourly data reset
- [ ] Feature restrictions
- [ ] Analytics tracking
- [ ] Conversion optimization

### Phase 3 (Advanced)
- [ ] Per-visitor sandbox
- [ ] Guided tour overlay
- [ ] Interactive tooltips
- [ ] Progress tracking

## Testing

### Manual Testing

1. Visit `/demo`
2. Click "Launch Demo Now"
3. Verify auto-login works
4. Check demo banner appears
5. Explore features
6. Click "Create Free Account"

### Automated Testing

```typescript
describe('Demo Feature', () => {
  it('should auto-login demo user', async () => {
    // Test auto-login flow
  });

  it('should show demo banner', async () => {
    // Test banner visibility
  });

  it('should restrict destructive actions', async () => {
    // Test feature restrictions
  });
});
```

## Support

For questions about the demo feature:
- **Technical**: Review this documentation
- **Business**: Discuss conversion optimization strategies
- **Security**: Review RLS policies and access controls

---

**Last Updated**: December 9, 2025
**Maintained By**: Development Team
