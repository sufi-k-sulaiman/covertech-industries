import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { FileText, BookOpen, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const downloads = [
  {
    title: "Safety Cover Measuring Form",
    description: "Comprehensive guide for accurately measuring your pool for safety cover installation",
    icon: FileText,
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/fb7af55c8_CVT-Safey-Cover-Form.pdf",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Inground Liner Measuring Form",
    description: "Step-by-step form to ensure precise measurements for your inground pool liner",
    icon: FileText,
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1148bf00b_IngroundLinerMeasuringForm-32615.pdf",
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Inground Liner Instructions",
    description: "Detailed installation and maintenance instructions for inground pool liners",
    icon: BookOpen,
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/304529576_CVT-Inground-Liner-Maintenance-and-Installation.pdf",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Safety Cover Instructions",
    description: "Complete guide for proper installation and maintenance of safety covers",
    icon: BookOpen,
    url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/4bf1e67df_CVT-Safety-Cover-Instructions.pdf",
    color: "from-purple-500 to-pink-500"
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

          <div className="grid md:grid-cols-2 gap-6">
            {downloads.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-100 transition-all flex gap-6"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-cyan-600 font-medium text-sm">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
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
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}