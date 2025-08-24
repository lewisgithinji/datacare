import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Download, CheckCircle, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Guides = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Free Business Guides</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Expert insights and practical guides to accelerate your digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Guide 1: SME Digital Transformation */}
            <Card className="p-8 card-elevated">
              <div className="mb-6">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-2">SME Digital Transformation in East Africa – 2025 Playbook</h2>
                <p className="text-lg text-muted-foreground">A comprehensive 5-step guide for SME modernization</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground">
                  This 45-page playbook provides a practical roadmap for small and medium enterprises 
                  in East Africa to successfully navigate digital transformation. Learn from real case 
                  studies and avoid common pitfalls.
                </p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">What's Inside:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />5-step digital transformation framework</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Technology stack recommendations by business size</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Budget planning templates and ROI calculators</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Change management strategies for SMEs</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Real case studies from Kenya, Uganda, and Tanzania</li>
                  </ul>
                </div>
              </div>

              {/* Download Form */}
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Download Free Guide</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name1">Full Name *</Label>
                      <Input id="name1" placeholder="Enter your name" required />
                    </div>
                    <div>
                      <Label htmlFor="email1">Email Address *</Label>
                      <Input id="email1" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company1">Company Name *</Label>
                      <Input id="company1" placeholder="Enter company name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone1">Phone Number</Label>
                      <Input id="phone1" placeholder="Enter phone number" />
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download SME Transformation Guide
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  After downloading, schedule a consultation to discuss your transformation plan with our experts.
                </p>
              </div>
            </Card>

            {/* Guide 2: WhatsApp & AI Automation */}
            <Card className="p-8 card-elevated">
              <div className="mb-6">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-2">How to Automate Customer Engagement with WhatsApp & AI</h2>
                <p className="text-lg text-muted-foreground">Best practices and pitfalls to avoid in messaging automation</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground">
                  This detailed whitepaper reveals how businesses across East Africa are using WhatsApp 
                  automation to reduce support costs by 65% while improving customer satisfaction. 
                  Learn the proven strategies and avoid costly mistakes.
                </p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">What's Inside:</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />WhatsApp Business API setup and optimization</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />AI chatbot design principles for African markets</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Workflow templates for common use cases</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Compliance and privacy considerations</li>
                    <li className="flex items-center text-sm"><CheckCircle className="w-4 h-4 text-success mr-2" />Performance metrics and optimization strategies</li>
                  </ul>
                </div>
              </div>

              {/* Download Form */}
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Download Free Guide</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name2">Full Name *</Label>
                      <Input id="name2" placeholder="Enter your name" required />
                    </div>
                    <div>
                      <Label htmlFor="email2">Email Address *</Label>
                      <Input id="email2" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company2">Company Name *</Label>
                      <Input id="company2" placeholder="Enter company name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone2">Phone Number</Label>
                      <Input id="phone2" placeholder="Enter phone number" />
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download WhatsApp Automation Guide
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Ready to implement? Book a demo of Datacare's Messaging Platform after downloading.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Implement These Strategies?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Book a consultation to discuss how these frameworks apply to your specific business
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Schedule Strategy Session
            </Button>
          </Link>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 card-elevated">
              <h3 className="text-xl font-bold mb-2">
                <Link to="/resources/case-studies" className="text-primary hover:underline">
                  Client Success Stories
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Read detailed case studies showing real results from digital transformation projects
              </p>
              <Link to="/resources/case-studies">
                <Button variant="outline">View Case Studies</Button>
              </Link>
            </Card>
            <Card className="p-6 card-elevated">
              <h3 className="text-xl font-bold mb-2">
                <Link to="/resources/knowledge-base" className="text-primary hover:underline">
                  Knowledge Base
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Find answers to common questions about our products and services
              </p>
              <Link to="/resources/knowledge-base">
                <Button variant="outline">Browse Articles</Button>
              </Link>
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

export default Guides;