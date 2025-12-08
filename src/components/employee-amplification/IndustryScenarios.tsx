import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Stethoscope, Scale, GraduationCap, Factory, Heart, Landmark, ShoppingBag, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Scenario {
  industry: string;
  icon: LucideIcon;
  problem: string;
  specificExample: string;
  solution: string;
  result: string;
  metrics: {
    label: string;
    value: string;
  }[];
  color: string;
}

const IndustryScenarios = () => {
  const scenarios: Scenario[] = [
    {
      industry: "Banking & Finance",
      icon: Building2,
      problem: "Loan officers spending 6hrs/day on compliance paperwork",
      specificExample: "A senior loan officer at a leading Kenyan bank was spending 30 hours per week on manual document verification, compliance checks, and report generation.",
      solution: "Automated compliance checks, document processing, and intelligent form pre-filling",
      result: "75% reduction in processing time, 3x more client interactions per week",
      metrics: [
        { label: "Time Saved", value: "22.5 hrs/week" },
        { label: "Loans Processed", value: "+185%" },
        { label: "Client Satisfaction", value: "+42%" }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      industry: "Healthcare",
      icon: Stethoscope,
      problem: "Doctors spending 4hrs/day on patient record entry",
      specificExample: "Medical practitioners at a Nairobi hospital spent over 50% of their day on administrative tasks rather than patient care.",
      solution: "AI-powered dictation, auto-charting, and intelligent clinical documentation",
      result: "15+ hours/week returned to direct patient care",
      metrics: [
        { label: "Admin Time", value: "-62%" },
        { label: "Patients Seen", value: "+35%" },
        { label: "Burnout Score", value: "-48%" }
      ],
      color: "from-red-500 to-red-600"
    },
    {
      industry: "Legal Services",
      icon: Scale,
      problem: "Lawyers spending 60% of time on document review and case research",
      specificExample: "Senior associates at a commercial law firm spent 24+ hours weekly on repetitive contract reviews and case law research.",
      solution: "AI-powered document analysis, automated contract review, and intelligent research assistants",
      result: "18 hours/week reclaimed for client strategy and business development",
      metrics: [
        { label: "Research Time", value: "-70%" },
        { label: "Client Hours", value: "+125%" },
        { label: "Revenue/Partner", value: "+KES 2.4M" }
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      industry: "Manufacturing",
      icon: Factory,
      problem: "Operations managers losing 10hrs/week to production reporting",
      specificExample: "Plant managers manually compiling data from multiple systems, creating reports, and tracking KPIs consumed enormous capacity.",
      solution: "Real-time automated dashboards, intelligent alerts, and self-generating reports",
      result: "90% of reporting time eliminated, faster response to production issues",
      metrics: [
        { label: "Reporting Time", value: "-90%" },
        { label: "Issue Response", value: "-65%" },
        { label: "Downtime", value: "-28%" }
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      industry: "Education",
      icon: GraduationCap,
      problem: "Administrators spending 15hrs/week on student records and reporting",
      specificExample: "Academic staff at universities spent massive amounts of time on enrollment, grading entry, attendance tracking, and compliance reporting.",
      solution: "Automated student information systems, intelligent grading workflows, and compliance reporting",
      result: "12+ hours/week redirected to student engagement and curriculum development",
      metrics: [
        { label: "Admin Time", value: "-80%" },
        { label: "Student Contact", value: "+55%" },
        { label: "Report Accuracy", value: "99.7%" }
      ],
      color: "from-green-500 to-green-600"
    },
    {
      industry: "NGOs & Non-Profits",
      icon: Heart,
      problem: "Program officers spending 50% of time on donor reporting",
      specificExample: "NGO staff spent 20+ hours weekly compiling impact reports, financial documentation, and compliance submissions for multiple donors.",
      solution: "Automated impact tracking, donor reporting systems, and compliance documentation",
      result: "20 hours/week redirected from paperwork to actual program delivery",
      metrics: [
        { label: "Reporting Time", value: "-75%" },
        { label: "Field Time", value: "+165%" },
        { label: "Donor Satisfaction", value: "+38%" }
      ],
      color: "from-pink-500 to-pink-600"
    },
    {
      industry: "Government & Public Sector",
      icon: Landmark,
      problem: "Civil servants drowning in manual processes and paperwork",
      specificExample: "Government departments processing permits, licenses, and citizen services manually, creating massive backlogs.",
      solution: "Digital workflow automation, citizen self-service portals, and intelligent document processing",
      result: "Service delivery time reduced by 70%, citizen satisfaction dramatically improved",
      metrics: [
        { label: "Processing Time", value: "-70%" },
        { label: "Backlog Reduction", value: "-85%" },
        { label: "Citizen Satisfaction", value: "+61%" }
      ],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      industry: "Retail & E-Commerce",
      icon: ShoppingBag,
      problem: "Managers spending 12hrs/week on inventory and vendor coordination",
      specificExample: "Store managers manually tracking inventory, coordinating with suppliers, and generating performance reports instead of focusing on sales and customer experience.",
      solution: "Automated inventory management, vendor coordination systems, and real-time sales analytics",
      result: "14 hours/week redirected to customer experience and team development",
      metrics: [
        { label: "Inventory Time", value: "-85%" },
        { label: "Customer Focus", value: "+120%" },
        { label: "Sales Growth", value: "+23%" }
      ],
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-800 mb-6">
            <Building2 className="w-4 h-4 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-600">Industry-Specific Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Employee Amplification <span className="gradient-text">Across Industries</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world scenarios showing how different sectors recapture buried capacity
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card
                key={scenario.industry}
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${scenario.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {scenario.industry}
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                      ⚠️ {scenario.problem}
                    </p>
                  </div>
                </div>

                {/* Specific Example */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {scenario.specificExample}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-orange-600 uppercase mb-2">
                    Our Solution
                  </div>
                  <p className="text-sm">
                    {scenario.solution}
                  </p>
                </div>

                {/* Result */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-2">
                    Result
                  </div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                    ✓ {scenario.result}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {scenario.metrics.map((metric) => (
                    <div key={metric.label} className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to={`/industries/${scenario.industry.toLowerCase().split(' ')[0]}`}>
                    Learn More About {scenario.industry}
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800">
            <h3 className="text-2xl font-bold mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Employee Amplification works across all sectors. Every organization has buried capacity—we'll help you find and unlock it.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
              <Link to="/contact?service=employee-amplification">
                Schedule Your Free Assessment
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IndustryScenarios;
