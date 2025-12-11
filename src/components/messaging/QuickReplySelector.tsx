import { useState, useEffect } from "react";
import { QuickReply } from "@/types/whatsapp";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface QuickReplySelectorProps {
    onSelect: (content: string) => void;
    disabled?: boolean;
}

export function QuickReplySelector({ onSelect, disabled }: QuickReplySelectorProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [replies, setReplies] = useState<QuickReply[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && user) {
            fetchReplies();
        }
    }, [open, user]);

    const fetchReplies = async () => {
        setLoading(true);
        try {
            // In a real app, we'd get the organization_id from context/user
            // For now, we'll fetch all replies the user has access to via RLS
            const { data, error } = await supabase
                .from('whatsapp_quick_replies')
                .select('*')
                .order('usage_count', { ascending: false });

            if (error) throw error;
            setReplies(data || []);
        } catch (error) {
            console.error("Error fetching quick replies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                    disabled={disabled}
                    title="Quick Replies (/)"
                >
                    <Zap className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="top" align="start">
                <Command>
                    <CommandInput placeholder="Search quick replies..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Quick Replies">
                            {replies.map((reply) => (
                                <CommandItem
                                    key={reply.id}
                                    onSelect={() => {
                                        onSelect(reply.content);
                                        setOpen(false);
                                    }}
                                    className="flex flex-col items-start gap-1 py-3"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="font-medium text-sm">/{reply.shortcut}</span>
                                        {reply.category && (
                                            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {reply.category}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 w-full">
                                        {reply.content}
                                    </p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
