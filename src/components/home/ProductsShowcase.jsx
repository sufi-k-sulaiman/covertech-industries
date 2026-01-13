import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: "in-ground-liners",
    name: "Vinyl Pool Liners",
    description: "Custom Acu-Fit liners with AquaShimmer technology for stunning pools",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/9c3844458_image.png",
    features: ["25-Year Warranty", "50+ Patterns", "Custom Fit"]
  },
  {
    id: "safety-covers",
    name: "Safety Pool Covers",
    description: "ASTM-certified mesh and solid covers for complete peace of mind",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/bba0bfbe1_image.png",
    features: ["ASTM Certified", "30-Year Warranty", "Custom Design"]
  },
  {
    id: "custom-blankets",
    name: "Custom Blankets",
    description: "Solar covers, insulation, golf green covers, and curing blankets",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/91ad6462c_image.png",
    features: ["Energy Efficient", "UV Resistant", "Multi-Purpose"]
  },
  {
    id: "steel-kits",
    name: "Steel Kits & Equipment",
    description: "Professional-grade pool construction kits and accessories",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/c67978174_image.png",
    features: ["Heavy Duty", "Corrosion Resistant", "Complete Kit"]
  }
];

export default function ProductsShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Premium Quality <span className="text-cyan-600">Solutions</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of pool products and custom solutions
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl(`ProductDetails?slug=${product.id}`)}
                className="group block relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]"
              >
                {/* Image */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-300 mb-4">{product.description}</p>
                  
                  {/* Feature badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map(feature => (
                      <span key={feature} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                    Learn More 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            to={createPageUrl('Products')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}