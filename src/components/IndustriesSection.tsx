import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Scale, Landmark, GraduationCap, HardHat, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";

const IndustriesSection = () => {
  const industries = [
    {
      icon: Building2,
      title: "SMEs",
      link: "/industries/smes"
    },
    {
      icon: Scale,
      title: "Legal",
      link: "/industries/legal"
    },
    {
      icon: Landmark,
      title: "Banking & Finance",
      link: "/industries/banking"
    },
    {
      icon: GraduationCap,
      title: "Healthcare",
      link: "/industries/healthcare"
    },
    {
      icon: HardHat,
      title: "Education",
      link: "/industries/education"
    },
    {
      icon: Building,
      title: "Manufacturing",
      link: "/industries/manufacturing"
    },
    {
      icon: Users,
      title: "NGOs",
      link: "/industries/ngos"
    },
    {
      icon: Landmark,
      title: "Government",
      link: "/industries/government"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions for every sector.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((industry, index) => (
            <Link key={index} to={industry.link} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-border text-center">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="w-6 h-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-sm font-semibold">{industry.title}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/industries">See How We Help Your Industry</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;