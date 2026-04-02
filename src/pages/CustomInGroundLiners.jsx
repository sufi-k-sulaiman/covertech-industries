import { motion } from 'framer-motion';
import { CheckCircle2, Layers, Thermometer, Shield, Wrench, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const advantages = [
  {
    icon: Layers,
    title: "Perfect Fit Construction",
    description: "Custom-manufactured to your exact pool dimensions for flawless fit and superior seal."
  },
  {
    icon: Thermometer,
    title: "Enhanced Insulation",
    description: "Premium 20 mil vinyl with thermal properties reduces heating costs by up to 40%."
  },
  {
    icon: Shield,
    title: "Superior Durability",
    description: "Reinforced vinyl construction with UV-resistant coating lasts 15-25 years."
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Expert certified technicians ensure precise installation with perfect sealing."
  },
  {
    icon: TrendingUp,
    title: "Increased Property Value",
    description: "Premium custom liners enhance your pool's appearance and overall property appeal."
  },
  {
    icon: CheckCircle2,
    title: "Complete Warranty",
    description: "25-year comprehensive warranty with full coverage for first 2 years."
  }
];

const poolShapes = [
  {
    shape: "Rectangular",
    description: "Classic rectangular pools - precise custom fit for clean, modern aesthetics.",
    ideal: "Perfect for lap pools and traditional backyard setups"
  },
  {
    shape: "Oval",
    description: "Curved oval designs - custom liners ensure smooth, wrinkle-free installation.",
    ideal: "Great for families wanting extra seating areas"
  },
  {
    shape: "Kidney-Shaped",
    description: "Complex curved designs - our experts handle even the most intricate shapes.",
    ideal: "Ideal for luxury residential pools with unique designs"
  },
  {
    shape: "Free-Form",
    description: "Custom irregular shapes - we create liners for any pool configuration.",
    ideal: "Perfect for creative, artistic pool designs"
  }
];

const specifications = [
  {
    spec: "Material",
    details: "Premium 20 mil reinforced vinyl with UV stabilizers"
  },
  {
    spec: "Warranty",
    details: "25 years total (2 years full coverage, prorated 3-25 years)"
  },
  {
    spec: "Installation",
    details: "Professional certified technician included"
  },
  {
    spec: "Colors & Patterns",
    details: "Hundreds of options plus custom design capability"
  },
  {
    spec: "Chemical Resistance",
    details: "Superior resistance to chlorine and pool chemicals"
  },
  {
    spec: "Temperature Range",
    details: "Works efficiently in temperatures from 40°F to 100°F"
  }
];

const customOptions = [
  "Custom depth modifications for shallow and deep ends",
  "Integrated steps and benches",
  "Custom color blending and gradient effects",
  "Pattern customization and design integration",
  "Anti-slip surface coatings",
  "Specialized leak-detection features"
];

export default function CustomInGroundLiners() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" },
    { name: "Custom In-Ground Liners", url: "https://covertechind.com/custom-inground-liners" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Custom In-Ground Pool Liners | Covertech Industries",
    description: "Premium custom vinyl liners designed specifically for in-ground pools. Perfect fit, unlimited design options, and 25-year warranty.",
    url: "https://covertechind.com/custom-inground-liners"
  });

  return (
    <>
      <SEOHead
        title="Custom In-Ground Pool Liners | Covertech Industries"
        description="Premium custom vinyl liners for in-ground pools. Perfect fit for any shape with unlimited design options, professional installation, and 25-year warranties."
        keywords={[
          "custom in-ground pool liners",
          "inground pool liner replacement",
          "custom vinyl liners",
          "in-ground pool renovation",
          "residential pool liners",
          "premium pool liners"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Residential Solutions"
        title="Custom In-Ground"
        titleAccent="Pool Liners"
        description="Transform your in-ground pool with custom-fitted vinyl liners engineered for perfect fit, stunning design, and lasting durability."
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80"
      />

      {/* Key Advantages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Custom In-Ground Liners</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Experience the perfect pool with custom liners engineered specifically for your in-ground pool's unique dimensions and design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pool Shapes Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Works With Any In-Ground Pool Shape</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Whether you have a simple rectangular pool or a complex free-form design, we create custom liners that fit perfectly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {poolShapes.map((item, index) => (
              <motion.div
                key={item.shape}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyan-600">✓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.shape}</h3>
                    <p className="text-slate-600 mb-3">{item.description}</p>
                    <p className="text-sm text-cyan-600 font-semibold">{item.ideal}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Premium Specifications</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Industry-leading materials and construction standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((item, index) => (
              <motion.div
                key={item.spec}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border-l-4 border-cyan-500"
              >
                <h3 className="font-bold text-slate-900 mb-2">{item.spec}</h3>
                <p className="text-slate-600">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Options */}
      <section className="py-24 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Unlimited Customization Options</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Make your in-ground pool truly unique with custom features and design options.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {customOptions.map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-white rounded-lg p-6"
              >
                <CheckCircle2 className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{option}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Custom vs. Standard Liners</h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-4 px-6 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-6 font-bold text-slate-900">Standard Liner</th>
                  <th className="text-center py-4 px-6 font-bold text-cyan-600">Custom Liner</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-6 text-slate-700">Fit Quality</td>
                  <td className="py-4 px-6 text-center text-slate-600">Fair - May wrinkle</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">Perfect - No wrinkles</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-6 text-slate-700">Design Options</td>
                  <td className="py-4 px-6 text-center text-slate-600">Limited</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-6 text-slate-700">Durability</td>
                  <td className="py-4 px-6 text-center text-slate-600">Good (10-15 years)</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">Excellent (15-25 years)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-6 text-slate-700">Installation</td>
                  <td className="py-4 px-6 text-center text-slate-600">Standard</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">Premium Professional</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-6 text-slate-700">Warranty</td>
                  <td className="py-4 px-6 text-center text-slate-600">10 years</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">25 years</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-700">Value</td>
                  <td className="py-4 px-6 text-center text-slate-600">Cost-effective</td>
                  <td className="py-4 px-6 text-center text-cyan-600 font-semibold">Premium Investment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Professional Installation Included</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our certified technicians handle complete installation to ensure your custom liner performs flawlessly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <div className="text-3xl font-bold text-cyan-600 mb-4">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Assessment</h3>
              <p className="text-slate-600">Complete pool inspection and precise measurements taken by certified technicians.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <div className="text-3xl font-bold text-cyan-600 mb-4">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Preparation</h3>
              <p className="text-slate-600">Pool structure prepared and floor cleaned to ensure perfect liner placement.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <div className="text-3xl font-bold text-cyan-600 mb-4">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Installation</h3>
              <p className="text-slate-600">Expert installation with precision fitting, sealing, and finishing touches.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Savings */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Long-Term Value & Savings</h2>
            <p className="text-lg text-slate-300 mb-8">
              Custom in-ground liners reduce water evaporation and heating costs while lasting significantly longer than standard liners.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">40%</p>
                <p className="text-slate-300">Reduction in Heating Costs</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">60%</p>
                <p className="text-slate-300">Less Water Evaporation</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-400 mb-2">50%</p>
                <p className="text-slate-300">Lower Chemical Usage</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Over a 25-year lifespan, custom liners typically pay for themselves through energy and water savings.
            </p>
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
            <h2 className="text-4xl font-bold mb-6">Transform Your In-Ground Pool Today</h2>
            <p className="text-lg text-cyan-100 mb-8">
              Get a free consultation with our pool liner experts. We'll help you design the perfect custom liner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('DesignCenter')}>
                <Button className="w-full sm:w-auto bg-white text-cyan-600 hover:bg-cyan-50">
                  Try Design Center
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  Contact Specialists
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}