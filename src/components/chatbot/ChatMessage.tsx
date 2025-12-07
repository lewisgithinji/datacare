import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageCircle, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "@/hooks/useChatbot";
import type { QuickAction } from "@/lib/chatbot-query-engine";

interface ChatMessageProps {
  message: Message;
  onQuickAction?: (action: QuickAction) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

const ChatMessage = ({ message, onQuickAction, onSuggestionClick }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
          <AvatarFallback className="bg-primary/10 text-primary">
            <MessageCircle className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm'
        )}
      >
        {/* Message Content */}
        <div className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>

        {/* Quick Action Buttons */}
        {message.quickActions && message.quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border/50">
            {message.quickActions.map((action, i) => (
              <Button
                key={i}
                size="sm"
                variant="outline"
                className="text-xs h-8 bg-background/50 hover:bg-background"
                onClick={() => onQuickAction?.(action)}
              >
                {action.icon && <span className="mr-1.5">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Suggestion Chips */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3">
            <p className="text-xs opacity-70 mb-2">You might want to ask:</p>
            <div className="flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-all duration-200",
                    "hover:scale-105 hover:shadow-sm active:scale-95",
                    isUser
                      ? "border-primary-foreground/20 hover:bg-primary-foreground/10"
                      : "border-border hover:bg-accent"
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <p className={cn(
          "text-xs mt-2 opacity-60",
          isUser ? 'text-right' : 'text-left'
        )}>
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
