import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import SEOHead from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

// Pattern data from ProductDetails
const PATTERNS = [
  { name: "Butterfly", tier: "platinum-plus" },
  { name: "Esagono", tier: "platinum-plus" },
  { name: "Harmony Gold HDE", tier: "platinum-plus" },
  { name: "Twilight", tier: "platinum-plus" },
  { name: "Carnival", tier: "platinum" },
  { name: "Canterbury", tier: "platinum" },
  { name: "HD Antigua", tier: "platinum" },
  { name: "Gladstone", tier: "platinum" },
  { name: "Celest", tier: "platinum" },
  { name: "Tahoe", tier: "platinum" },
  { name: "Garden", tier: "platinum" },
  { name: "Sapphire", tier: "platinum" },
  { name: "Sunburst Oyster Bay", tier: "platinum" },
  { name: "Oyster Bay", tier: "platinum" },
  { name: "Oxford HD Electric", tier: "platinum" },
  { name: "HD Electric", tier: "platinum" },
  { name: "Bayview White Diffusion", tier: "platinum" },
  { name: "White Diffusion", tier: "platinum" },
  { name: "Grey Maui", tier: "platinum" },
  { name: "Blue Maui", tier: "platinum" },
  { name: "Greystone River White", tier: "platinum" },
  { name: "River White", tier: "platinum" },
  { name: "Summer River White", tier: "platinum" },
  { name: "Ocean Midnight", tier: "platinum" },
  { name: "Carrara Marble", tier: "platinum" },
  { name: "Raleigh Blue Beach Pebble", tier: "platinum" },
  { name: "Blue Beach Pebble", tier: "platinum" },
  { name: "Sandstone", tier: "platinum" },
  { name: "Raleigh White Beach Pebble", tier: "platinum" },
  { name: "White Beach Pebble", tier: "platinum" },
  { name: "White", tier: "platinum" },
  { name: "Blue", tier: "platinum" },
];

const POOL_TYPES = [
  { id: 'rectangular', label: 'Rectangular', description: 'Classic rectangular shape' },
  { id: 'oval', label: 'Oval', description: 'Elegant curved design' },
  { id: 'kidney', label: 'Kidney', description: 'Organic kidney shape' },
  { id: 'freeform', label: 'Free-Form', description: 'Custom shape' },
];

export default function DesignCenter() {
  const [step, setStep] = useState(1); // 1: Pattern, 2: Pool Type, 3: AI Preview, 4: Contact, 5: Success
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedPoolType, setSelectedPoolType] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    poolLocation: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  const generatePoolVisualizations = async () => {
    if (!selectedPattern || !selectedPoolType) return;
    
    setIsGenerating(true);
    try {
      // Generate 3 different views of the pool
      const prompts = [
        `A beautiful in-ground ${selectedPoolType.label} swimming pool with ${selectedPattern} pattern vinyl liner, dry pool view from above, realistic daylight, professional photography`,
        `An elegant in-ground ${selectedPoolType.label} swimming pool with ${selectedPattern} pattern liner filled with water, sparkling daylight, resort style`,
        `A luxurious backyard ${selectedPoolType.label} in-ground pool with ${selectedPattern} pattern vinyl liner, evening ambiance with landscaping, professional installation`,
      ];

      const images = [];
      for (const prompt of prompts) {
        try {
          const response = await base44.integrations.Core.GenerateImage({
            prompt
          });
          if (response?.url) {
            images.push(response.url);
          }
        } catch (err) {
          console.error('Image generation error:', err);
        }
      }

      setGeneratedImages(images);
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitQuote = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      alert('Please fill in your name and email');
      return;
    }

    try {
      const quoteIdGenerated = `CT${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      await base44.entities.DesignCenterSubmission.create({
        quote_id: quoteIdGenerated,
        product_type: 'in-ground-liners',
        pool_shape: selectedPoolType.label,
        features: [selectedPattern],
        pattern_selection: { pattern: selectedPattern },
        contact_info: contactInfo
      });

      setQuoteId(quoteIdGenerated);
      setSubmitted(true);
      setStep(5);
    } catch (error) {
      alert('Error submitting quote. Please try again.');
    }
  };

  return (
    <>
      <SEOHead
        title="Design Center - Custom In-Ground Pool Liners | Covertech"
        description="Design your custom in-ground pool liner. Browse patterns, visualize your pool, and get an instant quote."
        keywords={['design center', 'pool liner visualizer', 'custom pool liners', 'pool design', 'quotes']}
      />

      <PageHero
        title="Design Your Perfect"
        titleAccent="In-Ground Pool"
        description="Browse beautiful patterns, visualize your custom pool liner, and get an instant quote."
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Step 1: Pattern Selection */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                    <span>Step 1 of 4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Pattern</h2>
                  <p className="text-slate-600">Select from our collection of premium pool liner patterns</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                  {PATTERNS.map((pattern) => (
                    <motion.button
                      key={pattern.name}
                      onClick={() => setSelectedPattern(pattern.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedPattern === pattern.name
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-cyan-300 bg-white'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-900 mb-1">{pattern.name}</div>
                      <div className="text-xs text-slate-500 capitalize">{pattern.tier.replace('-', ' ')}</div>
                      {selectedPattern === pattern.name && (
                        <Check className="w-5 h-5 text-cyan-500 mt-2" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedPattern}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2 disabled:opacity-50"
                  >
                    Next: Select Pool Type
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Pool Type Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                    <span>Step 2 of 4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Select Pool Type</h2>
                  <p className="text-slate-600">Choose your pool shape - we'll visualize it with your pattern</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {POOL_TYPES.map((poolType) => (
                    <motion.button
                      key={poolType.id}
                      onClick={() => setSelectedPoolType(poolType)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedPoolType?.id === poolType.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-cyan-300 bg-white'
                      }`}
                    >
                      <div className="text-lg font-semibold text-slate-900 mb-1">{poolType.label}</div>
                      <div className="text-slate-600 text-sm mb-3">{poolType.description}</div>
                      {selectedPoolType?.id === poolType.id && (
                        <Check className="w-5 h-5 text-cyan-500" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={generatePoolVisualizations}
                    disabled={!selectedPoolType || isGenerating}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Preview...
                      </>
                    ) : (
                      <>
                        Generate AI Preview
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: AI-Generated Preview */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                    <span>Step 3 of 4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Pool Visualization</h2>
                  <p className="text-slate-600">AI-generated preview of your {selectedPoolType?.label} pool with {selectedPattern} pattern</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {generatedImages.length > 0 ? (
                    generatedImages.map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl overflow-hidden aspect-square bg-slate-100"
                      >
                        <img src={image} alt={`Pool preview ${idx + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-500 mb-4" />
                      <p className="text-slate-600">Generating your pool visualization...</p>
                    </div>
                  )}
                </div>

                <div className="bg-cyan-50 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-cyan-600 mt-1" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Pattern: {selectedPattern}</h4>
                      <p className="text-slate-600 text-sm mb-2">Pool Type: {selectedPoolType?.label}</p>
                      <p className="text-slate-600 text-sm">Ready to proceed with your quote? Share your contact information and our team will get back to you with custom specifications and pricing.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                    <span>Step 4 of 4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Get Your Quote</h2>
                  <p className="text-slate-600">Share your contact information so we can send you a custom quote</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Pool Location / City</label>
                      <input
                        type="text"
                        value={contactInfo.poolLocation}
                        onChange={(e) => setContactInfo({ ...contactInfo, poolLocation: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                        placeholder="Toronto, ON"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(3)}
                    variant="outline"
                    className="gap-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitQuote}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8"
                  >
                    Submit Quote Request
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Quote Request Submitted!</h2>
                <p className="text-slate-600 text-lg mb-6">Thank you, {contactInfo.name}!</p>
                
                <div className="bg-cyan-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                  <p className="text-sm text-slate-600 mb-2">Your Quote ID:</p>
                  <p className="text-2xl font-bold text-cyan-600 mb-4">{quoteId}</p>
                  <p className="text-sm text-slate-600">We'll review your design and send a custom quote to {contactInfo.email} within 24 hours.</p>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                  <Button
                    onClick={() => window.location.href = '/'}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    Back to Home
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/Contact'}
                    variant="outline"
                  >
                    Contact Us for Details
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}