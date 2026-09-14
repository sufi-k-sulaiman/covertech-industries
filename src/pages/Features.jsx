import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEOHead, { createArticleSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import { Button } from '@/components/ui/button';
import {
  Package, Boxes, Ruler, ShieldCheck, BarChart3, GraduationCap,
  Images, MessageSquare, Mail, Store, MapPin, Search, ArrowRight,
  CheckCircle2, Sparkles, Layers, Palette, FileText, Users
} from 'lucide-react';

const heroImage = 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/318df9877_generated_image.png';

const featureCategories = [
  {
    id: 'catalog',
    title: 'Product Catalog & Details',
    description: 'A full catalog of premium pool liners, safety covers, solar covers, winter covers, steel kits, insulation, golf covers, and curing blankets — each with rich detail pages.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/7785cbfda_image.png',
    icon: Package,
    points: [
      '9 product categories with dedicated detail pages',
      'Patterns, variants, specifications, and warranties',
      'Bestseller badges and SEO-optimized product pages',
      'Search and category filtering on the catalog',
    ],
    links: [
      { label: 'Browse Products', href: 'Products' },
      { label: 'In-Ground Liners', href: 'ProductDetails?slug=in-ground-liners' },
    ],
  },
  {
    id: 'visualizer',
    title: '3D Pool & Safety Cover Visualizers',
    description: 'Interactive design tools that let customers visualize custom liner patterns and safety covers on their pool in real time.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/9a4d9ca0f_image.png',
    icon: Ruler,
    points: [
      'Pool Visualizer with pattern and color selection',
      'Safety Cover Visualizer for custom shapes',
      'Platinum Plus pattern gallery',
      'Real-time 3D rendering with Three.js',
    ],
    links: [
      { label: 'Pool Visualizer', href: 'PoolVisualizer' },
      { label: 'Safety Cover Visualizer', href: 'SafetyCoverVisualizer' },
    ],
  },
  {
    id: 'design-center',
    title: 'Design Center & Quote Builder',
    description: 'A guided quote builder where customers configure their pool shape, dimensions, features, and pattern — then submit a request for a custom quote.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/6281fe664_image.png',
    icon: Palette,
    points: [
      'Step-by-step pool configuration wizard',
      'Shape, dimensions, and feature selection',
      'Pattern and customization choices',
      'Automatic quote ID generation and submission tracking',
    ],
    links: [
      { label: 'Open Design Center', href: 'DesignCenter' },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty Registration Portal',
    description: 'Customers register their products online with full purchase and installation details, generating warranty records that admins review and approve.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/3726a8f4e_generated_image.png',
    icon: ShieldCheck,
    points: [
      'Online registration for all product types',
      'Purchase, installer, and pool details capture',
      'Admin approval workflow (pending / approved / rejected)',
      'Serial and invoice number tracking',
    ],
    links: [
      { label: 'Register a Warranty', href: 'Warranties' },
    ],
  },
  {
    id: 'learn',
    title: 'Learning Center & Articles',
    description: 'An educational hub with tabbed guides for each product line, plus individual article pages covering installation, maintenance, and buying guides.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/4998a1984_generated_image.png',
    icon: GraduationCap,
    points: [
      'Tabbed guides for liners, safety covers, solar, and winter covers',
      '16 individual SEO-optimized article pages',
      'Maintenance tips and care instructions',
      'Installation guides for winter covers and solar blankets',
    ],
    links: [
      { label: 'Visit Learn Center', href: 'Learn' },
      { label: 'Winter Cover Guide', href: 'WinterCoverGuide' },
    ],
  },
  {
    id: 'gallery',
    title: 'Project Gallery & Portfolio',
    description: 'A showcase of completed pool liner installations and projects, with a detailed portfolio project view for featured work.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/318df9877_generated_image.png',
    icon: Images,
    points: [
      'Filterable project gallery',
      'Individual portfolio project pages',
      'High-resolution installation photography',
      'Lazy-loaded images with descriptive alt text',
    ],
    links: [
      { label: 'View Gallery', href: 'Gallery' },
    ],
  },
  {
    id: 'dealer',
    title: 'Dealer Program & Applications',
    description: 'A dedicated dealer onboarding flow where contractors and retailers apply to become Covertech dealers, with admin review and approval.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/3726a8f4e_generated_image.png',
    icon: Store,
    points: [
      'Online dealer application form',
      'Business type classification',
      'Admin review workflow (pending / approved / declined)',
      'Dealer resource access',
    ],
    links: [
      { label: 'Become a Dealer', href: 'Dealer' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact & Lead Capture',
    description: 'A contact form with categorized inquiries that routes to the admin team, plus an integrated live chat widget for real-time support.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/4998a1984_generated_image.png',
    icon: Mail,
    points: [
      'Categorized contact form (quote, info, warranty, dealer, support)',
      'Email notifications via Gmail and Outlook connectors',
      'Live Tawk.to chat widget',
      'FAQ section with schema markup',
    ],
    links: [
      { label: 'Contact Us', href: 'Contact' },
    ],
  },
  {
    id: 'admin',
    title: 'Admin Dashboard & Analytics',
    description: 'A comprehensive admin panel managing products, contacts, warranties, dealers, design quotes, and live website analytics with raw data export.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/1b215b6bb_generated_image.png',
    icon: BarChart3,
    points: [
      'Live traffic analytics with charts and KPIs',
      'Raw data table with sorting and CSV export',
      'Product, contact, warranty, and dealer management',
      'Design center quote tracking',
    ],
    links: [
      { label: 'Admin Dashboard', href: 'Admin' },
    ],
  },
];

const additionalFeatures = [
  { icon: Search, title: 'SEO Optimized', desc: 'Brand-first titles, JSON-LD schema, sitemap, robots.txt, and hreflang tags.' },
  { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'In-app conversational assistant for product guidance and support.' },
  { icon: FileText, title: 'Resources Library', desc: 'Downloadable guides, manuals, and documentation for all products.' },
  { icon: Users, title: 'About & Company Story', desc: 'Company history, leadership, milestones, and core values since 1987.' },
  { icon: MapPin, title: 'Geo Analytics', desc: 'Visitor country detection and session-based analytics tracking.' },
  { icon: Layers, title: 'Responsive Design', desc: 'Fully responsive across mobile, tablet, and desktop with fast load times.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  const [activeCategory, setActiveCategory] = useState(featureCategories[0].id);

  return (
    <div>
      <SEOHead
        title="Features & Capabilities"
        description="Explore every feature of the Covertech Industries platform — product catalog, 3D visualizers, design center, warranty registration, learning center, admin analytics, and more."
        canonicalUrl="https://covertechind.com/Features"
        keywords={['pool liner features', 'safety cover tools', 'pool visualizer', 'warranty registration', 'pool design center', 'admin analytics']}
        ogImage={heroImage}
        schema={createArticleSchema({
          title: 'Covertech Industries Platform Features',
          description: 'Complete overview of all features and capabilities of the Covertech Industries website and admin platform.',
          url: 'https://covertechind.com/Features',
          image: heroImage,
        })}
      />

      <PageHero
        badge="Platform Features"
        title="Everything Built Into"
        titleAccent="Covertech Industries"
        description="From a full product catalog and 3D visualizers to warranty registration, dealer onboarding, and a live analytics dashboard — explore every capability of the platform."
        backgroundImage={heroImage}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={createPageUrl('Products')}>
            <Button size="lg" className="gap-2">
              Explore Products <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={createPageUrl('DesignCenter')}>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20">
              Design Center <Sparkles className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Quick Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '9', label: 'Product Categories' },
              { value: '16', label: 'Article Pages' },
              { value: '2', label: '3D Visualizers' },
              { value: '6', label: 'Admin Modules' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4">
              Core Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nine Feature Areas, One Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each section below highlights a major capability of the site. Click through to explore it live.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {featureCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById(`feature-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.title.split(' & ')[0].split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Feature Blocks */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {featureCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const reversed = idx % 2 !== 0;
              return (
                <motion.div
                  key={cat.id}
                  id={`feature-${cat.id}`}
                  variants={itemVariants}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}
                >
                  <div className={`relative ${reversed ? 'lg:[direction:ltr]' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl rotate-3 scale-105 opacity-50" />
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="relative rounded-3xl shadow-xl w-full h-[320px] md:h-[400px] object-cover"
                    />
                    <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className={reversed ? 'lg:[direction:ltr]' : ''}>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{cat.title}</h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">{cat.description}</p>
                    <ul className="space-y-3 mb-8">
                      {cat.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      {cat.links.map((link) => (
                        <Link key={link.label} to={createPageUrl(link.href)}>
                          <Button variant="outline" className="gap-2">
                            {link.label} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
              Platform Highlights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance & Growth</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Beyond the core features, the platform includes powerful capabilities under the hood.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Everything?</h2>
          <p className="text-xl text-cyan-50 mb-8">
            Dive into the product catalog, try the visualizers, or start a custom quote in the Design Center.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={createPageUrl('Products')}>
              <Button size="lg" variant="secondary" className="gap-2">
                Browse Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" className="gap-2 bg-white text-cyan-600 hover:bg-cyan-50">
                Start a Quote <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}