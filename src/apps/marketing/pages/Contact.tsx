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
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Contact form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must not exceed 255 characters"),
  company: z.string().max(100, "Company name must not exceed 100 characters").optional(),
  phone: z
    .string()
    .regex(/^[\d\s+()-]*$/, "Phone number can only contain digits, spaces, +, -, (, )")
    .min(0)
    .max(20, "Phone number must not exceed 20 characters")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject must not exceed 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must not exceed 2000 characters"),
  serviceInterest: z.string().optional()
});

// EmailJS Configuration (fallbacks indicate not configured)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);
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

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "", serviceInterest: "" });
    if (formRef.current) formRef.current.reset();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Please fix the form errors.";
      toast({ title: "Validation error", description: firstError, variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    // If EmailJS not configured, show a friendly local fallback
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("EmailJS not configured. Form data:", formData);
      toast({ title: "Form not sent", description: "Email service is not configured in this environment. Form data logged to console.", variant: "default" });
      resetForm();
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      service_interest: formData.serviceInterest
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      toast({ title: "Message sent", description: "Thanks! We'll get back to you shortly.", variant: "default" });
      resetForm();
    } catch (err) {
      console.error("EmailJS send error:", err);
      toast({ title: "Send failed", description: "Unable to send message. Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Contact" description="Get in touch with Datacare" />
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
            <p className="text-sm text-muted-foreground mb-6">Tell us about your project and we'll reach out to schedule a call.</p>

            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input name="name" required value={formData.name} onChange={handleInputChange} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="you@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company (optional)</label>
                  <Input name="company" value={formData.company} onChange={handleInputChange} placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 555-5555" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input name="subject" required value={formData.subject} onChange={handleInputChange} placeholder="Short summary" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea name="message" required value={formData.message} onChange={handleInputChange} placeholder="Tell us more about your needs" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interested In</label>
                <select name="serviceInterest" value={formData.serviceInterest} onChange={handleInputChange} className="w-full rounded-md border p-2">
                  <option value="">General inquiry</option>
                  <option value="whatsapp">WhatsApp platform</option>
                  <option value="ai">AI services</option>
                  <option value="integration">Integrations</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send message"}</Button>
                <span className="text-sm text-muted-foreground">We reply within 1-2 business days.</span>
              </div>
            </form>
          </section>

          <aside className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Contact details</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Head Office</div>
                  <div>123 Datacare Lane, Nairobi, Kenya</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div>+254 700 000000</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div>hello@datacare.example</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Hours</div>
                  <div>Mon—Fri, 9am—5pm EAT</div>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
export { default } from '@/pages/Contact'
