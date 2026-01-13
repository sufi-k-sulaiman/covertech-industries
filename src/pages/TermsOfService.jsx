import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

export default function TermsOfService() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Terms of Service", url: "https://covertechind.com/terms-of-service" }
  ]);

  return (
    <>
      <SEOHead
        title="Terms of Service - Covertech Industries"
        description="Terms of Service for Covertech Industries. Read our terms and conditions for using our products and services."
        schema={breadcrumbSchema}
      />

      <PageHero
        title="Terms of Service"
        description="Please read these terms carefully"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        minHeight="min-h-[40vh]"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg mb-8">
              Last Updated: January 13, 2026
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 mb-6">
              By accessing or using Covertech Industries' website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Products and Services</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Product Information</h3>
            <p className="text-slate-600 mb-6">
              We make every effort to display our pool liners, safety covers, and other products as accurately as possible. However, actual colors and patterns may vary slightly due to screen settings and lighting conditions.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Custom Orders</h3>
            <p className="text-slate-600 mb-6">
              Custom-designed pool products are manufactured specifically for your pool dimensions and specifications. Accurate measurements are essential. We are not responsible for errors in measurements provided by customers or third-party installers.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Pricing and Payment</h2>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>All prices are subject to change without notice</li>
              <li>Quotes are valid for 30 days unless otherwise stated</li>
              <li>Payment terms will be specified on your invoice</li>
              <li>We accept major credit cards and approved payment methods</li>
              <li>All sales are final for custom-manufactured products</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Warranties</h2>
            <p className="text-slate-600 mb-6">
              Our products come with industry-leading warranties as specified in individual product documentation. Warranty coverage depends on proper installation, maintenance, and registration. Please refer to our Warranty page and product-specific warranty documents for complete terms and conditions.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Warranty Registration</h3>
            <p className="text-slate-600 mb-6">
              Products must be registered within 30 days of installation to activate warranty coverage. Failure to register may void warranty claims.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Installation</h2>
            <p className="text-slate-600 mb-6">
              We strongly recommend professional installation by authorized dealers or qualified installers. Improper installation may void warranty coverage. Installation services are provided by independent contractors and are subject to separate terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Returns and Cancellations</h2>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Custom-manufactured products cannot be returned or cancelled once production begins</li>
              <li>Stock items may be returned within 14 days in original, unopened condition</li>
              <li>A restocking fee may apply to eligible returns</li>
              <li>Shipping costs are non-refundable</li>
              <li>Defective products will be replaced or repaired under warranty terms</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-6">
              Covertech Industries shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability is limited to the purchase price of the product.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Dealer Program</h2>
            <p className="text-slate-600 mb-6">
              Participation in our dealer program is subject to approval and separate dealer agreements. Dealers must maintain professional standards and comply with all program requirements. We reserve the right to terminate dealer relationships at our discretion.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 mb-6">
              All content on this website, including designs, logos, patterns, and text, is the property of Covertech Industries and protected by copyright and trademark laws. Unauthorized use is prohibited.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Privacy</h2>
            <p className="text-slate-600 mb-6">
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect and use your information.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Governing Law</h2>
            <p className="text-slate-600 mb-6">
              These Terms of Service are governed by the laws of Ontario, Canada. Any disputes shall be resolved in the courts of Ontario.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 mb-6">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Contact Information</h2>
            <p className="text-slate-600 mb-4">
              For questions about these Terms of Service, please contact us:
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