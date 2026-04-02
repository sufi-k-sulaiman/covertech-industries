import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock, Wrench } from 'lucide-react';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const sections = [
  {
    title: "Installation Steps",
    icon: Wrench,
    steps: [
      "Remove debris and clean pool deck",
      "Drain pool to appropriate level",
      "Lay out cover evenly around pool perimeter",
      "Secure cover with provided anchors or springs",
      "Ensure water drainage system is functioning",
      "Check for proper tension and coverage"
    ]
  },
  {
    title: "Maintenance Tips",
    icon: Clock,
    steps: [
      "Remove leaves and debris regularly with cover net",
      "Check water level and pump system monthly",
      "Inspect anchors for wear or damage",
      "Clean cover surface gently with soft brush",
      "Monitor for algae or mold growth",
      "Ensure proper drainage during heavy rain"
    ]
  },
  {
    title: "Safety Guidelines",
    icon: AlertCircle,
    steps: [
      "Never allow children or pets on the cover unsupervised",
      "Ensure cover is properly secured before leaving",
      "Use approved pool cover pumps only",
      "Check weight capacity and load limits",
      "Keep cover clean to prevent slips",
      "Follow manufacturer safety instructions"
    ]
  }
];

export default function WinterCoverGuide() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Learn", url: "https://covertechind.com/learn" },
    { name: "Winter Cover Installation", url: "https://covertechind.com/winter-cover-installation-and-use" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Winter Pool Cover Installation & Use Guide",
    description: "Complete guide for installing and maintaining winter pool covers. Learn proper installation techniques, maintenance tips, and safety guidelines.",
    url: "https://covertechind.com/winter-cover-installation-and-use"
  });

  return (
    <>
      <SEOHead
        title="Winter Pool Cover Installation & Use Guide | Covertech"
        description="Complete guide for installing and maintaining winter pool covers. Learn proper installation techniques, maintenance tips, and safety guidelines."
        keywords={[
          "winter cover installation",
          "pool cover maintenance",
          "winter pool cover guide",
          "cover installation steps",
          "pool safety"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Installation Guide"
        title="Winter Pool Cover"
        titleAccent="Installation & Use"
        description="Learn how to properly install, maintain, and use your winter pool cover to protect your investment year-round."
      />

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Complete Installation Guide</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Winter pool covers are essential for protecting your pool during the off-season. This comprehensive guide walks you through every step of the installation process, maintenance requirements, and important safety considerations.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Proper installation ensures maximum protection and longevity of your cover investment.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{section.title}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                        <p className="text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-10 border border-cyan-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Pro Tips for Best Results</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cyan-600 font-bold">•</span>
                <span className="text-slate-700">Install your cover before the first frost for maximum protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-600 font-bold">•</span>
                <span className="text-slate-700">Use a cover pump to remove accumulated water and leaves</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-600 font-bold">•</span>
                <span className="text-slate-700">Store cover properly indoors during the off-season to extend lifespan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-600 font-bold">•</span>
                <span className="text-slate-700">Inspect cover regularly for wear and damage</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}