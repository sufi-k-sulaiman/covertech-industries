import { useEffect } from 'react';

export default function SEOHead({ 
  title, 
  description, 
  keywords = [],
  canonicalUrl,
  ogImage = "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
  ogType = "website",
  schema
}) {
  useEffect(() => {
    // Set document title
    document.title = title ? `${title} | Covertech Industries` : 'Covertech Industries - Premium Pool Liners, Safety Covers & Custom Solutions';
    
    // Update meta tags
    const setMeta = (name, content, property = false) => {
      let meta = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      setMeta('description', description);
    }
    if (keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    
    // Open Graph tags
    setMeta('og:title', title || 'Covertech Industries', true);
    setMeta('og:description', description || 'Premium pool liners, safety covers, and custom solutions since 1987.', true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', 'Covertech Industries', true);
    
    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || 'Covertech Industries');
    setMeta('twitter:description', description || 'Premium pool liners, safety covers, and custom solutions since 1987.');
    setMeta('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Schema.org structured data
    if (schema) {
      let schemaScript = document.querySelector('#schema-org');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'schema-org');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup schema on unmount
      const schemaScript = document.querySelector('#schema-org');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}

// Common schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Covertech Industries",
  "url": "https://covertechind.com",
  "logo": "https://covertechind.com/logo.png",
  "description": "Premium pool liners, safety covers, and custom solutions manufacturer since 1987.",
  "foundingDate": "1987",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "26 Dansk Court",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M9W 5V8",
    "addressCountry": "CA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-416-640-5590",
    "contactType": "customer service",
    "email": "info@covertechind.com",
    "availableLanguage": ["English", "French"]
  },
  "sameAs": [
    "https://www.facebook.com/covertechindustries",
    "https://www.linkedin.com/company/covertech-industries"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Covertech Industries",
  "image": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
  "priceRange": "$$",
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
  "telephone": "+1-416-640-5590",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:30",
      "closes": "17:30"
    }
  ]
};

export const createProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.images?.[0],
  "brand": {
    "@type": "Brand",
    "name": "Covertech Industries"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Covertech Industries"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "CAD",
    "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
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