import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Bot, MessageSquare, Zap, TrendingUp, CheckCircle, Star, Shield, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AIAndMessagingAutomation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Bot className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI & Messaging Automation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Transform customer engagement with intelligent WhatsApp automation and AI-powered messaging solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Results Across Industries</h2>
            <p className="text-lg text-muted-foreground">Our AI automation drives measurable business outcomes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">65%</div>
              <div className="text-muted-foreground">Reduction in call volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Automated customer support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-muted-foreground">Faster response times</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Revolutionary Customer Engagement</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage AI to automate conversations, qualify leads, and provide instant customer support across WhatsApp and other messaging platforms
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
              <p className="text-muted-foreground">Native WhatsApp Business API with rich media support</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart AI Responses</h3>
              <p className="text-muted-foreground">Context-aware conversations with natural language processing</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Deployment</h3>
              <p className="text-muted-foreground">Go live in 24 hours with pre-built templates</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-muted-foreground">Real-time metrics and conversation analytics</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Automation Package</h2>
            <p className="text-lg text-muted-foreground">Scale your messaging automation as you grow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold text-primary mb-2">$199<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Perfect for small businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 1,000 conversations/month</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic AI responses</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />WhatsApp integration</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Standard templates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Growth Package */}
            <Card className="p-8 card-elevated border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <div className="text-4xl font-bold text-primary mb-2">$499<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">For growing companies</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 5,000 conversations/month</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced AI with learning</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Multi-channel messaging</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom workflows</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Analytics dashboard</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Priority support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Enterprise Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <p className="text-muted-foreground">For large organizations</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Unlimited conversations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom AI training</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />API integrations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />White-label options</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Dedicated support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />SLA guarantees</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Quick Setup Process</h2>
            <p className="text-lg text-muted-foreground">From concept to live automation in just 24 hours</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground">Understand your customer journey and automation needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-muted-foreground">Create conversation flows and AI training data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Deploy</h3>
              <p className="text-muted-foreground">Launch automation with comprehensive testing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Optimize</h3>
              <p className="text-muted-foreground">Continuous improvement based on performance data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Secure & Compliant Messaging</h2>
            <p className="text-lg text-muted-foreground">Your customer data is protected with enterprise-grade security</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground">All messages encrypted with WhatsApp's security protocols</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-muted-foreground">Full compliance with data protection regulations</p>
            </div>
            <div className="text-center">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Responsible AI</h3>
              <p className="text-muted-foreground">Ethical AI practices with human oversight</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">How secure is WhatsApp automation for my customers?</h3>
              <p className="text-muted-foreground">WhatsApp Business API uses end-to-end encryption for all messages. We additionally implement enterprise security measures including data encryption at rest, secure API endpoints, and compliance with GDPR and other privacy regulations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can the AI handle complex customer inquiries?</h3>
              <p className="text-muted-foreground">Our AI is trained on your specific business context and can handle 80-90% of common inquiries. For complex cases, it seamlessly transfers to human agents with full conversation context.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How quickly can we see results?</h3>
              <p className="text-muted-foreground">Most clients see immediate improvements in response times and customer satisfaction. Typical results include 65% reduction in call volume and 3x faster response times within the first month.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you provide ongoing optimization?</h3>
              <p className="text-muted-foreground">Yes! We continuously monitor conversation performance and optimize AI responses based on real customer interactions. Monthly reviews ensure peak performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Automate Your Customer Engagement?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Transform your customer experience with AI-powered messaging automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Demo
              </Button>
            </Link>
            <Link to="/products/datacare-messaging-platform">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Messaging Platform
              </Button>
            </Link>
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

export default AIAndMessagingAutomation;