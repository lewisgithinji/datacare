import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuickReplySelector } from './QuickReplySelector';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

// Mock dependencies
vi.mock('@/hooks/useAuth');
vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(),
    },
}));

describe('QuickReplySelector Component', () => {
    const mockOnSelect = vi.fn();
    const mockUser = { id: 'user-123', email: 'test@example.com' };

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth as any).mockReturnValue({ user: mockUser });
    });

    it('should render the trigger button', () => {
        render(<QuickReplySelector onSelect={mockOnSelect} />);
        expect(screen.getByTitle('Quick Replies (/)')).toBeInTheDocument();
    });

    it('should fetch and display quick replies when opened', async () => {
        // Mock Supabase response
        const mockReplies = [
            { id: '1', shortcut: 'hello', content: 'Hello! How can I help you?', category: 'greeting', usage_count: 5 },
            { id: '2', shortcut: 'bye', content: 'Goodbye! Have a nice day.', category: 'greeting', usage_count: 3 },
        ];

        const mockSelect = vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockReplies, error: null }),
        });
        (supabase.from as any).mockReturnValue({ select: mockSelect });

        render(<QuickReplySelector onSelect={mockOnSelect} />);

        // Open the popover
        fireEvent.click(screen.getByTitle('Quick Replies (/)'));

        // Should call Supabase
        await waitFor(() => {
            expect(supabase.from).toHaveBeenCalledWith('whatsapp_quick_replies');
        });

        // Should display shortcuts
        expect(screen.getByText('/hello')).toBeInTheDocument();
        expect(screen.getByText('/bye')).toBeInTheDocument();
    });

    it('should call onSelect when a reply is clicked', async () => {
        const mockReplies = [
            { id: '1', shortcut: 'hello', content: 'Hello! How can I help you?', category: 'greeting', usage_count: 5 },
        ];

        const mockSelect = vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockReplies, error: null }),
        });
        (supabase.from as any).mockReturnValue({ select: mockSelect });

        render(<QuickReplySelector onSelect={mockOnSelect} />);

        // Open and select
        fireEvent.click(screen.getByTitle('Quick Replies (/)'));
        await waitFor(() => screen.getByText('/hello'));

        fireEvent.click(screen.getByText('/hello'));

        expect(mockOnSelect).toHaveBeenCalledWith('Hello! How can I help you?');
    });

    it('should not fetch if user is not authenticated', async () => {
        (useAuth as any).mockReturnValue({ user: null });
        render(<QuickReplySelector onSelect={mockOnSelect} />);

        fireEvent.click(screen.getByTitle('Quick Replies (/)'));

        // Should NOT call Supabase
        expect(supabase.from).not.toHaveBeenCalled();
    });
});
