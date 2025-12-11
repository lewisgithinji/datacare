import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Broadcast } from '@/types/whatsapp';
import { useAuth } from '@/hooks/useAuth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import {
    Loader2,
    Send,
    AlertCircle,
    CheckCircle2,
    Clock,
    BarChart3,
    Play
} from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner';

export function BroadcastList() {
    const { user } = useAuth();
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingId, setSendingId] = useState<string | null>(null);

    const fetchBroadcasts = async () => {
        try {
            setLoading(true);
            const { data: member } = await supabase
                .from('whatsapp_team_members')
                .select('organization_id')
                .eq('user_id', user?.id)
                .single();

            if (!member) return;

            const { data, error } = await supabase
                .from('whatsapp_broadcasts')
                .select('*, template:whatsapp_templates(name)')
                .eq('organization_id', member.organization_id)
                .order('created_at', { ascending: false });

            if (data) setBroadcasts(data);
        } catch (error) {
            console.error("Error fetching broadcasts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Poll for updates if any broadcast is 'sending'
    useEffect(() => {
        fetchBroadcasts();

        const interval = setInterval(() => {
            setBroadcasts(current => {
                const hasActive = current.some(b => b.status === 'sending');
                if (hasActive) {
                    fetchBroadcasts();
                }
                return current;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [user?.id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'sending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4 mr-1" />;
            case 'sending': return <Loader2 className="w-4 h-4 mr-1 animate-spin" />;
            case 'scheduled': return <Clock className="w-4 h-4 mr-1" />;
            case 'failed': return <AlertCircle className="w-4 h-4 mr-1" />;
            default: return null;
        }
    };

    const handleSendBroadcast = async (broadcastId: string) => {
        try {
            setSendingId(broadcastId);
            toast.info('Starting broadcast...', { id: 'broadcast-send' });

            // Call the Edge Function
            const { data, error } = await supabase.functions.invoke('send-broadcast', {
                body: { broadcast_id: broadcastId }
            });

            if (error) {
                throw error;
            }

            toast.success(
                `Broadcast complete! Sent: ${data.stats?.sent || 0}, Failed: ${data.stats?.failed || 0}`,
                { id: 'broadcast-send', duration: 5000 }
            );

            // Refresh list
            fetchBroadcasts();
        } catch (error: any) {
            console.error('Broadcast error:', error);
            toast.error(error.message || 'Failed to send broadcast', { id: 'broadcast-send' });
        } finally {
            setSendingId(null);
        }
    };

    if (loading && broadcasts.length === 0) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
    }

    if (broadcasts.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed">
                <Send className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No broadcasts yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Create your first campaign to get started.</p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Recent Broadcasts
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign Name</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead className="w-[150px]">Progress</TableHead>
                            <TableHead>Scheduled / Sent</TableHead>
                            <TableHead className="text-right w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {broadcasts.map((broadcast) => {
                            const total = broadcast.total_recipients || 0;
                            const success = broadcast.successful_sends || 0;
                            const failed = broadcast.failed_sends || 0;
                            const progress = total > 0 ? ((success + failed) / total) * 100 : 0;

                            return (
                                <TableRow key={broadcast.id}>
                                    <TableCell className="font-medium">
                                        {broadcast.name}
                                    </TableCell>
                                    <TableCell>
                                        {(broadcast as any).template?.name || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`border-0 ${getStatusColor(broadcast.status || 'draft')}`}>
                                            <div className="flex items-center">
                                                {getStatusIcon(broadcast.status || 'draft')}
                                                <span className="capitalize">{broadcast.status}</span>
                                            </div>
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{total} Contacts</span>
                                            {broadcast.status === 'completed' && failed > 0 && (
                                                <span className="text-xs text-red-500">{failed} Failed</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {broadcast.status === 'sending' || broadcast.status === 'completed' ? (
                                            <div className="space-y-1">
                                                <Progress value={progress} className="h-2" />
                                                <div className="text-xs text-muted-foreground text-right">{Math.round(progress)}%</div>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {broadcast.scheduled_at
                                            ? format(new Date(broadcast.scheduled_at), 'MMM d, p')
                                            : format(new Date(broadcast.created_at), 'MMM d, p')
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {(broadcast.status === 'draft' || broadcast.status === 'failed') && (
                                            <Button
                                                size="sm"
                                                onClick={() => handleSendBroadcast(broadcast.id)}
                                                disabled={sendingId === broadcast.id}
                                            >
                                                {sendingId === broadcast.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Play className="w-4 h-4 mr-1" />
                                                        Send
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
