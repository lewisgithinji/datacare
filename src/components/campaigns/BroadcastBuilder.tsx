import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Template, Broadcast } from '@/types/whatsapp';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Loader2, Calendar as CalendarIcon, CheckCircle2, Users, MessageSquare, Megaphone, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utils file
import { ScrollArea } from '@/components/ui/scroll-area';

interface BroadcastBuilderProps {
    onCancel: () => void;
    onSuccess: () => void;
}

export function BroadcastBuilder({ onCancel, onSuccess }: BroadcastBuilderProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [contactCount, setContactCount] = useState<number | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
    const [segment, setSegment] = useState('all');
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

    // Fetch Templates on mount
    useEffect(() => {
        const loadTemplates = async () => {
            const { data } = await supabase
                .from('whatsapp_templates')
                .select('*')
                .eq('status', 'APPROVED');
            if (data) setTemplates(data);
        };
        loadTemplates();
    }, []);

    // Fetch Contact Count when segment changes
    useEffect(() => {
        const fetchCount = async () => {
            // Logic would go here to filter based on segment
            // For now, just count all contacts
            const { count } = await supabase
                .from('whatsapp_contacts')
                .select('*', { count: 'exact', head: true });
            setContactCount(count);
        };
        fetchCount();
    }, [segment]);

    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

    const handleNext = () => {
        if (step === 1 && !name) {
            toast({ title: "Name required", description: "Please name your broadcast.", variant: "destructive" });
            return;
        }
        if (step === 3 && !selectedTemplateId) {
            toast({ title: "Template required", description: "Please select a template.", variant: "destructive" });
            return;
        }
        setStep(s => s + 1);
    };

    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = async (saveAsDraft = false) => {
        try {
            setLoading(true);

            // Get org id (hacky for now, ideally from context)
            const { data: member } = await supabase
                .from('whatsapp_team_members')
                .select('organization_id')
                .eq('user_id', user?.id)
                .single();

            if (!member) throw new Error("No organization found");

            const { data: newBroadcast, error } = await supabase.from('whatsapp_broadcasts').insert({
                organization_id: member.organization_id,
                name,
                template_id: selectedTemplateId,
                segment_criteria: { type: segment },
                status: saveAsDraft ? 'draft' : (scheduledDate ? 'scheduled' : 'sending'),
                scheduled_at: scheduledDate ? scheduledDate.toISOString() : null,
                total_recipients: contactCount || 0,
                created_by: user?.id
            }).select().single();

            if (error) throw error;

            if (!scheduledDate && !saveAsDraft && newBroadcast) {
                const { error: funcError } = await supabase.functions.invoke('send-broadcast', {
                    body: { broadcast_id: newBroadcast.id }
                });

                if (funcError) {
                    console.error('Failed to trigger broadcast:', funcError);
                    toast({ title: "Warning", description: "Broadcast created but failed to start due to server error.", variant: "destructive" });
                }
            }

            toast({
                title: saveAsDraft ? "Draft Saved!" : "Broadcast Created!",
                description: saveAsDraft ? "You can send this broadcast later from the Broadcasts tab." : (scheduledDate ? "Campaign scheduled successfully." : "Broadcast started sending."),
            });
            onSuccess();

        } catch (err: any) {
            console.error(err);
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                        step === s ? "border-primary bg-primary text-primary-foreground" :
                            step > s ? "border-primary bg-primary/20 text-primary" :
                                "border-muted bg-background text-muted-foreground"
                    )}>
                        {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                    {s < 4 && <div className={cn("w-12 h-0.5 mx-2", step > s ? "bg-primary" : "bg-muted")} />}
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create Broadcast</h2>
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            </div>

            {renderStepIndicator()}

            <Card className="min-h-[400px] flex flex-col">
                <CardContent className="flex-1 pt-6">
                    {step === 1 && (
                        <div className="space-y-6 max-w-md mx-auto">
                            <div>
                                <Label>Broadcast Name</Label>
                                <Input
                                    placeholder="e.g. December Newsletter"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Schedule (Optional)</Label>
                                <div className="block">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !scheduledDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {scheduledDate ? format(scheduledDate, "PPP") : <span>Send immediately</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <p className="text-xs text-muted-foreground">Leave empty to send immediately after creation.</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 max-w-md mx-auto">
                            <div className="space-y-4">
                                <Label>Select Audience</Label>
                                <Select value={segment} onValueChange={setSegment}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Contacts</SelectItem>
                                        <SelectItem value="vip">VIP Customers</SelectItem>
                                        <SelectItem value="leads">New Leads</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Estimated Recipients</p>
                                        <p className="text-2xl font-bold">{contactCount !== null ? contactCount : <Loader2 className="w-4 h-4 animate-spin inline" />}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="mb-2 block">Select Template</Label>
                                    <ScrollArea className="h-[300px] border rounded-md">
                                        <div className="p-2 space-y-2">
                                            {templates.map(t => (
                                                <div
                                                    key={t.id}
                                                    onClick={() => setSelectedTemplateId(t.id)}
                                                    className={cn(
                                                        "p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors",
                                                        selectedTemplateId === t.id ? "border-primary bg-primary/5" : "border-transparent"
                                                    )}
                                                >
                                                    <div className="font-medium text-sm">{t.name}</div>
                                                    <div className="text-xs text-muted-foreground">{t.language} • {t.category}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>

                                <div className="border rounded-lg bg-muted/30 p-4">
                                    <Label className="mb-4 block text-center text-muted-foreground">Preview</Label>
                                    {selectedTemplate ? (
                                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 max-w-[280px] mx-auto text-sm space-y-2">
                                            {/* Header */}
                                            {selectedTemplate.components.find((c: any) => c.type === 'HEADER' && c.format === 'TEXT') && (
                                                <div className="font-bold">{selectedTemplate.components.find((c: any) => c.type === 'HEADER').text}</div>
                                            )}
                                            {/* Body */}
                                            {selectedTemplate.components.find((c: any) => c.type === 'BODY') && (
                                                <div className="whitespace-pre-wrap">{selectedTemplate.components.find((c: any) => c.type === 'BODY').text}</div>
                                            )}
                                            {/* Footer */}
                                            {selectedTemplate.components.find((c: any) => c.type === 'FOOTER') && (
                                                <div className="text-xs text-muted-foreground mt-2">{selectedTemplate.components.find((c: any) => c.type === 'FOOTER').text}</div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
                                            <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                                            Select a template to preview
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Variable Mapping Logic would go here - skipping for MVP */}
                        </div>
                    )}

                    {step === 4 && (
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Name</span>
                                    <span className="font-medium">{name}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Recipients</span>
                                    <span className="font-medium">{contactCount} Contacts</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Template</span>
                                    <span className="font-medium">{selectedTemplate?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Schedule</span>
                                    <span className="font-medium flex items-center gap-2">
                                        {scheduledDate ? format(scheduledDate, 'PPP p') : 'Immediately'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    {step < 4 ? (
                        <Button onClick={handleNext}>
                            Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => handleSubmit(true)} disabled={loading}>
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Save as Draft
                            </Button>
                            <Button onClick={() => handleSubmit(false)} disabled={loading}>
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {scheduledDate ? 'Schedule Campaign' : 'Send Now'}
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
