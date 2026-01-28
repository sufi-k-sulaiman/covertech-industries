import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Image, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryBanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full mb-4 w-fit">
                <Image className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold text-sm">Inspiration Gallery</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                See Our Work <span className="text-cyan-600">In Action</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Browse hundreds of completed installations featuring our premium pool liners, safety covers, and custom solutions. Get inspired for your next project.
              </p>
              <Link to={createPageUrl('Gallery')}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 gap-2 group"
                >
                  View Gallery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right Side - Image Grid Preview */}
            <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/410142be5_20240518_125429.jpg"
                  alt="Pool liner installation"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2e2d0d292_02.png"
                  alt="Safety cover installation"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e1fba1d5_20240518_151820.jpg"
                  alt="Custom pool liner"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/35289ddf1_20240518_151835.jpg"
                  alt="Pool installation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white text-center">
                    <p className="text-3xl font-bold">200+</p>
                    <p className="text-sm">More Photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}