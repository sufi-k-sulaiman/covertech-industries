import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const inGroundDesigns = [
  {
    id: 'rectangular-elegant',
    name: 'Rectangular Elegant',
    category: 'Rectangular',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
    description: 'Classic rectangular design with clean lines and modern appeal'
  },
  {
    id: 'rectangular-luxury',
    name: 'Rectangular Luxury',
    category: 'Rectangular',
    image: 'https://images.unsplash.com/photo-1560085541-daf4ee36b26f?w=600&q=80',
    description: 'Premium rectangular pool with sophisticated styling'
  },
  {
    id: 'oval-resort',
    name: 'Oval Resort',
    category: 'Oval',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Curved oval design perfect for resort-style backyards'
  },
  {
    id: 'oval-family',
    name: 'Oval Family',
    category: 'Oval',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    description: 'Spacious oval pool ideal for families and gatherings'
  },
  {
    id: 'kidney-custom',
    name: 'Kidney Custom',
    category: 'Kidney-Shaped',
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=600&q=80',
    description: 'Artistic kidney shape with unique curved design'
  },
  {
    id: 'kidney-premium',
    name: 'Kidney Premium',
    category: 'Kidney-Shaped',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
    description: 'Luxury kidney-shaped design with custom features'
  },
  {
    id: 'freeform-artistic',
    name: 'Free-Form Artistic',
    category: 'Free-Form',
    image: 'https://images.unsplash.com/photo-1560085541-daf4ee36b26f?w=600&q=80',
    description: 'Unique free-form design for creative pool layouts'
  },
  {
    id: 'freeform-lagoon',
    name: 'Free-Form Lagoon',
    category: 'Free-Form',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Natural lagoon-style free-form pool'
  }
];

export default function InGroundGallery({ selectedDesign, onSelectDesign }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(inGroundDesigns.map(d => d.category))];
  
  const filteredDesigns = selectedCategory === 'All' 
    ? inGroundDesigns 
    : inGroundDesigns.filter(d => d.category === selectedCategory);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Select Your Pool Type</h2>
        <p className="text-slate-600">Choose from our collection of in-ground pool designs.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Design Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDesigns.map((design, index) => (
          <motion.button
            key={design.id}
            onClick={() => onSelectDesign(design.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className={`group relative overflow-hidden rounded-2xl text-left transition-all ${
              selectedDesign === design.id 
                ? 'ring-3 ring-cyan-500 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
          >
            {/* Image */}
            <div className="aspect-square relative overflow-hidden bg-slate-200">
              <img 
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

              {/* Selection Badge */}
              {selectedDesign === design.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white mb-1">{design.name}</h3>
              <p className="text-slate-200 text-xs line-clamp-2">{design.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}