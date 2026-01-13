import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
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

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Length (A)</Label>
              <span className="text-sm font-semibold text-cyan-600">{dimensions.length || 20} {unit}</span>
            </div>
            <Slider
              value={[dimensions.length || 20]}
              onValueChange={(value) => handleChange('length', value[0])}
              min={10}
              max={50}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>10</span>
              <span>50 {unit}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Width (B)</Label>
              <span className="text-sm font-semibold text-cyan-600">{dimensions.width || 10} {unit}</span>
            </div>
            <Slider
              value={[dimensions.width || 10]}
              onValueChange={(value) => handleChange('width', value[0])}
              min={5}
              max={30}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5</span>
              <span>30 {unit}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 text-slate-700 mb-4">
            <Ruler className="w-4 h-4" />
            <span className="font-medium">Depth & Water Level</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Shallow End Depth</Label>
                <span className="text-sm font-semibold text-blue-600">{dimensions.shallowDepth || 3} {unit}</span>
              </div>
              <Slider
                value={[dimensions.shallowDepth || 3]}
                onValueChange={(value) => handleChange('shallowDepth', value[0])}
                min={2}
                max={6}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>2</span>
                <span>6 {unit}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Deep End Depth</Label>
                <span className="text-sm font-semibold text-blue-600">{dimensions.deepDepth || 8} {unit}</span>
              </div>
              <Slider
                value={[dimensions.deepDepth || 8]}
                onValueChange={(value) => handleChange('deepDepth', value[0])}
                min={4}
                max={12}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4</span>
                <span>12 {unit}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Water Level</Label>
                <span className="text-sm font-semibold text-cyan-600">{dimensions.waterLevel || 90}%</span>
              </div>
              <Slider
                value={[dimensions.waterLevel || 90]}
                onValueChange={(value) => handleChange('waterLevel', value[0])}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
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