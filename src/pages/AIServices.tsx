import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Brain, 
  Shield, 
  Eye, 
  TrendingUp, 
  Zap, 
  Database,
  BarChart3,
  Bot,
  Cpu,
  Network,
  Scan,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  Sparkles,
  Clock,
  Users,
  Star,
  Globe,
  Lock,
  Monitor,
  Layers
} from "lucide-react";

const AIServices = () => {
  const [activeService, setActiveService] = useState("security-ai");

  const aiServices = [
    {
      id: "security-ai",
      title: "Security AI",
      icon: Shield,
      description: "AI-powered cybersecurity with real-time threat detection",
      color: "from-red-500 to-red-600",
      tags: ["Threat Detection", "Behavioral Analysis", "Incident Response"]
    },
    {
      id: "monitoring-ai", 
      title: "Monitoring AI",
      icon: Eye,
      description: "Intelligent infrastructure monitoring with predictive alerts",
      color: "from-blue-500 to-blue-600",
      tags: ["Predictive Monitoring", "Anomaly Detection", "Auto-healing"]
    },
    {
      id: "data-analytics",
      title: "Data Analytics Platform",
      icon: BarChart3,
      description: "Advanced business intelligence with machine learning insights",
      color: "from-purple-500 to-purple-600",
      tags: ["Business Intelligence", "Predictive Analytics", "Real-time Dashboards"]
    },
    {
      id: "predictive-analytics",
      title: "Predictive Analytics",
      icon: TrendingUp,
      description: "Forecast trends and optimize operations with AI models",
      color: "from-green-500 to-green-600",
      tags: ["Forecasting", "Optimization", "Machine Learning"]
    }
  ];

  const serviceDetails = {
    "security-ai": {
      overview: "Our Security AI platform leverages advanced machine learning algorithms to provide real-time threat detection, behavioral analysis, and automated incident response. Protect your organization from evolving cyber threats with intelligent security that learns and adapts.",
      keyFeatures: [
        {
          icon: Scan,
          title: "Real-time Threat Detection",
          description: "Advanced ML algorithms continuously scan for known and unknown threats, providing instant alerts and automated responses."
        },
        {
          icon: Brain,
          title: "Behavioral Analytics",
          description: "AI-powered user and entity behavior analytics (UEBA) to detect insider threats and anomalous activities."
        },
        {
          icon: Zap,
          title: "Automated Response",
          description: "Intelligent incident response automation that quarantines threats and initiates remediation workflows."
        },
        {
          icon: AlertTriangle,
          title: "Predictive Threat Intelligence",
          description: "Anticipate future attacks based on global threat patterns and organizational vulnerability assessments."
        }
      ],
      capabilities: [
        "Zero-day threat detection",
        "Advanced persistent threat (APT) identification", 
        "Malware classification and sandboxing",
        "Network traffic analysis",
        "Endpoint detection and response (EDR)",
        "Security orchestration and automated response (SOAR)"
      ],
      useCases: [
        "Financial institutions requiring PCI DSS compliance",
        "Healthcare organizations protecting PHI data",
        "Government agencies with classified information",
        "Enterprises with critical intellectual property"
      ]
    },
    "monitoring-ai": {
      overview: "Transform your IT operations with AI-driven monitoring that predicts issues before they impact your business. Our platform uses machine learning to understand normal system behavior and automatically detects anomalies, optimizes performance, and prevents downtime.",
      keyFeatures: [
        {
          icon: Eye,
          title: "Predictive Monitoring",
          description: "AI models analyze historical patterns to predict infrastructure failures before they occur."
        },
        {
          icon: Brain,
          title: "Intelligent Alerting",
          description: "Smart alert correlation reduces noise and focuses on actionable insights with context-aware notifications."
        },
        {
          icon: Zap,
          title: "Auto-healing Systems",
          description: "Automated remediation scripts and self-healing infrastructure powered by AI decision engines."
        },
        {
          icon: TrendingUp,
          title: "Performance Optimization",
          description: "Continuous optimization recommendations based on workload patterns and resource utilization analysis."
        }
      ],
      capabilities: [
        "Infrastructure performance monitoring",
        "Application performance management (APM)",
        "Network performance analysis",
        "Cloud resource optimization",
        "Capacity planning and forecasting",
        "Root cause analysis automation"
      ],
      useCases: [
        "E-commerce platforms requiring 99.9% uptime",
        "SaaS providers with performance SLAs",
        "Manufacturing with IoT sensor monitoring",
        "Financial trading systems with latency requirements"
      ]
    },
    "data-analytics": {
      overview: "Unlock the power of your data with our comprehensive AI-driven analytics platform. Transform raw data into actionable business insights through advanced visualization, machine learning models, and real-time processing capabilities.",
      keyFeatures: [
        {
          icon: BarChart3,
          title: "Interactive Dashboards",
          description: "Customizable, real-time dashboards with drag-and-drop widgets and advanced visualization options."
        },
        {
          icon: Brain,
          title: "Machine Learning Insights",
          description: "Automated pattern recognition and anomaly detection with explainable AI recommendations."
        },
        {
          icon: Database,
          title: "Data Integration Hub",
          description: "Connect and harmonize data from multiple sources with automated ETL pipelines and data quality checks."
        },
        {
          icon: Sparkles,
          title: "Natural Language Processing",
          description: "Query your data using natural language and receive AI-generated insights and recommendations."
        }
      ],
      capabilities: [
        "Real-time data streaming and processing",
        "Advanced statistical analysis",
        "Customer segmentation and behavior analysis",
        "Financial modeling and risk assessment",
        "Supply chain optimization",
        "Marketing attribution and ROI analysis"
      ],
      useCases: [
        "Retail chains optimizing inventory and pricing",
        "Banks analyzing credit risk and fraud patterns",
        "Healthcare providers improving patient outcomes",
        "Manufacturers optimizing production efficiency"
      ]
    },
    "predictive-analytics": {
      overview: "Harness the power of predictive AI to forecast future trends, optimize operations, and make data-driven decisions. Our platform combines advanced statistical models with machine learning to deliver accurate predictions and actionable recommendations.",
      keyFeatures: [
        {
          icon: TrendingUp,
          title: "Advanced Forecasting",
          description: "Time-series analysis and forecasting models for demand planning, sales prediction, and resource optimization."
        },
        {
          icon: Target,
          title: "Risk Modeling",
          description: "Predictive risk assessment models for credit scoring, fraud detection, and operational risk management."
        },
        {
          icon: Cpu,
          title: "Optimization Engines",
          description: "AI-powered optimization algorithms for supply chain, pricing, scheduling, and resource allocation."
        },
        {
          icon: Network,
          title: "Model Management",
          description: "Complete MLOps platform for model deployment, monitoring, and continuous improvement with A/B testing."
        }
      ],
      capabilities: [
        "Demand forecasting and inventory optimization",
        "Customer lifetime value prediction",
        "Churn prediction and retention modeling",
        "Price optimization and dynamic pricing",
        "Maintenance scheduling and asset optimization",
        "Market trend analysis and competitive intelligence"
      ],
      useCases: [
        "Retailers optimizing inventory and demand planning",
        "Telecom companies reducing customer churn",
        "Energy companies predicting equipment failures",
        "Airlines optimizing pricing and capacity"
      ]
    }
  };

  const aiTechnologies = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Advanced ML algorithms including supervised, unsupervised, and reinforcement learning models."
    },
    {
      icon: Bot,
      title: "Natural Language Processing",
      description: "Text analysis, sentiment analysis, and conversational AI powered by large language models."
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual analytics for automated inspection and monitoring."
    },
    {
      icon: TrendingUp,
      title: "Deep Learning",
      description: "Neural networks and deep learning frameworks for complex pattern recognition and prediction."
    },
    {
      icon: Layers,
      title: "Edge AI",
      description: "Deploy AI models at the edge for real-time processing with minimal latency requirements."
    },
    {
      icon: Network,
      title: "Federated Learning",
      description: "Collaborative machine learning that preserves data privacy while improving model accuracy."
    }
  ];

  const activeServiceData = serviceDetails[activeService as keyof typeof serviceDetails];
  const activeServiceInfo = aiServices.find(service => service.id === activeService);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Brain className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Artificial Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">AI-Powered</span><br />
              Enterprise Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your business operations with cutting-edge artificial intelligence solutions. 
              From predictive analytics to automated security, unlock the full potential of AI for your organization.
            </p>
            
            {/* AI Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Threat Detection Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <div className="text-sm text-muted-foreground">Operational Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">50+</div>
                <div className="text-sm text-muted-foreground">AI Models Deployed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Navigation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Navigation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {aiServices.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-medium)]'
                      : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 ${
                    activeService === service.id ? 'opacity-100' : 'opacity-70'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm opacity-80 mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-md ${
                          activeService === service.id 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Details */}
          {activeServiceData && activeServiceInfo && (
            <div className="animate-fade-in">
              {/* Service Header */}
              <div className="text-center mb-16">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeServiceInfo.color} flex items-center justify-center mx-auto mb-6`}>
                  <activeServiceInfo.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{activeServiceInfo.title}</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  {activeServiceData.overview}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-12">Key Features & Capabilities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {activeServiceData.keyFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="card-elevated text-center"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activeServiceInfo.color} flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-3">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Capabilities & Use Cases */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Technical Capabilities */}
                <div className="card-elevated">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-primary" />
                    Technical Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {activeServiceData.capabilities.map((capability) => (
                      <li key={capability} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div className="card-elevated">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-accent" />
                    Industry Use Cases
                  </h3>
                  <ul className="space-y-3">
                    {activeServiceData.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center text-sm">
                        <ArrowRight className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Technologies */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Core Technologies</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cutting-Edge <span className="gradient-text">AI Technologies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI solutions are built on the latest artificial intelligence technologies, 
              frameworks, and methodologies to deliver superior performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTechnologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="card-elevated group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent to-accent-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Implement AI in Your Organization?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your AI transformation journey today. Our experts will work with you to identify 
            the best AI solutions for your specific business needs and objectives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-primary">
              Schedule AI Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Download AI Capabilities Guide
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              200+ AI Projects Delivered
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              98% Client Satisfaction
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              5+ Years AI Expertise
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIServices;