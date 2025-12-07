// WhatsApp Platform Types

export interface Organization {
  id: string
  name: string
  slug: string
  whatsapp_phone_number_id: string | null
  whatsapp_business_account_id: string | null
  plan: 'trial' | 'starter' | 'professional' | 'enterprise'
  plan_expires_at: string | null
  features: {
    ai_chatbot?: boolean
    workflows?: boolean
    analytics?: boolean
    campaigns?: boolean
    api_access?: boolean
  }
  branding: {
    logo_url?: string | null
    primary_color?: string
    company_name?: string | null
    custom_domain?: string | null
  }
  settings: {
    business_hours?: {
      enabled: boolean
      timezone: string
      schedule: Record<string, { start: string; end: string } | null>
    }
    auto_response?: {
      enabled: boolean
      outside_hours_message: string
    }
    languages?: string[]
  }
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  organization_id: string
  user_id: string
  role: 'admin' | 'supervisor' | 'agent' | 'viewer'
  permissions: string[]
  is_active: boolean
  status: 'online' | 'offline' | 'busy' | 'away'
  last_seen_at: string | null
  max_concurrent_conversations: number
  skills: string[]
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  organization_id: string
  phone_number: string
  name: string | null
  email: string | null
  avatar_url: string | null
  tags: string[]
  segment: string | null
  custom_fields: Record<string, any>
  metadata: {
    source?: string
    total_conversations?: number
    total_messages?: number
    last_activity?: string | null
  }
  last_interaction_at: string | null
  first_interaction_at: string | null
  opt_in_status: 'opted_in' | 'opted_out' | 'pending'
  opt_in_date: string | null
  opt_out_date: string | null
  is_blocked: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  organization_id: string
  contact_id: string
  assigned_agent_id: string | null
  assigned_at: string | null
  status: 'open' | 'assigned' | 'pending' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  channel: string
  source: string | null
  tags: string[]
  category: string | null
  sentiment: 'positive' | 'neutral' | 'negative' | null
  intent: string | null
  summary: string | null
  first_response_time_seconds: number | null
  resolution_time_seconds: number | null
  total_messages_count: number
  agent_messages_count: number
  bot_messages_count: number
  satisfaction_rating: number | null
  satisfaction_comment: string | null
  last_message_at: string | null
  first_agent_response_at: string | null
  resolved_at: string | null
  closed_at: string | null
  created_at: string
  updated_at: string

  // Joined data
  contact?: Contact
  assigned_agent?: TeamMember
}

export interface Message {
  id: string
  organization_id: string
  conversation_id: string
  whatsapp_message_id: string | null
  direction: 'inbound' | 'outbound'
  sender_type: 'contact' | 'agent' | 'bot' | 'system'
  sender_id: string | null
  message_type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact' | 'template' | 'interactive'
  content: string | null
  media_url: string | null
  media_mime_type: string | null
  media_size_bytes: number | null
  media_caption: string | null
  template_name: string | null
  template_language: string | null
  template_components: any | null
  status: 'sent' | 'delivered' | 'read' | 'failed'
  error_code: string | null
  error_message: string | null
  is_internal_note: boolean
  metadata: Record<string, any>
  sent_at: string | null
  delivered_at: string | null
  read_at: string | null
  failed_at: string | null
  created_at: string
}

export interface Template {
  id: string
  organization_id: string
  whatsapp_template_id: string | null
  name: string
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
  language: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAUSED' | 'DISABLED'
  rejection_reason: string | null
  components: any
  usage_count: number
  last_used_at: string | null
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  organization_id: string
  name: string
  description: string | null
  template_id: string | null
  target_segment: any | null
  target_contact_ids: string[] | null
  total_target_count: number
  scheduled_at: string | null
  started_at: string | null
  completed_at: string | null
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled' | 'failed'
  stats: {
    total: number
    sent: number
    delivered: number
    read: number
    failed: number
    replied: number
  }
  send_rate_per_second: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface ConversationWithDetails extends Conversation {
  contact: Contact
  assigned_agent: TeamMember | null
  latest_message?: Message
  unread_count?: number
}
