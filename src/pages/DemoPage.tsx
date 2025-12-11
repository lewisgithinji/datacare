import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Loader2, MessageSquare, Users, Zap, BarChart3, Send, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

/**
 * Demo landing page that auto-logs users into a demo account
 * to showcase the WhatsApp Platform features.
 */
const DemoPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLaunchDemo = async () => {
        setIsLoading(true);

        try {
            // Auto-login with demo credentials
            const { error } = await supabase.auth.signInWithPassword({
                email: 'demo@datacare.co.ke',
                password: 'Demo@2024!Secure', // Use your actual demo password
            });

            if (error) {
                throw error;
            }

            // Success - redirect to inbox
            toast({
                title: 'Welcome to the Demo!',
                description: 'Exploring the Datacare WhatsApp Platform...',
            });

            // Small delay for better UX
            setTimeout(() => {
                navigate('/dashboard/inbox');
            }, 500);

        } catch (error: any) {
            console.error('Demo login error:', error);
            toast({
                title: 'Demo Unavailable',
                description: 'Please try again or contact support.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    const features = [
        {
            icon: MessageSquare,
            title: 'Team Inbox',
            description: 'Manage all WhatsApp conversations in one place with real-time updates',
        },
        {
            icon: Zap,
            title: 'Quick Replies',
            description: 'Respond faster with pre-written message templates',
        },
        {
            icon: Users,
            title: 'Contact Management',
            description: 'Organize and segment your contacts with tags and custom fields',
        },
        {
            icon: Send,
            title: 'Campaigns',
            description: 'Send bulk messages to targeted segments with scheduling',
        },
        {
            icon: BarChart3,
            title: 'Analytics',
            description: 'Track conversation metrics, response times, and team performance',
        },
        {
            icon: Calendar,
            title: 'Automation',
            description: 'Set up auto-responses and workflows to save time',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="text-center mb-12">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                        <span className="text-sm font-medium text-primary">Interactive Demo</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Experience Datacare WhatsApp Platform
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Try our platform with a pre-loaded demo account. No signup required.
                        Explore real features with sample data.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={handleLaunchDemo}
                            disabled={isLoading}
                            className="px-8 py-6 text-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Launching Demo...
                                </>
                            ) : (
                                <>
                                    🚀 Launch Demo Now
                                </>
                            )}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/signup')}
                            className="px-8 py-6 text-lg"
                        >
                            Create Free Account
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">
                        💡 Demo resets every hour • All features enabled • No credit card required
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>

                {/* What You'll See */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">What You'll Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Real Conversations</p>
                                        <p className="text-sm text-muted-foreground">Browse sample WhatsApp conversations with customers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Send Messages</p>
                                        <p className="text-sm text-muted-foreground">Try sending messages and using quick replies</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Manage Contacts</p>
                                        <p className="text-sm text-muted-foreground">View contact profiles, tags, and segments</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Explore Analytics</p>
                                        <p className="text-sm text-muted-foreground">See conversation metrics and team performance</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Test Campaigns</p>
                                        <p className="text-sm text-muted-foreground">Create and preview bulk messaging campaigns</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Full Feature Access</p>
                                        <p className="text-sm text-muted-foreground">No limitations - explore everything we offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                    <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        After exploring the demo, create your free account to start managing your own WhatsApp conversations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={() => navigate('/signup')}
                            className="px-8"
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/contact')}
                            className="px-8"
                        >
                            Talk to Sales
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;
