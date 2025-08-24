import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, TrendingUp, CheckCircle, Users, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SMEsIndustry = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SME Solutions</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Affordable technology solutions designed specifically for small and medium enterprises
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Get SME Package</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Schedule Demo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SME Technology Challenges We Solve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 card-elevated">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Limited IT Budget</h3>
              <p className="text-muted-foreground">Affordable solutions that deliver enterprise-level capabilities without breaking the bank</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">No IT Staff</h3>
              <p className="text-muted-foreground">Fully managed services with 24/7 support so you can focus on growing your business</p>
            </Card>
            <Card className="p-6 card-elevated">
              <Building2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scaling Issues</h3>
              <p className="text-muted-foreground">Cloud solutions that grow with your business without massive upfront investments</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recommended Solutions for SMEs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/sme-digital-transformation" className="text-primary hover:underline">
                  SME Digital Transformation
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete digital makeover including cloud migration, productivity tools, and automation
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Microsoft 365 or Google Workspace</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Cloud backup and security</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Business process automation</li>
              </ul>
              <Link to="/solutions/sme-digital-transformation">
                <Button>Learn More</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/solutions/web-design-as-a-service" className="text-primary hover:underline">
                  Professional Website Package
                </Link>
              </h3>
              <p className="text-muted-foreground mb-6">
                Monthly retainer for website design, maintenance, and digital marketing support
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Modern responsive website</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Monthly updates and maintenance</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />SEO optimization</li>
              </ul>
              <Link to="/solutions/web-design-as-a-service">
                <Button>Get Quote</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Essential Products for SMEs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/microsoft-365" className="text-primary hover:underline">
                  Microsoft 365 Business
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Complete productivity suite starting at $6/user/month
              </p>
              <Link to="/products/microsoft-365">
                <Button variant="outline">View Plans</Button>
              </Link>
            </Card>
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold mb-4">
                <Link to="/products/datacare-messaging-platform" className="text-primary hover:underline">
                  WhatsApp Business Automation
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Automate customer service and marketing via WhatsApp
              </p>
              <Link to="/products/datacare-messaging-platform">
                <Button variant="outline">Start Trial</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your SME?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Get a custom technology roadmap designed for your business size and budget
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Free Consultation
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

export default SMEsIndustry;