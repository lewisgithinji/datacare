import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ROICalculator from "@/components/employee-amplification/ROICalculator";
import BeforeAfter from "@/components/employee-amplification/BeforeAfter";
import IndustrySelector from "@/components/employee-amplification/IndustrySelector";
import ProofSection from "@/components/employee-amplification/ProofSection";
import AssessmentFormWizard from "@/components/employee-amplification/AssessmentFormWizard";
import SideNavigation from "@/components/employee-amplification/SideNavigation";
import MobileStickyCTA from "@/components/employee-amplification/MobileStickyCTA";
import HybridPricing from "@/components/employee-amplification/HybridPricing";
import {
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  DollarSign,
  Award,
  Shield,
  Lightbulb,
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";

const EmployeeAmplification = () => {
  // Side navigation sections
  const navSections = [
    { id: "how-it-works", label: "How It Works" },
    { id: "why-datacare", label: "Why Datacare" },
    { id: "industries", label: "Industries" },
    { id: "proof", label: "See Proof" },
    { id: "pricing", label: "Pricing" },
    { id: "get-started", label: "Get Started" }
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Map & Discover",
      subtitle: "Identify buried capacity",
      description: "We shadow your team for 1-2 weeks, mapping exactly where time goes. You'll see a detailed breakdown of strategic vs. administrative work.",
      duration: "Week 1-2",
      icon: Target,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Design & Elevate",
      subtitle: "Build intelligent systems",
      description: "We design custom workflows and automation that remove repetitive tasks while keeping humans in control of what matters.",
      duration: "Week 3-4",
      icon: Lightbulb,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "Implement & Amplify",
      subtitle: "Deploy and optimize",
      description: "We implement solutions, train your team, and continuously refine based on real usage. Capacity is redirected to high-value work.",
      duration: "Week 5-8",
      icon: Zap,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "20+ Hours Reclaimed",
      description: "Per senior employee, every week, redirected to strategic work"
    },
    {
      icon: DollarSign,
      title: "60-90 Day ROI",
      description: "Guaranteed positive return on investment within 3 months"
    },
    {
      icon: TrendingUp,
      title: "3-5x Capacity Increase",
      description: "Same headcount, dramatically multiplied strategic output"
    },
    {
      icon: Users,
      title: "90%+ Adoption Rate",
      description: "Employees love it—designed for humans, not against them"
    },
    {
      icon: Shield,
      title: "Risk-Free Assessment",
      description: "Complimentary 90-minute capacity audit, no obligation"
    },
    {
      icon: Award,
      title: "Proven Methodology",
      description: "10+ years serving East African enterprises"
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Employee Amplification - Transform Your Team's Capacity | Datacare Limited"
        description="Recapture 20+ hours/week of senior staff capacity buried in repetitive work. Employee Amplification: Same headcount, 3-5x the impact. 60-90 day ROI guaranteed. Serving East African enterprises."
        keywords="employee amplification Kenya, workforce optimization, AI automation Nairobi, business process optimization, productivity improvement, capacity management, workflow automation Kenya, digital transformation"
        url="https://datacare.co.ke/employee-amplification"
      />
      <Navigation />

      {/* Side Navigation with Progress */}
      <SideNavigation sections={navSections} showAfterScroll={1400} />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-background to-yellow-50 dark:from-orange-950 dark:via-background dark:to-yellow-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold mb-6 shadow-lg animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              PREMIUM SERVICE
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Your Most Expensive Resource<br />
              <span className="gradient-text">Is Being Wasted</span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform hidden capacity into competitive advantage
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-semibold">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>20+ hrs/week reclaimed</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>60-90 day ROI</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>3-5x capacity increase</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white text-lg px-8 py-6 shadow-xl">
                <a href="#get-started">
                  Book Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                <a href="#calculator">
                  Calculate Your Hidden Costs
                </a>
              </Button>
            </div>
          </div>

          {/* Video Placeholder / Hero Visual */}
          <div className="mt-16">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Calculate <span className="gradient-text">Your Hidden Costs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive calculator to discover how much capacity is buried in your organization
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 mb-6">
              <BarChart className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">Our Methodology</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              How <span className="gradient-text">Employee Amplification</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 3-step process: Map → Elevate → Amplify
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.number}
                  className="p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Step Number Background */}
                  <div className="absolute top-4 right-4 text-8xl font-bold text-muted/5 group-hover:text-muted/10 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-sm font-semibold text-orange-600 mb-2">{step.duration}</div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-primary font-semibold mb-3">{step.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Timeline Note */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-blue-50 dark:bg-blue-950">
              <p className="text-sm">
                <strong>Total Timeline:</strong> 30-60 days from assessment to measurable results • <strong>ROI:</strong> 60-90 days
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-datacare" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              The <span className="gradient-text">Datacare Difference</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Why organizations choose Datacare for Employee Amplification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="p-6 hover:shadow-xl transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Scenarios Section - Condensed */}
      <section id="industries" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustrySelector />
        </div>
      </section>

      {/* Proof Section - Tabbed (Comparison/Results/FAQ) */}
      <section id="proof">
        <ProofSection />
      </section>

      {/* Pricing Section - Hybrid Model */}
      <section id="pricing" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HybridPricing />
        </div>
      </section>

      {/* Assessment Form Section - Multi-Step Wizard */}
      <section id="get-started" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Discover Your <span className="gradient-text">Hidden Capacity</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              90-minute complimentary strategic assessment • 3 simple steps
            </p>
          </div>

          <AssessmentFormWizard />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stop Wasting Your Most Valuable Resource
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every day you wait is another day of buried capacity. Let's uncover it together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <a href="#get-started">
                Book Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/contact">
                Contact Us Directly
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-75">
              📞 +254-784-155752 • ✉️ info@datacare.co.ke • 🏢 10+ years serving East African enterprises
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmployeeAmplification;
