import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
  {
    id: 'steps',
    name: 'Steps',
    description: 'Built-in pool steps',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b5f0bfbe7_image.png'
  },
  {
    id: 'ladder',
    name: 'Ladder',
    description: 'Pool ladder',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/90729263a_image.png'
  },
  {
    id: 'diving-board',
    name: 'Diving Board',
    description: 'Diving board or base',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e2474ea05_image.png'
  },
  {
    id: 'slide',
    name: 'Slide',
    description: 'Pool slide',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/24dbe9057_image.png'
  },
  {
    id: 'spa',
    name: 'Attached Spa',
    description: 'Spa or hot tub',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7a56d6534_image.png'
  },
  {
    id: 'waterfall',
    name: 'Waterfall',
    description: 'Water feature or waterfall',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6ebab1118_image.png'
  }
];

export default function PoolFeatures({ selectedFeatures, onToggleFeature }) {
  const isSelected = (featureId) => selectedFeatures.includes(featureId);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Select your pool features</h2>
        <p className="text-slate-600">Let us know about any special features on your pool.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <motion.button
            key={feature.id}
            onClick={() => onToggleFeature(feature.id)}
            className={`relative rounded-xl overflow-hidden group ${
              isSelected(feature.id) ? 'ring-4 ring-cyan-500' : ''
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={feature.image}
                alt={feature.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-white font-semibold mb-1">{feature.name}</div>
                  <div className="text-slate-300 text-sm">{feature.description}</div>
                </div>
                {isSelected(feature.id) && (
                  <div className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {!isSelected(feature.id) && (
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}