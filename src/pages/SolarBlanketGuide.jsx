import { motion } from 'framer-motion';
import { CheckCircle2, Sun, Droplet, Zap } from 'lucide-react';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const sections = [
  {
    title: "Installation Steps",
    icon: Zap,
    steps: [
      "Ensure pool water is clean and properly balanced",
      "Lay out blanket flat on ground near pool",
      "Slowly unroll blanket into pool water",
      "Smooth out air bubbles and wrinkles",
      "Adjust position for maximum water coverage",
      "Secure edges with provided fasteners"
    ]
  },
  {
    title: "Usage & Care",
    icon: Sun,
    steps: [
      "Use during daylight hours for heating benefits",
      "Remove blanket at night if using heater",
      "Clean blanket weekly to remove debris",
      "Dry completely before storage",
      "Use a blanket roller for easy handling",
      "Rotate usage to ensure even wear"
    ]
  },
  {
    title: "Maintenance Tips",
    icon: Droplet,
    steps: [
      "Check for punctures or damage monthly",
      "Clean with mild soap and soft brush",
      "Rinse thoroughly with fresh water",
      "Apply UV protectant as recommended",
      "Store in cool, dry location away from sunlight",
      "Inspect edges and seams regularly"
    ]
  }
];

export default function SolarBlanketGuide() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Learn", url: "https://covertechind.com/learn" },
    { name: "Solar Blanket Installation", url: "https://covertechind.com/solar-blanket-installation-and-use" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Solar Pool Blanket Installation & Use Guide",
    description: "Learn how to install and use solar pool blankets for maximum heating efficiency. Complete installation guide and maintenance tips.",
    url: "https://covertechind.com/solar-blanket-installation-and-use"
  });

  return (
    <>
      <SEOHead
        title="Solar Pool Blanket Installation & Use Guide | Covertech"
        description="Learn how to install and use solar pool blankets for maximum heating efficiency. Complete installation guide and maintenance tips."
        keywords={[
          "solar blanket installation",
          "solar pool cover guide",
          "pool blanket maintenance",
          "heating pool naturally",
          "pool energy efficiency"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Installation Guide"
        title="Solar Pool Blanket"
        titleAccent="Installation & Use"
        description="Master solar blanket installation and maintenance to maximize heating efficiency and pool protection."
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
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Installation & Operating Guide</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Solar pool blankets (or solar covers) are an economical way to heat your pool naturally while reducing evaporation. This guide provides step-by-step instructions for proper installation, daily use, and long-term maintenance.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Proper installation and care can extend your blanket's lifespan by several seasons while maximizing its heating benefits.
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

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-10 border border-cyan-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Benefits of Solar Blankets</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-700"><strong>Energy Savings:</strong> Reduce heating costs by up to 75%</p>
              </div>
              <div>
                <p className="text-slate-700"><strong>Evaporation Control:</strong> Retain 95% of pool water</p>
              </div>
              <div>
                <p className="text-slate-700"><strong>Chemical Balance:</strong> Reduce chemical evaporation by 90%</p>
              </div>
              <div>
                <p className="text-slate-700"><strong>Debris Prevention:</strong> Keep leaves and debris out</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}