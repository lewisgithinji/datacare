import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Cloud, MessageSquare, Monitor, Settings, Brain, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesOverview = () => {
  const services = [
    {
      icon: Zap,
      title: "Employee Amplification",
      description: "Transform your team's capacity with AI-powered workflow optimization. Same headcount, 3-5x the impact.",
      features: ["20+ hrs/week reclaimed", "60-90 day ROI", "Guaranteed Results"],
      color: "from-orange-500 to-orange-600",
      href: "/employee-amplification",
      isPremium: true,
      isNew: true,
      capacityGain: "200-400%"
    },
    {
      icon: Cloud,
      title: "Cloud & Licensing",
      description: "Deploy Microsoft 365, Google Workspace, or Azure with expert support, backup, and compliance.",
      features: ["Expert Migration", "Ongoing Support", "Compliance Ready"],
      color: "from-blue-500 to-blue-600",
      capacityGain: "15-25%",
      amplificationNote: "Eliminates licensing admin burden"
    },
    {
      icon: MessageSquare,
      title: "AI & Messaging Automation",
      description: "Automate WhatsApp, SMS, and email engagement with AI chatbots and analytics dashboards.",
      features: ["AI Chatbots", "Multi-channel", "Analytics Dashboard"],
      color: "from-green-500 to-green-600",
      capacityGain: "30-50%",
      amplificationNote: "Automates customer communication"
    },
    {
      icon: Monitor,
      title: "Web Design as a Service",
      description: "Corporate websites delivered as a service — design, hosting, security, and ongoing maintenance.",
      features: ["Custom Design", "Secure Hosting", "Ongoing Maintenance"],
      color: "from-purple-500 to-purple-600",
      capacityGain: "10-20%",
      amplificationNote: "Streamlines digital presence management"
    },
    {
      icon: Settings,
      title: "SME Digital Transformation",
      description: "End-to-end IT modernization: cloud, automation, secure networks, and managed services.",
      features: ["Complete Modernization", "Secure Networks", "Managed Services"],
      color: "from-cyan-500 to-cyan-600",
      capacityGain: "40-60%",
      amplificationNote: "Modernizes entire workflow ecosystem"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Protect your business with endpoint security, identity management, and regulatory compliance.",
      features: ["Endpoint Security", "Identity Management", "Regulatory Compliance"],
      color: "from-red-500 to-red-600",
      capacityGain: "20-30%",
      amplificationNote: "Removes security busy work"
    },
    {
      icon: Brain,
      title: "Data & Analytics",
      description: "Turn business data into actionable insights with dashboards, reporting, and AI-driven analytics.",
      features: ["Business Intelligence", "Real-time Dashboards", "AI-driven Insights"],
      color: "from-violet-500 to-violet-600",
      capacityGain: "50-70%",
      amplificationNote: "Automates reporting and analysis"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Brain className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Core Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Core <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Smart, scalable IT and automation services built for East African businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                to={service.href || `/solutions/${service.title.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`}
                className={`card-elevated group cursor-pointer relative ${service.isPremium ? 'border-2 border-orange-500 shadow-xl' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Premium/New Badge */}
                {service.isPremium && (
                  <div className="absolute -top-3 -right-3 flex flex-col gap-1">
                    {service.isNew && (
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                        NEW
                      </span>
                    )}
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      PREMIUM
                    </span>
                  </div>
                )}

                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Capacity Amplification Note */}
                {service.capacityGain && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Zap className="w-3 h-3 mr-1 text-orange-500" />
                      {service.isPremium ? (
                        <span className="font-semibold text-orange-600">
                          Amplifies capacity by {service.capacityGain}
                        </span>
                      ) : (
                        <>
                          Amplifies capacity: <strong className="ml-1">{service.capacityGain}</strong>
                        </>
                      )}
                    </p>
                    {service.amplificationNote && (
                      <p className="text-xs text-muted-foreground mt-1 ml-4">
                        {service.amplificationNote}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors mt-4">
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your business with our proven solutions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/solutions">
                Explore All Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline">
              <Link to="/contact">
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;