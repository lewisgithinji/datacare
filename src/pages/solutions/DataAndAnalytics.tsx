import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, Database, Eye, MessageCircle } from "lucide-react";

const DataAndAnalytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BarChart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Data & Analytics Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Turn business data into actionable insights with dashboards, reporting, and AI-driven analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Consultation
            </Button>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted Analytics Partner</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Helping East African businesses make data-driven decisions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Reports Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Decision Speed Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Analytics Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive data solutions for informed decision making
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Database className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Data Integration</h3>
              <p className="text-muted-foreground">
                Connect multiple data sources and create unified datasets for analysis.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <BarChart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Interactive Dashboards</h3>
              <p className="text-muted-foreground">
                Real-time dashboards with customizable KPIs and performance metrics.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                AI-powered forecasting and trend analysis for strategic planning.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Business Intelligence</h3>
              <p className="text-muted-foreground">
                Automated reporting and insights for operational excellence.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Analytics Packages</h2>
            <p className="text-lg text-muted-foreground">
              Choose the right analytics solution for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter Analytics</h3>
                <div className="text-3xl font-bold text-primary mb-2">$500</div>
                <div className="text-muted-foreground">/month</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Basic dashboards</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Monthly reports</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> 3 data sources</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Email support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-primary">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional Analytics</h3>
                <div className="text-3xl font-bold text-primary mb-2">$1,500</div>
                <div className="text-muted-foreground">/month</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Advanced dashboards</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Real-time reporting</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Unlimited data sources</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Predictive analytics</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Dedicated support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise Analytics</h3>
                <div className="text-3xl font-bold text-primary mb-2">Custom</div>
                <div className="text-muted-foreground">pricing</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Custom solutions</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> AI-powered insights</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> White-label options</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Training & onboarding</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> 24/7 priority support</li>
              </ul>
              <Button className="w-full">Contact Sales</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Sticky Action */}
      <div className="fixed bottom-6 left-6 z-40 lg:hidden">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default DataAndAnalytics;