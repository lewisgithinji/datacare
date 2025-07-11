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
      "AI-Powered Security",
      "Managed IT Services", 
      "Cloud Solutions",
      "Backup & Recovery",
      "Data Analytics",
      "Enterprise Software"
    ],
    industries: [
      "Banking & Finance",
      "Healthcare",
      "Education",
      "Manufacturing",
      "NGOs",
      "Government"
    ],
    company: [
      "About Us",
      "Our Team",
      "Careers",
      "Partners",
      "News & Updates",
      "Contact"
    ],
    resources: [
      "Blog",
      "Whitepapers",
      "Case Studies",
      "Documentation",
      "API Reference",
      "Support"
    ]
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with <span className="gradient-text">AI Insights</span>
              </h3>
              <p className="text-muted-foreground">
                Get the latest news on AI-integrated IT solutions and industry trends.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-2">
              <Input
                placeholder="Enter your email"
                className="lg:w-80"
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
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-foreground">Datacare</span>
                  <span className="text-xs text-muted-foreground -mt-1">AI-Integrated IT Services</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Leading East Africa's digital transformation with intelligent IT solutions, 
                AI-powered security, and enterprise-grade cloud services since 2012.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-accent" />
                  Nairobi, Kenya | Kampala, Uganda
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-accent" />
                  +254 (0) 700 123 456
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-accent" />
                  info@datacare.co.ke
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Industries</h4>
              <ul className="space-y-3">
                {footerLinks.industries.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/industries/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Datacare Limited. All rights reserved. | ISO 27001 Certified
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="https://linkedin.com/company/datacare-limited"
              className="text-muted-foreground hover:text-accent transition-colors"
              target="_blank"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              to="https://twitter.com/DatacareLimited"
              className="text-muted-foreground hover:text-accent transition-colors"
              target="_blank"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              to="https://facebook.com/DatacareLimited"
              className="text-muted-foreground hover:text-accent transition-colors"
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