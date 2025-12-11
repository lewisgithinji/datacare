import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MessageThread } from './MessageThread';
import { Message, Contact } from '@/types/whatsapp';

// --- Mock Data ---
const mockContact: Contact = {
  id: 'contact-1',
  name: 'John Doe',
  phone_number: '+15551234567',
  organization_id: 'org-1',
  created_at: new Date().toISOString(),
};

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversation_id: 'convo-1',
    direction: 'inbound',
    sender_type: 'contact',
    message_type: 'text',
    content: 'Hello, is this available?',
    status: 'read',
    created_at: new Date('2025-12-08T10:00:00Z').toISOString(),
  },
  {
    id: 'msg-2',
    conversation_id: 'convo-1',
    direction: 'outbound',
    sender_type: 'agent',
    message_type: 'text',
    content: 'Yes, it is! How can I help?',
    status: 'delivered',
    created_at: new Date('2025-12-08T10:01:00Z').toISOString(),
  },
  {
    id: 'msg-3',
    conversation_id: 'convo-1',
    direction: 'outbound',
    sender_type: 'bot',
    message_type: 'text',
    content: 'Our business hours are 9 AM to 5 PM.',
    status: 'read',
    created_at: new Date('2025-12-09T14:30:00Z').toISOString(),
  },
];
// --- End Mock Data ---

describe('MessageThread Component', () => {
  it('should render "No messages yet" when the messages array is empty', () => {
    // Arrange
    render(<MessageThread messages={[]} contact={mockContact} />);

    // Assert
    expect(screen.getByText('No messages yet. Start the conversation!')).toBeInTheDocument();
  });

  it('should render a list of messages', () => {
    // Arrange
    render(<MessageThread messages={mockMessages} contact={mockContact} />);

    // Assert
    expect(screen.getByText('Hello, is this available?')).toBeInTheDocument();
    expect(screen.getByText('Yes, it is! How can I help?')).toBeInTheDocument();
    expect(screen.getByText('Our business hours are 9 AM to 5 PM.')).toBeInTheDocument();
  });

  it('should display sender type badges for agent and bot messages', () => {
    // Arrange
    render(<MessageThread messages={mockMessages} contact={mockContact} />);

    // Assert
    expect(screen.getByText('Agent')).toBeInTheDocument();
    expect(screen.getByText('AI Bot')).toBeInTheDocument();

    // Ensure 'contact' sender type does not have a badge
    const contactMessage = screen.getByText('Hello, is this available?').closest('div');
    expect(contactMessage).not.toHaveTextContent('Agent');
    expect(contactMessage).not.toHaveTextContent('AI Bot');
  });

  it('should display status icons for outbound messages', () => {
    // Arrange
    render(<MessageThread messages={mockMessages} contact={mockContact} />);

    // Assert
    const deliveredMessage = screen.getByText('Yes, it is! How can I help?').closest('div');
    const readMessage = screen.getByText('Our business hours are 9 AM to 5 PM.').closest('div');

    // The status icon is a CheckCheck from lucide-react. We can check its presence.
    // A simple way is to check the parent element for the visual distinction.
    // A more robust way would be to add data-testid attributes to the icons.
    expect(deliveredMessage?.querySelector('.text-gray-400')).toBeInTheDocument(); // Delivered status
    expect(readMessage?.querySelector('.text-blue-500')).toBeInTheDocument(); // Read status
  });

  it('should render date dividers for messages on different days', () => {
    // Arrange
    render(<MessageThread messages={mockMessages} contact={mockContact} />);

    // Assert
    expect(screen.getByText('December 8, 2025')).toBeInTheDocument();
    expect(screen.getByText('December 9, 2025')).toBeInTheDocument();
  });

  it('should not render a date divider for messages on the same day', () => {
    // Arrange
    const sameDayMessages = mockMessages.slice(0, 2); // Only messages from Dec 8
    render(<MessageThread messages={sameDayMessages} contact={mockContact} />);

    // Assert
    expect(screen.getByText('December 8, 2025')).toBeInTheDocument();
    expect(screen.queryByText('December 9, 2025')).not.toBeInTheDocument();
  });
});