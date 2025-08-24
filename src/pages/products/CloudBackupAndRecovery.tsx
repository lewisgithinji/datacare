import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Cloud, CheckCircle, Clock, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CloudBackupAndRecovery = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cloud Backup & Recovery</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Enterprise-grade backup solutions with instant recovery and 99.99% uptime guarantee
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Get Quote</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Solutions</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted Data Protection</h2>
            <p className="text-lg text-muted-foreground">Protecting critical business data across East Africa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15min</div>
              <div className="text-muted-foreground">Recovery Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <div className="text-muted-foreground">Data Loss Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Data Protection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automated Backup</h3>
              <p className="text-muted-foreground">Continuous data protection with zero intervention</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Cloud className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Cloud Storage</h3>
              <p className="text-muted-foreground">Redundant storage across multiple data centers</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Recovery</h3>
              <p className="text-muted-foreground">Restore files, databases, or entire systems quickly</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance Ready</h3>
              <p className="text-muted-foreground">Meet regulatory requirements and audit standards</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Backup Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Essential</h3>
              <div className="text-4xl font-bold text-primary mb-2">$49<span className="text-lg text-muted-foreground">/TB/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Daily automated backups</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />30-day retention</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic recovery tools</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated border-2 border-primary">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold text-primary mb-2">$99<span className="text-lg text-muted-foreground">/TB/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Continuous data protection</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />90-day retention</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Instant recovery</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />24/7 monitoring</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-primary mb-2">Custom<span className="text-lg text-muted-foreground"> pricing</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Everything in Professional</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Unlimited retention</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Disaster recovery</li>
              </ul>
              <Button className="w-full">Contact Sales</Button>
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

export default CloudBackupAndRecovery;