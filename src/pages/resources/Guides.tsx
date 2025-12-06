import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  BookOpen,
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Shield,
  MessageSquare,
  Cloud
} from "lucide-react";
import { Link } from "react-router-dom";

const Guides = () => {
  const featuredResources = [
    {
      id: "employee-amplification-guide",
      title: "Complete Guide to Employee Amplification",
      description: "Transform buried capacity into competitive advantage. Learn how to recapture 20+ hours/week per senior employee with our proven 3-step methodology.",
      category: "Employee Amplification",
      readTime: "8 min read",
      difficulty: "Beginner",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      popular: true,
      link: "/resources/knowledge-base/employee-amplification-guide",
      relatedTopics: ["Productivity", "Workflow Optimization", "ROI"]
    },
    {
      id: "microsoft-365-plans",
      title: "Microsoft 365 Business Plans: Complete Comparison Guide",
      description: "Comprehensive breakdown of Microsoft 365 plans for Kenyan businesses. Compare pricing, features, and find the perfect fit for your organization.",
      category: "Cloud & Productivity",
      readTime: "10 min read",
      difficulty: "Intermediate",
      icon: Cloud,
      color: "from-blue-500 to-blue-600",
      popular: true,
      link: "/resources/knowledge-base/microsoft-365-plans-comparison",
      relatedTopics: ["Microsoft 365", "Cloud Migration", "Licensing"]
    },
    {
      id: "whatsapp-security",
      title: "WhatsApp Business API Security: Complete Guide for Kenyan Businesses",
      description: "Everything you need to know about securing your WhatsApp Business API implementation, from end-to-end encryption to KDPA compliance.",
      category: "Communication & Automation",
      readTime: "12 min read",
      difficulty: "Advanced",
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      popular: true,
      link: "/resources/knowledge-base/whatsapp-business-api-security",
      relatedTopics: ["WhatsApp API", "Security", "Compliance"]
    },
    {
      id: "kdpa-compliance",
      title: "Kenya Data Protection Act 2019: Complete Compliance Guide",
      description: "Step-by-step roadmap to KDPA compliance for Kenyan businesses. Includes checklist, requirements, penalties, and best practices.",
      category: "Security & Compliance",
      readTime: "15 min read",
      difficulty: "Advanced",
      icon: Shield,
      color: "from-red-500 to-red-600",
      popular: true,
      link: "/resources/knowledge-base/kenya-data-protection-act-2019",
      relatedTopics: ["KDPA", "Compliance", "Data Protection"]
    }
  ];

  const quickStartGuides = [
    {
      title: "10 Signs You Need Employee Amplification",
      description: "Identify if your organization is ready for Employee Amplification transformation",
      link: "/resources/knowledge-base/10-signs-you-need-employee-amplification",
      category: "Employee Amplification",
      readTime: "5 min"
    },
    {
      title: "Google Workspace vs Microsoft 365",
      description: "Complete comparison to help you choose the right platform",
      link: "/resources/knowledge-base/google-workspace-vs-microsoft-365",
      category: "Cloud & Productivity",
      readTime: "8 min"
    }
  ];

  const resourceCategories = [
    {
      name: "Employee Amplification",
      count: 2,
      description: "Boost team productivity without hiring",
      link: "/resources/knowledge-base?category=employee-amplification"
    },
    {
      name: "Cloud & Productivity",
      count: 2,
      description: "Microsoft 365 and Google Workspace guides",
      link: "/resources/knowledge-base?category=cloud-productivity"
    },
    {
      name: "Security & Compliance",
      count: 2,
      description: "KDPA, cybersecurity, and data protection",
      link: "/resources/knowledge-base?category=security-compliance"
    },
    {
      name: "Communication & Automation",
      count: 1,
      description: "WhatsApp API and messaging automation",
      link: "/resources/knowledge-base?category=communication-automation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Business Guides & Resources | Datacare Limited"
        description="Expert guides on Employee Amplification, Microsoft 365, WhatsApp automation, KDPA compliance, and digital transformation for East African businesses."
        keywords="business guides Kenya, employee amplification, Microsoft 365 guide, KDPA compliance, WhatsApp automation, digital transformation resources"
        url="https://datacare.co.ke/resources/guides"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Free Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Expert Guides</span><br />
              for Modern Businesses
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive guides, practical frameworks, and proven strategies to accelerate
              your digital transformation and business growth
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Expert Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">40K+</div>
                <div className="text-sm text-muted-foreground">Words of Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Free Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">12+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured <span className="gradient-text">Guides</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In-depth resources covering our most popular topics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={resource.id}
                  className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                    resource.popular ? 'ring-2 ring-primary/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {resource.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-orange-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Header */}
                  <div className="p-6 border-b border-border">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Badge variant="outline">{resource.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.readTime}
                      </div>
                      <Badge variant="secondary">{resource.difficulty}</Badge>
                    </div>
                  </div>

                  {/* Related Topics */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">You'll Learn About:</h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.relatedTopics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                      <Link to={resource.link}>
                        Read Full Guide
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

      {/* Quick Start Guides */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Quick <span className="gradient-text">Start Guides</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Shorter reads for specific questions and use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quickStartGuides.map((guide, index) => (
              <Card
                key={guide.title}
                className="p-6 hover:shadow-xl transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{guide.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime}
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={guide.link}>
                          Read
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore guides organized by topic area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <Card
                key={category.name}
                className="p-6 text-center hover:shadow-xl transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-xs text-primary font-semibold mb-4">
                  {category.count} {category.count === 1 ? 'Guide' : 'Guides'} Available
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={category.link}>
                    Explore Category
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore Our Complete <span className="gradient-text">Knowledge Base</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Access all our guides, articles, and resources in one place with powerful search and filtering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
              <Link to="/resources/knowledge-base">
                Browse All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/resources/case-studies">
                View Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help Implementing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our experts can help you apply these strategies to your specific business context
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

export default Guides;
