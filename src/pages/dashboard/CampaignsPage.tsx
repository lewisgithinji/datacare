import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateList } from '@/components/campaigns/TemplateList';
import { BroadcastBuilder } from '@/components/campaigns/BroadcastBuilder';
import { BroadcastList } from '@/components/campaigns/BroadcastList';
import { Button } from '@/components/ui/button';
import { Plus, Megaphone } from 'lucide-react';

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState('broadcasts');
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <BroadcastBuilder
                onCancel={() => setIsCreating(false)}
                onSuccess={() => {
                    setIsCreating(false);
                    setActiveTab('broadcasts');
                }}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Campaigns & Broadcasts</h1>
                    <p className="text-muted-foreground">
                        Manage your marketing campaigns and WhatsApp templates.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {activeTab === 'broadcasts' && (
                        <Button onClick={() => setIsCreating(true)}>
                            <Megaphone className="w-4 h-4 mr-2" />
                            New Broadcast
                        </Button>
                    )}
                    {activeTab === 'templates' && (
                        <Button variant="outline" disabled>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Template (Coming Soon)
                        </Button>
                    )}
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="broadcasts" className="gap-2">
                        <Megaphone className="w-4 h-4" />
                        Broadcasts
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="gap-2">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <line x1="9" x2="15" y1="3" y2="21" />
                        </svg>
                        Templates
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="broadcasts" className="space-y-4">
                    <BroadcastList />
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                    <TemplateList />
                </TabsContent>
            </Tabs>
        </div>
    );
}
