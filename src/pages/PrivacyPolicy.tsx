import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail, AlertTriangle } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy - Datacare Limited"
        description="Datacare Limited's privacy policy detailing how we collect, use, and protect your personal information in compliance with Kenya Data Protection Act 2019."
        keywords="privacy policy, data protection, GDPR, Kenya DPA, personal information, data security"
      />
      <Navigation />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: November 26, 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Introduction
              </h2>
              <p className="text-muted-foreground mb-4">
                Datacare Limited ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://datacare.co.ke" className="text-primary hover:underline">datacare.co.ke</a> or use our services.
              </p>
              <p className="text-muted-foreground">
                This policy complies with the Kenya Data Protection Act 2019, the General Data Protection Regulation (GDPR), and other applicable data protection laws.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold mb-3">Personal Information You Provide</h3>
              <p className="text-muted-foreground mb-4">
                We collect information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Communication Data:</strong> Messages and inquiries sent through our contact forms</li>
                <li><strong>Service Requests:</strong> Information about the services you're interested in</li>
                <li><strong>Account Information:</strong> If you create an account, username and authentication data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Usage Data:</strong> Pages viewed, time spent, navigation paths</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Cookies:</strong> Session identifiers and preference settings</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Delivery:</strong> To respond to your inquiries and provide requested services</li>
                <li><strong>Communication:</strong> To send you updates, newsletters, and marketing materials (with your consent)</li>
                <li><strong>Improvement:</strong> To analyze usage patterns and improve our website and services</li>
                <li><strong>Security:</strong> To protect against fraud, unauthorized access, and security threats</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            {/* Legal Basis for Processing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing</h2>
              <p className="text-muted-foreground mb-4">
                We process your personal data based on:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Consent:</strong> You have given explicit consent for specific processing activities</li>
                <li><strong>Contract Performance:</strong> Processing is necessary to fulfill our contractual obligations</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests</li>
                <li><strong>Legal Obligation:</strong> Processing is required by law</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> EmailJS (email delivery), Supabase (database hosting), Cloudflare (hosting and CDN)</li>
                <li><strong>Professional Advisors:</strong> Lawyers, auditors, and consultants as necessary</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>We do not sell your personal information to third parties.</strong>
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                Data Security
              </h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure database hosting with access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response procedures for data breaches</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide our services and fulfill contractual obligations</li>
                <li>Comply with legal, tax, and accounting requirements (typically 7 years)</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Contact form submissions are retained for 2 years. Account data is retained while your account is active plus 1 year after closure.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Data Protection Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under the Kenya Data Protection Act 2019 and GDPR, you have the following rights:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@datacare.co.ke" className="text-primary hover:underline">privacy@datacare.co.ke</a>
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your data may be transferred to and processed in countries outside Kenya, including the United States and European Union, where our service providers are located. We ensure appropriate safeguards are in place through standard contractual clauses and adequacy decisions.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p className="font-semibold mb-2">Datacare Limited</p>
                <p className="text-muted-foreground mb-1">Data Protection Officer</p>
                <p className="text-muted-foreground mb-1">Email: <a href="mailto:privacy@datacare.co.ke" className="text-primary hover:underline">privacy@datacare.co.ke</a></p>
                <p className="text-muted-foreground mb-1">Phone: +254 784 155 752</p>
                <p className="text-muted-foreground">Address: Nairobi, Kenya</p>
              </div>
            </section>

            {/* Complaints */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Complaints
              </h2>
              <p className="text-muted-foreground">
                If you believe your data protection rights have been violated, you have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya:
              </p>
              <div className="bg-muted p-6 rounded-lg mt-4">
                <p className="font-semibold mb-2">Office of the Data Protection Commissioner</p>
                <p className="text-muted-foreground mb-1">Website: <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.odpc.go.ke</a></p>
                <p className="text-muted-foreground">Email: info@odpc.go.ke</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
