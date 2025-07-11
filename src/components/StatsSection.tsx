import { TrendingUp, Users, Shield, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Enterprise Clients",
      description: "Trusted by leading organizations across East Africa"
    },
    {
      icon: TrendingUp, 
      value: "99.9%",
      label: "Uptime SLA",
      description: "Industry-leading reliability and performance"
    },
    {
      icon: Shield,
      value: "24/7",
      label: "AI Security Monitoring",
      description: "Round-the-clock intelligent threat protection"
    },
    {
      icon: Award,
      value: "12+",
      label: "Years of Excellence",
      description: "Serving East Africa since 2012"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Delivering Excellence Across East Africa
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Our commitment to innovation and reliability has made us the trusted 
            technology partner for hundreds of organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {stat.label}
                </div>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;