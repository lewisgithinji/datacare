import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ConversationWithDetails, Message, Contact } from '@/types/whatsapp'
import { ConversationList } from '@/components/messaging/ConversationList'
import { MessageThread } from '@/components/messaging/MessageThread'
import { ContactSidebar } from '@/components/messaging/ContactSidebar'
import { MessageInput } from '@/components/messaging/MessageInput'
import { Loader2, MessageSquare } from 'lucide-react'

export default function Inbox() {
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([])
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [showContactSidebar, setShowContactSidebar] = useState(true)

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations()

    // Subscribe to new conversations
    const conversationChannel = supabase
      .channel('public:whatsapp_conversations')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'whatsapp_conversations' },
        () => {
          fetchConversations()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(conversationChannel)
    }
  }, [])

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)

      // Subscribe to new messages for this conversation
      const messageChannel = supabase
        .channel(`public:whatsapp_messages:conversation_id=eq.${selectedConversation.id}`)
        .on('postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'whatsapp_messages',
            filter: `conversation_id=eq.${selectedConversation.id}`
          },
          (payload) => {
            setMessages(prev => [...prev, payload.new as Message])
          }
        )
        .on('postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'whatsapp_messages',
            filter: `conversation_id=eq.${selectedConversation.id}`
          },
          (payload) => {
            setMessages(prev =>
              prev.map(msg => msg.id === payload.new.id ? payload.new as Message : msg)
            )
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(messageChannel)
      }
    }
  }, [selectedConversation?.id])

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select(`
          *,
          contact:whatsapp_contacts(*),
          assigned_agent:whatsapp_team_members(*)
        `)
        .order('last_message_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setConversations(data as ConversationWithDetails[])
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error} = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !content.trim()) return

    try {
      // TODO: Get actual user/agent ID from auth
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('whatsapp_messages')
        .insert({
          organization_id: selectedConversation.organization_id,
          conversation_id: selectedConversation.id,
          direction: 'outbound',
          sender_type: 'agent',
          sender_id: user?.id || null,
          message_type: 'text',
          content,
          status: 'sent',
        })

      if (error) throw error

      // TODO: Send actual WhatsApp message via Edge Function
      // await fetch('/api/whatsapp/send', { ... })

    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Conversation List - Left Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white shadow-sm">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Message Thread - Center Panel */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                    {selectedConversation.contact?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedConversation.contact?.name || selectedConversation.contact?.phone_number}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.contact?.phone_number}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactSidebar(!showContactSidebar)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showContactSidebar ? 'Hide' : 'Show'} Contact Info
                </button>
              </div>
            </div>

            {/* Messages */}
            <MessageThread messages={messages} contact={selectedConversation.contact!} />

            {/* Message Input */}
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Sidebar - Right Panel */}
      {selectedConversation && showContactSidebar && (
        <div className="w-80 border-l border-gray-200 bg-white shadow-sm">
          <ContactSidebar contact={selectedConversation.contact!} conversation={selectedConversation} />
        </div>
      )}
    </div>
  )
}
