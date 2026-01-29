import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Ruler, Info, ArrowLeftRight, ArrowUpDown, Waves, Droplets, Palette } from 'lucide-react';
import Pool3DViewer from './Pool3DViewer';

const POOL_PATTERNS = [
  {
    id: 'terrazzo',
    name: 'Dark Terrazzo',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/cfe990211_Screenshot2026-01-29at54358AM.png'
  },
  {
    id: 'hexagon',
    name: 'Hexagon Blue',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f6c8b188b_image.png'
  },
  {
    id: 'wave',
    name: 'Wave Swirl',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f298ce101_image.png'
  },
  {
    id: 'speckle',
    name: 'Cosmic Speckle',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/82d082712_image.png'
  },
  {
    id: 'mosaic',
    name: 'Broken Tile',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/87b3e198e_Screenshot2026-01-29at54533AM.png'
  },
  {
    id: 'finespeckle',
    name: 'Fine Speckle',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b3d10361e_image.png'
  },
  {
    id: 'lattice',
    name: 'Lattice',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a2fe6a2d3_image.png'
  },
  {
    id: 'marble',
    name: 'Blue Marble',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e0e869c0a_image.png'
  },
  {
    id: 'ripple',
    name: 'Water Ripple',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e0f408195_image.png'
  },
  {
    id: 'granite',
    name: 'Granite',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3e9bd7341_image.png'
  },
  {
    id: 'reflection1',
    name: 'Ocean Depth',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1d65a5131_image.png'
  },
  {
    id: 'reflection2',
    name: 'Pool Reflection',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/48f19ddcb_image.png'
  }
];

export default function PoolDimensions({ dimensions, onDimensionsChange, selectedShape }) {
  const [unit, setUnit] = useState('feet');
  const [selectedPattern, setSelectedPattern] = useState(POOL_PATTERNS[0].id);

  const handleChange = (field, value) => {
    onDimensionsChange({ ...dimensions, [field]: value });
  };

  const shapeDisplay = selectedShape ? selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1) : 'Pool';

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent [-webkit-text-stroke:2px_rgba(6,182,212,0.3)] [text-stroke:2px_rgba(6,182,212,0.3)]" style={{WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px rgba(6,182,212,0.3)'}}>
            Enter your pool dimensions
          </span>
        </h2>
        <p className="text-slate-600">Provide accurate measurements for a perfect fit.</p>
      </div>

      {/* Depth & Water Level Display Above Pool */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="w-5 h-5 text-cyan-600" />
            <span className="text-sm font-medium text-slate-700">Shallow Depth</span>
          </div>
          <div className="text-2xl font-bold text-cyan-600">{dimensions.shallowDepth || 3} {unit}</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Deep End Depth</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{dimensions.deepDepth || 8} {unit}</div>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-cyan-600" />
            <span className="text-sm font-medium text-slate-700">Water Level</span>
          </div>
          <div className="text-2xl font-bold text-cyan-600">{dimensions.waterLevel || 90}%</div>
        </div>
      </div>

      {/* 3D Preview - Full Width */}
      <div className="mb-8">
        <div className="mb-4 text-center">
          <div className="text-slate-400 text-sm mb-1">{shapeDisplay} Pool</div>
          <div className="text-white text-lg font-medium">3D Interactive Preview</div>
        </div>
        
        {/* Three.js 3D Viewer */}
        <div className="min-h-[500px] relative">
          <Pool3DViewer 
            shape={selectedShape} 
            dimensions={dimensions}
            unit={unit}
            pattern={selectedPattern}
          />
        </div>

        {/* Unit Toggle */}
        <div className="flex gap-2 justify-center mt-6">
          <button
            onClick={() => setUnit('feet')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              unit === 'feet' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Feet
          </button>
          <button
            onClick={() => setUnit('meters')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              unit === 'meters' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Meters
          </button>
        </div>
      </div>

      {/* Pattern Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-cyan-600 mb-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold">Pool Liner Pattern</div>
            <div className="text-sm text-slate-600">Choose your interior finish</div>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-3">
          {POOL_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setSelectedPattern(pattern.id)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedPattern === pattern.id 
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/30' 
                  : 'border-slate-200 hover:border-cyan-300'
              }`}
            >
              <img 
                src={pattern.image} 
                alt={pattern.name}
                className="w-full aspect-square object-cover"
              />
              <div className={`absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/70 to-transparent ${
                selectedPattern === pattern.id ? 'from-cyan-600/90' : ''
              }`}>
                <span className="text-white text-xs font-medium leading-tight">{pattern.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions Form */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-cyan-600 mb-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold">Pool Dimensions</div>
            <div className="text-sm text-slate-600">Enter measurements in {unit}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-semibold">Length (A)</Label>
              <span className="text-lg font-bold text-cyan-600">{dimensions.length || 20} {unit}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
              <Slider
                value={[dimensions.length || 20]}
                onValueChange={(value) => handleChange('length', value[0])}
                min={10}
                max={50}
                step={0.5}
                className="flex-1 h-6"
              />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 px-14">
              <span>10</span>
              <span>50 {unit}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-semibold">Width (B)</Label>
              <span className="text-lg font-bold text-cyan-600">{dimensions.width || 10} {unit}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <ArrowUpDown className="w-6 h-6 text-white" />
              </div>
              <Slider
                value={[dimensions.width || 10]}
                onValueChange={(value) => handleChange('width', value[0])}
                min={5}
                max={30}
                step={0.5}
                className="flex-1 h-6"
              />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <ArrowUpDown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 px-14">
              <span>5</span>
              <span>30 {unit}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 text-slate-700 mb-4">
            <Ruler className="w-4 h-4" />
            <span className="font-medium">Depth & Water Level Controls</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label className="text-base font-semibold">Shallow End Depth</Label>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <Slider
                  value={[dimensions.shallowDepth || 3]}
                  onValueChange={(value) => handleChange('shallowDepth', value[0])}
                  min={2}
                  max={6}
                  step={0.5}
                  className="flex-1 h-6"
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2 px-14">
                <span>2</span>
                <span>6 {unit}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Label className="text-base font-semibold">Deep End Depth</Label>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <Slider
                  value={[dimensions.deepDepth || 8]}
                  onValueChange={(value) => handleChange('deepDepth', value[0])}
                  min={4}
                  max={12}
                  step={0.5}
                  className="flex-1 h-6"
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2 px-14">
                <span>4</span>
                <span>12 {unit}</span>
              </div>
            </div>

            <div className="col-span-2">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-base font-semibold">Water Level</Label>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <Slider
                  value={[dimensions.waterLevel || 90]}
                  onValueChange={(value) => handleChange('waterLevel', value[0])}
                  min={50}
                  max={100}
                  step={5}
                  className="flex-1 h-6"
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2 px-14">
                <span>Low (50%)</span>
                <span>Medium (75%)</span>
                <span>High (100%)</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Typical water level is 85-95% of pool depth</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>Measuring Tip:</strong> For the most accurate fit, measure from the inside edge of the pool at water level. 
            If you need help measuring, <a href="#" className="underline">download our measurement guide</a> or contact our team.
          </div>
        </div>
      </div>
    </div>
  );
}