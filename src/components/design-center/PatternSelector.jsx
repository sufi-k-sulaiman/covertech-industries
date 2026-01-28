import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const collections = [
  { id: 'platinum-plus-2026', name: 'Platinum Plus Collection', badge: 'Premium' },
  { id: 'standard-2026', name: 'Standard Collection', badge: 'Popular' },
  { id: 'solids-2026', name: 'Solid Colors', badge: 'Classic' }
];

const patterns = {
  'platinum-plus-2026': [
    { id: 'twilight', name: 'Twilight', type: 'AquaShimmer Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/52842ae7b_Twilight.jpg' },
    { id: 'harmony-gold', name: 'Harmony Gold HDE', type: 'AquaShimmer Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/17e43f373_HarmonyGold-HDE.jpg' },
    { id: 'butterfly', name: 'Butterfly', type: 'AquaShimmer Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/87c77b05c_Butterfly.jpg' },
    { id: 'esagono', name: 'Esagono', type: 'AquaShimmer Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ee71f898c_Esagono.jpg' },
    { id: 'carnival', name: 'Carnival', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/70a73121b_Carnival.jpg' },
    { id: 'canterbury', name: 'Canterbury', type: 'HD Antigua', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2a6e31a2f_Canterbury.jpg' },
    { id: 'hd-antigua', name: 'HD Antigua', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9f5ffd872_HDAntigua.jpg' },
    { id: 'gladstone', name: 'Gladstone', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/372ff9641_Gladstone.jpg' }
  ],
  'standard-2026': [
    { id: 'bayview', name: 'Bayview', type: 'White Diffusion', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6ac94022c_BayviewWhiteDiffusion.jpg' },
    { id: 'blue-beach-pebble', name: 'Blue Beach Pebble', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/614046bbe_BlueBeachPebble.jpg' },
    { id: 'blue-maui', name: 'Blue Maui', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eec197b55_BlueMaui.jpg' },
    { id: 'blue-full', name: 'Blue', type: 'Solid Color', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6400ce633_Blue.jpg' },
    { id: 'carrara-marble', name: 'Carrara Marble', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d58df1741_CarraraMarble.jpg' },
    { id: 'celest', name: 'Celest', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/88e3a1acd_Celest.jpg' },
    { id: 'garden', name: 'Garden', type: 'HD Electric Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5e436a66a_Garden.jpg' },
    { id: 'grey-maui', name: 'Grey Maui', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/64299e12d_GreyMaui.jpg' },
    { id: 'greystone-river-white', name: 'Greystone River White', type: 'River White', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/adc395d2c_GreystoneRiverWhite.jpg' },
    { id: 'ocean-midnight', name: 'Ocean Midnight', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/85b38b0e6_OceanMidnight.jpg' },
    { id: 'oxford', name: 'Oxford', type: 'HD Electric', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2673c6e74_OXFORDHDELECTRIC.jpg' },
    { id: 'oyster-bay', name: 'Oyster Bay', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8c6d4504c_OysterBay.jpg' },
    { id: 'raleigh-blue', name: 'Raleigh Blue Beach Pebble', type: 'Beach Pebble', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/905903d39_RaleighBlueBeachPebble.jpg' },
    { id: 'raleigh-white', name: 'Raleigh White Beach Pebble', type: 'Beach Pebble', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1d01d84df_RaleighWhiteBeachPebble.jpg' },
    { id: 'river-white', name: 'River White', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d074ffe20_RiverWhite.jpg' },
    { id: 'sandstone', name: 'Sandstone', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/79b09c738_Sandstone.jpg' },
    { id: 'sapphire', name: 'Sapphire', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ced10acfa_Sapphire.jpg' },
    { id: 'summer-river-white', name: 'Summer River White', type: 'River White', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/944f12e89_SummerRiverWhite.jpg' },
    { id: 'sunburst', name: 'Sunburst', type: 'Oyster Bay', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e701e698_SunburstOysterBay.jpg' },
    { id: 'tahoe', name: 'Tahoe', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1bfb6474e_Tahoe.jpg' },
    { id: 'white-beach-pebble', name: 'White Beach Pebble', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/52269d28b_WhiteBeachPebble.jpg' },
    { id: 'white-diffusion', name: 'White Diffusion', type: 'Full Print', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4d88ef239_WhiteDiffusion.jpg' }
  ],
  'solids-2026': [
    { id: 'white-full', name: 'White', type: 'Solid Color', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1db999e1b_White.jpg' }
  ]
};

const beadColors = [
  { id: 'blue', name: 'Blue', color: '#1e3a8a' },
  { id: 'light-blue', name: 'Light Blue', color: '#0ea5e9' },
  { id: 'gray', name: 'Gray', color: '#64748b' },
  { id: 'tan', name: 'Tan', color: '#d97706' },
  { id: 'white', name: 'White', color: '#f1f5f9' }
];

const safetyCoverColors = [
  { id: 'black-mesh', name: 'Black Mesh', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c4494b8d4_BlackMesh.png' },
  { id: 'blue-mesh', name: 'Blue Mesh', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bd76c5987_BlueMesh.png' },
  { id: 'green-mesh', name: 'Green Mesh', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/031b3bbe7_GreenMesh.png' },
  { id: 'grey-mesh', name: 'Grey Mesh', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/09d3933b4_GreyMesh.png' },
  { id: 'taupe-mesh', name: 'Taupe Mesh', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f3d20276_TaupeMesh.png' }
];

export default function PatternSelector({ selectedCollection, selectedPattern, selectedBead, onSelectionChange, productType }) {
  const currentPatterns = patterns[selectedCollection] || patterns['platinum-plus-2026'];
  const currentCollection = collections.find(c => c.id === selectedCollection);

  // Show safety cover colors for safety covers
  if (productType === 'safety-cover') {
    return (
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Select Safety Cover Color</h2>
          <p className="text-slate-600">Choose from our premium mesh color options.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {safetyCoverColors.map((color) => (
            <motion.button
              key={color.id}
              onClick={() => onSelectionChange('pattern', color.id)}
              className={`relative rounded-xl overflow-hidden group ${
                selectedPattern === color.id ? 'ring-4 ring-cyan-500' : 'ring-1 ring-slate-200'
              }`}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-medium text-sm text-center">{color.name}</div>
                </div>

                {selectedPattern === color.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-cyan-50 rounded-xl p-6">
          <h4 className="font-semibold text-cyan-900 mb-3">Safety Cover Features</h4>
          <ul className="space-y-2 text-sm text-cyan-700">
            <li>• ASTM F1346-91 Certified for safety compliance</li>
            <li>• Up to 30-year warranty coverage</li>
            <li>• Mesh fabric allows water drainage while keeping debris out</li>
            <li>• Custom-fit to your pool shape and size</li>
            <li>• UV-resistant and weatherproof materials</li>
            <li>• Professional installation recommended</li>
          </ul>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-cyan-900">2026 {currentCollection?.name}</h4>
          <span className="inline-block px-3 py-1 bg-cyan-600 text-white text-xs font-semibold rounded-full">{currentCollection?.badge}</span>
        </div>
        <p className="text-sm text-cyan-800 mb-3">
          {selectedCollection === 'platinum-plus-2026' 
            ? 'Premium patterns featuring AquaShimmer technology for enhanced depth and shimmer effects. Perfect for luxury pools.'
            : selectedCollection === 'standard-2026'
            ? 'Curated designs with HD printing and various finishes for superior clarity and durability.'
            : 'Classic solid color options for timeless elegance and simplicity.'}
        </p>
        <ul className="space-y-1 text-sm text-cyan-700">
          <li>• 25-Season Warranty on all patterns</li>
          <li>• 30mil Cold Crack-resistant Film</li>
          <li>• 100% Anti-bacterial Virgin Resin</li>
          <li>• UV and Chemical-resistant Aqua Finish topcoat</li>
          <li>• Non-slip textured vinyl available for Steps, Benches & Sundecks</li>
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