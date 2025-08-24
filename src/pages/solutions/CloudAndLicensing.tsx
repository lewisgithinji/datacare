import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Cloud, Shield, Users, Zap, CheckCircle, Star, Lock, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CloudAndLicensing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Cloud className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cloud & Licensing Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Streamline your software management and cloud infrastructure with enterprise-grade licensing and cloud solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Organizations</h2>
            <p className="text-lg text-muted-foreground">Over 500+ businesses rely on our cloud and licensing expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Expert Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30%</div>
              <div className="text-muted-foreground">Average Cost Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Cloud & Licensing Solutions?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive cloud management and software licensing that scales with your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">Bank-grade security with compliance certifications</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-muted-foreground">Grow from 5 to 5000+ users seamlessly</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Deployment</h3>
              <p className="text-muted-foreground">Go live in 24-48 hours with expert setup</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">License Optimization</h3>
              <p className="text-muted-foreground">Save 20-40% on software licensing costs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-lg text-muted-foreground">Flexible options to meet your organization's needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold text-primary mb-2">$99<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Perfect for small teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 25 users</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic cloud storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />License management</li>
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
                <div className="text-4xl font-bold text-primary mb-2">$299<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">For growing businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 100 users</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced cloud features</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Priority support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced analytics</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Backup & recovery</li>
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
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Unlimited users</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom integrations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Dedicated support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />SLA guarantees</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />On-premise options</li>
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
            <h2 className="text-4xl font-bold mb-4">Seamless Implementation</h2>
            <p className="text-lg text-muted-foreground">Our proven process ensures smooth deployment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Assessment</h3>
              <p className="text-muted-foreground">Analyze your current infrastructure and requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Planning</h3>
              <p className="text-muted-foreground">Design custom solution and migration strategy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Deployment</h3>
              <p className="text-muted-foreground">Execute migration with minimal downtime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground">Ongoing monitoring and optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-lg text-muted-foreground">Your data protection is our top priority</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ISO 27001</h3>
              <p className="text-muted-foreground">Certified information security management</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">SOC 2 Type II</h3>
              <p className="text-muted-foreground">Audited security controls and compliance</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-muted-foreground">Full data protection compliance</p>
            </div>
            <div className="text-center">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground">256-bit encryption at rest and in transit</p>
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
              <h3 className="text-xl font-semibold mb-2">How quickly can we migrate to the cloud?</h3>
              <p className="text-muted-foreground">Most migrations are completed within 2-4 weeks, depending on your data volume and complexity. We provide 24/7 support during the transition.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can you help optimize our existing licenses?</h3>
              <p className="text-muted-foreground">Yes! Our license optimization service typically saves businesses 20-40% on software costs by right-sizing subscriptions and eliminating unused licenses.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens if we need to scale quickly?</h3>
              <p className="text-muted-foreground">Our cloud solutions are designed for instant scalability. Add users, storage, or features within minutes through our management portal.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you provide training for our team?</h3>
              <p className="text-muted-foreground">All packages include comprehensive training sessions, documentation, and ongoing support to ensure your team maximizes the platform's potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Cloud Infrastructure?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join 500+ businesses that trust Datacare with their cloud and licensing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book Consultation
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Get Retainer Quote
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

export default CloudAndLicensing;