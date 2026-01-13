import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Shield, Award, MapPin, Check, Star, ArrowRight, 
  MessageSquare, Palette, ChevronLeft, ChevronRight,
  Droplets, Thermometer, Snowflake, Wrench, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead, { createProductSchema, createBreadcrumbSchema } from '@/components/seo/SEOHead';

const productsData = {
  "in-ground-liners": {
    name: "In-Ground Pool Liners",
    category: "Pool Liners",
    tagline: "Premium AquaShimmer vinyl liners with custom patterns",
    description: "Premium AquaShimmer collection featuring Harmony Gold HDE, Carnival, Esagono & Butterfly patterns. Custom designed and fabricated incorporating proprietary sealing technology. Manufactured with attached vinyl over steps, benches, and sundecks.",
    fullDescription: "Experience unmatched quality with our In-Ground Liners. Engineered with precision and crafted from premium materials, this product delivers exceptional performance and durability that pool owners have trusted for over 35 years. Our commitment to excellence means every liner undergoes rigorous quality testing and meets the highest industry standards.",
    warranty: 25,
    images: [
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&q=80"
    ],
    features: ["25-Season Warranty", "AquaShimmer Technology", "30mil Cold Crack-resistant", "100% Anti-bacterial Virgin Resin", "UV & Chemical-resistant", "Made in Canada since 1987"],
    specifications: { Category: "Pool Liners", Thickness: "30mil", Material: "Anti-bacterial Virgin Resin", Texture: "Non-slip Available", "Custom Sizes": "Available", Origin: "Canada (since 1987)" },
    bestseller: true,
    patterns: [
      { name: "Carnival", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/c4f5ad9e3_Carnival.jpg", collection: "Platinum Plus" },
      { name: "Butterfly", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/76470d0e3_Butterfly.jpg", collection: "Platinum Plus" },
      { name: "Esagono", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/6075f34a6_Esagono.jpg", collection: "Platinum Plus" },
      { name: "Harmony Gold HDE", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/15e2c0ffa_HarmonyGold-HDE.jpg", collection: "Platinum Plus" },
      { name: "Canterbury", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/2b4c8be73_Canterbury.jpg", collection: "Platinum" },
      { name: "HD Antigua", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/70115a868_HDAntigua.jpg", collection: "Platinum" },
      { name: "Carrara Marble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/8e730c3e9_CarraraMarble.jpg", collection: "Platinum" },
      { name: "Blue Maui", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/ce6fcf82d_BlueMaui.jpg", collection: "Platinum" },
    ]
  },
  "safety-covers": {
    name: "Pool Safety Covers",
    category: "Safety Covers",
    tagline: "ASTM F1346-91 certified protection",
    description: "Premium ASTM-certified safety covers engineered for maximum protection and durability. Our safety covers meet or exceed ASTM F1346-91 standards, providing unmatched safety for your pool during off-season months.",
    fullDescription: "Available in mesh and solid configurations with industry-leading warranties up to 30 years. Experience unmatched quality with our Pool Safety Covers, engineered with precision and crafted from premium materials.",
    warranty: 30,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/906a926d6_BlackMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/5beb04d59_BlueMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f28c1a388_GreenMesh.png"
    ],
    features: ["ASTM F1346-91 Certified", "Up to 30-Year Warranty", "Professional Installation Available", "Custom-Fit Design", "Multiple Anchoring Systems", "Winter-Ready Protection"],
    specifications: { Category: "Safety Covers", Certification: "ASTM F1346-91", Types: "Mesh & Solid", Warranty: "Up to 30 Years", Installation: "Professional Recommended", Origin: "North America" },
    bestseller: true,
    variants: [
      { name: "Premier Mesh Safety Cover", warranty: "18 Years", features: ["500 psi Burst Strength", "95%+ Sun Block", "Water Seepage Design"] },
      { name: "Deluxe Mesh Safety Cover", warranty: "20 Years", features: ["670 psi Burst Strength", "99% Sun Block", "Tighter Weave"] },
      { name: "Solid Safety Cover", warranty: "15 Years", features: ["100% Sun Block", "12oz PVC Coated", "Optional Drain Panel"] }
    ]
  },
  "solar-covers": {
    name: "Solar Pool Covers",
    category: "Solar Covers",
    tagline: "Reduce heating costs by up to 70%",
    description: "Premium solar covers and systems designed to maximize your pool's efficiency. Reduce heating costs by up to 70%, minimize evaporation, and extend your swimming season with our innovative solar solutions.",
    fullDescription: "Solar covers are one of the most cost-effective investments you can make for your pool, providing year-round benefits and substantial savings on heating and chemical costs.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/e499b3e0a_SolarCover.jpg"
    ],
    features: ["Up to 70% Heating Cost Reduction", "Reduces Evaporation", "Extends Swimming Season", "Multiple Options Available"],
    specifications: { Category: "Solar Covers", "Heat Reduction": "Up to 70%", Types: "Solar-Extreme™, Thermo Shield™", "Custom Sizes": "Available" },
    bestseller: true,
    variants: [
      { name: "Solar-Extreme™", features: ["Up to 70% Cost Reduction", "Prevents Night Heat Loss", "Superior Durability"] },
      { name: "Thermo Shield™", features: ["25% Higher Temperature", "Blue/Black Design", "Maximum Heat Transfer"] },
      { name: "ClearDeck System", features: ["Below-Deck System", "One-Person Operation", "Patented Design"] }
    ]
  },
  "winter-covers": {
    name: "Winter Pool Covers",
    category: "Winter Covers",
    tagline: "Heavy-duty winter protection",
    description: "Protect your pool during the off-season with our durable winter covers. Designed to withstand harsh weather conditions, heavy snow loads, and keep debris out all winter long.",
    fullDescription: "Engineered with precision and crafted from premium materials, this product delivers exceptional performance and durability that pool owners have trusted for over 35 years.",
    warranty: 15,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1de8c9711_WinterCover-Beaded-02.jpg"
    ],
    features: ["Weather Resistant", "Heavy Duty Material", "UV Protected", "Multiple Sizes", "Easy Installation", "Wind Resistant"],
    specifications: { Category: "Winter Covers", Material: "Heavy Duty", "UV Protection": "Yes", "Custom Sizes": "Available" },
    bestseller: false
  },
  "steel-kits": {
    name: "Steel Pool Kits",
    category: "Accessories",
    tagline: "Professional-grade construction kits",
    description: "Premium steel construction kits for pool installation. Durable, corrosion-resistant materials engineered for long-lasting performance and structural integrity.",
    fullDescription: "Heavy-duty galvanized steel panels engineered for structural integrity. Complete hardware package including brackets, bolts, and fasteners. Designed to withstand ground pressure and freeze-thaw cycles.",
    warranty: 25,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b4e004b08_Steelkit-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b87eea138_Steelkit-02.jpg"
    ],
    features: ["Heavy Duty Construction", "Corrosion Resistant", "Easy Installation", "Professional Grade", "Complete Kit", "Made in North America"],
    specifications: { Category: "Accessories", Material: "Galvanized Steel", Coating: "Corrosion Resistant", Origin: "North America" },
    bestseller: false
  },
  "golf-covers": {
    name: "Golf Green Covers",
    category: "Golf & Sports",
    tagline: "Protect your turf investment",
    description: "The Green Shield Ice Cover is specifically engineered to prevent ice formation on golf greens and sports fields during winter months.",
    fullDescription: "This innovative cover system protects your turf from crown hydration, which is the leading cause of winter turf damage in northern climates.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png"
    ],
    features: ["Ice protection", "Winter durability", "Easy removal", "Reusable", "Breathable fabric", "UV stabilized"],
    specifications: { Category: "Golf & Sports", Application: "Golf Greens, Sports Fields", Season: "Winter", "Custom Sizes": "Available" },
    bestseller: false
  }
};

export default function ProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'in-ground-liners';
  const product = productsData[slug] || productsData['in-ground-liners'];
  
  const [activeImage, setActiveImage] = useState(0);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" },
    { name: product.name, url: `https://covertechind.com/product/${slug}` }
  ]);

  const productSchema = createProductSchema({
    name: product.name,
    description: product.description,
    images: product.images
  });

  return (
    <>
      <SEOHead
        title={`${product.name} - ${product.tagline}`}
        description={`${product.description} ${product.warranty}-year warranty. Made in North America. ASTM certified. Buy from Covertech Industries.`}
        keywords={[product.name, product.category, "pool products", "Covertech", `${product.warranty} year warranty`]}
        ogImage={product.images[0]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, productSchema] }}
      />

      <section className="pt-24 lg:pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to={createPageUrl('Products')} className="hover:text-cyan-600">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-400">{product.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-100 aspect-square">
                {product.bestseller && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-amber-500 text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    Bestseller
                  </div>
                )}
                <img 
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index ? 'border-cyan-500 shadow-lg' : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-cyan-100 text-cyan-700 mb-4">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.slice(0, 6).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-cyan-700 border-cyan-200">
                    {feature}
                  </Badge>
                ))}
              </div>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">{product.description}</p>
              <p className="text-slate-600 mb-8">{product.fullDescription}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Contact')}>
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Request Quote
                  </Button>
                </Link>
                <Link to={createPageUrl('DesignCenter')}>
                  <Button size="lg" variant="outline" className="px-8 gap-2">
                    <Palette className="w-5 h-5" />
                    Design Custom
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">Warranty Protected</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">ASTM Certified</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">Made in NA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patterns Section (if available) */}
      {product.patterns && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Patterns</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.patterns.map((pattern) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={pattern.image}
                      alt={pattern.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-medium text-slate-900">{pattern.name}</p>
                    <p className="text-xs text-slate-500">{pattern.collection}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Variants Section (if available) */}
      {product.variants && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.variants.map((variant, index) => (
                <motion.div
                  key={variant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{variant.name}</h3>
                  {variant.warranty && (
                    <Badge className="bg-cyan-100 text-cyan-700 mb-4">{variant.warranty} Warranty</Badge>
                  )}
                  <ul className="space-y-2">
                    {variant.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-cyan-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div 
                key={key}
                className={`flex justify-between py-4 px-6 ${index !== Object.entries(product.specifications).length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="text-slate-500">{key}</span>
                <span className="font-medium text-slate-900">{value}</span>
              </div>
            ))}
          </div>
          
          {/* Warranty Card */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Up to {product.warranty} Years Warranty</h3>
            <p className="text-cyan-100 mb-4">Industry-leading warranty coverage</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Material defects covered</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> UV degradation protected</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Seam integrity guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-8">Contact our team for a personalized quote or use our Design Center to customize your perfect pool product.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Request Quote
              </Button>
            </Link>
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" variant="outline" className="px-8">
                Design Custom
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}