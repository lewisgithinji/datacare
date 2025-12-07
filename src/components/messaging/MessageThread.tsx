import { useEffect, useRef } from 'react'
import { Message, Contact } from '@/types/whatsapp'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CheckCheck, Check, Clock, Bot, User } from 'lucide-react'

interface MessageThreadProps {
  messages: Message[]
  contact: Contact
}

export function MessageThread({ messages, contact }: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getMessageIcon = (senderType: string) => {
    switch (senderType) {
      case 'bot':
        return <Bot className="h-3 w-3" />
      case 'agent':
        return <User className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-500" />
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-400" />
      case 'sent':
        return <Check className="h-4 w-4 text-gray-400" />
      case 'failed':
        return <Clock className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-300" />
    }
  }

  return (
    <ScrollArea className="flex-1 bg-gradient-to-b from-gray-50 to-white" ref={scrollRef}>
      <div className="p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOutbound = message.direction === 'outbound'
            const showDateDivider =
              index === 0 ||
              format(new Date(message.created_at), 'yyyy-MM-dd') !==
                format(new Date(messages[index - 1].created_at), 'yyyy-MM-dd')

            return (
              <div key={message.id}>
                {/* Date Divider */}
                {showDateDivider && (
                  <div className="flex items-center justify-center my-6">
                    <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {format(new Date(message.created_at), 'MMMM d, yyyy')}
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div className={cn('flex', isOutbound ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[70%] rounded-lg px-4 py-2 shadow-sm',
                      isOutbound
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-gray-900 border border-gray-200'
                    )}
                  >
                    {/* Sender Type Badge */}
                    {message.sender_type !== 'contact' && (
                      <div className={cn(
                        'flex items-center gap-1 text-xs mb-1',
                        isOutbound ? 'text-primary-foreground/80' : 'text-gray-500'
                      )}>
                        {getMessageIcon(message.sender_type)}
                        <span>{message.sender_type === 'bot' ? 'AI Bot' : 'Agent'}</span>
                      </div>
                    )}

                    {/* Message Content */}
                    {message.message_type === 'text' && (
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    )}

                    {message.message_type === 'image' && message.media_url && (
                      <div>
                        <img
                          src={message.media_url}
                          alt="Image message"
                          className="rounded-lg max-w-full mb-2"
                        />
                        {message.media_caption && (
                          <p className="text-sm">{message.media_caption}</p>
                        )}
                      </div>
                    )}

                    {message.message_type === 'document' && message.media_url && (
                      <a
                        href={message.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline"
                      >
                        <span>📎 {message.media_caption || 'Document'}</span>
                      </a>
                    )}

                    {/* Timestamp and Status */}
                    <div
                      className={cn(
                        'flex items-center gap-1 mt-1 text-xs',
                        isOutbound ? 'text-primary-foreground/70 justify-end' : 'text-gray-500'
                      )}
                    >
                      <span>{format(new Date(message.created_at), 'h:mm a')}</span>
                      {isOutbound && getStatusIcon(message.status)}
                    </div>

                    {/* Error Message */}
                    {message.status === 'failed' && message.error_message && (
                      <p className="text-xs text-red-300 mt-1">
                        Failed: {message.error_message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </ScrollArea>
  )
}
