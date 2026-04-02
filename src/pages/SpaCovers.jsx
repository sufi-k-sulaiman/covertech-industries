import { motion } from 'framer-motion';
import { Shield, Droplet, Leaf, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const features = [
  {
    icon: Droplet,
    title: "Water Retention",
    description: "Keep your spa water clean and prevent evaporation losses"
  },
  {
    icon: Leaf,
    title: "Debris Protection",
    description: "Block leaves, insects, and contaminants from entering"
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Reduce heating costs with superior insulation properties"
  },
  {
    icon: Shield,
    title: "Safety & Durability",
    description: "Heavy-duty materials built to last for years"
  }
];

const coverTypes = [
  {
    name: "Standard Spa Covers",
    description: "Durable hard-shell covers ideal for year-round protection. Lightweight yet strong with superior insulation.",
    benefits: [
      "Available in multiple sizes",
      "Easy-lift design",
      "Weatherproof material",
      "5-year warranty"
    ]
  },
  {
    name: "Thermal Spa Covers",
    description: "Premium insulated covers that reduce heating costs significantly. Thermal layer keeps water warm and reduces chemical evaporation.",
    benefits: [
      "Maximum insulation",
      "Reduces heating 60%+",
      "Retains heat overnight",
      "10-year warranty"
    ]
  },
  {
    name: "Custom Spa Covers",
    description: "Made-to-measure covers for unique spa shapes and sizes. Perfect fit ensures complete coverage and maximum protection.",
    benefits: [
      "Perfect fit guarantee",
      "Custom shapes available",
      "Premium materials",
      "Personalized design"
    ]
  }
];

export default function SpaCovers() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" },
    { name: "Spa Covers", url: "https://covertechind.com/spa-covers" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Spa Covers - Premium Hot Tub Protection",
    description: "Durable, insulated spa covers to protect your hot tub investment. Standard, thermal, and custom options available with industry-leading warranties.",
    url: "https://covertechind.com/spa-covers"
  });

  return (
    <>
      <SEOHead
        title="Spa Covers & Hot Tub Covers | Covertech Industries"
        description="Premium spa and hot tub covers for maximum protection and energy efficiency. Standard, thermal, and custom options available."
        keywords={[
          "spa covers",
          "hot tub covers",
          "thermal spa covers",
          "spa cover insulation",
          "custom spa covers"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Spa Protection"
        title="Premium Spa"
        titleAccent="Covers"
        description="Protect your hot tub investment with durable, insulated spa covers designed for maximum heat retention and debris prevention."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg"
      />

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Spa Covers</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Keep your spa clean, warm, and ready to use with our premium protection solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Cover Types */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Spa Cover Options</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Choose the perfect cover for your spa's needs and budget.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coverTypes.map((cover, index) => (
              <motion.div
                key={cover.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{cover.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{cover.description}</p>
                
                <div className="space-y-3 mb-8">
                  {cover.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Spa?</h2>
            <p className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
              Get expert advice on choosing the right spa cover for your needs. Contact our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button className="w-full sm:w-auto bg-white text-cyan-600 hover:bg-cyan-50">
                  Get in Touch
                </Button>
              </Link>
              <Link to={createPageUrl('Resources')}>
                <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  Download Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}