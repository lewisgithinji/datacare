import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { 
  Shield, 
  Brain, 
  Cloud, 
  Database, 
  Zap, 
  Monitor,
  Smartphone,
  Wifi,
  Lock,
  ChartBar,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Settings,
  Globe,
  Layers,
  TrendingUp,
  BarChart3,
  FileText,
  Headphones
} from "lucide-react";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("security");

  const productCategories = [
    {
      id: "security",
      title: "AI-Powered Security",
      icon: Shield,
      description: "Advanced cybersecurity solutions with machine learning",
      color: "from-red-500 to-red-600"
    },
    {
      id: "infrastructure",
      title: "Managed IT & Infrastructure",
      icon: Monitor,
      description: "Proactive IT management with predictive analytics",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "cloud",
      title: "Cloud & Virtualization",
      icon: Cloud,
      description: "Scalable cloud solutions and hybrid deployments",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: "data",
      title: "Data & Analytics",
      icon: Brain,
      description: "Business intelligence and predictive analytics",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "software",
      title: "Enterprise Software",
      icon: Zap,
      description: "Custom software solutions and ERP systems",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: "backup",
      title: "Backup & Recovery", 
      icon: Database,
      description: "Next-generation backup and disaster recovery",
      color: "from-green-500 to-green-600"
    }
  ];

  const products = {
    security: [
      {
        name: "SecureAI Pro",
        description: "Enterprise-grade AI-powered security platform with real-time threat detection and automated response.",
        features: [
          "24/7 AI Threat Monitoring",
          "Behavioral Analytics",
          "Automated Incident Response",
          "Compliance Reporting",
          "Zero-Day Protection",
          "Advanced Endpoint Security"
        ],
        pricing: "From $2,500/month",
        popular: true
      },
      {
        name: "Network Guardian",
        description: "Advanced network security solution with deep packet inspection and AI-powered anomaly detection.",
        features: [
          "Deep Packet Inspection",
          "Intrusion Detection & Prevention",
          "Network Segmentation",
          "Traffic Analysis",
          "Threat Intelligence Integration"
        ],
        pricing: "From $1,800/month"
      },
      {
        name: "Identity Shield",
        description: "Comprehensive identity and access management with biometric authentication and single sign-on.",
        features: [
          "Multi-Factor Authentication",
          "Single Sign-On (SSO)",
          "Biometric Authentication",
          "Privileged Access Management",
          "Identity Governance"
        ],
        pricing: "From $15/user/month"
      }
    ],
    infrastructure: [
      {
        name: "InfraAI Manager",
        description: "Intelligent IT infrastructure management with predictive maintenance and automated healing.",
        features: [
          "Predictive Maintenance",
          "Automated System Healing",
          "Performance Optimization",
          "Resource Management",
          "24/7 Monitoring",
          "Capacity Planning"
        ],
        pricing: "From $1,200/month",
        popular: true
      },
      {
        name: "Server Shield Pro",
        description: "Enterprise server management with virtualization support and high availability clustering.",
        features: [
          "Server Virtualization",
          "High Availability Clustering",
          "Load Balancing",
          "Patch Management",
          "Configuration Management"
        ],
        pricing: "From $800/month"
      },
      {
        name: "Network Optimizer",
        description: "AI-driven network optimization with bandwidth management and quality of service controls.",
        features: [
          "Bandwidth Management",
          "Quality of Service (QoS)",
          "Network Performance Analytics",
          "Traffic Shaping",
          "WAN Optimization"
        ],
        pricing: "From $600/month"
      }
    ],
    cloud: [
      {
        name: "CloudFlex Platform",
        description: "Multi-cloud management platform with cost optimization and automated scaling.",
        features: [
          "Multi-Cloud Management",
          "Cost Optimization",
          "Auto-Scaling",
          "Cloud Migration Tools",
          "Hybrid Cloud Support",
          "Container Orchestration"
        ],
        pricing: "From $3,000/month",
        popular: true
      },
      {
        name: "VirtualCore Suite",
        description: "Complete virtualization solution with enterprise-grade hypervisor and management tools.",
        features: [
          "Enterprise Hypervisor",
          "VM Management",
          "Resource Pooling",
          "Live Migration",
          "Disaster Recovery"
        ],
        pricing: "From $2,200/month"
      },
      {
        name: "Edge Computing Hub",
        description: "Edge computing platform for low-latency applications with 5G integration.",
        features: [
          "Edge Node Management",
          "5G Integration",
          "Low-Latency Processing",
          "IoT Device Support",
          "Real-time Analytics"
        ],
        pricing: "From $1,500/month"
      }
    ],
    data: [
      {
        name: "DataMind Analytics",
        description: "Advanced business intelligence platform with machine learning and predictive analytics.",
        features: [
          "Real-time Dashboards",
          "Predictive Analytics",
          "Machine Learning Models",
          "Data Visualization",
          "Custom Reports",
          "Mobile Analytics"
        ],
        pricing: "From $2,800/month",
        popular: true
      },
      {
        name: "IntelliStream",
        description: "Real-time data streaming and processing platform for high-volume data environments.",
        features: [
          "Real-time Data Streaming",
          "Stream Processing",
          "Data Pipeline Management",
          "Event Processing",
          "API Integration"
        ],
        pricing: "From $1,900/month"
      },
      {
        name: "AI Insights Engine",
        description: "AI-powered data analysis platform with natural language processing and automated insights.",
        features: [
          "Natural Language Processing",
          "Automated Insights",
          "Pattern Recognition",
          "Anomaly Detection",
          "Trend Analysis"
        ],
        pricing: "From $2,200/month"
      }
    ],
    software: [
      {
        name: "EnterpriseAI Suite",
        description: "Comprehensive ERP solution with AI-powered workflow automation and business process optimization.",
        features: [
          "AI Workflow Automation",
          "Financial Management",
          "Human Resources",
          "Supply Chain Management",
          "Customer Relationship Management",
          "Business Intelligence"
        ],
        pricing: "From $5,000/month",
        popular: true
      },
      {
        name: "WorkflowGenius",
        description: "Intelligent workflow automation platform with low-code/no-code development capabilities.",
        features: [
          "Low-Code Development",
          "Process Automation",
          "Integration Hub",
          "Workflow Designer",
          "API Management"
        ],
        pricing: "From $1,200/month"
      },
      {
        name: "CustomApp Builder",
        description: "Rapid application development platform with AI-assisted coding and deployment.",
        features: [
          "AI-Assisted Development",
          "Rapid Prototyping",
          "Cross-Platform Deployment",
          "Database Integration",
          "API Generation"
        ],
        pricing: "From $2,000/month"
      }
    ],
    backup: [
      {
        name: "BackupAI Pro",
        description: "Next-generation backup solution with AI-optimized storage and instant recovery capabilities.",
        features: [
          "AI-Optimized Backup",
          "Instant Recovery",
          "Deduplication",
          "Encryption at Rest & Transit",
          "Cross-Platform Support",
          "Automated Testing"
        ],
        pricing: "From $1,800/month",
        popular: true
      },
      {
        name: "DisasterShield",
        description: "Comprehensive disaster recovery solution with cloud replication and automated failover.",
        features: [
          "Cloud Replication",
          "Automated Failover",
          "Recovery Point Objectives",
          "Business Continuity Planning",
          "Regular DR Testing"
        ],
        pricing: "From $2,500/month"
      },
      {
        name: "ArchiveVault",
        description: "Long-term data archiving solution with compliance management and intelligent tiering.",
        features: [
          "Intelligent Data Tiering",
          "Compliance Management",
          "Legal Hold Support",
          "Audit Trails",
          "Cost Optimization"
        ],
        pricing: "From $800/month"
      }
    ]
  };

  const supportPlans = [
    {
      name: "Essential Support",
      price: "Included",
      features: [
        "Business Hours Support",
        "Email & Phone Support",
        "Knowledge Base Access",
        "Basic Training Resources"
      ],
      color: "border-muted"
    },
    {
      name: "Premium Support",
      price: "+30% of license cost",
      features: [
        "24/7 Priority Support",
        "Dedicated Account Manager",
        "Advanced Training",
        "Quarterly Health Checks",
        "Priority Bug Fixes"
      ],
      color: "border-primary",
      popular: true
    },
    {
      name: "Enterprise Support",
      price: "Custom Pricing",
      features: [
        "White-Glove Service",
        "On-site Support Available",
        "Custom SLA Agreement",
        "Dedicated Support Team",
        "Proactive Monitoring",
        "Strategic Consulting"
      ],
      color: "border-accent"
    }
  ];

  const activeProducts = products[activeCategory as keyof typeof products] || [];
  const activeCategoryInfo = productCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Products - Microsoft 365, Google Workspace & Cloud Solutions"
        description="Explore Datacare Limited's products including Microsoft 365, Google Workspace, Datacare Messaging Platform, and Cloud Backup & Recovery solutions for businesses in Kenya."
        keywords="Microsoft 365 Kenya, Google Workspace Kenya, cloud backup, messaging platform, business software, productivity tools, enterprise solutions"
        url="https://datacare.co.ke/products"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Layers className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Product Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">AI-Powered</span><br />
              IT Solutions Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our comprehensive suite of AI-integrated IT products and services, 
              designed to transform your business operations and drive digital innovation.
            </p>
            
            {/* Product Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">18+</div>
                <div className="text-sm text-muted-foreground">Core Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-muted-foreground">Product Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {productCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-medium)]'
                      : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 ${
                    activeCategory === category.id ? 'opacity-100' : 'opacity-70'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{category.title}</h3>
                  <p className="text-xs opacity-80">{category.description}</p>
                </button>
              );
            })}
          </div>

          {/* Active Category Products */}
          {activeCategoryInfo && (
            <div className="animate-fade-in">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeCategoryInfo.color} flex items-center justify-center mx-auto mb-4`}>
                  <activeCategoryInfo.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{activeCategoryInfo.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {activeCategoryInfo.description}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className={`card-elevated group cursor-pointer relative ${
                      product.popular ? 'ring-2 ring-primary/20' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {product.popular && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{product.pricing}</div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="btn-primary flex-1">
                        Get Quote
                      </Button>
                      <Button variant="outline" size="sm" className="btn-outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Support Plans */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Headphones className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Support & Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              World-Class <span className="gradient-text">Support Plans</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the support level that best fits your business needs. 
              All plans include access to our expert technical team and comprehensive resources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`card-elevated text-center relative ${
                  plan.popular ? 'ring-2 ring-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Recommended
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold text-primary mb-6">{plan.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={plan.popular ? 'btn-primary' : 'btn-outline'} 
                  size="sm"
                >
                  {plan.popular ? 'Get Started' : 'Contact Sales'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Speak with our product experts to find the perfect solution for your organization. 
            Get personalized recommendations and custom pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Schedule Product Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Download Product Catalog
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              800+ Satisfied Clients
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              4.9/5 Customer Rating
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              15+ Years Experience
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;