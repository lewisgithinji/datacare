import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, Shield, Database, Users, TrendingUp, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Banking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Landmark className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Banking & Finance Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, compliant IT infrastructure for banks, SACCOs, and financial institutions.
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Financial Services Solutions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Meet CBK, PCI-DSS, and international banking standards with our compliance frameworks.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <Database className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Core Banking Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Modern banking platforms with real-time processing and customer management.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Cybersecurity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced threat protection and fraud detection for financial transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Customer Portals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure online banking and mobile apps with enhanced user experience.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Financial Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Business intelligence and reporting tools for data-driven decision making.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Secure Your Financial Institution's Future
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Partner with us to build robust, compliant, and customer-focused banking technology.
          </p>
          <Button asChild size="lg" className="btn-primary">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Banking;