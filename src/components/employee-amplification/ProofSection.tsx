import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComparisonTable from "./ComparisonTable";
import { Award, MessageSquare, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const ProofSection = () => {
  const [expandedFaq, setExpandedFaq] = useState<number[]>([0, 1, 2]); // First 3 expanded by default
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const testimonials = [
    {
      quote: "We recovered 47 hours per week of senior analyst capacity. That translated to KES 18M in additional revenue within 6 months.",
      author: "Chief Operations Officer",
      company: "Leading Kenyan Bank",
      industry: "Banking & Finance",
      metric: "47 hrs/week reclaimed"
    },
    {
      quote: "Our doctors were spending 4 hours daily on paperwork. Now it's 30 minutes. That's 15+ hours per week back to patient care.",
      author: "Hospital Administrator",
      company: "Nairobi Healthcare Facility",
      industry: "Healthcare",
      metric: "62% reduction in admin time"
    },
    {
      quote: "Employee Amplification didn't just save time—it gave our senior team back their energy and strategic focus. Game changer.",
      author: "Managing Partner",
      company: "Commercial Law Firm",
      industry: "Legal Services",
      metric: "125% increase in client hours"
    }
  ];

  const faqs = [
    {
      question: "How is this different from traditional automation?",
      answer: "Traditional automation focuses on replacing tasks. Employee Amplification focuses on amplifying humans. We design systems around your team's strengths, creating high adoption rates and measurable capacity gains. Automation often fails; Employee Amplification delivers guaranteed results."
    },
    {
      question: "Will this eliminate jobs?",
      answer: "No. Employee Amplification is about redirecting capacity, not reducing headcount. Your team stays the same size but becomes 3-5x more effective. Senior staff move from administrative work to strategic, revenue-driving activities. It makes jobs better, not obsolete."
    },
    {
      question: "What ROI can we expect?",
      answer: "Most clients see positive ROI within 60-90 days. Typical outcomes: 20+ hours/week reclaimed per employee, 60-70% reduction in admin time, measurable revenue increases from redirected capacity. We provide detailed ROI projections during your free assessment."
    },
    {
      question: "How long does implementation take?",
      answer: "Starter: 30 days. Growth: 60 days. Enterprise: 90-120 days in phases. Unlike traditional projects that drag on indefinitely, we have a proven methodology with clear milestones. You see results within the first month."
    },
    {
      question: "Do you guarantee results?",
      answer: "Yes. We guarantee measurable capacity recapture. If we don't deliver the projected hours and ROI within the agreed timeline, we'll continue working at no additional cost until we do. That's our commitment."
    },
    {
      question: "Is our data secure?",
      answer: "Absolutely. We follow international security standards, sign NDAs, and ensure all client data is encrypted and protected. We're ISO 27001 aligned and comply with Kenya Data Protection Act 2019."
    },
    {
      question: "What if our workflows are too complex?",
      answer: "Complex workflows are our specialty. We've worked with banks, hospitals, government agencies—organizations with intricate processes. The more complex your workflows, the more buried capacity we typically find."
    },
    {
      question: "Do we need specific technology in place?",
      answer: "No prerequisites. We work with whatever systems you currently have. Whether you're using Microsoft 365, Google Workspace, custom software, or even paper-based processes—we optimize what exists."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 mb-6">
            <Award className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-600">Validation & Proof</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See Why <span className="gradient-text">Organizations Trust Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results, proven methodology, and answers to your questions
          </p>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-muted/50 p-2 rounded-xl mb-8">
            <TabsTrigger value="comparison" className="py-3 text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">EA vs</span> Automation
            </TabsTrigger>
            <TabsTrigger value="results" className="py-3 text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg">
              <Award className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Success</span> Stories
            </TabsTrigger>
            <TabsTrigger value="faq" className="py-3 text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 rounded-lg">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="mt-0">
            <div className="animate-slide-up">
              <ComparisonTable />
            </div>
          </TabsContent>

          {/* Results/Testimonials Tab */}
          <TabsContent value="results" className="mt-0">
            <div className="animate-slide-up">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Real Results from <span className="gradient-text">Real Organizations</span>
                </h3>
                <p className="text-muted-foreground">
                  How Kenyan organizations are recapturing buried capacity
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-6">
                      <div className="text-6xl text-orange-600 mb-4">"</div>
                      <p className="text-muted-foreground italic leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">{testimonial.industry}</div>

                      <div className="mt-4 inline-block px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                        <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                          {testimonial.metric}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources/case-studies">
                    View All Case Studies
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-0">
            <div className="animate-slide-up max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h3>
                <p className="text-muted-foreground">
                  Everything you need to know about Employee Amplification
                </p>
              </div>

              <div className="space-y-4">
                {visibleFaqs.map((faq, index) => {
                  const isExpanded = expandedFaq.includes(index);

                  return (
                    <Card key={index} className="overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <h4 className="text-base font-bold">{faq.question}</h4>
                          {isExpanded && (
                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-orange-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    </Card>
                  );
                })}
              </div>

              {!showAllFaqs && faqs.length > 3 && (
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowAllFaqs(true);
                      setExpandedFaq([...Array(faqs.length).keys()]);
                    }}
                  >
                    Show {faqs.length - 3} More Questions
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {showAllFaqs && (
                <div className="text-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowAllFaqs(false);
                      setExpandedFaq([0, 1, 2]);
                    }}
                  >
                    Show Less
                    <ChevronUp className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProofSection;
