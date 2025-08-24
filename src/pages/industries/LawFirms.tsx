import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Scale, Shield, CheckCircle, FileText, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LawFirms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Scale className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Law Firm Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Secure, compliant technology solutions designed specifically for legal practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Legal Tech Demo</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Case Study</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Requirements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Legal Industry Requirements We Address</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client Confidentiality</h3>
              <p className="text-muted-foreground">End-to-end encryption and secure access controls to protect sensitive client information</p>
            </Card>
            <Card className="p-6 card-elevated">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Management</h3>
              <p className="text-muted-foreground">Secure cloud storage with version control and instant access to case files</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Scale className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance & Audit</h3>
              <p className="text-muted-foreground">Audit trails and compliance features to meet legal industry standards</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Solutions for Law Firms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/security-and-compliance" className="text-primary hover:underline">
                  Legal Compliance Package
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive security and compliance solution for legal practices
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Data encryption and access controls</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Compliance monitoring and reporting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Secure client communication</li>
              </ul>
              <Link to="/solutions/security-and-compliance">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/cloud-and-licensing" className="text-primary hover:underline">
                  Cloud Migration for Legal
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Secure cloud infrastructure with legal-specific configurations
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Microsoft 365 with legal compliance</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />SharePoint document management</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Secure remote access</li>
              </ul>
              <Link to="/solutions/cloud-and-licensing">
                <Button>Get Quote</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 card-elevated">
            <h2 className="text-3xl font-bold mb-6 text-center">Success Story: Advocates & Associates</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                A 25-lawyer firm in Nairobi transformed their practice with our Microsoft 365 solution, 
                achieving 40% faster file sharing and enabling full remote work capability during the pandemic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <div className="text-muted-foreground">Faster collaboration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-muted-foreground">Downtime incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">60%</div>
                  <div className="text-muted-foreground">Faster client response</div>
                </div>
              </div>
              <div className="text-center">
                <Link to="/resources/case-studies">
                  <Button variant="outline">Read Full Case Study</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Modernize Your Legal Practice</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Book a consultation to see how we can transform your firm's technology infrastructure
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Schedule Legal Tech Demo
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

export default LawFirms;