import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PlatinumPlusVisualizer from '@/components/products/PlatinumPlusVisualizer';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

export default function PoolVisualizer() {
  return (
    <>
      <SEOHead
        title="Pool Liner Pattern Visualizer — See All 2026 Patterns"
        description="Visualize all 30 Covertech in-ground pool liner patterns (Platinum Plus & Platinum) in round or rectangular pools. Interactive tool to find your perfect pool liner."
        keywords={["pool liner visualizer", "pool pattern preview", "in-ground pool liner", "Covertech patterns", "pool design"]}
      />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-300 text-sm font-semibold rounded-full mb-4 border border-cyan-500/30">
            Interactive Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pool Liner Pattern Visualizer
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Explore all 30 in-ground pool liner patterns from our 2026 collection. 
            Toggle between round and rectangular pools to see exactly how each pattern will look.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('ProductDetails?slug=in-ground-liners')}>
              <Button className="bg-slate-700 hover:bg-slate-800 text-white gap-2">
                View Product Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b2554bf71_Covertech2026In-GroundLinerCatalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-cyan-500 hover:bg-cyan-600 gap-2">
                <Download className="w-4 h-4" />
                Download 2026 Catalogue
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Visualizer */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <PlatinumPlusVisualizer />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Order Your Liner?</h2>
          <p className="text-slate-600 mb-8">
            Contact our team for a personalized quote, custom sizing, or to find a dealer near you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Request a Quote
              </Button>
            </Link>
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" variant="outline" className="px-8 gap-2">
                Design Center
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}