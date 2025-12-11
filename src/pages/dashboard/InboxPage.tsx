import { useState, useCallback, useEffect } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ConversationList from "@/components/messaging/ConversationList"; // Corrected import
import { MessageThread } from "@/components/messaging/MessageThread";
import { Message, Contact, Conversation } from "@/types/whatsapp"; // Assuming types are defined here
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

/**
 * The main page for the team inbox.
 * It orchestrates the conversation list and the message thread view.
 */
const InboxPage = () => {
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const handleSelectConversation = useCallback(async (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    setLoadingMessages(true);
    setMessages([]); // Clear previous messages
    setSelectedContact(null); // Clear previous contact

    try {
      // Fetch contact details
      const { data: contactData, error: contactError } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .eq('id', conversation.contact_id)
        .single();

      if (contactError) throw contactError;
      setSelectedContact(contactData);

      // Fetch messages for the selected conversation
      const { data: messagesData, error: messagesError } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);
    } catch (error) {
      console.error("Error fetching conversation details:", error);
      // Optionally show an error message to the user
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Real-time listener for new messages in the selected conversation
  useEffect(() => {
    if (!selectedConversationId) return;

    const channel = supabase
      .channel(`messages:${selectedConversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'whatsapp_messages', filter: `conversation_id=eq.${selectedConversationId}` },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversationId]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedConversationId || !selectedContact || !user) return;

    const newMessage: Message = {
      id: uuidv4(),
      conversation_id: selectedConversationId,
      organization_id: selectedContact.organization_id, // Assuming contact has organization_id
      direction: 'outbound',
      sender_type: 'agent',
      message_type: 'text',
      content: content,
      status: 'pending', // Optimistically set status to 'pending'
      created_at: new Date().toISOString(),
      agent_id: user.id, // The ID of the logged-in agent
    };

    // Optimistically add the message to the UI
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const { error } = await supabase
        .from('whatsapp_messages')
        .insert([newMessage]);

      if (error) {
        console.error("Error sending message:", error);
        // Update the message status to 'failed' on error
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: 'failed' } : msg
          )
        );
      }
      // On success, the real-time subscription will handle updating the status
      // from 'pending' to 'sent' or 'delivered' if needed.
    } catch (error) {
      console.error("Network error sending message:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'failed' } : msg
        )
      );
    }
  }, [selectedConversationId, selectedContact, user]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-[calc(100vh-8rem)] items-stretch"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <ConversationList
          onSelectConversation={handleSelectConversation}
          selectedConversationId={selectedConversationId}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        {loadingMessages ? (
          <div className="p-4 h-full flex items-center justify-center text-muted-foreground">
            Loading messages...
          </div>
        ) : selectedConversationId && selectedContact ? (
          <MessageThread
            messages={messages}
            contact={selectedContact}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="p-4 h-full flex items-center justify-center text-muted-foreground">
            Select a conversation to view messages
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default InboxPage;