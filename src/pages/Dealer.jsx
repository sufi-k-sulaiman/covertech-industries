import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Award, TrendingUp, HeadphonesIcon, GraduationCap, Users, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import GalleryBanner from '@/components/ui/GalleryBanner';

const benefits = [
  { icon: DollarSign, title: "Competitive Margins", description: "Enjoy excellent profit margins on all our premium products" },
  { icon: Award, title: "Quality Products", description: "Access to our full range of ASTM-certified pool and construction products" },
  { icon: TrendingUp, title: "Marketing Support", description: "Co-op advertising, sales materials, and promotional support" },
  { icon: HeadphonesIcon, title: "Dedicated Support", description: "24/7 dealer hotline and dedicated account management" },
  { icon: GraduationCap, title: "Training Programs", description: "Comprehensive product training and certification programs" },
  { icon: Users, title: "Lead Generation", description: "Customer referrals and lead sharing in your territory" },
];

const requirements = [
  "Established business with valid business license",
  "Physical showroom or retail location (preferred)",
  "Commitment to customer service excellence",
  "Minimum annual purchase requirements",
  "Agreement to maintain inventory levels"
];

export default function Dealer() {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', company_name: '', email: '', phone: '',
    city: '', state_province: '', business_type: '', about_business: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.DealerApplication.create(formData);
    setSubmitted(true);
    setLoading(false);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Become a Dealer", url: "https://covertechind.com/dealer" }
  ]);

  return (
    <>
      <SEOHead
        title="Become a Covertech Dealer - Partner With Industry Leaders"
        description="Join Covertech's dealer network across North America. Competitive margins, quality ASTM-certified products, marketing support, and dedicated account management. Apply today!"
        keywords={["Covertech dealer", "pool dealer program", "become a dealer", "pool cover distributor", "pool liner dealer"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Partner With Us"
        title="Become a Covertech"
        titleAccent="Dealer"
        description="Join our network of successful dealers across North America and grow your business with premium products and exceptional support."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/2ca8627bc_swimming-pool.jpg"
      />

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Dealer Benefits</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Why Partner With <span className="text-cyan-600">Covertech?</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We provide our dealers with everything they need to succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-100 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              What Our <span className="text-cyan-600">Dealers Say</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Join a network of successful dealers who trust Covertech
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jasmine Rocheleau",
                company: "Pool Services Company",
                quote: "I work for a pool company and always choose to give our business to Covertech when it comes to their product. All staff are great to deal with, and they stand by their products."
              },
              {
                name: "Tina Booth",
                company: "Pool Dealer",
                quote: "We are a swimming pool dealer that uses Covertech's products for the last 6 years. It's been a pleasure dealing with them and their premium products."
              },
              {
                name: "Chris Mckechnie",
                company: "Installation Professional",
                quote: "Covertech has always done right by me and my customers. I have been installing covers for 16 years. Quality tough made products with knowledgeable staff and quick turnaround."
              },
              {
                name: "Alex",
                company: "Pool Retailer",
                quote: "Covertech has been a great supplier to us for many years. The covers are made well and our clients are very happy with their products."
              },
              {
                name: "Cathy Cully",
                company: "Pool Homeowner",
                quote: "On my second Covertech pool cover. The first lasted 15 years. Returned the old cover and the new one was ready within weeks. Very responsive and easy to work with."
              },
              {
                name: "Mike Collins",
                company: "Pool Contractor",
                quote: "Fast, efficient warranty replacement on solar blanket, very friendly contact with the crew. Great experience working with Covertech."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-cyan-200 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Application */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Requirements</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-6">What We're Looking For</h2>
              
              <ul className="space-y-4 mb-8">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Have Questions?</h4>
                <p className="text-slate-600 text-sm mb-4">Our dealer relations team is here to help you get started.</p>
                <a href="tel:+14166405590" className="inline-flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700">
                  <Phone className="w-4 h-4" />
                  Call 416.640.5590
                </a>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                  <p className="text-slate-600">Our team will review your application and get back to you within 2-3 business days.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Dealer Application</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                        <Input 
                          required
                          value={formData.first_name}
                          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                        <Input 
                          required
                          value={formData.last_name}
                          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                      <Input 
                        required
                        value={formData.company_name}
                        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                        className="h-12"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <Input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                        <Input 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                        <Input 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">State/Province</label>
                        <Input 
                          value={formData.state_province}
                          onChange={(e) => setFormData({...formData, state_province: e.target.value})}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Business Type</label>
                      <Select value={formData.business_type} onValueChange={(val) => setFormData({...formData, business_type: val})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pool-contractor">Pool Contractor</SelectItem>
                          <SelectItem value="pool-retailer">Pool Retailer</SelectItem>
                          <SelectItem value="landscaper">Landscaper</SelectItem>
                          <SelectItem value="golf-course">Golf Course</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tell us about your business</label>
                      <Textarea 
                        value={formData.about_business}
                        onChange={(e) => setFormData({...formData, about_business: e.target.value})}
                        className="min-h-[120px]"
                        placeholder="Years in business, current product offerings, service area, etc."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <GalleryBanner />
    </>
  );
}