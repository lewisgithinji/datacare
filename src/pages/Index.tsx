import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
