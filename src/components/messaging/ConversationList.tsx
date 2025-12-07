import { ConversationWithDetails } from '@/types/whatsapp'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, MessageSquare, Clock, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface ConversationListProps {
  conversations: ConversationWithDetails[]
  selectedConversation: ConversationWithDetails | null
  onSelectConversation: (conversation: ConversationWithDetails) => void
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700'
      case 'assigned':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'resolved':
        return 'bg-gray-100 text-gray-700'
      case 'closed':
        return 'bg-gray-100 text-gray-500'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600'
      case 'high':
        return 'text-orange-600'
      case 'normal':
        return 'text-gray-600'
      case 'low':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Inbox
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>No conversations yet</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={cn(
                  'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                  selectedConversation?.id === conversation.id && 'bg-primary/5 border-l-4 border-primary'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {conversation.contact?.name?.[0]?.toUpperCase() || 'U'}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.contact?.name || conversation.contact?.phone_number}
                      </h3>
                      {conversation.last_message_at && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 truncate mb-2">
                      {conversation.contact?.phone_number}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={cn('text-xs', getStatusColor(conversation.status))}>
                        {conversation.status}
                      </Badge>

                      {conversation.priority !== 'normal' && (
                        <Badge variant="outline" className={cn('text-xs', getPriorityColor(conversation.priority))}>
                          {conversation.priority}
                        </Badge>
                      )}

                      {conversation.category && (
                        <Badge variant="outline" className="text-xs">
                          {conversation.category}
                        </Badge>
                      )}

                      {conversation.total_messages_count > 0 && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                          <CheckCheck className="h-3 w-3" />
                          {conversation.total_messages_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
