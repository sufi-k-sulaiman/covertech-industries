import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import SEOHead, { localBusinessSchema, createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (416) 640-5590", href: "tel:+14166405590" },
  { icon: Mail, label: "Email", value: "info@covertechind.com", href: "mailto:info@covertechind.com" },
  { icon: MapPin, label: "Location", value: "26 Dansk Court, Toronto, ON M9W 5V8", href: "https://maps.google.com/?q=26+Dansk+Court,+Toronto,+ON+M9W+5V8" },
  { icon: Clock, label: "Business Hours", value: "Mon - Sat: 8:30 AM - 5:30 PM EST", href: null },
];

const faqs = [
  { q: "What is your warranty coverage?", a: "We offer industry-leading warranties up to 25 years depending on the product line." },
  { q: "Do you ship internationally?", a: "We primarily serve USA and Canada. Contact us for international inquiries." },
  { q: "How do I become a dealer?", a: "Visit our Dealer page to learn about requirements and submit an application." },
  { q: "Can I get custom sizes?", a: "Yes! Our Acu-Fit liners and covers are custom-made to your specifications." },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ContactSubmission.create(formData);
    setSubmitted(true);
    setLoading(false);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Contact", url: "https://covertechind.com/contact" }
  ]);

  return (
    <>
      <SEOHead
        title="Contact Covertech Industries - Get a Quote"
        description="Contact Covertech Industries for pool liners, safety covers, and custom solutions. Call +1 (416) 640-5590 or email info@covertechind.com. Located in Toronto, Ontario."
        keywords={["contact Covertech", "pool liner quote", "safety cover quote", "Toronto pool manufacturer"]}
        schema={{ "@context": "https://schema.org", "@graph": [localBusinessSchema, breadcrumbSchema] }}
      />

      <PageHero
        badge="Get in Touch"
        title="Contact Us"
        description="Have questions about our products or need a quote? Our team is ready to help."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/5c884812c_beautiful-outdoor-luxury-swimming-pool-hotel.jpg"
        minHeight="min-h-[50vh]"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === 'Location' ? '_blank' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-4 group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors">
                  <info.icon className="w-5 h-5 text-cyan-600" />
                </div>
                <p className="text-sm text-slate-500 mb-1">{info.label}</p>
                <p className="font-semibold text-slate-900">{info.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80"
                alt="Pool"
                className="rounded-2xl shadow-lg w-full h-80 object-cover mb-8"
              />
              
              <div className="bg-slate-900 rounded-2xl p-6">
                <h3 className="text-white font-semibold text-lg mb-1">Covertech Industries</h3>
                <p className="text-slate-400">26 Dansk Court, Toronto, ON M9W 5V8</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="bg-green-50 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                  <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                        <Input 
                          required
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <Input 
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone (Optional)</label>
                        <Input 
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                        <Select value={formData.subject} onValueChange={(val) => setFormData({...formData, subject: val})}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quote">Request a Quote</SelectItem>
                            <SelectItem value="product-info">Product Information</SelectItem>
                            <SelectItem value="warranty">Warranty Inquiry</SelectItem>
                            <SelectItem value="dealer">Dealer Inquiry</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                      <Textarea 
                        required
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-2">Can't find what you're looking for? Reach out to our support team.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}