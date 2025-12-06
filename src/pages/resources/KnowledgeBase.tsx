import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Search,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  ChevronRight,
  Filter,
  Zap,
  Shield,
  Cloud,
  MessageSquare,
  Globe,
  Briefcase,
  Settings,
  Users,
  FileText,
  ThumbsUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { knowledgeBaseArticles } from "@/data/knowledgeBaseArticles";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  popular: boolean;
  views: number;
  helpful: number;
  lastUpdated: string;
}

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Calculate actual category counts from real articles
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "All") return knowledgeBaseArticles.length;
    return knowledgeBaseArticles.filter(a => a.category === categoryName).length;
  };

  const categories = [
    { name: "All", icon: BookOpen, count: getCategoryCount("All"), color: "text-blue-600" },
    { name: "Employee Amplification", icon: Zap, count: getCategoryCount("Employee Amplification"), color: "text-orange-600" },
    { name: "Cloud & Productivity", icon: Cloud, count: getCategoryCount("Cloud & Productivity"), color: "text-purple-600" },
    { name: "Communication & Automation", icon: MessageSquare, count: getCategoryCount("Communication & Automation"), color: "text-green-600" },
    { name: "Security & Compliance", icon: Shield, count: getCategoryCount("Security & Compliance"), color: "text-red-600" }
  ];

  // Use real articles from knowledge base data
  const articles: Article[] = knowledgeBaseArticles.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    tags: article.tags,
    readTime: article.readTime,
    difficulty: article.difficulty,
    popular: article.popular,
    views: article.views,
    helpful: article.helpful,
    lastUpdated: article.lastUpdated
  }));

  // Placeholder articles for future expansion
  const placeholderArticles: Article[] = [
    // Employee Amplification Articles
    {
      id: "what-is-employee-amplification",
      title: "What is Employee Amplification and How Does It Work?",
      excerpt: "Learn how Employee Amplification helps organizations recapture 20+ hours per week of senior staff capacity through strategic workflow optimization and intelligent automation.",
      category: "Employee Amplification",
      tags: ["Employee Amplification", "Productivity", "Workflow Optimization"],
      readTime: "8 min",
      difficulty: "Beginner",
      popular: true,
      views: 2847,
      helpful: 156,
      lastUpdated: "2025-01-15"
    },
    {
      id: "ea-vs-traditional-automation",
      title: "Employee Amplification vs Traditional Automation: What's the Difference?",
      excerpt: "Understand the key differences between Employee Amplification and traditional automation, and why EA delivers higher adoption rates and better ROI.",
      category: "Employee Amplification",
      tags: ["Employee Amplification", "Automation", "Comparison"],
      readTime: "6 min",
      difficulty: "Beginner",
      popular: true,
      views: 1923,
      helpful: 142,
      lastUpdated: "2025-01-12"
    },
    {
      id: "calculating-roi-employee-amplification",
      title: "How to Calculate ROI for Employee Amplification Projects",
      excerpt: "Step-by-step guide to measuring the return on investment for Employee Amplification, including hidden cost calculation and capacity recapture metrics.",
      category: "Employee Amplification",
      tags: ["ROI", "Metrics", "Business Value"],
      readTime: "10 min",
      difficulty: "Intermediate",
      popular: true,
      views: 1654,
      helpful: 128,
      lastUpdated: "2025-01-10"
    },
    {
      id: "ea-implementation-timeline",
      title: "What to Expect: Employee Amplification Implementation Timeline",
      excerpt: "Detailed breakdown of the 30-90 day implementation process, from capacity assessment to go-live and optimization.",
      category: "Employee Amplification",
      tags: ["Implementation", "Timeline", "Process"],
      readTime: "7 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1203,
      helpful: 94,
      lastUpdated: "2025-01-08"
    },
    {
      id: "ea-industry-use-cases",
      title: "Employee Amplification by Industry: Real-World Use Cases",
      excerpt: "Explore how banking, healthcare, legal, and other industries are using Employee Amplification to transform capacity and drive growth.",
      category: "Employee Amplification",
      tags: ["Use Cases", "Industries", "Case Studies"],
      readTime: "12 min",
      difficulty: "Beginner",
      popular: true,
      views: 1876,
      helpful: 132,
      lastUpdated: "2025-01-05"
    },
    {
      id: "ea-pricing-guide",
      title: "Understanding Employee Amplification Pricing: Per-Employee vs Packages",
      excerpt: "Complete guide to EA pricing models, payment options, and how to choose the right package for your organization size.",
      category: "Employee Amplification",
      tags: ["Pricing", "Investment", "Packages"],
      readTime: "8 min",
      difficulty: "Beginner",
      popular: false,
      views: 1432,
      helpful: 103,
      lastUpdated: "2025-01-15"
    },
    {
      id: "ea-change-management",
      title: "Change Management for Employee Amplification: Getting Team Buy-In",
      excerpt: "Proven strategies for introducing Employee Amplification to your team and achieving 90%+ adoption rates.",
      category: "Employee Amplification",
      tags: ["Change Management", "Team Adoption", "Leadership"],
      readTime: "9 min",
      difficulty: "Advanced",
      popular: false,
      views: 987,
      helpful: 76,
      lastUpdated: "2025-01-03"
    },
    {
      id: "ea-success-metrics",
      title: "Key Metrics to Track Employee Amplification Success",
      excerpt: "Essential KPIs and metrics for measuring EA impact: capacity recapture, time savings, revenue impact, and team satisfaction.",
      category: "Employee Amplification",
      tags: ["Metrics", "KPIs", "Measurement"],
      readTime: "7 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1145,
      helpful: 89,
      lastUpdated: "2025-01-01"
    },

    // Microsoft 365 & Cloud Articles
    {
      id: "microsoft365-plans-comparison",
      title: "Which Microsoft 365 Plan is Right for Your Business?",
      excerpt: "Comprehensive comparison of Business Basic ($6), Business Standard ($12.50), and Business Premium ($22) plans with recommendations for different business needs.",
      category: "Cloud & Licensing",
      tags: ["Microsoft 365", "Pricing", "Planning"],
      readTime: "12 min",
      difficulty: "Beginner",
      popular: true,
      views: 3421,
      helpful: 218,
      lastUpdated: "2024-12-28"
    },
    {
      id: "microsoft365-migration-guide",
      title: "Step-by-Step Guide to Migrating to Microsoft 365",
      excerpt: "Complete migration guide covering planning, data transfer, user training, and go-live for businesses moving to Microsoft 365 from on-premise or other cloud platforms.",
      category: "Cloud & Licensing",
      tags: ["Microsoft 365", "Migration", "Implementation"],
      readTime: "15 min",
      difficulty: "Advanced",
      popular: true,
      views: 2156,
      helpful: 167,
      lastUpdated: "2024-12-25"
    },
    {
      id: "google-workspace-vs-microsoft365",
      title: "Google Workspace vs Microsoft 365: Which Should You Choose?",
      excerpt: "Detailed comparison of features, pricing, collaboration tools, and use cases to help you choose between Google Workspace and Microsoft 365.",
      category: "Cloud & Licensing",
      tags: ["Google Workspace", "Microsoft 365", "Comparison"],
      readTime: "10 min",
      difficulty: "Beginner",
      popular: true,
      views: 2789,
      helpful: 193,
      lastUpdated: "2024-12-20"
    },
    {
      id: "microsoft365-security-features",
      title: "Microsoft 365 Advanced Security Features Explained",
      excerpt: "Deep dive into Advanced Threat Protection, Conditional Access, Information Protection, and other security features in Microsoft 365 Business Premium.",
      category: "Cloud & Licensing",
      tags: ["Microsoft 365", "Security", "Compliance"],
      readTime: "13 min",
      difficulty: "Advanced",
      popular: false,
      views: 1432,
      helpful: 112,
      lastUpdated: "2024-12-15"
    },
    {
      id: "teams-productivity-tips",
      title: "25 Microsoft Teams Features Your Team Isn't Using",
      excerpt: "Unlock hidden productivity gains with these underutilized Teams features: channels, tabs, apps, automation, and advanced meeting controls.",
      category: "Cloud & Licensing",
      tags: ["Microsoft Teams", "Productivity", "Tips"],
      readTime: "11 min",
      difficulty: "Intermediate",
      popular: true,
      views: 2034,
      helpful: 156,
      lastUpdated: "2024-12-10"
    },
    {
      id: "onedrive-best-practices",
      title: "OneDrive Best Practices for Business: Security, Sharing, and Sync",
      excerpt: "Essential OneDrive configuration, security policies, file sharing best practices, and troubleshooting common sync issues.",
      category: "Cloud & Licensing",
      tags: ["OneDrive", "Cloud Storage", "Best Practices"],
      readTime: "9 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1567,
      helpful: 98,
      lastUpdated: "2024-12-05"
    },
    {
      id: "microsoft365-training-program",
      title: "Building an Effective Microsoft 365 Training Program for Your Team",
      excerpt: "How to design and implement user training for Microsoft 365 adoption, including resources, timelines, and measuring success.",
      category: "Cloud & Licensing",
      tags: ["Training", "User Adoption", "Change Management"],
      readTime: "8 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1243,
      helpful: 87,
      lastUpdated: "2024-12-01"
    },

    // AI & Automation Articles
    {
      id: "whatsapp-business-api-security",
      title: "How Secure is WhatsApp Business API for Customer Communications?",
      excerpt: "Complete guide to WhatsApp Business API security: end-to-end encryption, compliance, data protection, and business verification.",
      category: "AI & Automation",
      tags: ["WhatsApp", "Security", "API"],
      readTime: "8 min",
      difficulty: "Intermediate",
      popular: true,
      views: 2456,
      helpful: 174,
      lastUpdated: "2024-12-28"
    },
    {
      id: "whatsapp-automation-use-cases",
      title: "10 WhatsApp Automation Use Cases for Kenyan Businesses",
      excerpt: "Real-world examples: appointment reminders, order confirmations, customer support, payment notifications, and more.",
      category: "AI & Automation",
      tags: ["WhatsApp", "Automation", "Use Cases"],
      readTime: "10 min",
      difficulty: "Beginner",
      popular: true,
      views: 2134,
      helpful: 156,
      lastUpdated: "2024-12-22"
    },
    {
      id: "ai-chatbot-implementation",
      title: "Implementing AI Chatbots: Best Practices for Customer Service",
      excerpt: "How to design, implement, and optimize AI chatbots for customer service, including conversation design, training data, and human handoff.",
      category: "AI & Automation",
      tags: ["AI", "Chatbots", "Customer Service"],
      readTime: "12 min",
      difficulty: "Advanced",
      popular: false,
      views: 1678,
      helpful: 123,
      lastUpdated: "2024-12-18"
    },
    {
      id: "workflow-automation-basics",
      title: "Workflow Automation 101: Where to Start",
      excerpt: "Beginner's guide to identifying automation opportunities, choosing the right tools, and implementing your first automated workflows.",
      category: "AI & Automation",
      tags: ["Automation", "Workflows", "Getting Started"],
      readTime: "9 min",
      difficulty: "Beginner",
      popular: true,
      views: 1923,
      helpful: 142,
      lastUpdated: "2024-12-15"
    },
    {
      id: "api-integration-guide",
      title: "Connecting Your Business Systems: API Integration Guide",
      excerpt: "How to integrate your CRM, ERP, and other business systems using APIs to create seamless data flow and automated processes.",
      category: "AI & Automation",
      tags: ["APIs", "Integration", "Systems"],
      readTime: "14 min",
      difficulty: "Advanced",
      popular: false,
      views: 1345,
      helpful: 98,
      lastUpdated: "2024-12-10"
    },
    {
      id: "datacare-messaging-platform",
      title: "Datacare Messaging Platform: Features, Pricing, and Use Cases",
      excerpt: "Complete guide to our unified messaging platform for SMS, WhatsApp, and email automation, including setup and pricing.",
      category: "AI & Automation",
      tags: ["Messaging Platform", "WhatsApp", "SMS"],
      readTime: "11 min",
      difficulty: "Beginner",
      popular: false,
      views: 1789,
      helpful: 134,
      lastUpdated: "2024-12-05"
    },

    // Web Design Articles
    {
      id: "web-design-retainer-packages",
      title: "What's Included in Datacare's Web Design Retainer Packages?",
      excerpt: "Detailed breakdown of Starter ($299), Growth ($599), and Enterprise ($1,299) monthly retainer packages for ongoing website maintenance and development.",
      category: "Web Design",
      tags: ["Web Design", "Retainer", "Pricing"],
      readTime: "10 min",
      difficulty: "Beginner",
      popular: true,
      views: 2234,
      helpful: 167,
      lastUpdated: "2024-12-28"
    },
    {
      id: "website-redesign-process",
      title: "The Complete Website Redesign Process: What to Expect",
      excerpt: "Step-by-step guide to redesigning your website: discovery, design, development, content migration, testing, and launch.",
      category: "Web Design",
      tags: ["Redesign", "Process", "Planning"],
      readTime: "12 min",
      difficulty: "Intermediate",
      popular: true,
      views: 1876,
      helpful: 142,
      lastUpdated: "2024-12-20"
    },
    {
      id: "seo-fundamentals-kenya",
      title: "SEO Fundamentals for Kenyan Businesses: Local Search Optimization",
      excerpt: "Essential SEO strategies for ranking in Kenyan Google search results, including local SEO, keyword research, and technical optimization.",
      category: "Web Design",
      tags: ["SEO", "Local Search", "Kenya"],
      readTime: "13 min",
      difficulty: "Intermediate",
      popular: true,
      views: 2456,
      helpful: 189,
      lastUpdated: "2024-12-15"
    },
    {
      id: "website-performance-optimization",
      title: "Website Speed Optimization: Making Your Site Blazing Fast",
      excerpt: "Technical guide to improving website loading speed: image optimization, caching, CDN, code minification, and Core Web Vitals.",
      category: "Web Design",
      tags: ["Performance", "Speed", "Technical"],
      readTime: "11 min",
      difficulty: "Advanced",
      popular: false,
      views: 1543,
      helpful: 112,
      lastUpdated: "2024-12-10"
    },
    {
      id: "wordpress-vs-custom-development",
      title: "WordPress vs Custom Development: Which is Right for Your Business?",
      excerpt: "Pros, cons, costs, and use cases for WordPress websites versus custom-coded solutions. Make an informed decision for your project.",
      category: "Web Design",
      tags: ["WordPress", "Development", "Planning"],
      readTime: "9 min",
      difficulty: "Beginner",
      popular: false,
      views: 1678,
      helpful: 123,
      lastUpdated: "2024-12-05"
    },

    // Security & Compliance Articles
    {
      id: "kenya-data-protection-act",
      title: "Kenya Data Protection Act 2019: What Your Business Needs to Know",
      excerpt: "Complete guide to KDPA compliance: data collection, consent, storage, breach notification, and penalties for non-compliance.",
      category: "Security & Compliance",
      tags: ["Compliance", "Data Protection", "Legal"],
      readTime: "15 min",
      difficulty: "Advanced",
      popular: true,
      views: 2123,
      helpful: 178,
      lastUpdated: "2024-12-25"
    },
    {
      id: "cloud-security-best-practices",
      title: "Cloud Security Best Practices for East African Enterprises",
      excerpt: "Essential security measures for protecting cloud infrastructure: access controls, encryption, monitoring, backup, and incident response.",
      category: "Security & Compliance",
      tags: ["Cloud Security", "Best Practices", "Enterprise"],
      readTime: "12 min",
      difficulty: "Advanced",
      popular: true,
      views: 1789,
      helpful: 134,
      lastUpdated: "2024-12-20"
    },
    {
      id: "cybersecurity-basics-smes",
      title: "Cybersecurity Basics Every SME Should Implement",
      excerpt: "Essential cybersecurity measures for small businesses: passwords, 2FA, antivirus, firewalls, employee training, and incident planning.",
      category: "Security & Compliance",
      tags: ["Cybersecurity", "SME", "Basics"],
      readTime: "8 min",
      difficulty: "Beginner",
      popular: true,
      views: 2456,
      helpful: 198,
      lastUpdated: "2024-12-15"
    },
    {
      id: "backup-disaster-recovery",
      title: "Backup and Disaster Recovery Planning for Businesses",
      excerpt: "How to design and implement a comprehensive backup and disaster recovery plan: 3-2-1 rule, testing, RTO/RPO, and cloud backup solutions.",
      category: "Security & Compliance",
      tags: ["Backup", "Disaster Recovery", "Business Continuity"],
      readTime: "14 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1432,
      helpful: 109,
      lastUpdated: "2024-12-10"
    },

    // Digital Transformation Articles
    {
      id: "digital-transformation-roadmap",
      title: "Creating a Digital Transformation Roadmap for Your Organization",
      excerpt: "Strategic guide to planning and executing digital transformation: assessment, prioritization, implementation, and change management.",
      category: "Digital Transformation",
      tags: ["Digital Transformation", "Strategy", "Planning"],
      readTime: "13 min",
      difficulty: "Advanced",
      popular: true,
      views: 1876,
      helpful: 145,
      lastUpdated: "2024-12-22"
    },
    {
      id: "sme-digitalization-kenya",
      title: "SME Digitalization in Kenya: Where to Start",
      excerpt: "Practical guide for Kenyan SMEs starting their digital journey: basic IT infrastructure, cloud adoption, and digital marketing.",
      category: "Digital Transformation",
      tags: ["SME", "Digitalization", "Kenya"],
      readTime: "10 min",
      difficulty: "Beginner",
      popular: true,
      views: 2234,
      helpful: 167,
      lastUpdated: "2024-12-18"
    },
    {
      id: "remote-work-infrastructure",
      title: "Building Remote Work Infrastructure for Distributed Teams",
      excerpt: "Complete guide to setting up remote work: collaboration tools, security, communication, project management, and team culture.",
      category: "Digital Transformation",
      tags: ["Remote Work", "Infrastructure", "Collaboration"],
      readTime: "11 min",
      difficulty: "Intermediate",
      popular: false,
      views: 1543,
      helpful: 118,
      lastUpdated: "2024-12-12"
    },

    // Getting Started Articles
    {
      id: "working-with-datacare",
      title: "How to Get Started with Datacare: Onboarding Process",
      excerpt: "What to expect when working with Datacare: consultation, proposal, implementation, training, and ongoing support.",
      category: "Getting Started",
      tags: ["Onboarding", "Process", "Support"],
      readTime: "7 min",
      difficulty: "Beginner",
      popular: true,
      views: 1789,
      helpful: 134,
      lastUpdated: "2025-01-10"
    },
    {
      id: "service-level-agreements",
      title: "Understanding Datacare Service Level Agreements (SLAs)",
      excerpt: "Detailed explanation of our SLAs: response times, uptime guarantees, support channels, and escalation procedures.",
      category: "Getting Started",
      tags: ["SLA", "Support", "Guarantees"],
      readTime: "9 min",
      difficulty: "Beginner",
      popular: false,
      views: 1234,
      helpful: 92,
      lastUpdated: "2025-01-05"
    }
  ];

  // Filter articles based on search, category, and difficulty
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || article.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const popularArticles = articles.filter(a => a.popular).sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Knowledge Base - Expert IT Guides & Resources | Datacare Limited"
        description="In-depth guides and expert resources on Employee Amplification, Microsoft 365, WhatsApp Business API, KDPA compliance, and digital transformation for Kenyan businesses."
        keywords="IT knowledge base, Microsoft 365 guide, employee amplification, KDPA compliance, WhatsApp Business API, digital transformation Kenya, cloud solutions Kenya"
        url="https://datacare.co.ke/resources/knowledge-base"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 mb-6">
              <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">Knowledge Base</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Expert Guides for <span className="gradient-text">Smarter Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              In-depth, actionable guides on Employee Amplification, Microsoft 365, compliance, and digital transformation—everything you need to grow your Kenyan business
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, solutions..."
                  className="pl-12 pr-4 py-6 text-lg shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{articles.length} Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="font-semibold">{articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()} Total Views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-orange-600" />
                <span className="font-semibold">{articles.reduce((sum, a) => sum + a.helpful, 0)} Helpful Votes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">

            {/* Sidebar - Categories & Filters */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">

                {/* Categories */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Categories</h3>
                  </div>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                            selectedCategory === cat.name
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${selectedCategory === cat.name ? 'text-white' : cat.color}`} />
                            <span className="text-sm font-medium">{cat.name}</span>
                          </div>
                          <Badge variant={selectedCategory === cat.name ? "secondary" : "outline"}>
                            {cat.count}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Difficulty Filter */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Difficulty Level</h3>
                  <div className="space-y-2">
                    {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                          selectedDifficulty === level
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Popular Articles */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Most Popular</h3>
                  </div>
                  <div className="space-y-3">
                    {popularArticles.map((article, index) => (
                      <Link
                        key={article.id}
                        to={`/resources/knowledge-base/${article.id}`}
                        className="block p-2 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-orange-600 transition-colors">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {article.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Need Help CTA */}
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950 border-none">
                  <h3 className="font-bold text-lg mb-2">Can't Find What You Need?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our experts are here to help with personalized guidance.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/contact">
                      Contact Support
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">

              {/* Results Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === "All" ? "All Articles" : selectedCategory}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                {(selectedCategory !== "All" || selectedDifficulty !== "All" || searchQuery) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedDifficulty("All");
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Articles Grid */}
              {filteredArticles.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                  }}>
                    Clear All Filters
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="p-6 hover:shadow-xl transition-all duration-300 group" id={article.id}>
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                article.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                                article.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}
                            >
                              {article.difficulty}
                            </Badge>
                            {article.popular && (
                              <Badge className="text-xs bg-orange-600">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {article.views.toLocaleString()} views
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {article.helpful} helpful
                              </span>
                              <span className="text-xs">
                                Updated: {new Date(article.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="group-hover:text-orange-600">
                              <Link to={`/resources/knowledge-base/${article.id}`}>
                                Read Article
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our solutions can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/employee-amplification#get-started">
                Get Free Assessment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowledgeBase;
