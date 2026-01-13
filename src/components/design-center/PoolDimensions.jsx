import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ruler, Info } from 'lucide-react';

export default function PoolDimensions({ dimensions, onDimensionsChange, selectedShape }) {
  const [unit, setUnit] = useState('feet');

  const handleChange = (field, value) => {
    onDimensionsChange({ ...dimensions, [field]: value });
  };

  const shapeDisplay = selectedShape ? selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1) : 'Pool';

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Enter your pool dimensions</h2>
        <p className="text-slate-600">Provide accurate measurements for a perfect fit.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 3D Preview */}
        <div className="bg-slate-900 rounded-2xl p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-slate-400 text-sm mb-2">{shapeDisplay} Pool</div>
              <div className="text-white text-lg">3D preview with dimensions</div>
            </div>
            
            {/* Simple 3D representation */}
            <div className="relative w-64 h-64 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Shadow */}
                <ellipse cx="100" cy="180" rx="70" ry="15" fill="#1e293b" opacity="0.3"/>
                
                {/* Pool body */}
                <defs>
                  <linearGradient id="poolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#0891b2', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                
                {/* 3D Pool */}
                <path d="M 40,80 L 160,80 L 160,95 L 155,145 L 45,145 L 40,95 Z" fill="url(#poolGrad)"/>
                <ellipse cx="100" cy="80" rx="60" ry="20" fill="#22d3ee"/>
                
                {/* Water layers */}
                <ellipse cx="100" cy="95" rx="58" ry="18" fill="#0891b2" opacity="0.3"/>
                <ellipse cx="100" cy="110" rx="56" ry="16" fill="#0891b2" opacity="0.3"/>
                <ellipse cx="100" cy="125" rx="54" ry="14" fill="#0891b2" opacity="0.3"/>
                
                {/* Dimension lines */}
                <line x1="25" y1="70" x2="175" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="25" y1="70" x2="25" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="175" y1="70" x2="175" y2="75" stroke="#94a3b8" strokeWidth="1"/>
                
                <line x1="185" y1="75" x2="185" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="185" y1="75" x2="180" y1="75" stroke="#94a3b8" strokeWidth="1"/>
                <line x1="185" y1="150" x2="180" y2="150" stroke="#94a3b8" strokeWidth="1"/>
              </svg>
            </div>

            {/* Unit Toggle */}
            <div className="flex gap-2 justify-center mt-6">
              <button
                onClick={() => setUnit('feet')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unit === 'feet' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Feet
              </button>
              <button
                onClick={() => setUnit('meters')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unit === 'meters' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Meters
              </button>
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="length">Length (A)</Label>
              <Input
                id="length"
                type="number"
                placeholder="e.g. 32"
                value={dimensions.length || ''}
                onChange={(e) => handleChange('length', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="width">Width (B)</Label>
              <Input
                id="width"
                type="number"
                placeholder="e.g. 16"
                value={dimensions.width || ''}
                onChange={(e) => handleChange('width', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <Ruler className="w-4 h-4" />
              <span className="font-medium">Depth Information</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shallow">Shallow End</Label>
                <Input
                  id="shallow"
                  type="number"
                  placeholder="e.g. 3.5"
                  value={dimensions.shallowDepth || ''}
                  onChange={(e) => handleChange('shallowDepth', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="deep">Deep End</Label>
                <Input
                  id="deep"
                  type="number"
                  placeholder="e.g. 8"
                  value={dimensions.deepDepth || ''}
                  onChange={(e) => handleChange('deepDepth', e.target.value)}
                  className="mt-1"
                />
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
    </div>
  );
}