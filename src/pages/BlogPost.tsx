import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Tag,
  ArrowRight
} from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Sample blog post data - replace with actual data from CMS/API
  const blogPost = {
    id: slug,
    title: "The Complete Guide to Employee Amplification in 2025",
    excerpt: "Discover how modern organizations are recapturing 20+ hours per week of senior staff capacity through strategic employee amplification.",
    author: "David Maina",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Employee Amplification",
    image: "/blog/employee-amplification-guide.jpg",
    content: `
      <h2>The Hidden Capacity Crisis</h2>
      <p>In today's fast-paced business environment, organizations across East Africa are facing a critical challenge: their most valuable employees are spending 60-70% of their time on repetitive, administrative tasks instead of strategic work that drives growth.</p>

      <p>This phenomenon, which we call "buried capacity," represents one of the most significant untapped opportunities for businesses looking to scale without proportionally increasing headcount.</p>

      <h2>What is Employee Amplification?</h2>
      <p>Employee Amplification is not traditional automation. It's a human-centered approach to dramatically increasing the capacity of your existing team by strategically removing repetitive work and redirecting that time toward high-value activities.</p>

      <p>The key differences:</p>
      <ul>
        <li><strong>Traditional Automation:</strong> Focuses on replacing tasks, often with low adoption rates</li>
        <li><strong>Employee Amplification:</strong> Focuses on amplifying humans, designed for maximum adoption and measurable results</li>
      </ul>

      <h2>The Three Pillars of Employee Amplification</h2>

      <h3>1. Map & Discover</h3>
      <p>We shadow your team for 1-2 weeks to map exactly where time goes. This detailed analysis reveals:</p>
      <ul>
        <li>Time spent on repetitive vs. strategic work</li>
        <li>Hidden bottlenecks in workflows</li>
        <li>Opportunities for capacity recapture</li>
        <li>Quick wins vs. long-term improvements</li>
      </ul>

      <h3>2. Design & Elevate</h3>
      <p>Using insights from the mapping phase, we design custom workflows and intelligent systems that remove repetitive tasks while keeping humans in control of what matters most.</p>

      <p>This includes:</p>
      <ul>
        <li>Process redesign for efficiency</li>
        <li>Smart automation where appropriate</li>
        <li>Integration of existing tools</li>
        <li>Training materials and documentation</li>
      </ul>

      <h3>3. Implement & Amplify</h3>
      <p>We implement solutions, train your team, and continuously refine based on real usage. The result: capacity is redirected to high-value work that drives revenue and growth.</p>

      <h2>Real Results from Real Organizations</h2>
      <p>Here's what Kenyan organizations are achieving with Employee Amplification:</p>

      <blockquote>
        <p>"We recovered 47 hours per week of senior analyst capacity. That translated to KES 18M in additional revenue within 6 months."</p>
        <cite>- Chief Operations Officer, Leading Kenyan Bank</cite>
      </blockquote>

      <blockquote>
        <p>"Our doctors were spending 4 hours daily on paperwork. Now it's 30 minutes. That's 15+ hours per week back to patient care."</p>
        <cite>- Hospital Administrator, Nairobi Healthcare Facility</cite>
      </blockquote>

      <h2>Getting Started with Employee Amplification</h2>
      <p>The journey begins with a complimentary 90-minute capacity assessment. During this session, we:</p>
      <ul>
        <li>Analyze your current workflows</li>
        <li>Identify buried capacity opportunities</li>
        <li>Provide ROI projections</li>
        <li>Create a customized implementation roadmap</li>
      </ul>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Employee Amplification is about amplifying humans, not replacing them</li>
        <li>Most organizations have 20+ hours per week of buried capacity per senior employee</li>
        <li>ROI typically appears within 60-90 days</li>
        <li>The approach requires strategic planning, not just technology</li>
        <li>Success depends on human-centered design and high adoption rates</li>
      </ul>

      <h2>Next Steps</h2>
      <p>If you're ready to unlock your team's hidden capacity and drive measurable business results, we invite you to schedule a complimentary assessment. No obligation, no sales pressure—just a strategic conversation about what's possible for your organization.</p>
    `
  };

  // Related posts
  const relatedPosts = [
    {
      id: "kenya-digital-transformation-trends",
      title: "5 Digital Transformation Trends Shaping Kenya's Business Landscape",
      category: "Digital Transformation",
      readTime: "6 min read"
    },
    {
      id: "roi-workflow-automation",
      title: "Calculating the Real ROI of Workflow Automation",
      category: "Business Strategy",
      readTime: "6 min read"
    },
    {
      id: "ai-automation-smes-kenya",
      title: "How SMEs in Kenya Can Leverage AI Automation Without Breaking the Bank",
      category: "AI & Automation",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${blogPost.title} | Datacare Limited Blog`}
        description={blogPost.excerpt}
        keywords={`${blogPost.category}, employee amplification, digital transformation Kenya, business technology`}
        url={`https://datacare.co.ke/blog/${slug}`}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-orange-50 via-background to-blue-50 dark:from-orange-950 dark:via-background dark:to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">{blogPost.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blogPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 rounded-2xl overflow-hidden shadow-xl">
            {/* Placeholder for featured image */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-9xl opacity-20">📰</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </article>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  {blogPost.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">{blogPost.author}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Amplify Your Team's Capacity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Schedule a complimentary 90-minute capacity assessment with our experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white">
              <Link to="/employee-amplification#get-started">
                Get Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/employee-amplification#calculator">
                Calculate Your ROI
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-orange-600" />
                  <span className="text-xs font-semibold text-orange-600">{post.category}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <Button asChild variant="ghost" size="sm" className="group-hover:text-orange-600">
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
