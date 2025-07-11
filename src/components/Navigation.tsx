import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: "Solutions",
      dropdown: [
        "AI-Powered Security",
        "Managed IT & Infrastructure", 
        "Backup & Disaster Recovery",
        "Cloud & Virtualization"
      ]
    },
    {
      label: "AI Services",
      dropdown: [
        "Security AI",
        "Monitoring AI", 
        "Data Analytics Platform",
        "Predictive Analytics"
      ]
    },
    { label: "Industries", href: "/industries" },
    { label: "Products", href: "/products" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Datacare</span>
              <span className="text-xs text-muted-foreground -mt-1">AI-Integrated IT Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <div className="cursor-pointer">
                    <span className="flex items-center text-foreground hover:text-primary transition-colors font-medium">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-lg p-2 animate-slide-up">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            to={subItem === "Data Analytics Platform" ? "/data-analytics-platform" : `/ai-services`}
                            className="block px-4 py-3 text-sm text-popover-foreground hover:bg-accent/10 rounded-lg transition-colors"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href || `/${item.label.toLowerCase()}`}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Get Demo
            </Button>
            <Button className="btn-primary">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href || `/${item.label.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Get Demo
                </Button>
                <Button className="btn-primary" onClick={() => setIsOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;