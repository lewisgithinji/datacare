# Phase 5: Campaigns Management

## 🎉 What We've Built

A complete WhatsApp campaign management system with templates, scheduling, targeting, and performance tracking!

---

## ✅ Features Implemented

### 1. **Database Schema** (Migration file)
**File:** `supabase/migrations/20250107000006_campaigns_tables.sql`

**Tables Created:**
- ✅ `whatsapp_campaign_templates` - Reusable message templates
- ✅ `whatsapp_campaigns` - Campaign definitions
- ✅ `whatsapp_campaign_recipients` - Individual recipient tracking
- ✅ `whatsapp_campaign_metrics` - Performance view (aggregated)

**Sample Data:**
- ✅ 3 pre-built templates (Welcome, Product Launch, Appointment Reminder)
- ✅ 1 sample completed campaign

---

### 2. **Campaigns Page** (`/dashboard/campaigns`)
**File:** `src/pages/dashboard/Campaigns.tsx`

**Features:**
- ✅ Campaign list with status filtering
- ✅ Create campaign wizard
- ✅ Template selection
- ✅ Audience targeting
- ✅ Scheduling options
- ✅ Performance metrics display
- ✅ Campaign status management
- ✅ Delete campaigns
- ✅ Responsive design

---

## 📊 Database Schema

### Campaign Templates

```sql
whatsapp_campaign_templates (
  id UUID PRIMARY KEY,
  organization_id UUID,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(100),      -- marketing, transactional, notification
  content TEXT,               -- Message template with {{variables}}
  variables JSONB,            -- ["name", "product", "date"]
  media_url TEXT,             -- Optional image/video URL
  media_type VARCHAR(50),     -- image, video, document
  language VARCHAR(10),
  status VARCHAR(50),         -- draft, active, archived
  created_by UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Example Template:**
```
Name: Welcome New Customer
Category: marketing
Content: Hi {{name}}! 👋 Welcome to {{company}}. We're excited to have you!
Variables: ["name", "company"]
Status: active
```

---

### Campaigns

```sql
whatsapp_campaigns (
  id UUID PRIMARY KEY,
  organization_id UUID,
  name VARCHAR(255),
  description TEXT,
  template_id UUID,
  status VARCHAR(50),         -- draft, scheduled, running, paused, completed, cancelled

  -- Targeting
  target_segment VARCHAR(100),    -- all, vip, leads, customers, custom
  target_tags JSONB,              -- Filter by tags
  target_contact_ids JSONB,       -- Specific contacts

  -- Scheduling
  schedule_type VARCHAR(50),      -- immediate, scheduled, recurring
  scheduled_at TIMESTAMPTZ,
  timezone VARCHAR(100),

  -- Performance Tracking
  total_recipients INTEGER,
  messages_sent INTEGER,
  messages_delivered INTEGER,
  messages_read INTEGER,
  messages_replied INTEGER,
  messages_failed INTEGER,

  -- Metadata
  created_by UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
)
```

---

### Campaign Recipients

```sql
whatsapp_campaign_recipients (
  id UUID PRIMARY KEY,
  campaign_id UUID,
  contact_id UUID,

  -- Delivery Status
  status VARCHAR(50),         -- pending, sent, delivered, read, replied, failed
  message_id UUID,

  -- Personalization
  personalized_content TEXT,  -- Message with variables replaced
  variables JSONB,            -- {"name": "John", "company": "Acme"}

  -- Tracking Timestamps
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  UNIQUE(campaign_id, contact_id)
)
```

---

### Campaign Metrics (View)

```sql
whatsapp_campaign_metrics AS VIEW
SELECT
  campaign_id,
  organization_id,
  campaign_name,
  campaign_status,
  total_recipients,
  sent_count,
  delivered_count,
  read_count,
  replied_count,
  failed_count,
  delivery_rate,      -- Percentage delivered
  read_rate,          -- Percentage read
  reply_rate          -- Percentage replied
FROM whatsapp_campaigns
JOIN whatsapp_campaign_recipients
GROUP BY campaign_id
```

---

## 🎯 Campaign Lifecycle

### 1. Draft
- Campaign created but not scheduled
- Can edit all fields
- No messages sent

**Actions:**
- Edit details
- Schedule
- Delete

---

### 2. Scheduled
- Campaign scheduled for future date/time
- Recipients determined
- Waiting for scheduled time

**Actions:**
- View details
- Cancel (back to draft)
- Delete

---

### 3. Running
- Campaign actively sending messages
- Recipients receiving messages
- Performance metrics updating

**Actions:**
- Pause
- View performance
- Monitor progress

---

### 4. Paused
- Campaign temporarily stopped
- Some messages sent, others pending
- Can resume

**Actions:**
- Resume (back to running)
- Cancel
- View partial results

---

### 5. Completed
- All messages sent
- Final performance metrics available
- Read-only

**Actions:**
- View results
- Export report
- Clone campaign

---

### 6. Cancelled
- Campaign stopped before completion
- Partial results available
- Read-only

**Actions:**
- View results
- Delete

---

## 🎨 Campaign Creation Wizard

### Step 1: Basic Information

**Fields:**
- **Campaign Name*** (required)
  - Example: "Summer Sale 2025"
  - Clear, descriptive name

- **Description** (optional)
  - Campaign purpose
  - Internal notes

### Step 2: Template Selection

**Choose Template:**
- Select from pre-built templates
- See template preview
- View variables required

**Template Categories:**
- **Marketing** - Promotions, announcements
- **Transactional** - Order confirmations, shipping updates
- **Notification** - Reminders, alerts

### Step 3: Audience Targeting

**Target Segments:**
- **All Contacts** - Everyone in database
- **VIP Customers** - segment = 'vip'
- **Leads** - segment = 'leads'
- **Customers** - segment = 'customers'
- **Custom** - Manual selection

**Advanced Targeting:**
- Filter by tags
- Filter by segment
- Select specific contacts
- Upload contact list (future)

### Step 4: Scheduling

**Schedule Options:**
- **Send Immediately** - Start sending now
- **Schedule for Later** - Pick date/time

**For Scheduled:**
- Date picker
- Time picker
- Timezone selection

**Recurring (Future):**
- Daily, Weekly, Monthly
- End date
- Max occurrences

---

## 📈 Performance Metrics

### Campaign-Level Metrics

**Delivery Funnel:**
```
Recipients → Sent → Delivered → Read → Replied
   1000      980       950       720      180
  (100%)   (98%)     (95%)     (72%)    (18%)
```

**Key Metrics:**
1. **Total Recipients** - Contacts targeted
2. **Messages Sent** - Successfully sent
3. **Delivery Rate** - % delivered
4. **Read Rate** - % read
5. **Reply Rate** - % replied
6. **Failed Count** - Delivery failures

### Individual Recipient Tracking

**Per Contact:**
- Personalized message content
- Delivery status
- Timestamps for each stage
- Failure reason (if failed)

---

## 🎯 Campaign Stats Dashboard

### Summary Cards (Top Row)

1. **Total Campaigns**
   - Count of all campaigns
   - Icon: Send

2. **Draft**
   - Campaigns not yet sent
   - Icon: FileText

3. **Scheduled**
   - Campaigns waiting to run
   - Icon: Calendar

4. **Running**
   - Active campaigns
   - Icon: Play
   - Color: Green

5. **Completed**
   - Finished campaigns
   - Icon: CheckCircle

---

## 🔧 Campaign Management

### Create Campaign

```typescript
const handleCreateCampaign = async () => {
  const campaign = {
    organization_id: org.id,
    created_by: user.id,
    name: "Summer Sale",
    description: "Promote summer products",
    template_id: "template-uuid",
    target_segment: "customers",
    schedule_type: "scheduled",
    scheduled_at: "2025-07-01T09:00:00Z"
  }

  await supabase
    .from('whatsapp_campaigns')
    .insert(campaign)
}
```

### Update Campaign Status

```typescript
// Start campaign
await supabase
  .from('whatsapp_campaigns')
  .update({ status: 'running', started_at: NOW() })
  .eq('id', campaignId)

// Pause campaign
await supabase
  .from('whatsapp_campaigns')
  .update({ status: 'paused' })
  .eq('id', campaignId)

// Complete campaign
await supabase
  .from('whatsapp_campaigns')
  .update({ status: 'completed', completed_at: NOW() })
  .eq('id', campaignId)
```

### Delete Campaign

```typescript
await supabase
  .from('whatsapp_campaigns')
  .delete()
  .eq('id', campaignId)

// CASCADE deletes campaign_recipients automatically
```

---

## 🎨 UI Components

### Campaign Status Badges

**Visual Indicators:**
```typescript
Status → Badge Color & Icon
draft → Secondary, FileText
scheduled → Default, Calendar
running → Default, Play
paused → Secondary, Pause
completed → Default, CheckCircle
cancelled → Destructive, XCircle
```

### Campaign Table

**Columns:**
1. **Campaign** - Name, description, target
2. **Status** - Badge with icon
3. **Recipients** - Count with Users icon
4. **Performance** - Sent/Delivered/Read stats
5. **Created** - Relative time + scheduled time
6. **Actions** - Play/Pause/View/Delete buttons

### Create Campaign Dialog

**Modal Form:**
- Full-width dialog (max-w-2xl)
- Multi-step form
- Validation on submit
- Cancel/Create buttons
- Scrollable content

---

## 🧪 Testing Guide

### Test Campaign Creation

1. **Visit `/dashboard/campaigns`**
   - [ ] Page loads
   - [ ] Stats cards display
   - [ ] "Create Campaign" button visible

2. **Click "Create Campaign"**
   - [ ] Dialog opens
   - [ ] Form fields present
   - [ ] Template dropdown populated

3. **Fill Out Form**
   - [ ] Enter campaign name
   - [ ] Enter description
   - [ ] Select template
   - [ ] Choose target segment
   - [ ] Select schedule type

4. **Create Campaign**
   - [ ] Click "Create Campaign"
   - [ ] Success toast appears
   - [ ] Dialog closes
   - [ ] Campaign appears in list
   - [ ] Status is "draft"

### Test Campaign Status Changes

1. **Draft → Scheduled**
   - [ ] Click Play button on draft campaign
   - [ ] Status updates to "scheduled"
   - [ ] Badge changes

2. **Running → Paused**
   - [ ] Click Pause on running campaign
   - [ ] Status updates to "paused"
   - [ ] Can resume later

3. **Paused → Running**
   - [ ] Click Play on paused campaign
   - [ ] Status back to "running"

### Test Campaign Filtering

1. **Tab Filters**
   - [ ] "All" shows all campaigns
   - [ ] "Draft" shows only drafts
   - [ ] "Scheduled" shows only scheduled
   - [ ] "Running" shows only running
   - [ ] "Completed" shows only completed

2. **Empty States**
   - [ ] If no campaigns, shows empty state
   - [ ] Empty state has "Create Campaign" button

### Test Campaign Deletion

1. **Delete Campaign**
   - [ ] Click delete button
   - [ ] Confirmation dialog appears
   - [ ] Click confirm
   - [ ] Campaign removed from list
   - [ ] Success toast shown

---

## 📱 Responsive Design

### Desktop (lg: 1024px+)
- 5-column stats grid
- Full table width
- Dialog centered

### Tablet (md: 768px+)
- 2-3 column stats grid
- Scrollable table
- Full dialog width

### Mobile (sm: < 768px)
- Single column stats
- Cards instead of table
- Full-screen dialog

---

## 🔐 Security (RLS Policies)

### Campaign Templates

```sql
-- Users can view templates from their organization
CREATE POLICY "view_templates"
  ON whatsapp_campaign_templates FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM whatsapp_team_members
    WHERE user_id = auth.uid()
  ));

-- Users can create templates in their organization
CREATE POLICY "create_templates"
  ON whatsapp_campaign_templates FOR INSERT
  WITH CHECK (organization_id IN (...));
```

### Campaigns

```sql
-- Users can only see campaigns from their organization
CREATE POLICY "view_campaigns"
  ON whatsapp_campaigns FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM whatsapp_team_members
    WHERE user_id = auth.uid()
  ));

-- Users can create campaigns in their organization
CREATE POLICY "create_campaigns"
  ON whatsapp_campaigns FOR INSERT
  WITH CHECK (organization_id IN (...));
```

**Security Features:**
- ✅ Multi-tenant isolation
- ✅ Organization-based access
- ✅ User authentication required
- ✅ Team member validation

---

## 🚀 Future Enhancements

### 1. Template Builder

**Visual Editor:**
- Drag-and-drop interface
- Variable insertion
- Media upload
- Preview mode
- Template library

```typescript
<TemplateBuilder
  onSave={(template) => saveTemplate(template)}
  variables={['name', 'product', 'price']}
/>
```

### 2. Advanced Targeting

**Smart Segmentation:**
- Behavioral targeting (last purchase, engagement)
- RFM analysis (Recency, Frequency, Monetary)
- A/B testing groups
- Lookalike audiences

```typescript
<TargetingBuilder
  filters={[
    { field: 'last_purchase_days', operator: '<', value: 30 },
    { field: 'total_spent', operator: '>', value: 1000 },
    { field: 'tags', operator: 'contains', value: 'vip' }
  ]}
/>
```

### 3. Recurring Campaigns

**Automated Schedules:**
```typescript
{
  schedule_type: 'recurring',
  recurrence: {
    frequency: 'weekly',
    day_of_week: 'monday',
    time: '09:00',
    timezone: 'UTC',
    end_date: '2025-12-31'
  }
}
```

### 4. Campaign Analytics

**Detailed Reporting:**
- Click tracking (if links in message)
- Conversion tracking
- Revenue attribution
- Time-based analysis
- Comparison reports

```typescript
<CampaignAnalytics
  campaignId={campaign.id}
  metrics={['reach', 'engagement', 'conversion']}
  dateRange="last_30_days"
/>
```

### 5. Message Personalization

**Dynamic Content:**
- Contact field insertion
- Conditional content
- Product recommendations
- Location-based messaging

```typescript
{
  content: `Hi {{contact.name}}!
    {{#if contact.vip}}
      As a VIP customer, enjoy 20% off!
    {{else}}
      Get 10% off your next purchase!
    {{/if}}`,
  variables: {
    'contact.name': contact.name,
    'contact.vip': contact.segment === 'vip'
  }
}
```

### 6. Campaign Workflows

**Multi-Step Campaigns:**
```typescript
{
  name: "Onboarding Series",
  steps: [
    { delay: 0, template: "welcome" },
    { delay: 86400, template: "getting_started" },
    { delay: 259200, template: "tips_and_tricks" },
    { delay: 604800, template: "feedback_request" }
  ]
}
```

### 7. Approval Workflow

**Campaign Approval:**
- Draft → Pending Approval → Approved → Scheduled
- Manager review
- Compliance checks
- Brand guidelines validation

### 8. CSV Import/Export

**Bulk Operations:**
```typescript
// Import contacts for campaign
const importContacts = async (file: File) => {
  const contacts = await parseCSV(file)
  await createCampaignRecipients(campaign.id, contacts)
}

// Export campaign results
const exportResults = async (campaignId: string) => {
  const results = await getCampaignMetrics(campaignId)
  downloadCSV(results, 'campaign-results.csv')
}
```

---

## 📊 Campaign Execution Flow

### Immediate Campaign

```
1. Create campaign (status: draft)
2. Select template
3. Choose "Send Immediately"
4. Click Create
5. System:
   - Determines recipients based on targeting
   - Creates campaign_recipient records
   - Updates total_recipients count
   - Changes status to "running"
   - Sends messages via WhatsApp API
   - Tracks delivery status
   - Updates metrics in real-time
6. When all sent:
   - status → "completed"
   - completed_at → NOW()
```

### Scheduled Campaign

```
1. Create campaign (status: draft)
2. Select template
3. Choose "Schedule for Later"
4. Pick date/time
5. Click Create
6. System:
   - Determines recipients
   - Creates campaign_recipient records
   - status → "scheduled"
   - Waits for scheduled_at time
7. At scheduled time:
   - status → "running"
   - started_at → NOW()
   - Sends messages
   - Tracks delivery
8. When complete:
   - status → "completed"
   - completed_at → NOW()
```

---

## 🎯 Key Business Value

### For Marketing Teams
- Launch campaigns quickly
- Target specific segments
- Track performance
- Optimize messaging

### For Sales Teams
- Bulk outreach
- Follow-up automation
- Lead nurturing
- Product announcements

### For Customer Success
- Onboarding sequences
- Educational content
- Renewal reminders
- Feedback collection

### For Operations
- Appointment reminders
- Status updates
- Event notifications
- System alerts

---

## 📝 Files Created/Modified

### New Files (2)
1. `supabase/migrations/20250107000006_campaigns_tables.sql` - Database schema
2. `src/pages/dashboard/Campaigns.tsx` - Campaigns page (600+ lines)

### Modified Files (1)
1. `src/App.tsx` - Added campaigns route

### Dependencies Added
- None (uses existing shadcn components)

---

## ✅ Success Criteria

**Phase 5 Complete When:**

- [x] Database tables created
- [x] Sample templates added
- [x] Campaigns page loads
- [x] Create campaign works
- [x] Template selection works
- [x] Audience targeting works
- [x] Scheduling options work
- [x] Status changes work
- [x] Delete campaigns works
- [x] Performance metrics display
- [x] RLS policies enabled
- [x] Responsive design
- [x] No console errors

---

**Phase 5 Complete!** 🎉

Your campaigns system now has:
- ✅ Complete database schema
- ✅ Campaign creation wizard
- ✅ Template management
- ✅ Audience targeting
- ✅ Scheduling options
- ✅ Performance tracking
- ✅ Status management
- ✅ Security (RLS)
- ✅ Professional UI

**Ready for Phase 6 (Settings) or Campaign Execution!** 🚀
