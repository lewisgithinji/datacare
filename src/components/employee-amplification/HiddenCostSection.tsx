import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HiddenCostSection = () => {
  const stats = [
    {
      icon: AlertCircle,
      value: "60-70%",
      label: "of senior capacity wasted on repetitive work",
      color: "text-red-600"
    },
    {
      icon: Clock,
      value: "20+",
      label: "hours per week recaptured per employee",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      value: "60-90",
      label: "days to positive ROI",
      color: "text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 dark:from-orange-950 dark:via-yellow-950 dark:to-orange-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold mb-6 shadow-lg animate-pulse-glow">
            <span className="mr-2">🆕</span>
            NEW SERVICE
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            What if your <span className="text-orange-600">KES 5M salary</span><br />
            is buying <span className="text-red-600">KES 2M of admin work</span>?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Most organizations waste <strong>60-70% of senior staff capacity</strong> on repetitive tasks.
            <br className="hidden md:block" />
            That's not a people problem—<strong>it's a systems problem</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white text-lg px-8 py-6 shadow-xl">
              <Link to="/employee-amplification">
                Calculate Your Hidden Costs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-white dark:hover:bg-slate-800">
              <Link to="/employee-amplification#how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-red-500 to-red-600' :
                    index === 1 ? 'from-orange-500 to-orange-600' :
                    'from-green-500 to-green-600'
                  } flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-5xl font-bold ${stat.color} mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Card */}
        <Card className="p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2 border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Introducing <span className="text-orange-600">Employee Amplification</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              We don't replace your team—<strong>we unleash them</strong>. Through intelligent workflow optimization
              and AI-powered automation, we recapture 20+ hours per week of senior staff capacity buried in
              repetitive work, redirecting it to strategic, revenue-driving activities.
            </p>
            <div className="inline-flex items-center gap-8 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Same Headcount</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>3-5x The Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>60-90 Day ROI</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Real Result:</strong> ABC Bank recaptured <strong className="text-orange-600">47 hours/week</strong> of
            senior analyst capacity, generating <strong className="text-green-600">KES 18M</strong> in additional revenue
          </p>
        </div>
      </div>
    </section>
  );
};

export default HiddenCostSection;
