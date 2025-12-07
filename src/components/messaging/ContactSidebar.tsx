import { Contact, Conversation } from '@/types/whatsapp'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Phone,
  Mail,
  Tag,
  User,
  Calendar,
  MessageSquare,
  Clock,
  Star,
  Edit,
  Trash2,
  Archive
} from 'lucide-react'
import { format } from 'date-fns'

interface ContactSidebarProps {
  contact: Contact
  conversation: Conversation
}

export function ContactSidebar({ contact, conversation }: ContactSidebarProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        {/* Contact Header */}
        <div className="text-center mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            {contact.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {contact.name || 'Unknown'}
          </h2>
          <p className="text-sm text-gray-500">{contact.phone_number}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1">
            <Edit className="h-4 w-4" />
            <span className="text-xs">Edit</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1">
            <Star className="h-4 w-4" />
            <span className="text-xs">Star</span>
          </Button>
          <Button variant="outline" size="sm" className="flex flex-col h-auto py-3 gap-1">
            <Archive className="h-4 w-4" />
            <span className="text-xs">Archive</span>
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            Contact Information
          </h3>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Phone</p>
              <p className="text-sm text-gray-900">{contact.phone_number}</p>
            </div>
          </div>

          {/* Email */}
          {contact.email && (
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm text-gray-900">{contact.email}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {contact.tags && contact.tags.length > 0 && (
            <div className="flex items-start gap-3">
              <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Segment */}
          {contact.segment && (
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Segment</p>
                <Badge variant="outline">{contact.segment}</Badge>
              </div>
            </div>
          )}

          {/* First Contact */}
          {contact.first_interaction_at && (
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">First Contact</p>
                <p className="text-sm text-gray-900">
                  {format(new Date(contact.first_interaction_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          )}

          {/* Last Activity */}
          {contact.last_interaction_at && (
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Last Activity</p>
                <p className="text-sm text-gray-900">
                  {format(new Date(contact.last_interaction_at), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Conversation Stats */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Conversation Stats
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">
                {conversation.total_messages_count}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Agent Messages</p>
              <p className="text-2xl font-bold text-gray-900">
                {conversation.agent_messages_count}
              </p>
            </div>

            {conversation.first_response_time_seconds && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">First Response</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.floor(conversation.first_response_time_seconds / 60)}m
                </p>
              </div>
            )}

            {conversation.sentiment && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Sentiment</p>
                <Badge
                  className={
                    conversation.sentiment === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : conversation.sentiment === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }
                >
                  {conversation.sentiment}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Custom Fields */}
        {contact.custom_fields && Object.keys(contact.custom_fields).length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">Custom Fields</h3>
            {Object.entries(contact.custom_fields).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 capitalize">
                    {key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm text-gray-900">{String(value)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Danger Zone */}
        <Separator className="my-6" />
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Contact
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
