# DataCare WhatsApp Platform - Revised Architecture
## Optimized for Supabase + Cloudflare Pages

---

## Executive Summary

**Original Plan Issues:**
- Proposed AWS/Digital Ocean + Docker + Redis + MongoDB + Express
- Complex infrastructure requiring server management
- High operational costs ($200-500/month minimum)
- Doesn't leverage existing Supabase + Cloudflare stack

**Revised Serverless Architecture:**
- **100% Serverless** - No servers to manage
- **Supabase-Powered** - Database, Auth, Edge Functions, Realtime
- **Cloudflare Pages** - Frontend hosting (already deployed)
- **Cost-Effective** - $0-25/month for moderate use
- **Already Integrated** - Uses your existing tech stack

---

## Architecture Comparison

### ❌ Original Proposed Stack
```
AWS EC2/Digital Ocean (Servers)
  ├── Express.js Backend
  ├── PostgreSQL Database
  ├── Redis Cache
  ├── MongoDB Logs
  ├── Docker Containers
  ├── PM2 Process Manager
  └── Nginx Reverse Proxy

React Frontend (Separate Deployment)
  └── Socket.io for Realtime
```

**Problems:**
- Requires DevOps expertise
- Server maintenance overhead
- Complex deployment process
- Multiple databases to manage
- High cost for small-medium scale

---

### ✅ Revised Serverless Stack
```
WhatsApp Cloud API (Meta)
         ↓
Supabase Edge Function (Deno)
  ├── Webhook Handler
  ├── Message Processor
  └── Chatbot Logic
         ↓
Supabase PostgreSQL
  ├── Conversations
  ├── Messages
  ├── Contacts
  ├── Templates
  ├── Campaigns
  └── Analytics
         ↓
Supabase Realtime
  └── Live Inbox Updates
         ↓
Cloudflare Pages
  └── React Admin Dashboard (Already Built!)
```

**Advantages:**
- Zero server management
- Auto-scaling built-in
- Free tier covers development
- Already using this stack
- Faster development

---

## Technical Stack Details

### Backend: Supabase Edge Functions
**Why:** Serverless, Deno-based, fast cold starts, built-in TypeScript

**Replaces:** Express.js backend + PM2 + Docker

**Functions Needed:**
1. `whatsapp-webhook` - Handle incoming messages
2. `send-message` - Send outgoing messages
3. `process-campaign` - Handle bulk messaging
4. `chatbot-engine` - AI response logic
5. `analytics-aggregator` - Generate reports

**Cost:** FREE up to 500K function invocations/month

### Database: Supabase PostgreSQL
**Why:** Already using it, built-in auth, row-level security

**Replaces:** PostgreSQL + Redis + MongoDB

**Tables Needed:**
```sql
- contacts (customer data)
- conversations (chat sessions)
- messages (all messages)
- templates (WhatsApp templates)
- campaigns (bulk message campaigns)
- agents (team members)
- analytics_events (tracking)
```

**Cost:** FREE up to 500MB database, then $25/month for 8GB

### Realtime: Supabase Realtime
**Why:** Built-in WebSocket support, no Socket.io needed

**Replaces:** Socket.io + Redis Pub/Sub

**Features:**
- Live inbox updates
- Typing indicators
- Agent presence
- New message notifications

**Cost:** Included in Supabase plan

### Frontend: Cloudflare Pages
**Why:** Already deployed, fast global CDN, free SSL

**Replaces:** Separate React deployment

**Features:**
- Admin dashboard
- Team inbox
- Campaign management
- Analytics dashboard

**Cost:** FREE (unlimited bandwidth)

### File Storage: Supabase Storage
**Why:** Built-in, S3-compatible, CDN-backed

**Use Cases:**
- WhatsApp media (images, videos, documents)
- Campaign media
- Exported reports

**Cost:** FREE up to 1GB

---

## Implementation Plan

### Phase 1: Core Webhook (Week 1-2)

#### Step 1: Database Schema
```sql
-- Create tables in Supabase
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT UNIQUE NOT NULL,
  name TEXT,
  profile_data JSONB,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id),
  status TEXT DEFAULT 'open', -- open, assigned, closed
  assigned_agent_id UUID REFERENCES auth.users(id),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  whatsapp_message_id TEXT UNIQUE,
  direction TEXT NOT NULL, -- inbound, outbound
  from_number TEXT,
  to_number TEXT,
  message_type TEXT, -- text, image, document, video, audio
  content TEXT,
  media_url TEXT,
  status TEXT, -- sent, delivered, read, failed
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  category TEXT, -- MARKETING, UTILITY, AUTHENTICATION
  language TEXT DEFAULT 'en',
  status TEXT, -- APPROVED, PENDING, REJECTED
  components JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  template_id UUID REFERENCES templates(id),
  target_contacts UUID[],
  scheduled_at TIMESTAMPTZ,
  status TEXT, -- draft, scheduled, running, completed
  stats JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (agents)
CREATE POLICY "Agents can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can view all conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can view all messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);
```

#### Step 2: Edge Function - Webhook Handler
**File:** `supabase/functions/whatsapp-webhook/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const WHATSAPP_VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN')!
const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN')!
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID')!

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Handle GET - Webhook Verification
  if (req.method === 'GET') {
    const url = new URL(req.url)
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
      console.log('Webhook verified')
      return new Response(challenge, { status: 200 })
    }

    return new Response('Forbidden', { status: 403 })
  }

  // Handle POST - Incoming Messages
  if (req.method === 'POST') {
    try {
      const body = await req.json()

      // Process WhatsApp webhook
      if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              await processIncomingMessage(change.value, supabase)
            }
          }
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      })
    } catch (error) {
      console.error('Webhook error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      })
    }
  }

  return new Response('Method not allowed', { status: 405 })
})

async function processIncomingMessage(value: any, supabase: any) {
  const messages = value.messages
  if (!messages || messages.length === 0) return

  for (const message of messages) {
    const from = message.from
    const messageId = message.id
    const type = message.type
    let content = ''

    // Extract content based on type
    switch (type) {
      case 'text':
        content = message.text.body
        break
      case 'image':
        content = message.image.caption || ''
        break
      case 'button':
        content = message.button.text
        break
      case 'interactive':
        if (message.interactive.type === 'button_reply') {
          content = message.interactive.button_reply.title
        } else if (message.interactive.type === 'list_reply') {
          content = message.interactive.list_reply.title
        }
        break
    }

    // Get or create contact
    const { data: contact } = await supabase
      .from('contacts')
      .upsert({
        phone_number: from,
        name: value.contacts[0]?.profile?.name || 'Unknown',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'phone_number',
        ignoreDuplicates: false
      })
      .select()
      .single()

    // Get or create conversation
    let { data: conversation } = await supabase
      .from('conversations')
      .select('*')
      .eq('contact_id', contact.id)
      .eq('status', 'open')
      .single()

    if (!conversation) {
      const { data: newConv } = await supabase
        .from('conversations')
        .insert({
          contact_id: contact.id,
          last_message_at: new Date().toISOString()
        })
        .select()
        .single()

      conversation = newConv
    }

    // Save message
    await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        whatsapp_message_id: messageId,
        direction: 'inbound',
        from_number: from,
        message_type: type,
        content,
        status: 'received'
      })

    // Mark as read
    await markMessageAsRead(messageId)

    // Process with chatbot (if not assigned to agent)
    if (!conversation.assigned_agent_id) {
      await processChatbotResponse(from, content, conversation.id, supabase)
    }
  }
}

async function markMessageAsRead(messageId: string) {
  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId
    })
  })
}

async function processChatbotResponse(
  to: string,
  query: string,
  conversationId: string,
  supabase: any
) {
  // Simple keyword-based responses (can be enhanced with AI)
  const lowerQuery = query.toLowerCase()
  let response = ''

  if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
    response = "Our pricing varies by solution. I can help you get a custom quote! What product are you interested in?\n\n📦 Microsoft 365\n🎯 Google Workspace\n💬 Messaging Platform\n☁️ Cloud Backup"
  } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
    response = "Hi! Welcome to Datacare 👋\n\nHow can I help you today?\n\n1️⃣ Product Information\n2️⃣ Get a Quote\n3️⃣ Technical Support\n4️⃣ Speak to Sales"
  } else if (lowerQuery.includes('hours') || lowerQuery.includes('time')) {
    response = "We're available Monday-Friday, 8AM-6PM EAT.\n\nYou can also:\n📧 Email: sales@datacare.co.ke\n📞 Call: +254 709 980 000\n🌐 Visit: datacare.co.ke"
  } else {
    // Default response - escalate to human
    response = "Thanks for reaching out! Let me connect you with our team who can better assist you. Someone will respond shortly during business hours (Mon-Fri 8AM-6PM EAT)."

    // Mark conversation for agent attention
    await supabase
      .from('conversations')
      .update({ status: 'assigned' })
      .eq('id', conversationId)
  }

  // Send response
  await sendWhatsAppMessage(to, response, conversationId, supabase)
}

async function sendWhatsAppMessage(
  to: string,
  text: string,
  conversationId: string,
  supabase: any
) {
  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    })
  })

  const data = await response.json()

  // Save outbound message
  if (data.messages && data.messages[0]) {
    await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        whatsapp_message_id: data.messages[0].id,
        direction: 'outbound',
        to_number: to,
        message_type: 'text',
        content: text,
        status: 'sent'
      })
  }
}
```

---

## Cost Breakdown

### Supabase (Database + Edge Functions + Realtime)
- **Free Tier:** 500MB database, 2GB bandwidth, 500K edge function invocations
- **Pro Plan:** $25/month - 8GB database, 50GB bandwidth, 2M invocations
- **Recommended:** Start free, upgrade to Pro when needed

### Cloudflare Pages (Frontend)
- **Free:** Unlimited bandwidth, builds, requests
- **Recommended:** FREE

### WhatsApp Business API
- **Free:** Verification, 1,000 free conversations/month
- **Cost:** $0.005-0.01 per conversation after free tier
- **Recommended:** $10-50/month depending on volume

### Total Monthly Cost:
- **Development:** $0 (all free tiers)
- **Production (Low-Medium Volume):** $25-75/month
- **Production (High Volume):** $100-200/month

**vs Original Plan:** $200-500/month (AWS/DO + servers)

**Savings:** 60-80% cost reduction

---

## Next Steps

1. Review and approve this revised architecture
2. Set up Supabase Edge Functions
3. Create database schema
4. Deploy webhook handler
5. Build admin dashboard (integrate with existing React app)
6. Test with WhatsApp sandbox
7. Go live with production number

Would you like me to start implementing this serverless architecture?
