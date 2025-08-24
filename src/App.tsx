import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Industries from "./pages/Industries";  
import Products from "./pages/Products";
import AIServices from "./pages/AIServices";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Solutions from "./pages/Solutions";
import NotFound from "./pages/NotFound";

// Solution pages
import CloudAndLicensing from "./pages/solutions/CloudAndLicensing";
import AIAndMessagingAutomation from "./pages/solutions/AIAndMessagingAutomation";
import WebDesignAsAService from "./pages/solutions/WebDesignAsAService";
import SMEDigitalTransformation from "./pages/solutions/SMEDigitalTransformation";
import SecurityAndCompliance from "./pages/solutions/SecurityAndCompliance";

// Product pages
import Microsoft365 from "./pages/products/Microsoft365";
import GoogleWorkspace from "./pages/products/GoogleWorkspace";
import DatacareMessagingPlatform from "./pages/products/DatacareMessagingPlatform";
import CloudBackupAndRecovery from "./pages/products/CloudBackupAndRecovery";

// Industry pages
import SMEsIndustry from "./pages/industries/SMEs";
import LawFirms from "./pages/industries/LawFirms";
import Saccos from "./pages/industries/Saccos";
import Schools from "./pages/industries/Schools";
import Construction from "./pages/industries/Construction";
import Government from "./pages/industries/Government";

// Resource pages
import CaseStudies from "./pages/resources/CaseStudies";
import Guides from "./pages/resources/Guides";
import KnowledgeBase from "./pages/resources/KnowledgeBase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ai-services" element={<AIServices />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions" element={<Solutions />} />
          
          {/* Solution pages */}
          <Route path="/solutions/cloud-and-licensing" element={<CloudAndLicensing />} />
          <Route path="/solutions/ai-and-messaging-automation" element={<AIAndMessagingAutomation />} />
          <Route path="/solutions/web-design-as-a-service" element={<WebDesignAsAService />} />
          <Route path="/solutions/sme-digital-transformation" element={<SMEDigitalTransformation />} />
          <Route path="/solutions/security-and-compliance" element={<SecurityAndCompliance />} />
          
          {/* Product pages */}
          <Route path="/products/microsoft-365" element={<Microsoft365 />} />
          <Route path="/products/google-workspace" element={<GoogleWorkspace />} />
          <Route path="/products/datacare-messaging-platform" element={<DatacareMessagingPlatform />} />
          <Route path="/products/cloud-backup-and-recovery" element={<CloudBackupAndRecovery />} />
          
          {/* Industry pages */}
          <Route path="/industries/smes" element={<SMEsIndustry />} />
          <Route path="/industries/law-firms" element={<LawFirms />} />
          <Route path="/industries/saccos" element={<Saccos />} />
          <Route path="/industries/schools" element={<Schools />} />
          <Route path="/industries/construction" element={<Construction />} />
          <Route path="/industries/government" element={<Government />} />
          
          {/* Resource pages */}
          <Route path="/resources/case-studies" element={<CaseStudies />} />
          <Route path="/resources/guides" element={<Guides />} />
          <Route path="/resources/knowledge-base" element={<KnowledgeBase />} />
          
          {/* Legacy route */}
          <Route path="/data-analytics-platform" element={<AIServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
