import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Template } from '@/types/whatsapp';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Send, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TemplateList() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('whatsapp_templates')
                .select('*')
                .order('name');

            if (error) throw error;
            setTemplates(data || []);
        } catch (error) {
            console.error('Error fetching templates:', error);
            toast({
                title: 'Error',
                description: 'Failed to load templates',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSyncTemplates = async () => {
        try {
            setSyncing(true);
            toast({
                title: 'Syncing...',
                description: 'Fetching templates from Meta WhatsApp Cloud API',
            });

            const { data, error } = await supabase.functions.invoke('sync-templates');

            if (error) {
                throw error;
            }

            if (data.error) {
                throw new Error(data.error);
            }

            toast({
                title: 'Success!',
                description: `Synced ${data.synced} template(s) from Meta`,
            });

            // Refresh the template list
            await fetchTemplates();
        } catch (error: any) {
            console.error('Sync error:', error);
            toast({
                title: 'Sync Failed',
                description: error.message || 'Failed to sync templates from Meta',
                variant: 'destructive',
            });
        } finally {
            setSyncing(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
            case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderComponentPreview = (components: any[]) => {
        if (!components || !Array.isArray(components)) return null;

        return (
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-3 font-sans text-sm border border-slate-200 dark:border-slate-800">
                {components.map((comp, idx) => {
                    if (comp.type === 'HEADER' && comp.format === 'TEXT') {
                        return <div key={idx} className="font-bold text-base">{comp.text}</div>;
                    }
                    if (comp.type === 'HEADER' && comp.format === 'IMAGE') {
                        return (
                            <div key={idx} className="h-32 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
                                [Image Header]
                            </div>
                        );
                    }
                    if (comp.type === 'BODY') {
                        // Replace standard param format {{1}} with visual pill
                        const text = comp.text.replace(
                            /{{(\d+)}}/g,
                            '<span class="bg-blue-100 text-blue-800 px-1 rounded mx-0.5 text-xs font-mono">{{$1}}</span>'
                        );
                        return <div key={idx} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: text }} />;
                    }
                    if (comp.type === 'FOOTER') {
                        return <div key={idx} className="text-xs text-slate-500">{comp.text}</div>;
                    }
                    if (comp.type === 'BUTTONS') {
                        return (
                            <div key={idx} className="flex flex-col gap-2 pt-2">
                                {comp.buttons.map((btn: any, bIdx: number) => (
                                    <div key={bIdx} className="bg-white dark:bg-slate-800 border text-blue-500 text-center py-2 px-4 rounded shadow-sm text-xs font-medium cursor-default">
                                        {btn.type === 'URL' ? '🔗 ' : '↩️ '} {btn.text}
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Message Templates</h2>
                    <p className="text-sm text-muted-foreground">Manage your approved WhatsApp marketing templates</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleSyncTemplates} disabled={syncing || loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                    {syncing ? 'Syncing...' : 'Sync from Meta'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Card key={template.id} className="flex flex-col">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-base font-medium">{template.name}</CardTitle>
                                    <CardDescription className="text-xs mt-1 capitalize">
                                        {template.category.toLowerCase()} • {template.language}
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className={getStatusColor(template.status)}>
                                    {template.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4">
                            <ScrollArea className="flex-1 max-h-[300px]">
                                {renderComponentPreview(template.components)}
                            </ScrollArea>

                            <div className="pt-4 mt-auto border-t flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {template.quality_score && (
                                        <span title="Quality Score" className={`
                        flex items-center gap-1 font-medium
                        ${template.quality_score === 'HIGH' ? 'text-green-600' :
                                                template.quality_score === 'LOW' ? 'text-red-600' : 'text-yellow-600'}
                      `}>
                                            <AlertTriangle className="w-3 h-3" />
                                            {template.quality_score} Quality
                                        </span>
                                    )}
                                </div>
                                <Button size="sm" className="gap-2">
                                    <Send className="w-3 h-3" /> Use Template
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {templates.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No templates found. Click "Sync from Meta" to import them.
                    </div>
                )}
            </div>
        </div>
    );
}
