import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Sparkles, TrendingUp, Clock, CreditCard, Zap, Users, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HybridPricing = () => {
  const [employees, setEmployees] = useState(3);
  const [avgSalary, setAvgSalary] = useState(200000);
  const [repeatWork, setRepeatWork] = useState(60);

  // Calculate ROI
  const monthlyWaste = (avgSalary * (repeatWork / 100)) * employees;
  const annualWaste = monthlyWaste * 12;
  const weeklyHoursReclaimed = (40 * (repeatWork / 100) * 0.7) * employees; // 70% recovery rate

  // Determine recommended package
  let recommendedPackage = "foundation";
  let estimatedInvestment = 0;
  let perEmployeeCost = 0;

  if (employees <= 2) {
    recommendedPackage = "foundation";
    estimatedInvestment = 500000 + (employees - 1) * 300000;
    perEmployeeCost = estimatedInvestment / employees;
  } else if (employees <= 6) {
    recommendedPackage = "accelerator";
    estimatedInvestment = employees * 350000;
    perEmployeeCost = 350000;
  } else {
    recommendedPackage = "enterprise";
    estimatedInvestment = employees * 400000;
    perEmployeeCost = 400000;
  }

  const paybackMonths = estimatedInvestment / (monthlyWaste * 0.7);
  const monthlyInstallment = (estimatedInvestment * 1.03) / 12;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const packages = [
    {
      id: "foundation",
      name: "Foundation",
      tagline: "Perfect starter package",
      employees: "1-2 employees",
      priceRange: "KES 500K - 800K",
      perEmployee: "KES 250K - 400K",
      perEmployeeNote: "per employee",
      timeline: "30-day implementation",
      support: "6 months support",
      roiMonths: "3-4 months",
      color: "from-blue-500 to-blue-600",
      popular: false,
      features: [
        "1-2 key employees amplified",
        "1-2 critical workflows optimized",
        "30-day rapid implementation",
        "6 months support & optimization",
        "Monthly check-ins",
        "Capacity analysis report",
        "15-20 hrs/week reclaimed per employee",
        "60-80% reduction in repetitive tasks"
      ],
      results: {
        hoursReclaimed: "15-20 hrs/week per employee",
        adminReduction: "60-80%",
        payback: "1.5-2.5 months typically"
      },
      payment: {
        full: "KES 650K",
        fullDiscount: "KES 617K (5% discount)",
        split: "KES 325K upfront, KES 325K at 60 days",
        monthly: "KES 55K-70K/month (12 months)"
      }
    },
    {
      id: "accelerator",
      name: "Accelerator",
      tagline: "Most popular choice",
      employees: "3-6 employees",
      priceRange: "KES 1.2M - 2.4M",
      perEmployee: "KES 300K - 400K",
      perEmployeeNote: "per employee",
      timeline: "60-day implementation",
      support: "6 months premium support",
      roiMonths: "3-5 months",
      color: "from-orange-500 to-orange-600",
      popular: true,
      features: [
        "3-6 key employees amplified",
        "Multiple workflows optimized",
        "Cross-department coordination",
        "60-day comprehensive implementation",
        "6 months premium support",
        "Bi-weekly optimization sessions",
        "Executive reporting dashboard",
        "20-25 hrs/week reclaimed per employee",
        "65-75% reduction in admin work",
        "Team collaboration improved 40%"
      ],
      results: {
        hoursReclaimed: "20-25 hrs/week per employee",
        adminReduction: "65-75%",
        payback: "0.5-1 month typically"
      },
      payment: {
        full: "KES 1.8M",
        fullDiscount: "KES 1.71M (5% discount)",
        split: "KES 900K upfront, KES 900K at 60 days",
        monthly: "KES 155K-165K/month (12 months)"
      }
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Complete transformation",
      employees: "7+ employees",
      priceRange: "Starting from KES 3M",
      perEmployee: "KES 350K - 450K",
      perEmployeeNote: "per employee",
      timeline: "90-120 day deployment",
      support: "12 months partnership",
      roiMonths: "4-6 months",
      color: "from-purple-500 to-purple-600",
      popular: false,
      features: [
        "7+ employees or full departments",
        "Complex multi-system integrations",
        "Phased rollout strategy",
        "90-120 day enterprise deployment",
        "12 months strategic partnership",
        "Dedicated amplification team",
        "Weekly strategy sessions",
        "C-suite reporting & insights",
        "Unlimited optimization requests",
        "20-30 hrs/week reclaimed per employee",
        "70-80% reduction in repetitive work",
        "Strategic capacity multiplied 3-5x"
      ],
      results: {
        hoursReclaimed: "20-30 hrs/week per employee",
        adminReduction: "70-80%",
        payback: "0.5-1.5 months typically"
      },
      payment: {
        full: "Custom pricing",
        fullDiscount: "Volume discounts available",
        split: "Flexible milestone-based payments",
        monthly: "Monthly retainer options available"
      }
    }
  ];

  const paymentOptions = [
    {
      name: "Pay in Full",
      discount: "5% discount",
      description: "Lowest total cost, one-time payment",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      name: "50/50 Split",
      discount: "No fees",
      description: "50% upfront, 50% at 60 days after seeing results",
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      name: "Monthly Installments",
      discount: "+3% financing",
      description: "Spread over 12 months, easier budgeting",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      name: "Performance-Based",
      discount: "Risk-free",
      description: "60% base + 40% only if we hit targets",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Transparent Pricing Header */}
      <div className="text-center">
        <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Simple, Transparent Pricing
        </Badge>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">KES 250K - 400K</span> per Employee
        </h2>

        <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          One-time implementation + 6 months optimization
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>ROI within 3-6 months</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Flexible payment options</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Performance guarantee</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" className="text-lg">
            <a href="#roi-calculator">Calculate My ROI</a>
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-lg">
            <a href="#packages">Choose a Package</a>
          </Button>
        </div>
      </div>

      {/* ROI Calculator */}
      <div id="roi-calculator">
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Calculate Your Specific ROI</h3>
            <p className="text-muted-foreground">See exactly when you'll break even</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of Employees to Amplify</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[employees]}
                    onValueChange={(value) => setEmployees(value[0])}
                    min={1}
                    max={15}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Average Monthly Salary (KES)</label>
                <Input
                  type="number"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">% Time on Repetitive Work</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[repeatWork]}
                    onValueChange={(value) => setRepeatWork(value[0])}
                    min={20}
                    max={90}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-orange-600 w-16">{repeatWork}%</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-2 border-red-200 dark:border-red-800">
                <div className="text-sm text-muted-foreground mb-1">Monthly Waste</div>
                <div className="text-3xl font-bold text-red-600">{formatCurrency(monthlyWaste)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Annual: {formatCurrency(annualWaste)}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                <div className="text-sm text-muted-foreground mb-1">Recommended Package</div>
                <div className="text-2xl font-bold text-orange-600 capitalize">{recommendedPackage}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Investment: {formatCurrency(estimatedInvestment)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Per employee: {formatCurrency(perEmployeeCost)}
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-2 border-green-200 dark:border-green-800">
                <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                <div className="text-3xl font-bold text-green-600">
                  {paybackMonths < 1 ? '<1' : Math.round(paybackMonths)} month{Math.round(paybackMonths) !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Hours reclaimed: {Math.round(weeklyHoursReclaimed)} hrs/week
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                <div className="text-sm font-semibold mb-1">Monthly Payment Option</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(monthlyInstallment)}/month
                </div>
                <div className="text-xs text-muted-foreground">12-month installment plan</div>
              </div>

              <Button asChild size="lg" className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
                <a href="#get-started">Get Your Custom Proposal</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Packages */}
      <div id="packages">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Choose Your Package</h3>
          <p className="text-xl text-muted-foreground">Based on your team size and needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-8 relative ${
                pkg.popular ? 'border-4 border-orange-500 shadow-2xl scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold">
                    ⭐ MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mx-auto mb-4`}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{pkg.tagline}</p>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">{pkg.priceRange}</div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.employees}
                  </div>
                </div>

                <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-300">
                    {pkg.perEmployee} {pkg.perEmployeeNote}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{pkg.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>{pkg.support}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">ROI: {pkg.roiMonths}</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Typical Results:
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{pkg.results.hoursReclaimed}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{pkg.results.adminReduction} admin reduction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Payback: {pkg.results.payback}</span>
                  </li>
                </ul>
              </div>

              <Button
                asChild
                size="lg"
                className={`w-full ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600'
                    : ''
                }`}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                <a href="#get-started">
                  {pkg.id === 'enterprise' ? 'Contact Us' : 'Get Started'}
                </a>
              </Button>

              <details className="mt-4">
                <summary className="text-sm text-primary cursor-pointer hover:underline">
                  View all features ({pkg.features.length})
                </summary>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Flexible Payment Options</h3>
          <p className="text-xl text-muted-foreground">Choose what works best for your budget</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.name} className="p-6 hover:shadow-xl transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color === 'text-green-600' ? 'from-green-500 to-green-600' : option.color === 'text-blue-600' ? 'from-blue-500 to-blue-600' : option.color === 'text-orange-600' ? 'from-orange-500 to-orange-600' : 'from-purple-500 to-purple-600'} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-1">{option.name}</h4>
                <Badge variant="outline" className="mb-3 text-xs">
                  {option.discount}
                </Badge>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-12">
          <Tabs defaultValue="foundation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="accelerator">Accelerator</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>

            {packages.map((pkg) => (
              <TabsContent key={pkg.id} value={pkg.id} className="mt-6">
                <Card className="p-6">
                  <h4 className="font-bold text-lg mb-4">{pkg.name} Package - Payment Examples</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold mb-2">💰 Pay in Full</div>
                      <div className="text-sm space-y-1">
                        <div>Normal: {pkg.payment.full}</div>
                        <div className="text-green-600 font-semibold">{pkg.payment.fullDiscount}</div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold mb-2">💳 50/50 Split</div>
                      <div className="text-sm">
                        {pkg.payment.split}
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold mb-2">📅 Monthly</div>
                      <div className="text-sm">
                        {pkg.payment.monthly}
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold mb-2">🎯 Performance</div>
                      <div className="text-sm text-purple-600 font-semibold">
                        Risk-free pricing available
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Guarantee Section */}
      <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our ROI Guarantee</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            We guarantee measurable capacity recapture and positive ROI within the stated timeline.
            If we don't deliver, we keep working at no additional cost until you see results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Measurable results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Risk-free guarantee</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HybridPricing;
