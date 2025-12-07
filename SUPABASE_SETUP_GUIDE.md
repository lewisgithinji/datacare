# Supabase Setup Guide
## DataCare WhatsApp Platform

---

## Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in details:
   - **Name:** `datacare-whatsapp`
   - **Database Password:** (save this securely)
   - **Region:** Singapore (closest to Kenya)
4. Wait for project creation (~2 minutes)

### 2. Get Project Credentials

From your Supabase project dashboard:

**Go to Settings → API**

You'll need these values:
```
PROJECT_URL: https://xxxxxxxxxxxxx.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (keep secret!)
```

### 3. Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/20250107000001_create_whatsapp_platform_schema.sql`
4. Paste into the editor
5. Click **Run** (takes ~30 seconds)

### 4. Set Up Environment Variables

Create `.env.local` in your project root:

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role (for Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token

# OpenAI (for AI chatbot)
OPENAI_API_KEY=sk-...

# App
VITE_APP_URL=http://localhost:8081
```

### 5. Enable Realtime

In Supabase dashboard:

1. Go to **Database → Replication**
2. Enable replication for these tables:
   - `conversations`
   - `messages`
   - `team_members`

### 6. Set Up Storage Buckets

In Supabase dashboard:

1. Go to **Storage**
2. Create buckets:
   - `whatsapp-media` (for incoming/outgoing media)
   - `org-assets` (for organization logos, branding)
3. Set bucket policies:

```sql
-- Allow authenticated users to upload media
CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'whatsapp-media');

-- Allow public read access
CREATE POLICY "Public can view media"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'whatsapp-media');
```

### 7. Verify Setup

Run this query in SQL Editor to confirm setup:

```sql
-- Check tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check demo organization
SELECT * FROM organizations WHERE slug = 'datacare-demo';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

Expected result: You should see all 9 tables and RLS enabled.

---

## Next Steps

After Supabase is set up:

1. ✅ Deploy Edge Functions (webhook handler)
2. ✅ Update frontend to use Supabase client
3. ✅ Configure WhatsApp Business API
4. ✅ Test message flow

---

## Troubleshooting

### Issue: Migration fails

**Solution:** Run migrations one section at a time:
1. Create tables
2. Create indexes
3. Create triggers
4. Enable RLS
5. Create policies

### Issue: RLS blocks queries

**Solution:** Ensure user is added to `team_members` table:

```sql
-- Add yourself as admin (replace with your auth.users.id)
INSERT INTO team_members (organization_id, user_id, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'your-user-id-from-auth-users',
  'admin'
);
```

### Issue: Realtime not working

**Solution:**
1. Check replication is enabled for tables
2. Verify client connection: `supabase.channel('public:messages').subscribe()`
3. Check browser console for errors

---

## Production Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Enable 2FA on Supabase account
- [ ] Set up database backups (automatic in Supabase Pro)
- [ ] Configure custom domain
- [ ] Set up monitoring/alerts
- [ ] Review and test all RLS policies
- [ ] Load test with expected traffic
- [ ] Set up error tracking (Sentry)
- [ ] Create runbook for common issues

---

## Support

- **Supabase Docs:** https://supabase.com/docs
- **WhatsApp API Docs:** https://developers.facebook.com/docs/whatsapp
- **Project Issues:** Contact Lewis

---

Your database is now ready! Next: Set up Edge Functions for WhatsApp webhooks.
