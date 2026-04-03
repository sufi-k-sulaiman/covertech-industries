import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = [
  {
    name: "Green",
    swatch: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/031b3bbe7_GreenMesh.png",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/6a9293dd4_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/c52fce877_generated_image.png",
    description: "Classic forest green — blends naturally with outdoor landscapes",
    bg: "bg-green-900",
  },
  {
    name: "Grey",
    swatch: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/09d3933b4_GreyMesh.png",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/27bcf1951_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d6afd2416_generated_image.png",
    description: "Modern neutral grey — complements contemporary pool decks",
    bg: "bg-slate-500",
  },
  {
    name: "Blue",
    swatch: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bd76c5987_BlueMesh.png",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/add1afa43_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/233b46235_generated_image.png",
    description: "Deep navy blue — a bold classic that complements any backyard",
    bg: "bg-blue-900",
  },
  {
    name: "Taupe",
    swatch: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f3d20276_TaupeMesh.png",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/dbda7e4f6_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/209524a0b_generated_image.png",
    description: "Warm earthy taupe — elegant and subtle, perfect for natural settings",
    bg: "bg-yellow-800",
  },
  {
    name: "Black",
    swatch: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c4494b8d4_BlackMesh.png",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/06ba4c9bd_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/8f8729184_generated_image.png",
    description: "Sleek jet black — premium look that makes any backyard stand out",
    bg: "bg-slate-900",
  },
];

export default function SafetyCoverVisualizer() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [shape, setShape] = useState('rectangle');

  const color = COLORS[selectedColor];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Interactive</span>
          <h3 className="text-xl font-bold text-white mt-0.5">Safety Cover Visualizer</h3>
        </div>
        {/* Shape Toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-full p-1">
          {['rectangle', 'round'].map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                shape === s ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Color Selector */}
        <div className="lg:w-64 xl:w-72 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Mesh Colors</p>
          <div className="space-y-2">
            {COLORS.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(idx)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  selectedColor === idx
                    ? 'bg-cyan-50 border-2 border-cyan-400 shadow-sm'
                    : 'border-2 border-transparent hover:bg-slate-50'
                }`}
              >
                <img
                  src={c.swatch}
                  alt={c.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm"
                />
                <div>
                  <span className={`font-semibold text-sm ${selectedColor === idx ? 'text-cyan-700' : 'text-slate-800'}`}>
                    {c.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-6 bg-slate-50 flex flex-col items-center justify-center min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedColor}-${shape}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <img
                src={color[shape]}
                alt={`${color.name} safety cover on ${shape} pool`}
                className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              />
            </motion.div>
          </AnimatePresence>

          {/* Info pill */}
          <div className="mt-5 text-center w-full">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-2">
              <img src={color.swatch} alt="" className="w-6 h-6 rounded object-cover" />
              <span className="font-semibold text-slate-900 text-sm">{color.name} Mesh</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-sm capitalize">{shape} Pool</span>
            </div>
            <p className="text-slate-500 text-sm max-w-md mx-auto">{color.description}</p>
          </div>

          {/* Color nav dots */}
          <div className="flex items-center gap-2 mt-5">
            {COLORS.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  selectedColor === idx ? 'scale-125 ring-2 ring-cyan-400 ring-offset-1' : 'bg-slate-300 hover:bg-slate-400'
                } ${c.bg}`}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}