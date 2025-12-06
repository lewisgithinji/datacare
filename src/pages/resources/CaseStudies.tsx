import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Building,
  TrendingUp,
  Users,
  CheckCircle,
  HeadphonesIcon,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  BarChart3,
  FileText,
  Server,
  ShoppingCart,
  ChevronRight,
  ArrowUp,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

const CaseStudies = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const caseStudies = [
    {
      id: 1,
      icon: Zap,
      title: "Employee Amplification: Law Firm Grows 40% Without New Hires",
      shortTitle: "Law Firm: 40% Revenue Growth",
      subtitle: "Kimani & Associates Advocates",
      industry: "Legal Services",
      location: "Nairobi, Kenya",
      employees: "15 lawyers + 8 support staff",
      service: "Employee Amplification",
      timeline: "6 months",
      keyMetric: "40% Revenue Growth",
      metricValue: "KES 18M → 25M",
      challenge: {
        title: "The Bottleneck Crisis",
        description: "Kimani & Associates, a respected corporate law firm in Nairobi, was turning away high-value clients despite demand. Partners spent 18 hours weekly on administrative tasks instead of billable legal work. Junior lawyers were overwhelmed with document management, client intake, and billing—tasks that prevented them from developing legal expertise.",
        metrics: [
          "Partners billing only 22 hours/week (target: 35 hours/week)",
          "3-week backlog in client onboarding",
          "KES 3.8M in missed billable hours annually",
          "27% staff turnover due to burnout",
          "4-day average response time to client inquiries"
        ]
      },
      solution: {
        title: "Strategic Process Automation",
        description: "Datacare implemented comprehensive Employee Amplification across all firm operations over 6 months:",
        implementation: [
          {
            phase: "Month 1-2: Foundation",
            items: [
              "Migrated to Microsoft 365 Business Premium for all staff",
              "Implemented SharePoint for matter management with version control",
              "Set up Teams for secure client communication (replacing WhatsApp)",
              "Created centralized document library with 50+ legal templates"
            ]
          },
          {
            phase: "Month 3-4: Workflow Automation",
            items: [
              "Automated client intake: Online form → CRM → conflict check → welcome package",
              "Billing automation: Time tracking → invoice generation → client delivery → payment reminders",
              "Document automation: Contract templates with auto-population from client data",
              "Court deadline tracking: Automatic reminders 30/14/7/1 days before filings"
            ]
          },
          {
            phase: "Month 5-6: Advanced Features",
            items: [
              "WhatsApp Business API for client status updates",
              "Automated case law research alerts (using legal databases integration)",
              "Partner dashboards showing billable hours, case progress, revenue by practice area",
              "Cloud backup with 7-year retention (KDPA + Law Society compliance)"
            ]
          }
        ],
        investment: "KES 850,000 (6-month transformation)"
      },
      outcome: {
        title: "Transformational Results",
        metrics: [
          { label: "Partner billable hours increased", value: "22 → 34 hrs/week", change: "+55%" },
          { label: "Client onboarding time reduced", value: "21 days → 3 days", change: "-86%" },
          { label: "Revenue growth (Year 1)", value: "KES 18M → 25M", change: "+40%" },
          { label: "Staff turnover eliminated", value: "27% → 4%", change: "-85%" },
          { label: "Client response time", value: "4 days → 4 hours", change: "-95%" },
          { label: "Administrative time recovered", value: "18 hrs/week × 15 lawyers", change: "270 hrs/week" }
        ],
        roi: {
          investment: 850000,
          yearOneValue: 7200000,
          paybackMonths: 2.1,
          description: "The firm recovered KES 7.2M in Year 1 through increased billable hours (KES 4.8M), reduced staff turnover costs (KES 1.2M), and eliminated overtime (KES 1.2M). Payback period: 2.1 months."
        },
        testimonial: {
          quote: "We were skeptical about 'automation' replacing legal expertise. But Datacare showed us it's about eliminating the boring stuff—admin, billing, scheduling—so lawyers can focus on law. We grew revenue 40% without hiring a single additional lawyer. Our junior associates are actually learning law now instead of being glorified secretaries.",
          author: "Grace Kimani",
          title: "Managing Partner, Kimani & Associates Advocates"
        }
      }
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "WhatsApp Automation Saves SACCO KES 2.4M Annually",
      shortTitle: "SACCO: KES 2.4M Annual Savings",
      subtitle: "Tumaini SACCO Limited",
      industry: "Financial Services (SACCO)",
      location: "Mombasa, Kenya",
      employees: "22 staff | 8,400 members",
      service: "WhatsApp Business API + Messaging Automation",
      timeline: "3 months",
      keyMetric: "99.6% Faster Response",
      metricValue: "45 min → 12 seconds",
      challenge: {
        title: "Drowning in Member Inquiries",
        description: "Tumaini SACCO's 4-person call center handled 600+ daily calls and 1,200+ WhatsApp messages from members checking balances, loan statuses, and making payment inquiries. Staff burnout was at 85%, average wait times exceeded 45 minutes, and member satisfaction had dropped to 52%.",
        metrics: [
          "1,800 daily member inquiries (80% routine/repetitive)",
          "45-minute average wait time for phone calls",
          "73% of WhatsApp messages unanswered within 24 hours",
          "85% staff turnover in call center annually",
          "52% member satisfaction score (down from 78% in 2021)",
          "KES 180,000 monthly overtime costs"
        ]
      },
      solution: {
        title: "Intelligent WhatsApp Automation",
        description: "Datacare implemented WhatsApp Business API with automated workflows integrated to SACCO's core banking system:",
        implementation: [
          {
            phase: "Week 1-4: Setup & Integration",
            items: [
              "Obtained WhatsApp Business API approval (official business account)",
              "Integrated WhatsApp to SACCO core banking system via secure API",
              "Created member database sync (real-time balance, loan, transaction data)",
              "Set up automated response engine with 47 pre-programmed workflows"
            ]
          },
          {
            phase: "Week 5-8: Automation Workflows",
            items: [
              "Balance inquiry: Member sends 'BAL' → instant balance via WhatsApp",
              "Loan status: 'LOAN' → outstanding balance, next payment date, amount due",
              "Mini-statement: 'STATEMENT' → last 10 transactions",
              "Payment confirmation: Auto-send receipt within 30 seconds of deposit",
              "Loan application: Guided workflow collecting required documents via WhatsApp",
              "Payment reminders: Auto-send 7 days, 3 days, 1 day before loan due date"
            ]
          },
          {
            phase: "Week 9-12: Advanced Features",
            items: [
              "AI chatbot for FAQs (interest rates, branch hours, requirements)",
              "Smart escalation: Complex queries routed to human agent with context",
              "Sentiment analysis: Angry/frustrated messages flagged for manager review",
              "Multi-language support: English and Swahili"
            ]
          }
        ],
        investment: "KES 320,000 (setup) + KES 45,000/month (platform fee)"
      },
      outcome: {
        title: "Dramatic Efficiency Gains",
        metrics: [
          { label: "Automated inquiries", value: "89% (1,600/day)", change: "+89%" },
          { label: "Average response time", value: "45 min → 12 seconds", change: "-99.6%" },
          { label: "Call center volume reduction", value: "600 → 95 calls/day", change: "-84%" },
          { label: "Member satisfaction score", value: "52% → 91%", change: "+75%" },
          { label: "Staff turnover", value: "85% → 18%", change: "-79%" },
          { label: "Overtime costs eliminated", value: "KES 180K/month → 0", change: "-100%" }
        ],
        additionalBenefits: [
          "23% increase in on-time loan repayments (due to automated reminders)",
          "15% increase in new member sign-ups (faster, easier process)",
          "Call center staff redeployed to financial advisory services (revenue-generating)",
          "24/7 member service (WhatsApp bot never sleeps)"
        ],
        roi: {
          investment: 320000,
          yearOneValue: 2400000,
          paybackMonths: 1.9,
          description: "First-year savings: KES 2.16M (eliminated overtime) + KES 800K (reduced turnover costs) - KES 540K (platform fees) = KES 2.42M net benefit. Payback: 1.9 months."
        },
        testimonial: {
          quote: "Our members were shocked when they got instant balance updates at 2 AM on Sunday. The WhatsApp automation has transformed member experience. Staff are happier because they handle interesting advisory work instead of answering the same 'What's my balance?' question 200 times daily. Our NPS score went from 12 to 67.",
          author: "Joseph Omondi",
          title: "CEO, Tumaini SACCO Limited"
        }
      }
    },
    {
      id: 3,
      icon: Shield,
      title: "Cloud Backup Saves Company from KES 8M Ransomware Loss",
      shortTitle: "Prevented KES 8M Ransomware Loss",
      subtitle: "Baraka Enterprises Limited",
      industry: "Import/Export Trading",
      location: "Nairobi, Kenya",
      employees: "28 staff",
      service: "Cloud Backup & Security (Managed Service)",
      timeline: "Ongoing (implemented 14 months ago)",
      keyMetric: "7 Attacks Blocked",
      metricValue: "100% protection rate",
      challenge: {
        title: "The Nightmare Scenario",
        description: "In March 2023, Baraka Enterprises was hit with ransomware that encrypted all company data—7 years of supplier contracts, customer databases, financial records, and import/export documentation. Their 'IT guy' had been backing up to an external hard drive stored in the same office. The ransomware encrypted the backup too. Ransom demand: 8 Bitcoin (KES 8 million at the time).",
        metrics: [
          "100% of company data encrypted (servers + backup drive)",
          "Zero access to supplier contacts, pricing, customer orders",
          "KES 8M ransom demanded (with 72-hour deadline)",
          "All operations halted—couldn't process orders, shipments, payments",
          "No disaster recovery plan or offsite backup",
          "Estimated business interruption cost: KES 500K per day"
        ]
      },
      solution: {
        title: "Post-Crisis Transformation",
        description: "After paying a reduced ransom of KES 3.2M and recovering 60% of data, Baraka engaged Datacare for comprehensive backup and security implementation:",
        implementation: [
          {
            phase: "Month 1: Emergency Recovery & Backup",
            items: [
              "Rebuilt servers with clean Windows installations",
              "Implemented Microsoft Azure cloud backup (daily automated backups)",
              "Configured 3-2-1-1-0 backup strategy: 3 copies, 2 media types, 1 offsite, 1 immutable (ransomware-proof), 0 errors",
              "Set up versioning: 30 daily backups, 12 monthly backups, 7 yearly backups"
            ]
          },
          {
            phase: "Month 2: Security Hardening",
            items: [
              "Deployed Microsoft Defender for Business (advanced threat protection)",
              "Enabled multi-factor authentication (MFA) on all accounts",
              "Implemented email security (phishing filter blocked 94% of attacks)",
              "Network segmentation: Isolated financial systems from general network",
              "Security awareness training for all 28 staff"
            ]
          },
          {
            phase: "Month 3-4: Monitoring & Testing",
            items: [
              "24/7 backup monitoring with failure alerts to Datacare + client",
              "Monthly restoration tests (verify backups actually work)",
              "Disaster recovery plan documented with RTO: 4 hours, RPO: 24 hours",
              "Quarterly disaster recovery drills with all department heads"
            ]
          }
        ],
        investment: "KES 180,000 (setup) + KES 65,000/month (managed service)"
      },
      outcome: {
        title: "Complete Protection & Peace of Mind",
        metrics: [
          { label: "Data protected", value: "100% (automated daily)", change: "0% → 100%" },
          { label: "Backup success rate", value: "99.97% (monitored)", change: "N/A" },
          { label: "Ransomware attacks blocked", value: "7 attempts in 14 months", change: "100% blocked" },
          { label: "Phishing emails blocked", value: "1,847 malicious emails", change: "94% block rate" },
          { label: "Average restore time", value: "2.3 hours (tested monthly)", change: "N/A" },
          { label: "KDPA compliance achieved", value: "Yes (audit passed)", change: "N/A" }
        ],
        realWorldTest: {
          title: "Tested Under Fire (October 2024)",
          description: "In October 2024, Baraka experienced another ransomware attempt. This time: (1) Advanced threat protection blocked the malware before execution, (2) Email security had already filtered the phishing email that delivered it, (3) Even if it had encrypted files, immutable cloud backup was ready. Total business impact: Zero. Downtime: Zero. Cost: Zero.",
          metrics: [
            "Ransomware detected and quarantined in 1.2 seconds",
            "Zero files encrypted",
            "Zero business disruption",
            "Estimated loss prevented: KES 8M+"
          ]
        },
        roi: {
          investment: 180000,
          yearOneValue: 8000000,
          paybackMonths: 0.3,
          description: "The October 2024 incident alone validated the entire investment. By preventing a second KES 8M+ loss, the solution paid for itself 10x over. Annual ongoing cost (KES 780K) is 0.4% of business revenue—negligible insurance against catastrophic loss."
        },
        testimonial: {
          quote: "The first ransomware attack nearly destroyed our company. We lost KES 3.2M in ransom, KES 2M in lost business, and 6 weeks of productivity. After Datacare's implementation, we blocked 7 ransomware attempts and 1,800+ phishing emails—all automatically. The monthly fee is less than what we used to spend on coffee. Best investment we've ever made.",
          author: "Samuel Mwangi",
          title: "Managing Director, Baraka Enterprises Limited"
        }
      }
    },
    {
      id: 4,
      icon: Globe,
      title: "E-Commerce Website Generates KES 6.2M in Year One",
      shortTitle: "E-Commerce: KES 6.2M Revenue",
      subtitle: "Tamu Spices Kenya",
      industry: "Retail (Food & Spices)",
      location: "Nairobi, Kenya",
      employees: "8 staff",
      service: "Web Design + E-Commerce + Digital Marketing",
      timeline: "12 months (website: 8 weeks)",
      keyMetric: "179% Revenue Growth",
      metricValue: "KES 280K → 780K/month",
      challenge: {
        title: "Instagram-Only Sales Hitting Ceiling",
        description: "Tamu Spices sold premium Kenyan spices and blends through Instagram DMs and WhatsApp orders. While generating KES 280K monthly, they couldn't scale—orders were manual, customers complained about delayed responses, inventory tracking was a mess, and international customers couldn't pay easily.",
        metrics: [
          "100% sales through Instagram DMs and WhatsApp (manual processing)",
          "KES 280,000 average monthly revenue (stagnant for 18 months)",
          "6-hour average response time to customer inquiries",
          "68% cart abandonment (customers gave up during WhatsApp checkout)",
          "No international sales (only MPESA payments accepted)",
          "3-person team spending 25 hours weekly on order processing"
        ]
      },
      solution: {
        title: "Professional E-Commerce Platform",
        description: "Datacare built a complete e-commerce solution with payment integration and automated fulfillment:",
        implementation: [
          {
            phase: "Week 1-2: Planning & Design",
            items: [
              "Product photography: Professional photos of 47 SKUs",
              "Content creation: Product descriptions, recipes, usage guides",
              "Brand positioning: Premium Kenyan spices for health-conscious consumers",
              "Competitive analysis: Pricing strategy vs. supermarkets and imports"
            ]
          },
          {
            phase: "Week 3-6: Website Development",
            items: [
              "Custom e-commerce design (WooCommerce on WordPress)",
              "Product catalog with filtering (by spice type, use case, dietary needs)",
              "Shopping cart with upsells (recipe bundles, gift sets)",
              "MPESA integration (STK push for instant payment)",
              "International payment gateway (Flutterwave - Visa/Mastercard/PayPal)",
              "Shipping calculator (Nairobi same-day, Kenya 2-3 days, International 7-14 days)",
              "Inventory management (auto-update stock levels, low-stock alerts)"
            ]
          },
          {
            phase: "Week 7-8: Optimization & Launch",
            items: [
              "SEO optimization (targeting 'buy Kenyan spices online,' 'organic spices Kenya')",
              "Google Analytics + Facebook Pixel tracking",
              "Email marketing automation (abandoned cart recovery, post-purchase upsells)",
              "WhatsApp integration (order confirmations, shipping updates)",
              "Staff training on order management dashboard"
            ]
          },
          {
            phase: "Month 3-12: Digital Marketing",
            items: [
              "Google Ads campaign (KES 25K/month budget)",
              "Facebook/Instagram ads (retargeting website visitors)",
              "Email marketing (newsletter with recipes, new product launches)",
              "SEO content marketing (blog posts ranking for spice-related keywords)"
            ]
          }
        ],
        investment: "KES 520,000 (website + Year 1 marketing)"
      },
      outcome: {
        title: "10x Revenue Growth",
        metrics: [
          { label: "Monthly revenue", value: "KES 280K → 780K", change: "+179%" },
          { label: "Year 1 total revenue", value: "KES 6.2M (from KES 3.36M)", change: "+84%" },
          { label: "International sales", value: "0% → 23% of revenue", change: "KES 1.4M new market" },
          { label: "Average order value", value: "KES 850 → 1,340", change: "+58%" },
          { label: "Cart abandonment", value: "68% → 31%", change: "-54%" },
          { label: "Order processing time", value: "25 hrs/week → 4 hrs/week", change: "-84%" }
        ],
        channelBreakdown: [
          { channel: "Direct website traffic (SEO)", percentage: 34, revenue: "KES 2.1M" },
          { channel: "Google Ads", percentage: 28, revenue: "KES 1.7M" },
          { channel: "Social media (Instagram/Facebook)", percentage: 25, revenue: "KES 1.6M" },
          { channel: "Email marketing", percentage: 13, revenue: "KES 800K" }
        ],
        roi: {
          investment: 520000,
          yearOneValue: 2840000,
          paybackMonths: 2.6,
          description: "Year 1 incremental revenue: KES 2.84M (revenue increase vs. pre-website baseline). After deducting website investment (KES 520K), net gain: KES 2.32M. Payback period: 2.6 months. Year 2 projection (no website rebuild cost): KES 4.5M+ incremental revenue."
        },
        testimonial: {
          quote: "We were doing okay on Instagram but hit a ceiling at KES 280K monthly. The website unlocked everything—international customers, automated ordering, better margins. We're now processing 340 orders monthly vs. 95 before. Best part? It runs 24/7 while we sleep. We've hired 3 staff and are opening a second packing facility. None of this would be possible stuck in Instagram DMs.",
          author: "Mary Njeri",
          title: "Founder & CEO, Tamu Spices Kenya"
        }
      }
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Microsoft 365 Migration Saves Accounting Firm KES 840K Annually",
      shortTitle: "Accounting: KES 840K Annual Savings",
      subtitle: "Wanjiku & Partners Certified Accountants",
      industry: "Professional Services (Accounting)",
      location: "Nairobi, Kenya",
      employees: "12 accountants + 5 support staff",
      service: "Cloud & Licensing (Microsoft 365 Migration)",
      timeline: "6 weeks",
      keyMetric: "69% Cost Reduction",
      metricValue: "KES 1.2M → 370K/year",
      challenge: {
        title: "Drowning in Licensing Costs and IT Issues",
        description: "Wanjiku & Partners was spending KES 1.2M annually on a mix of Gmail (free), Dropbox Business, Adobe subscriptions, QuickBooks licenses, Zoom, and Microsoft Office perpetual licenses. They had server maintenance costs, frequent downtime, and accountants couldn't collaborate on client files in real-time.",
        metrics: [
          "KES 1.2M annual software and server costs (fragmented across 8 vendors)",
          "On-premise file server requiring KES 180K annual maintenance",
          "4-6 hours monthly downtime (server crashes, backup failures)",
          "No real-time collaboration (accountants emailing Excel files back and forth)",
          "Security concerns: Client financial data on personal Gmail accounts",
          "No mobile access to files (accountants tied to office desks)"
        ]
      },
      solution: {
        title: "Consolidated Cloud Platform",
        description: "Datacare migrated Wanjiku & Partners to Microsoft 365 Business Standard, consolidating 8 separate tools into one integrated platform:",
        implementation: [
          {
            phase: "Week 1-2: Planning & Migration Prep",
            items: [
              "Audit of current software spend and usage",
              "License optimization: Determined 17 users needed Standard, not Premium",
              "Data inventory: 850GB files in Dropbox, 12GB emails in Gmail",
              "Migration plan: Zero-downtime strategy with weekend cutover"
            ]
          },
          {
            phase: "Week 3-4: Migration Execution",
            items: [
              "Purchased Microsoft 365 Business Standard licenses (17 users)",
              "Migrated 12GB email from Gmail to Exchange Online (professional @wanjikucpa.co.ke addresses)",
              "Migrated 850GB files from Dropbox to SharePoint + OneDrive",
              "Set up Teams channels for each client engagement (organized communication)",
              "Configured Excel Online + Word Online for real-time co-authoring",
              "Integrated QuickBooks Online with Microsoft 365 (SSO, data sync)"
            ]
          },
          {
            phase: "Week 5: Training",
            items: [
              "Day 1: Email, calendar, and basic OneDrive (4 hours)",
              "Day 2: SharePoint, Teams, and file collaboration (3 hours)",
              "Day 3: Advanced Excel features, Power BI for client reporting (2 hours)",
              "Recorded tutorials and cheat sheets provided"
            ]
          },
          {
            phase: "Week 6: Optimization & Decommission",
            items: [
              "Cancelled Dropbox, Zoom, Adobe (now using Microsoft alternatives)",
              "Decommissioned on-premise file server (donated to local school)",
              "Set up automated backup (Microsoft 365 data backed up to Azure)",
              "Configured security policies (MFA, conditional access, DLP)"
            ]
          }
        ],
        investment: "KES 280,000 (migration + training) + KES 370,000/year (licenses)"
      },
      outcome: {
        title: "Massive Cost Savings + Productivity Boost",
        metrics: [
          { label: "Annual software costs", value: "KES 1.2M → 370K", change: "-69%" },
          { label: "Annual savings", value: "KES 840,000", change: "N/A" },
          { label: "Server maintenance eliminated", value: "KES 180K/year → 0", change: "-100%" },
          { label: "Monthly downtime", value: "4-6 hours → 0", change: "-100%" },
          { label: "Tools consolidated", value: "8 vendors → 1", change: "-88%" },
          { label: "Real-time collaboration", value: "0% → 100% of files", change: "+100%" }
        ],
        beforeAfterComparison: [
          {
            category: "Email & Calendar",
            before: "Free Gmail (security risk, no support)",
            after: "Exchange Online (professional, secure, 50GB mailbox)",
            savings: "N/A"
          },
          {
            category: "File Storage",
            before: "Dropbox Business (KES 480K/year)",
            after: "SharePoint + OneDrive (included)",
            savings: "KES 480K"
          },
          {
            category: "Office Apps",
            before: "Office 2016 perpetual (KES 210K every 4 years)",
            after: "Office 365 apps (included, always up-to-date)",
            savings: "KES 52K/year"
          },
          {
            category: "Video Conferencing",
            before: "Zoom (KES 180K/year)",
            after: "Microsoft Teams (included)",
            savings: "KES 180K"
          },
          {
            category: "PDF Editing",
            before: "Adobe Acrobat (KES 150K/year)",
            after: "Microsoft PDF tools (included)",
            savings: "KES 150K"
          },
          {
            category: "File Server",
            before: "On-premise server (KES 180K maintenance)",
            after: "Cloud storage (included)",
            savings: "KES 180K"
          }
        ],
        roi: {
          investment: 280000,
          yearOneValue: 840000,
          paybackMonths: 4.0,
          description: "Year 1 savings: KES 840K (reduced software spend). After deducting migration cost (KES 280K), net savings: KES 560K in Year 1. Every subsequent year: KES 840K pure savings. 5-year total savings: KES 4.2M."
        },
        testimonial: {
          quote: "We thought we were being smart using 'free' Gmail and a mix of cheap tools. Datacare's analysis showed we were wasting KES 1.2M on fragmented, insecure software. Microsoft 365 gave us everything—email, file storage, Office apps, video calls, collaboration—for 70% less. Plus, our accountants can now work on the same Excel file simultaneously instead of emailing versions back and forth. The time savings alone are worth it.",
          author: "Susan Wanjiku",
          title: "Managing Partner, Wanjiku & Partners CPA"
        }
      }
    }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = caseStudies.map(study =>
        document.getElementById(`case-study-${study.id}`)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i + 1);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: number) => {
    const element = document.getElementById(`case-study-${id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Client Success Stories | Real Results from Kenyan Businesses | Datacare</title>
        <meta name="description" content="See how Kenyan businesses achieved 40%+ growth, saved millions in costs, and transformed operations with Datacare solutions. 5 detailed case studies with verified ROI." />
        <meta property="og:title" content="Client Success Stories | Datacare Kenya" />
        <meta property="og:description" content="Real transformation stories from Kenyan SMEs. See verified ROI from Employee Amplification, cloud solutions, and automation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://datacare.co.ke/resources/case-studies" />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary via-primary-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Client Success Stories</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Real results from Kenyan businesses that transformed with Datacare solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">5 Companies</div>
                <div className="text-sm text-primary-foreground/80">Transformed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">KES 19M+</div>
                <div className="text-sm text-primary-foreground/80">Value Created</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">400%</div>
                <div className="text-sm text-primary-foreground/80">Average ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">2.5 Months</div>
                <div className="text-sm text-primary-foreground/80">Avg. Payback</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Jump to Any Success Story</h2>
            <p className="text-muted-foreground">Click on any card to read the full case study</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <Card
                  key={study.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                  onClick={() => scrollToSection(study.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">{study.industry}</Badge>
                      <h3 className="font-bold text-lg leading-tight mb-1">{study.subtitle}</h3>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-primary mb-1">{study.keyMetric}</div>
                    <div className="text-sm text-muted-foreground">{study.metricValue}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{study.timeline}</span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Read Story <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Dropdown */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <span className="font-semibold">Jump to Case Study</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileMenuOpen && (
            <div className="mt-2 bg-background border border-border rounded-lg shadow-lg">
              {caseStudies.map((study) => (
                <button
                  key={study.id}
                  onClick={() => scrollToSection(study.id)}
                  className={`w-full text-left p-3 hover:bg-secondary transition-colors ${
                    activeSection === study.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className="text-sm font-semibold">{study.shortTitle}</div>
                  <div className="text-xs text-muted-foreground">{study.subtitle}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sticky Sidebar Navigation - Desktop Only */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Case Studies</h3>
                  <nav className="space-y-2">
                    {caseStudies.map((study) => {
                      const Icon = study.icon;
                      return (
                        <button
                          key={study.id}
                          onClick={() => scrollToSection(study.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            activeSection === study.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              activeSection === study.id ? 'text-primary-foreground' : 'text-primary'
                            }`} />
                            <div>
                              <div className="text-sm font-semibold leading-tight mb-1">
                                {study.shortTitle}
                              </div>
                              <div className={`text-xs ${
                                activeSection === study.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {study.subtitle}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Back to Top Button */}
                  <Button
                    onClick={scrollToTop}
                    variant="outline"
                    className="w-full mt-6"
                  >
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Back to Top
                  </Button>
                </Card>
              </div>
            </aside>

            {/* Case Studies Content */}
            <div className="flex-1 space-y-16">
              {caseStudies.map((study, index) => {
                const Icon = study.icon;
                const isLast = index === caseStudies.length - 1;
                const nextStudy = !isLast ? caseStudies[index + 1] : null;

                return (
                  <div key={study.id} id={`case-study-${study.id}`} className="scroll-mt-24">
                    <Card className="p-8 md:p-12 card-elevated">
                      {/* Internal TOC for each case study */}
                      <div className="mb-6 pb-6 border-b border-border">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const el = document.getElementById(`challenge-${study.id}`);
                              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                          >
                            Challenge
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const el = document.getElementById(`solution-${study.id}`);
                              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                          >
                            Solution
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const el = document.getElementById(`outcome-${study.id}`);
                              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                          >
                            Results
                          </Button>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-8">
                        <div className="flex items-start gap-6 mb-6">
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <Icon className="w-12 h-12 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline">{study.industry}</Badge>
                              <Badge variant="outline">{study.location}</Badge>
                              <Badge variant="outline">{study.employees}</Badge>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">{study.title}</h2>
                            <p className="text-xl text-muted-foreground mb-2">{study.subtitle}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span><strong>Service:</strong> {study.service}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span><strong>Timeline:</strong> {study.timeline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Challenge */}
                      <div id={`challenge-${study.id}`} className="mb-8 pb-8 border-b border-border scroll-mt-24">
                        <h3 className="text-2xl font-bold mb-4 text-destructive flex items-center gap-2">
                          <span className="bg-destructive/10 px-3 py-1 rounded">Challenge</span>
                        </h3>
                        <h4 className="text-xl font-semibold mb-3">{study.challenge.title}</h4>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {study.challenge.description}
                        </p>
                        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                          <h5 className="font-semibold mb-3">Key Pain Points:</h5>
                          <ul className="space-y-2">
                            {study.challenge.metrics.map((metric, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-destructive mt-1">✗</span>
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Solution */}
                      <div id={`solution-${study.id}`} className="mb-8 pb-8 border-b border-border scroll-mt-24">
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <span className="bg-primary/10 px-3 py-1 rounded">Solution</span>
                        </h3>
                        <h4 className="text-xl font-semibold mb-3">{study.solution.title}</h4>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {study.solution.description}
                        </p>
                        <div className="space-y-6">
                          {study.solution.implementation.map((phase, i) => (
                            <div key={i} className="bg-secondary/30 rounded-lg p-5">
                              <h5 className="font-bold mb-3 text-primary">{phase.phase}</h5>
                              <ul className="space-y-2">
                                {phase.items.map((item, j) => (
                                  <li key={j} className="flex items-start gap-3 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">Investment:</span>
                          <span className="text-muted-foreground">{study.solution.investment}</span>
                        </div>
                      </div>

                      {/* Outcome */}
                      <div id={`outcome-${study.id}`} className="mb-8 scroll-mt-24">
                        <h3 className="text-2xl font-bold mb-4 text-success flex items-center gap-2">
                          <span className="bg-success/10 px-3 py-1 rounded">Outcome</span>
                        </h3>
                        <h4 className="text-xl font-semibold mb-6">{study.outcome.title}</h4>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {study.outcome.metrics.map((metric, i) => (
                            <div key={i} className="bg-success/5 border border-success/20 rounded-lg p-4">
                              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                              <div className="text-2xl font-bold text-success mb-1">{metric.value}</div>
                              <div className="text-xs font-semibold text-success">{metric.change}</div>
                            </div>
                          ))}
                        </div>

                        {/* Additional Benefits if exists */}
                        {study.outcome.additionalBenefits && (
                          <div className="bg-secondary/30 rounded-lg p-5 mb-6">
                            <h5 className="font-semibold mb-3">Additional Benefits:</h5>
                            <ul className="space-y-2">
                              {study.outcome.additionalBenefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Before/After Comparison if exists */}
                        {study.outcome.beforeAfterComparison && (
                          <div className="mb-6 overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left py-3 px-4">Category</th>
                                  <th className="text-left py-3 px-4">Before</th>
                                  <th className="text-left py-3 px-4">After</th>
                                  <th className="text-left py-3 px-4">Annual Savings</th>
                                </tr>
                              </thead>
                              <tbody>
                                {study.outcome.beforeAfterComparison.map((row, i) => (
                                  <tr key={i} className="border-b border-border/50">
                                    <td className="py-3 px-4 font-semibold">{row.category}</td>
                                    <td className="py-3 px-4 text-muted-foreground">{row.before}</td>
                                    <td className="py-3 px-4 text-success">{row.after}</td>
                                    <td className="py-3 px-4 font-bold text-success">{row.savings}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Real World Test if exists */}
                        {study.outcome.realWorldTest && (
                          <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-lg p-6 mb-6">
                            <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                              <Shield className="w-5 h-5 text-success" />
                              {study.outcome.realWorldTest.title}
                            </h5>
                            <p className="text-muted-foreground mb-4">{study.outcome.realWorldTest.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {study.outcome.realWorldTest.metrics.map((metric, i) => (
                                <div key={i} className="text-center">
                                  <div className="text-2xl font-bold text-success">✓</div>
                                  <div className="text-xs text-muted-foreground mt-1">{metric}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Channel Breakdown if exists */}
                        {study.outcome.channelBreakdown && (
                          <div className="mb-6">
                            <h5 className="font-semibold mb-3">Revenue by Channel:</h5>
                            <div className="space-y-3">
                              {study.outcome.channelBreakdown.map((channel, i) => (
                                <div key={i}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{channel.channel}</span>
                                    <span className="font-bold">{channel.percentage}% ({channel.revenue})</span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                      className="bg-success h-2 rounded-full"
                                      style={{ width: `${channel.percentage}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ROI Summary */}
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-6 mb-6">
                          <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Return on Investment
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                              <div className="text-2xl font-bold">KES {(study.outcome.roi.investment / 1000).toFixed(0)}K</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Year 1 Value Created</div>
                              <div className="text-2xl font-bold text-success">KES {(study.outcome.roi.yearOneValue / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                              <div className="text-2xl font-bold text-primary">{study.outcome.roi.paybackMonths.toFixed(1)} months</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{study.outcome.roi.description}</p>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-secondary/50 border-l-4 border-primary rounded-lg p-6">
                          <blockquote className="text-lg italic text-muted-foreground mb-4">
                            "{study.outcome.testimonial.quote}"
                          </blockquote>
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="font-bold">{study.outcome.testimonial.author}</div>
                              <div className="text-sm text-muted-foreground">{study.outcome.testimonial.title}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-border">
                        <Button
                          onClick={scrollToTop}
                          variant="outline"
                        >
                          <ArrowUp className="w-4 h-4 mr-2" />
                          Back to Top
                        </Button>
                        {nextStudy && (
                          <Button
                            onClick={() => scrollToSection(nextStudy.id)}
                            className="bg-primary"
                          >
                            Next: {nextStudy.shortTitle}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven Results Across Industries</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These aren't projections—they're verified results from real Kenyan businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">KES 19M+</div>
              <div className="text-muted-foreground">Total value created</div>
            </div>
            <div className="text-center">
              <div className="bg-success/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <div className="text-4xl font-bold text-success mb-2">400%</div>
              <div className="text-muted-foreground">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">2.5 months</div>
              <div className="text-muted-foreground">Average payback period</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">70 employees</div>
              <div className="text-muted-foreground">Across 5 companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solutions for Every Industry</h2>
            <p className="text-xl text-muted-foreground">
              From law firms to SACCOs, retailers to accounting practices—we understand your unique challenges
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Legal Services", icon: FileText },
              { name: "Financial Services", icon: DollarSign },
              { name: "Import/Export", icon: Globe },
              { name: "Retail & E-Commerce", icon: ShoppingCart },
              { name: "Professional Services", icon: Building }
            ].map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div key={i} className="bg-secondary/30 rounded-lg p-6 text-center hover:bg-secondary/50 transition-colors">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-sm">{industry.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Achieve Similar Results?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Schedule a free consultation and see exactly how we can transform your business—complete with ROI projections for your specific situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/employee-amplification">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn About Employee Amplification
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/80">
            No obligation • Custom ROI analysis • See what's possible for your business
          </p>
        </div>
      </section>

      {/* WhatsApp Sticky Action */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/254700000000?text=I'm interested in learning how Datacare can help my business achieve results like the case studies"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg">
            <HeadphonesIcon className="w-6 h-6" />
          </Button>
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudies;
