import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MessageInput } from './MessageInput';

// Mock QuickReplySelector to avoid dependencies/side effects
vi.mock('./QuickReplySelector', () => ({
  QuickReplySelector: ({ onSelect }: { onSelect: (text: string) => void }) => (
    <button onClick={() => onSelect('Quick Reply Content')} title="Quick Replies (/)">
      Quick Replies (/)
    </button>
  ),
}));

describe('MessageInput Component', () => {
  const mockOnSend = vi.fn();

  beforeEach(() => {
    mockOnSend.mockClear();
  });

  it('should render the textarea and send button', () => {
    render(<MessageInput onSend={mockOnSend} />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('should call onSend with message content and clear input on send button click', async () => {
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(textarea, { target: { value: 'Test message content' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockOnSend).toHaveBeenCalledTimes(1);
      expect(mockOnSend).toHaveBeenCalledWith('Test message content');
      expect(textarea).toHaveValue('');
    });
  });

  it('should call onSend with message content and clear input on Enter key press', async () => {
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(textarea, { target: { value: 'Another test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnSend).toHaveBeenCalledTimes(1);
      expect(mockOnSend).toHaveBeenCalledWith('Another test message');
      expect(textarea).toHaveValue('');
    });
  });

  it('should not call onSend or clear input if message is empty or only whitespace', async () => {
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(sendButton);

    expect(mockOnSend).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('   '); // Should not clear

    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    expect(mockOnSend).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('   '); // Should not clear
  });

  it('should add a new line on Shift + Enter', () => {
    render(<MessageInput onSend={mockOnSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');

    fireEvent.change(textarea, { target: { value: 'First line' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: true });
    fireEvent.change(textarea, { target: { value: 'First line\nSecond line' } }); // Manually update value as keydown doesn't change it

    expect(textarea).toHaveValue('First line\nSecond line');
    expect(mockOnSend).not.toHaveBeenCalled(); // Should not send
  });

  it('should disable input and buttons when disabled prop is true', () => {
    render(<MessageInput onSend={mockOnSend} disabled={true} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });
    const attachmentButton = screen.getByRole('button', { name: /attach file/i });
    const emojiButton = screen.getByRole('button', { name: /add emoji/i });
    const micButton = screen.getByRole('button', { name: /record voice message/i });

    expect(textarea).toBeDisabled();
    expect(sendButton).toBeDisabled();
    expect(attachmentButton).toBeDisabled();
    expect(emojiButton).toBeDisabled();
    expect(micButton).toBeDisabled();

    fireEvent.change(textarea, { target: { value: 'Attempt to type' } });
    fireEvent.click(sendButton);
    expect(mockOnSend).not.toHaveBeenCalled();
  });
});