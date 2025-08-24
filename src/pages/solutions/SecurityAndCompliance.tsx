import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Star, Users, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SecurityAndCompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Shield className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Comprehensive cybersecurity and regulatory compliance solutions to protect your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Security Audit
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Compliance Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted Security Partner</h2>
            <p className="text-lg text-muted-foreground">Protecting businesses with enterprise-grade security</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-muted-foreground">Threat detection rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Security monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Zero</div>
              <div className="text-muted-foreground">Successful breaches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Security Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Multi-layered security approach with compliance frameworks tailored for your industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
              <p className="text-muted-foreground">End-to-end encryption and secure data storage</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Threat Monitoring</h3>
              <p className="text-muted-foreground">24/7 SOC with AI-powered threat detection</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Incident Response</h3>
              <p className="text-muted-foreground">Rapid response team for security incidents</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance Management</h3>
              <p className="text-muted-foreground">Automated compliance reporting and auditing</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Security & Compliance Packages</h2>
            <p className="text-lg text-muted-foreground">Choose the right level of protection for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essential Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Essential</h3>
                <div className="text-4xl font-bold text-primary mb-2">$500<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Basic security for small businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Firewall management</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Antivirus protection</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email security</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic compliance reporting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Monthly security updates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Professional Package */}
            <Card className="p-8 card-elevated border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" /> Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold text-primary mb-2">$1,500<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Advanced security for growing companies</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Essential</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />24/7 threat monitoring</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />SIEM integration</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Vulnerability assessments</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Incident response</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Staff security training</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Priority support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Enterprise Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <p className="text-muted-foreground">Enterprise-grade security</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Professional</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Dedicated SOC analyst</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom compliance frameworks</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Penetration testing</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced threat hunting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Executive security briefings</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />24/7 dedicated support</li>
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
            <h2 className="text-4xl font-bold mb-4">Security Implementation Process</h2>
            <p className="text-lg text-muted-foreground">Systematic approach to securing your organization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Security Assessment</h3>
              <p className="text-muted-foreground">Comprehensive audit of current security posture</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Risk Analysis</h3>
              <p className="text-muted-foreground">Identify vulnerabilities and threat vectors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Security Deployment</h3>
              <p className="text-muted-foreground">Implement security controls and monitoring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Continuous Monitoring</h3>
              <p className="text-muted-foreground">24/7 monitoring and incident response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Compliance Frameworks We Support</h2>
            <p className="text-lg text-muted-foreground">Comprehensive compliance management across industries</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ISO 27001</h3>
              <p className="text-muted-foreground">International security management standard</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">GDPR</h3>
              <p className="text-muted-foreground">European data protection regulation</p>
            </div>
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">SOC 2</h3>
              <p className="text-muted-foreground">Service organization controls</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Regulations</h3>
              <p className="text-muted-foreground">East African data protection laws</p>
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
              <h3 className="text-xl font-semibold mb-2">How quickly can you respond to security incidents?</h3>
              <p className="text-muted-foreground">Our SOC team provides 24/7 monitoring with immediate response to critical threats. Average response time is under 15 minutes for high-priority incidents, with full incident response within 1 hour.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you help with compliance audits?</h3>
              <p className="text-muted-foreground">Yes! We provide comprehensive audit support including documentation preparation, gap analysis, remediation planning, and audit coordination. Our compliance experts guide you through the entire process.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens if we experience a security breach?</h3>
              <p className="text-muted-foreground">Our incident response team immediately contains the threat, conducts forensic analysis, provides remediation steps, and helps with regulatory notifications. We also provide post-incident support to strengthen your security posture.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can you integrate with our existing security tools?</h3>
              <p className="text-muted-foreground">Absolutely. We work with existing security infrastructure and can integrate with most SIEM, firewall, and endpoint protection solutions. Our goal is to enhance your current setup, not replace everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Protect Your Business Today</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Don't wait for a security incident. Secure your business with enterprise-grade protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Security Audit
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Download Security Guide
            </Button>
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

export default SecurityAndCompliance;