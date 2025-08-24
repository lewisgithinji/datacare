import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("greeting");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: "",
    message: ""
  });

  const handleOptionSelect = (option: string) => {
    setFormData({ ...formData, inquiry: option });
    setCurrentStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setCurrentStep("success");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setCurrentStep("greeting");
      setFormData({ name: "", email: "", company: "", inquiry: "", message: "" });
    }, 3000);
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
          {currentStep === "greeting" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary mb-2">Hi, welcome to Datacare!</p>
                <p className="text-sm text-muted-foreground">How can we help you today?</p>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleOptionSelect("Sales")}
                >
                  💼 Sales (Licensing, Automation, Web Design)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleOptionSelect("Support")}
                >
                  🛠️ Technical Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleOptionSelect("General")}
                >
                  💬 General Inquiry
                </Button>
              </div>
            </div>
          )}

          {currentStep === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">
                  Great! Let's get you connected with the right team.
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="text-sm"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="text-sm"
                />
                <Input
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="text-sm"
                />
                <Textarea
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="text-sm min-h-20"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-primary">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          )}

          {currentStep === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-success mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;