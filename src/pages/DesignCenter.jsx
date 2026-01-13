import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Palette, ArrowRight, ArrowLeft, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const productTypes = [
  {
    id: "in-ground-liners",
    name: "In-Ground Liners",
    description: "Custom in-ground liners with wrinkle-free design and stunning patterns",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/d2bbfec37_image.png",
    features: ["Custom patterns", "UV resistant", "25-year warranty"]
  },
  {
    id: "safety-cover",
    name: "Safety Cover",
    description: "ASTM-certified mesh and solid covers for complete peace of mind",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/3bbe8095b_image.png",
    features: ["ASTM certified", "Child safe", "Custom fit"]
  },
  {
    id: "solar-blanket",
    name: "Solar Blanket",
    description: "Maximize heat retention and reduce energy costs naturally",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/08f9cb0ee_image.png",
    features: ["Heats water", "Reduces evaporation", "UV resistant"]
  },
  {
    id: "winter-cover",
    name: "Winter Cover",
    description: "Heavy-duty protection to keep your pool pristine through winter",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/442b73ecc_image.png",
    features: ["Heavy duty", "Debris protection", "Easy install"]
  }
];

const steps = [
  { num: 1, label: "Product Type" },
  { num: 2, label: "Pool Shape" },
  { num: 3, label: "Dimensions" },
  { num: 4, label: "Features" },
  { num: 5, label: "Customization" },
  { num: 6, label: "Your Info" },
  { num: 7, label: "Review" },
];

export default function DesignCenter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Design Center", url: "https://covertechind.com/design-center" }
  ]);

  return (
    <>
      <SEOHead
        title="Design Center - Custom Pool Product Designer"
        description="Design your custom vinyl pool liner, safety cover, solar blanket or winter cover. Get instant quotes tailored to your exact specifications. Free design consultation."
        keywords={["custom pool liner", "pool cover designer", "custom safety cover", "pool liner design tool", "Covertech design center"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Custom Design Studio"
        title="Create Your Perfect"
        titleAccent="Pool Product"
        description="Design custom vinyl liners, safety covers, and more. Get an instant quote tailored to your exact specifications."
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        minHeight="min-h-[50vh]"
      />

      {/* Design Tool */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.num} className="flex items-center">
                  <div className={`flex flex-col items-center ${currentStep >= step.num ? 'text-cyan-600' : 'text-slate-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep >= step.num 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
                    </div>
                    <span className="text-xs mt-2 whitespace-nowrap">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-1 ${currentStep > step.num ? 'bg-cyan-500' : 'bg-slate-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">What would you like to design?</h2>
                    <p className="text-slate-600">Choose from our premium selection of custom pool products, each crafted to your exact specifications.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {productTypes.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`group relative overflow-hidden rounded-2xl text-left transition-all ${
                          selectedProduct === product.id 
                            ? 'ring-2 ring-cyan-500 shadow-lg' 
                            : 'hover:shadow-lg'
                        }`}
                        whileHover={{ y: -4 }}
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                          
                          {selectedProduct === product.id && (
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                          <p className="text-slate-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {product.features.map((feature) => (
                              <span key={feature} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep > 1 && currentStep < 7 && (
                <motion.div
                  key={`step${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-6">
                    <Palette className="w-10 h-10 text-cyan-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Step {currentStep}: {steps[currentStep - 1].label}</h2>
                  <p className="text-slate-600 mb-8">This design tool is coming soon. For now, please contact us for a personalized quote.</p>
                  
                  <Link to={createPageUrl('Contact')}>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                      Request a Quote Instead
                    </Button>
                  </Link>
                </motion.div>
              )}

              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Review Your Design</h2>
                  <p className="text-slate-600 mb-8">Ready to submit your custom design for a quote.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-8 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
                disabled={currentStep === 1 && !selectedProduct}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
              >
                {currentStep === 7 ? 'Submit' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-8 flex items-start gap-3 bg-cyan-50 rounded-xl p-4">
            <Info className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-cyan-800">
              <strong>Need help?</strong> Our design specialists are available to assist you with measurements, pattern selection, and custom specifications. 
              <Link to={createPageUrl('Contact')} className="text-cyan-600 underline ml-1">Contact us</Link> or call 416.640.5590
            </div>
          </div>
        </div>
      </section>
    </>
  );
}