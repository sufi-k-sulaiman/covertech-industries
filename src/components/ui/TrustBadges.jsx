import { motion } from 'framer-motion';
import { Shield, Award, MapPin, Clock } from 'lucide-react';

const badges = [
  { icon: Shield, label: "ASTM F1346-91 Certified", sublabel: "Safety Tested" },
  { icon: Award, label: "ISO 9001:2015", sublabel: "Quality Assured" },
  { icon: MapPin, label: "Made in North America", sublabel: "Since 1987" },
  { icon: Clock, label: "25-Year Warranty", sublabel: "Industry Leading" }
];

export default function TrustBadges({ variant = "default", className = "" }) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <badge.icon className="w-4 h-4 text-cyan-600" />
            <span className="font-medium">{badge.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-cyan-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 flex items-center justify-center mb-3 group-hover:from-cyan-100 group-hover:to-cyan-200 transition-colors">
            <badge.icon className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">{badge.label}</h3>
          <p className="text-xs text-slate-500 mt-1">{badge.sublabel}</p>
        </motion.div>
      ))}
    </div>
  );
}