import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const poolShapes = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    label: 'Classic lap pool',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="10" y="10" width="100" height="60" fill="#22d3ee" stroke="#0891b2" strokeWidth="2" rx="2"/>
        <pattern id="grid-rect" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <rect x="10" y="10" width="100" height="60" fill="url(#grid-rect)" rx="2"/>
      </svg>
    )
  },
  {
    id: 'oval',
    name: 'Oval',
    label: 'Elegant curves',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <ellipse cx="60" cy="40" rx="50" ry="30" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-oval" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <ellipse cx="60" cy="40" rx="50" ry="30" fill="url(#grid-oval)"/>
      </svg>
    )
  },
  {
    id: 'round',
    name: 'Round',
    label: 'Compact circle',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <circle cx="60" cy="40" r="32" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-round" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <circle cx="60" cy="40" r="32" fill="url(#grid-round)"/>
      </svg>
    )
  },
  {
    id: 'grecian',
    name: 'Grecian',
    label: 'Cut corners style',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M 20,10 L90,10 L110,25 L110,55 L90,70 L20,70 L10,55 L10,25 Z" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-grec" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <path d="M 20,10 L90,10 L110,25 L110,55 L90,70 L20,70 L10,55 L10,25 Z" fill="url(#grid-grec)"/>
      </svg>
    )
  },
  {
    id: 'roman',
    name: 'Roman',
    label: 'Rounded ends',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M 30,10 L90,10 Q110,10 110,30 L110,50 Q110,70 90,70 L30,70 Q10,70 10,50 L10,30 Q10,10 30,10 Z" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-roman" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <path d="M 30,10 L90,10 Q110,10 110,30 L110,50 Q110,70 90,70 L30,70 Q10,70 10,50 L10,30 Q10,10 30,10 Z" fill="url(#grid-roman)"/>
      </svg>
    )
  },
  {
    id: 'lazy-l',
    name: 'Lazy L',
    label: 'Angled design',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M 10,10 L70,10 L70,35 L110,35 L110,70 L10,70 Z" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-lazyl" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <path d="M 10,10 L70,10 L70,35 L110,35 L110,70 L10,70 Z" fill="url(#grid-lazyl)"/>
      </svg>
    )
  },
  {
    id: 'true-l',
    name: 'True L',
    label: 'Right angle',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M 10,10 L60,10 L60,35 L110,35 L110,70 L10,70 Z" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-truel" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <path d="M 10,10 L60,10 L60,35 L110,35 L110,70 L10,70 Z" fill="url(#grid-truel)"/>
      </svg>
    )
  },
  {
    id: 'kidney',
    name: 'Kidney',
    label: 'Organic shape',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <ellipse cx="60" cy="40" rx="45" ry="28" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <ellipse cx="75" cy="40" rx="15" ry="22" fill="#0891b2" opacity="0.2"/>
        <pattern id="grid-kidney" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <ellipse cx="60" cy="40" rx="45" ry="28" fill="url(#grid-kidney)"/>
      </svg>
    )
  },
  {
    id: 'freeform',
    name: 'Freeform',
    label: 'Natural curves',
    svg: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M 20,25 Q10,15 25,12 Q40,10 55,15 Q70,10 90,15 Q108,12 110,30 Q112,45 105,55 Q100,65 85,68 Q70,70 55,65 Q40,70 25,65 Q12,62 12,45 Q10,35 20,25 Z" fill="#22d3ee" stroke="#0891b2" strokeWidth="2"/>
        <pattern id="grid-free" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0891b2" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <path d="M 20,25 Q10,15 25,12 Q40,10 55,15 Q70,10 90,15 Q108,12 110,30 Q112,45 105,55 Q100,65 85,68 Q70,70 55,65 Q40,70 25,65 Q12,62 12,45 Q10,35 20,25 Z" fill="url(#grid-free)"/>
      </svg>
    )
  }
];

export default function PoolShapeSelector({ selectedShape, onSelectShape }) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">What is your pool shape?</h2>
        <p className="text-slate-600">Select the shape that best matches your pool.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {poolShapes.map((shape) => (
          <motion.button
            key={shape.id}
            onClick={() => onSelectShape(shape.id)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedShape === shape.id
                ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-100'
                : 'border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md'
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[3/2] mb-3 flex items-center justify-center">
              {shape.svg}
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-900 mb-1">{shape.name}</div>
              <div className="text-xs text-slate-500">{shape.label}</div>
            </div>
            {selectedShape === shape.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}