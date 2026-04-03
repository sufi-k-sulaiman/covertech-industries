import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_PATTERNS = [
  // ── Platinum Plus ──
  {
    name: "Butterfly",
    tier: "platinum-plus",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4f5b14b1f_Butterfly.jpg",
    description: "Shimmering blue & teal abstract motif with iridescent AquaShimmer effect",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/baf42c5ff_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/bb3461f22_generated_image.png",
  },
  {
    name: "Esagono",
    tier: "platinum-plus",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1c3b1ba72_Esagono.jpg",
    description: "Sophisticated hexagonal tile mosaic in deep blue & grey with premium shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/aaf747185_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/0a7d58c2c_generated_image.png",
  },
  {
    name: "Harmony Gold HDE",
    tier: "platinum-plus",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b24218ff9_HarmonyGold-HDE.jpg",
    description: "Luxurious warm gold & bronze shimmer with High Definition Effect",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/4913997bc_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/bbda43dbe_generated_image.png",
  },
  {
    name: "Twilight",
    tier: "platinum-plus",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/867ae4129_Twilight.jpg",
    description: "Deep midnight navy with starlight speckles — dramatic & luxurious",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/324102503_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/7f3ec0b99_generated_image.png",
  },
  // ── Platinum ──
  {
    name: "Carnival",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/91640be38_Carnival.jpg",
    description: "Vibrant multicolor mosaic tile with festive blues and warm accents",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/7e7f61761_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/745a9a5b5_generated_image.png",
  },
  {
    name: "Canterbury",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1235fa641_Canterbury.jpg",
    description: "Classic elegant blue tile border with traditional pool aesthetic",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/7847223d9_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/996eb8783_generated_image.png",
  },
  {
    name: "HD Antigua",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b574d1bd_HDAntigua.jpg",
    description: "High definition tropical turquoise Caribbean sea-inspired design",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/648cf092a_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/a805f9099_generated_image.png",
  },
  {
    name: "Gladstone",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e7ef00922_Gladstone.jpg",
    description: "Sophisticated deep slate blue with subtle refined geometric undertones",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/4781a7d03_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/83b812218_generated_image.png",
  },
  {
    name: "Celest",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/82ef3daba_Celest.jpg",
    description: "Soft celestial light blue with cloudy wisps and shimmering airy texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/81f89ee17_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/2c64fb93a_generated_image.png",
  },
  {
    name: "Tahoe",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/370383aaa_Tahoe.jpg",
    description: "Deep mountain lake blue with subtle pebble texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/69277d6f2_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d665bfce9_generated_image.png",
  },
  {
    name: "Garden",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3580d7287_Garden.jpg",
    description: "Soft green-tinted blue with nature-inspired organic texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/9a8c0bf1c_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/0fb4361f6_generated_image.png",
  },
  {
    name: "Sapphire",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9cefde4f9_Sapphire.jpg",
    description: "Rich deep sapphire blue pebble texture with gemstone-like shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/717d400b8_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/9de4f5b7b_generated_image.png",
  },
  {
    name: "Sunburst Oyster Bay",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6bc0f75ad_SunburstOysterBay.jpg",
    description: "Warm cream oyster shell design with sunburst golden accents",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/6f9c53db7_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/feb71c81b_generated_image.png",
  },
  {
    name: "Oyster Bay",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d6fd36b0a_OysterBay.jpg",
    description: "Soft pearlescent oyster cream and light grey pebble-like texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/19cb2fd39_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/a877a120e_generated_image.png",
  },
  {
    name: "Oxford HD Electric",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/86cfd7e9a_OXFORDHDELECTRIC.jpg",
    description: "Bold electric blue with HD Oxford geometric border and vibrant shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/1e2965088_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d94ff5b7e_generated_image.png",
  },
  {
    name: "HD Electric",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/07fc1b793_HDELECTRIC.jpg",
    description: "Vibrant electric turquoise and blue with high definition shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/83aa6ad2d_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/3eedddf5b_generated_image.png",
  },
  {
    name: "Bayview White Diffusion",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5a67f1612_BayviewWhiteDiffusion.jpg",
    description: "Soft white diffusion with light blue undertones and bright airy feel",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/6215d172e_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d331cf6e9_generated_image.png",
  },
  {
    name: "White Diffusion",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b2b3f0178_WhiteDiffusion.jpg",
    description: "Pure white with soft light diffusion and subtle shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/f33a82b3a_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/eeb604820_generated_image.png",
  },
  {
    name: "Grey Maui",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d73c2c8d9_GreyMaui.jpg",
    description: "Cool sophisticated grey with tropical Maui-inspired wave texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/82456907a_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/351f24a9d_generated_image.png",
  },
  {
    name: "Blue Maui",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ac2618ef1_BlueMaui.jpg",
    description: "Vibrant ocean blue with tropical Maui-inspired wave shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/6bd0b23ba_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/74b2e4bf6_generated_image.png",
  },
  {
    name: "Greystone River White",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/97c559cf9_GreystoneRiverWhite.jpg",
    description: "Light grey and white river stone pebble texture, natural organic feel",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/69476d8f1_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/eec98d9b1_generated_image.png",
  },
  {
    name: "River White",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8a1e62d22_RiverWhite.jpg",
    description: "Natural white and light grey river stone pebble texture",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d4be0b0c8_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/8b4c72c59_generated_image.png",
  },
  {
    name: "Summer River White",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/296e83210_SummerRiverWhite.jpg",
    description: "Warm white river stone pebble with summer golden-tinted warmth",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/eaf298fcb_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/d7a5df063_generated_image.png",
  },
  {
    name: "Ocean Midnight",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf54bc3ba_OceanMidnight.jpg",
    description: "Deep midnight blue with ocean-like swirling depth and luxury shimmer",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/eb6d40013_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/66116ebbb_generated_image.png",
  },
  {
    name: "Carrara Marble",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e59feeea_CarraraMarble.jpg",
    description: "Luxurious white Carrara marble veining with elegant grey streaks",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/fdd4dab91_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/694107f17_generated_image.png",
  },
  {
    name: "Raleigh Blue Beach Pebble",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0fdb87fd3_RaleighBlueBeachPebble.jpg",
    description: "Elegant Raleigh border with blue beach pebble floor",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/23e748612_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/796f7ac9b_generated_image.png",
  },
  {
    name: "Blue Beach Pebble",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/49bca1208_BlueBeachPebble.jpg",
    description: "Soft blue beach pebble texture like smooth ocean-tumbled stones",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/fe13563ec_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/78bbbdd5d_generated_image.png",
  },
  {
    name: "Sandstone",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a7f229630_Sandstone.jpg",
    description: "Warm sandy beige and tan with subtle stone texture, earthy natural tones",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/598230d20_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/5bc8bad27_generated_image.png",
  },
  {
    name: "Raleigh White Beach Pebble",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a149dfe63_RaleighWhiteBeachPebble.jpg",
    description: "Elegant Raleigh-style decorative tile border with white beach pebble floor",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/f7a6dc632_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/905062e07_generated_image.png",
  },
  {
    name: "White Beach Pebble",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3d44fed9a_WhiteBeachPebble.jpg",
    description: "Clean white beach pebble texture, smooth and bright",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/1fab519e7_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/2571c0a42_generated_image.png",
  },
  {
    name: "White",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf175feaa_White.jpg",
    description: "Pure clean solid white liner — bright and elegant",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/1ef21aa51_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/8c09d3e6b_generated_image.png",
  },
  {
    name: "Blue",
    tier: "platinum",
    patternImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/415691248_Blue.jpg",
    description: "Classic solid rich blue liner — vibrant and timeless",
    round: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/1dbb009a5_generated_image.png",
    rectangle: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/185609f5a_generated_image.png",
  },
];

const TIER_LABELS = {
  'platinum-plus': { label: '2026 Platinum Plus', badge: 'bg-amber-100 text-amber-800 border border-amber-300' },
  'platinum': { label: '2026 Platinum', badge: 'bg-slate-100 text-slate-700 border border-slate-300' },
};

export default function PlatinumPlusVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [shape, setShape] = useState('round');
  const [filterTier, setFilterTier] = useState('all');

  const filtered = filterTier === 'all' ? ALL_PATTERNS : ALL_PATTERNS.filter(p => p.tier === filterTier);
  const safeIdx = Math.min(selectedIdx, filtered.length - 1);
  const pattern = filtered[safeIdx];

  const handleSelect = (idx) => setSelectedIdx(idx);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">Interactive</span>
          <h3 className="text-xl font-bold text-white mt-0.5">Pool Pattern Visualizer</h3>
        </div>
        {/* Shape Toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-full p-1">
          {['round', 'rectangle'].map((s) => (
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

      {/* ── Tier filter tabs ── */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 bg-slate-50 flex-wrap">
        {[
          { key: 'all', label: `All Patterns (${ALL_PATTERNS.length})` },
          { key: 'platinum-plus', label: `Platinum Plus (${ALL_PATTERNS.filter(p => p.tier === 'platinum-plus').length})` },
          { key: 'platinum', label: `Platinum (${ALL_PATTERNS.filter(p => p.tier === 'platinum').length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => { setFilterTier(t.key); setSelectedIdx(0); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterTier === t.key
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* ── Pattern selector: horizontal scrollable strip ── */}
        <div className="lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100">
          {/* Grouped by tier */}
          <div className="overflow-y-auto max-h-[420px] lg:max-h-[520px] p-3 space-y-4">
            {['platinum-plus', 'platinum'].map(tier => {
              const tierPatterns = filtered.filter(p => p.tier === tier);
              if (!tierPatterns.length) return null;
              return (
                <div key={tier}>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${TIER_LABELS[tier].badge}`}>
                    {tier === 'platinum-plus' && '⭐ '}
                    {TIER_LABELS[tier].label}
                  </div>
                  <div className="space-y-1.5">
                    {tierPatterns.map((p) => {
                      const globalIdx = filtered.indexOf(p);
                      const isActive = globalIdx === safeIdx;
                      return (
                        <button
                          key={p.name}
                          onClick={() => handleSelect(globalIdx)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
                            isActive
                              ? 'bg-cyan-50 border-2 border-cyan-400 shadow-sm'
                              : 'border-2 border-transparent hover:bg-slate-50'
                          }`}
                        >
                          <img
                            src={p.patternImage}
                            alt={p.name}
                            className="w-11 h-11 rounded-lg object-cover flex-shrink-0 shadow-sm"
                          />
                          <span className={`font-semibold text-sm leading-tight ${isActive ? 'text-cyan-700' : 'text-slate-800'}`}>
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Main Preview ── */}
        <div className="flex-1 p-6 bg-slate-50 flex flex-col items-center justify-center min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${safeIdx}-${shape}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <img
                src={pattern[shape]}
                alt={`${pattern.name} in ${shape} pool`}
                className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 text-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-2">
              <img src={pattern.patternImage} alt="" className="w-6 h-6 rounded object-cover" />
              <span className="font-semibold text-slate-900 text-sm">{pattern.name}</span>
              <span className="text-slate-300">•</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TIER_LABELS[pattern.tier].badge}`}>
                {TIER_LABELS[pattern.tier].label}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-sm capitalize">{shape} Pool</span>
            </div>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{pattern.description}</p>
          </div>

          {/* ── Quick-nav arrow strip ── */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setSelectedIdx(Math.max(0, safeIdx - 1))}
              disabled={safeIdx === 0}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              ← Prev
            </button>
            <span className="text-xs text-slate-400">{safeIdx + 1} / {filtered.length}</span>
            <button
              onClick={() => setSelectedIdx(Math.min(filtered.length - 1, safeIdx + 1))}
              disabled={safeIdx === filtered.length - 1}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}