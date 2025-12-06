import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  BookOpen,
  List,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Check
} from "lucide-react";
import { knowledgeBaseArticles } from "@/data/knowledgeBaseArticles";

const KnowledgeBaseArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Find the article by ID
  const article = knowledgeBaseArticles.find(a => a.id === slug);

  // Get related articles
  const relatedArticles = article?.relatedArticles
    ? knowledgeBaseArticles.filter(a => article.relatedArticles?.includes(a.id))
    : knowledgeBaseArticles
        .filter(a => a.category === article?.category && a.id !== article?.id)
        .slice(0, 3);

  // Extract headings for Table of Contents
  const extractHeadings = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');

    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || '',
      level: heading.tagName.toLowerCase()
    }));
  };

  const tableOfContents = article ? extractHeadings(article.content) : [];

  // Reading progress indicator
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Add IDs to headings for jump links
  useEffect(() => {
    if (!article) return;

    const articleElement = document.querySelector('.kb-article');
    if (!articleElement) return;

    const headings = articleElement.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
      heading.style.scrollMarginTop = '100px'; // Offset for fixed header
    });
  }, [article]);

  // Social sharing functions
  const shareUrl = `https://datacare.co.ke/resources/knowledge-base/${slug}`;
  const shareTitle = article?.title || '';

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      '_blank'
    );
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually",
        variant: "destructive"
      });
    }
  };

  // Helpful voting
  const handleVote = (isHelpful: boolean) => {
    if (hasVoted) {
      toast({
        title: "Already voted",
        description: "You've already voted on this article",
      });
      return;
    }

    setHasVoted(true);
    toast({
      title: isHelpful ? "Thank you!" : "Thanks for your feedback",
      description: isHelpful
        ? "Glad you found this article helpful"
        : "We'll work on improving this content",
    });

    // In production, this would send to analytics/backend
    console.log(`User voted: ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  // Scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowTOC(false);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild size="lg">
              <Link to="/resources/knowledge-base">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Base
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": "https://datacare.co.ke/og-image.jpg",
    "datePublished": article.lastUpdated,
    "dateModified": article.lastUpdated,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Datacare Limited",
      "logo": {
        "@type": "ImageObject",
        "url": "https://datacare.co.ke/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "articleSection": article.category,
    "keywords": article.tags.join(", "),
    "wordCount": article.content.split(' ').length,
    "timeRequired": article.readTime
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced SEO with Open Graph */}
      <SEO
        title={`${article.title} | Datacare Knowledge Base`}
        description={article.excerpt}
        keywords={article.tags.join(", ")}
        url={shareUrl}
      />

      {/* Additional Open Graph and Structured Data */}
      <Helmet>
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content="https://datacare.co.ke/og-image.jpg" />
        <meta property="article:published_time" content={article.lastUpdated} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content="https://datacare.co.ke/og-image.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* BreadcrumbList Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://datacare.co.ke"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Knowledge Base",
                "item": "https://datacare.co.ke/resources/knowledge-base"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": shareUrl
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-600 to-orange-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/resources/knowledge-base"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Base
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge variant="outline" className="text-sm">
              {article.category}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-sm ${
                article.difficulty === "Beginner" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                article.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {article.difficulty}
            </Badge>
            {article.popular && (
              <Badge className="text-sm bg-orange-600 text-white">
                Popular Article
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(article.lastUpdated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{article.readTime} read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Enhanced Share Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleShareTwitter}>
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareLinkedIn}>
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareFacebook}>
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {linkCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Article Content with Table of Contents */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            {tableOfContents.length > 0 && (
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-24">
                  {/* Mobile TOC Toggle */}
                  <Button
                    variant="outline"
                    className="lg:hidden w-full mb-4"
                    onClick={() => setShowTOC(!showTOC)}
                  >
                    <List className="w-4 h-4 mr-2" />
                    Table of Contents
                  </Button>

                  {/* TOC Content */}
                  <Card className={`p-4 ${showTOC ? 'block' : 'hidden lg:block'}`}>
                    <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`block w-full text-left text-sm transition-colors hover:text-primary ${
                            heading.level === 'h3' ? 'pl-4' : ''
                          }`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </Card>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className={tableOfContents.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
              <article className="kb-article prose prose-lg dark:prose-invert max-w-none mb-16">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                      {article.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{article.author}</div>
                      <div className="text-sm text-muted-foreground">
                        Published on{" "}
                        {new Date(article.lastUpdated).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Enhanced Was this helpful? */}
                <Card className="p-6 text-center bg-muted/30">
                  <h3 className="text-xl font-bold mb-2">Was this article helpful?</h3>
                  <p className="text-muted-foreground mb-4">
                    {article.helpful} people found this article helpful
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant={hasVoted ? "secondary" : "outline"}
                      size="lg"
                      onClick={() => handleVote(true)}
                      disabled={hasVoted}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Yes, helpful
                    </Button>
                    <Button
                      variant={hasVoted ? "secondary" : "outline"}
                      size="lg"
                      onClick={() => handleVote(false)}
                      disabled={hasVoted}
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      No, not helpful
                    </Button>
                  </div>
                  {hasVoted && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Thank you for your feedback!
                    </p>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Related Articles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {relatedArticle.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relatedArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="group-hover:text-orange-600"
                  >
                    <Link to={`/resources/knowledge-base/${relatedArticle.id}`}>
                      Read Article
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our solutions can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/employee-amplification#get-started">
                Get Free Assessment
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowledgeBaseArticle;
