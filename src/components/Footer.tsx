import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Brain,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { name: "All Solutions", link: "/solutions" },
      { name: "Employee Amplification", link: "/employee-amplification" },
      { name: "Cloud & Licensing", link: "/solutions/cloud-and-licensing" },
      { name: "AI & Messaging Automation", link: "/solutions/ai-and-messaging-automation" },
      { name: "Data & Analytics", link: "/solutions/data-and-analytics" }
    ],
    products: [
      { name: "All Products", link: "/products" },
      { name: "Microsoft 365", link: "/products/microsoft-365" },
      { name: "Google Workspace", link: "/products/google-workspace" },
      { name: "Datacare Messaging Platform", link: "/products/datacare-messaging-platform" },
      { name: "Cloud Backup & Recovery", link: "/products/cloud-backup-and-recovery" }
    ],
    industries: [
      { name: "SMEs", link: "/industries/smes" },
      { name: "Legal", link: "/industries/legal" },
      { name: "Banking & Finance", link: "/industries/banking" },
      { name: "Healthcare", link: "/industries/healthcare" },
      { name: "Education", link: "/industries/education" },
      { name: "Manufacturing", link: "/industries/manufacturing" },
      { name: "NGOs", link: "/industries/ngos" },
      { name: "Government", link: "/industries/government" }
    ],
    resources: [
      { name: "Case Studies", link: "/resources/case-studies" },
      { name: "Guides", link: "/resources/guides" },
      { name: "Knowledge Base", link: "/resources/knowledge-base" }
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-slate-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Stay Updated with <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">AI Insights</span>
              </h3>
              <p className="text-slate-400">
                Get the latest news on AI-integrated IT solutions and industry trends.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="lg:w-80 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                type="email"
              />
              <Button className="btn-primary">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center mb-6">
                <img
                  src="/datacare-logo.png"
                  alt="Datacare Limited Logo"
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </Link>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Leading East Africa's digital transformation with intelligent IT solutions, 
                AI-powered security, and enterprise-grade cloud services since 2012.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-400">
                  <MapPin className="w-4 h-4 mr-3 text-accent" />
                  Nairobi, Kenya | Kampala, Uganda
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Phone className="w-4 h-4 mr-3 text-accent" />
                  +254 784 155 752
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Mail className="w-4 h-4 mr-3 text-accent" />
                  info@datacare.co.ke
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/254784155752"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  WhatsApp
                </a>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Book Consultation
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Get Retainer Quote
                </Button>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="text-sm text-slate-400 hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="text-sm text-slate-400 hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold text-white mb-4">Industries</h4>
              <ul className="space-y-3">
                {footerLinks.industries.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="text-sm text-slate-400 hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="text-sm text-slate-400 hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-slate-400 hover:text-accent transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-slate-400 hover:text-accent transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="text-sm text-slate-400">
              © {currentYear} Datacare Limited. All rights reserved. | ISO 27001 Certified
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="text-xs text-slate-500">
              Designed by{" "}
              <a
                href="https://sirlewis.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors"
              >
                Sirlewis
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="https://linkedin.com/company/datacare-limited"
              className="text-slate-400 hover:text-accent transition-colors"
              target="_blank"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              to="https://twitter.com/DatacareLimited"
              className="text-slate-400 hover:text-accent transition-colors"
              target="_blank"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              to="https://facebook.com/DatacareLimited"
              className="text-slate-400 hover:text-accent transition-colors"
              target="_blank"
            >
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;