import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Cloud, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating AI Network Nodes */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-accent-light rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float"></div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="70%" y1="30%" x2="90%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="20%" y1="70%" x2="40%" y2="90%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-slide-up">
              <Zap className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">AI-Powered IT Excellence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Datacare</span>
              <br />
              <span className="text-foreground">AI-Integrated</span>
              <br />
              <span className="text-foreground">IT Services</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up">
              Leading East Africa's digital transformation with intelligent IT solutions, 
              AI-powered security, and enterprise-grade cloud services. 
              <strong className="text-foreground">Trusted by 500+ organizations</strong> since 2012.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-slide-up">
              <Button size="lg" className="btn-primary group">
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="btn-outline group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground animate-slide-up">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-accent mr-2" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center">
                <Cloud className="w-4 h-4 text-accent mr-2" />
                99.9% Uptime SLA
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-accent mr-2" />
                AI-First Approach
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main AI Hub Visual */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-float">
                  <div className="w-60 h-60 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ai-glow">
                    <div className="w-40 h-40 bg-background rounded-full flex items-center justify-center">
                      <Brain className="w-16 h-16 text-primary animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Orbiting Service Icons */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                    <div className="w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center ai-glow">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2">
                    <div className="w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center ai-glow">
                      <Cloud className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                    <div className="w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center ai-glow">
                      <Zap className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2">
                    <div className="w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center ai-glow">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;