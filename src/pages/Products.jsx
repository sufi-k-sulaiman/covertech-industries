import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search, Filter, ArrowRight, Shield, Award, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const categories = [
  { id: "all", name: "All Products" },
  { id: "pool-liners", name: "Pool Liners" },
  { id: "safety-covers", name: "Safety Covers" },
  { id: "solar-covers", name: "Solar Covers" },
  { id: "winter-covers", name: "Winter Covers" },
  { id: "steel-kits", name: "Steel Kits" },
  { id: "golf-sports", name: "Golf & Sports" },
  { id: "pool-accessories", name: "Pool Accessories" },
  { id: "construction", name: "Construction" },
];

const products = [
  {
    slug: "in-ground-liners",
    name: "In-Ground Pool Liners",
    category: "pool-liners",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/9c3844458_image.png",
    description: "Premium AquaShimmer collection with 25-year warranty and 50+ patterns",
    warranty: "25 Years",
    bestseller: true
  },
  {
    slug: "above-ground-liners",
    name: "Above Ground Liners",
    category: "pool-liners",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80",
    description: "Classic full-print patterns with UV and chemical resistant materials",
    warranty: "25 Years",
    bestseller: true
  },
  {
    slug: "safety-covers",
    name: "Pool Safety Covers",
    category: "safety-covers",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
    description: "ASTM F1346-91 certified mesh and solid covers with up to 30-year warranty",
    warranty: "30 Years",
    bestseller: true
  },
  {
    slug: "solar-covers",
    name: "Solar Pool Covers",
    category: "solar-covers",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
    description: "Reduce heating costs by up to 70% with Solar-Extreme™ and Thermo Shield™",
    warranty: "10 Years",
    bestseller: true
  },
  {
    slug: "winter-covers",
    name: "Winter Pool Covers",
    category: "winter-covers",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
    description: "Heavy-duty protection for off-season. Weather resistant and UV protected.",
    warranty: "15 Years",
    bestseller: false
  },
  {
    slug: "steel-kits",
    name: "Steel Pool Kits",
    category: "steel-kits",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b4e004b08_Steelkit-01.jpg",
    description: "Heavy-duty galvanized steel construction kits for pool installation",
    warranty: "Lifetime",
    bestseller: false
  },
  {
    slug: "golf-covers",
    name: "Golf Green Covers",
    category: "golf-sports",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png",
    description: "Green Shield™ ice eliminating covers to protect turf during winter",
    warranty: "10 Years",
    bestseller: false
  },
  {
    slug: "pool-insulation",
    name: "Pool Insulation Systems",
    category: "pool-accessories",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b4c94711_Insu-floor.jpg",
    description: "Insul-Floor and Thermo-Wall solutions for maximum energy efficiency",
    warranty: "5 Years",
    bestseller: false
  },
  {
    slug: "curing-blankets",
    name: "Concrete Curing Blankets",
    category: "construction",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0429f79f7_Tarp.jpg",
    description: "Heavy-duty insulated curing blankets for cold weather concrete protection",
    warranty: "2 Years",
    bestseller: false
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" }
  ]);

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "brand": { "@type": "Brand", "name": "Covertech Industries" }
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Products - Pool Liners, Safety Covers, Solar Covers & More"
        description="Browse Covertech's complete range of premium pool products: vinyl liners, ASTM-certified safety covers, solar blankets, winter covers, steel kits, and golf green covers."
        keywords={["pool products", "pool liners", "safety covers", "solar covers", "winter covers", "Covertech products"]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, productsSchema] }}
      />

      <PageHero
        badge="Our Products"
        title="Premium Pool"
        titleAccent="Products"
        description="Explore our comprehensive range of pool liners, safety covers, and custom solutions"
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1920&q=80"
        minHeight="min-h-[50vh]"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={createPageUrl(`ProductDetails?slug=${product.slug}`)}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-cyan-100 transition-all"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.bestseller && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Bestseller
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Shield className="w-4 h-4 text-cyan-500" />
                        {product.warranty}
                      </div>
                      <span className="text-cyan-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 mb-4">No products found matching your criteria.</p>
              <Button 
                variant="outline"
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-slate-300 text-lg mb-8">
            We offer custom solutions for unique requirements. Contact our team for personalized assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Contact Us
              </Button>
            </Link>
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Design Custom
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}