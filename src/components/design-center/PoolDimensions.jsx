import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ruler, Info } from 'lucide-react';
import Pool3DViewer from './Pool3DViewer';

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

      {/* 3D Preview - Full Width */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8">
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
            <span className="font-medium">Depth & Water Level</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
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
          <div>
            <Label htmlFor="waterLevel">Water Level (% of depth)</Label>
            <Input
              id="waterLevel"
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 90"
              value={dimensions.waterLevel || ''}
              onChange={(e) => handleChange('waterLevel', e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-slate-500 mt-1">Typical water level is 85-95% of pool depth</p>
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