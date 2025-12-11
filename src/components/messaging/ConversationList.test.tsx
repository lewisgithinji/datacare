import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConversationList from './ConversationList';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    })),
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    })),
    removeChannel: vi.fn(),
  },
}));

// Mock date-fns for consistent output
vi.mock('date-fns', () => ({
  formatDistanceToNow: vi.fn((date) => `about ${new Date(date).getMinutes()} minutes ago`),
}));

const mockedSupabase = vi.mocked(supabase); // Corrected to use vi.mocked
const mockedFormatDistanceToNow = vi.mocked(formatDistanceToNow); // Corrected to use vi.mocked

const mockConversations = [
  {
    id: 'convo-1',
    contact_id: 'contact-1',
    contact_name: 'Alice Smith',
    last_message: 'Hey there!',
    last_message_at: new Date('2025-12-09T10:00:00Z').toISOString(),
  },
  {
    id: 'convo-2',
    contact_id: 'contact-2',
    contact_name: 'Bob Johnson',
    last_message: 'Got it, thanks!',
    last_message_at: new Date('2025-12-09T09:30:00Z').toISOString(),
  },
];

describe('ConversationList Component', () => {
  const mockOnSelectConversation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock implementation for each test
    mockedSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockConversations, error: null }),
    } as any);
    mockedSupabase.channel.mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    } as any);
  });

  it('should display a loading indicator initially', () => {
    // Arrange: Make fetchConversations pending
    mockedSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnValue(new Promise(() => {})), // Never resolves
    } as any);

    render(<ConversationList onSelectConversation={mockOnSelectConversation} />);
    expect(screen.getByText('Loading conversations...')).toBeInTheDocument();
  });

  it('should render conversations after fetching', async () => {
    // Arrange
    render(<ConversationList onSelectConversation={mockOnSelectConversation} />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Hey there!')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('Got it, thanks!')).toBeInTheDocument();
      expect(mockedFormatDistanceToNow).toHaveBeenCalledTimes(2); // For each conversation
    });
  });

  it('should call onSelectConversation when a row is clicked', async () => {
    // Arrange
    render(<ConversationList onSelectConversation={mockOnSelectConversation} />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    // Act
    fireEvent.click(screen.getByText('Alice Smith'));

    // Assert
    expect(mockOnSelectConversation).toHaveBeenCalledTimes(1);
    expect(mockOnSelectConversation).toHaveBeenCalledWith(mockConversations[0]);
  });

  it('should set up and clean up real-time subscription', async () => {
    // Arrange
    const { unmount } = render(<ConversationList onSelectConversation={mockOnSelectConversation} />);

    // Assert: Subscription should be set up on mount
    await waitFor(() => expect(mockedSupabase.channel).toHaveBeenCalledWith('public:whatsapp_conversations'));
    expect(mockedSupabase.channel().on).toHaveBeenCalledWith('postgres_changes', { event: '*', schema: 'public', table: 'whatsapp_conversations' }, expect.any(Function));
    expect(mockedSupabase.channel().on().subscribe).toHaveBeenCalledTimes(1);

    // Act: Unmount the component
    unmount();

    // Assert: Subscription should be removed on unmount
    expect(mockedSupabase.removeChannel).toHaveBeenCalledTimes(1);
  });
});