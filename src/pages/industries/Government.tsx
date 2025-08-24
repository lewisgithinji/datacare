import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building, Shield, CheckCircle, Users, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Government = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Government Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Secure, compliant technology solutions for government agencies and public sector organizations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Request Procurement Package</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Compliance</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Government Requirements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Government Compliance & Security Requirements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Residency</h3>
              <p className="text-muted-foreground">All government data stored within Kenya with full sovereignty and control</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Building className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Procurement Readiness</h3>
              <p className="text-muted-foreground">Pre-qualified vendor with all necessary certifications for government procurement</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security Controls</h3>
              <p className="text-muted-foreground">Enterprise-grade security meeting government standards and audit requirements</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Government-Ready Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/security-and-compliance" className="text-primary hover:underline">
                  Government Security Package
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive security and compliance solution meeting government standards
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Data encryption and access controls</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Audit logging and compliance reporting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Local data residency guaranteed</li>
              </ul>
              <Link to="/solutions/security-and-compliance">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/cloud-and-licensing" className="text-primary hover:underline">
                  Government Cloud Infrastructure
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Secure cloud platform with government-specific configurations and controls
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Microsoft 365 Government</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Advanced threat protection</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Multi-factor authentication</li>
              </ul>
              <Link to="/solutions/cloud-and-licensing">
                <Button>Request Quote</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Government Compliance Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ISO 27001 Certified</h3>
              <p className="text-sm text-muted-foreground">International security management standards</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Local Data Centers</h3>
              <p className="text-sm text-muted-foreground">Kenya-based infrastructure</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Monitoring</h3>
              <p className="text-sm text-muted-foreground">Continuous security monitoring</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Audit Ready</h3>
              <p className="text-sm text-muted-foreground">Complete compliance documentation</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Procurement Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Procurement-Ready Solutions</h2>
            <p className="text-lg text-muted-foreground">Flexible contract terms and transparent pricing for government procurement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated text-center">
              <h3 className="text-2xl font-bold mb-4">12-Month Contracts</h3>
              <p className="text-muted-foreground mb-4">Standard annual contracts with budget-friendly terms</p>
              <Button variant="outline">Get Pricing</Button>
            </Card>
            <Card className="p-8 card-elevated text-center border-2 border-primary">
              <h3 className="text-2xl font-bold mb-4">24-Month Contracts</h3>
              <p className="text-muted-foreground mb-4">Preferred terms with additional cost savings</p>
              <Button>Request Proposal</Button>
            </Card>
            <Card className="p-8 card-elevated text-center">
              <h3 className="text-2xl font-bold mb-4">36-Month Contracts</h3>
              <p className="text-muted-foreground mb-4">Long-term partnership with maximum value</p>
              <Button variant="outline">Contact Sales</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Support & Training Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Onboarding & Training for Government</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">Comprehensive Training Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Administrator training sessions</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />End-user adoption workshops</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Security awareness training</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Ongoing support and refresher sessions</li>
              </ul>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Dedicated government account manager</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Priority technical support queue</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />On-site support when needed</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Quarterly business reviews</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Government Procurement?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Request a complete procurement package with technical specifications and pricing
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Request Procurement Package
            </Button>
          </Link>
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

export default Government;