import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Building,
  MessageSquare,
  Shield,
  Cloud,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Globe,
  Zap,
  TrendingUp,
  Award,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    {
      id: "microsoft365",
      name: "Microsoft 365",
      tagline: "Complete Productivity Suite",
      description: "Enterprise-grade productivity platform with Office apps, Teams collaboration, OneDrive storage, and advanced security features.",
      icon: Building,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      popular: true,
      features: [
        "Word, Excel, PowerPoint, Outlook",
        "Microsoft Teams collaboration",
        "1TB OneDrive cloud storage per user",
        "Advanced threat protection",
        "Mobile apps for iOS & Android",
        "24/7 Microsoft support"
      ],
      pricing: {
        starting: "$6",
        plans: "3 plans available"
      },
      stats: {
        users: "1000+ users migrated",
        uptime: "99.9% uptime",
        time: "24h migration"
      },
      link: "/products/microsoft-365",
      cta: "View Plans & Pricing"
    },
    {
      id: "google-workspace",
      name: "Google Workspace",
      tagline: "AI-Powered Collaboration",
      description: "Modern cloud-based productivity platform with Gmail, Drive, Meet, and intelligent AI features for seamless team collaboration.",
      icon: Globe,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      popular: false,
      features: [
        "Professional Gmail & Calendar",
        "Google Meet video conferencing",
        "Up to 5TB cloud storage",
        "Real-time document collaboration",
        "AI-powered Smart Compose",
        "Google Chat & Spaces"
      ],
      pricing: {
        starting: "$6",
        plans: "3 plans available"
      },
      stats: {
        users: "800+ users migrated",
        uptime: "99.8% uptime",
        time: "12h migration"
      },
      link: "/products/google-workspace",
      cta: "View Plans & Pricing"
    },
    {
      id: "messaging-platform",
      name: "Datacare Messaging Platform",
      tagline: "WhatsApp Automation & AI",
      description: "Official WhatsApp Business API platform with AI-powered chatbots, workflow automation, and advanced analytics for customer engagement.",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      popular: true,
      features: [
        "WhatsApp Business API integration",
        "AI-powered chatbot automation",
        "Custom workflow builder",
        "Real-time analytics dashboard",
        "Multi-agent support",
        "API integrations (CRM, ERP)"
      ],
      pricing: {
        starting: "$99",
        plans: "3 plans available"
      },
      stats: {
        reduction: "65% support call reduction",
        automation: "90% queries automated",
        support: "24/7 availability"
      },
      link: "/products/datacare-messaging-platform",
      cta: "Book Demo"
    },
    {
      id: "cloud-backup",
      name: "Cloud Backup & Recovery",
      tagline: "Enterprise Data Protection",
      description: "Next-generation cloud backup solution with automated continuous protection, instant recovery, and 99.99% uptime guarantee.",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      popular: false,
      features: [
        "Automated continuous backup",
        "15-minute recovery time objective",
        "Multi-cloud redundant storage",
        "Ransomware protection",
        "KDPA compliance ready",
        "Zero data loss incidents"
      ],
      pricing: {
        starting: "$49",
        plans: "Per TB/month"
      },
      stats: {
        uptime: "99.99% guaranteed",
        recovery: "15min recovery",
        incidents: "0 data loss"
      },
      link: "/products/cloud-backup-and-recovery",
      cta: "Get Quote"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Certified Partners",
      description: "Official Microsoft & Google partners with certified expertise"
    },
    {
      icon: Users,
      title: "1800+ Users Served",
      description: "Trusted by businesses across East Africa"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Most migrations complete within 24-48 hours"
    },
    {
      icon: TrendingUp,
      title: "99%+ Uptime SLA",
      description: "Enterprise-grade reliability guarantee"
    }
  ];

  const testimonials = [
    {
      quote: "Migration to Microsoft 365 was seamless. Datacare handled everything from planning to training. Zero downtime.",
      author: "IT Manager",
      company: "Leading Kenyan Law Firm",
      product: "Microsoft 365"
    },
    {
      quote: "The WhatsApp automation reduced our support calls by 65%. Customers love the instant responses.",
      author: "Customer Service Director",
      company: "Financial Services SACCO",
      product: "Messaging Platform"
    },
    {
      quote: "Cloud backup saved us from a ransomware attack. Recovery took 15 minutes. Priceless.",
      author: "Managing Director",
      company: "Import/Export Company",
      product: "Cloud Backup"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Products - Microsoft 365, Google Workspace & More | Datacare Limited"
        description="Explore Datacare's products: Microsoft 365, Google Workspace, WhatsApp Business API Messaging Platform, and Cloud Backup solutions for businesses in Kenya."
        keywords="Microsoft 365 Kenya, Google Workspace Kenya, WhatsApp Business API, cloud backup Kenya, business productivity tools, enterprise software Kenya"
        url="https://datacare.co.ke/products"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Cloud className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Enterprise Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Cloud-Powered</span><br />
              Business Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive suite of enterprise-grade productivity, collaboration, and security products
              designed to transform how East African businesses work
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Core Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">1800+</div>
                <div className="text-sm text-muted-foreground">Users Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card
                  key={product.id}
                  className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                    product.popular ? 'ring-2 ring-primary/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-orange-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Header with Icon */}
                  <div className={`p-8 ${product.bgColor} border-b border-border`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="text-sm font-semibold text-primary mb-3">{product.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <h3 className="font-semibold text-lg mb-4">Key Features:</h3>
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-success mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stats */}
                    <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        {Object.entries(product.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="font-bold text-primary mb-1">{value}</div>
                            <div className="text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Starting from</div>
                        <div className="text-2xl font-bold text-primary">
                          {product.pricing.starting}
                          <span className="text-sm text-muted-foreground font-normal">/{product.pricing.plans}</span>
                        </div>
                      </div>
                      <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                        <Link to={product.link}>
                          {product.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Datacare */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose <span className="gradient-text">Datacare</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by businesses across East Africa for enterprise product deployment and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="p-6 text-center hover:shadow-lg transition-all group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by <span className="gradient-text">Leading Organizations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from businesses that transformed with our products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.company}
                className="p-6 hover:shadow-xl transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-start justify-between pt-4 border-t border-border">
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.product}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Product <span className="gradient-text">Comparison</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare our products to find the right solution for your business needs
            </p>
          </div>

          <Card className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Microsoft 365</th>
                  <th className="p-4 text-center font-semibold">Google Workspace</th>
                  <th className="p-4 text-center font-semibold">Messaging Platform</th>
                  <th className="p-4 text-center font-semibold">Cloud Backup</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Email & Calendar</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border bg-muted/20">
                  <td className="p-4 font-medium">Office Apps</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Cloud Storage</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border bg-muted/20">
                  <td className="p-4 font-medium">Video Conferencing</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">WhatsApp Automation</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border bg-muted/20">
                  <td className="p-4 font-medium">AI Chatbots</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium">Automated Backup</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-4 font-medium">Disaster Recovery</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center text-muted-foreground">—</td>
                  <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Learn <span className="gradient-text">More</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our resources to make informed decisions about your business technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Case Studies
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                See how businesses transformed with Microsoft 365, WhatsApp automation, and cloud backup
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources/case-studies">
                  Read Success Stories
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Knowledge Base
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                In-depth guides on Microsoft 365 plans, WhatsApp security, and KDPA compliance
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources/knowledge-base">
                  Browse Articles
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Free Consultation
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Speak with our experts to find the right product combination for your needs
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-accent">
                <Link to="/contact">
                  Schedule Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get expert guidance on choosing and implementing the right products for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/resources/knowledge-base">
                Explore Knowledge Base
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
