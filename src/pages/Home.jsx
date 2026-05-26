import SEOHead, { organizationSchema, localBusinessSchema, websiteSchema, createBreadcrumbSchema } from '@/components/seo/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProductsShowcase from '@/components/home/ProductsShowcase';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" }
  ]);

  const homeSchema = [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://covertechind.com/#webpage",
      "url": "https://covertechind.com",
      "name": "Covertech Industries - Premium Pool Liners, Safety Covers & Custom Solutions",
      "description": "North America's trusted manufacturer of premium vinyl pool liners, ASTM-certified safety covers, solar blankets, and custom pool solutions since 1987. Made in Canada.",
      "inLanguage": "en-CA",
      "isPartOf": { "@id": "https://covertechind.com/#website" },
      "about": { "@id": "https://covertechind.com/#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/51ca60482_01-Liner.jpg"
      }
    }
  ];

  return (
    <>
      <SEOHead
        title="Premium Pool Liners, Safety Covers & Custom Solutions"
        description="Covertech Industries - North America's trusted manufacturer of premium vinyl pool liners, ASTM-certified safety covers, solar blankets, and custom solutions since 1987. 25-year warranty. Made in Canada."
        canonicalUrl="https://covertechind.com"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/51ca60482_01-Liner.jpg"
        keywords={[
          "pool liners Canada",
          "vinyl pool liners",
          "ASTM certified safety covers",
          "solar pool covers",
          "winter pool covers",
          "custom pool liners Toronto",
          "pool cover manufacturer",
          "above ground pool liners",
          "in-ground pool liners",
          "safety pool covers",
          "pool steel kits",
          "golf green covers",
          "Covertech Industries",
          "made in Canada pool products",
          "Acu-Fit pool liners",
          "25 year warranty pool liner",
          "pool safety cover installation",
          "AquaShimmer vinyl liner"
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