import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HiddenCostSection from "@/components/employee-amplification/HiddenCostSection";
import ServicesOverview from "@/components/ServicesOverview";
import ProductsSection from "@/components/ProductsSection";
import IndustriesSection from "@/components/IndustriesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Datacare Limited - AI-Integrated IT Services & Solutions | Kenya"
        description="Datacare Limited is Kenya's leading IT company providing AI-powered services, Microsoft 365, Google Workspace, cybersecurity, cloud solutions, web design, and digital transformation for businesses."
        keywords="IT services Kenya, AI solutions Nairobi, Microsoft 365 Kenya, Google Workspace, cybersecurity Kenya, cloud solutions, web design Kenya, digital transformation East Africa"
        url="https://datacare.co.ke"
      />
      <Navigation />
      <HeroSection />
      <HiddenCostSection />
      <ServicesOverview />
      <ProductsSection />
      <IndustriesSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
