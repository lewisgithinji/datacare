import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle2, AlertCircle, Save, Smartphone } from 'lucide-react';
import { WhatsAppProvider } from '@/types/whatsapp';

export function WhatsAppConnectionForm() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [provider, setProvider] = useState<WhatsAppProvider | null>(null);

    // Form State
    const [phoneNumberId, setPhoneNumberId] = useState('');
    const [wabaId, setWabaId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [webhookToken, setWebhookToken] = useState('');

    useEffect(() => {
        if (user) {
            fetchProvider();
        }
    }, [user?.id]);

    const fetchProvider = async () => {
        try {
            setLoading(true);
            const { data: member } = await supabase
                .from('whatsapp_team_members')
                .select('organization_id')
                .eq('user_id', user?.id)
                .single();

            if (!member) {
                console.warn("User has no organization member record.");
                return;
            }

            const { data, error } = await supabase
                .from('whatsapp_providers')
                .select('*')
                .eq('organization_id', member.organization_id)
                .maybeSingle(); // Use maybeSingle to avoid 406 on empty

            if (data) {
                setProvider(data);
                setPhoneNumberId(data.phone_number_id);
                setWabaId(data.waba_id);
                setAccessToken(data.access_token);
                setWebhookToken(data.webhook_verify_token);
            } else {
                // Generate a random webhook token for new connections
                setWebhookToken('dc_' + Math.random().toString(36).substring(2, 15));
            }
        } catch (error) {
            console.error('Error fetching provider:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const { data: member } = await supabase
                .from('whatsapp_team_members')
                .select('organization_id')
                .eq('user_id', user?.id)
                .single();

            if (!member) throw new Error("Organization not found");

            const payload = {
                organization_id: member.organization_id,
                phone_number_id: phoneNumberId,
                waba_id: wabaId,
                access_token: accessToken,
                webhook_verify_token: webhookToken,
                provider_type: 'meta',
                status: 'active'
            };

            const { error } = await supabase
                .from('whatsapp_providers')
                .upsert(payload, { onConflict: 'organization_id' });

            if (error) throw error;

            toast({
                title: "Settings Saved",
                description: "Your WhatsApp connection details have been updated.",
            });
            fetchProvider(); // Refresh state

        } catch (error: any) {
            console.error('Error saving settings:', error);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Smartphone className="h-5 w-5 text-green-600" />
                                WhatsApp Cloud API
                            </CardTitle>
                            <CardDescription>
                                Connect your Meta for Business account to send messages.
                            </CardDescription>
                        </div>
                        {provider?.status === 'active' ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                                Not Connected
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Webhook Configuration</AlertTitle>
                        <AlertDescription className="text-sm mt-1">
                            Copy this Verify Token to your Meta App Dashboard:<br />
                            <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-xs">{webhookToken}</code>
                        </AlertDescription>
                    </Alert>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Phone Number ID</Label>
                            <Input
                                value={phoneNumberId}
                                onChange={(e) => setPhoneNumberId(e.target.value)}
                                placeholder="e.g. 10034567890"
                            />
                            <p className="text-xs text-muted-foreground">Found in Meta App Dashboard under WhatsApp &gt; API Setup</p>
                        </div>

                        <div className="space-y-2">
                            <Label>WhatsApp Business Account ID (WABA)</Label>
                            <Input
                                value={wabaId}
                                onChange={(e) => setWabaId(e.target.value)}
                                placeholder="e.g. 20098765432"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>System User Access Token</Label>
                            <Input
                                type="password"
                                value={accessToken}
                                onChange={(e) => setAccessToken(e.target.value)}
                                placeholder="EAAG..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Using a permanent System User token is recommended over temporary tokens.
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 px-6 py-4">
                    <Button onClick={handleSave} disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Connection
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
