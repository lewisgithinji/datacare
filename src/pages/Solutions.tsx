import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Monitor, 
  Cloud, 
  Database,
  Brain,
  Zap,
  Network,
  Lock,
  Eye,
  Cpu,
  Server,
  HardDrive,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Target,
  Layers,
  Settings,
  BarChart3,
  Workflow,
  GitMerge,
  Users,
  Award,
  Clock,
  Star
} from "lucide-react";

const Solutions = () => {
  const [activeSolution, setActiveSolution] = useState("security");

  const solutionPillars = [
    {
      id: "security",
      title: "AI-Powered Security",
      icon: Shield,
      description: "Advanced cybersecurity with intelligent threat detection and automated response",
      color: "from-red-500 to-red-600",
      stats: { threats: "99.8%", response: "< 5 min", incidents: "95%" }
    },
    {
      id: "infrastructure",
      title: "Managed IT & Infrastructure",
      icon: Monitor,
      description: "Proactive IT management with predictive analytics and automated maintenance",
      color: "from-blue-500 to-blue-600",
      stats: { uptime: "99.9%", efficiency: "80%", costs: "40%" }
    },
    {
      id: "cloud",
      title: "Cloud & Virtualization",
      icon: Cloud,
      description: "Scalable cloud solutions with hybrid deployment and cost optimization",
      color: "from-cyan-500 to-cyan-600",
      stats: { migration: "100%", savings: "45%", scalability: "∞" }
    },
    {
      id: "backup",
      title: "Backup & Disaster Recovery",
      icon: Database,
      description: "Next-generation backup with AI-optimized recovery and business continuity",
      color: "from-green-500 to-green-600",
      stats: { recovery: "< 15 min", reliability: "99.99%", testing: "Monthly" }
    },
    {
      id: "analytics",
      title: "Data & Analytics",
      icon: Brain,
      description: "Business intelligence platform with predictive analytics and real-time insights", 
      color: "from-purple-500 to-purple-600",
      stats: { insights: "Real-time", accuracy: "95%", decisions: "3x Faster" }
    },
    {
      id: "software",
      title: "Enterprise Software",
      icon: Zap,
      description: "Custom software solutions and ERP systems with AI-powered automation",
      color: "from-amber-500 to-amber-600",
      stats: { automation: "70%", efficiency: "60%", roi: "300%" }
    }
  ];

  const solutionDetails = {
    security: {
      overview: "Protect your organization with our comprehensive AI-powered security platform that combines advanced threat detection, behavioral analytics, and automated incident response to safeguard your digital assets against evolving cyber threats.",
      coreServices: [
        {
          icon: Eye,
          title: "24/7 AI Threat Monitoring",
          description: "Continuous monitoring with machine learning algorithms that detect known and unknown threats in real-time.",
          features: ["Behavioral Analysis", "Anomaly Detection", "Threat Intelligence", "Zero-Day Protection"]
        },
        {
          icon: Lock,
          title: "Identity & Access Management",
          description: "Comprehensive IAM solution with multi-factor authentication and privileged access controls.",
          features: ["Single Sign-On", "Multi-Factor Auth", "Role-Based Access", "Audit Trails"]
        },
        {
          icon: Network,
          title: "Network Security",
          description: "Advanced firewall, intrusion detection, and network segmentation for complete perimeter protection.",
          features: ["Next-Gen Firewall", "IDS/IPS", "Network Segmentation", "VPN Solutions"]
        },
        {
          icon: Server,
          title: "Endpoint Protection",
          description: "AI-powered endpoint security with real-time threat prevention and automated remediation.",
          features: ["Anti-Malware", "Behavioral Monitoring", "Device Control", "Remote Management"]
        }
      ],
      benefits: [
        "95% reduction in false positive alerts",
        "5x faster incident response times",  
        "Compliance with international standards",
        "24/7 security operations center"
      ]
    },
    infrastructure: {
      overview: "Transform your IT operations with our intelligent infrastructure management solutions that predict issues before they occur, automate routine tasks, and optimize performance across your entire technology stack.",
      coreServices: [
        {
          icon: Monitor,
          title: "Proactive Monitoring",
          description: "AI-driven monitoring that predicts failures and prevents downtime before issues impact your business.",
          features: ["Predictive Analytics", "Automated Alerts", "Performance Optimization", "Capacity Planning"]
        },
        {
          icon: Settings,
          title: "System Administration",
          description: "Comprehensive system management with automated patching, configuration, and maintenance.",
          features: ["Patch Management", "Configuration Control", "Automated Maintenance", "Change Management"]
        },
        {
          icon: Network,
          title: "Network Management",
          description: "Complete network infrastructure management with optimization and quality of service controls.",
          features: ["Network Optimization", "QoS Management", "Bandwidth Control", "Traffic Analysis"]
        },
        {
          icon: HardDrive,
          title: "Hardware Management",
          description: "Proactive hardware monitoring and maintenance with predictive replacement scheduling.",
          features: ["Hardware Monitoring", "Preventive Maintenance", "Asset Management", "Lifecycle Planning"]
        }
      ],
      benefits: [
        "80% reduction in unplanned downtime",
        "40% decrease in operational costs",
        "99.9% service level agreement",
        "Dedicated technical account manager"
      ]
    },
    cloud: {
      overview: "Accelerate your digital transformation with our comprehensive cloud solutions that provide scalability, flexibility, and cost optimization while maintaining security and compliance across hybrid and multi-cloud environments.",
      coreServices: [
        {
          icon: Cloud,
          title: "Cloud Migration",
          description: "Seamless migration to cloud platforms with minimal disruption and optimized architecture.",
          features: ["Assessment & Planning", "Data Migration", "Application Modernization", "Testing & Validation"]
        },
        {
          icon: GitMerge,
          title: "Hybrid Cloud Integration",
          description: "Unified management across on-premises and cloud environments with seamless integration.",
          features: ["Hybrid Architecture", "Data Synchronization", "Unified Management", "Security Consistency"]
        },
        {
          icon: TrendingUp,
          title: "Cloud Optimization",
          description: "AI-powered cost optimization and performance tuning for maximum cloud efficiency.",
          features: ["Cost Optimization", "Performance Tuning", "Resource Scaling", "Usage Analytics"]
        },
        {
          icon: Lock,
          title: "Cloud Security",
          description: "Comprehensive security framework designed specifically for cloud environments.",
          features: ["Identity Management", "Data Encryption", "Compliance Monitoring", "Threat Protection"]
        }
      ],
      benefits: [
        "45% reduction in infrastructure costs",
        "3x faster deployment of new services",
        "Unlimited scalability on demand",
        "99.9% cloud infrastructure uptime"
      ]
    },
    backup: {
      overview: "Ensure business continuity with our next-generation backup and disaster recovery solutions that leverage AI optimization, cloud-edge architecture, and automated testing to guarantee your data is always protected and recoverable.",
      coreServices: [
        {
          icon: Database,
          title: "Intelligent Backup",
          description: "AI-optimized backup strategies with deduplication, compression, and smart scheduling.",
          features: ["AI Optimization", "Deduplication", "Incremental Backup", "Smart Scheduling"]
        },
        {
          icon: Cpu,
          title: "Disaster Recovery",
          description: "Comprehensive DR planning with automated failover and business continuity assurance.",
          features: ["DR Planning", "Automated Failover", "Business Continuity", "Recovery Testing"]
        },
        {
          icon: Cloud,
          title: "Cloud Backup",
          description: "Secure cloud backup with multiple geographic locations and instant accessibility.",
          features: ["Multi-Site Backup", "Cloud Storage", "Instant Access", "Geographic Distribution"]
        },
        {
          icon: CheckCircle,
          title: "Compliance & Archiving",
          description: "Long-term data archiving with compliance management and legal hold capabilities.",
          features: ["Compliance Management", "Legal Hold", "Long-term Archiving", "Audit Trails"]
        }
      ],
      benefits: [
        "15-minute recovery time objective",
        "99.99% backup reliability rate",
        "Automated monthly DR testing",
        "Compliance with industry regulations"
      ]
    },
    analytics: {
      overview: "Unlock the power of your data with our comprehensive analytics platform that transforms raw information into actionable insights through advanced visualization, machine learning, and predictive modeling.",
      coreServices: [
        {
          icon: BarChart3,
          title: "Business Intelligence",
          description: "Interactive dashboards and reports that provide real-time insights into your business performance.",
          features: ["Real-time Dashboards", "Custom Reports", "KPI Monitoring", "Data Visualization"]
        },
        {
          icon: Brain,
          title: "Predictive Analytics",
          description: "Machine learning models that forecast trends, identify opportunities, and predict outcomes.",
          features: ["Forecasting Models", "Trend Analysis", "Risk Assessment", "Opportunity Identification"]
        },
        {
          icon: Workflow,
          title: "Data Integration",
          description: "Seamless integration of data sources with automated ETL processes and data quality management.",
          features: ["Data Integration", "ETL Automation", "Data Quality", "Real-time Processing"]
        },
        {
          icon: Target,
          title: "Advanced Analytics",
          description: "Sophisticated analytical tools including statistical analysis, data mining, and AI-powered insights.",
          features: ["Statistical Analysis", "Data Mining", "AI Insights", "Pattern Recognition"]
        }
      ],
      benefits: [
        "95% improvement in decision accuracy",
        "Real-time access to business insights",
        "3x faster time-to-insight delivery",
        "Automated anomaly detection"
      ]
    },
    software: {
      overview: "Accelerate your business processes with our custom enterprise software solutions that leverage AI automation, modern architectures, and industry best practices to deliver scalable, efficient, and user-friendly applications.",
      coreServices: [
        {
          icon: Zap,
          title: "Custom Software Development",
          description: "Bespoke software solutions designed specifically for your business requirements and workflows.",
          features: ["Custom Development", "API Integration", "Modern Architecture", "Scalable Design"]
        },
        {
          icon: Layers,
          title: "Enterprise Resource Planning",
          description: "Comprehensive ERP systems that integrate all aspects of your business operations.",
          features: ["Financial Management", "Human Resources", "Supply Chain", "Customer Relations"]
        },
        {
          icon: Smartphone,
          title: "Mobile Applications",
          description: "Native and cross-platform mobile applications that extend your business capabilities.",
          features: ["Native Development", "Cross-Platform", "Mobile-First Design", "App Store Deployment"]
        },
        {
          icon: Globe,
          title: "Web Applications",
          description: "Modern web applications with responsive design and progressive web app capabilities.",
          features: ["Responsive Design", "Progressive Web Apps", "Cloud-Native", "Modern Frameworks"]
        }
      ],
      benefits: [
        "70% improvement in process automation",
        "60% increase in operational efficiency",
        "300% return on investment average",
        "Seamless integration with existing systems"
      ]
    }
  };

  const activeSolutionData = solutionDetails[activeSolution as keyof typeof solutionDetails];
  const activeSolutionInfo = solutionPillars.find(pillar => pillar.id === activeSolution);

  const industryApplications = [
    {
      industry: "Banking & Finance",
      solutions: ["AI-Powered Security", "Data Analytics", "Compliance Management"],
      description: "Secure financial operations with regulatory compliance and risk management."
    },
    {
      industry: "Healthcare",
      solutions: ["Data Protection", "Cloud Infrastructure", "Backup & Recovery"],
      description: "HIPAA-compliant solutions for patient data security and system reliability."
    },
    {
      industry: "Manufacturing",
      solutions: ["IoT Integration", "Predictive Analytics", "Process Automation"],
      description: "Industry 4.0 solutions for smart manufacturing and operational excellence."
    },
    {
      industry: "Education",
      solutions: ["Cloud Platforms", "Digital Infrastructure", "Learning Management"],
      description: "Scalable educational technology for modern learning environments."
    },
    {
      industry: "Government",
      solutions: ["Cybersecurity", "Digital Services", "Data Management"],
      description: "Secure and transparent digital governance solutions for public sector."
    },
    {
      industry: "SME & Startups",
      solutions: ["Managed IT", "Cloud Migration", "Business Intelligence"],
      description: "Cost-effective solutions that scale with your growing business."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <span className="gradient-text">Comprehensive IT</span><br />
              Solutions Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your business with our integrated suite of AI-powered IT solutions. 
              From cybersecurity to cloud infrastructure, we provide everything you need 
              to thrive in the digital age.
            </p>
            
            {/* Solution Stats */}
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
                <div className="text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Pillars Navigation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pillar Navigation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {solutionPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveSolution(pillar.id)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    activeSolution === pillar.id
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-medium)]'
                      : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pillar.color} flex items-center justify-center mb-4 ${
                    activeSolution === pillar.id ? 'opacity-100' : 'opacity-70'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{pillar.description}</p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {Object.entries(pillar.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`font-bold ${
                          activeSolution === pillar.id ? 'text-primary-foreground' : 'text-primary'
                        }`}>
                          {value}
                        </div>
                        <div className="opacity-70 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Solution Details */}
          {activeSolutionData && activeSolutionInfo && (
            <div className="animate-fade-in">
              {/* Solution Header */}
              <div className="text-center mb-16">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeSolutionInfo.color} flex items-center justify-center mx-auto mb-6`}>
                  <activeSolutionInfo.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{activeSolutionInfo.title}</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  {activeSolutionData.overview}
                </p>
              </div>

              {/* Core Services */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-12">Core Services & Capabilities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {activeSolutionData.coreServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.title}
                        className="card-elevated group cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activeSolutionInfo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-3 group-hover:text-primary transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
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

              {/* Key Benefits */}
              <div className="card-elevated">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Key Business Benefits
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeSolutionData.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Industry-Specific <span className="gradient-text">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our solutions are tailored to meet the unique challenges and requirements 
              of different industries across East Africa and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryApplications.map((app, index) => (
              <div
                key={app.industry}
                className="card-elevated group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {app.industry}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {app.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {app.solutions.map((solution) => (
                    <span
                      key={solution}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {solution}
                    </span>
                  ))}
                </div>
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
            Let our experts design a customized solution that addresses your specific 
            business challenges and drives measurable results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-primary">
              Schedule Solution Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Download Solutions Guide
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              500+ Successful Implementations
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              4.9/5 Client Satisfaction
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Rapid Deployment
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Industry Certified
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;