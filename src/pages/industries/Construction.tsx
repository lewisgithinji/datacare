import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Hammer, Shield, CheckCircle, Users, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Construction = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Hammer className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Construction Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Rugged, reliable technology solutions designed for construction and field operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Book Construction Demo</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">View Field Solutions</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Construction Industry Challenges We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Remote Team Coordination</h3>
              <p className="text-muted-foreground">Manage distributed teams across multiple job sites with real-time communication tools</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Management</h3>
              <p className="text-muted-foreground">Access blueprints, permits, and project files from any location, even offline</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Hammer className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Field Communication</h3>
              <p className="text-muted-foreground">Keep field teams connected with headquarters and clients despite poor connectivity</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Solutions for Construction</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/cloud-and-licensing" className="text-primary hover:underline">
                  Field-Ready Cloud Platform
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Microsoft 365 with offline capabilities and mobile-first design for construction teams
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Mobile-optimized Office apps</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Offline document access</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Real-time project collaboration</li>
              </ul>
              <Link to="/solutions/cloud-and-licensing">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/ai-and-messaging-automation" className="text-primary hover:underline">
                  Construction Communication Hub
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                WhatsApp-based communication system for site updates, safety alerts, and progress reporting
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Site progress updates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Safety alert broadcasting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Client project updates</li>
              </ul>
              <Link to="/solutions/ai-and-messaging-automation">
                <Button>Get Demo</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Essential Products for Construction</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/microsoft-365" className="text-primary hover:underline">
                  Microsoft 365 for Construction
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Field-optimized productivity suite with offline capabilities
              </p>
              <Link to="/products/microsoft-365">
                <Button variant="outline">View Construction Plans</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/cloud-backup-and-recovery" className="text-primary hover:underline">
                  Project Data Protection
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Secure backup for critical project files, blueprints, and documentation
              </p>
              <Link to="/products/cloud-backup-and-recovery">
                <Button variant="outline">Protect Project Data</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Benefits for Construction Companies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Hammer className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Improved Efficiency</div>
              <div className="text-muted-foreground">Streamlined project management and communication</div>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Better Safety</div>
              <div className="text-muted-foreground">Real-time safety alerts and incident reporting</div>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">Enhanced Collaboration</div>
              <div className="text-muted-foreground">Seamless communication between field and office teams</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Build Smarter with Technology</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Discover how our construction-specific solutions can improve your project outcomes
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Schedule Construction Demo
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

export default Construction;