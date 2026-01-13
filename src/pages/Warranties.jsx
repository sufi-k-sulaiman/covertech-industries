import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, CheckCircle, Shield, FileText, Download } from 'lucide-react';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const productTypes = [
  {
    id: 'vinyl-liner',
    name: 'Vinyl Liner',
    description: '25-Year Limited Warranty for In-Ground Vinyl Pool Liners',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/d2bbfec37_image.png',
    warranty: '25 Years',
    warrantyPdfs: [
      { name: '25-Season In-Ground Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/940bf589f_25SeasonIn-GroundLinerWarranty.pdf' },
      { name: '20-Season On-Ground Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5f9b4602_20SeasonOn-GroundLinerWarranty.pdf' },
      { name: '10-Season Above-Ground Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/94ddb6eba_10SeasonAbove-GroundLinerWarranty.pdf' }
    ]
  },
  {
    id: 'safety-cover',
    name: 'Safety Cover',
    description: 'Premium Safety Cover Warranty Registration',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/3bbe8095b_image.png',
    warranty: 'Up to 30 Years',
    warrantyPdfs: [
      { name: 'Safety Cover Warranty 2025', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9876ef1df_CVT-SafetyCoverWarranty-2025.pdf' }
    ]
  },
  {
    id: 'solar-blanket',
    name: 'Solar Blanket',
    description: 'Solar Cover Warranty - 3 to 7 Years',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/08f9cb0ee_image.png',
    warranty: '3-7 Years',
    warrantyPdfs: [
      { name: 'Solar Blanket Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/042934906_SolarWarranty-CVT-English.pdf' }
    ]
  },
  {
    id: 'winter-cover',
    name: 'Winter Cover',
    description: 'Winter Cover Warranty - 8 to 10 Years',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/442b73ecc_image.png',
    warranty: '8-10 Years',
    warrantyPdfs: [
      { name: 'Winter Cover Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2064be08f_WinterCoverWarranty-CVT-English.pdf' },
      { name: 'Beaded Winter Cover Warranty', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ea750810d_BeadedWinterCoverWarranty-CVT-English.pdf' }
    ]
  }
];

const steps = [
  { num: 1, label: 'Product Type' },
  { num: 2, label: 'Registration Details' },
  { num: 3, label: 'Review & Submit' }
];

export default function Warranties() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    product_type: '',
    full_name: '',
    email: '',
    phone: '',
    country: 'Canada',
    street_address: '',
    city: '',
    state_province: '',
    postal_code: '',
    serial_number: '',
    pool_size: '',
    pool_shape: '',
    pool_type: '',
    cover_shape: '',
    cover_type: '',
    warranty_years: '',
    installer_name: '',
    installer_type: '',
    dealer_purchased_from: '',
    purchase_date: '',
    installation_date: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.product_type !== '';
      case 2: return formData.full_name && formData.email && formData.phone && formData.dealer_purchased_from && formData.purchase_date;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await base44.entities.WarrantyRegistration.create(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Warranty Registration", url: "https://covertechind.com/warranties" }
  ]);

  if (submitted) {
    return (
      <>
        <SEOHead
          title="Warranty Registration - Success"
          description="Your warranty has been successfully registered with Covertech Industries."
          schema={breadcrumbSchema}
          />
          <PageHero
            badge="Warranty Registration"
            title="Registration"
            titleAccent="Complete"
            description="Your product warranty has been successfully registered"
            backgroundImage="https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=1920&q=80"
          minHeight="min-h-[50vh]"
        />
        <section className="py-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Registering!</h2>
            <p className="text-slate-600 mb-8">
              Your {productTypes.find(p => p.id === formData.product_type)?.name} warranty has been successfully registered. 
              You'll receive a confirmation email at <strong>{formData.email}</strong> with your warranty details.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-slate-700 mb-4">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Registration Details</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div><span className="font-medium">Product:</span> {productTypes.find(p => p.id === formData.product_type)?.name}</div>
                <div><span className="font-medium">Name:</span> {formData.full_name}</div>
                <div><span className="font-medium">Email:</span> {formData.email}</div>
                {formData.serial_number && <div><span className="font-medium">Serial Number:</span> {formData.serial_number}</div>}
              </div>
            </div>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="mr-4"
            >
              Register Another Product
            </Button>
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Warranty Registration - Register Your Product"
        description="Register your Covertech pool liner, safety cover, solar blanket, or winter cover warranty online. Quick and easy registration process."
        keywords={["warranty registration", "pool liner warranty", "safety cover warranty", "solar blanket warranty", "winter cover warranty"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Product Registration"
        title="Register Your"
        titleAccent="Warranty"
        description="Protect your investment by registering your Covertech product warranty online"
        backgroundImage="https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=1920&q=80"
        minHeight="min-h-[50vh]"
      />

      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
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
                      {currentStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
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
              {/* Step 1: Product Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Select Your Product</h2>
                    <p className="text-slate-600">Choose the product you want to register</p>
                  </div>

                  {/* Warranty Downloads Section */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Download Warranty Documents</h3>
                        <p className="text-sm text-slate-600">Review warranty details before registering</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {productTypes.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-cyan-600" />
                            <span className="font-semibold text-sm text-slate-900">{product.name}</span>
                          </div>
                          <div className="space-y-2">
                            {product.warrantyPdfs.map((pdf, idx) => (
                              <a
                                key={idx}
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 p-2 rounded-lg transition-colors"
                              >
                                <FileText className="w-4 h-4 flex-shrink-0" />
                                <span className="line-clamp-2">{pdf.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {productTypes.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => handleChange('product_type', product.id)}
                        className={`group relative overflow-hidden rounded-2xl text-left transition-all ${
                          formData.product_type === product.id 
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

                          {formData.product_type === product.id && (
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-cyan-400" />
                            <span className="text-xs text-cyan-300 font-semibold">{product.warranty}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                          <p className="text-slate-300 text-sm line-clamp-2">{product.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Registration Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Registration Details</h2>
                    <p className="text-slate-600">Complete all required information for your {productTypes.find(p => p.id === formData.product_type)?.name}</p>
                  </div>

                  {/* Warranty Documents */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Warranty Documents</h3>
                        <p className="text-sm text-slate-600">Review your {productTypes.find(p => p.id === formData.product_type)?.name} warranty details</p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {productTypes.find(p => p.id === formData.product_type)?.warrantyPdfs.map((pdf, idx) => (
                        <a
                          key={idx}
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-white hover:bg-cyan-50 border border-cyan-200 hover:border-cyan-300 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-cyan-600" />
                            <span className="font-medium text-slate-900">{pdf.name}</span>
                          </div>
                          <Download className="w-5 h-5 text-cyan-600 group-hover:translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Contact Information Section */}
                    <div className="border-b border-slate-200 pb-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                            placeholder="John Doe"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="john@example.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder="+1 (416) 555-0123"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="US">United States</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="street_address">Street Address</Label>
                          <Input
                            id="street_address"
                            value={formData.street_address}
                            onChange={(e) => handleChange('street_address', e.target.value)}
                            placeholder="123 Main St"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleChange('city', e.target.value)}
                              placeholder="Toronto"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state_province">State/Province</Label>
                            <Input
                              id="state_province"
                              value={formData.state_province}
                              onChange={(e) => handleChange('state_province', e.target.value)}
                              placeholder="ON"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="postal_code">Postal Code</Label>
                            <Input
                              id="postal_code"
                              value={formData.postal_code}
                              onChange={(e) => handleChange('postal_code', e.target.value)}
                              placeholder="M9W 5V8"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="border-b border-slate-200 pb-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Product Details</h3>
                      <div className="space-y-4">
                        {formData.product_type === 'vinyl-liner' && (
                          <>
                            <div>
                              <Label htmlFor="serial_number">Serial Number *</Label>
                              <Input
                                id="serial_number"
                                value={formData.serial_number}
                                onChange={(e) => handleChange('serial_number', e.target.value)}
                                placeholder="Starts with SO"
                                className="mt-1"
                              />
                              <p className="text-xs text-slate-500 mt-1">Found on the drawing, packing list, or outside box</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="pool_size">Pool Size</Label>
                                <Input
                                  id="pool_size"
                                  value={formData.pool_size}
                                  onChange={(e) => handleChange('pool_size', e.target.value)}
                                  placeholder="e.g., 20 x 40"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="pool_shape">Pool Shape</Label>
                                <Input
                                  id="pool_shape"
                                  value={formData.pool_shape}
                                  onChange={(e) => handleChange('pool_shape', e.target.value)}
                                  placeholder="Rectangle, Oval, etc."
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="installer_type">Installer Type</Label>
                              <Select value={formData.installer_type} onValueChange={(value) => handleChange('installer_type', value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select installer type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consumer-install">Consumer Install</SelectItem>
                                  <SelectItem value="dealer-install">Dealer Install</SelectItem>
                                  <SelectItem value="other-party-install">Other Party Install</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="installer_name">Installer Name</Label>
                              <Input
                                id="installer_name"
                                value={formData.installer_name}
                                onChange={(e) => handleChange('installer_name', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </>
                        )}

                        {formData.product_type === 'safety-cover' && (
                          <>
                            <div>
                              <Label htmlFor="serial_number">Serial Number *</Label>
                              <Input
                                id="serial_number"
                                value={formData.serial_number}
                                onChange={(e) => handleChange('serial_number', e.target.value)}
                                placeholder="Starts with SO"
                                className="mt-1"
                              />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cover_shape">Cover Shape</Label>
                                <Select value={formData.cover_shape} onValueChange={(value) => handleChange('cover_shape', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select shape" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="rectangular">Rectangular</SelectItem>
                                    <SelectItem value="form-fit">Form Fit</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="cover_type">Cover Type</Label>
                                <Select value={formData.cover_type} onValueChange={(value) => handleChange('cover_type', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="standard-mesh">Standard Mesh</SelectItem>
                                    <SelectItem value="deluxe-mesh">Deluxe Mesh</SelectItem>
                                    <SelectItem value="commercial-mesh">Commercial Mesh</SelectItem>
                                    <SelectItem value="supreme-solid">Supreme Solid</SelectItem>
                                    <SelectItem value="lightweight-solid">Lightweight Solid</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}

                        {formData.product_type === 'solar-blanket' && (
                          <>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="pool_type">Pool Type</Label>
                                <Select value={formData.pool_type} onValueChange={(value) => handleChange('pool_type', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select pool type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="above-ground">Above-Ground</SelectItem>
                                    <SelectItem value="in-ground">In-Ground</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="cover_shape">Cover Shape</Label>
                                <Select value={formData.cover_shape} onValueChange={(value) => handleChange('cover_shape', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select shape" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="round">Round</SelectItem>
                                    <SelectItem value="oval">Oval</SelectItem>
                                    <SelectItem value="rectangular">Rectangle</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="warranty_years">Warranty</Label>
                                <Select value={formData.warranty_years} onValueChange={(value) => handleChange('warranty_years', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select warranty" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 Years</SelectItem>
                                    <SelectItem value="4">4 Years</SelectItem>
                                    <SelectItem value="5">5 Years</SelectItem>
                                    <SelectItem value="6">6 Years</SelectItem>
                                    <SelectItem value="7">7 Years</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="cover_type">Cover Type</Label>
                                <Select value={formData.cover_type} onValueChange={(value) => handleChange('cover_type', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="blue-black">Blue/Black</SelectItem>
                                    <SelectItem value="clear">Clear</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}

                        {formData.product_type === 'winter-cover' && (
                          <>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cover_shape">Cover Shape</Label>
                                <Select value={formData.cover_shape} onValueChange={(value) => handleChange('cover_shape', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select shape" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="round">Round</SelectItem>
                                    <SelectItem value="oval">Oval</SelectItem>
                                    <SelectItem value="rectangular">Rectangle</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="warranty_years">Warranty</Label>
                                <Select value={formData.warranty_years} onValueChange={(value) => handleChange('warranty_years', value)}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select warranty" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="8">8 Years</SelectItem>
                                    <SelectItem value="10">10 Years</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Purchase Information Section */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Purchase Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="dealer_purchased_from">Dealer Purchased From *</Label>
                          <Input
                            id="dealer_purchased_from"
                            value={formData.dealer_purchased_from}
                            onChange={(e) => handleChange('dealer_purchased_from', e.target.value)}
                            placeholder="Dealer name or location"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="purchase_date">Purchase Date *</Label>
                            <Input
                              id="purchase_date"
                              type="date"
                              value={formData.purchase_date}
                              onChange={(e) => handleChange('purchase_date', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          {(formData.product_type === 'vinyl-liner' || formData.product_type === 'safety-cover') && (
                            <div>
                              <Label htmlFor="installation_date">Installation Date</Label>
                              <Input
                                id="installation_date"
                                type="date"
                                value={formData.installation_date}
                                onChange={(e) => handleChange('installation_date', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <div className="text-sm text-amber-800">
                            <strong>Important:</strong> Warranty registration must be completed within 30 days of installation to be valid. 
                            Keep your proof of purchase and serial number for your records.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Review Your Registration</h2>
                    <p className="text-slate-600">Please verify all information before submitting</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Product Information</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-slate-600">Product Type:</span> <span className="font-medium">{productTypes.find(p => p.id === formData.product_type)?.name}</span></div>
                        {formData.serial_number && <div><span className="text-slate-600">Serial Number:</span> <span className="font-medium">{formData.serial_number}</span></div>}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-slate-600">Name:</span> <span className="font-medium">{formData.full_name}</span></div>
                        <div><span className="text-slate-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                        <div><span className="text-slate-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                        {formData.street_address && <div><span className="text-slate-600">Address:</span> <span className="font-medium">{formData.street_address}, {formData.city}, {formData.state_province} {formData.postal_code}</span></div>}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Purchase Information</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-slate-600">Dealer:</span> <span className="font-medium">{formData.dealer_purchased_from}</span></div>
                        <div><span className="text-slate-600">Purchase Date:</span> <span className="font-medium">{formData.purchase_date}</span></div>
                        {formData.installation_date && <div><span className="text-slate-600">Installation Date:</span> <span className="font-medium">{formData.installation_date}</span></div>}
                      </div>
                    </div>

                    <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-6">
                      <div className="text-sm text-cyan-900">
                        <strong>By submitting this form,</strong> you acknowledge that you have read and agree to the terms and conditions of the warranty. 
                        All information provided is accurate and complete.
                      </div>
                    </div>
                  </div>
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

              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}