import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Rocket, Building, Users, TrendingUp, CheckCircle, Star, Shield, HeadphonesIcon, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SMEDigitalTransformation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-accent-light" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              SME Digital Transformation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Complete digital modernization for Small and Medium Enterprises across East Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Download 2025 Playbook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transforming SMEs Across East Africa</h2>
            <p className="text-lg text-muted-foreground">Proven results from digital transformation initiatives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-muted-foreground">SMEs Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <div className="text-muted-foreground">Average productivity increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-muted-foreground">Cost reduction achieved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">5 Steps to Digital Modernization</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our proven framework for SME digital transformation in East Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center card-elevated">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Assessment</h3>
              <p className="text-muted-foreground">Comprehensive audit of current systems and processes</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Training</h3>
              <p className="text-muted-foreground">Skill development and change management support</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Technology Integration</h3>
              <p className="text-muted-foreground">Modern tools and platforms implementation</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Process Optimization</h3>
              <p className="text-muted-foreground">Streamlined workflows and automation</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
              <p className="text-muted-foreground">Data protection and regulatory compliance</p>
            </Card>
            <Card className="p-6 text-center card-elevated">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Growth Acceleration</h3>
              <p className="text-muted-foreground">Digital marketing and expansion strategies</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Digital Transformation Packages</h2>
            <p className="text-lg text-muted-foreground">Tailored solutions for different business sizes and needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Foundation Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Foundation</h3>
                <div className="text-4xl font-bold text-primary mb-2">$5,000<span className="text-lg text-muted-foreground">/project</span></div>
                <p className="text-muted-foreground">For micro enterprises (1-10 employees)</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Digital readiness assessment</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic cloud setup</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Email & productivity tools</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Basic website setup</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Staff training (8 hours)</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />3 months support</li>
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
                <div className="text-4xl font-bold text-primary mb-2">$15,000<span className="text-lg text-muted-foreground">/project</span></div>
                <p className="text-muted-foreground">For small businesses (11-50 employees)</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Complete digital audit</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced cloud infrastructure</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Business process automation</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Professional website & e-commerce</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Digital marketing setup</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Comprehensive training (24 hours)</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />6 months support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </Card>

            {/* Enterprise Package */}
            <Card className="p-8 card-elevated">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">$35,000<span className="text-lg text-muted-foreground">/project</span></div>
                <p className="text-muted-foreground">For medium enterprises (51+ employees)</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Enterprise-grade digital strategy</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Custom system integrations</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Advanced analytics & BI</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Multi-platform presence</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Change management program</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />Executive training (40 hours)</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-3" />12 months support</li>
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
            <h2 className="text-4xl font-bold mb-4">Our Implementation Methodology</h2>
            <p className="text-lg text-muted-foreground">Proven 90-day transformation process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Assess (Days 1-15)</h3>
              <p className="text-muted-foreground">Current state analysis and digital maturity evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Plan (Days 16-30)</h3>
              <p className="text-muted-foreground">Digital roadmap and implementation strategy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Execute (Days 31-75)</h3>
              <p className="text-muted-foreground">Technology deployment and process optimization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Optimize (Days 76-90)</h3>
              <p className="text-muted-foreground">Fine-tuning and knowledge transfer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for East African SMEs</h2>
            <p className="text-lg text-muted-foreground">Compliant with local regulations and business practices</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Compliance</h3>
              <p className="text-muted-foreground">Adherence to East African data protection laws</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Banking Integration</h3>
              <p className="text-muted-foreground">Mobile money and local payment systems</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-language Support</h3>
              <p className="text-muted-foreground">English, Swahili, and local language options</p>
            </div>
            <div className="text-center">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Infrastructure</h3>
              <p className="text-muted-foreground">Optimized for regional internet and power challenges</p>
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
              <h3 className="text-xl font-semibold mb-2">How long does a typical digital transformation take?</h3>
              <p className="text-muted-foreground">Our standard transformation process takes 90 days from start to finish. This includes assessment, planning, implementation, and optimization phases with continuous support throughout.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if my team isn't tech-savvy?</h3>
              <p className="text-muted-foreground">We specialize in working with traditional businesses. Our comprehensive training programs and change management support ensure your team feels confident with new technologies.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can you work with our existing systems?</h3>
              <p className="text-muted-foreground">Yes! We assess your current systems and integrate new solutions where possible. Our goal is to enhance what works while upgrading what doesn't.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is this suitable for traditional businesses like retail or manufacturing?</h3>
              <p className="text-muted-foreground">Absolutely. We've successfully transformed businesses across all sectors including retail, manufacturing, agriculture, and services. Our approach adapts to your specific industry needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join 300+ SMEs that have successfully modernized with our digital transformation expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Consultation
              </Button>
            </Link>
            <Link to="/resources/guides">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Download 2025 Playbook
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

export default SMEDigitalTransformation;