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
    size: 'Large',
    features: ['Custom Vinyl Liner', 'Safety Cover', 'Premium Finishes'],
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg'
    ],
    details: 'This stunning residential pool features our premium Carrara marble-pattern vinyl liner. The custom installation showcases the beauty of natural stone aesthetics with the durability of our reinforced vinyl materials.'
  },
  'aqua-space': {
    title: 'Aqua Space Resort Pool',
    description: 'Commercial resort pool with thermal covers and custom features',
    category: 'Commercial',
    poolType: 'In-Ground',
    size: 'Large',
    features: ['Thermal Cover', 'Solar Blanket', 'Custom Design'],
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg'
    ],
    details: 'A premier resort installation featuring our commercial-grade pool covers and thermal insulation system. This project demonstrates the reliability of our products in high-traffic, commercial environments.'
  },
  'resort-pool': {
    title: 'Luxury Resort Pool',
    description: 'High-end resort pool with premium safety and thermal covers',
    category: 'Commercial',
    poolType: 'In-Ground',
    size: 'Large',
    features: ['Safety Mesh Cover', 'Thermal Insulation', 'Professional Installation'],
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg'
    ],
    details: 'This luxury resort pool showcases our commitment to excellence in both safety and aesthetics. Our thermal covers reduce heating costs by over 60% while maintaining the pristine appearance expected in premium hospitality settings.'
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