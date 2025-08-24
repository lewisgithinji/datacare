import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Landmark, Users, CheckCircle, MessageSquare, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Saccos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Landmark className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SACCO Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Digital transformation solutions for Savings and Credit Cooperative Organizations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book SACCO Demo</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Success Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SACCO Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SACCO Operational Challenges We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Call Volumes</h3>
              <p className="text-muted-foreground">Overwhelming member inquiries about loans, balances, and payments flooding your call center</p>
            </Card>
            <Card className="p-6 card-elevated">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Member Communication</h3>
              <p className="text-muted-foreground">Difficulty reaching members for payment reminders and important updates</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Landmark className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manual Processes</h3>
              <p className="text-muted-foreground">Time-consuming manual loan processing and member onboarding procedures</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Solutions for SACCOs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/ai-and-messaging-automation" className="text-primary hover:underline">
                  WhatsApp Automation for SACCOs
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Automate member communication, loan inquiries, and payment reminders via WhatsApp
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Automated balance inquiries</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Loan application processing</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Payment reminder system</li>
              </ul>
              <Link to="/solutions/ai-and-messaging-automation">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/cloud-and-licensing" className="text-primary hover:underline">
                  Cloud Infrastructure for SACCOs
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Secure cloud solutions for member data management and remote operations
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Secure member data storage</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Microsoft 365 for operations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Backup and disaster recovery</li>
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
            <h2 className="text-3xl font-bold mb-6 text-center">Success Story: Umoja SACCO</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Umoja SACCO with 5,000 members reduced call center load by 65% and improved member 
                satisfaction through our WhatsApp automation platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">65%</div>
                  <div className="text-muted-foreground">Reduction in calls</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">90%</div>
                  <div className="text-muted-foreground">Queries resolved instantly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20%</div>
                  <div className="text-muted-foreground">Increase in on-time payments</div>
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

      {/* Products Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Essential Products for SACCOs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/datacare-messaging-platform" className="text-primary hover:underline">
                  Datacare Messaging Platform
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                WhatsApp automation specifically designed for SACCO operations
              </p>
              <Link to="/products/datacare-messaging-platform">
                <Button variant="outline">Start Free Trial</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/cloud-backup-and-recovery" className="text-primary hover:underline">
                  Secure Member Data Backup
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Protect sensitive member data with enterprise-grade backup solutions
              </p>
              <Link to="/products/cloud-backup-and-recovery">
                <Button variant="outline">Get Quote</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Transform Your SACCO Operations</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            See how automation can reduce your workload and improve member satisfaction
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book SACCO Demo
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

export default Saccos;