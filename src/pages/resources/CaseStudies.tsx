import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building, TrendingUp, Users, CheckCircle, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Client Success Stories</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Real results from businesses that transformed with Datacare solutions
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Case Study 1: Law Firm */}
            <Card className="p-8 card-elevated">
              <div className="mb-6">
                <Building className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-2">Transforming a Law Firm with Microsoft 365</h2>
                <p className="text-lg text-muted-foreground">How Advocates & Associates modernized their practice</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-destructive">Challenge</h3>
                  <p className="text-muted-foreground">
                    Advocates & Associates, a 25-lawyer firm in Nairobi, struggled with outdated email systems, 
                    inefficient document sharing, and security concerns. Client files were stored locally, 
                    making remote work impossible and collaboration difficult.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                  <p className="text-muted-foreground">
                    We implemented Microsoft 365 Business Premium with SharePoint for document management, 
                    Teams for client communication, and advanced security features. Migrated all email 
                    and files to the cloud with comprehensive staff training.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-success">Outcome</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>40% faster file sharing and collaboration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>Zero downtime since migration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>60% improvement in client response times</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>Full remote work capability enabled</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <blockquote className="italic text-muted-foreground">
                  "The transformation has been remarkable. We can now serve clients more efficiently 
                  and our lawyers can work from anywhere securely. The ROI was evident within 3 months."
                </blockquote>
                <p className="text-sm font-semibold mt-2">- Managing Partner, Advocates & Associates</p>
              </div>
            </Card>

            {/* Case Study 2: SACCO */}
            <Card className="p-8 card-elevated">
              <div className="mb-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-2">SACCO Growth Through Messaging Automation</h2>
                <p className="text-lg text-muted-foreground">How Umoja SACCO improved member engagement</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-destructive">Challenge</h3>
                  <p className="text-muted-foreground">
                    Umoja SACCO with 5,000 members faced overwhelming call volumes for loan inquiries, 
                    payment reminders, and balance checks. Staff spent 80% of time on routine queries, 
                    leading to delays in loan processing and member dissatisfaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Solution</h3>
                  <p className="text-muted-foreground">
                    Implemented our AI messaging automation platform with WhatsApp integration. 
                    Created automated workflows for loan applications, payment reminders, balance 
                    inquiries, and member onboarding with seamless human handoff for complex issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-success">Outcome</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>65% reduction in call center load</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>20% increase in on-time loan repayments</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>90% of queries resolved instantly</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3" />
                      <span>50% faster loan application processing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <blockquote className="italic text-muted-foreground">
                  "Our members love the instant responses. Staff can now focus on complex financial 
                  advisory services instead of routine inquiries. Member satisfaction has increased significantly."
                </blockquote>
                <p className="text-sm font-semibold mt-2">- CEO, Umoja SACCO</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Results Across Industries</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <div className="text-muted-foreground">Average productivity increase</div>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime achieved</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">65%</div>
              <div className="text-muted-foreground">Reduction in support calls</div>
            </div>
            <div className="text-center">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">30%</div>
              <div className="text-muted-foreground">Cost savings achieved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Achieve Similar Results?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Book a consultation to discover how we can transform your business
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book a Consultation
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

export default CaseStudies;