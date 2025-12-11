import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href?: string;
  dropdown?: { title: string; href: string }[];
  isPremium?: boolean;
  isNew?: boolean;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user } = useAuth();

  const navItems: NavItem[] = [
    {
      label: "Solutions",
      href: "/solutions",
      dropdown: [
        { title: "View All Solutions", href: "/solutions" },
        { title: "Cloud & Licensing", href: "/solutions/cloud-and-licensing" },
        { title: "AI & Messaging Automation", href: "/solutions/ai-and-messaging-automation" },
        { title: "Web Design as a Service", href: "/solutions/web-design-as-a-service" },
        { title: "SME Digital Transformation", href: "/solutions/sme-digital-transformation" },
        { title: "Security & Compliance", href: "/solutions/security-and-compliance" },
        { title: "Data & Analytics", href: "/solutions/data-and-analytics" }
      ]
    },
    {
      label: "Products",
      href: "/products",
      dropdown: [
        { title: "View All Products", href: "/products" },
        { title: "Microsoft 365", href: "/products/microsoft-365" },
        { title: "Google Workspace", href: "/products/google-workspace" },
        { title: "Datacare Messaging Platform", href: "/products/datacare-messaging-platform" },
        { title: "Cloud Backup & Recovery", href: "/products/cloud-backup-and-recovery" }
      ]
    },
    {
      label: "Employee Amplification",
      href: "/employee-amplification",
      isPremium: true,
      isNew: true
    },
    {
      label: "Industries",
      dropdown: [
        { title: "SMEs", href: "/industries/smes" },
        { title: "Legal", href: "/industries/legal" },
        { title: "Banking & Finance", href: "/industries/banking" },
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Education", href: "/industries/education" },
        { title: "Manufacturing", href: "/industries/manufacturing" },
        { title: "NGOs", href: "/industries/ngos" },
        { title: "Government", href: "/industries/government" }
      ]
    },
    {
      label: "Learn",
      dropdown: [
        { title: "Knowledge Base", href: "/resources/knowledge-base" },
        { title: "Case Studies", href: "/resources/case-studies" },
        { title: "Guides & Resources", href: "/resources/guides" }
      ]
    },
    {
      label: "Company",
      dropdown: [
        { title: "About Us", href: "/about" },
        { title: "Our Portfolio", href: "/portfolio" },
        { title: "Contact Us", href: "/contact" }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img
              src="/datacare-logo.png"
              alt="Datacare Limited Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
          <div
            key={item.label}
            className="relative group"
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
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-800 border border-border rounded-xl shadow-lg p-2 animate-slide-up z-50 group-hover:block">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block px-4 py-3 text-sm text-popover-foreground hover:bg-accent/10 rounded-lg transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
                ) : (
                  <Link
                    to={item.href || `/${item.label.toLowerCase()}`}
                    className={item.isPremium
                      ? "relative flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-bold"
                      : "text-foreground hover:text-primary transition-colors font-medium"
                    }
                  >
                    {item.label}
                    {item.isNew && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] bg-orange-500 text-white rounded-full font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              // Logged in - Show Dashboard button
              <Button asChild variant="default">
                <Link to="/dashboard/inbox">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              // Not logged in - Show Login & Sign Up buttons
              <>
                <Button asChild variant="ghost">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Try Demo
                  </Link>
                </Button>
              </>
            )}
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
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div className="space-y-1">
                      <div className="px-2 py-2 font-semibold text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="block text-foreground hover:text-primary hover:bg-accent/10 transition-colors font-medium px-4 py-2 text-sm rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={item.href || `/${item.label.toLowerCase()}`}
                      className={item.isPremium
                        ? "block text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors font-bold px-2 py-2"
                        : "block text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                      {item.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                          NEW
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-border px-2 space-y-2">
                {user ? (
                  // Logged in - Show Dashboard button
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                    <Link to="/dashboard/inbox">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  // Not logged in - Show Login & Sign Up buttons
                  <>
                    <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                      <Link to="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80" onClick={() => setIsOpen(false)}>
                      <Link to="/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Try Demo
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;