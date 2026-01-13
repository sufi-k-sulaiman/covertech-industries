import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const collections = [
  { id: 'platinum-plus-2026', name: 'Platinum Plus Collection 2026' },
  { id: 'premium-2026', name: 'Premium Collection 2026' },
  { id: 'essentials-2026', name: 'Essentials Collection 2026' }
];

const patterns = {
  'platinum-plus-2026': [
    { id: 'aurora-shimmer', name: 'Aurora Shimmer', type: 'AquaShimmer Full Print', image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80' },
    { id: 'crystal-waves', name: 'Crystal Waves', type: 'AquaShimmer Full Print', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
    { id: 'ocean-mosaic', name: 'Ocean Mosaic', type: 'Premium Full Print', image: 'https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=400&q=80' },
    { id: 'tropical-horizon', name: 'Tropical Horizon', type: 'AquaShimmer Full Print', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
    { id: 'midnight-pearl', name: 'Midnight Pearl', type: 'Premium Full Print', image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80' }
  ],
  'premium-2026': [
    { id: 'azure-dream', name: 'Azure Dream', type: 'HD Full Print', image: 'https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=400&q=80' },
    { id: 'sand-stone', name: 'Sand Stone', type: 'Textured Print', image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80' },
    { id: 'neptune-blue', name: 'Neptune Blue', type: 'Full Print', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
    { id: 'coastal-charm', name: 'Coastal Charm', type: 'HD Full Print', image: 'https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=400&q=80' },
    { id: 'river-rock', name: 'River Rock', type: 'Textured Print', image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80' }
  ],
  'essentials-2026': [
    { id: 'classic-blue', name: 'Classic Blue', type: 'Standard Print', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
    { id: 'white-marble', name: 'White Marble', type: 'Standard Print', image: 'https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=400&q=80' },
    { id: 'grey-granite', name: 'Grey Granite', type: 'Standard Print', image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400&q=80' },
    { id: 'sky-light', name: 'Sky Light', type: 'Standard Print', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' }
  ]
};

const beadColors = [
  { id: 'blue', name: 'Blue', color: '#1e3a8a' },
  { id: 'light-blue', name: 'Light Blue', color: '#0ea5e9' },
  { id: 'gray', name: 'Gray', color: '#64748b' },
  { id: 'tan', name: 'Tan', color: '#d97706' },
  { id: 'white', name: 'White', color: '#f1f5f9' }
];

export default function PatternSelector({ selectedCollection, selectedPattern, selectedBead, onSelectionChange }) {
  const currentPatterns = patterns[selectedCollection] || patterns['platinum-plus-2026'];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Customize your Vinyl Pool Liner</h2>
        <p className="text-slate-600">Choose colors, patterns, and materials.</p>
      </div>

      {/* Collection Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Collection</h3>
        <div className="flex gap-3">
          {collections.map((collection) => (
            <Button
              key={collection.id}
              onClick={() => onSelectionChange('collection', collection.id)}
              variant={selectedCollection === collection.id ? 'default' : 'outline'}
              className={selectedCollection === collection.id ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
            >
              {collection.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Pattern Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Pattern</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentPatterns.map((pattern) => (
            <motion.button
              key={pattern.id}
              onClick={() => onSelectionChange('pattern', pattern.id)}
              className={`relative rounded-xl overflow-hidden group ${
                selectedPattern === pattern.id ? 'ring-4 ring-cyan-500' : 'ring-1 ring-slate-200'
              }`}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={pattern.image}
                  alt={pattern.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-medium text-sm mb-1">{pattern.name}</div>
                  <div className="text-slate-300 text-xs">{pattern.type}</div>
                </div>

                {selectedPattern === pattern.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Collection Info */}
      <div className="bg-cyan-50 rounded-xl p-6 mb-8">
        <h4 className="font-semibold text-cyan-900 mb-2">
          {selectedCollection === 'platinum-plus' ? '2025 Platinum Plus Collection' : '2025 Platinum Collection'}
        </h4>
        <p className="text-sm text-cyan-800 mb-3">
          Premium patterns featuring AquaShimmer technology for enhanced depth and shimmer effects
        </p>
        <ul className="space-y-1 text-sm text-cyan-700">
          <li>• Liners are custom designed and fabricated incorporating proprietary sealing technology</li>
          <li>• Manufactured with attached vinyl over steps, benches, and sundecks</li>
        </ul>
      </div>

      {/* Liner Features */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8 p-6 bg-slate-50 rounded-xl">
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Liner Features</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              25-Season Warranty
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              100% Anti-bacterial Virgin Resin
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              Non-slip textured vinyl available
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">&nbsp;</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              30mil Cold Crack-resistant Film
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              UV & Chemical-resistant Aqua Finish
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-500" />
              Made in Canada since 1987
            </li>
          </ul>
        </div>
      </div>

      {/* Bead Color */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Bead Color</h3>
        <div className="flex gap-4">
          {beadColors.map((bead) => (
            <button
              key={bead.id}
              onClick={() => onSelectionChange('bead', bead.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                selectedBead === bead.id
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-slate-300"
                style={{ backgroundColor: bead.color }}
              />
              <span className="text-sm font-medium text-slate-700">{bead.name}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Note: Color of pattern may vary, please consult your dealer to see actual sample
        </p>
      </div>
    </div>
  );
}