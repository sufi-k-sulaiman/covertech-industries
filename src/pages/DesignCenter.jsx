import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import SEOHead from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

// Pattern data with images from ProductDetails
const PATTERNS = [
  { name: "Butterfly", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4f5b14b1f_Butterfly.jpg", tier: "platinum-plus" },
  { name: "Esagono", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1c3b1ba72_Esagono.jpg", tier: "platinum-plus" },
  { name: "Harmony Gold HDE", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b24218ff9_HarmonyGold-HDE.jpg", tier: "platinum-plus" },
  { name: "Twilight", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/867ae4129_Twilight.jpg", tier: "platinum-plus" },
  { name: "Carnival", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/91640be38_Carnival.jpg", tier: "platinum" },
  { name: "Canterbury", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1235fa641_Canterbury.jpg", tier: "platinum" },
  { name: "HD Antigua", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b574d1bd_HDAntigua.jpg", tier: "platinum" },
  { name: "Gladstone", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e7ef00922_Gladstone.jpg", tier: "platinum" },
  { name: "Celest", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/82ef3daba_Celest.jpg", tier: "platinum" },
  { name: "Tahoe", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/370383aaa_Tahoe.jpg", tier: "platinum" },
  { name: "Garden", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3580d7287_Garden.jpg", tier: "platinum" },
  { name: "Sapphire", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9cefde4f9_Sapphire.jpg", tier: "platinum" },
  { name: "Sunburst Oyster Bay", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6bc0f75ad_SunburstOysterBay.jpg", tier: "platinum" },
  { name: "Oyster Bay", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d6fd36b0a_OysterBay.jpg", tier: "platinum" },
  { name: "Oxford HD Electric", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/86cfd7e9a_OXFORDHDELECTRIC.jpg", tier: "platinum" },
  { name: "HD Electric", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/07fc1b793_HDELECTRIC.jpg", tier: "platinum" },
  { name: "Bayview White Diffusion", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5a67f1612_BayviewWhiteDiffusion.jpg", tier: "platinum" },
  { name: "White Diffusion", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b2b3f0178_WhiteDiffusion.jpg", tier: "platinum" },
  { name: "Grey Maui", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d73c2c8d9_GreyMaui.jpg", tier: "platinum" },
  { name: "Blue Maui", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ac2618ef1_BlueMaui.jpg", tier: "platinum" },
  { name: "Greystone River White", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/97c559cf9_GreystoneRiverWhite.jpg", tier: "platinum" },
  { name: "River White", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8a1e62d22_RiverWhite.jpg", tier: "platinum" },
  { name: "Summer River White", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/296e83210_SummerRiverWhite.jpg", tier: "platinum" },
  { name: "Ocean Midnight", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf54bc3ba_OceanMidnight.jpg", tier: "platinum" },
  { name: "Carrara Marble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e59feeea_CarraraMarble.jpg", tier: "platinum" },
  { name: "Raleigh Blue Beach Pebble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0fdb87fd3_RaleighBlueBeachPebble.jpg", tier: "platinum" },
  { name: "Blue Beach Pebble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/49bca1208_BlueBeachPebble.jpg", tier: "platinum" },
  { name: "Sandstone", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a7f229630_Sandstone.jpg", tier: "platinum" },
  { name: "Raleigh White Beach Pebble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a149dfe63_RaleighWhiteBeachPebble.jpg", tier: "platinum" },
  { name: "White Beach Pebble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3d44fed9a_WhiteBeachPebble.jpg", tier: "platinum" },
  { name: "White", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf175feaa_White.jpg", tier: "platinum" },
  { name: "Blue", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/415691248_Blue.jpg", tier: "platinum" },
];

const POOL_TYPES = [
  { id: 'rectangular', label: 'Rectangle', description: 'Classic lap pool' },
  { id: 'oval', label: 'Oval', description: 'Elegant curves' },
  { id: 'round', label: 'Round', description: 'Compact circle' },
  { id: 'grecian', label: 'Grecian', description: 'Cut corners style' },
  { id: 'roman', label: 'Roman', description: 'Rounded ends' },
  { id: 'lazy-l', label: 'Lazy L', description: 'Angled design' },
  { id: 'true-l', label: 'True L', description: 'Right angle' },
  { id: 'kidney', label: 'Kidney', description: 'Organic shape' },
  { id: 'freeform', label: 'Freeform', description: 'Natural curves' },
];

const PoolShapeIcon = ({ type, className = "w-16 h-16" }) => {
  const baseClass = className + " text-cyan-500";
  switch(type) {
    case 'rectangular':
      return <svg viewBox="0 0 100 80" className={baseClass} fill="currentColor"><rect x="10" y="15" width="80" height="50" rx="4"/></svg>;
    case 'oval':
      return <svg viewBox="0 0 100 80" className={baseClass} fill="currentColor"><ellipse cx="50" cy="40" rx="40" ry="28"/></svg>;
    case 'round':
      return <svg viewBox="0 0 100 100" className={baseClass} fill="currentColor"><circle cx="50" cy="50" r="35"/></svg>;
    case 'grecian':
      return <svg viewBox="0 0 100 80" className={baseClass} fill="currentColor"><path d="M 20 40 L 20 20 Q 20 15 25 15 L 75 15 Q 80 15 80 20 L 80 40 Q 80 65 50 65 Q 20 65 20 40" fillRule="evenodd"/></svg>;
    case 'roman':
      return <svg viewBox="0 0 100 70" className={baseClass} fill="currentColor"><path d="M 15 35 Q 15 20 30 15 L 70 15 Q 85 20 85 35 Q 85 55 50 60 Q 15 55 15 35" fillRule="evenodd"/></svg>;
    case 'lazy-l':
      return <svg viewBox="0 0 100 100" className={baseClass} fill="currentColor"><path d="M 20 20 L 20 70 L 70 70 L 70 40 L 40 40 L 40 20 Z" fillRule="evenodd"/></svg>;
    case 'true-l':
      return <svg viewBox="0 0 100 100" className={baseClass} fill="currentColor"><path d="M 25 25 L 25 75 L 75 75 L 75 50 L 50 50 L 50 25 Z" fillRule="evenodd"/></svg>;
    case 'kidney':
      return <svg viewBox="0 0 100 80" className={baseClass} fill="currentColor"><path d="M 30 25 Q 20 25 20 40 Q 20 60 45 65 Q 70 60 75 40 Q 75 25 55 25 Q 50 32 45 32 Q 40 32 30 25" fillRule="evenodd"/></svg>;
    case 'freeform':
      return <svg viewBox="0 0 100 80" className={baseClass} fill="currentColor"><path d="M 25 35 Q 15 25 30 15 Q 50 10 65 18 Q 80 25 80 40 Q 80 60 60 68 Q 35 70 20 55 Q 10 45 25 35" fillRule="evenodd"/></svg>;
    default:
      return null;
  }
};

export default function DesignCenter() {
  const [step, setStep] = useState(1); // 1: Pattern, 2: Pool Type, 3: AI Preview, 4: Contact, 5: Success
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedPoolType, setSelectedPoolType] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationTime, setGenerationTime] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    poolLocation: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  // Timer for generation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      setGenerationTime(0);
      interval = setInterval(() => {
        setGenerationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const generatePoolVisualizations = async () => {
    if (!selectedPattern || !selectedPoolType) return;
    
    setIsGenerating(true);
    try {
      // Generate 2 different views of the pool
      const prompts = [
        `A stunning in-ground ${selectedPoolType.label} swimming pool with ${selectedPattern} pattern vinyl liner, empty dry view from above showing the full design, professional architectural photography, high quality`,
        `A luxurious in-ground ${selectedPoolType.label} swimming pool with ${selectedPattern} pattern liner filled with crystal clear water, resort-style backyard, professional installation, sunny day`,
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
      if (images.length > 0) {
        setStep(3);
      } else {
        alert('Image generation failed. Please try again.');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Error generating images. Please try again.');
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {PATTERNS.map((pattern) => (
                    <motion.button
                      key={pattern.name}
                      onClick={() => {
                        setSelectedPattern(pattern.name);
                        setStep(2);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-xl border-2 transition-all overflow-hidden group relative ${
                        selectedPattern === pattern.name
                          ? 'border-cyan-500 shadow-lg'
                          : 'border-slate-200 hover:border-cyan-300'
                      }`}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                        <img
                          src={pattern.image}
                          alt={pattern.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity ${selectedPattern === pattern.name ? 'opacity-100' : ''}`}>
                        <div className="text-white text-center px-2">
                          <div className="text-sm font-semibold mb-1">{pattern.name}</div>
                          <div className="text-xs text-cyan-300 capitalize">{pattern.tier.replace('-', ' ')}</div>
                        </div>
                        {selectedPattern === pattern.name && (
                          <Check className="w-5 h-5 text-cyan-400 mt-2 absolute top-2 right-2" />
                        )}
                      </div>
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                  {POOL_TYPES.map((poolType) => (
                    <motion.button
                      key={poolType.id}
                      onClick={() => setSelectedPoolType(poolType)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-xl border-2 transition-all text-center flex flex-col items-center gap-3 ${
                        selectedPoolType?.id === poolType.id
                          ? 'border-cyan-500 bg-cyan-50 shadow-md'
                          : 'border-slate-200 hover:border-cyan-300 bg-white'
                      }`}
                    >
                      <PoolShapeIcon type={poolType.id} className="w-20 h-20" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{poolType.label}</div>
                        <div className="text-slate-500 text-xs">{poolType.description}</div>
                      </div>
                      {selectedPoolType?.id === poolType.id && (
                        <Check className="w-4 h-4 text-cyan-500 absolute top-2 right-2" />
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
                        Generating... {generationTime}s
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

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {generatedImages.length > 0 ? (
                    generatedImages.map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-lg"
                      >
                        <img src={image} alt={`Pool preview ${idx + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-xl">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-500 mb-4" />
                      <p className="text-slate-600 mb-2">Generating your pool visualization...</p>
                      <p className="text-sm text-slate-500">Elapsed: {generationTime}s</p>
                      {generationTime > 60 && (
                        <p className="text-sm text-amber-600 mt-2">Generation is taking longer than expected. Please wait...</p>
                      )}
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