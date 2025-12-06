import { Card } from "@/components/ui/card";
import { Check, X, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ComparisonItem {
  category: string;
  automation: {
    status: "yes" | "no" | "partial";
    description: string;
  };
  amplification: {
    status: "yes" | "superior";
    description: string;
  };
}

const ComparisonTable = () => {
  const comparisons: ComparisonItem[] = [
    {
      category: "Primary Focus",
      automation: {
        status: "partial",
        description: "Replacing repetitive tasks with technology"
      },
      amplification: {
        status: "superior",
        description: "Amplifying human capability and strategic value"
      }
    },
    {
      category: "Implementation Approach",
      automation: {
        status: "no",
        description: "One-size-fits-all tools, often requiring adaptation to fit"
      },
      amplification: {
        status: "superior",
        description: "Custom-designed around your team's actual workflows"
      }
    },
    {
      category: "Employee Experience",
      automation: {
        status: "no",
        description: "Often met with resistance, fear of replacement"
      },
      amplification: {
        status: "superior",
        description: "Employees love it—they're freed from busy work"
      }
    },
    {
      category: "ROI Timeline",
      automation: {
        status: "partial",
        description: "6-18 months, often unclear or never achieved"
      },
      amplification: {
        status: "superior",
        description: "60-90 days with guaranteed measurable results"
      }
    },
    {
      category: "Upfront Investment",
      automation: {
        status: "no",
        description: "High cost, expensive licenses, consultants"
      },
      amplification: {
        status: "superior",
        description: "Right-sized investment, clear cost-benefit from day 1"
      }
    },
    {
      category: "Technical Complexity",
      automation: {
        status: "no",
        description: "Requires IT expertise, ongoing technical maintenance"
      },
      amplification: {
        status: "superior",
        description: "We handle all complexity, you see only results"
      }
    },
    {
      category: "Adoption Rate",
      automation: {
        status: "partial",
        description: "30-50% adoption typical, many projects abandoned"
      },
      amplification: {
        status: "superior",
        description: "90%+ adoption—designed with users from day 1"
      }
    },
    {
      category: "Strategic Value",
      automation: {
        status: "partial",
        description: "Efficiency gains, cost reduction focus"
      },
      amplification: {
        status: "superior",
        description: "Capacity multiplication, revenue generation focus"
      }
    },
    {
      category: "Ongoing Support",
      automation: {
        status: "no",
        description: "Limited post-implementation support"
      },
      amplification: {
        status: "superior",
        description: "Continuous optimization and refinement included"
      }
    },
    {
      category: "Business Outcome",
      automation: {
        status: "partial",
        description: "Faster processes, lower costs (maybe)"
      },
      amplification: {
        status: "superior",
        description: "3-5x capacity increase, measurable revenue impact"
      }
    }
  ];

  const StatusIcon = ({ status }: { status: "yes" | "no" | "partial" | "superior" }) => {
    if (status === "superior") {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      );
    }
    if (status === "yes") {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
          <Check className="w-5 h-5 text-white" />
        </div>
      );
    }
    if (status === "partial") {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500">
          <span className="text-white text-xs font-bold">~</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500">
        <X className="w-5 h-5 text-white" />
      </div>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-800 mb-6">
            <Zap className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600">The Difference</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Employee Amplification vs <span className="gradient-text">Traditional Automation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Why automation projects fail, and how Employee Amplification succeeds
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden">
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="p-6 text-left w-1/3">
                    <span className="text-lg font-semibold">Feature</span>
                  </th>
                  <th className="p-6 text-center w-1/3 bg-muted/30">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold mb-1">Traditional Automation</span>
                      <span className="text-xs text-muted-foreground font-normal">The Old Way</span>
                    </div>
                  </th>
                  <th className="p-6 text-center w-1/3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-600" />
                        <span className="text-lg font-semibold text-orange-600">Employee Amplification</span>
                      </div>
                      <span className="text-xs text-orange-600/80 font-normal">The Datacare Way</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr
                    key={item.category}
                    className={`border-b border-border ${index % 2 === 0 ? '' : 'bg-muted/10'}`}
                  >
                    <td className="p-6">
                      <span className="font-semibold">{item.category}</span>
                    </td>
                    <td className="p-6 bg-muted/10">
                      <div className="flex flex-col items-center gap-3">
                        <StatusIcon status={item.automation.status} />
                        <p className="text-sm text-center text-muted-foreground">
                          {item.automation.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-6 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20">
                      <div className="flex flex-col items-center gap-3">
                        <StatusIcon status={item.amplification.status} />
                        <p className="text-sm text-center font-medium">
                          {item.amplification.description}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-border">
            {comparisons.map((item) => (
              <div key={item.category} className="p-6">
                <h3 className="font-bold text-lg mb-4">{item.category}</h3>

                {/* Traditional Automation */}
                <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon status={item.automation.status} />
                    <span className="text-sm font-semibold">Traditional Automation</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-10">
                    {item.automation.description}
                  </p>
                </div>

                {/* Employee Amplification */}
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon status={item.amplification.status} />
                    <span className="text-sm font-semibold text-orange-600">Employee Amplification</span>
                  </div>
                  <p className="text-sm font-medium ml-10">
                    {item.amplification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">Superior Approach</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">Adequate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">~</span>
            <span className="text-muted-foreground">Partial/Limited</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-500" />
            <span className="text-muted-foreground">Poor/Missing</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800">
            <h3 className="text-2xl font-bold mb-4">
              Experience The Difference
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't waste time and money on automation projects that fail. Get guaranteed results with Employee Amplification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
                <Link to="/contact?service=employee-amplification">
                  Book Free Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/resources/case-studies">
                  See Success Stories
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
