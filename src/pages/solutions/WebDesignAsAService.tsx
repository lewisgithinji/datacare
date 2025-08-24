import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Palette, Zap, Users, TrendingUp, CheckCircle, Star, Shield, HeadphonesIcon, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const WebDesignAsAService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Palette className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Web Design as a Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Professional website design and maintenance with unlimited revisions, monthly retainer model, and 12-month commitment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Retainer Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Growing Businesses</h2>
            <p className="text-lg text-muted-foreground">Over 200+ websites delivered with ongoing support</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">72h</div>
              <div className="text-muted-foreground">Average turnaround time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support & monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Web Design Retainer?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Predictable costs, unlimited revisions, and ongoing support for your digital presence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
              <p className="text-muted-foreground">Responsive, fast-loading websites that convert</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unlimited Revisions</h3>
              <p className="text-muted-foreground">Make changes anytime with no additional costs</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dedicated Team</h3>
              <p className="text-muted-foreground">Your personal design and development team</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance Monitoring</h3>
              <p className="text-muted-foreground">Continuous optimization for speed and SEO</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Web Design Retainer Packages</h2>
            <p className="text-lg text-muted-foreground">Choose the perfect retainer for your business needs</p>
            <div className="mt-4 p-4 bg-warning/10 border border-warning rounded-lg max-w-lg mx-auto">
              <p className="text-warning-foreground text-sm font-medium">All packages include mandatory 12-month commitment</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold text-primary mb-2">$1,500<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">Perfect for small businesses</p>
                <div className="text-sm text-muted-foreground mt-2">12-month minimum ($18,000 total)</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />1 website design & development</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 5 pages</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Monthly content updates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic SEO optimization</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Mobile responsive design</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Hosting & SSL included</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email support</li>
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
                <div className="text-4xl font-bold text-primary mb-2">$3,500<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">For growing companies</p>
                <div className="text-sm text-muted-foreground mt-2">12-month minimum ($42,000 total)</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />2 websites or major redesign</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Up to 15 pages</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Weekly content updates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced SEO & analytics</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />E-commerce integration</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Performance optimization</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Priority support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Monthly strategy calls</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Enterprise Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">$7,500<span className="text-lg text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground">For large organizations</p>
                <div className="text-sm text-muted-foreground mt-2">12-month minimum ($90,000 total)</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Multiple websites/applications</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Unlimited pages</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Daily updates available</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom integrations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced analytics & reporting</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Dedicated project manager</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />24/7 support</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />White-label options</li>
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
            <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-lg text-muted-foreground">From concept to launch in 4 weeks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground">Brand analysis, competitor research, and goal definition</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-muted-foreground">Wireframes, mockups, and interactive prototypes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Develop</h3>
              <p className="text-muted-foreground">Responsive development with performance optimization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Deploy</h3>
              <p className="text-muted-foreground">Launch, testing, and ongoing optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What's Included in Datacare's Web Design Retainer Packages?</h2>
            <p className="text-lg text-muted-foreground">Comprehensive web solutions with transparent pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Monitor className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Starter Package</h3>
              <p className="text-muted-foreground">Basic website, hosting, SSL, mobile optimization, monthly updates, email support</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Growth Package</h3>
              <p className="text-muted-foreground">Everything in Starter plus e-commerce, advanced SEO, weekly updates, priority support, strategy calls</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Package</h3>
              <p className="text-muted-foreground">Everything in Growth plus custom integrations, dedicated manager, 24/7 support, unlimited revisions</p>
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
              <h3 className="text-xl font-semibold mb-2">Why is there a 12-month minimum commitment?</h3>
              <p className="text-muted-foreground">The 12-month commitment allows us to provide the best value and ensures we can invest in understanding your business deeply. This results in better designs, stronger relationships, and significant cost savings compared to project-based work.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens after the 12-month period?</h3>
              <p className="text-muted-foreground">After 12 months, you can continue on a month-to-month basis, upgrade/downgrade packages, or transition to project-based work. Most clients choose to continue the retainer for the ongoing value and support.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Are there truly unlimited revisions?</h3>
              <p className="text-muted-foreground">Yes, within reason. Unlimited revisions means you can request changes to your website's content, design elements, and functionality as needed. Major scope changes or additional websites would require package upgrades.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if I need to cancel before 12 months?</h3>
              <p className="text-muted-foreground">Early cancellation requires payment of the remaining months in the contract. We work with clients facing difficulties to find solutions, including package downgrades or payment plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join 200+ businesses with professional websites managed by our expert team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Retainer Quote
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              View Portfolio
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

export default WebDesignAsAService;