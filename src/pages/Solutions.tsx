import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Cloud,
  MessageSquare,
  Palette,
  TrendingUp,
  Shield,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Zap,
  Star,
  Clock,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";

const Solutions = () => {
  const solutions = [
    {
      id: "cloud-licensing",
      name: "Cloud & Licensing",
      tagline: "Microsoft 365 & Google Workspace",
      description: "Enterprise-grade cloud productivity platforms with expert migration, licensing optimization, and 24/7 support. Save 20-40% on software costs.",
      icon: Cloud,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      popular: true,
      features: [
        "Microsoft 365 & Google Workspace deployment",
        "License audit and optimization",
        "24-48 hour migration",
        "99.9% uptime guarantee",
        "User training and onboarding",
        "Ongoing support and management"
      ],
      stats: {
        clients: "500+ businesses",
        savings: "30% cost savings",
        uptime: "99.9% SLA"
      },
      link: "/solutions/cloud-and-licensing",
      cta: "Explore Cloud Solutions"
    },
    {
      id: "ai-messaging",
      name: "AI & Messaging Automation",
      tagline: "WhatsApp Business API & Chatbots",
      description: "Official WhatsApp Business API integration with AI-powered chatbots, workflow automation, and omnichannel messaging for seamless customer engagement.",
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      popular: true,
      features: [
        "WhatsApp Business API setup",
        "AI chatbot development",
        "SMS & email integration",
        "Workflow automation builder",
        "Real-time analytics dashboard",
        "CRM/ERP integrations"
      ],
      stats: {
        reduction: "65% support reduction",
        automation: "90% queries automated",
        response: "24/7 availability"
      },
      link: "/solutions/ai-and-messaging-automation",
      cta: "Automate Messaging"
    },
    {
      id: "web-design",
      name: "Web Design as a Service",
      tagline: "Monthly Retainer, Unlimited Revisions",
      description: "Professional website design and maintenance on a predictable monthly retainer. Unlimited revisions, continuous optimization, and dedicated design team.",
      icon: Palette,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      popular: false,
      features: [
        "Responsive modern design",
        "Unlimited revisions included",
        "SEO optimization",
        "Performance monitoring",
        "Monthly content updates",
        "Security & hosting management"
      ],
      stats: {
        delivery: "72h turnaround",
        uptime: "99.9% guaranteed",
        support: "Dedicated team"
      },
      link: "/solutions/web-design-as-a-service",
      cta: "Get Retainer Quote"
    },
    {
      id: "sme-transformation",
      name: "SME Digital Transformation",
      tagline: "Complete Digitalization Roadmap",
      description: "End-to-end digital transformation for small and medium enterprises. From assessment to implementation, we modernize your operations and workflows.",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      popular: true,
      features: [
        "Digital readiness assessment",
        "Technology roadmap planning",
        "Process automation",
        "Cloud migration strategy",
        "Change management support",
        "ROI tracking and reporting"
      ],
      stats: {
        efficiency: "60% efficiency gain",
        roi: "300% avg ROI",
        timeline: "90-180 day plans"
      },
      link: "/solutions/sme-digital-transformation",
      cta: "Start Transformation"
    },
    {
      id: "security-compliance",
      name: "Security & Compliance",
      tagline: "KDPA, ISO 27001, Cybersecurity",
      description: "Comprehensive cybersecurity and regulatory compliance solutions. Protect your data, meet KDPA requirements, and achieve ISO certification.",
      icon: Shield,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      popular: false,
      features: [
        "KDPA 2019 compliance audit",
        "ISO 27001 certification support",
        "Cybersecurity assessment",
        "Incident response planning",
        "Employee security training",
        "Continuous monitoring"
      ],
      stats: {
        compliance: "100% KDPA ready",
        threats: "99.8% blocked",
        response: "< 5 min detection"
      },
      link: "/solutions/security-and-compliance",
      cta: "Secure Your Business"
    },
    {
      id: "data-analytics",
      name: "Data & Analytics",
      tagline: "Business Intelligence & Insights",
      description: "Transform raw data into actionable insights with custom dashboards, predictive analytics, and real-time reporting solutions.",
      icon: BarChart3,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950",
      popular: false,
      features: [
        "Custom dashboard development",
        "Power BI & Tableau integration",
        "Predictive analytics models",
        "Real-time data pipelines",
        "Data warehouse setup",
        "Executive reporting"
      ],
      stats: {
        insights: "Real-time data",
        accuracy: "95% prediction",
        decisions: "3x faster"
      },
      link: "/solutions/data-and-analytics",
      cta: "Unlock Insights"
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Proven Expertise",
      description: "12+ years serving East African businesses"
    },
    {
      icon: Users,
      title: "500+ Clients",
      description: "Trusted by organizations across Kenya, Uganda, Tanzania"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Most solutions live within 30-90 days"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock expert assistance"
    }
  ];

  const industries = [
    {
      name: "Banking & Finance",
      solutions: ["Cloud & Licensing", "Security & Compliance", "Data & Analytics"],
      description: "Secure, compliant solutions for financial institutions"
    },
    {
      name: "Healthcare",
      solutions: ["Security & Compliance", "Cloud & Licensing", "AI & Messaging"],
      description: "HIPAA-ready systems with patient data protection"
    },
    {
      name: "Legal Services",
      solutions: ["Cloud & Licensing", "Security & Compliance", "SME Transformation"],
      description: "Document management and client communication"
    },
    {
      name: "Retail & E-Commerce",
      solutions: ["Web Design", "AI & Messaging", "Data & Analytics"],
      description: "Online presence and customer engagement"
    },
    {
      name: "Manufacturing",
      solutions: ["SME Transformation", "Data & Analytics", "Security & Compliance"],
      description: "Process optimization and supply chain visibility"
    },
    {
      name: "NGOs & Non-Profits",
      solutions: ["Cloud & Licensing", "Web Design", "Data & Analytics"],
      description: "Cost-effective collaboration and impact reporting"
    }
  ];

  const testimonials = [
    {
      quote: "Datacare transformed our entire IT infrastructure. Cloud migration was seamless, and we're saving 35% on licensing.",
      author: "IT Director",
      company: "Kenyan Law Firm",
      solution: "Cloud & Licensing"
    },
    {
      quote: "WhatsApp automation has been a game-changer. 90% of customer inquiries are now handled automatically.",
      author: "Customer Service Manager",
      company: "Financial Services SACCO",
      solution: "AI & Messaging"
    },
    {
      quote: "Our new website generates 3x more leads. The monthly retainer model gives us flexibility and peace of mind.",
      author: "Marketing Director",
      company: "Retail Chain",
      solution: "Web Design"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IT Solutions - Cloud, AI, Security & Digital Transformation | Datacare"
        description="Comprehensive IT solutions for East African businesses: Cloud & Licensing, AI Automation, Web Design, Digital Transformation, Security & Compliance, and Data Analytics."
        keywords="IT solutions Kenya, cloud solutions, AI automation, web design, digital transformation, cybersecurity Kenya, KDPA compliance, business intelligence"
        url="https://datacare.co.ke/solutions"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Layers className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Complete Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Transform Your Business</span><br />
              with Integrated IT Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From cloud infrastructure to AI automation, we provide comprehensive solutions
              that drive efficiency, security, and growth for East African businesses
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Core Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">12+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Solution Portfolio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT solutions designed for modern East African businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card
                  key={solution.id}
                  className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                    solution.popular ? 'ring-2 ring-primary/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {solution.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-orange-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Header with Icon */}
                  <div className={`p-6 ${solution.bgColor} border-b border-border`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{solution.name}</h3>
                    <p className="text-sm font-semibold text-primary mb-3">{solution.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <h4 className="font-semibold mb-3 text-sm">What's Included:</h4>
                    <ul className="space-y-2 mb-6">
                      {solution.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stats */}
                    <div className="bg-secondary/30 rounded-lg p-3 mb-6">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {Object.entries(solution.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="font-bold text-primary text-xs mb-0.5">{value}</div>
                            <div className="text-muted-foreground capitalize text-[10px]">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                      <Link to={solution.link}>
                        {solution.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
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
              Why Choose <span className="gradient-text">Datacare Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted IT partner for businesses across East Africa
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

      {/* Industry Applications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Industry-Specific <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored approaches for different sectors across East Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card
                key={industry.name}
                className="p-6 hover:shadow-xl transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.solutions.map((solution) => (
                    <Badge key={solution} variant="outline" className="text-xs">
                      {solution}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from businesses that transformed with our solutions
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
                <blockquote className="text-muted-foreground mb-4 leading-relaxed italic text-sm">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-start justify-between pt-4 border-t border-border">
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.solution}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
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
              Explore resources to understand our solutions better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Case Studies
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Read detailed success stories from businesses that implemented our solutions
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources/case-studies">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Knowledge Base
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Expert guides on Microsoft 365, KDPA compliance, and digital transformation
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources/knowledge-base">
                  Browse Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                Products Overview
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Explore our product offerings including Microsoft 365 and Google Workspace
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/products">
                  View Products
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
            Schedule a consultation to discuss which solutions are right for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/employee-amplification">
                Explore Employee Amplification
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
