import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const projects = {
  'carrara-marble': {
    title: 'Carrara Marble Pool',
    description: 'Elegant in-ground pool with Carrara marble-pattern vinyl liner',
    category: 'Residential',
    poolType: 'In-Ground',
    size: '20ft x 40ft',
    depth: '3-8ft',
    features: ['Custom Carrara Marble Pattern Liner', 'Premium Safety Cover', 'Custom Design', 'Professional Installation', '25-Year Warranty'],
    specifications: {
      liner: 'Premium Reinforced Vinyl - Carrara Pattern',
      warranty: '25 Years (Full Coverage Years 1-2)',
      thickness: '20 mil',
      colors: 'Carrara Marble Pattern'
    },
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80',
      'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=1200&q=80'
    ],
    details: 'This stunning residential pool features our premium Carrara marble-pattern vinyl liner, combining timeless elegance with unmatched durability. The custom installation showcases the beauty of natural stone aesthetics with reinforced vinyl materials that withstand years of use. Our expert installation team ensured perfect fit and sealing for long-lasting protection.',
    highlights: [
      'Custom-fit Carrara marble pattern for sophisticated aesthetics',
      'Premium reinforced vinyl construction for superior durability',
      'Professional installation with precision sealing',
      '25-year comprehensive warranty',
      'Reduced maintenance with premium materials',
      'Energy-efficient design retains heat naturally'
    ],
    relatedProducts: ['in-ground-liners', 'safety-covers']
  },
  'aqua-space': {
    title: 'Aqua Space Resort Pool',
    description: 'Commercial resort pool with thermal covers and comprehensive solutions',
    category: 'Commercial',
    poolType: 'In-Ground',
    size: '50ft x 80ft',
    depth: '3-10ft',
    features: ['Thermal Insulation Cover', 'Solar Blanket System', 'Custom Commercial Design', 'Safety Mesh Cover', 'Professional Maintenance Package'],
    specifications: {
      liner: 'Commercial-Grade Vinyl',
      coverType: 'Thermal + Solar System',
      warranty: '20 Years (Commercial)',
      capacity: '250,000+ gallons'
    },
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80',
      'https://images.unsplash.com/photo-1560085541-daf4ee36b26f?w=1200&q=80'
    ],
    details: 'A premier resort installation featuring our commercial-grade thermal and solar cover system. This comprehensive solution demonstrates the reliability of our products in high-traffic, commercial resort environments. The dual-cover system reduces heating costs by 60-75% while maintaining pristine water quality and guest safety.',
    highlights: [
      'Dual thermal and solar cover system for maximum efficiency',
      'Commercial-grade materials built for heavy use',
      'Reduces heating costs by 60-75% annually',
      'Professional installation and ongoing support',
      '20-year commercial warranty',
      'Suitable for high-volume guest facilities',
      'Environmentally conscious solution'
    ],
    relatedProducts: ['solar-covers', 'winter-covers', 'safety-covers']
  },
  'resort-pool': {
    title: 'Luxury Resort Pool',
    description: 'High-end resort pool with premium safety and thermal protection solutions',
    category: 'Commercial',
    poolType: 'In-Ground',
    size: '40ft x 60ft',
    depth: '3-8ft',
    features: ['Safety Mesh Cover System', 'Thermal Insulation', 'Premium Professional Installation', 'Custom Color Matching', '20-Year Commercial Warranty'],
    specifications: {
      coverType: 'Premium Safety Mesh',
      material: 'Commercial-Grade Polypropylene',
      warranty: '20 Years (Full Coverage Years 1-3)',
      safety: 'Exceeds ASTM F1346 Standards'
    },
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
    ],
    details: 'This luxury resort pool showcases our commitment to excellence in both safety and aesthetics. Our premium safety mesh covers provide superior protection while maintaining the pristine appearance expected in premium hospitality settings. The thermal insulation properties reduce heating costs by over 60% without compromising style.',
    highlights: [
      'Premium safety mesh exceeds ASTM safety standards',
      'Thermal insulation reduces heating costs 60%+',
      'Maintains elegant appearance for luxury properties',
      'Professional installation and maintenance',
      '20-year comprehensive warranty',
      'Custom color and pattern options',
      'Durable construction withstands resort traffic'
    ],
    relatedProducts: ['safety-covers', 'winter-covers', 'solar-covers']
  }
};

export default function PortfolioProject() {
  const location = useLocation();
  const projectId = location.pathname.split('/').pop();
  const project = projects[projectId];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <p className="text-slate-600">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Gallery", url: "https://covertechind.com/gallery" },
    { name: project.title, url: `https://covertechind.com/portfolio/${projectId}` }
  ]);

  const webPageSchema = createWebPageSchema({
    name: project.title,
    description: project.description,
    url: `https://covertechind.com/portfolio/${projectId}`
  });

  return (
    <>
      <SEOHead
        title={`${project.title} | Covertech Portfolio`}
        description={project.description}
        keywords={['pool project', 'portfolio', project.category.toLowerCase(), project.size.toLowerCase()]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      {/* Hero with Image Gallery */}
      <section className="pt-24 pb-12 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-cyan-400 text-lg">{project.description}</p>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden bg-black"
          >
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-[500px] object-cover"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-cyan-500 w-8' : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Project Overview</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{project.details}</p>

                <div className="bg-slate-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 sticky top-24"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-6">Project Details</h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Category</p>
                    <p className="font-semibold text-slate-900">{project.category}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-2">Pool Type</p>
                    <p className="font-semibold text-slate-900">{project.poolType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-2">Size</p>
                    <p className="font-semibold text-slate-900">{project.size}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                      Request Similar Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}