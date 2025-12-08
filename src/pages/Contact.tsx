import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  HeadphonesIcon,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Twitter,
  Facebook,
  Youtube
} from "lucide-react";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  company: z.string()
    .max(100, "Company name must not exceed 100 characters")
    .optional(),
  phone: z.string()
    .regex(/^[\d\s+()-]*$/, "Phone number can only contain digits, spaces, +, -, (, )")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must not exceed 20 characters")
    .optional()
    .or(z.literal("")),
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
  serviceInterest: z.string().optional()
});

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ and get your credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    serviceInterest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Rate limiting check - allow only 1 submission per 60 seconds
    const lastSubmitTime = localStorage.getItem('lastContactSubmit');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime) < 60000) {
      const remainingTime = Math.ceil((60000 - (now - parseInt(lastSubmitTime))) / 1000);
      toast({
        title: "Please Wait",
        description: `You can submit again in ${remainingTime} seconds. This helps us prevent spam.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate form data with Zod
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
        EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      // Fallback: Open mailto link if EmailJS not configured
      const mailtoLink = `mailto:info@datacare.co.ke?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nService Interest: ${formData.serviceInterest}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;

      toast({
        title: "Opening Email Client",
        description: "Please send the email from your email application.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Store submission timestamp for rate limiting
      localStorage.setItem('lastContactSubmit', now.toString());
      // Send email using EmailJS with comprehensive template params
      const templateParams = {
        // Standard EmailJS template variables
        from_name: formData.name,
        from_email: formData.email,
        to_email: "info@datacare.co.ke",
        to_name: "Datacare Team",
        subject: formData.subject || "New Contact Form Submission",
        message: formData.message,

        // Additional custom fields
        company: formData.company || "Not provided",
        phone: formData.phone || "Not provided",
        service_interest: formData.serviceInterest || "General Inquiry",

        // Formatted message body for email
        reply_to: formData.email,
        message_html: `
          <strong>Contact Form Submission</strong><br><br>
          <strong>Name:</strong> ${formData.name}<br>
          <strong>Email:</strong> ${formData.email}<br>
          <strong>Company:</strong> ${formData.company || "Not provided"}<br>
          <strong>Phone:</strong> ${formData.phone || "Not provided"}<br>
          <strong>Service Interest:</strong> ${formData.serviceInterest || "General Inquiry"}<br>
          <strong>Subject:</strong> ${formData.subject}<br><br>
          <strong>Message:</strong><br>
          ${formData.message}
        `
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
        serviceInterest: ""
      });
    } catch (error: unknown) {
      console.error("EmailJS Error:", error);

      // Provide more specific error message
      let errorMessage = "Please try again or contact us directly at info@datacare.co.ke";

      if (error?.text) {
        errorMessage = `Error: ${error.text}. Please contact us at info@datacare.co.ke`;
      } else if (error?.message) {
        errorMessage = `Error: ${error instanceof Error ? error.message : "An error occurred"}. Please contact us at info@datacare.co.ke`;
      }

      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      name: "Headquarters - Nairobi",
      address: "Myfair Maissonettes, Block C2",
      fullAddress: "Mpaka Road, Westlands, Nairobi, Kenya",
      phone: ["+254 784 155 752", "+254 722 155 752"],
      email: "info@datacare.co.ke",
      hours: {
        weekdays: "Monday - Friday: 9:00 AM - 5:00 PM",
        saturday: "Saturday: 9:00 AM - 2:00 PM",
        sunday: "Sunday: Closed"
      },
      isHeadquarters: true,
      mapUrl: "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3988.8192!2d36.8075!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OCcyNy4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
    },
    {
      name: "Kampala Office",
      address: "Nakasero Business District",
      fullAddress: "Parliament Avenue, Kampala, Uganda",
      phone: ["+256 (0) 41 123 456"],
      email: "kampala@datacare.co.ke",
      hours: {
        weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
        saturday: "Saturday: 9:00 AM - 1:00 PM",
        sunday: "Sunday: Closed"
      },
      isHeadquarters: false
    },
    {
      name: "Dar es Salaam Office",
      address: "Masaki Business District",
      fullAddress: "Haile Selassie Road, Dar es Salaam, Tanzania",
      phone: ["+255 (0) 22 123 456"],
      email: "dar@datacare.co.ke",
      hours: {
        weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
        saturday: "Saturday: 9:00 AM - 1:00 PM", 
        sunday: "Sunday: Closed"
      },
      isHeadquarters: false
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our experts",
      details: "Primary: +254 784 155 752",
      action: "Call Now",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses within 4 hours",
      details: "info@datacare.co.ke",
      action: "Send Email",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support during business hours",
      details: "Available Mon-Fri 9AM-5PM EAT",
      action: "Start Chat",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a consultation with our team",
      details: "Available slots within 48 hours",
      action: "Book Now",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const serviceOptions = [
    "AI-Powered Security",
    "Managed IT & Infrastructure", 
    "Cloud & Virtualization",
    "Data & Analytics Platform",
    "Enterprise Software",
    "Backup & Disaster Recovery",
    "General Inquiry",
    "Partnership Opportunity"
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/datacare-limited",
      followers: "5.2K"
    },
    {
      name: "Twitter",
      icon: Twitter, 
      url: "https://twitter.com/datacare_ke",
      followers: "3.1K"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/DatacareLimited",
      followers: "8.5K"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@DatacareLimited",
      followers: "2.3K"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us - Datacare Limited"
        description="Contact Datacare Limited for IT services, Microsoft 365, Google Workspace, cybersecurity, and cloud solutions in Kenya. Get in touch with our team in Nairobi for a consultation."
        keywords="contact Datacare, IT support Kenya, IT consultation Nairobi, technology services contact, Datacare phone, Datacare email"
        url="https://datacare.co.ke/contact"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <MessageCircle className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Let's Start</span><br />
              Your Digital Transformation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to transform your business with AI-powered IT solutions? 
              Our experts are here to help you every step of the way. 
              <strong className="text-foreground">Get in touch today</strong> and discover what's possible.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4hrs</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">3</div>
                <div className="text-sm text-muted-foreground">Office Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to reach us. We're committed to responding quickly 
              and providing the support you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="card-elevated text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">{method.details}</p>
                  <Button variant="outline" size="sm" className="btn-outline">
                    {method.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-elevated">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 4 hours during business hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Interest</label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select a service (optional)</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your requirements, timeline, and any specific questions you have..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-success" />
                  We respect your privacy. Your information will never be shared with third parties.
                </div>
              </form>
            </div>

            {/* Headquarters Office Details */}
            <div className="space-y-8">
              <div className="card-elevated">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Headquarters - Nairobi</h3>
                    <p className="text-muted-foreground">Our main office and operations center</p>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Headquarters
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Myfair Maissonettes, Block C2</p>
                      <p className="text-muted-foreground text-sm">Mpaka Road, Westlands, Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">+254 784 155 752</p>
                      <p className="text-muted-foreground text-sm">+254 722 155 752 (Alternative)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">info@datacare.co.ke</p>
                      <p className="text-muted-foreground text-sm">Primary contact email</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <div className="text-muted-foreground text-sm space-y-1">
                        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                        <p className="text-xs text-accent">EAT (UTC+3)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="outline" className="w-full btn-outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Google Maps
                  </Button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="card-elevated">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  <h3 className="text-lg font-semibold">Emergency Support</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  For critical infrastructure issues outside business hours:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="font-medium">+254 784 155 752</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="font-medium">emergency@datacare.co.ke</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card-elevated">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm">{social.name}</p>
                          <p className="text-xs text-muted-foreground">{social.followers}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Offices */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Other Locations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Serving clients across East Africa with local expertise and regional reach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {offices.slice(1).map((office, index) => (
              <div
                key={office.name}
                className="card-elevated"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{office.name}</h3>
                  <Building className="w-5 h-5 text-primary" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm">{office.address}</p>
                      <p className="text-muted-foreground text-xs">{office.fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <p className="text-sm">{office.phone[0]}</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <p className="text-sm">{office.email}</p>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-xs text-muted-foreground">
                      <p>{office.hours.weekdays}</p>
                      <p>{office.hours.saturday}</p>
                      <p>{office.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
