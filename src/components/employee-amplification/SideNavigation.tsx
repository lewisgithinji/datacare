import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  offset?: number;
}

interface SideNavigationProps {
  sections: NavSection[];
  showAfterScroll?: number;
}

const SideNavigation = ({
  sections,
  showAfterScroll = 1400 // Show after calculator section
}: SideNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show/hide side nav based on scroll position
      setIsVisible(scrollPosition > showAfterScroll);

      // Determine active section and completed sections
      const newCompleted = new Set<string>();
      let currentActive = sections[0]?.id || "";

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementBottom = elementTop + rect.height;

          // Mark as completed if user has scrolled past it
          if (scrollPosition > elementBottom - 200) {
            newCompleted.add(section.id);
          }

          // Mark as active if currently in viewport
          if (
            scrollPosition >= elementTop - 200 &&
            scrollPosition < elementBottom - 200
          ) {
            currentActive = section.id;
          }
        }
      });

      setCompletedSections(newCompleted);
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, showAfterScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav
        className={cn(
          "hidden lg:block fixed top-32 left-8 z-40 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-border p-4 w-56">
          <div className="mb-4 pb-3 border-b border-border">
            <h3 className="text-xs font-bold uppercase text-muted-foreground">
              On This Page
            </h3>
          </div>

          <ul className="space-y-2">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isCompleted = completedSections.has(section.id);

              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left group",
                      isActive
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : isActive ? (
                        <Circle className="w-4 h-4 fill-orange-600 text-orange-600" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>

                    {/* Label */}
                    <span className="flex-1">{section.label}</span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Progress Bar */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-bold text-orange-600">
                {Math.round((completedSections.size / sections.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-500 ease-out"
                style={{
                  width: `${(completedSections.size / sections.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="bg-white dark:bg-slate-900 border-t-2 border-border shadow-2xl">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-muted">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-500"
              style={{
                width: `${(completedSections.size / sections.length) * 100}%`,
              }}
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center justify-around px-2 py-3 overflow-x-auto">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              const isCompleted = completedSections.has(section.id);

              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-1 rounded-lg min-w-[70px] transition-all",
                    isActive
                      ? "text-orange-600"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : isActive ? (
                      <Circle className="w-4 h-4 fill-orange-600 text-orange-600" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] leading-tight text-center",
                    isActive ? "font-bold" : "font-medium"
                  )}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNavigation;
