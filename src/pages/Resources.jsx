import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { FileText, BookOpen, Download, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import GalleryBanner from '@/components/ui/GalleryBanner';

const colorMap = {
  'cyan-500': '#06b6d4',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a'
};

const downloads = [
  {
    category: "Warranty Documents",
    items: [
      {
        title: "25-Season In-Ground Liner Warranty",
        description: "Premium warranty for in-ground vinyl pool liners",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/940bf589f_25SeasonIn-GroundLinerWarranty.pdf",
        color: "cyan-500"
      },
      {
        title: "20-Season On-Ground Liner Warranty",
        description: "Extended warranty coverage for on-ground pool liners",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5f9b4602_20SeasonOn-GroundLinerWarranty.pdf",
        color: "blue-500"
      },
      {
        title: "10-Season Above-Ground Liner Warranty",
        description: "Comprehensive warranty for above-ground pool liners",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/94ddb6eba_10SeasonAbove-GroundLinerWarranty.pdf",
        color: "blue-600"
      },
      {
        title: "Safety Cover Warranty 2025",
        description: "Up to 30-year warranty for premium safety covers",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9876ef1df_CVT-SafetyCoverWarranty-2025.pdf",
        color: "blue-700"
      },
      {
        title: "Solar Blanket Warranty",
        description: "3 to 7-year warranty coverage for solar covers",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/042934906_SolarWarranty-CVT-English.pdf",
        color: "blue-800"
      },
      {
        title: "Winter Cover Warranty",
        description: "8 to 10-year warranty for winter pool covers",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2064be08f_WinterCoverWarranty-CVT-English.pdf",
        color: "blue-600"
      },
      {
        title: "Beaded Winter Cover Warranty",
        description: "Warranty details for beaded lock-in winter covers",
        icon: Shield,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ea750810d_BeadedWinterCoverWarranty-CVT-English.pdf",
        color: "blue-900"
      }
    ]
  },
  {
    category: "Installation & Care Guides",
    items: [
      {
        title: "In-Ground Liner Installation",
        description: "Professional installation instructions for vinyl pool liners",
        icon: BookOpen,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ce2f38147_CVT-IngroundLinerMaintenanceandInstallation.pdf",
        color: "cyan-500"
      },
      {
        title: "Liner Care & Maintenance Guide",
        description: "Essential tips for maintaining your pool liner",
        icon: BookOpen,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fcfa016dc_CVT-LinerCareMaintenance.pdf",
        color: "blue-500"
      },
      {
        title: "Safety Cover Care Guide",
        description: "Maintenance instructions for optimal safety cover performance",
        icon: BookOpen,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/37f0becda_CVT-SafetyCoverCareGuide.pdf",
        color: "blue-600"
      },
      {
        title: "Safety Cover Installation Instructions",
        description: "Step-by-step installation guide for safety covers",
        icon: BookOpen,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f1acc1b5e_CVT-SafetyCoverInstructions.pdf",
        color: "blue-700"
      },
      {
        title: "Solar Cover - What to Know",
        description: "Complete guide to solar blanket care and usage",
        icon: BookOpen,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6c47e8eb2_CVTSolarCover-WhattoKnow.pdf",
        color: "blue-800"
      }
    ]
  },
  {
    category: "Measuring Forms & Brochures",
    items: [
      {
        title: "Safety Cover Measuring Form",
        description: "Comprehensive form for accurate safety cover measurements",
        icon: FileText,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a24979399_CVTSafey-Cover-Form.pdf",
        color: "cyan-500"
      },
      {
        title: "2026 Liner Pattern Catalogue",
        description: "Complete collection of vinyl liner patterns and designs",
        icon: FileText,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/af5daff1a_2026LinerCatalogue-Web-R0.pdf",
        color: "blue-500"
      },
      {
        title: "Safety Covers Brochure 2024",
        description: "Comprehensive brochure showcasing safety cover options",
        icon: FileText,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/59cb887bb_2024SafetyCoversBrochure.pdf",
        color: "blue-600"
      },
      {
        title: "Curing Blanket Brochure 2024",
        description: "Information on concrete curing blankets",
        icon: FileText,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4aacddc1a_2024CuringBlanketBrochure.pdf",
        color: "blue-700"
      },
      {
        title: "Golf Greens Sell Sheet",
        description: "Golf green winter protection solutions",
        icon: FileText,
        url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/cc9aa98a1_GOLFGREENSELLSHEET.pdf",
        color: "blue-800"
      }
    ]
  }
];

const products = [
  { name: "Winter Pool Safety Covers", slug: "safety-covers", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png", description: "Commercial, Deluxe, Premier Mesh & Solid options with warranties up to 30 years" },
  { name: "In-Ground Pool Liners", slug: "in-ground-liners", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/9c3844458_image.png", description: "Premium vinyl liners with custom designs and wrinkle-free installation" },
  { name: "Solar Pool Covers", slug: "solar-covers", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png", description: "Solar-Extreme™ and Thermo Shield™ solar blankets for heat retention" },
  { name: "Golf Green Covers", slug: "golf-covers", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png", description: "Green Shield™ Ice Eliminating and Supreme Green turf covers" },
  { name: "Winter Pool Covers", slug: "winter-covers", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1e5845e98_image.png", description: "Lock-in Beaded Cover and Superior Winter Pool Cover" },
  { name: "Steel Kits", slug: "steel-kits", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/c67978174_image.png", description: "Professional-grade pool construction kits" },
];

export default function Resources() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Resources", url: "https://covertechind.com/resources" }
  ]);

  return (
    <>
      <SEOHead
        title="Resources & Downloads - Installation Guides & Measuring Forms"
        description="Download Covertech's installation guides, measuring forms, and technical resources for pool liners, safety covers, and more. Expert documentation for professionals."
        keywords={["pool liner measuring form", "safety cover installation guide", "pool cover instructions", "Covertech resources"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Resources"
        title="Resources &"
        titleAccent="Downloads"
        description="Access our comprehensive library of installation guides, measuring forms, and technical resources"
        backgroundImage="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1920&q=80"
        minHeight="min-h-[50vh]"
      />

      {/* Downloads Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Downloads</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Helpful Tools & <span className="text-cyan-600">Forms</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need for accurate measurements and proper installation
            </p>
          </motion.div>

          {downloads.map((category, catIndex) => (
            <div key={category.category} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.category}</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-cyan-200 transition-all flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <item.icon 
                        className="w-7 h-7 group-hover:scale-110 transition-transform" 
                        style={{ color: colorMap[item.color] }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                      <span className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Product Categories</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Explore Our Full <span className="text-cyan-600">Product Range</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Browse through our comprehensive selection of premium pool and construction products
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={createPageUrl(`ProductDetails?slug=${product.slug}`)}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{product.name}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Additional Support?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Our expert team is ready to assist you with any questions about measurements, installation, or product selection
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Contact Support
              </Button>
            </Link>
            <Link to={createPageUrl('Products')}>
              <Button size="lg" variant="outline" className="border-white/30 text-cyan-500 hover:bg-white/10 px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <GalleryBanner />
    </>
  );
}