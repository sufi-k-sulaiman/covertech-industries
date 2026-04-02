import { motion } from 'framer-motion';
import { CheckCircle2, Palette, Hammer, Shield, Zap, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const features = [
  {
    icon: Palette,
    title: "Unlimited Design Options",
    description: "Choose from hundreds of patterns, colors, and custom designs to match your pool's aesthetic perfectly."
  },
  {
    icon: Hammer,
    title: "Precise Custom Fit",
    description: "Every liner is made to your exact pool specifications ensuring perfect fit and superior performance."
  },
  {
    icon: Shield,
    title: "Premium Durability",
    description: "20 mil reinforced vinyl construction built to withstand years of use with minimal maintenance."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Custom liners reduce water evaporation and maintain temperature, lowering your energy costs."
  },
  {
    icon: Droplet,
    title: "Chemical Protection",
    description: "Specialized coatings protect against chemical degradation and UV damage for lasting performance."
  },
  {
    icon: CheckCircle2,
    title: "Expert Installation",
    description: "Our certified technicians ensure flawless installation with precision sealing and finishing."
  }
];

const process = [
  {
    step: 1,
    title: "Pool Assessment",
    description: "We conduct a thorough evaluation of your pool's dimensions, shape, and current condition to determine the perfect liner solution."
  },
  {
    step: 2,
    title: "Design Consultation",
    description: "Our design experts work with you to select patterns, colors, and custom features that match your vision."
  },
  {
    step: 3,
    title: "Precise Measurements",
    description: "We take exact measurements using advanced technology to ensure your custom liner fits perfectly."
  },
  {
    step: 4,
    title: "Custom Manufacturing",
    description: "Your liner is crafted using premium materials with custom specifications and your chosen design."
  },
  {
    step: 5,
    title: "Professional Installation",
    description: "Our certified technicians professionally install your liner with precision sealing and finishing touches."
  },
  {
    step: 6,
    title: "Quality Assurance",
    description: "Final inspection ensures your custom liner meets our highest quality standards and your expectations."
  }
];

const inGroundBenefits = [
  "Custom fit for irregular or unique pool shapes",
  "Enhanced insulation and heat retention",
  "Superior chemical resistance",
  "Extended lifespan - 15-25 years",
  "Beautiful custom pattern options",
  "Professional installation included",
  "Comprehensive warranty coverage",
  "Reduced maintenance requirements"
];

export default function CustomPoolLiners() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" },
    { name: "Custom Pool Liners", url: "https://covertechind.com/custom-pool-liners" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Custom Pool Liners - In-Ground & Above Ground",
    description: "Premium custom pool liners designed to fit your exact pool specifications. Unlimited design options with professional installation and 25-year warranties.",
    url: "https://covertechind.com/custom-pool-liners"
  });

  return (
    <>
      <SEOHead
        title="Custom Pool Liners | In-Ground & Above Ground | Covertech"
        description="Premium custom pool liners for in-ground and above-ground pools. Unlimited patterns, colors, and designs with professional installation and industry-leading warranties."
        keywords={[
          "custom pool liners",
          "in-ground pool liners",
          "custom vinyl liners",
          "pool liner design",
          "premium pool liners",
          "personalized pool covers"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Custom Solutions"
        title="Custom Pool"
        titleAccent="Liners"
        description="Design and create the perfect custom pool liner for your unique pool. Professional manufacturing with unlimited design options and expert installation."
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80"
      />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Custom Pool Liners</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Get a liner perfectly designed for your pool with unlimited customization options and premium quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* In-Ground Specific Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Custom In-Ground Pool Liners</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                In-ground pools deserve premium custom liners that fit perfectly and enhance your backyard. Our custom in-ground liners are engineered for durability, efficiency, and beauty.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Whether you have a rectangular, oval, kidney-shaped, or irregular pool, we create liners that fit precisely. Choose from hundreds of patterns and colors or design your own unique look.
              </p>
              
              <div className="space-y-3 mb-8">
                {inGroundBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl('Contact')}>
                  <Button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700">
                    Request Custom Quote
                  </Button>
                </Link>
                <Link to={createPageUrl('Learn')}>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80"
                alt="Custom In-Ground Pool Liner"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Custom Liner Process</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From assessment to installation, we handle every detail to create your perfect custom pool liner.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-8 relative"
              >
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{item.step}</span>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Options Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Unlimited Design Possibilities</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Our custom pool liners offer hundreds of pre-designed patterns or complete customization. Choose from classic marble effects, nature-inspired designs, geometric patterns, or bring your own unique vision to life.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Pre-Designed Patterns</h3>
                <p className="text-slate-600 text-sm">Choose from our extensive library of professionally designed patterns and colors.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Custom Colors</h3>
                <p className="text-slate-600 text-sm">Select specific colors or create custom color combinations to match your aesthetic.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Fully Customized</h3>
                <p className="text-slate-600 text-sm">Design a completely unique liner using your own images, logos, or creative concepts.</p>
              </div>
            </div>

            <Link to={createPageUrl('DesignCenter')}>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-lg px-8 py-6">
                Explore Design Center
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Industry-Leading Warranty</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Every custom pool liner comes with our comprehensive warranty protecting your investment. Full coverage for the first 2 years, then prorated coverage for up to 25 years.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">25</p>
                <p className="text-slate-300">Year Warranty</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">100%</p>
                <p className="text-slate-300">Manufacturing Coverage</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">2</p>
                <p className="text-slate-300">Year Full Coverage</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to={createPageUrl('Warranties')}>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  View Warranty Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Design Your Custom Liner?</h2>
            <p className="text-lg text-cyan-100 mb-8">
              Get expert guidance from our custom liner specialists. We'll help you create the perfect solution for your pool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button className="w-full sm:w-auto bg-white text-cyan-600 hover:bg-cyan-50">
                  Get Free Consultation
                </Button>
              </Link>
              <a href="tel:+14166405590">
                <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  Call: (416) 640-5590
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}