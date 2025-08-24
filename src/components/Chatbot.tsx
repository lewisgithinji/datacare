import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, RotateCcw, Phone } from "lucide-react";

type Intent = "sales" | "support" | "general";
type OrgType = "SMEs" | "Legal" | "Banking & Finance" | "Healthcare" | "Education" | "Manufacturing" | "NGOs" | "Government";
type CompanySize = "1–10" | "11–50" | "51–300" | "300+";
type PrimaryNeed = "Email/Collaboration" | "Device Management" | "Security/Compliance" | "Messaging Automation" | "Website" | "Backup/Recovery" | "Data & Analytics";
type CurrentStack = "Microsoft 365" | "Google Workspace" | "On-prem" | "None";
type Urgency = "Now" | "30 days" | "90 days";
type Budget = "Entry" | "Standard" | "Enterprise";

interface Recommendation {
  id: string;
  name: string;
  url: string;
  reason: string;
}

interface ConversationData {
  intent: Intent | "";
  orgType: OrgType | "";
  size: CompanySize | "";
  need: PrimaryNeed | "";
  stack: CurrentStack | "";
  urgency: Urgency | "";
  budget: Budget | "";
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("intent");
  const [conversationData, setConversationData] = useState<ConversationData>({
    intent: "",
    orgType: "",
    size: "",
    need: "",
    stack: "",
    urgency: "",
    budget: "",
    contact: {
      name: "",
      email: "",
      company: "",
      phone: ""
    }
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleIntentSelect = (intent: Intent) => {
    setConversationData({ ...conversationData, intent });
    if (intent === "support" || intent === "general") {
      setCurrentStep("contact");
    } else {
      setCurrentStep("orgType");
    }
  };

  const handleQuickReply = (field: keyof ConversationData, value: any) => {
    const updated = { ...conversationData, [field]: value };
    setConversationData(updated);
    
    const stepOrder = ["orgType", "size", "need", "stack", "urgency", "budget", "contact"];
    const currentIndex = stepOrder.indexOf(field as string);
    const nextStep = stepOrder[currentIndex + 1];
    
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      generateRecommendations(updated);
    }
  };

  const generateRecommendations = (data: ConversationData) => {
    const recs: Recommendation[] = [];
    
    // Microsoft 365 Rules
    if (data.need === "Email/Collaboration") {
      recs.push({
        id: "m365-basic",
        name: "Microsoft 365 Business Basic",
        url: "/products/microsoft-365",
        reason: "Email and collaboration focused solution"
      });
    }
    
    if (data.need === "Device Management" || data.need === "Security/Compliance") {
      recs.push({
        id: "m365-premium",
        name: "Microsoft 365 Business Premium",
        url: "/products/microsoft-365",
        reason: "Advanced security and device management capabilities"
      });
    }
    
    // Google Workspace Rules
    if (data.stack === "Google Workspace" || (data.need === "Email/Collaboration" && data.size !== "300+")) {
      recs.push({
        id: "google-workspace",
        name: "Google Workspace",
        url: "/products/google-workspace",
        reason: "Google-native collaboration solution"
      });
    }
    
    // Messaging Automation Rules
    if (data.need === "Messaging Automation") {
      recs.push({
        id: "messaging-platform",
        name: "Datacare Messaging Platform",
        url: "/products/datacare-messaging-platform",
        reason: "WhatsApp and SMS automation for customer engagement"
      });
    }
    
    // Backup Rules
    if (["Banking & Finance", "Healthcare", "Legal"].includes(data.orgType) || 
        ["11–50", "51–300", "300+"].includes(data.size)) {
      recs.push({
        id: "cloud-backup",
        name: "Cloud Backup & Recovery",
        url: "/products/cloud-backup-and-recovery",
        reason: "Essential for compliance and data protection"
      });
    }
    
    // Website Rules
    if (data.need === "Website") {
      recs.push({
        id: "web-design",
        name: "Web Design as a Service",
        url: "/solutions/web-design-as-a-service",
        reason: "Complete website solution with ongoing maintenance"
      });
    }
    
    // Analytics Rules
    if (data.need === "Data & Analytics") {
      recs.push({
        id: "data-analytics",
        name: "Data & Analytics Solutions",
        url: "/solutions/data-and-analytics",
        reason: "Business intelligence and reporting dashboards"
      });
    }
    
    setRecommendations(recs);
    setCurrentStep("recommendations");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to backend/email
    const payload = {
      ...conversationData,
      recommendations,
      timestamp: new Date().toISOString()
    };
    
    console.log("Conversation completed:", payload);
    
    // Here you would send to your webhook and email
    // sendToWebhook(payload);
    // sendToEmail(payload);
    
    setCurrentStep("success");
    
    setTimeout(() => {
      resetChat();
    }, 5000);
  };

  const resetChat = () => {
    setIsOpen(false);
    setCurrentStep("intent");
    setConversationData({
      intent: "",
      orgType: "",
      size: "",
      need: "",
      stack: "",
      urgency: "",
      budget: "",
      contact: { name: "", email: "", company: "", phone: "" }
    });
    setRecommendations([]);
  };

  const startOver = () => {
    setCurrentStep("intent");
    setConversationData({
      intent: "",
      orgType: "",
      size: "",
      need: "",
      stack: "",
      urgency: "",
      budget: "",
      contact: { name: "", email: "", company: "", phone: "" }
    });
    setRecommendations([]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 sm:w-96 bg-white dark:bg-slate-800 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between p-4 bg-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold">Datacare Support</h3>
              <p className="text-xs text-primary-foreground/80">We're online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Intent Selection */}
          {currentStep === "intent" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Hi, welcome to Datacare!</p>
                <p className="text-sm text-muted-foreground">How can we help you today?</p>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleIntentSelect("sales")}
                >
                  💼 Sales (Licensing, Automation, Web Design)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleIntentSelect("support")}
                >
                  🛠️ Technical Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleIntentSelect("general")}
                >
                  💬 General Inquiry
                </Button>
              </div>
            </div>
          )}

          {/* Organization Type */}
          {currentStep === "orgType" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">What type of organization are you?</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["SMEs", "Legal", "Banking & Finance", "Healthcare", "Education", "Manufacturing", "NGOs", "Government"] as OrgType[]).map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickReply("orgType", type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Company Size */}
          {currentStep === "size" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">How many employees do you have?</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["1–10", "11–50", "51–300", "300+"] as CompanySize[]).map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply("size", size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Need */}
          {currentStep === "need" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">What's your primary need?</p>
              </div>
              <div className="space-y-2">
                {(["Email/Collaboration", "Device Management", "Security/Compliance", "Messaging Automation", "Website", "Backup/Recovery", "Data & Analytics"] as PrimaryNeed[]).map((need) => (
                  <Button
                    key={need}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs"
                    onClick={() => handleQuickReply("need", need)}
                  >
                    {need}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Current Stack */}
          {currentStep === "stack" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">What's your current setup?</p>
              </div>
              <div className="space-y-2">
                {(["Microsoft 365", "Google Workspace", "On-prem", "None"] as CurrentStack[]).map((stack) => (
                  <Button
                    key={stack}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleQuickReply("stack", stack)}
                  >
                    {stack}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Urgency */}
          {currentStep === "urgency" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">When do you need this implemented?</p>
              </div>
              <div className="space-y-2">
                {(["Now", "30 days", "90 days"] as Urgency[]).map((urgency) => (
                  <Button
                    key={urgency}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleQuickReply("urgency", urgency)}
                  >
                    {urgency}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Budget */}
          {currentStep === "budget" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">What's your budget range?</p>
              </div>
              <div className="space-y-2">
                {(["Entry", "Standard", "Enterprise"] as Budget[]).map((budget) => (
                  <Button
                    key={budget}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleQuickReply("budget", budget)}
                  >
                    {budget}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          {currentStep === "contact" && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">
                  Let's get your contact details to finalize this.
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Your Name *"
                  value={conversationData.contact.name}
                  onChange={(e) => setConversationData({
                    ...conversationData,
                    contact: { ...conversationData.contact, name: e.target.value }
                  })}
                  required
                  className="text-sm"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={conversationData.contact.email}
                  onChange={(e) => setConversationData({
                    ...conversationData,
                    contact: { ...conversationData.contact, email: e.target.value }
                  })}
                  required
                  className="text-sm"
                />
                <Input
                  placeholder="Company Name *"
                  value={conversationData.contact.company}
                  onChange={(e) => setConversationData({
                    ...conversationData,
                    contact: { ...conversationData.contact, company: e.target.value }
                  })}
                  required
                  className="text-sm"
                />
                <Input
                  placeholder="Phone Number"
                  value={conversationData.contact.phone}
                  onChange={(e) => setConversationData({
                    ...conversationData,
                    contact: { ...conversationData.contact, phone: e.target.value }
                  })}
                  className="text-sm"
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Get Recommendations
              </Button>
            </form>
          )}

          {/* Recommendations */}
          {currentStep === "recommendations" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Based on your answers:</p>
                <p className="text-sm text-muted-foreground">
                  Here are our recommended solutions for your business needs.
                </p>
              </div>
              
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-3 hover:bg-muted/50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{rec.name}</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(rec.url, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.reason}</p>
                </div>
              ))}
              
              <div className="space-y-2 pt-4">
                <Button className="w-full" onClick={() => window.open('/contact', '_blank')}>
                  Book a Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  Get a Retainer Quote
                </Button>
              </div>
            </div>
          )}

          {/* Success */}
          {currentStep === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Thank You!</h3>
                <p className="text-sm text-muted-foreground">
                  We've received your information and will contact you within 24 hours with a customized proposal.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {currentStep !== "intent" && currentStep !== "success" && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={startOver}
                className="flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Start Over
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('/contact', '_blank')}
                className="flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Talk to Human
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;