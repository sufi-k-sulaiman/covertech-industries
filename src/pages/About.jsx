import { motion } from 'framer-motion';
import { Shield, Award, Globe, Heart, Check } from 'lucide-react';
import SEOHead, { organizationSchema, createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import TrustBadges from '@/components/ui/TrustBadges';

const milestones = [
  { year: "1987", event: "Covertech Industries founded in Toronto, Canada" },
  { year: "1995", event: "Expanded product line to include safety pool covers" },
  { year: "2000", event: "Launched Acu-Fit custom liner program" },
  { year: "2005", event: "Introduced golf and sports turf product division" },
  { year: "2010", event: "Achieved ASTM certification for all safety covers" },
  { year: "2015", event: "Expanded distribution across North America" },
  { year: "2020", event: "Celebrated 30+ years of industry leadership" },
  { year: "2024", event: "Continued innovation in sustainable materials" },
];

const values = [
  { icon: Award, title: "Quality Excellence", description: "Every product meets or exceeds industry standards with rigorous testing and quality control." },
  { icon: Heart, title: "Customer First", description: "We prioritize customer satisfaction with responsive support and tailored solutions." },
  { icon: Globe, title: "North American Made", description: "Proudly manufactured in USA and Canada, supporting local economies and ensuring quality." },
  { icon: Shield, title: "Family Values", description: "As a family-owned business, we treat our customers and employees like family." },
];

export default function About() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "About Us", url: "https://covertechind.com/about" }
  ]);

  return (
    <>
      <SEOHead
        title="About Covertech Industries - 35+ Years of Excellence"
        description="Learn about Covertech Industries' 35+ year history manufacturing premium pool liners, safety covers, and custom solutions. Family-owned, ASTM certified, made in North America since 1987."
        keywords={[
          "Covertech Industries history",
          "pool cover manufacturer",
          "Canadian pool manufacturer",
          "about Covertech",
          "family owned pool company",
          "ASTM certified manufacturer"
        ]}
        schema={{ "@context": "https://schema.org", "@graph": [organizationSchema, breadcrumbSchema] }}
      />

      <PageHero
        badge="About Us"
        title="35+ Years of"
        titleAccent="Excellence"
        description="Since 1987, Covertech Industries has been a trusted leader in manufacturing specialty products for swimming pools, construction sites, and golf courses across North America."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f311abf6a_beautiful-outdoor-swimming-pool-hotel-resort.jpg"
      >
        <TrustBadges variant="compact" className="justify-center" />
      </PageHero>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
                Keeping You <span className="text-cyan-600">Covered</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Our mission is simple: to provide the highest quality pool liners, safety covers, and specialty products while delivering exceptional customer service. We believe that every pool, golf course, and construction site deserves protection that you can trust.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                As a family-owned business, we take pride in every product we manufacture. Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for professionals across North America.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <div key={value.title} className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Meet Our Founder</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/e06907091_image.png"
                alt="Founder"
                className="w-48 h-48 rounded-2xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">President & Founder</h3>
                <p className="text-cyan-600 font-medium mb-4">Covertech Industries</p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Established in 2012, Covertech Industries manufactures specialty products including swimming pool covers, golf course covers, spa covers, tarps, curing blankets, and construction materials. The company serves markets across North America with a commitment to quality and innovation.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Education</p>
                    <p className="text-slate-900 font-medium">Bachelor of Communications, Concordia University</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Location</p>
                    <p className="text-slate-900 font-medium">Toronto, Ontario, Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Milestones & Achievements</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-slate-50 rounded-2xl p-6 inline-block hover:shadow-lg transition-shadow">
                      <span className="text-cyan-600 font-bold text-xl">{milestone.year}</span>
                      <p className="text-slate-700 mt-2">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-white shadow-lg hidden md:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}