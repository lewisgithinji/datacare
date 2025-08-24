import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building, Users, CheckCircle, Star, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Microsoft365 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Building className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Microsoft 365</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Complete productivity suite with enterprise-grade security and collaboration tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Consultation</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Plans</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted Microsoft Partner</h2>
            <p className="text-lg text-muted-foreground">Certified expertise in Microsoft 365 deployment and management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Users Migrated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-muted-foreground">Migration Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Business Productivity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teams Collaboration</h3>
              <p className="text-muted-foreground">Video conferencing, chat, and file sharing</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Office Apps</h3>
              <p className="text-muted-foreground">Word, Excel, PowerPoint, and Outlook</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
              <p className="text-muted-foreground">OneDrive and SharePoint integration</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-muted-foreground">Enterprise-grade protection</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Microsoft 365 Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Business Basic</h3>
              <div className="text-4xl font-bold text-primary mb-2">$6<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Web versions of Office apps</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />1TB OneDrive storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Microsoft Teams</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated border-2 border-primary">
              <h3 className="text-2xl font-bold mb-2">Business Standard</h3>
              <div className="text-4xl font-bold text-primary mb-2">$12.50<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Desktop Office apps</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />1TB OneDrive storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Microsoft Teams</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />SharePoint</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Business Premium</h3>
              <div className="text-4xl font-bold text-primary mb-2">$22<span className="text-lg text-muted-foreground">/user/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Standard</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced security</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Device management</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Seamless Implementation</h2>
            <p className="text-lg text-muted-foreground">Expert migration and setup with minimal downtime</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Assessment</h3>
              <p className="text-muted-foreground">Evaluate current systems and plan migration strategy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Migration</h3>
              <p className="text-muted-foreground">Secure data transfer and user account setup</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Training</h3>
              <p className="text-muted-foreground">User training and ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How long does migration take?</h3>
              <p className="text-muted-foreground">Typical migrations complete within 24-48 hours with minimal disruption to your business operations.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is my data secure during migration?</h3>
              <p className="text-muted-foreground">Yes, we use encrypted channels and follow Microsoft's security best practices for all data transfers.</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What ongoing support is included?</h3>
              <p className="text-muted-foreground">We provide 24/7 technical support, regular updates, and user training as part of our service.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">Join thousands of businesses already using Microsoft 365</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">Start Free Trial</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <HeadphonesIcon className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Microsoft365;