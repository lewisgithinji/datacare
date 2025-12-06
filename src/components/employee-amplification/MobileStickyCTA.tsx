import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 800px)
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 shadow-2xl",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-3">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 h-12 font-bold"
            onClick={() => scrollToSection("calculator")}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate ROI
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 h-12 font-bold bg-white text-orange-600 hover:bg-white/90"
            onClick={() => scrollToSection("get-started")}
          >
            <Send className="w-4 h-4 mr-2" />
            Get Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
