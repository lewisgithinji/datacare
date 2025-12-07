import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, RotateCcw, Phone, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useChatbot, type Intent, type OrgType, type CompanySize, type PrimaryNeed, type CurrentStack, type Urgency, type Budget } from "@/hooks/useChatbot";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "./chatbot/ChatMessage";
import TypingIndicator from "./chatbot/TypingIndicator";
import type { QuickAction } from "@/lib/chatbot-query-engine";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faqQuery, setFaqQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [viewMode, setViewMode] = useState<'chat' | 'wizard'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const {
    currentStep,
    setCurrentStep,
    conversationData,
    setConversationData,
    recommendations,
    faqResponse,
    setFaqResponse,
    isLoading,
    generateRecommendations,
    handleFAQQuery,
    handleSubmit,
    trackEvent,
    trackRecommendationClick,
    // Conversational mode
    messages,
    handleQuery,
    handleQuickQuestion,
    lastQueryResponse,
    switchToWizard,
    switchToChat,
    resetConversation
  } = useChatbot();

  const handleIntentSelect = (intent: Intent) => {
    setConversationData({ ...conversationData, intent });
    trackEvent('intent_selected', { intent });
    
    if (intent === "support" || intent === "general") {
      setCurrentStep("contact");
    } else if (intent === "faq") {
      setCurrentStep("faq");
    } else {
      setCurrentStep("orgType");
    }
  };

  const handleQuickReply = (field: keyof typeof conversationData, value: any) => {
    const updated = { ...conversationData, [field]: value };
    setConversationData(updated);
    trackEvent('step_completed', { step: field, value });
    
    const stepOrder = ["orgType", "size", "need", "stack", "urgency", "budget", "contact"];
    const currentIndex = stepOrder.indexOf(field as string);
    const nextStep = stepOrder[currentIndex + 1];
    
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      generateRecommendations(updated);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await handleSubmit();
      
      toast({
        title: "Thank you!",
        description: `We've received your information. Lead score: ${result.leadScore}${result.isHighValue ? ' (High Priority)' : ''}`,
      });
      
      setCurrentStep("success");
      
      setTimeout(() => {
        resetChat();
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuery.trim()) return;
    
    const result = await handleFAQQuery(faqQuery);
    setFaqResponse(result.response);
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
    setFaqResponse(null);
    setFaqQuery('');
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
    setFaqResponse(null);
    setFaqQuery('');
    trackEvent('conversation_restarted');
  };

  const handleRecommendationClick = (rec: typeof recommendations[0]) => {
    trackRecommendationClick(rec.id);
    window.open(rec.url, '_blank');
  };

  // Chat mode handlers
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.trim();
    setChatInput('');
    await handleQuery(query);
  };

  const handleQuickActionClick = (action: QuickAction) => {
    if (action.type === 'navigate') {
      window.open(action.url, '_blank');
      trackEvent('quick_action_clicked', { label: action.label, url: action.url });
    } else if (action.type === 'contact') {
      window.open(action.url, '_blank');
      trackEvent('contact_action_clicked', { label: action.label, url: action.url });
    } else if (action.type === 'ask') {
      handleQuery(action.query || action.label);
      trackEvent('follow_up_question_clicked', { question: action.query || action.label });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuery(suggestion);
    trackEvent('suggestion_clicked', { suggestion });
  };

  const handleModeSwitch = (mode: 'chat' | 'wizard') => {
    setViewMode(mode);
    if (mode === 'chat') {
      switchToChat();
      trackEvent('mode_switched_to_chat');
    } else {
      switchToWizard();
      trackEvent('mode_switched_to_wizard');
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, viewMode]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 sm:w-96 bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold">Datacare Assistant</h3>
              <p className="text-xs opacity-80">We're here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-2 border-b bg-muted/30">
          <Button
            variant={viewMode === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeSwitch('chat')}
            className="flex-1 h-8 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Chat
          </Button>
          <Button
            variant={viewMode === 'wizard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeSwitch('wizard')}
            className="flex-1 h-8 text-xs"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Guided
          </Button>
        </div>

        {/* Chat Mode */}
        {viewMode === 'chat' ? (
          <div className="flex flex-col h-[500px] animate-in fade-in duration-300">
            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Hi! I'm your Datacare AI Assistant</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ask me about our products, pricing, or services. I have all the latest information!
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuery('What products do you offer?')}
                      className="h-auto py-2 text-xs"
                    >
                      📦 Products
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuery('How much does Microsoft 365 cost?')}
                      className="h-auto py-2 text-xs"
                    >
                      💰 Pricing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuery('How can I contact you?')}
                      className="h-auto py-2 text-xs"
                    >
                      📞 Contact
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuery('Tell me about Employee Amplification')}
                      className="h-auto py-2 text-xs"
                    >
                      🚀 Solutions
                    </Button>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  onQuickAction={handleQuickActionClick}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}

              {/* Typing Indicator */}
              {isLoading && <TypingIndicator />}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t bg-background p-3">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  placeholder="Ask about our products, pricing, or services..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isLoading}
                  className="text-sm flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !chatInput.trim()}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* Quick Actions Footer */}
              <div className="flex gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => resetConversation()}
                  className="flex items-center gap-1 text-xs h-7 flex-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://wa.me/254784155752', '_blank')}
                  className="flex items-center gap-1 text-xs h-7 flex-1"
                >
                  <Phone className="w-3 h-3" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Wizard Mode
          <div className="p-6 max-h-[500px] overflow-y-auto">
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
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleIntentSelect("sales")}
                >
                  <div>
                    <div className="font-medium">💼 Sales & Solutions</div>
                    <div className="text-xs text-muted-foreground">Licensing, Automation, Web Design</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleIntentSelect("faq")}
                >
                  <div>
                    <div className="font-medium">❓ Quick Questions</div>
                    <div className="text-xs text-muted-foreground">Pricing, Features, Support</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleIntentSelect("support")}
                >
                  <div>
                    <div className="font-medium">🛠️ Technical Support</div>
                    <div className="text-xs text-muted-foreground">Account help, troubleshooting</div>
                  </div>
                </Button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="space-y-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open('https://wa.me/254784155752', '_blank')}
                >
                  💬 Talk to us on WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open('/contact', '_blank')}
                >
                  📅 Book a Consultation
                </Button>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {currentStep === "faq" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary font-medium mb-1">Ask me anything!</p>
                <p className="text-xs text-muted-foreground">Try asking about pricing, features, or support</p>
              </div>
              
              <form onSubmit={handleFAQSubmit} className="space-y-3">
                <Input
                  placeholder="e.g., What does Microsoft 365 include?"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" className="w-full" disabled={isLoading || !faqQuery.trim()}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MessageSquare className="w-4 h-4 mr-2" />}
                  Ask Question
                </Button>
              </form>

              {faqResponse && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm">{faqResponse}</p>
                </div>
              )}
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
                    className="text-xs h-auto p-2"
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
                    className="w-full text-left justify-start text-xs h-auto p-2"
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
                  Let's get your contact details to provide personalized recommendations.
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                Get Recommendations
              </Button>
            </form>
          )}

          {/* Recommendations */}
          {currentStep === "recommendations" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Perfect! Here are our recommendations:</p>
                <p className="text-sm text-muted-foreground">
                  Based on your needs, these solutions will help {conversationData.contact.company || 'your organization'} achieve its goals.
                </p>
              </div>
              
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{rec.name}</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      View Details
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.reason}</p>
                </div>
              ))}
              
              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full" onClick={() => window.open('/contact', '_blank')}>
                  📅 Book a Consultation
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.open('https://wa.me/254784155752', '_blank')}>
                  💬 Chat on WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  📋 Get a Custom Quote
                </Button>
              </div>
            </div>
          )}

          {/* Success */}
          {currentStep === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Thank You, {conversationData.contact.name}!</h3>
                <p className="text-sm text-muted-foreground">
                  We've received your information and will contact you within 24 hours with a customized proposal for {conversationData.contact.company}.
                </p>
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium mb-1">Next Steps:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>📧 Check your email for confirmation</li>
                    <li>📞 We'll call you for a consultation</li>
                    <li>💬 Or chat with us anytime on WhatsApp</li>
                  </ul>
                </div>
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
                onClick={() => window.open('https://wa.me/254784155752', '_blank')}
                className="flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                WhatsApp
              </Button>
            </div>
          )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;