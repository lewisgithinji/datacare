import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Chatbot from "./components/Chatbot";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import Products from "./pages/Products";
import AIServices from "./pages/AIServices";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Solutions from "./pages/Solutions";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Solution pages
import CloudAndLicensing from "./pages/solutions/CloudAndLicensing";
import AIAndMessagingAutomation from "./pages/solutions/AIAndMessagingAutomation";
import WebDesignAsAService from "./pages/solutions/WebDesignAsAService";
import SMEDigitalTransformation from "./pages/solutions/SMEDigitalTransformation";
import SecurityAndCompliance from "./pages/solutions/SecurityAndCompliance";
import DataAndAnalytics from "./pages/solutions/DataAndAnalytics";

// Product pages
import Microsoft365 from "./pages/products/Microsoft365";
import GoogleWorkspace from "./pages/products/GoogleWorkspace";
import DatacareMessagingPlatform from "./pages/products/DatacareMessagingPlatform";
import CloudBackupAndRecovery from "./pages/products/CloudBackupAndRecovery";

// Industry pages
import SMEsIndustry from "./pages/industries/SMEs";
import Legal from "./pages/industries/Legal";
import Banking from "./pages/industries/Banking";
import Healthcare from "./pages/industries/Healthcare";
import Education from "./pages/industries/Education";
import Manufacturing from "./pages/industries/Manufacturing";
import NGOs from "./pages/industries/NGOs";
import Government from "./pages/industries/Government";

// Resource pages
import CaseStudies from "./pages/resources/CaseStudies";
import Guides from "./pages/resources/Guides";
import KnowledgeBase from "./pages/resources/KnowledgeBase";
// Portfolio page
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Chatbot />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ai-services" element={<AIServices />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          
          {/* Solution pages */}
          <Route path="/solutions/cloud-and-licensing" element={<CloudAndLicensing />} />
          <Route path="/solutions/ai-and-messaging-automation" element={<AIAndMessagingAutomation />} />
          <Route path="/solutions/web-design-as-a-service" element={<WebDesignAsAService />} />
          <Route path="/solutions/sme-digital-transformation" element={<SMEDigitalTransformation />} />
          <Route path="/solutions/security-and-compliance" element={<SecurityAndCompliance />} />
          <Route path="/solutions/data-and-analytics" element={<DataAndAnalytics />} />
          
          {/* Product pages */}
          <Route path="/products/microsoft365" element={<Microsoft365 />} />
          <Route path="/products/microsoft-365" element={<Microsoft365 />} />
          <Route path="/products/google-workspace" element={<GoogleWorkspace />} />
          <Route path="/products/datacare-messaging-platform" element={<DatacareMessagingPlatform />} />
          <Route path="/products/cloud-backup-and-recovery" element={<CloudBackupAndRecovery />} />
          
          {/* Industry pages */}
          <Route path="/industries/smes" element={<SMEsIndustry />} />
          <Route path="/industries/legal" element={<Legal />} />
          <Route path="/industries/banking" element={<Banking />} />
          <Route path="/industries/healthcare" element={<Healthcare />} />
          <Route path="/industries/education" element={<Education />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/ngos" element={<NGOs />} />
          <Route path="/industries/government" element={<Government />} />
          
          {/* Resource pages */}
          <Route path="/resources/case-studies" element={<CaseStudies />} />
          <Route path="/resources/guides" element={<Guides />} />
          <Route path="/resources/knowledge-base" element={<KnowledgeBase />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Legacy route */}
          <Route path="/data-analytics-platform" element={<AIServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
