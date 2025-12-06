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
import { Loader2, Send, CheckCircle, ArrowRight, ArrowLeft, User, Building2, BarChart3 } from "lucide-react";
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

const AssessmentFormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof AssessmentFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone", "company", "role"];
    } else if (step === 2) {
      fieldsToValidate = ["industry", "companySize", "annualRevenue"];
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800 max-w-2xl mx-auto">
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

  const steps = [
    { number: 1, title: "Contact Info", icon: User },
    { number: 2, title: "Company Details", icon: Building2 },
    { number: 3, title: "Capacity Analysis", icon: BarChart3 }
  ];

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-orange-600 text-white scale-110"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold text-center ${
                      isActive ? "text-orange-600" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 -mt-8">
                    <div
                      className={`h-full transition-all ${
                        currentStep > step.number ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-muted-foreground">Let's start with your details</p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@company.com" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+254 700 000 000" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Ltd" {...field} className="h-12" />
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
                        <Input placeholder="e.g. CEO, Operations Manager" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Company Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-2">Company Details</h3>
                <p className="text-muted-foreground">Tell us about your organization</p>
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
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

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
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
                          <SelectTrigger className="h-12">
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
          )}

          {/* Step 3: Capacity Analysis */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-2">Capacity Analysis</h3>
                <p className="text-muted-foreground">Help us understand your capacity challenges</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seniorEmployees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Senior Employees *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 5" {...field} className="h-12" />
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
                        <Input type="number" placeholder="e.g. 60" {...field} className="h-12" />
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
                        className="min-h-[100px]"
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

              <FormField
                control={form.control}
                name="preferredContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Method *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
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
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={prevStep}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                size="lg"
                onClick={nextStep}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Request Free Assessment
                  </>
                )}
              </Button>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you agree to be contacted by Datacare Limited regarding Employee Amplification services.
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default AssessmentFormWizard;
