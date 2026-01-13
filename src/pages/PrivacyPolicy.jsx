import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

export default function PrivacyPolicy() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Privacy Policy", url: "https://covertechind.com/privacy-policy" }
  ]);

  return (
    <>
      <SEOHead
        title="Privacy Policy - Covertech Industries"
        description="Privacy Policy for Covertech Industries. Learn how we collect, use, and protect your personal information."
        schema={breadcrumbSchema}
      />

      <PageHero
        title="Privacy Policy"
        description="Your privacy is important to us"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg mb-8">
              Last Updated: January 13, 2026
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Introduction</h2>
            <p className="text-slate-600 mb-6">
              Covertech Industries ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Personal Information</h3>
            <p className="text-slate-600 mb-4">We may collect personal information that you provide to us, including:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Pool specifications and measurements</li>
              <li>Warranty registration details</li>
              <li>Dealer application information</li>
              <li>Payment and billing information</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Automatically Collected Information</h3>
            <p className="text-slate-600 mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Device and operating system details</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website addresses</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Process your orders and provide custom pool products</li>
              <li>Register and manage product warranties</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Process dealer applications</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Information Sharing</h2>
            <p className="text-slate-600 mb-6">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Service providers who assist in business operations</li>
              <li>Authorized dealers and installers (with your consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Security</h2>
            <p className="text-slate-600 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to data processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Cookies and Tracking</h2>
            <p className="text-slate-600 mb-6">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Children's Privacy</h2>
            <p className="text-slate-600 mb-6">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Changes to This Policy</h2>
            <p className="text-slate-600 mb-6">
              We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="text-slate-900 font-semibold mb-2">Covertech Industries</p>
              <p className="text-slate-600">26 Dansk Court, Toronto, ON M9W 5V8</p>
              <p className="text-slate-600">Phone: +1 (416) 640-5590</p>
              <p className="text-slate-600">Email: info@covertechind.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}