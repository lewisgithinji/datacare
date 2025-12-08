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
import EmployeeAmplification from "./pages/EmployeeAmplification";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Authentication
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import { DashboardLayout } from "./layouts/DashboardLayout";

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
import KnowledgeBaseArticle from "./pages/resources/KnowledgeBaseArticle";

// Portfolio page
import Portfolio from "./pages/Portfolio";

// Messaging page
import Inbox from "./pages/messaging/Inbox";

// Dashboard pages
import DashboardOverview from "./pages/dashboard/Overview";
import Contacts from "./pages/dashboard/Contacts";
import ChatbotConversations from "./pages/dashboard/Chatbot";
import Analytics from "./pages/dashboard/Analytics";
import Campaigns from "./pages/dashboard/Campaigns";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Chatbot />
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ai-services" element={<AIServices />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/employee-amplification" element={<EmployeeAmplification />} />
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
          <Route path="/resources/knowledge-base/:slug" element={<KnowledgeBaseArticle />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Legacy route */}
          <Route path="/data-analytics-platform" element={<AIServices />} />

          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard routes */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardOverview />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="chatbot" element={<ChatbotConversations />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Legacy messaging route - redirect to dashboard */}
          <Route path="/messaging/inbox" element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
