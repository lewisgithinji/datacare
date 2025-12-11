import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ConversationWithDetails } from '@/types/whatsapp';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, MessageSquare } from 'lucide-react';

interface ConversationListProps {
  onSelectConversation: (conversation: ConversationWithDetails) => void;
  selectedConversationId?: string | null;
}

/**
 * Displays a list of conversations for the current organization.
 * Fetches from whatsapp_conversations joined with whatsapp_contacts.
 */
const ConversationList = ({ onSelectConversation, selectedConversationId }: ConversationListProps) => {
  const { organization } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organization?.id) {
      fetchConversations();
    }
  }, [organization?.id]);

  const fetchConversations = async () => {
    if (!organization?.id) return;

    setLoading(true);
    try {
      // Query conversations with joined contact data
      const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select(`
          *,
          contact:whatsapp_contacts(id, phone_number, name, avatar_url)
        `)
        .eq('organization_id', organization.id)
        .order('last_message_at', { ascending: false, nullsFirst: false })
        .limit(50);

      if (error) {
        console.error('Error fetching conversations:', error);
        setConversations([]);
      } else {
        setConversations(data as ConversationWithDetails[] || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const getContactInitials = (name: string | null, phone: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return phone.slice(-2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'assigned': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
        <p className="text-sm text-muted-foreground">No conversations yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Incoming messages will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={cn(
            "p-3 cursor-pointer transition-colors hover:bg-muted/50",
            selectedConversationId === conversation.id && "bg-muted"
          )}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs">
                {getContactInitials(
                  conversation.contact?.name || null,
                  conversation.contact?.phone_number || '??'
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm truncate">
                  {conversation.contact?.name || conversation.contact?.phone_number || 'Unknown'}
                </span>
                {conversation.last_message_at && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={cn("h-2 w-2 rounded-full", getStatusColor(conversation.status))} />
                <Badge variant="outline" className="text-[10px] px-1 py-0">
                  {conversation.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;