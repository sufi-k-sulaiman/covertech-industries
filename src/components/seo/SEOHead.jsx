import { useEffect } from 'react';

export default function SEOHead({ 
  title, 
  description, 
  keywords = [],
  canonicalUrl,
  ogImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/51ca60482_01-Liner.jpg",
  ogType = "website",
  schema,
  noindex = false
}) {
  useEffect(() => {
    const siteName = 'Covertech Industries';
    document.title = title ? `${siteName} | ${title}` : `${siteName} - Premium Pool Liners, Safety Covers & Custom Solutions Since 1987`;
    
    // Favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) { favicon = document.createElement('link'); favicon.setAttribute('rel', 'icon'); document.head.appendChild(favicon); }
    favicon.setAttribute('href', 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9287cb6ef_favicon.png');

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attr, name); document.head.appendChild(meta); }
      meta.setAttribute('content', content);
    };

    const fullDesc = description || 'Covertech Industries — North America\'s trusted manufacturer of premium vinyl pool liners, ASTM-certified safety covers, solar blankets and winter covers since 1987. Made in Canada. 25-year warranty.';
    const fullTitle = title ? `${siteName} | ${title}` : siteName;
    const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://covertechind.com');

    // Core meta
    setMeta('description', fullDesc);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (keywords.length > 0) setMeta('keywords', keywords.join(', '));
    setMeta('author', 'Covertech Industries');
    setMeta('publisher', 'Covertech Industries');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', fullDesc, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', fullTitle, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', siteName, true);
    setMeta('og:url', pageUrl, true);
    setMeta('og:locale', 'en_CA', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@CovertechInd');
    setMeta('twitter:creator', '@CovertechInd');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', fullDesc);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:image:alt', fullTitle);

    // Geo / business
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'Toronto');
    setMeta('geo.position', '43.7001;-79.5814');
    setMeta('ICBM', '43.7001, -79.5814');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://covertechind.com'));

    // Schema.org structured data — support array of schemas
    const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    // Remove old schema scripts
    document.querySelectorAll('script[data-schema-org]').forEach(s => s.remove());

    schemas.forEach((s, i) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema-org', String(i));
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-schema-org]').forEach(s => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema, noindex]);

  return null;
}

// ── Schema helpers ──────────────────────────────────────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://covertechind.com/#organization",
  "name": "Covertech Industries",
  "legalName": "Covertech Industries Ltd.",
  "url": "https://covertechind.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png",
    "width": 400,
    "height": 80
  },
  "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/51ca60482_01-Liner.jpg",
  "description": "Premium pool liners, ASTM-certified safety covers, solar blankets, winter covers, and custom pool solutions manufacturer since 1987. Made in Canada.",
  "foundingDate": "1987",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 25 },
  "slogan": "Keeping You Covered Since 1987",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "26 Dansk Court",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M9W 5V8",
    "addressCountry": "CA"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-416-640-5590",
      "contactType": "customer service",
      "email": "info@covertechind.com",
      "availableLanguage": ["English", "French"],
      "areaServed": ["CA", "US"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-416-640-5590",
      "contactType": "sales",
      "areaServed": ["CA", "US"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/CovertechInd/",
    "https://ca.linkedin.com/company/covertech-industries-ltd",
    "https://www.instagram.com/covertechind/"
  ],
  "hasMap": "https://www.google.com/maps/place/26+Dansk+Court,+Toronto,+ON",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.7001, "longitude": -79.5814 },
    "geoRadius": "5000000"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Manufacturer"],
  "@id": "https://covertechind.com/#localbusiness",
  "name": "Covertech Industries",
  "image": [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/51ca60482_01-Liner.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15469b8e5_01Safety.jpg"
  ],
  "priceRange": "$$",
  "currenciesAccepted": "CAD, USD",
  "paymentAccepted": "Cash, Credit Card, Cheque",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "26 Dansk Court",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M9W 5V8",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.7001,
    "longitude": -79.5814
  },
  "url": "https://covertechind.com",
  "telephone": "+1-416-640-5590",
  "email": "info@covertechind.com",
  "foundingDate": "1987",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "17:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "147",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Cathy Cully" },
      "reviewBody": "On my second Covertech pool cover. The first lasted 15 years. Returned the old cover and the new one was ready within weeks. Very responsive and easy to work with."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Chris Mckechnie" },
      "reviewBody": "Covertech has always done right by me and my customers. I have been installing covers for 16 years. Quality tough made products with knowledgeable staff and quick turnaround."
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://covertechind.com/#website",
  "name": "Covertech Industries",
  "url": "https://covertechind.com",
  "description": "Premium pool liners, safety covers, solar covers, and custom pool solutions since 1987.",
  "inLanguage": "en-CA",
  "publisher": { "@id": "https://covertechind.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://covertechind.com/Products?search={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
};

export const createWebPageSchema = ({ name, description, url, breadcrumb }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  "name": name,
  "description": description,
  "url": url,
  "inLanguage": "en-CA",
  "isPartOf": { "@id": "https://covertechind.com/#website" },
  "publisher": { "@id": "https://covertechind.com/#organization" },
  ...(breadcrumb ? { "breadcrumb": breadcrumb } : {})
});

export const createFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
});

export const createHowToSchema = ({ name, description, steps, image }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  ...(image ? { "image": image } : {}),
  "supply": [{ "@type": "HowToSupply", "name": "Covertech Pool Product" }],
  "tool": [{ "@type": "HowToTool", "name": "Installation Guide" }],
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": `Step ${index + 1}`,
    "text": step
  }))
});

export const createBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.images || product.image,
  "brand": { "@type": "Brand", "name": "Covertech Industries" },
  "manufacturer": { "@id": "https://covertechind.com/#organization" },
  "material": "Premium Vinyl / Reinforced Fabric",
  "countryOfOrigin": "CA",
  ...(product.sku ? { "sku": product.sku } : {}),
  "offers": {
    "@type": "Offer",
    "url": `https://covertechind.com/ProductDetails?slug=${product.slug || ''}`,
    "availability": "https://schema.org/InStock",
    "priceCurrency": "CAD",
    "seller": { "@id": "https://covertechind.com/#organization" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5"
  },
  ...(product.warranty ? {
    "warranty": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": { "@type": "QuantitativeValue", "value": product.warranty, "unitCode": "ANN" },
      "warrantyScope": "https://schema.org/WarrantyScope/Replacement"
    }
  } : {})
});

export const createArticleSchema = ({ title, description, url, image, datePublished, dateModified }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url,
  ...(image ? { "image": image } : {}),
  "datePublished": datePublished || "2024-01-01",
  "dateModified": dateModified || new Date().toISOString().split('T')[0],
  "author": { "@id": "https://covertechind.com/#organization" },
  "publisher": { "@id": "https://covertechind.com/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": url }
});

export const createImageGallerySchema = (images, name, description) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": name,
  "description": description,
  "associatedMedia": images.map((url, i) => ({
    "@type": "ImageObject",
    "url": url,
    "name": `${name} - Image ${i + 1}`,
    "contentUrl": url
  }))
});