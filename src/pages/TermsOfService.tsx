import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { FileText, Scale, Shield, AlertCircle, Users, DollarSign, Ban, Copyright } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Terms of Service - Datacare Limited"
        description="Terms of Service for Datacare Limited's IT services including Microsoft 365, Google Workspace, cybersecurity, and web design solutions."
        keywords="terms of service, legal terms, service agreement, terms and conditions, Datacare Kenya"
      />
      <Navigation />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: November 26, 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Agreement to Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Datacare Limited ("Company," "we," "us," or "our") governing your access to and use of our website <a href="https://datacare.co.ke" className="text-primary hover:underline">datacare.co.ke</a> and our IT services.
              </p>
              <p className="text-muted-foreground">
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Our Services
              </h2>
              <p className="text-muted-foreground mb-4">
                Datacare Limited provides enterprise IT services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Microsoft 365 licensing, deployment, and management</li>
                <li>Google Workspace solutions and support</li>
                <li>Cybersecurity services and consulting</li>
                <li>Cloud infrastructure solutions (AWS, Azure, Google Cloud)</li>
                <li>Web design and development services</li>
                <li>IT consulting and project management</li>
                <li>Technical support and maintenance</li>
              </ul>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Represent a legitimate business or organization (for B2B services)</li>
                <li>Provide accurate and complete registration information</li>
                <li>Not be prohibited from using our services under applicable laws</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                When creating an account with us:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You are responsible for maintaining account confidentiality</li>
                <li>You must notify us immediately of unauthorized access</li>
                <li>You are liable for all activities under your account</li>
                <li>You must provide accurate and up-to-date information</li>
                <li>We reserve the right to suspend or terminate accounts for violations</li>
              </ul>
            </section>

            {/* Payment Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                Payment and Billing
              </h2>
              <h3 className="text-xl font-semibold mb-3">Fees</h3>
              <p className="text-muted-foreground mb-4">
                Service fees are specified in your service agreement or quotation. All fees are in Kenyan Shillings (KES) or US Dollars (USD) unless otherwise stated.
              </p>

              <h3 className="text-xl font-semibold mb-3">Payment Terms</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Payment is due within 30 days of invoice date unless otherwise agreed</li>
                <li>Late payments may incur interest at 2% per month</li>
                <li>We accept bank transfers, M-Pesa, credit/debit cards, and cheques</li>
                <li>Subscription services are billed monthly or annually in advance</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Refunds</h3>
              <p className="text-muted-foreground">
                Refunds are provided at our discretion based on the specific service agreement. Software licenses and third-party services are generally non-refundable. Custom development work may be eligible for partial refunds within 14 days if no work has commenced.
              </p>
            </section>

            {/* Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Ban className="h-6 w-6 text-primary" />
                Acceptable Use Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use our services for illegal activities or to violate any laws</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Scrape, copy, or reverse engineer our services</li>
                <li>Use our services to send spam or unsolicited communications</li>
                <li>Violate intellectual property rights</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Copyright className="h-6 w-6 text-primary" />
                Intellectual Property Rights
              </h2>
              <h3 className="text-xl font-semibold mb-3">Our Property</h3>
              <p className="text-muted-foreground mb-4">
                All content on our website and in our services, including text, graphics, logos, software, and documentation, is owned by Datacare Limited or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3">Your Content</h3>
              <p className="text-muted-foreground mb-4">
                You retain ownership of any content you provide to us. By using our services, you grant us a license to use, store, and process your content solely to provide our services.
              </p>

              <h3 className="text-xl font-semibold mb-3">Custom Development</h3>
              <p className="text-muted-foreground">
                For custom development projects, intellectual property ownership is specified in the project agreement. Generally, you own the final deliverables upon full payment, while we retain ownership of pre-existing components and frameworks.
              </p>
            </section>

            {/* Service Level Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Level Agreement (SLA)</h2>
              <p className="text-muted-foreground mb-4">
                For enterprise clients with SLA agreements:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Uptime Guarantee:</strong> 99.9% uptime for managed services</li>
                <li><strong>Response Times:</strong> Critical issues within 2 hours, standard issues within 24 hours</li>
                <li><strong>Support Hours:</strong> 24/7 for critical issues, business hours for standard support</li>
                <li><strong>Maintenance Windows:</strong> Scheduled maintenance during off-peak hours with advance notice</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Specific SLA terms are detailed in your service agreement.
              </p>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Data Protection and Privacy
              </h2>
              <p className="text-muted-foreground mb-4">
                We are committed to protecting your data in compliance with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Kenya Data Protection Act 2019</li>
                <li>General Data Protection Regulation (GDPR)</li>
                <li>Industry-specific regulations (e.g., PCI DSS for payment data)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                For detailed information on how we handle your data, please review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </section>

            {/* Warranties and Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Warranties and Disclaimers</h2>
              <h3 className="text-xl font-semibold mb-3">Our Warranties</h3>
              <p className="text-muted-foreground mb-4">
                We warrant that our services will be performed with professional care and skill consistent with industry standards.
              </p>

              <h3 className="text-xl font-semibold mb-3">Disclaimers</h3>
              <p className="text-muted-foreground mb-4 uppercase font-semibold">
                EXCEPT AS EXPRESSLY PROVIDED IN YOUR SERVICE AGREEMENT, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-muted-foreground">
                We do not warrant that our services will be uninterrupted, error-free, or completely secure. We are not responsible for third-party services, software, or content.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim</li>
                <li>We are not liable for indirect, consequential, incidental, or punitive damages</li>
                <li>We are not liable for data loss if you failed to maintain backups</li>
                <li>We are not liable for service interruptions caused by third parties or force majeure</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold Datacare Limited harmless from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Your violation of these Terms</li>
                <li>Your violation of any laws or regulations</li>
                <li>Your infringement of third-party rights</li>
                <li>Your misuse of our services</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <h3 className="text-xl font-semibold mb-3">By You</h3>
              <p className="text-muted-foreground mb-4">
                You may terminate your account at any time by providing written notice. Prepaid fees are non-refundable unless otherwise agreed.
              </p>

              <h3 className="text-xl font-semibold mb-3">By Us</h3>
              <p className="text-muted-foreground mb-4">
                We may suspend or terminate your account if you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Violate these Terms</li>
                <li>Fail to pay fees when due</li>
                <li>Engage in fraudulent activity</li>
                <li>Use our services in a manner that harms us or other users</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Effect of Termination</h3>
              <p className="text-muted-foreground">
                Upon termination, your right to use our services ceases immediately. We will provide data export facilities for 30 days post-termination. Data may be deleted after this period.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
              <h3 className="text-xl font-semibold mb-3">Negotiation</h3>
              <p className="text-muted-foreground mb-4">
                In the event of a dispute, parties agree to first attempt resolution through good-faith negotiation.
              </p>

              <h3 className="text-xl font-semibold mb-3">Arbitration</h3>
              <p className="text-muted-foreground mb-4">
                If negotiation fails, disputes shall be resolved through arbitration under the Arbitration Act 1995 of Kenya. The arbitration shall be conducted in Nairobi, Kenya.
              </p>

              <h3 className="text-xl font-semibold mb-3">Governing Law</h3>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the Republic of Kenya. Any legal proceedings shall be conducted in the courts of Nairobi, Kenya.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through our website. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Miscellaneous */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Miscellaneous</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Datacare Limited</li>
                <li><strong>Severability:</strong> If any provision is unenforceable, the remaining provisions remain in effect</li>
                <li><strong>Waiver:</strong> Our failure to enforce any right does not constitute a waiver of that right</li>
                <li><strong>Assignment:</strong> You may not assign these Terms without our consent; we may assign them freely</li>
                <li><strong>Force Majeure:</strong> We are not liable for delays caused by circumstances beyond our control</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms or to report violations, contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p className="font-semibold mb-2">Datacare Limited</p>
                <p className="text-muted-foreground mb-1">Legal Department</p>
                <p className="text-muted-foreground mb-1">Email: <a href="mailto:legal@datacare.co.ke" className="text-primary hover:underline">legal@datacare.co.ke</a></p>
                <p className="text-muted-foreground mb-1">Phone: +254 784 155 752</p>
                <p className="text-muted-foreground">Address: Nairobi, Kenya</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
