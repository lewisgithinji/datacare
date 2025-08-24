import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HelpCircle, Search, CheckCircle, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Knowledge Base</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
        </div>
      </section>

      {/* Knowledge Base Articles */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Microsoft 365 Section */}
            <Card className="p-8 card-elevated">
              <h2 className="text-3xl font-bold mb-6">What Microsoft 365 Plan Fits My Business?</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Choosing the right Microsoft 365 plan depends on your business size, needs, and budget. 
                  Here's a comprehensive breakdown of each plan to help you make the best decision.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="basic">
                    <AccordionTrigger className="text-xl font-semibold">Microsoft 365 Business Basic - $6/user/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best for:</h4>
                        <p className="text-muted-foreground">Small businesses that primarily need email, basic collaboration, and cloud storage without desktop applications.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What's included:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Web versions of Office apps (Word, Excel, PowerPoint)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Outlook email with custom domain</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />1TB OneDrive cloud storage per user</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Microsoft Teams for video conferencing</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />SharePoint for team collaboration</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Limitations:</h4>
                        <p className="text-muted-foreground">No desktop Office applications, limited advanced security features.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="standard">
                    <AccordionTrigger className="text-xl font-semibold">Microsoft 365 Business Standard - $12.50/user/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best for:</h4>
                        <p className="text-muted-foreground">Most small to medium businesses that need full productivity suite with desktop applications.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Everything in Basic plus:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Desktop versions of Office apps (Word, Excel, PowerPoint, Outlook)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Access database and Publisher</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Advanced Teams features (recordings, breakout rooms)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Attendee registration and reporting for webinars</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Why we recommend this:</h4>
                        <p className="text-muted-foreground">Best value for most businesses. Includes everything needed for productivity and collaboration.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="premium">
                    <AccordionTrigger className="text-xl font-semibold">Microsoft 365 Business Premium - $22/user/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best for:</h4>
                        <p className="text-muted-foreground">Businesses requiring advanced security, device management, and compliance features.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Everything in Standard plus:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Advanced Threat Protection (ATP)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Device management and mobile application management</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Windows 10/11 Business licenses</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Azure Information Protection</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Compliance tools and eDiscovery</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recommended for:</h4>
                        <p className="text-muted-foreground">Law firms, financial services, healthcare, or any business handling sensitive data.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Need help choosing?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our experts can assess your specific needs and recommend the perfect plan for your business.
                  </p>
                  <Link to="/contact">
                    <Button>Book a Consultation</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* WhatsApp Security Section */}
            <Card className="p-8 card-elevated">
              <h2 className="text-3xl font-bold mb-6">How Secure is WhatsApp Automation for My Customers?</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Security is our top priority when implementing WhatsApp automation for businesses. 
                  Here's everything you need to know about keeping your customer communications secure.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="encryption">
                    <AccordionTrigger className="text-xl font-semibold">End-to-End Encryption</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        All WhatsApp messages, including automated ones, are protected by end-to-end encryption. 
                        This means only you and your customer can read the messages - not even WhatsApp or Datacare can access the content.
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Messages encrypted using Signal Protocol</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Unique encryption keys for each conversation</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />No message content stored on servers</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="compliance">
                    <AccordionTrigger className="text-xl font-semibold">Compliance & Data Protection</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        Our WhatsApp automation platform complies with major data protection regulations 
                        and follows industry best practices for customer data handling.
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />GDPR compliant data processing</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Local data residency options in Kenya</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Customer consent management</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Audit logs for all interactions</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="business-api">
                    <AccordionTrigger className="text-xl font-semibold">WhatsApp Business API Security</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-muted-foreground">
                        We use the official WhatsApp Business API, which provides additional security 
                        features and validation compared to regular WhatsApp Business app.
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Business verification by Meta/WhatsApp</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Green checkmark for verified business</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Rate limiting to prevent spam</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Webhook security with HTTPS encryption</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Still have security concerns?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our security team can provide detailed technical documentation and answer specific questions about your use case.
                  </p>
                  <Link to="/contact">
                    <Button>Book a Security Consultation</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Web Design Packages Section */}
            <Card className="p-8 card-elevated">
              <h2 className="text-3xl font-bold mb-6">What's Included in Datacare's Web Design Retainer Packages?</h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Our Web Design as a Service packages provide ongoing website maintenance, updates, 
                  and support on a monthly retainer basis. Here's what each package includes.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="starter">
                    <AccordionTrigger className="text-xl font-semibold">Starter Package - $299/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Perfect for:</h4>
                        <p className="text-muted-foreground">Small businesses needing basic website maintenance and occasional updates.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What's included:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Up to 5 hours of design/development work per month</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Website hosting and security monitoring</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Content updates (text, images, basic pages)</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Monthly performance reports</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Basic SEO optimization</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Email support (48-hour response)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="growth">
                    <AccordionTrigger className="text-xl font-semibold">Growth Package - $599/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Perfect for:</h4>
                        <p className="text-muted-foreground">Growing businesses that need regular updates, new features, and marketing support.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Everything in Starter plus:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Up to 15 hours of work per month</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />New page creation and feature development</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Advanced SEO and Google Analytics setup</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Social media integration</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Email marketing campaign design</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Priority support (24-hour response)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="enterprise">
                    <AccordionTrigger className="text-xl font-semibold">Enterprise Package - $1,299/month</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Perfect for:</h4>
                        <p className="text-muted-foreground">Large businesses requiring extensive digital marketing support and custom development.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Everything in Growth plus:</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Up to 40 hours of work per month</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Custom application development</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />E-commerce functionality and management</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Advanced analytics and conversion tracking</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Monthly strategy consultations</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Dedicated account manager</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-success mr-2" />Same-day support response</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Important: 12-Month Commitment Required</h3>
                  <p className="text-muted-foreground mb-4">
                    All retainer packages require a 12-month commitment to ensure consistent service delivery 
                    and allow us to provide the best value. Monthly billing available.
                  </p>
                  <Link to="/solutions/web-design-as-a-service">
                    <Button>Get Retainer Quote</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 card-elevated">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our support team is here to help with any questions about our products and services.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Book a Call with Our Support Team
              </Button>
            </Link>
          </Card>
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

export default KnowledgeBase;