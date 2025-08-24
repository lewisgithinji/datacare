import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Cloud, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  const products = [
    {
      icon: Building,
      title: "Microsoft 365",
      description: "Modern productivity suite with full support and management.",
      link: "/products/microsoft-365"
    },
    {
      icon: Cloud,
      title: "Google Workspace",
      description: "Collaboration and email in the cloud, simplified.",
      link: "/products/google-workspace"
    },
    {
      icon: MessageSquare,
      title: "Datacare Messaging Platform",
      description: "AI-powered WhatsApp/SMS automation as a service.",
      link: "/products/datacare-messaging-platform"
    },
    {
      icon: Shield,
      title: "Cloud Backup & Recovery",
      description: "Secure, tested data protection with guaranteed recovery.",
      link: "/products/cloud-backup-and-recovery"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools that drive growth and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <Link key={index} to={product.link} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-border">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <product.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;