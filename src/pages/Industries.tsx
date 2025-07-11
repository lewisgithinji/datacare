import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/industries-hero.jpg";
import { 
  Building2, 
  GraduationCap, 
  Heart, 
  Landmark, 
  Users, 
  Globe, 
  Factory,
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
  Target,
  TrendingUp,
  Settings
} from "lucide-react";

const Industries = () => {
  const [activeTab, setActiveTab] = useState("sme");

  const industries = [
    {
      id: "sme",
      title: "Small & Medium Enterprises",
      icon: Building2,
      description: "Scalable IT solutions designed for growing businesses",
      color: "from-blue-500 to-blue-600",
      stats: { clients: "500+", growth: "85%", satisfaction: "98%" }
    },
    {
      id: "education",
      title: "Education & Training",
      icon: GraduationCap,
      description: "Digital transformation for modern learning environments",
      color: "from-green-500 to-green-600",
      stats: { institutions: "150+", students: "50K+", uptime: "99.9%" }
    },
    {
      id: "healthcare",
      title: "Healthcare & Medical",
      icon: Heart,
      description: "Secure, compliant IT infrastructure for healthcare providers",
      color: "from-red-500 to-red-600",
      stats: { facilities: "75+", records: "1M+", compliance: "100%" }
    },
    {
      id: "finance",
      title: "Finance & Banking",
      icon: Landmark,
      description: "High-security solutions for financial institutions",
      color: "from-yellow-500 to-yellow-600",
      stats: { transactions: "10M+", uptime: "99.99%", security: "Zero Breach" }
    },
    {
      id: "government",
      title: "Government & Public Sector",
      icon: Users,
      description: "Transparent, efficient digital governance solutions",
      color: "from-purple-500 to-purple-600",
      stats: { agencies: "45+", citizens: "2M+", efficiency: "70%" }
    },
    {
      id: "manufacturing",
      title: "Manufacturing & Industry",
      icon: Factory,
      description: "Industry 4.0 solutions for smart manufacturing",
      color: "from-orange-500 to-orange-600",
      stats: { plants: "30+", automation: "90%", efficiency: "65%" }
    }
  ];

  const solutions = {
    sme: [
      {
        icon: Shield,
        title: "AI-Powered Security Suite",
        description: "Advanced threat detection with machine learning algorithms tailored for SME budgets.",
        features: ["24/7 AI Monitoring", "Predictive Threat Analysis", "Automated Response", "Compliance Reporting"]
      },
      {
        icon: Cloud,
        title: "Smart Cloud Migration",
        description: "Seamless transition to cloud with cost optimization and hybrid deployment options.",
        features: ["Cost Optimization", "Multi-cloud Management", "Data Migration", "24/7 Support"]
      },
      {
        icon: Brain,
        title: "Business Intelligence AI",
        description: "Transform your data into actionable insights with AI-powered analytics platforms.",
        features: ["Real-time Dashboards", "Predictive Analytics", "Custom Reports", "Mobile Access"]
      },
      {
        icon: Smartphone,
        title: "Mobile-First Solutions",
        description: "Custom mobile apps and responsive web solutions for modern business needs.",
        features: ["Cross-platform Apps", "Progressive Web Apps", "API Integration", "User Analytics"]
      }
    ],
    education: [
      {
        icon: Monitor,
        title: "Smart Campus Infrastructure",
        description: "Comprehensive IT infrastructure supporting digital learning and administration.",
        features: ["High-speed Connectivity", "Learning Management Systems", "Digital Classrooms", "Student Portals"]
      },
      {
        icon: Cloud,
        title: "Educational Cloud Platform",
        description: "Scalable cloud solutions for distance learning and collaborative education.",
        features: ["Virtual Classrooms", "Content Delivery", "Assessment Tools", "Analytics Dashboard"]
      },
      {
        icon: Shield,
        title: "Student Data Protection",
        description: "FERPA-compliant security solutions protecting sensitive educational data.",
        features: ["Data Encryption", "Access Controls", "Audit Trails", "Compliance Monitoring"]
      },
      {
        icon: Brain,
        title: "AI-Powered Learning Analytics",
        description: "Personalized learning experiences through AI-driven student performance analysis.",
        features: ["Performance Tracking", "Personalized Recommendations", "Early Warning Systems", "Progress Reports"]
      }
    ],
    healthcare: [
      {
        icon: Lock,
        title: "HIPAA-Compliant Infrastructure",
        description: "Secure, compliant IT systems designed specifically for healthcare environments.",
        features: ["End-to-end Encryption", "Access Controls", "Audit Logging", "Compliance Reporting"]
      },
      {
        icon: Database,
        title: "Electronic Health Records (EHR)",
        description: "Integrated EHR solutions with AI-powered clinical decision support systems.",
        features: ["Patient Records Management", "Clinical Decision Support", "Interoperability", "Mobile Access"]
      },
      {
        icon: Brain,
        title: "Medical AI & Diagnostics",
        description: "AI-powered diagnostic tools and predictive healthcare analytics.",
        features: ["Diagnostic Assistance", "Predictive Analytics", "Risk Assessment", "Treatment Recommendations"]
      },
      {
        icon: Shield,
        title: "Cybersecurity for Healthcare",
        description: "Advanced security measures protecting against healthcare-specific cyber threats.",
        features: ["Threat Detection", "Incident Response", "Security Training", "Vulnerability Management"]
      }
    ],
    finance: [
      {
        icon: Shield,
        title: "Banking Security Suite",
        description: "Multi-layered security architecture meeting stringent financial regulations.",
        features: ["Fraud Detection", "Transaction Monitoring", "Risk Assessment", "Regulatory Compliance"]
      },
      {
        icon: Brain,
        title: "AI-Powered Risk Analytics",
        description: "Advanced risk management through machine learning and predictive modeling.",
        features: ["Credit Risk Assessment", "Market Risk Analysis", "Operational Risk Management", "Stress Testing"]
      },
      {
        icon: Database,
        title: "Core Banking Systems",
        description: "Modernized core banking infrastructure with real-time processing capabilities.",
        features: ["Real-time Processing", "API-first Architecture", "Scalable Infrastructure", "Legacy Integration"]
      },
      {
        icon: ChartBar,
        title: "RegTech Solutions",
        description: "Automated regulatory compliance and reporting solutions for financial institutions.",
        features: ["Automated Reporting", "Compliance Monitoring", "Regulatory Updates", "Audit Trails"]
      }
    ],
    government: [
      {
        icon: Globe,
        title: "Digital Government Platform",
        description: "Comprehensive e-governance solutions for transparent and efficient public services.",
        features: ["Citizen Portals", "Digital Services", "Process Automation", "Transparency Tools"]
      },
      {
        icon: Shield,
        title: "Government Cybersecurity",
        description: "Nation-grade security infrastructure protecting critical government systems.",
        features: ["Critical Infrastructure Protection", "Threat Intelligence", "Incident Response", "Security Awareness"]
      },
      {
        icon: Database,
        title: "Public Data Management",
        description: "Secure, scalable data management systems for government agencies and public records.",
        features: ["Data Integration", "Records Management", "Public Access", "Data Analytics"]
      },
      {
        icon: Brain,
        title: "Smart City Solutions",
        description: "IoT and AI-powered solutions for intelligent urban management and planning.",
        features: ["Traffic Management", "Utility Monitoring", "Environmental Sensors", "Predictive Maintenance"]
      }
    ],
    manufacturing: [
      {
        icon: Settings,
        title: "Industry 4.0 Integration",
        description: "Smart manufacturing solutions with IoT sensors and real-time monitoring.",
        features: ["IoT Integration", "Real-time Monitoring", "Predictive Maintenance", "Quality Control"]
      },
      {
        icon: Brain,
        title: "AI-Powered Operations",
        description: "Machine learning algorithms optimizing production efficiency and quality control.",
        features: ["Production Optimization", "Quality Prediction", "Demand Forecasting", "Resource Planning"]
      },
      {
        icon: Shield,
        title: "Industrial Cybersecurity",
        description: "Specialized security solutions protecting operational technology and industrial systems.",
        features: ["OT Security", "Network Segmentation", "Threat Detection", "Incident Response"]
      },
      {
        icon: Cloud,
        title: "Manufacturing Cloud",
        description: "Cloud-based manufacturing execution systems with real-time visibility.",
        features: ["MES Integration", "Supply Chain Visibility", "Performance Analytics", "Mobile Dashboards"]
      }
    ]
  };

  const newTechOfferings = [
    {
      icon: Wifi,
      title: "5G & Edge Computing",
      description: "Ultra-low latency solutions leveraging 5G networks and edge computing infrastructure.",
      industries: ["Manufacturing", "Healthcare", "Smart Cities"]
    },
    {
      icon: Brain,
      title: "Generative AI Integration",
      description: "Custom GPT and Large Language Model implementations for business automation.",
      industries: ["All Industries", "Content Creation", "Customer Service"]
    },
    {
      icon: Shield,
      title: "Zero Trust Architecture",
      description: "Next-generation security framework assuming no implicit trust within the network.",
      industries: ["Finance", "Government", "Healthcare"]
    },
    {
      icon: Cloud,
      title: "Multi-Cloud Orchestration",
      description: "Seamless workload management across multiple cloud providers with cost optimization.",
      industries: ["Enterprise", "SME", "Education"]
    }
  ];

  const activeIndustry = industries.find(ind => ind.id === activeTab);
  const activeSolutions = solutions[activeTab as keyof typeof solutions] || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Industries and Technology Connections" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Industry Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Tailored Solutions</span><br />
              for Every Industry
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your industry with our AI-powered IT solutions, designed specifically 
              for the unique challenges and opportunities in your sector.
            </p>
            
            {/* Industry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">800+</div>
                <div className="text-sm text-muted-foreground">Active Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Industries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Average Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveTab(industry.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === industry.id
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-medium)]'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">{industry.title}</span>
                  <span className="sm:hidden">{industry.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Content */}
          {activeIndustry && (
            <div className="animate-fade-in">
              {/* Industry Header */}
              <div className="text-center mb-16">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${activeIndustry.color} flex items-center justify-center mx-auto mb-6`}>
                  <activeIndustry.icon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{activeIndustry.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  {activeIndustry.description}
                </p>
                
                {/* Industry Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {Object.entries(activeIndustry.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {activeSolutions.map((solution, index) => {
                  const Icon = solution.icon;
                  return (
                    <div
                      key={solution.title}
                      className="card-elevated group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activeIndustry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {solution.description}
                      </p>
                      
                      <ul className="space-y-1">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-success mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* New Tech Offerings */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <TrendingUp className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Cutting-Edge Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Next-Generation <span className="gradient-text">Tech Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the curve with our latest technology offerings, 
              designed for the digital transformation of tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newTechOfferings.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="card-elevated group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-accent to-accent-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tech.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {tech.industries.map((industry) => (
                      <span
                        key={industry}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
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
            Ready to Transform Your Industry?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how our tailored solutions can address your specific industry challenges 
            and drive measurable results for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Schedule Industry Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Download Industry Brief
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;