import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Phone, Mail, MapPin, 
  Facebook, Linkedin, Instagram, ArrowUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatWidget from '@/components/chat/ChatWidget';

const navigation = [
  { 
    name: 'Products', 
    href: 'Products',
    submenu: [
      { name: 'In-Ground Liners', href: 'ProductDetails?slug=in-ground-liners' },
      { name: 'Above Ground Liners', href: 'ProductDetails?slug=above-ground-liners' },
      { name: 'Safety Covers', href: 'ProductDetails?slug=safety-covers' },
      { name: 'Solar Covers', href: 'ProductDetails?slug=solar-covers' },
      { name: 'Winter Covers', href: 'ProductDetails?slug=winter-covers' },
      { name: 'Steel Kits', href: 'ProductDetails?slug=steel-kits' },
      { name: 'Golf Green Covers', href: 'ProductDetails?slug=golf-covers' },
      { name: 'Pool Insulation', href: 'ProductDetails?slug=pool-insulation' },
      { name: 'Curing Blankets', href: 'ProductDetails?slug=curing-blankets' },
      { name: 'View All Products', href: 'Products' },
      { name: 'Gallery', href: 'Gallery' },
      ]
      },
  { name: 'Design Center', href: 'DesignCenter' },
  { name: 'Warranties', href: 'Warranties' },
  { name: 'Resources', href: 'Resources' },
  { name: 'Dealer', href: 'Dealer' },
  { name: 'Learn', href: 'Learn' },
  { name: 'About', href: 'About' },
  { name: 'Contact', href: 'Contact' },
];

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headerBg = 'bg-white shadow-sm';
  const textColor = 'text-slate-900';
  const logoColor = 'text-cyan-600';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png"
              alt="Covertech Industries"
              className="h-6 md:h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={createPageUrl(item.href)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${textColor} hover:text-cyan-500`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl py-2 mt-1 border border-slate-100"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={createPageUrl(subItem.href)}
                          className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-cyan-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to={createPageUrl('DesignCenter')}>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-6">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
              <div className="p-6 pt-24">
                {navigation.map((item) => (
                  <div key={item.name} className="mb-4">
                    <Link
                      to={createPageUrl(item.href)}
                      className="block py-3 text-lg font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="pl-4 border-l-2 border-slate-100 ml-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={createPageUrl(subItem.href)}
                            className="block py-2 text-slate-600 hover:text-cyan-600 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to={createPageUrl('DesignCenter')} className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png"
                alt="Covertech Industries"
                className="h-8 mb-6 brightness-0 invert"
              />
              <p className="text-slate-400 mb-6 leading-relaxed">
                Premium pool liners, safety covers, and custom solutions since 1987. 
                Made in North America with industry-leading warranties.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Products</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <Link to={createPageUrl('ProductDetails?slug=in-ground-liners')} className="text-slate-400 hover:text-cyan-400 transition-colors">In-Ground Liners</Link>
                <Link to={createPageUrl('ProductDetails?slug=above-ground-liners')} className="text-slate-400 hover:text-cyan-400 transition-colors">Above Ground Liners</Link>
                <Link to={createPageUrl('ProductDetails?slug=safety-covers')} className="text-slate-400 hover:text-cyan-400 transition-colors">Safety Covers</Link>
                <Link to={createPageUrl('ProductDetails?slug=solar-covers')} className="text-slate-400 hover:text-cyan-400 transition-colors">Solar Covers</Link>
                <Link to={createPageUrl('ProductDetails?slug=winter-covers')} className="text-slate-400 hover:text-cyan-400 transition-colors">Winter Covers</Link>
                <Link to={createPageUrl('ProductDetails?slug=steel-kits')} className="text-slate-400 hover:text-cyan-400 transition-colors">Steel Kits</Link>
                <Link to={createPageUrl('ProductDetails?slug=golf-covers')} className="text-slate-400 hover:text-cyan-400 transition-colors">Golf Green Covers</Link>
                <Link to={createPageUrl('ProductDetails?slug=pool-insulation')} className="text-slate-400 hover:text-cyan-400 transition-colors">Pool Insulation</Link>
                <Link to={createPageUrl('ProductDetails?slug=curing-blankets')} className="text-slate-400 hover:text-cyan-400 transition-colors">Curing Blankets</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                <li><Link to={createPageUrl('About')} className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link to={createPageUrl('Dealer')} className="text-slate-400 hover:text-cyan-400 transition-colors">Become a Dealer</Link></li>
                <li><Link to={createPageUrl('Resources')} className="text-slate-400 hover:text-cyan-400 transition-colors">Resources</Link></li>
                <li><Link to={createPageUrl('Learn')} className="text-slate-400 hover:text-cyan-400 transition-colors">Learn</Link></li>
                <li><Link to={createPageUrl('Contact')} className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-400">26 Dansk Court<br/>Toronto, ON M9W 5V8</span>
                </li>
                <li>
                  <a href="tel:+14166405590" className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    +1 (416) 640-5590
                  </a>
                </li>
                <li>
                  <a href="mailto:info@covertechind.com" className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    info@covertechind.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Covertech Industries. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link to={createPageUrl('PrivacyPolicy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
              <Link to={createPageUrl('TermsOfService')} className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
              <Link to={createPageUrl('Warranties')} className="hover:text-cyan-400 transition-colors">Warranty</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
      </div>
      );
      }