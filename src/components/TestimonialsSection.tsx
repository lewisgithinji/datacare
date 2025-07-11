import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Mwangi",
      position: "CTO, Kenya Commercial Bank",
      company: "Banking",
      testimonial: "Datacare's AI-powered security solutions have transformed our threat detection capabilities. We've seen a 95% reduction in false positives and faster incident response times.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Ochieng",
      position: "IT Director, Safaricom",
      company: "Telecommunications", 
      testimonial: "Their managed IT services with predictive analytics have been game-changing. Our infrastructure downtime decreased by 80% in the first six months.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Grace Wanjiku",
      position: "Operations Manager, Nairobi Hospital",
      company: "Healthcare",
      testimonial: "The cloud migration was seamless, and the cost optimization AI has saved us 40% on our infrastructure costs while improving performance.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559941338-fd4d06aa2d25?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Client Success</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how organizations across East Africa are transforming their operations 
            with our AI-integrated IT solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card-elevated relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-accent-foreground" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Logos */}
        <div className="mt-16 pt-16 border-t border-border">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by leading organizations across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for client logos */}
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              KCB Bank
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Safaricom
            </div>
            <div className="h-8 w-32 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Nairobi Hospital
            </div>
            <div className="h-8 w-28 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Equity Bank
            </div>
            <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
              NCBA
            </div>
            <div className="h-8 w-32 bg-muted rounded flex items-center justify-center text-xs font-medium">
              Kenya Airways
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;