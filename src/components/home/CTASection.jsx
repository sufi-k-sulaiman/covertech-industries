import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564429238877-5c5c89de7015?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-cyan-900/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Get <span className="text-cyan-400">Started?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Whether you're a pool professional, contractor, or property owner, 
              our team is ready to help you find the perfect solution for your needs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl('Dealer')}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/25 group">
                  Become a Dealer
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 px-8 py-6 text-lg rounded-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Our Team</h3>
              
              <div className="space-y-4 mb-8">
                <a 
                  href="tel:+14166405590"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Call Us</p>
                    <p className="text-cyan-300">+1 (416) 640-5590</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@covertechind.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-cyan-300">info@covertechind.com</p>
                  </div>
                </a>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-2">Business Hours</p>
                <p className="text-white">Mon - Sat: 8:30 AM - 5:30 PM EST</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}