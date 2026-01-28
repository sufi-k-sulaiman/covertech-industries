import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Droplets, Shield, Sun, Snowflake, Check, Lightbulb, Wrench, ArrowRight, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import GalleryModal from '@/components/products/GalleryModal';
import GalleryBanner from '@/components/ui/GalleryBanner';

const productGuides = [
  {
    id: "vinyl-liners",
    name: "Vinyl Pool Liners",
    icon: Droplets,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/d2bbfec37_image.png",
    description: "Custom Acu-Fit vinyl liners with wrinkle-free design and stunning patterns for in-ground and above-ground pools.",
    features: ["Custom patterns and colors", "UV-resistant materials", "Wrinkle-free Acu-Fit design", "Salt-compatible options"],
    products: ["In-Ground Liners", "Above-Ground Liners", "Overlap Liners", "Beaded Liners", "Unibead Liners"],
    articles: [
      {
        title: "How to Choose the Perfect Pool Liner Pattern",
        excerpt: "Discover how different liner patterns and colors affect your pool's appearance, water temperature, and overall aesthetic appeal.",
        content: "Selecting the right pool liner pattern is more than just choosing a color you like. The pattern you choose affects how your pool looks, how the water appears, and even the temperature. Darker patterns like Ocean Midnight or HD Electric create deeper blue water tones and can help retain heat, while lighter patterns like White Diffusion or Canterbury reflect more sunlight and keep water cooler in hot climates. Consider your pool surroundings, landscaping, and personal style. Our AquaShimmer collection features 30+ patterns from classic solids to intricate mosaics like Butterfly and Esagono. Visit our showroom or request samples to see patterns in different lighting conditions before making your final decision."
      },
      {
        title: "Understanding Vinyl Liner Thickness and Durability",
        excerpt: "Learn why liner thickness matters and how Covertech's 30mil liners provide superior protection and longevity.",
        content: "Vinyl liner thickness is measured in mils (thousandths of an inch), and it directly impacts durability and lifespan. Our in-ground liners feature 30mil thickness with cold-crack resistance, while above-ground liners use 18mil material optimized for their specific applications. Thicker liners resist punctures, tears, and UV degradation better than thinner alternatives. However, thickness alone doesn't determine quality – our liners are made from 100% anti-bacterial virgin resin, never recycled materials, ensuring consistent quality throughout. The combination of premium materials, proper thickness, and our proprietary AquaShimmer technology delivers liners that maintain their beauty and integrity for decades. Our 25-year warranty on in-ground liners reflects our confidence in this superior construction."
      },
      {
        title: "Proper Liner Installation: DIY vs Professional",
        excerpt: "Weighing the pros and cons of DIY installation versus hiring professionals for your vinyl pool liner.",
        content: "While experienced pool owners can install vinyl liners themselves, professional installation offers significant advantages. Proper installation requires precise measurements, correct water chemistry preparation, wrinkle-free fitting, and proper sealing at all penetrations (lights, drains, skimmers). DIY mistakes can void warranties and lead to premature failure. Professional installers have specialized tools, experience with different pool shapes, and know how to handle tricky situations like uneven bottoms or challenging weather conditions. If you choose DIY, carefully review our installation guides, work on a warm day (vinyl is more pliable), and recruit experienced helpers. For custom shapes, freeform pools, or liners with attached features (steps, benches, sundecks), professional installation is strongly recommended."
      },
      {
        title: "Extending Your Liner Lifespan: Best Practices",
        excerpt: "Essential maintenance tips to maximize your vinyl liner investment and keep it looking new for years.",
        content: "A quality vinyl liner can last 15-25+ years with proper care. Start with balanced water chemistry – pH between 7.2-7.6, alkalinity 80-120 ppm, and appropriate chlorine levels. Prevent sun damage by using a solar cover when the pool is not in use. Remove debris promptly – leaves and organic matter can stain if left too long. During winter closing, lower water level below skimmers but keep enough water to support the liner. Avoid sharp objects and train pets to use steps, not jump in. Address small tears immediately with vinyl patch kits to prevent expansion. Brush the liner weekly with soft brushes, never abrasive tools. With these practices, your liner will maintain its beauty and structural integrity well beyond the warranty period."
      }
    ],
    tips: [
      "Measure your pool accurately before ordering - our Acu-Fit system ensures a perfect custom fit",
      "Choose UV-resistant patterns for pools with high sun exposure",
      "Consider salt-compatible liners if you have a saltwater system",
      "Schedule installation during mild weather (70-80°F) for best results",
      "Allow liner to relax in sun before final adjustments"
    ],
    care: [
      "Maintain proper water chemistry (pH 7.2-7.6)",
      "Keep chlorine levels between 1-3 PPM",
      "Brush walls and floor weekly to prevent algae",
      "Avoid sharp objects that could puncture the liner",
      "Use liner-safe cleaning products only",
      "Address wrinkles promptly before they become permanent"
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/410142be5_20240518_125429.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e1fba1d5_20240518_151820.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/35289ddf1_20240518_151835.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f74d47fc_AllBlue-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2c68702dd_BayviewWD-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b9f5b29a8_BayviewWD-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a765f5e4e_BayviewWD-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c513c236e_OceanMidnight-01.jpg"
    ],
    warranty: 25
  },
  {
    id: "safety-covers",
    name: "Safety Pool Covers",
    icon: Shield,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
    description: "ASTM F1346-91 certified mesh and solid covers providing maximum protection and peace of mind for your pool.",
    features: ["ASTM F1346-91 certified", "Up to 30-year warranty", "Custom-fit design", "Multiple anchoring systems"],
    products: ["Premier Mesh Safety Cover", "Deluxe Mesh Safety Cover", "Commercial Mesh Cover", "Solid Safety Cover"],
    articles: [
      {
        title: "Understanding ASTM F1346-91 Safety Standards",
        excerpt: "What ASTM certification means for your pool safety cover and why it matters for your family's protection.",
        content: "ASTM F1346-91 is the safety performance specification for covers for swimming pools, spas, and hot tubs. This rigorous standard ensures covers can support the weight of two adults and one child (485 pounds) to prevent accidental drowning. All Covertech safety covers meet or exceed this standard, tested for tensile strength, tear resistance, and anchor pull-out force. The certification requires covers to prevent gaps larger than 4 inches that could trap a child, and they must be removable by one adult without tools. Our covers undergo third-party testing to verify compliance. When you see ASTM certification, you know your cover provides genuine safety protection, not just aesthetic pool covering. This certification, combined with proper installation and maintenance, makes your pool significantly safer during off-season months and when unsupervised."
      },
      {
        title: "Mesh vs Solid Safety Covers: Which is Right for You?",
        excerpt: "Compare the benefits of mesh and solid safety covers to make the best choice for your climate and needs.",
        content: "Mesh and solid safety covers each offer distinct advantages. Mesh covers allow rain and snow melt to drain through while blocking 95-99% of sunlight, preventing algae growth without water accumulation. They're lighter, easier to handle, and ideal for areas with heavy precipitation. Our Premier Mesh (18-year warranty) and Deluxe Mesh (20-year warranty) options provide 500-670 psi burst strength. Solid covers block 100% of light and all debris, keeping pool water cleaner through winter, but require a drain panel or cover pump to manage water accumulation. They come with a 15-year warranty and are excellent for areas with lots of leaves and debris. Consider your climate: snowy regions benefit from mesh drainage, while areas with less precipitation and heavy foliage may prefer solid covers. Both provide equal safety protection and ASTM certification."
      },
      {
        title: "Proper Safety Cover Installation and Anchoring",
        excerpt: "Learn the critical steps for correctly installing safety cover anchors to ensure maximum protection.",
        content: "Safety cover effectiveness depends entirely on proper installation. Anchor placement must follow manufacturer specifications, typically every 4-6 feet around the pool perimeter. For concrete decks, use hammer drills with masonry bits to create anchor holes at precise depths – usually 3-4 inches. Install brass anchors flush with deck surface to prevent tripping hazards. For pavers or natural stone, additional anchoring techniques may be required. Mark anchor locations clearly for easy spring removal and fall installation. Covers should be taut when installed, with minimal sagging – this prevents water accumulation and maintains safety ratings. Our covers come with detailed measuring guides and installation instructions, but professional installation is recommended for complex pool shapes or if you're uncertain. Properly installed anchors should remain in place for years, making seasonal cover installation quick and easy."
      },
      {
        title: "Year-Round Pool Safety Beyond Winter Coverage",
        excerpt: "Comprehensive strategies for maintaining pool safety throughout all seasons, not just winter.",
        content: "While safety covers are essential for winter protection, year-round safety requires multiple strategies. Install proper fencing – at least 4 feet high with self-closing, self-latching gates – around your pool area. Use pool alarms that detect water disturbance or gate openings. During swimming season, establish clear pool rules: no diving in shallow areas, no running on deck, no swimming alone. Keep rescue equipment accessible: reaching poles, life rings, and flotation devices. Learn CPR and keep emergency numbers posted. For families with young children, use removable mesh fencing as secondary barriers during summer. Consider transparent safety covers that can remain on during warm months while allowing supervision. Maintain clear sightlines to the pool from inside your home. Combine your winter safety cover with these year-round practices for comprehensive pool safety that protects your family every day."
      }
    ],
    tips: [
      "Professional installation is strongly recommended",
      "Ensure proper water level (12-18 inches below coping) before installation",
      "Choose mesh for easy drainage or solid for complete debris protection",
      "Consider your climate when selecting cover type",
      "Order early before winter season for timely delivery"
    ],
    care: [
      "Install cover taut - loose-fitting covers cause excessive abrasion",
      "Re-tighten cover 2-3 weeks after initial installation",
      "Inspect springs periodically to ensure 50% compression",
      "Remove standing water and debris regularly",
      "Flush anchor casings 2-3 times per year",
      "Store cover in provided bag when not in use"
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/906a926d6_BlackMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/5beb04d59_BlueMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f28c1a388_GreenMesh.png"
    ],
    warranty: 30
  },
  {
    id: "solar-covers",
    name: "Solar Pool Covers",
    icon: Sun,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
    description: "Energy-efficient solar blankets that reduce heating costs by up to 70% and extend your swimming season.",
    features: ["Up to 70% heating cost reduction", "Reduces evaporation", "Extends swimming season", "UV resistant"],
    products: ["Solar-Extreme™ Solar Cover", "Thermo Shield™ Solar Blanket", "ClearDeck Solar Cover System"],
    articles: [
      {
        title: "The Science Behind Solar Pool Heating",
        excerpt: "Understand how solar covers harness the sun's energy to naturally heat your pool water.",
        content: "Solar covers work through a simple but effective principle: they trap solar radiation and transfer it to your pool water while preventing heat loss. The bubble design on the underside acts like thousands of tiny magnifying glasses, concentrating sunlight and maximizing heat transfer. Air trapped in bubbles provides insulation, preventing heat from escaping back into the atmosphere. Dark-colored covers like our Thermo Shield™ blue/black design absorb more heat than clear covers, potentially raising water temperature by 25% more than conventional blankets. During the day, covers can increase pool temperature by 8-15°F depending on climate and sun exposure. At night, covers act as insulation barriers, preventing the 5-10°F temperature drop that typically occurs overnight. This dual action – capturing heat during the day and preventing loss at night – makes solar covers one of the most cost-effective pool heating solutions available, with zero operating costs."
      },
      {
        title: "Maximizing Energy Savings with Solar Covers",
        excerpt: "Practical strategies to achieve up to 70% reduction in pool heating costs using solar covers.",
        content: "To maximize energy savings, use your solar cover consistently – every night and during the day when the pool is not in use. Even a few hours without cover can result in significant heat and water loss. For pools with gas or electric heaters, solar covers can reduce heating costs by 50-70% by maintaining temperature and reducing heater run time. Cut your cover to fit precisely, leaving minimal gaps where heat can escape. In cooler climates, combine solar covers with pool insulation systems like Insul-Floor and Thermo-Wall for even greater efficiency. Use a reel system to make daily cover use convenient – studies show pool owners with reels use covers more consistently. During summer's hottest months, remove covers during peak sun hours if water becomes too warm. Track your utility bills before and after implementing solar cover use to quantify savings. Most pool owners recoup their solar cover investment within one season through reduced heating and chemical costs."
      },
      {
        title: "Reducing Water Evaporation and Chemical Loss",
        excerpt: "How solar covers prevent up to 95% of water evaporation, saving thousands of gallons annually.",
        content: "Pool water evaporation is a hidden expense that solar covers dramatically reduce. An uncovered pool can lose 1-2 inches of water weekly during summer – that's 7,000-15,000 gallons annually for an average pool. Solar covers prevent 95% of this evaporation, conserving water and reducing refill costs. Beyond water savings, evaporation carries away pool chemicals, particularly chlorine. By minimizing evaporation, covers reduce chemical consumption by 35-60%, lowering your maintenance budget significantly. Less evaporation also means more stable water chemistry, reducing the need for frequent testing and adjustments. In drought-prone areas, this water conservation is environmentally responsible and may help comply with water restrictions. Covers also prevent debris accumulation, reducing filter strain and cleaning time. The combined savings from reduced water replacement, chemical use, and heating costs often exceed $500-1,000 annually, making solar covers one of the smartest pool investments."
      },
      {
        title: "Solar Cover Care and Storage Best Practices",
        excerpt: "Extend your solar cover lifespan to 5-7 years with proper handling, storage, and maintenance.",
        content: "Proper care extends solar cover life significantly. Always handle covers gently – dragging across rough deck surfaces causes premature wear. Use a reel system for easy on/off operation that prevents damage. When removing the cover, hose off debris before rolling to prevent grinding dirt into the material. Store covers away from direct sunlight when not in use for extended periods – UV exposure degrades plastic over time. For winter storage, clean thoroughly, dry completely, and fold loosely in a dry location – never store wet covers as they can develop mildew. Avoid storing in airtight containers; allow air circulation. Keep covers away from pool chemicals; never place chlorine tablets on the cover. Trim covers carefully if adjusting fit, using scissors rather than tearing. Check regularly for small holes or tears and repair immediately with patch kits to prevent expansion. Clean covers monthly with mild soap and water, rinse thoroughly. With proper care, Solar-Extreme™ and Thermo Shield™ covers easily reach their 10-year warranty period and beyond."
      }
    ],
    tips: [
      "Remove cover during pool treatments and chemical additions",
      "Use a solar reel for easier handling",
      "Cut cover to match pool shape for optimal coverage",
      "Store out of direct sunlight when not on pool",
      "Bubble side should face the water for maximum heat transfer"
    ],
    care: [
      "Rinse cover with fresh water periodically",
      "Store in a shaded area when not in use",
      "Check for holes and patch as needed",
      "Replace when bubbles begin to deteriorate",
      "Avoid folding cover when wet for extended periods"
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/e499b3e0a_SolarCover.jpg"
    ],
    warranty: 10
  },
  {
    id: "winter-covers",
    name: "Winter Pool Covers",
    icon: Snowflake,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
    description: "Heavy-duty protection to keep your pool pristine through winter. Designed for harsh weather conditions.",
    features: ["Weather resistant", "Heavy duty material", "UV protected", "Easy installation"],
    products: ["Lock-in Beaded Cover", "Superior Winter Pool Cover"],
    articles: [
      {
        title: "Proper Pool Winterization Steps Before Covering",
        excerpt: "Essential preparation procedures to protect your pool before installing a winter cover.",
        content: "Successful winter pool protection starts before the cover goes on. Begin by thoroughly cleaning the pool – vacuum, brush walls, and empty skimmer baskets. Balance water chemistry: pH 7.2-7.6, alkalinity 80-120 ppm, calcium hardness 180-220 ppm. Shock the pool with 2-3 times normal chlorine dose to eliminate contaminants. Add winter algaecide following manufacturer instructions. Lower water level below skimmers (about 4-6 inches) for in-ground pools to prevent freeze damage, but maintain enough water to support the cover. For above-ground pools, lower to just below the return line. Drain and blow out plumbing lines, adding pool antifreeze to prevent freeze damage. Remove and clean pump, filter, and heater; store indoors if possible. Install winterizing plugs in all return and skimmer openings. Remove ladders, diving boards, and accessories. Only after completing these steps should you install your winter cover, ensuring a clean, protected pool ready for spring opening."
      },
      {
        title: "Understanding Winter Cover Materials and Construction",
        excerpt: "Learn why rip-stop fabric and reinforced webbing make Covertech winter covers superior.",
        content: "Not all winter covers are created equal. Covertech's Superior Winter Cover uses rip-stop fabric technology – a weaving technique that prevents tears from spreading, similar to parachute material. This construction features reinforced threads at regular intervals that stop rips in their tracks. Our covers include UV-protected coating that prevents degradation from winter sun exposure, extending lifespan significantly. Heavy-duty webbing around the perimeter distributes stress evenly, preventing stretching and sagging that can collect water and debris. Reinforced grommets with rust-proof coatings ensure cables and winches don't tear through. The multi-layer construction balances water resistance (keeping debris out) with some water penetration (preventing dangerous water accumulation on top). This engineering results in covers that withstand heavy snow loads, ice formation, and winter storms year after year. Our 15-year warranty reflects confidence in these superior materials and construction techniques."
      },
      {
        title: "Managing Snow and Water Accumulation on Winter Covers",
        excerpt: "Safe methods for removing excess snow and water to prevent cover damage and safety hazards.",
        content: "Proper winter cover maintenance includes managing snow and water accumulation. Light snow (under 4 inches) can usually remain on covers, but heavy accumulation should be removed to prevent stress and potential collapse into the pool. Use a soft push broom or pool cover rake – never sharp shovels that can tear fabric. Work from edges toward center, pushing snow off rather than pulling. For icy surfaces, wait for slight melting before removal. Water accumulation is managed differently depending on cover type. For solid covers with grommets allowing some water passage, monitor the center for excessive pooling. Use a cover pump when water depth exceeds 2 inches – submersible pumps designed for pool covers prevent draining the pool itself. Never drain all water from the cover top; some weight is beneficial for keeping the cover in place during wind. For covers over above-ground pools, be especially vigilant as excessive weight can damage pool walls. Check covers after storms and heavy snow events."
      },
      {
        title: "Spring Pool Opening: Cover Removal Best Practices",
        excerpt: "Step-by-step guide to properly removing and storing your winter cover for summer season.",
        content: "Spring opening requires careful cover removal to prevent dumping debris into clean pool water. Start by removing any standing water with a cover pump – get surface as dry as possible. Carefully sweep remaining debris toward pool edges using a soft broom. Recruit helpers; never attempt to remove large covers alone. Fold cover accordion-style from one end, keeping the dirty surface inward to contain debris. Once removed, clean thoroughly with cover cleaner or mild soap, rinse with hose, and allow to dry completely before storage – storing wet covers causes mildew and degradation. Inspect for tears, loose grommets, or weak areas; repair or note for replacement next season. Fold or roll loosely and store in a cool, dry location away from rodents and chemicals. Never store in airtight bags; allow air circulation to prevent moisture buildup. Before storing, apply cover protectant spray if available. Label storage container with contents and inspection notes. With proper storage, your winter cover will be ready for many more seasons of reliable protection."
      }
    ],
    tips: [
      "Lower water level 12-18 inches below coping before covering",
      "Remove all accessories from pool before covering",
      "Ensure proper tension to prevent water pooling",
      "Add air pillow for above-ground pools to prevent ice damage",
      "Apply winterizing chemicals before covering"
    ],
    care: [
      "Remove standing water to prevent sagging",
      "Brush off heavy snow accumulation",
      "Check water tubes/weights periodically",
      "Repair small tears immediately",
      "Store clean and dry in off-season"
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1de8c9711_WinterCover-Beaded-02.jpg"
    ],
    warranty: 15
  }
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState("vinyl-liners");
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryModalIndex, setGalleryModalIndex] = useState(0);
  const activeGuide = productGuides.find(g => g.id === activeTab);

  const openGalleryModal = (index) => {
    setGalleryModalIndex(index);
    setGalleryModalOpen(true);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Learn", url: "https://covertechind.com/learn" }
  ]);

  return (
    <>
      <SEOHead
        title="Learn About Pool Products - Expert Guides & Care Tips"
        description="Expert guides, care tips, and warranty information for vinyl pool liners, safety covers, solar blankets, and winter covers. Learn how to maintain your pool products."
        keywords={["pool liner care", "safety cover maintenance", "solar cover tips", "pool cover guide", "pool liner installation"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Knowledge Center"
        title="Learn About Our"
        titleAccent="Premium Products"
        description="Expert guides, care tips, and warranty information for vinyl liners, safety covers, solar blankets, and winter covers."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/ccfbee766_beautiful-outdoor-swimming-pool-with-sea-ocean-white-cloud-blue-sky.jpg"
        minHeight="min-h-[50vh]"
      />

      {/* Product Guides */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 p-1.5 rounded-xl flex-wrap h-auto">
                {productGuides.map((guide) => (
                  <TabsTrigger 
                    key={guide.id} 
                    value={guide.id}
                    className="px-6 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
                  >
                    <guide.icon className="w-4 h-4" />
                    {guide.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <AnimatePresence mode="wait">
            {activeGuide && (
              <motion.div
                key={activeGuide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Articles */}
                {activeGuide.articles && activeGuide.articles.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Essential Articles</h2>
                    <div className="grid gap-6">
                      {activeGuide.articles.map((article, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-2xl font-bold text-slate-900 mb-3">{article.title}</h3>
                          <p className="text-cyan-600 font-medium mb-4">{article.excerpt}</p>
                          <p className="text-slate-700 leading-relaxed">{article.content}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Overview */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg">
                      {activeGuide.name}
                    </div>
                    <img 
                      src={activeGuide.image}
                      alt={activeGuide.name}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{activeGuide.name}</h2>
                    <p className="text-slate-600 text-lg mb-6">{activeGuide.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-cyan-500" />
                        Key Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeGuide.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-slate-700">
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Available Products</h3>
                      <div className="flex flex-wrap gap-2">
                        {activeGuide.products.map((product) => (
                          <span key={product} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips & Care */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Pro Tips</h3>
                    </div>
                    <ol className="space-y-4">
                      {activeGuide.tips.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-slate-700">{tip}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Care & Maintenance</h3>
                    </div>
                    <ul className="space-y-3">
                      {activeGuide.care.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Installation Gallery */}
                {activeGuide.galleryImages && activeGuide.galleryImages.length > 0 && (
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-50 rounded-full mb-4">
                        <Image className="w-5 h-5 text-cyan-600" />
                        <span className="text-cyan-700 font-semibold">Installation Gallery</span>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">See Our Work</h2>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        Browse through our collection of professional installations showcasing quality craftsmanship and results.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {activeGuide.galleryImages.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                          onClick={() => openGalleryModal(index)}
                        >
                          <img
                            src={image}
                            alt={`Installation ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-4 left-4 text-white font-medium">
                              View Full Image
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warranty */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Warranty Information</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">Industry-Leading Warranty</h3>
                    <p className="text-slate-400 mt-2">{activeGuide.warranty}-year limited warranty with full coverage options</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {activeGuide.warranty}
                      </span>
                      <p className="text-slate-400 text-sm mt-1">Year Warranty</p>
                    </div>
                    <img 
                      src={activeGuide.image}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded-xl hidden md:block"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryModalOpen && activeGuide?.galleryImages && (
          <GalleryModal
            images={activeGuide.galleryImages}
            initialIndex={galleryModalIndex}
            onClose={() => setGalleryModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 text-lg mb-8">
            Design your custom pool product or browse our shop for quality accessories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 group">
                Design Your Product
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Products')}>
              <Button size="lg" variant="outline" className="px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <GalleryBanner />
    </>
  );
}