import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SafetyCoverVisualizer from '@/components/products/SafetyCoverVisualizer';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

export default function SafetyCoverVisualizerPage() {
  return (
    <>
      <SEOHead
        title="Safety Cover Color Visualizer — See All Mesh Colors"
        description="Visualize Covertech safety covers in all 5 mesh colors (Green, Grey, Blue, Taupe, Black) on round and rectangular pools. Find your perfect safety cover color."
        keywords={["safety cover visualizer", "pool safety cover colors", "mesh cover colors", "Covertech safety covers"]}
      />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-300 text-sm font-semibold rounded-full mb-4 border border-cyan-500/30">
            Interactive Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Safety Cover Color Visualizer
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            See all 5 ASTM-certified mesh safety cover colors on round and rectangular pools. 
            Pick the perfect color to complement your backyard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('ProductDetails?slug=safety-covers')}>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                View Safety Covers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/59cb887bb_2024SafetyCoversBrochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-cyan-500 hover:bg-cyan-600 gap-2">
                <Download className="w-4 h-4" />
                Download Brochure
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Visualizer */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <SafetyCoverVisualizer />
        </div>
      </section>

      {/* Features strip */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "ASTM F1346-91 Certified", icon: "🛡️" },
              { label: "Up to 30-Year Warranty", icon: "✅" },
              { label: "5 Mesh Colors", icon: "🎨" },
              { label: "Custom Fit Any Pool", icon: "📐" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{f.icon}</span>
                <span className="text-sm font-semibold text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Protect Your Pool?</h2>
          <p className="text-slate-600 mb-8">
            Contact our team for a custom quote and measuring form for your pool size and shape.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Request a Quote
              </Button>
            </Link>
            <Link to={createPageUrl('Dealer')}>
              <Button size="lg" variant="outline" className="px-8 gap-2">
                Find a Dealer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}