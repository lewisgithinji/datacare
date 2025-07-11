import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Cloud, Database, Zap, Monitor } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      icon: Shield,
      title: "AI-Powered Security",
      description: "Real-time threat detection with machine learning, predictive analytics, and automated incident response.",
      features: ["24/7 AI Monitoring", "Predictive Threat Analysis", "Automated Response"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: Monitor,
      title: "AI-Driven Managed IT",
      description: "Proactive infrastructure monitoring with ML-powered automation and intelligent remediation.",
      features: ["Predictive Maintenance", "Automated Healing", "Performance Optimization"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cloud,
      title: "Smart Cloud Solutions", 
      description: "Hybrid cloud provisioning with AI-optimized cost management and seamless migration.",
      features: ["Cost Optimization", "Auto-scaling", "Multi-cloud Management"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Database,
      title: "Next-Gen Backup & DR",
      description: "Cloud-edge backup solutions with AI-optimized RPO/RTO and instant recovery capabilities.",
      features: ["AI-Optimized Recovery", "Instant Restoration", "Predictive Backup"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "Data & Analytics Platform",
      description: "Advanced dashboards, real-time data pipelines, and predictive ML models for business intelligence.",
      features: ["Real-time Insights", "Predictive Analytics", "Custom Dashboards"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "AI Software & ERP",
      description: "LLM-powered workflow accelerators and industry-tailored ERP modules for enhanced productivity.",
      features: ["Workflow Automation", "Industry ERP", "LLM Integration"],
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Brain className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Intelligent Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">AI-Integrated</span> IT Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your business with our comprehensive suite of AI-powered IT solutions, 
            designed for the modern enterprise in East Africa and beyond.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card-elevated group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your IT infrastructure with AI?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              View All Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;