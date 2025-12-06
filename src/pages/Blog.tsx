import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample blog posts data - replace with actual data from CMS/API
  const blogPosts = [
    {
      id: "employee-amplification-guide-2025",
      title: "The Complete Guide to Employee Amplification in 2025",
      excerpt: "Discover how modern organizations are recapturing 20+ hours per week of senior staff capacity through strategic employee amplification.",
      author: "David Maina",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Employee Amplification",
      image: "/blog/employee-amplification-guide.jpg",
      isFeatured: true
    },
    {
      id: "kenya-digital-transformation-trends",
      title: "5 Digital Transformation Trends Shaping Kenya's Business Landscape",
      excerpt: "From AI adoption to cloud migration, explore the key technology trends transforming how Kenyan businesses operate in 2025.",
      author: "Sarah Njeri",
      date: "2025-01-10",
      readTime: "6 min read",
      category: "Digital Transformation",
      image: "/blog/kenya-digital-trends.jpg",
      isFeatured: true
    },
    {
      id: "microsoft365-productivity-tips",
      title: "10 Microsoft 365 Features Your Team Isn't Using (But Should Be)",
      excerpt: "Unlock hidden productivity gains with these underutilized Microsoft 365 features that can save your team hours every week.",
      author: "John Kamau",
      date: "2025-01-05",
      readTime: "5 min read",
      category: "Productivity",
      image: "/blog/microsoft365-tips.jpg",
      isFeatured: false
    },
    {
      id: "ai-automation-smes-kenya",
      title: "How SMEs in Kenya Can Leverage AI Automation Without Breaking the Bank",
      excerpt: "Practical, affordable AI automation strategies for small and medium businesses looking to compete in the digital age.",
      author: "David Maina",
      date: "2024-12-20",
      readTime: "7 min read",
      category: "AI & Automation",
      image: "/blog/ai-smes-kenya.jpg",
      isFeatured: false
    },
    {
      id: "cloud-security-best-practices",
      title: "Cloud Security Best Practices for East African Enterprises",
      excerpt: "Essential security measures to protect your cloud infrastructure while complying with Kenya Data Protection Act 2019.",
      author: "Sarah Njeri",
      date: "2024-12-15",
      readTime: "9 min read",
      category: "Security & Compliance",
      image: "/blog/cloud-security.jpg",
      isFeatured: false
    },
    {
      id: "roi-workflow-automation",
      title: "Calculating the Real ROI of Workflow Automation",
      excerpt: "A data-driven approach to measuring the return on investment from automation projects, with real-world case studies.",
      author: "John Kamau",
      date: "2024-12-10",
      readTime: "6 min read",
      category: "Business Strategy",
      image: "/blog/roi-automation.jpg",
      isFeatured: false
    }
  ];

  const categories = [
    "All Posts",
    "Employee Amplification",
    "Digital Transformation",
    "AI & Automation",
    "Productivity",
    "Security & Compliance",
    "Business Strategy"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog - Insights on Digital Transformation & Employee Amplification | Datacare Limited"
        description="Expert insights on employee amplification, digital transformation, cloud solutions, and business technology for East African enterprises. Stay ahead with Datacare's blog."
        keywords="digital transformation Kenya, employee amplification blog, cloud computing insights, business technology, AI automation, productivity tips, Kenya tech blog"
        url="https://datacare.co.ke/blog"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 via-background to-blue-50 dark:from-orange-950 dark:via-background dark:to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-800 mb-6">
              <TrendingUp className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-orange-600">Latest Insights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Datacare <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights on digital transformation, employee amplification, and business technology
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && selectedCategory === "All Posts" && featuredPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold">Featured Articles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 relative overflow-hidden">
                    {/* Placeholder for blog image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">📰</div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-600">{post.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="group-hover:text-orange-600">
                        <Link to={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white whitespace-nowrap"
                  : "whitespace-nowrap"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === "All Posts" ? "Latest Articles" : selectedCategory}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All Posts"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 relative overflow-hidden">
                    {/* Placeholder for blog image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl opacity-20">📄</div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-3 h-3 text-orange-600" />
                      <span className="text-xs font-semibold text-orange-600">{post.category}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-medium">{post.author}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="group-hover:text-orange-600 text-xs">
                        <Link to={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest insights on digital transformation and employee amplification delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-foreground"
            />
            <Button variant="secondary" size="lg" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
