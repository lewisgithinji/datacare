import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, Bot, CheckCircle, Zap, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const DatacareMessagingPlatform = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Datacare Messaging Platform</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              AI-powered WhatsApp automation platform for customer engagement and support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Demo</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Pricing</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven WhatsApp Automation</h2>
            <p className="text-lg text-muted-foreground">Trusted by businesses across East Africa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">65%</div>
              <div className="text-muted-foreground">Reduction in Support Calls</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-muted-foreground">Queries Resolved Instantly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Automate Customer Conversations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Chatbots</h3>
              <p className="text-muted-foreground">Intelligent responses for common queries</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
              <p className="text-muted-foreground">Official WhatsApp Business API</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Workflow Automation</h3>
              <p className="text-muted-foreground">Custom workflows for your business</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">Track performance and engagement</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Messaging Platform Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold text-primary mb-2">$99<span className="text-lg text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />1,000 messages/month</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic AI chatbot</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />WhatsApp integration</li>
              </ul>
              <Button className="w-full">Start Free Trial</Button>
            </Card>
            <Card className="p-8 card-elevated border-2 border-primary">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold text-primary mb-2">$299<span className="text-lg text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />10,000 messages/month</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced AI workflows</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Analytics dashboard</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Multi-agent support</li>
              </ul>
              <Button className="w-full">Start Free Trial</Button>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-primary mb-2">Custom<span className="text-lg text-muted-foreground"> pricing</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Unlimited messages</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom AI training</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />API integrations</li>
              </ul>
              <Button className="w-full">Contact Sales</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Sticky Action */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg">
          <HeadphonesIcon className="w-6 h-6" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default DatacareMessagingPlatform;