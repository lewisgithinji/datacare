import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const assessmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Your role/title is required"),
  industry: z.string().min(1, "Please select your industry"),
  companySize: z.string().min(1, "Please select company size"),
  annualRevenue: z.string().min(1, "Please select revenue range"),
  primaryChallenge: z.string().min(10, "Please describe your primary challenge (at least 10 characters)"),
  seniorEmployees: z.string().min(1, "Please specify number of senior employees"),
  repeatWorkPercentage: z.string().min(1, "Please estimate percentage"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

const AssessmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      industry: "",
      companySize: "",
      annualRevenue: "",
      primaryChallenge: "",
      seniorEmployees: "",
      repeatWorkPercentage: "",
      preferredContact: "email",
    },
  });

  const onSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);

    try {
      // Format the message for EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role,
        industry: data.industry,
        company_size: data.companySize,
        annual_revenue: data.annualRevenue,
        primary_challenge: data.primaryChallenge,
        senior_employees: data.seniorEmployees,
        repeat_work_percentage: data.repeatWorkPercentage,
        preferred_contact: data.preferredContact,
        subject: `Employee Amplification Assessment Request - ${data.company}`,
        message: `
NEW EMPLOYEE AMPLIFICATION ASSESSMENT REQUEST

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Company: ${data.company}
- Role: ${data.role}

Company Details:
- Industry: ${data.industry}
- Company Size: ${data.companySize}
- Annual Revenue: ${data.annualRevenue}

Capacity Analysis:
- Number of Senior Employees: ${data.seniorEmployees}
- Estimated % Time on Repetitive Work: ${data.repeatWorkPercentage}%

Primary Challenge:
${data.primaryChallenge}

Preferred Contact Method: ${data.preferredContact}

---
This is a HIGH-VALUE lead for Employee Amplification service.
Respond within 24 hours with assessment scheduling options.
        `.trim(),
      };

      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      );

      setIsSubmitted(true);
      toast({
        title: "Assessment Request Received!",
        description: "We'll contact you within 24 hours to schedule your complimentary capacity assessment.",
      });

      // Track conversion (if analytics is set up)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Employee Amplification',
          event_label: 'Assessment Request',
          value: data.company,
        });
      }

    } catch (error) {
      console.error("Error submitting assessment request:", error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly at info@datacare.co.ke",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-green-900 dark:text-green-100">
            Request Received!
          </h3>
          <p className="text-lg text-green-800 dark:text-green-200 mb-6">
            Thank you for your interest in Employee Amplification.
          </p>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">What Happens Next:</h4>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">1.</span>
                <span>Within 24 hours, our team will review your submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">2.</span>
                <span>We'll reach out to schedule your 90-minute strategic assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">3.</span>
                <span>You'll receive a detailed capacity analysis and ROI projection</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Questions? Contact us at <strong>+254-784-155752</strong> or <strong>info@datacare.co.ke</strong>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Request Your Free Capacity Assessment</h3>
        <p className="text-muted-foreground">
          90-minute complimentary strategic assessment • No obligation • Immediate insights
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+254 700 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role/Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. CEO, Operations Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company Information */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-4">Company Information</h4>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Ltd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="banking">Banking & Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="legal">Legal Services</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="ngo">NGO & Non-Profit</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="retail">Retail & E-Commerce</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of employees" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue (KES) *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<10M">Less than 10M</SelectItem>
                        <SelectItem value="10M-50M">10M - 50M</SelectItem>
                        <SelectItem value="50M-100M">50M - 100M</SelectItem>
                        <SelectItem value="100M-500M">100M - 500M</SelectItem>
                        <SelectItem value="500M+">500M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Capacity Analysis */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-4">Capacity Analysis</h4>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="seniorEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Senior Employees *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 5" {...field} />
                    </FormControl>
                    <FormDescription>
                      Key employees whose capacity you want to amplify
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatWorkPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% Time on Repetitive Tasks *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 60" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimate 0-100%
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="primaryChallenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Challenge *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your biggest capacity challenge... (e.g., 'Our finance team spends 20 hours/week on manual report generation' or 'Senior staff drowning in administrative tasks')"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The more specific, the better we can help
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Preferred Contact */}
          <div className="border-t border-border pt-6">
            <FormField
              control={form.control}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Request Free Assessment
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you agree to be contacted by Datacare Limited regarding Employee Amplification services.
            We respect your privacy and will never share your information.
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default AssessmentForm;
