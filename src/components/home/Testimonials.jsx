import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Stan Abramowitz",
    quote: "We recently purchased a new pool liner manufactured by Covertech Industries Limited. The entire installation experience from beginning to end was flawless.",
    rating: 5
  },
  {
    name: "Andrew Giveandgo",
    quote: "I purchased a solar blanket with a 6-year warranty from the pool company. Great overall experience with Covertech.",
    rating: 4
  },
  {
    name: "Ned Mandaric",
    quote: "Had Covertech make a new cover for my pool. I brought in my old cover and they used it as a template. Cover fits perfectly and saved me about $1000.",
    rating: 5
  },
  {
    name: "Andrew Spinner",
    quote: "We purchased our pool safety cover through Covertech and it's been a great upgrade! Product and service are both A+",
    rating: 5
  },
  {
    name: "Tom Esser",
    quote: "I use Covertech because I want to sell a quality liner not made out of Chinese material. They only source from the largest vinyl factory.",
    rating: 5
  },
  {
    name: "Jasmine Rocheleau",
    quote: "I work for a pool company and always choose to give our business to Covertech. All staff are great to deal with, and they stand by their products.",
    rating: 5
  },
  {
    name: "Tina Booth",
    quote: "We are a swimming pool dealer that uses Covertech's products for the last 6 years. It's been a pleasure dealing with them over these years.",
    rating: 5
  },
  {
    name: "Cathy Cully",
    quote: "On my second Covertech pool cover. The first lasted 15 years. The new one was ready within weeks. Covertech is easy to work with and very responsive.",
    rating: 5
  },
  {
    name: "Massimo Testani",
    quote: "Very quality product with excellent durability. The attention to detail is evident in every aspect of the cover.",
    rating: 5
  },
  {
    name: "M Marsala",
    quote: "Covertech came through for us in the best way possible! Staff was extremely helpful. Amazing products, service and staff.",
    rating: 5
  },
  {
    name: "Andrew Schneider",
    quote: "My last 6 year cover lasted exactly that. 6 years. Like any piece of equipment you need to treat it properly. Great price and excellent quality.",
    rating: 5
  },
  {
    name: "Noel Manlapaz",
    quote: "Excellent company and dealing with all the employees makes things very easy!!!",
    rating: 5
  },
  {
    name: "Chris Mckechnie",
    quote: "Covertech has always done right by me and my customers. I have been installing covers and liners for 16 years. Quality tough made products.",
    rating: 5
  },
  {
    name: "Alex",
    quote: "Covertech has been a great supplier to us for many years. The covers are made well and our clients are very happy with their products.",
    rating: 5
  },
  {
    name: "Mike Collins",
    quote: "Fast, efficient warranty replacement on solar blanket. Very friendly contact with the crew. Great experience.",
    rating: 5
  },
  {
    name: "Teresa LaFave",
    quote: "Great service from this company. Very quick responses both on the phone and via email. Product delivered as requested in good order.",
    rating: 5
  },
  {
    name: "Wayne McDonell",
    quote: "Good service and the custom ordered cover fit the existing anchors in the coping very well.",
    rating: 5
  },
  {
    name: "Margie Zimmo",
    quote: "Very knowledgeable, great experience!!!",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  
  const startIndex = currentPage * itemsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-600 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Trusted by <span className="text-cyan-600">Professionals</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            See what our clients across North America have to say about our products
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${currentPage}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-slate-700 leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-cyan-500 w-8'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-center text-slate-500 text-sm mt-6">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>
    </section>
  );
}