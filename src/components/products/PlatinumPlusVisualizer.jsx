import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLATINUM_PLUS_VISUALIZATIONS = [
  {
    name: "Butterfly",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4f5b14b1f_Butterfly.jpg",
    description: "Shimmering blue & teal abstract motif with iridescent AquaShimmer effect",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/baf42c5ff_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/bb3461f22_generated_image.png",
  },
  {
    name: "Esagono",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1c3b1ba72_Esagono.jpg",
    description: "Sophisticated hexagonal tile mosaic in deep blue & grey with premium shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/aaf747185_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/0a7d58c2c_generated_image.png",
  },
  {
    name: "Harmony Gold HDE",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b24218ff9_HarmonyGold-HDE.jpg",
    description: "Luxurious warm gold & bronze shimmer with elegant High Definition Effect",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/4913997bc_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/bbda43dbe_generated_image.png",
  },
  {
    name: "Twilight",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/867ae4129_Twilight.jpg",
    description: "Deep midnight navy with starlight speckles — dramatic & luxurious AquaShimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/324102503_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/7f3ec0b99_generated_image.png",
  },
];

export default function PlatinumPlusVisualizer() {
  const [selected, setSelected] = useState(0);
  const [shape, setShape] = useState('round');

  const pattern = PLATINUM_PLUS_VISUALIZATIONS[selected];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">2026 Platinum Plus</span>
          <h3 className="text-xl font-bold text-white mt-0.5">Pool Visualizer</h3>
        </div>
        {/* Shape Toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-full p-1">
          {['round', 'rectangle'].map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                shape === s
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-0">
        {/* Pattern Selector */}
        <div className="border-r border-slate-100 p-4 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Select Pattern</p>
          {PLATINUM_PLUS_VISUALIZATIONS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setSelected(idx)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                selected === idx
                  ? 'bg-cyan-50 border-2 border-cyan-400 shadow-sm'
                  : 'border-2 border-transparent hover:bg-slate-50'
              }`}
            >
              <img
                src={p.patternImage}
                alt={p.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow"
              />
              <div>
                <p className={`font-semibold text-sm ${selected === idx ? 'text-cyan-700' : 'text-slate-800'}`}>
                  {p.name}
                </p>
                <p className="text-xs text-slate-400 leading-tight mt-0.5 line-clamp-2">{p.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Main Preview */}
        <div className="md:col-span-2 p-6 bg-slate-50 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected}-${shape}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <img
                src={pattern[shape]}
                alt={`${pattern.name} in ${shape} pool`}
                className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
              <img src={pattern.patternImage} alt="" className="w-6 h-6 rounded object-cover" />
              <span className="font-semibold text-slate-900 text-sm">{pattern.name}</span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-slate-500 text-sm capitalize">{shape} Pool</span>
            </div>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">{pattern.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}