import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Droplets, Shield, Sun, Snowflake, Check, Lightbulb, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const productGuides = [
  {
    id: "vinyl-liners",
    name: "Vinyl Pool Liners",
    icon: Droplets,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/d2bbfec37_image.png",
    description: "Custom Acu-Fit vinyl liners with wrinkle-free design and stunning patterns for in-ground and above-ground pools.",
    features: ["Custom patterns and colors", "UV-resistant materials", "Wrinkle-free Acu-Fit design", "Salt-compatible options"],
    products: ["In-Ground Liners", "Above-Ground Liners", "Overlap Liners", "Beaded Liners", "Unibead Liners"],
    tips: [
      "Measure your pool accurately before ordering - our Acu-Fit system ensures a perfect custom fit",
      "Choose UV-resistant patterns for pools with high sun exposure",
      "Consider salt-compatible liners if you have a saltwater system",
      "Schedule installation during mild weather (70-80°F) for best results",
      "Allow liner to relax in sun before final adjustments"
    ],
    care: [
      "Maintain proper water chemistry (pH 7.2-7.6)",
      "Keep chlorine levels between 1-3 PPM",
      "Brush walls and floor weekly to prevent algae",
      "Avoid sharp objects that could puncture the liner",
      "Use liner-safe cleaning products only",
      "Address wrinkles promptly before they become permanent"
    ],
    warranty: 25
  },
  {
    id: "safety-covers",
    name: "Safety Pool Covers",
    icon: Shield,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
    description: "ASTM F1346-91 certified mesh and solid covers providing maximum protection and peace of mind for your pool.",
    features: ["ASTM F1346-91 certified", "Up to 30-year warranty", "Custom-fit design", "Multiple anchoring systems"],
    products: ["Premier Mesh Safety Cover", "Deluxe Mesh Safety Cover", "Commercial Mesh Cover", "Solid Safety Cover"],
    tips: [
      "Professional installation is strongly recommended",
      "Ensure proper water level (12-18 inches below coping) before installation",
      "Choose mesh for easy drainage or solid for complete debris protection",
      "Consider your climate when selecting cover type",
      "Order early before winter season for timely delivery"
    ],
    care: [
      "Install cover taut - loose-fitting covers cause excessive abrasion",
      "Re-tighten cover 2-3 weeks after initial installation",
      "Inspect springs periodically to ensure 50% compression",
      "Remove standing water and debris regularly",
      "Flush anchor casings 2-3 times per year",
      "Store cover in provided bag when not in use"
    ],
    warranty: 30
  },
  {
    id: "solar-covers",
    name: "Solar Pool Covers",
    icon: Sun,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
    description: "Energy-efficient solar blankets that reduce heating costs by up to 70% and extend your swimming season.",
    features: ["Up to 70% heating cost reduction", "Reduces evaporation", "Extends swimming season", "UV resistant"],
    products: ["Solar-Extreme™ Solar Cover", "Thermo Shield™ Solar Blanket", "ClearDeck Solar Cover System"],
    tips: [
      "Remove cover during pool treatments and chemical additions",
      "Use a solar reel for easier handling",
      "Cut cover to match pool shape for optimal coverage",
      "Store out of direct sunlight when not on pool",
      "Bubble side should face the water for maximum heat transfer"
    ],
    care: [
      "Rinse cover with fresh water periodically",
      "Store in a shaded area when not in use",
      "Check for holes and patch as needed",
      "Replace when bubbles begin to deteriorate",
      "Avoid folding cover when wet for extended periods"
    ],
    warranty: 10
  },
  {
    id: "winter-covers",
    name: "Winter Pool Covers",
    icon: Snowflake,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
    description: "Heavy-duty protection to keep your pool pristine through winter. Designed for harsh weather conditions.",
    features: ["Weather resistant", "Heavy duty material", "UV protected", "Easy installation"],
    products: ["Lock-in Beaded Cover", "Superior Winter Pool Cover"],
    tips: [
      "Lower water level 12-18 inches below coping before covering",
      "Remove all accessories from pool before covering",
      "Ensure proper tension to prevent water pooling",
      "Add air pillow for above-ground pools to prevent ice damage",
      "Apply winterizing chemicals before covering"
    ],
    care: [
      "Remove standing water to prevent sagging",
      "Brush off heavy snow accumulation",
      "Check water tubes/weights periodically",
      "Repair small tears immediately",
      "Store clean and dry in off-season"
    ],
    warranty: 15
  }
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState("vinyl-liners");
  const activeGuide = productGuides.find(g => g.id === activeTab);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Learn", url: "https://covertechind.com/learn" }
  ]);

  return (
    <>
      <SEOHead
        title="Learn About Pool Products - Expert Guides & Care Tips"
        description="Expert guides, care tips, and warranty information for vinyl pool liners, safety covers, solar blankets, and winter covers. Learn how to maintain your pool products."
        keywords={["pool liner care", "safety cover maintenance", "solar cover tips", "pool cover guide", "pool liner installation"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Knowledge Center"
        title="Learn About Our"
        titleAccent="Premium Products"
        description="Expert guides, care tips, and warranty information for vinyl liners, safety covers, solar blankets, and winter covers."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/ccfbee766_beautiful-outdoor-swimming-pool-with-sea-ocean-white-cloud-blue-sky.jpg"
        minHeight="min-h-[50vh]"
      />

      {/* Product Guides */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 p-1.5 rounded-xl flex-wrap h-auto">
                {productGuides.map((guide) => (
                  <TabsTrigger 
                    key={guide.id} 
                    value={guide.id}
                    className="px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
                  >
                    <guide.icon className="w-4 h-4" />
                    {guide.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <AnimatePresence mode="wait">
            {activeGuide && (
              <motion.div
                key={activeGuide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Product Overview */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg">
                      {activeGuide.name}
                    </div>
                    <img 
                      src={activeGuide.image}
                      alt={activeGuide.name}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{activeGuide.name}</h2>
                    <p className="text-slate-600 text-lg mb-6">{activeGuide.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-cyan-500" />
                        Key Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeGuide.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Available Products</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeGuide.products.map((product) => (
                          <span key={product} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips & Care */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Pro Tips</h3>
                    </div>
                    <ol className="space-y-4">
                      {activeGuide.tips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-slate-700">{tip}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Care & Maintenance</h3>
                    </div>
                    <ul className="space-y-3">
                      {activeGuide.care.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Warranty */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Warranty Information</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">Industry-Leading Warranty</h3>
                    <p className="text-slate-400 mt-2">{activeGuide.warranty}-year limited warranty with full coverage options</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {activeGuide.warranty}
                      </span>
                      <p className="text-slate-400 text-sm mt-1">Year Warranty</p>
                    </div>
                    <img 
                      src={activeGuide.image}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded-xl hidden md:block"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 text-lg mb-8">
            Design your custom pool product or browse our shop for quality accessories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 group">
                Design Your Product
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Products')}>
              <Button size="lg" variant="outline" className="px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}