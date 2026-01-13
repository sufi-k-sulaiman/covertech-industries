import { motion } from 'framer-motion';
import { Clock, Award, Shield, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: "35+ Years Experience",
    description: "Trusted industry leader since 1987 with decades of expertise in specialty covers and liners.",
    stat: "35+",
    statLabel: "Years"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "All products meet or exceed ASTM standards with rigorous quality control processes.",
    stat: "100%",
    statLabel: "Tested"
  },
  {
    icon: Shield,
    title: "25-Year Warranty",
    description: "Industry-leading warranties backed by our commitment to product excellence.",
    stat: "25yr",
    statLabel: "Coverage"
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Dedicated customer service team providing professional guidance and rapid response.",
    stat: "24/7",
    statLabel: "Support"
  }
];

const stats = [
  { value: "35+", label: "Years in Business" },
  { value: "25K+", label: "Products Delivered" },
  { value: "80+", label: "Dealer Partners" },
  { value: "99%", label: "Satisfaction Rate" }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Why Covertech</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Why Industry Leaders <span className="text-cyan-600">Choose Us</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover what makes Covertech the preferred choice for pool and construction professionals
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-cyan-100 transition-all duration-300"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-2xl transition-colors duration-300" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
                
                {/* Stat badge */}
                <div className="absolute top-6 right-6 text-right">
                  <span className="text-2xl font-bold text-cyan-600">{reason.stat}</span>
                  <p className="text-xs text-slate-400">{reason.statLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {stat.value}
                </span>
                <p className="text-slate-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}