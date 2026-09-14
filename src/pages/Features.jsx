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
  CheckCircle2, Sparkles, Layers, Palette, FileText, Users, Rocket,
  Database, Zap, Globe, Shield, Code, Megaphone, Award, Briefcase,
  TrendingUp, Cpu, LineChart
} from 'lucide-react';

const heroImage = 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/318df9877_generated_image.png';

const pitchStats = [
  { icon: Rocket, value: 'Turnkey', label: 'Launch in weeks, not months' },
  { icon: Database, value: 'Full CMS', label: 'Manage everything yourself' },
  { icon: Zap, value: '10 Modules', label: 'Out of the box' },
  { icon: Globe, value: 'SEO-Ready', label: 'Built to rank from day one' },
];

const featureCategories = [
  {
    id: 'catalog',
    title: 'Product Catalog & Detail Pages',
    description: 'A full product catalog with rich detail pages — categories, variants, specifications, patterns, and warranties. Your team manages every product from the CMS without a developer.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/7785cbfda_image.png',
    icon: Package,
    points: [
      'Unlimited product categories with dedicated detail pages',
      'Variants, patterns, specifications, and warranty fields',
      'Bestseller flags and per-product SEO fields',
      'Search and category filtering on the storefront',
    ],
    links: [
      { label: 'See a Live Catalog', href: 'Products' },
    ],
  },
  {
    id: 'visualizer',
    title: '3D Visualizers & Configurators',
    description: 'Interactive 3D tools let your customers visualize products on their own property — patterns, colors, and shapes in real time. A proven conversion booster for custom-order businesses.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/9a4d9ca0f_image.png',
    icon: Ruler,
    points: [
      'Real-time 3D rendering with Three.js',
      'Pattern and color selection on a live preview',
      'Step-by-step configuration wizard',
      'Reduces returns and pre-sale questions',
    ],
    links: [
      { label: 'Try the Visualizer', href: 'PoolVisualizer' },
    ],
  },
  {
    id: 'design-center',
    title: 'Quote & Design Center',
    description: 'A guided quote builder captures customer requirements — shape, dimensions, features, and pattern — and generates a tracked quote request straight into your admin dashboard.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/6281fe664_image.png',
    icon: Palette,
    points: [
      'Multi-step configuration wizard',
      'Automatic quote ID generation',
      'Submission tracking with status workflow',
      'Lead data routed to your sales team instantly',
    ],
    links: [
      { label: 'See the Quote Builder', href: 'DesignCenter' },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & Registration Portal',
    description: 'Move warranty registration online. Customers submit product, purchase, and installation details; your team reviews and approves from the CMS. No more paper forms or spreadsheets.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/3726a8f4e_generated_image.png',
    icon: ShieldCheck,
    points: [
      'Online registration for every product type',
      'Serial and invoice number tracking',
      'Admin approval workflow (pending / approved / rejected)',
      'Customer email confirmations',
    ],
    links: [
      { label: 'See the Portal', href: 'Warranties' },
    ],
  },
  {
    id: 'learn',
    title: 'Learning Center & Content Hub',
    description: 'A built-in content management system for articles, guides, and tutorials — each with its own SEO-optimized page. Educate customers and rank for long-tail search terms.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/4998a1984_generated_image.png',
    icon: GraduationCap,
    points: [
      'Tabbed product guides and individual article pages',
      'SEO-optimized content with schema markup',
      'Maintenance tips and installation instructions',
      'Drives organic traffic and reduces support load',
    ],
    links: [
      { label: 'See the Content Hub', href: 'Learn' },
    ],
  },
  {
    id: 'gallery',
    title: 'Project Gallery & Portfolio',
    description: 'Showcase completed work with a filterable gallery and dedicated project pages. High-resolution photography with lazy loading keeps the site fast.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/318df9877_generated_image.png',
    icon: Images,
    points: [
      'Filterable project gallery',
      'Individual portfolio project pages',
      'Lazy-loaded, optimized imagery',
      'Great for social proof and conversions',
    ],
    links: [
      { label: 'See the Gallery', href: 'Gallery' },
    ],
  },
  {
    id: 'dealer',
    title: 'Partner & Dealer Onboarding',
    description: 'A dedicated onboarding flow for contractors, retailers, and partners — applications come straight into your admin panel for review and approval.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/3726a8f4e_generated_image.png',
    icon: Store,
    points: [
      'Online partner application form',
      'Business type classification',
      'Admin review workflow (pending / approved / declined)',
      'Grow your distribution channel on autopilot',
    ],
    links: [
      { label: 'See the Onboarding Flow', href: 'Dealer' },
    ],
  },
  {
    id: 'contact',
    title: 'Lead Capture & Live Chat',
    description: 'Categorized contact forms route inquiries to the right team, with email notifications and an integrated live chat widget for real-time support.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/4998a1984_generated_image.png',
    icon: Mail,
    points: [
      'Categorized inquiry routing',
      'Email notifications via Gmail and Outlook connectors',
      'Integrated live chat widget',
      'FAQ section with schema markup',
    ],
    links: [
      { label: 'See Lead Capture', href: 'Contact' },
    ],
  },
  {
    id: 'admin',
    title: 'Admin Dashboard & Analytics',
    description: 'A complete CMS and analytics dashboard — manage products, contacts, warranties, dealers, and quotes, plus live traffic analytics with raw data export.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/1b215b6bb_generated_image.png',
    icon: BarChart3,
    points: [
      'Live traffic analytics with charts and KPIs',
      'Raw data table with sorting and CSV export',
      'Full CRUD management for every module',
      'Visitor geo-location and session tracking',
    ],
    links: [
      { label: 'See the Dashboard', href: 'Admin' },
    ],
  },
  {
    id: 'marketing',
    title: 'Automated Emails & Marketing',
    description: 'Every form submission triggers an automated email — to your team, to your customer, or both. Pair that with built-in SEO, social, and ad-ready marketing tools to turn visitors into buyers on autopilot.',
    image: 'https://media.base44.com/images/public/6966301493bec01d4fb29d56/1b215b6bb_generated_image.png',
    icon: Megaphone,
    points: [
      'Automated email workflows on every form submission',
      'Gmail and Outlook connector integration',
      'SEO, sitemap, and schema markup built in',
      'Multi-channel marketing — search, social, and email',
    ],
    links: [
      { label: 'See Lead Capture', href: 'Contact' },
    ],
  },
];

const platformHighlights = [
  { icon: Database, title: 'Robust CMS', desc: 'Manage products, content, leads, and records from one admin panel — no developer needed.' },
  { icon: Search, title: 'SEO Built In', desc: 'Brand-first titles, JSON-LD schema, sitemap, robots.txt, and hreflang tags out of the box.' },
  { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'An in-app conversational assistant guides visitors and answers product questions.' },
  { icon: FileText, title: 'Resources Library', desc: 'Downloadable guides, manuals, and documentation organized by product line.' },
  { icon: Users, title: 'About & Story Pages', desc: 'Company history, leadership, milestones, and values — fully editable content.' },
  { icon: MapPin, title: 'Geo Analytics', desc: 'Visitor country detection and session-based analytics, with no third-party fees.' },
  { icon: Layers, title: 'Fully Responsive', desc: 'Mobile, tablet, and desktop — with fast Core Web Vitals and lazy loading.' },
  { icon: Shield, title: 'Secure & Scalable', desc: 'Built-in auth, role-based access, and a hosted backend that scales with you.' },
  { icon: Code, title: 'Extensible', desc: 'Add new pages, integrations, and workflows as you grow — without rebuilding.' },
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
        title="Web Solution & CMS Platform"
        description="A complete, turnkey web solution with a robust CMS — product catalog, 3D visualizers, quote builder, warranty portal, learning center, dealer onboarding, lead capture, automated emails, marketing, and live analytics. Launch your business online in weeks."
        canonicalUrl="https://covertechind.com/Features"
        keywords={['web solution', 'cms platform', 'turnkey website', 'product catalog cms', '3d visualizer', 'quote builder', 'warranty portal', 'admin dashboard', 'lead capture website']}
        ogImage={heroImage}
        schema={createArticleSchema({
          title: 'A Complete Web Solution with a Robust CMS',
          description: 'Turnkey web platform for manufacturers and distributors — product catalog, visualizers, quote builder, warranty portal, learning center, dealer onboarding, and live analytics.',
          url: 'https://covertechind.com/Features',
          image: heroImage,
        })}
      />

      <PageHero
        badge="Web Solution & CMS Platform"
        title="A Complete Web Solution"
        titleAccent="for Manufacturers & Distributors"
        description="Turnkey, CMS-driven, and built to convert. Product catalog, 3D visualizers, quote builder, warranty portal, learning center, dealer onboarding, lead capture, and live analytics — all in one platform. Launch your business online in weeks, not months."
        backgroundImage={heroImage}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="gap-2">
              Get This Solution <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={createPageUrl('Products')}>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20">
              See a Live Example <Sparkles className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/80">
          Architected by{' '}
          <a href="https://sufikhan.com/about" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/40 hover:decoration-white transition-colors">
            Sufi Khan Sulaiman
          </a>
          {' '}—{' '}
          <a href="https://sufikhan.com/experience" target="_blank" rel="noopener noreferrer" className="text-white/90 underline decoration-white/40 hover:decoration-white transition-colors">
            20+ years of e-commerce experience
          </a>
        </p>
      </PageHero>

      {/* Pitch Intro */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Your Business, Online — Fully Managed
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Most businesses piece together a website, a separate CMS, a quote tool, a warranty form, and an analytics dashboard — then pay someone to glue them together. This platform does it all in one.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Built for manufacturers, distributors, and custom-order businesses, it comes with ten ready-made modules and a robust content management system your team can run without a developer. You bring the products — we bring the platform.{' '}
              <a href="https://sufikhan.com/projects" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:text-cyan-700 underline decoration-cyan-200">
                See similar projects
              </a>{' '}
              or{' '}
              <a href="https://sufikhan.com/expertise" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:text-cyan-700 underline decoration-cyan-200">
                explore the full expertise
              </a>{' '}
              behind it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pitch Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {pitchStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4">
              What's Included
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ten Modules, One Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every module below comes ready to use. Click through to see a live example of each one in action.
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

      {/* Platform Highlights */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold mb-4">
              Under the Hood
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance & Growth</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Beyond the modules, the platform ships with everything you need to launch, rank, and scale.{' '}
              <a href="https://sufikhan.com/skills" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-medium hover:text-cyan-200 underline decoration-cyan-700">
                See the full skill set
              </a>{' '}
              that powers it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformHighlights.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
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

      {/* Who It's For */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4">
              Who It's For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built for Custom-Order Businesses</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              If you sell products that need configuration, registration, or education, this platform fits.{' '}
              <a href="https://sufikhan.com/projects" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-medium hover:text-cyan-700 underline decoration-cyan-200">
                View past projects
              </a>{' '}
              across similar industries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Boxes, title: 'Manufacturers', desc: 'Showcase a full catalog, register warranties, and onboard dealers.' },
              { icon: Store, title: 'Distributors & Retailers', desc: 'Capture qualified leads with a quote builder and live chat.' },
              { icon: Palette, title: 'Custom-Order Brands', desc: 'Let customers configure and visualize before they buy.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Builder */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4">
              Built By
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet the Architect Behind the Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              This solution was designed and engineered by a technology executive with two decades of scaling digital businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
                SK
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Sufi Khan Sulaiman</h3>
              <p className="text-cyan-600 font-medium mb-4">Technology Executive & E-Commerce Strategist</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Over 20 years building scalable software and leading large cross-functional teams. Specializes in growing online sales and automating business operations with AI and machine learning.
              </p>
              <div className="flex flex-col gap-2.5 items-center">
                <a
                  href="https://sufikhan.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700 transition-colors"
                >
                  View full profile <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://sufikhan.com/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-cyan-600 transition-colors"
                >
                  View skills <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Career Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2"><Award className="w-5 h-5 text-cyan-600" /> Career Highlights</span>
                <a href="https://sufikhan.com/experience" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors inline-flex items-center gap-1">
                  View experience <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Executive Leadership</h4>
                    <p className="text-slate-600 text-sm">Managed global technology teams of 100+ across engineering, product management, and marketing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">E-Commerce Growth</h4>
                    <p className="text-slate-600 text-sm">Led digital redesigns and relaunches for major brands including Lorex Technology (VP of eCommerce & Digital Experience), FLIR, Cosmo Music, and MGM Resorts.</p>
                    <a href="https://sufikhan.com/projects" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-600 text-xs font-medium hover:text-cyan-700 transition-colors mt-1.5">
                      View projects <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">AI & Automation</h4>
                    <p className="text-slate-600 text-sm">Designs autonomous software agents and smart applications, including an AI-powered iOS note-taking workspace with assisted writing and image generation.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-5 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-cyan-600" /> Core Expertise</span>
                <a href="https://sufikhan.com/expertise" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors inline-flex items-center gap-1">
                  View expertise <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Code, title: 'System Design', desc: 'Distributed systems serving millions of concurrent users.' },
                  { icon: LineChart, title: 'Web Analytics', desc: 'Google Analytics and Power BI frameworks that lift conversion.' },
                  { icon: Megaphone, title: 'Customer Acquisition', desc: 'Multi-channel campaigns — SEO, search ads, and email.' },
                  { icon: Users, title: 'Change Management', desc: 'Leading organizational transformations and software adoption.' },
                ].map((exp) => {
                  const Icon = exp.icon;
                  return (
                    <div key={exp.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
                      <Icon className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{exp.title}</h4>
                        <p className="text-slate-600 text-xs">{exp.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Solution?</h2>
          <p className="text-xl text-cyan-50 mb-8">
            Get a turnkey web platform with a robust CMS and all nine modules — configured for your products and your brand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="secondary" className="gap-2">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={createPageUrl('Products')}>
              <Button size="lg" className="gap-2 bg-white text-cyan-600 hover:bg-cyan-50">
                See a Live Example <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-cyan-50">
            Want to know who builds solutions like this?{' '}
            <a href="https://sufikhan.com/about" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/40 hover:decoration-white transition-colors">
              Meet the architect
            </a>{' '}·{' '}
            <a href="https://sufikhan.com/experience" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/40 hover:decoration-white transition-colors">
              Experience
            </a>{' '}·{' '}
            <a href="https://sufikhan.com/expertise" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/40 hover:decoration-white transition-colors">
              Expertise
            </a>{' '}·{' '}
            <a href="https://sufikhan.com/skills" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-white/40 hover:decoration-white transition-colors">
              Skills
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}