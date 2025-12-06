import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ROICalculator = () => {
  const [salary, setSalary] = useState(5000000);
  const [repeatWork, setRepeatWork] = useState(60);
  const [employees, setEmployees] = useState(3);
  const [animatedWaste, setAnimatedWaste] = useState(0);
  const [animatedHours, setAnimatedHours] = useState(0);

  // Calculate metrics
  const monthlyWaste = (salary * (repeatWork / 100)) * employees;
  const annualWaste = monthlyWaste * 12;
  const weeklyHours = (40 * (repeatWork / 100)) * employees;
  const annualHours = weeklyHours * 52;
  const potentialRecovery = monthlyWaste * 0.7; // 70% recovery rate
  const roiTimeline = 75; // Average 75 days

  // Animate numbers
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = monthlyWaste / steps;
    const hoursIncrement = weeklyHours / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedWaste(increment * currentStep);
      setAnimatedHours(hoursIncrement * currentStep);

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedWaste(monthlyWaste);
        setAnimatedHours(weeklyHours);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [salary, repeatWork, employees, monthlyWaste, weeklyHours]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                Calculate Your Hidden Costs
              </h3>
              <p className="text-sm text-muted-foreground">
                Adjust the sliders to see how much capacity is being wasted in your organization
              </p>
            </div>

            {/* Average Employee Salary */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Average Employee Salary (Monthly)</label>
                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-32 text-right"
                />
              </div>
              <Slider
                value={[salary]}
                onValueChange={(value) => setSalary(value[0])}
                min={100000}
                max={10000000}
                step={100000}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {formatCurrency(salary)} per month
              </p>
            </div>

            {/* Repetitive Work Percentage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">% Time on Repetitive Tasks</label>
                <span className="text-2xl font-bold text-orange-600">{repeatWork}%</span>
              </div>
              <Slider
                value={[repeatWork]}
                onValueChange={(value) => setRepeatWork(value[0])}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>None (0%)</span>
                <span>Most Time (100%)</span>
              </div>
            </div>

            {/* Number of Employees */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Number of Key Employees</label>
                <Input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-20 text-right"
                  min={1}
                  max={100}
                />
              </div>
              <Slider
                value={[employees]}
                onValueChange={(value) => setEmployees(value[0])}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Analyzing {employees} employee{employees > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Impact Card */}
          <Card className="p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-2 border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                  You're Currently Wasting
                </h3>
                <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {formatCurrency(animatedWaste)}
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  per month on administrative work
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Annual Impact</span>
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(annualWaste)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                That's {formatCurrency(annualWaste / employees)} per employee annually
              </div>
            </div>
          </Card>

          {/* Buried Capacity Card */}
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-2 border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-2">
                  Buried Capacity
                </h3>
                <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {Math.round(animatedHours)} hrs
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  of strategic capacity wasted per week
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Annual Capacity Loss</div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(annualHours).toLocaleString()} hours
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Equivalent to {Math.round(annualHours / 2080)} full-time employees
              </div>
            </div>
          </Card>

          {/* Potential Recovery Card */}
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                  Your Amplification Potential
                </h3>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {formatCurrency(potentialRecovery)}
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  monthly value recaptured with Employee Amplification
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Expected ROI Timeline</span>
                  <span className="text-xl font-bold text-green-600">{roiTimeline} days</span>
                </div>
              </div>

              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Hours Reclaimed/Week</span>
                  <span className="text-xl font-bold text-green-600">
                    {Math.round(weeklyHours * 0.7)} hrs
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button asChild size="lg" className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-lg py-6">
              <Link to="/contact?service=employee-amplification">
                Get Your Free Capacity Assessment
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              90-minute complimentary strategic assessment • No obligation • Immediate insights
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 text-center">
        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Real Client Result:</strong> ABC Bank recaptured 47 hours/week of senior analyst capacity,
            generating KES 18M in additional revenue. Your results calculated above represent typical outcomes
            based on 10+ years serving East African enterprises.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ROICalculator;
