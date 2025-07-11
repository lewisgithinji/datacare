import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  FileText, 
  Users, 
  Download, 
  Calendar,
  PlayCircle,
  ExternalLink,
  Search,
  Filter,
  Clock,
  Eye,
  ArrowRight,
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
  Brain,
  Cloud,
  Zap,
  Code,
  Award,
  CheckCircle,
  Star
} from "lucide-react";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const resourceCategories = [
    { id: "all", label: "All Resources", count: 45 },
    { id: "blog", label: "Blog Posts", count: 18 },
    { id: "whitepapers", label: "Whitepapers", count: 12 },
    { id: "case-studies", label: "Case Studies", count: 8 },
    { id: "documentation", label: "Documentation", count: 6 },
    { id: "webinars", label: "Webinars", count: 5 }
  ];

  const featuredResources = [
    {
      id: 1,
      type: "whitepaper",
      title: "The Future of AI in Cybersecurity: 2024 Enterprise Report",
      description: "Comprehensive analysis of AI-powered security trends, threat landscape evolution, and implementation strategies for modern enterprises.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop",
      readTime: "15 min read",
      downloads: "2.3K",
      category: "Security",
      featured: true,
      tags: ["AI Security", "Enterprise", "Threat Detection", "2024 Trends"]
    },
    {
      id: 2,
      type: "case-study",
      title: "Kenya Commercial Bank: 95% Reduction in Security Incidents",
      description: "How KCB implemented Datacare's AI-powered security platform to dramatically improve threat detection and incident response times.",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=200&fit=crop",
      readTime: "8 min read",
      views: "5.2K",
      category: "Banking",
      featured: true,
      tags: ["Case Study", "Banking", "AI Security", "Success Story"]
    },
    {
      id: 3,
      type: "blog",
      title: "Building Resilient Cloud Infrastructure with AI Monitoring",
      description: "Best practices for implementing intelligent monitoring solutions that predict and prevent infrastructure failures before they impact business operations.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
      readTime: "12 min read",
      views: "3.8K",
      category: "Cloud",
      featured: true,
      tags: ["Cloud Infrastructure", "AI Monitoring", "Best Practices", "DevOps"]
    }
  ];

  const allResources = [
    // Blog Posts
    {
      id: 4,
      type: "blog",
      title: "Zero Trust Architecture: Implementation Guide for East African Enterprises",
      description: "Step-by-step guide to implementing zero trust security frameworks in emerging market environments.",
      readTime: "10 min read",
      views: "2.1K",
      date: "Dec 15, 2024",
      category: "Security",
      tags: ["Zero Trust", "Security", "Implementation"]
    },
    {
      id: 5,
      type: "blog",
      title: "AI-Powered Predictive Analytics: ROI Analysis and Business Impact",
      description: "Quantifying the business value of predictive analytics implementations across different industry verticals.",
      readTime: "8 min read",
      views: "1.9K",
      date: "Dec 12, 2024",
      category: "Analytics",
      tags: ["Predictive Analytics", "ROI", "Business Intelligence"]
    },
    {
      id: 6,
      type: "blog",
      title: "Edge Computing in Manufacturing: Real-world Applications and Benefits",
      description: "Exploring how edge computing and IoT integration are transforming manufacturing operations across Africa.",
      readTime: "14 min read",
      views: "1.7K",
      date: "Dec 8, 2024",
      category: "Manufacturing",
      tags: ["Edge Computing", "IoT", "Manufacturing", "Industry 4.0"]
    },
    
    // Whitepapers
    {
      id: 7,
      type: "whitepaper",
      title: "Digital Transformation Roadmap for African Financial Institutions",
      description: "Comprehensive framework for modernizing core banking systems with cloud-native architectures and AI integration.",
      readTime: "25 min read",
      downloads: "1.8K",
      date: "Nov 28, 2024",
      category: "Banking",
      tags: ["Digital Transformation", "Banking", "Cloud", "AI"]
    },
    {
      id: 8,
      type: "whitepaper",
      title: "Healthcare Data Security: GDPR and Local Compliance in the AI Era",
      description: "Navigating data protection regulations while leveraging AI for improved patient outcomes and operational efficiency.",
      readTime: "20 min read",
      downloads: "1.2K",
      date: "Nov 20, 2024",
      category: "Healthcare",
      tags: ["Healthcare", "Data Security", "GDPR", "Compliance"]
    },
    
    // Case Studies
    {
      id: 9,
      type: "case-study",
      title: "Safaricom: Scaling Network Operations with AI-Driven Monitoring",
      description: "How Africa's leading telecom operator achieved 80% reduction in network downtime using predictive analytics.",
      readTime: "12 min read",
      views: "4.2K",
      date: "Nov 15, 2024",
      category: "Telecommunications",
      tags: ["Telecommunications", "Network Monitoring", "AI", "Scale"]
    },
    {
      id: 10,
      type: "case-study",
      title: "University of Nairobi: Digital Campus Transformation",
      description: "Complete digital infrastructure overhaul supporting 50,000+ students with cloud-based learning platforms.",
      readTime: "10 min read",
      views: "2.8K",
      date: "Nov 10, 2024",
      category: "Education",
      tags: ["Education", "Digital Transformation", "Cloud", "E-learning"]
    },
    
    // Documentation
    {
      id: 11,
      type: "documentation",
      title: "API Reference: DataMind Analytics Platform",
      description: "Complete API documentation for integrating with our business intelligence and analytics platform.",
      readTime: "30 min read",
      views: "3.1K",
      date: "Updated Dec 1, 2024",
      category: "Developer",
      tags: ["API", "Documentation", "Analytics", "Integration"]
    },
    {
      id: 12,
      type: "documentation",
      title: "Security AI Configuration Guide",
      description: "Detailed setup and configuration instructions for deploying AI-powered security solutions.",
      readTime: "45 min read",
      views: "2.5K",
      date: "Updated Nov 25, 2024",
      category: "Security",
      tags: ["Security", "Configuration", "AI", "Setup"]
    },
    
    // Webinars
    {
      id: 13,
      type: "webinar",
      title: "Live Demo: Next-Gen Backup & Disaster Recovery Solutions",
      description: "Interactive demonstration of AI-optimized backup strategies and automated disaster recovery processes.",
      duration: "45 min",
      attendees: "320",
      date: "Dec 20, 2024 at 2:00 PM EAT",
      category: "Backup & Recovery",
      tags: ["Webinar", "Live Demo", "Backup", "Disaster Recovery"],
      upcoming: true
    },
    {
      id: 14,
      type: "webinar",
      title: "Recorded: Building Secure Cloud Architectures for African Markets",
      description: "Expert panel discussion on cloud security best practices specific to emerging market challenges.",
      duration: "60 min",
      views: "1.8K",
      date: "Nov 30, 2024",
      category: "Cloud Security",
      tags: ["Cloud Security", "Panel Discussion", "Best Practices"]
    }
  ];

  const filteredResources = allResources.filter(resource => {
    const matchesCategory = activeCategory === "all" || resource.type === activeCategory.replace("-", "");
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "blog": return BookOpen;
      case "whitepaper": return FileText;
      case "case-study": return Target;
      case "documentation": return Code;
      case "webinar": return PlayCircle;
      default: return FileText;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case "blog": return "from-blue-500 to-blue-600";
      case "whitepaper": return "from-purple-500 to-purple-600";
      case "case-study": return "from-green-500 to-green-600";
      case "documentation": return "from-orange-500 to-orange-600";
      case "webinar": return "from-red-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Lightbulb className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Knowledge Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Expert Resources</span><br />
              & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the latest insights, best practices, and thought leadership in AI-powered IT solutions. 
              From implementation guides to industry case studies, find everything you need to succeed.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, topics, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Resources</h2>
              <p className="text-muted-foreground">Our most popular and impactful content</p>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              Curated by our experts
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {featuredResources.map((resource, index) => {
              const Icon = getResourceIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="card-elevated group cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-xl mb-4">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getResourceColor(resource.type)} text-white text-xs font-semibold flex items-center`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1).replace("-", " ")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                        {resource.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.readTime}
                      </div>
                      {resource.downloads && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Download className="w-3 h-3 mr-1" />
                          {resource.downloads}
                        </div>
                      )}
                      {resource.views && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          {resource.views}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories & Filters */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-[var(--shadow-medium)]'
                    : 'bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeCategory === category.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => {
              const Icon = getResourceIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="card-elevated group cursor-pointer relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {resource.upcoming && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      Upcoming
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getResourceColor(resource.type)} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{resource.date}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        {resource.readTime && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.readTime}
                          </div>
                        )}
                        {resource.duration && (
                          <div className="flex items-center">
                            <PlayCircle className="w-3 h-3 mr-1" />
                            {resource.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {resource.views && (
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {resource.views}
                        </div>
                      )}
                      {resource.downloads && (
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {resource.downloads}
                        </div>
                      )}
                      {resource.attendees && (
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {resource.attendees}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      {resource.type === "webinar" && resource.upcoming ? "Register" : "View"}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or category filters
              </p>
              <Button onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter & Updates */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest resources, industry insights, and product updates delivered directly to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-primary">
              Subscribe to Newsletter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline">
              Follow on LinkedIn
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly industry insights
            </div>
            <div className="flex items-center justify-center">
              <Award className="w-4 h-4 mr-2" />
              Exclusive expert content
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No spam, unsubscribe anytime
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;