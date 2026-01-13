import SEOHead, { organizationSchema, localBusinessSchema } from '@/components/seo/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProductsShowcase from '@/components/home/ProductsShowcase';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      {
        "@type": "WebSite",
        "name": "Covertech Industries",
        "url": "https://covertechind.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://covertechind.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Premium Pool Liners, Safety Covers & Custom Solutions"
        description="Covertech Industries - North America's trusted manufacturer of premium vinyl pool liners, ASTM-certified safety covers, solar blankets, and custom solutions since 1987. 25-year warranty. Made in Canada."
        keywords={[
          "pool liners",
          "vinyl pool liners",
          "safety pool covers",
          "ASTM certified pool covers",
          "solar pool covers",
          "winter pool covers",
          "pool steel kits",
          "golf green covers",
          "Covertech Industries",
          "made in Canada",
          "pool manufacturer",
          "custom pool liners",
          "Acu-Fit liners",
          "pool safety covers Toronto"
        ]}
        schema={homeSchema}
      />

      <main className="overflow-hidden">
        <HeroSection />
        <WhyChooseUs />
        <ProductsShowcase />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
}