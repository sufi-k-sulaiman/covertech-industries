import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Droplets, Shield, Sun, Snowflake, ArrowRight, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead, { createBreadcrumbSchema, createWebPageSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';
import GalleryModal from '@/components/products/GalleryModal';
import GalleryBanner from '@/components/ui/GalleryBanner';
import ArticlePage from '@/components/learn/ArticlePage';

const TABS = [
  { id: "vinyl-liners",   name: "Vinyl Pool Liners",    icon: Droplets },
  { id: "safety-covers",  name: "Safety Pool Covers",   icon: Shield   },
  { id: "solar-covers",   name: "Solar Pool Covers",    icon: Sun      },
  { id: "winter-covers",  name: "Winter Pool Covers",   icon: Snowflake},
];

// ─── VINYL LINERS ──────────────────────────────────────────────────────────────
const vinylLiners = {
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/d2bbfec37_image.png",
  name: "Vinyl Pool Liners",
  warranty: 25,
  tips: [
    "Measure your pool accurately before ordering — our Acu-Fit system ensures a perfect custom fit",
    "Choose UV-resistant patterns for pools with high sun exposure",
    "Consider salt-compatible liners if you have a saltwater system",
    "Schedule installation during mild weather (70–80°F) for best results",
    "Allow liner to relax in sun before final adjustments",
  ],
  care: [
    "Maintain proper water chemistry (pH 7.2–7.6)",
    "Keep chlorine levels between 1–3 PPM",
    "Brush walls and floor weekly to prevent algae",
    "Avoid sharp objects that could puncture the liner",
    "Use liner-safe cleaning products only",
    "Address wrinkles promptly before they become permanent",
  ],
  galleryImages: [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/410142be5_20240518_125429.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e1fba1d5_20240518_151820.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/35289ddf1_20240518_151835.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c513c236e_OceanMidnight-01.jpg",
  ],
  articles: [
    {
      title: "How to Choose the Perfect Pool Liner Pattern",
      excerpt: "Discover how different liner patterns and colors affect your pool's appearance, water temperature, and overall aesthetic appeal.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/9bbd21acc_generated_image.png",
      paragraphs: [
        "Selecting the right pool liner pattern is more than just choosing a color you like. The pattern you choose affects how your pool looks, how the water appears, and even the ambient temperature of your swimming environment. It's a decision that will define your pool's character for 15–25 years, so it's worth taking the time to explore your options carefully.",
        "Darker patterns like Ocean Midnight or HD Electric create deeper blue water tones and can help retain heat, making them ideal for cooler climates or pool owners who want a dramatic, resort-style look. Lighter patterns like White Diffusion or Canterbury reflect more sunlight, keeping water cooler in hot climates and giving the pool a bright, airy feel that many families prefer.",
        "Our 2026 AquaShimmer collection features 30+ patterns organized into Platinum Plus and Platinum tiers. Platinum Plus patterns include exclusive designs like Butterfly, Esagono, Harmony Gold HDE, and Twilight — each featuring our proprietary AquaShimmer technology that gives the water an extraordinary shimmering depth. Platinum patterns offer a wide range of classics from pebble textures to solid colors.",
        "Consider your pool surroundings carefully. Earthy, natural landscaping pairs beautifully with Sandstone or River White textures. Modern minimalist backyards suit the clean lines of White Diffusion or Carrara Marble. Tropical-inspired settings come alive with Blue Maui or HD Antigua. Think about how the liner will look from inside your home and from poolside seating areas.",
        "Finally, visit our interactive Pool Liner Visualizer — an online tool that shows all 30 patterns on both round and rectangular pools so you can see exactly how your chosen pattern will look before you order. Request physical samples if you want to evaluate color accuracy under your specific outdoor lighting conditions before committing.",
      ],
    },
    {
      title: "Understanding Vinyl Liner Thickness and Durability",
      excerpt: "Learn why liner thickness matters and how Covertech's 30mil liners provide superior protection and longevity.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/e4bbe213c_generated_image.png",
      paragraphs: [
        "Vinyl liner thickness is measured in mils — thousandths of an inch — and it directly impacts durability, puncture resistance, and lifespan. Our in-ground liners feature 30mil thickness with cold-crack resistance, while above-ground liners use 18mil material optimized for their specific installation requirements.",
        "Thicker liners resist punctures, tears, and UV degradation better than thinner alternatives. A 30mil liner is noticeably more substantial to the touch and provides a reassuring level of resilience against everyday hazards — pool toys, accidental footwear contact, or pool cleaning equipment. This added thickness is especially valuable around steps, benches, and sun decks where the liner sees the most wear.",
        "However, thickness alone doesn't determine quality. Our liners are manufactured from 100% anti-bacterial virgin resin — never recycled materials — ensuring consistent quality, color vibrancy, and structural integrity throughout. Recycled materials can introduce inconsistencies, weak spots, and color variations that compromise both appearance and longevity.",
        "Our proprietary AquaShimmer technology is embedded directly into the liner material during manufacturing, not printed on the surface. This means the shimmering effect is durable and won't fade or peel away over time. The result is a liner that maintains its beauty and structural integrity for decades under proper water chemistry maintenance.",
        "Our 25-year warranty on in-ground liners reflects our confidence in this superior construction. No other liner manufacturer offers this level of coverage, which speaks directly to the materials, engineering, and quality control that goes into every Covertech liner manufactured right here in Canada since 1987.",
      ],
    },
    {
      title: "Proper Liner Installation: DIY vs Professional",
      excerpt: "Weighing the pros and cons of DIY installation versus hiring a professional for your vinyl pool liner.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/2f9af96a9_generated_image.png",
      paragraphs: [
        "While experienced pool owners can install vinyl liners themselves, professional installation offers significant advantages that can mean the difference between a flawless result and a frustrating, costly problem. Understanding what each approach involves helps you make the right choice for your pool.",
        "Proper installation requires precise measurements, correct water chemistry preparation, wrinkle-free fitting, and proper sealing at all penetrations — lights, drains, skimmers, and any specialty features. DIY mistakes like improper wrinkle removal, misaligned seams, or incomplete penetration sealing can void warranties and lead to premature failure within the first few seasons.",
        "Professional installers bring specialized tools, hands-on experience with dozens of different pool shapes, and the knowledge to handle challenging situations — uneven pool bottoms, unusual configurations, or unfavorable weather. They typically complete installations faster and with fewer complications than first-time DIYers.",
        "If you choose the DIY route, work on a warm, dry day when vinyl is most pliable and flexible. Study our installation guides thoroughly before starting, have experienced helpers on hand, and never rush the wrinkle removal phase. Getting the liner smooth and properly seated before water filling is the single most critical step in the process.",
        "For custom shapes, freeform pools, or liners with attached features like steps, benches, or sun decks, professional installation is strongly recommended. These configurations require precise fitting techniques that are very difficult to achieve without training and experience. The additional cost of professional installation is almost always worth it for complex pools.",
      ],
    },
    {
      title: "Water Chemistry & Extending Your Liner's Lifespan",
      excerpt: "Essential maintenance practices to maximize your vinyl liner investment and keep it looking new for years.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/a576de00d_generated_image.png",
      paragraphs: [
        "A quality vinyl liner can last 15–25+ years with diligent care, but poor water chemistry is the single biggest cause of premature failure. Properly balanced water protects not just your liner, but your entire pool system — pumps, filters, heaters, and coping. Making water chemistry a consistent priority is the most important thing you can do to protect your liner investment.",
        "Maintain pH between 7.2–7.6 at all times. Water that is too acidic (low pH) will bleach liner colors and weaken vinyl over time. Water that is too alkaline (high pH) can cause calcium scale deposits and cloudiness. Test pH at least twice weekly during swimming season and after heavy rain events, which dilute and shift water chemistry significantly.",
        "Keep chlorine levels between 1–3 PPM and never add chemicals directly onto the liner surface. Always pre-dissolve granular chlorine in a bucket of water before adding to the pool, and broadcast it widely across the surface with the pump running. Concentrated chemical contact is one of the most common causes of liner staining and bleaching, and this damage is not covered under warranty.",
        "Prevent sun damage by using a solar cover when the pool is not in use — UV radiation degrades vinyl slowly but relentlessly. Remove debris promptly; leaves and organic matter can cause stubborn staining within 24–48 hours in warm weather. Address any small tears or pinholes immediately using vinyl patch kits — left untreated, small defects grow rapidly.",
        "During winter closing, lower water level below skimmers but keep enough water in the pool to support the liner and prevent it from shifting, cracking, or blowing out of the track. An empty or nearly-empty pool can allow the liner to shrink and dry out, making it brittle and nearly impossible to reinstall without damage. With consistent care, your liner will look beautiful well beyond its warranty period.",
      ],
    },
  ],
};

// ─── SAFETY COVERS ─────────────────────────────────────────────────────────────
const safetyCovers = {
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
  name: "Safety Pool Covers",
  warranty: 30,
  tips: [
    "Professional installation is strongly recommended",
    "Ensure proper water level (12–18 inches below coping) before installation",
    "Choose mesh for easy drainage or solid for complete debris protection",
    "Consider your climate when selecting cover type",
    "Order early before winter season for timely delivery",
  ],
  care: [
    "Install cover taut — loose-fitting covers cause excessive abrasion",
    "Re-tighten cover 2–3 weeks after initial installation",
    "Inspect springs periodically to ensure 50% compression",
    "Remove standing water and debris regularly",
    "Flush anchor casings 2–3 times per year",
    "Store cover in provided bag when not in use",
  ],
  galleryImages: [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/906a926d6_BlackMesh.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/5beb04d59_BlueMesh.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f28c1a388_GreenMesh.png",
  ],
  articles: [
    {
      title: "Understanding ASTM F1346-91 Safety Standards",
      excerpt: "What ASTM certification means for your pool safety cover and why it matters for your family's protection.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/7e7162a6e_generated_image.png",
      paragraphs: [
        "ASTM F1346-91 is the safety performance specification for covers for swimming pools, spas, and hot tubs, and it is the gold standard by which all genuine safety covers are measured. This certification is not decorative — it represents rigorous testing designed to save lives, particularly those of young children who are most vulnerable to accidental drowning.",
        "The standard requires covers to support the weight of two adults and one child — a combined 485 pounds — without collapsing into the pool. Covers must prevent gaps larger than 4 inches anywhere along their surface, eliminating spaces where a small child could slip under. They must be removable by one adult without tools, ensuring emergency access is always possible.",
        "All Covertech safety covers meet or exceed this standard, undergoing third-party testing to verify compliance independently. This verification matters because some covers on the market make safety claims without proper certification. When you see ASTM F1346-91 certification, you know the cover has been genuinely tested — not just marketed — as a life-saving device.",
        "Our covers are also tested for tensile strength, tear resistance, and anchor pull-out force. The anchors must resist substantial lateral force without pulling free from the deck, ensuring the cover cannot be lifted or displaced by wind, debris, or accidental contact. These mechanical requirements ensure the cover functions as intended throughout the entire winter season.",
        "Beyond the certification itself, proper installation is equally critical to safety performance. An ASTM-certified cover installed incorrectly — with improper anchor spacing, insufficient tension, or incorrect fit — may not perform to its rated safety specifications. This is why Covertech strongly recommends professional installation and provides detailed measuring forms and installation documentation for every order.",
      ],
    },
    {
      title: "Mesh vs Solid Safety Covers: Which is Right for You?",
      excerpt: "Compare the benefits of mesh and solid safety covers to make the best choice for your climate and needs.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/5b9b87c30_generated_image.png",
      paragraphs: [
        "The choice between mesh and solid safety covers is one of the most common questions pool owners face, and the right answer depends on your climate, local tree coverage, and personal preferences. Both cover types provide identical ASTM safety protection — the difference lies in how they manage water and debris over the winter months.",
        "Mesh covers allow rain and snow melt to drain through while blocking 95–99% of sunlight to prevent algae growth. They're significantly lighter than solid covers, making installation and removal much easier, especially for one or two people working without professional help. In regions with heavy snowfall and precipitation, mesh covers excel because they never accumulate dangerous amounts of standing water on their surface.",
        "Our Premier Mesh (18-year warranty) delivers 500 psi burst strength with 95%+ sun block. Our Deluxe Mesh (20-year warranty) upgrades to 670 psi burst strength and 99% sun block with a tighter weave that keeps finer debris out. Our Commercial Mesh (30-year warranty) achieves 760 psi burst strength with a basket weave construction — the highest-strength mesh available anywhere.",
        "Solid covers block 100% of light and all debris, keeping pool water significantly cleaner through winter. This means faster, easier pool openings in spring with less algae treatment required. However, solid covers require a drain panel or submersible cover pump to manage rain and snow melt accumulation, as standing water on the cover can become a hazard and add excessive weight stress.",
        "Our LW Solid (15-year warranty, 7.5oz copolymer) and Solid Safety Cover (15-year warranty, 12oz PVC) options both come with optional mesh drain panels for water management. In areas with heavy deciduous trees, solid covers often pay for themselves in reduced opening costs — less algae treatment, less vacuuming, and cleaner water from the first day of swimming season.",
      ],
    },
    {
      title: "Safety Cover Installation and Anchoring Guide",
      excerpt: "Learn the critical steps for correctly installing safety cover anchors to ensure maximum protection.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/53fc438b3_generated_image.png",
      paragraphs: [
        "Safety cover effectiveness depends entirely on proper installation. Even the highest-rated ASTM cover cannot perform to its safety specifications if the anchors are improperly placed, inadequately secured, or if the cover is incorrectly tensioned. Taking the time to install correctly — ideally with professional assistance — is an investment in your family's safety.",
        "Anchor placement must follow manufacturer specifications, typically every 4–5 feet around the pool perimeter. For concrete decks, use a hammer drill with the appropriate masonry bit to create anchor holes at the specified depth — usually 3–4 inches. Install brass anchors flush with the deck surface after installation to prevent tripping hazards; our countersink anchors close flat when the cover is removed.",
        "For pavers, natural stone, or unique deck materials, alternative anchoring techniques may be required, including deck plates, water bags, or specialized anchoring systems. Our team can advise on the best approach for your specific deck material. Never improvise anchor placement — incorrect positioning creates dangerous weak points in the cover system.",
        "Covers must be installed with consistent, uniform tension across the entire surface. A properly tensioned safety cover will feel taut when pressed, with minimal give, and will drain water toward the edges rather than pooling in the center. Check tension again 2–3 weeks after initial installation as springs and straps settle into position.",
        "Professional installation is strongly recommended for all safety covers. Professionals have the experience to measure accurately, determine correct anchor positions for unusual pool shapes, and ensure springs are set to the right tension from the start. The cost of professional installation is modest compared to the peace of mind of knowing your cover is performing exactly as its safety certification requires.",
      ],
    },
    {
      title: "Year-Round Pool Safety: Beyond the Winter Cover",
      excerpt: "Comprehensive strategies for maintaining pool safety throughout all four seasons.",
      paragraphs: [
        "While safety covers are essential for off-season protection, comprehensive pool safety requires a year-round strategy that addresses multiple risk factors. Drowning remains a leading cause of accidental death for children under five, and the majority of incidents occur in residential pools — making what you do year-round as important as what cover you choose.",
        "Install proper pool fencing — at least 4 feet high with self-closing, self-latching gates — to create an independent barrier around the pool area. Fencing should be designed so children cannot climb it, with no horizontal footholds below the latch. This perimeter barrier is the single most effective drowning prevention measure, and many municipalities require it by law.",
        "Use pool alarms as secondary safety layers. Subsurface alarms detect water disturbance caused by entry into the pool and sound loud alerts inside and outside the home. Gate alarms notify you when pool access gates are opened unexpectedly. These devices are not substitutes for fencing and covers, but they add valuable layers of redundancy to your safety system.",
        "Establish clear pool rules and enforce them consistently — no unsupervised swimming, no running on deck, no diving in shallow areas. Designate a dedicated adult supervisor whenever the pool is in use; smartphone distraction is a major contributing factor in modern pool incidents. Keep rescue equipment easily accessible at poolside at all times.",
        "Learn CPR and ensure family members and frequent visitors are also trained. When seconds matter, the ability to provide immediate rescue breathing dramatically improves outcomes. Many community organizations offer free or low-cost CPR training throughout the year. Combine physical barriers, alarms, supervision, and emergency preparedness for the most comprehensive pool safety approach possible.",
      ],
    },
  ],
};

// ─── SOLAR COVERS ──────────────────────────────────────────────────────────────
const solarCovers = {
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
  name: "Solar Pool Covers",
  warranty: 10,
  tips: [
    "Remove cover during pool treatments and chemical additions",
    "Use a solar reel for easier handling — owners with reels use covers far more consistently",
    "Cut cover to match pool shape for optimal coverage",
    "Store out of direct sunlight when not on pool",
    "Bubble side should face the water for maximum heat transfer",
    "Remove during peak heat hours in summer if water becomes too warm",
  ],
  care: [
    "Rinse cover with fresh water periodically",
    "Store in a shaded area when not in use",
    "Check for holes and patch as needed",
    "Replace when bubbles begin to deteriorate",
    "Avoid folding cover when wet for extended periods",
  ],
  galleryImages: [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/e499b3e0a_SolarCover.jpg",
  ],
  articles: [
    {
      title: "The Science Behind Solar Pool Heating",
      excerpt: "Understand how solar covers harness the sun's energy to naturally heat your pool water and reduce energy costs.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/b97d9b7c6_generated_image.png",
      paragraphs: [
        "Solar covers work through a deceptively simple but highly effective principle: they trap solar radiation and transfer it directly to your pool water, while simultaneously creating an insulating barrier that prevents heat from escaping back into the atmosphere. Understanding this dual action helps explain why solar covers are considered one of the most cost-effective pool upgrades available.",
        "The bubble design on the underside of the cover acts like thousands of tiny concentrating lenses, focusing sunlight and maximizing the heat transfer into the water below. Air trapped in each bubble provides insulation — the same way a double-pane window is warmer than single glass. This combination of active heat collection and passive heat retention makes solar covers far more effective than flat plastic sheeting.",
        "Our Thermo Shield™ blue/black design takes this a step further by using dark coloration to absorb a broader spectrum of solar radiation, potentially raising water temperature 25% more than conventional clear covers. Dark surfaces absorb more heat than reflective surfaces — the same physics principle behind wearing dark clothing in winter. This design choice makes Thermo Shield™ particularly effective in northern climates with cooler summers.",
        "During the day, covers can increase pool temperature by 8–15°F depending on climate, sun intensity, and pool size. At night, the insulating bubbles prevent the 5–10°F temperature drop that typically occurs as pools radiate heat into cool night air. This dual action — capturing heat during the day and retaining it overnight — means your pool is measurably warmer every single morning than it would be without a cover.",
        "The practical result is that pool owners in most North American climates can extend their swimming season by 4–8 weeks with consistent solar cover use — gaining meaningful extra weeks at both ends of the season without any additional heating equipment or operating costs. For pools with gas or electric heaters, covers allow heaters to cycle on far less frequently, delivering the promised 50–70% reduction in heating bills.",
      ],
    },
    {
      title: "Maximizing Energy Savings with Solar Covers",
      excerpt: "Practical strategies to achieve up to 70% reduction in pool heating costs through consistent solar cover use.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/110bf3bed_generated_image.png",
      paragraphs: [
        "The energy savings potential of solar covers is substantial — up to 70% reduction in pool heating costs — but achieving maximum savings requires consistent, strategic use. A solar cover that sits in its reel three days a week delivers a fraction of the savings of one that covers the pool every night and during every non-swimming period.",
        "The single most effective habit is putting the cover on every evening without exception. Night hours represent peak heat loss: cooler air temperatures, wind, and the absence of solar input all conspire to cool pool water rapidly. A pool left uncovered overnight in cool weather can lose 5–10°F by morning — heat that your heater must replace at significant cost.",
        "Invest in a quality reel system, and solar cover use will become effortless rather than a chore. Studies consistently show that pool owners with properly installed reel systems use their covers 60–80% more consistently than those who fold and store covers manually. The initial cost of a reel is typically recovered in energy savings within the first season.",
        "Cut your cover to fit as precisely as possible, leaving minimal gaps around the perimeter. Every gap is a pathway for heat loss and evaporation — the two things you're paying to prevent. A well-fitted cover also sits flatter on the water, maximizing contact and heat transfer. Combine solar covers with pool insulation products like Insul-Floor and Thermo-Wall for even greater whole-system efficiency.",
        "Track your utility bills and pool chemical consumption before and after implementing consistent solar cover use. Most pool owners see payback on their cover investment within the first season from reduced heating costs alone. When you add chemical savings and reduced water consumption to the equation, the financial case for solar covers is overwhelming.",
      ],
    },
    {
      title: "Reducing Evaporation and Chemical Costs",
      excerpt: "How solar covers prevent up to 95% of water evaporation, saving thousands of gallons and hundreds of dollars annually.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/abbe361b5_generated_image.png",
      paragraphs: [
        "Water evaporation is one of the most underappreciated ongoing costs of pool ownership. An uncovered pool can lose 1–2 inches of water every week during summer — translating to 7,000–15,000 gallons annually for an average-sized pool. In drought-prone regions or areas with water restrictions, this evaporation loss is not just expensive — it can be genuinely problematic.",
        "Solar covers prevent up to 95% of this evaporation, acting as a physical barrier between the pool surface and the air above. The result is dramatically reduced water consumption, lower water bills, and less stress on municipal water supplies. For pool owners in water-restricted areas, solar covers are often the single most impactful conservation measure available.",
        "Beyond water savings, evaporation carries dissolved chemicals out of the pool along with the water vapor — primarily chlorine and other sanitizers. By minimizing evaporation, covers reduce chemical consumption by 35–60%. This means fewer chemical additions, more stable water chemistry that requires less frequent testing and adjustment, and significant cost savings throughout the swimming season.",
        "More stable water chemistry also means better protection for your pool liner, equipment, and surfaces. Fluctuating chemical levels stress all pool components over time. A pool with consistent chemistry maintained partly through solar cover use will have longer-lasting equipment, a more beautiful liner, and cleaner, clearer water with less effort from the owner.",
        "When you combine heating savings, reduced water consumption, chemical savings, and extended swimming season into a single calculation, the annual financial benefit of consistent solar cover use typically ranges from $500–$1,500 depending on pool size, climate, and current energy costs. Few pool upgrades deliver this level of ongoing return on investment across every single season of ownership.",
      ],
    },
    {
      title: "Solar Cover Care, Storage & Maximizing Lifespan",
      excerpt: "Extend your solar cover lifespan to 7–10 years with proper handling, storage, and maintenance practices.",
      paragraphs: [
        "Solar covers are durable products built for years of seasonal use, but proper care makes the difference between a cover that lasts 3 seasons and one that performs for 7–10 years. The most common cause of premature degradation is avoidable — exposure to concentrated pool chemicals and improper storage.",
        "Never place chlorine tablets, granules, or other chemicals directly on the solar cover. Even briefly, concentrated chemical contact degrades the plastic bubbles and causes brittle, flaking breakdown that is irreversible. Always add chemicals to the pool with the cover removed, run the pump for full distribution, and wait until chemical levels have circulated and diluted before replacing the cover.",
        "Handle covers gently during removal and replacement. Dragging across rough concrete or stone deck surfaces causes physical abrasion that progressively weakens the material. Use a reel system for daily operation — it protects the cover from deck contact while making use effortlessly convenient. When removing without a reel, have two people work together and lift the cover rather than slide it.",
        "For storage during extended non-use periods or winter, clean the cover thoroughly, allow it to dry completely, then roll loosely and store in a cool, shaded location. Never store covers in airtight containers or plastic bags — trapped moisture promotes mildew growth that deteriorates the material. Avoid areas where temperatures can exceed 120°F, such as black-roofed storage sheds in direct sun.",
        "Inspect your cover each spring before first use. Look for deteriorating bubbles, holes, or tears, and repair small damage immediately using patch kits. A cover with 10% damaged bubbles is still significantly more effective than no cover, so don't rush to replace before the useful life is truly exhausted. With the care practices described here, our Solar-Extreme™ and Thermo Shield™ products consistently meet and exceed their rated lifespan.",
      ],
    },
  ],
};

// ─── WINTER COVERS ─────────────────────────────────────────────────────────────
const winterCovers = {
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
  name: "Winter Pool Covers",
  warranty: 15,
  tips: [
    "Lower water level 12–18 inches below coping before covering",
    "Remove all accessories from pool before covering",
    "Ensure proper tension to prevent water pooling",
    "Add air pillow for above-ground pools to prevent ice damage",
    "Apply winterizing chemicals before covering",
  ],
  care: [
    "Remove standing water to prevent sagging",
    "Brush off heavy snow accumulation gently",
    "Check water tubes/weights periodically",
    "Repair small tears immediately with patch tape",
    "Store clean and dry at season end",
  ],
  galleryImages: [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1de8c9711_WinterCover-Beaded-02.jpg",
  ],
  articles: [
    {
      title: "Complete Pool Winterization: Step-by-Step Preparation",
      excerpt: "Essential preparation procedures to protect your pool before installing the winter cover.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/62e1e97eb_generated_image.png",
      paragraphs: [
        "Successful winter pool protection is a process that begins well before the cover goes on. Skipping or rushing winterization steps is the most common cause of costly spring surprises — green water, damaged equipment, and expensive repairs that could have been entirely prevented with a systematic closing approach. Budget 3–4 hours for a thorough winterization job.",
        "Begin by thoroughly cleaning the pool — vacuum the floor, brush walls and steps, and empty all skimmer baskets. A clean pool goes into winter with less organic material that could stain the liner or cause chemical imbalances over the closed months. Balance water chemistry carefully: pH 7.2–7.6, total alkalinity 80–120 ppm, calcium hardness 180–220 ppm.",
        "Shock the pool with 2–3 times the normal chlorine dose to eliminate contaminants and build up a residual that will carry through the early winter weeks. Add winter algaecide following manufacturer instructions — this provides chemical protection during the period when your primary sanitizer system is offline. These chemical steps protect your liner, pool surface, and equipment through months of dormancy.",
        "Drain and blow out all plumbing lines using a shop vacuum or air compressor to eliminate standing water that could freeze and crack pipes. Add pool antifreeze to lines you cannot fully evacuate. Remove and winterize the pump, filter, and heater according to their individual manufacturer instructions; storing equipment indoors in freezing climates extends its lifespan significantly.",
        "Lower water level 4–6 inches below skimmer openings for in-ground pools, install skimmer plugs and expansion compensators, and remove all pool accessories — ladders, handrails, diving boards, and toys. Only after completing all of these steps should you install your winter cover over a properly prepared pool that is ready to emerge in spring in excellent condition.",
      ],
    },
    {
      title: "Winter Cover Materials: Why Construction Quality Matters",
      excerpt: "Learn how rip-stop fabric and reinforced webbing make Covertech winter covers superior to budget alternatives.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/3ed376b8e_generated_image.png",
      paragraphs: [
        "Not all winter covers are created equal, and the differences become apparent only when your pool faces the conditions these covers are designed to withstand — heavy snow loads, ice formation, high winds, and months of UV exposure. Understanding what separates premium covers from budget options helps you make an investment that protects your pool through many winters.",
        "Covertech's Superior Winter Cover uses rip-stop fabric technology — the same weaving technique used in parachutes, premium outdoor gear, and military equipment. Reinforced threads are woven at regular intervals throughout the fabric, creating a grid structure that stops any rip or tear from propagating across the material. Without rip-stop construction, a small puncture from a branch or sharp object can unzip into a catastrophic tear within one season.",
        "Our covers feature UV-stabilized coating that resists the degradation caused by months of winter sun exposure. Many budget covers develop brittleness and cracking within 2–3 seasons from UV breakdown alone. Heavy-duty perimeter webbing distributes stress evenly around the entire edge, preventing the stretching and distortion that allows water and debris to work under the cover's edges.",
        "Reinforced grommets with stainless steel or brass construction resist corrosion through multiple winter seasons. Cable and winch systems are engineered to compatible tension specifications — over-tensioning cheap grommets is one of the most common failure points in budget cover systems. Our cable and fastener hardware is matched to the tensile strength of the cover fabric for a balanced, long-lasting system.",
        "The 15-year warranty on our Superior Winter Cover reflects genuine confidence in these engineering choices. Budget covers often carry 1–3 year warranties because manufacturers know the materials won't perform longer. When you calculate cost per year of use, premium covers consistently prove more economical than budget alternatives that require replacement every few seasons.",
      ],
    },
    {
      title: "Managing Snow, Ice, and Water Accumulation",
      excerpt: "Safe methods for removing excess snow and water from your winter cover to prevent damage and safety hazards.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/6a239268d_generated_image.png",
      paragraphs: [
        "A properly installed winter cover requires active management during severe weather events to maintain its protective function and prevent damage. While covers are designed to withstand significant loads, proactive maintenance after storms extends cover life and ensures it performs as intended throughout the entire winter season.",
        "Light snow accumulation — generally under 4 inches — can remain on the cover without concern. Heavier accumulation should be removed to reduce stress on the cover material and anchor system. Use a soft push broom or purpose-designed pool cover rake to sweep snow toward the edges and off the cover. Never use sharp-edged metal shovels, which can easily tear the fabric and immediately void the warranty.",
        "For icy surfaces, patience is your best tool. Wait for slight melting before attempting removal — forcing ice off a cover risks taking cover material with it. Light application of pool-safe de-icer around the perimeter anchors can help free frozen hardware for adjustment. Once ice softens to a slushy consistency, it can be swept off much more safely.",
        "Water accumulation on solid covers requires a submersible cover pump designed specifically for this purpose. When water depth exceeds 2 inches anywhere on the cover surface, deploy the pump to remove the excess. Leaving standing water on the cover creates excessive weight stress and can freeze solid, making removal extremely difficult. Position the pump in the lowest point of the cover for most efficient water removal.",
        "Check your cover after every significant storm. This 10-minute inspection habit catches developing problems before they become expensive failures — a loosening anchor, a small tear starting at a grommet, or a cable beginning to fray. Early intervention on any of these issues is quick and inexpensive; ignoring them until spring often means cover replacement and potential pool damage.",
      ],
    },
    {
      title: "Spring Pool Opening: Cover Removal and Storage",
      excerpt: "Step-by-step guide to properly removing, cleaning, and storing your winter cover for maximum longevity.",
      image: "https://media.base44.com/images/public/6966301493bec01d4fb29d56/b0009f78d_generated_image.png",
      paragraphs: [
        "Spring opening is the payoff for a well-executed fall winterization — a pool that opens clean, clear, and ready for the season within days rather than weeks. Cover removal done correctly protects both the cover for future seasons and the pool water from contamination that would require additional treatment to correct.",
        "Begin cover removal by pumping off all standing water from the cover surface until it is as dry as possible. Then carefully sweep remaining debris toward the edges, working from the center outward. Having the cover surface clean and relatively dry before removal is the key step that prevents you from dumping a season's worth of winter debris directly into your pool water.",
        "Remove cover anchors systematically from one end of the pool and enlist helpers for the actual removal. Fold the cover accordion-style from one end, keeping the dirty upper surface folded inward to contain any residual debris. Never drag the cover across coping or rough deck surfaces — this is where most physical damage occurs and is entirely preventable with proper lifting technique.",
        "Once removed, spread the cover on a clean grass or deck area and wash thoroughly with a garden hose and mild soap. Rinse completely and allow to dry in full sun — both sides if possible. Inspect every inch for tears, weakened areas, loose grommets, or worn spots. Small repairs made now, with patch tape or grommeting tools, prevent those issues from becoming full failures next fall.",
        "Fold or roll loosely and store in the provided bag or a clean container in a cool, dry location. The critical storage requirement is air circulation — never seal in airtight plastic bags, which trap moisture and create ideal conditions for mildew and material degradation. Keep away from rodents (they love to nest in stored pool covers), sharp objects, and chemical storage areas. A properly stored cover will arrive next fall in ready-to-install condition.",
      ],
    },
  ],
};

const GUIDE_DATA = {
  "vinyl-liners": vinylLiners,
  "safety-covers": safetyCovers,
  "solar-covers": solarCovers,
  "winter-covers": winterCovers,
};

export default function Learn() {
  const [activeTab, setActiveTab] = useState("vinyl-liners");
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryModalIndex, setGalleryModalIndex] = useState(0);

  const guide = GUIDE_DATA[activeTab];

  const openGalleryModal = (index) => {
    setGalleryModalIndex(index);
    setGalleryModalOpen(true);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Learn", url: "https://covertechind.com/learn" }
  ]);

  const webPageSchema = createWebPageSchema({
    name: "Learn About Pool Products - Expert Guides & Care Tips",
    description: "Expert guides, care tips, and warranty information for vinyl pool liners, safety covers, solar blankets, and winter covers.",
    url: "https://covertechind.com/learn"
  });

  return (
    <>
      <SEOHead
        title="Learn About Pool Products - Expert Guides & Care Tips"
        description="Expert guides, care tips, and warranty information for vinyl pool liners, safety covers, solar blankets, and winter covers."
        keywords={["pool liner care", "safety cover maintenance", "solar cover tips", "pool cover guide", "pool liner installation"]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, webPageSchema] }}
      />

      <PageHero
        badge="Knowledge Center"
        title="Learn About Our"
        titleAccent="Premium Products"
        description="Expert guides, care tips, and warranty information for vinyl liners, safety covers, solar blankets, and winter covers."
        backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/ccfbee766_beautiful-outdoor-swimming-pool-with-sea-ocean-white-cloud-blue-sky.jpg"
        minHeight="min-h-[50vh]"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Tab Bar */}
          <div className="flex justify-center mb-14">
            <div className="flex flex-wrap justify-center gap-2 bg-slate-100 p-2 rounded-2xl">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-white shadow text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ArticlePage
                articles={guide.articles}
                tips={guide.tips}
                care={guide.care}
                warranty={guide.warranty}
                image={guide.image}
                name={guide.name}
              />

              {/* Gallery */}
              {guide.galleryImages?.length > 0 && (
                <div className="mt-20">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-50 rounded-full mb-4">
                      <Image className="w-5 h-5 text-cyan-600" />
                      <span className="text-cyan-700 font-semibold">Installation Gallery</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">See Our Work</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {guide.galleryImages.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="group aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                        onClick={() => openGalleryModal(idx)}
                      >
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryModalOpen && guide?.galleryImages && (
          <GalleryModal
            images={guide.galleryImages}
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
              <Button size="lg" variant="outline" className="px-8">Browse Products</Button>
            </Link>
          </div>
        </div>
      </section>

      <GalleryBanner />
    </>
  );
}