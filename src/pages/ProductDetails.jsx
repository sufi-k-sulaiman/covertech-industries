import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Shield, Award, MapPin, Check, Star, ArrowRight, 
  MessageSquare, Palette, ChevronLeft, ChevronRight,
  Droplets, Thermometer, Snowflake, Wrench, AlertTriangle, Download, FileText, Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead, { createProductSchema, createBreadcrumbSchema } from '@/components/seo/SEOHead';
import GalleryModal from '@/components/products/GalleryModal';

const productsData = {
  "in-ground-liners": {
    name: "In-Ground Pool Liners",
    category: "Pool Liners",
    tagline: "Premium AquaShimmer vinyl liners with custom patterns",
    description: "Premium AquaShimmer collection featuring Harmony Gold HDE, Carnival, Esagono & Butterfly patterns. Custom designed and fabricated incorporating proprietary sealing technology. Manufactured with attached vinyl over steps, benches, and sundecks.",
    fullDescription: "Experience unmatched quality with our In-Ground Liners. Engineered with precision and crafted from premium materials, this product delivers exceptional performance and durability that pool owners have trusted for over 35 years. Our commitment to excellence means every liner undergoes rigorous quality testing and meets the highest industry standards.",
    warranty: 25,
    images: [
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&q=80"
    ],
    features: ["25-Season Warranty", "AquaShimmer Technology", "30mil Cold Crack-resistant", "100% Anti-bacterial Virgin Resin", "UV & Chemical-resistant", "Made in Canada since 1987"],
    specifications: { Category: "Pool Liners", Thickness: "30mil", Material: "Anti-bacterial Virgin Resin", Texture: "Non-slip Available", "Custom Sizes": "Available", Origin: "Canada (since 1987)" },
    bestseller: true,
    downloads: [
      { name: "25-Season In-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/940bf589f_25SeasonIn-GroundLinerWarranty.pdf" },
      { name: "20-Season On-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5f9b4602_20SeasonOn-GroundLinerWarranty.pdf" },
      { name: "10-Season Above-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/94ddb6eba_10SeasonAbove-GroundLinerWarranty.pdf" },
      { name: "Installation Instructions", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ce2f38147_CVT-IngroundLinerMaintenanceandInstallation.pdf" },
      { name: "Care & Maintenance Guide", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fcfa016dc_CVT-LinerCareMaintenance.pdf" },
      { name: "2026 Pattern Catalogue", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/af5daff1a_2026LinerCatalogue-Web-R0.pdf" }
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ccd48b9fb_00.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/02075d1eb_01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0b2438721_02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5854fda40_011.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/296ba181e_405BRASSARD-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/787e6c6ad_David-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/98785298c_David-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ce624c6b3_David-03Keeway.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/756455007_David-04Keeway.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/96eda3ac8_David-05PeterGlass.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/080a0c615_David-07Cruzet.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e981b0fae_David-08JackNewmarket.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/812f990b1_David-09Thornridge.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/895fbff98_David-Sandstone.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3850f7bde_David-Step.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bef7c8198_IMG-0217.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f1b47a623_IMG-20250611-WA0013.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/322728de2_IMG-20250826-WA0008.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c073056f1_Infinity-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/900f943c3_Lineronly-Edit.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4f2e7dc36_Linerwithwater-Edit.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/462837cb5_Wedingcakestair.jpg"
    ],
    patterns: [
      { name: "Carnival", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/c4f5ad9e3_Carnival.jpg", collection: "Platinum Plus" },
      { name: "Butterfly", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/76470d0e3_Butterfly.jpg", collection: "Platinum Plus" },
      { name: "Esagono", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/6075f34a6_Esagono.jpg", collection: "Platinum Plus" },
      { name: "Harmony Gold HDE", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/15e2c0ffa_HarmonyGold-HDE.jpg", collection: "Platinum Plus" },
      { name: "Canterbury", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/2b4c8be73_Canterbury.jpg", collection: "Platinum" },
      { name: "HD Antigua", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/70115a868_HDAntigua.jpg", collection: "Platinum" },
      { name: "Carrara Marble", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/8e730c3e9_CarraraMarble.jpg", collection: "Platinum" },
      { name: "Blue Maui", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/ce6fcf82d_BlueMaui.jpg", collection: "Platinum" },
    ]
  },
  "safety-covers": {
    name: "Pool Safety Covers",
    category: "Safety Covers",
    tagline: "ASTM F1346-91 certified protection",
    description: "Premium ASTM-certified safety covers engineered for maximum protection and durability. Our safety covers meet or exceed ASTM F1346-91 standards, providing unmatched safety for your pool during off-season months.",
    fullDescription: "Available in mesh and solid configurations with industry-leading warranties up to 30 years. Experience unmatched quality with our Pool Safety Covers, engineered with precision and crafted from premium materials.",
    warranty: 30,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b0536b340_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/906a926d6_BlackMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/5beb04d59_BlueMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f28c1a388_GreenMesh.png"
    ],
    features: ["ASTM F1346-91 Certified", "Up to 30-Year Warranty", "Professional Installation Available", "Custom-Fit Design", "Multiple Anchoring Systems", "Winter-Ready Protection"],
    specifications: { Category: "Safety Covers", Certification: "ASTM F1346-91", Types: "Mesh & Solid", Warranty: "Up to 30 Years", Installation: "Professional Recommended", Origin: "North America" },
    bestseller: true,
    downloads: [
      { name: "Safety Cover Warranty 2025", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9876ef1df_CVT-SafetyCoverWarranty-2025.pdf" },
      { name: "Measuring Form", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a24979399_CVTSafey-Cover-Form.pdf" },
      { name: "Installation Instructions", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f1acc1b5e_CVT-SafetyCoverInstructions.pdf" },
      { name: "Care & Maintenance Guide", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/37f0becda_CVT-SafetyCoverCareGuide.pdf" },
      { name: "Safety Covers Brochure 2024", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/59cb887bb_2024SafetyCoversBrochure.pdf" }
    ],
    variants: [
      { name: "Premier Mesh Safety Cover", warranty: "18 Years", features: ["500 psi Burst Strength", "95%+ Sun Block", "Water Seepage Design"] },
      { name: "Deluxe Mesh Safety Cover", warranty: "20 Years", features: ["670 psi Burst Strength", "99% Sun Block", "Tighter Weave"] },
      { name: "Solid Safety Cover", warranty: "15 Years", features: ["100% Sun Block", "12oz PVC Coated", "Optional Drain Panel"] }
    ]
  },
  "solar-covers": {
    name: "Solar Pool Covers",
    category: "Solar Covers",
    tagline: "Reduce heating costs by up to 70%",
    description: "Premium solar covers and systems designed to maximize your pool's efficiency. Reduce heating costs by up to 70%, minimize evaporation, and extend your swimming season with our innovative solar solutions.",
    fullDescription: "Solar covers are one of the most cost-effective investments you can make for your pool, providing year-round benefits and substantial savings on heating and chemical costs.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/788c18317_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/e499b3e0a_SolarCover.jpg"
    ],
    features: ["Up to 70% Heating Cost Reduction", "Prevents Night Heat Loss", "Reduces Evaporation & Chemicals", "Keeps Pool Clean", "Raises Water Temperature", "Multiple Options Available"],
    specifications: { Category: "Solar Covers", "Heat Reduction": "Up to 70%", Types: "Solar-Extreme™, Thermo Shield™", "Custom Sizes": "Available" },
    bestseller: true,
    downloads: [
      { name: "Solar Blanket Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/042934906_SolarWarranty-CVT-English.pdf" },
      { name: "Solar Cover - What to Know", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6c47e8eb2_CVTSolarCover-WhattoKnow.pdf" }
    ],
    variants: [
      { 
        name: "Solar-Extreme™", 
        description: "Made from tough resins for superior strength and durability",
        features: ["Up to 70% Heating Bill Reduction", "Prevents Night Time Heat Loss", "Reduces Evaporation of Chemicals", "Keeps Pool Clean", "Raises Water Temperature", "Superior Durability"] 
      },
      { 
        name: "Thermo Shield™", 
        description: "Designed for maximum heat transfer with blue/black solar blanket",
        features: ["25% Higher Water Temperature", "Blue/Black Design", "Maximum Heat Transfer", "Outperforms Conventional Blankets"] 
      },
      { 
        name: "ClearDeck System", 
        features: ["Below-Deck System", "One-Person Operation", "Patented Design"] 
      }
    ]
  },
  "winter-covers": {
    name: "Superior Winter Pool Cover",
    category: "Winter Covers",
    tagline: "Heavy-duty winter protection",
    description: "Durable and reliable, Covertech's Superior Winter cover sets the standard for the industry. You'll get years of winter protection for your pool.",
    fullDescription: "Protect your pool during the off-season with our durable winter covers. Designed to withstand harsh weather conditions, heavy snow loads, and keep debris out all winter long. Made of super strong rip-stop fabric that saves maintenance and Spring clean-up costs.",
    warranty: 15,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1de8c9711_WinterCover-Beaded-02.jpg"
    ],
    features: ["Saves Maintenance Costs", "Super Strong Rip-Stop Fabric", "Spring Clean-up Savings", "Weather Resistant", "Heavy Duty Material", "UV Protected"],
    specifications: { Category: "Winter Covers", Material: "Rip-Stop Fabric", "UV Protection": "Yes", "Custom Sizes": "Available" },
    bestseller: false,
    downloads: [
      { name: "Winter Cover Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2064be08f_WinterCoverWarranty-CVT-English.pdf" },
      { name: "Beaded Winter Cover Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ea750810d_BeadedWinterCoverWarranty-CVT-English.pdf" }
    ]
  },
  "above-ground-liners": {
    name: "Above-Ground Vinyl Pool Liners",
    category: "Pool Liners",
    tagline: "Premium patterns with industry-leading warranty",
    description: "Classic full-print patterns with UV and chemical resistant materials. Available in Lancashire Wall with Blue Beach Floor pattern, designed specifically for above-ground pools.",
    fullDescription: "Our above-ground liners feature heat-sealed floors and Unibead design for easy installation. Made with 18 mil thickness (±10%) for durability and long-lasting performance. Available in round sizes from 12' to 27' and oval configurations, with custom sizes available upon request.",
    warranty: 15,
    images: [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80"
    ],
    features: ["15-Year Warranty (3-Year Full)", "Heat Sealed Floors", "Unibead Design", "18 Mil Thickness", "UV & Chemical Resistant", "Custom Sizes Available"],
    specifications: { 
      Category: "Pool Liners", 
      Thickness: "18 Mil (±10%)", 
      "Bead Type": "Unibead (Other Beads Available)", 
      "Wall Heights": "48″ – 52″",
      Pattern: "Lancashire Wall, Blue Beach Floor",
      "Round Sizes": "12′, 15′, 18′, 21′, 24′, 27′",
      "Oval Sizes": "12'x24′, 15'x30′, 16'x32′, 18'x33′"
    },
    bestseller: true,
    downloads: [
      { name: "10-Season Above-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/94ddb6eba_10SeasonAbove-GroundLinerWarranty.pdf" },
      { name: "Installation Instructions", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ce2f38147_CVT-IngroundLinerMaintenanceandInstallation.pdf" },
      { name: "Care & Maintenance Guide", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fcfa016dc_CVT-LinerCareMaintenance.pdf" }
    ],
    variants: [
      { name: "48″ Unibead", features: ["Requires 4″ cove", "Easy installation", "Standard wall height"] },
      { name: "52″ Unibead", features: ["Requires 6″ cove", "Extended wall height", "Enhanced durability"] }
    ]
  },
  "steel-kits": {
    name: "Steel Pool Kits",
    category: "Accessories",
    tagline: "Professional-grade construction kits",
    description: "Premium steel construction kits for pool installation. Durable, corrosion-resistant materials engineered for long-lasting performance and structural integrity.",
    fullDescription: "Heavy-duty galvanized steel panels engineered for structural integrity. Complete hardware package including brackets, bolts, and fasteners. Designed to withstand ground pressure and freeze-thaw cycles.",
    warranty: 25,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b4e004b08_Steelkit-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/b87eea138_Steelkit-02.jpg"
    ],
    features: ["Heavy Duty Construction", "Corrosion Resistant", "Easy Installation", "Professional Grade", "Complete Kit", "Made in North America"],
    specifications: { Category: "Accessories", Material: "Galvanized Steel", Coating: "Corrosion Resistant", Origin: "North America" },
    bestseller: false,
    downloads: []
  },
  "golf-covers": {
    name: "Golf Green Covers",
    category: "Golf & Sports",
    tagline: "Protect your turf investment",
    description: "The Green Shield Ice Cover is specifically engineered to prevent ice formation on golf greens and sports fields during winter months.",
    fullDescription: "This innovative cover system protects your turf from crown hydration, which is the leading cause of winter turf damage in northern climates.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png"
    ],
    features: ["Ice protection", "Winter durability", "Easy removal", "Reusable", "Breathable fabric", "UV stabilized"],
    specifications: { Category: "Golf & Sports", Application: "Golf Greens, Sports Fields", Season: "Winter", "Custom Sizes": "Available" },
    bestseller: false,
    downloads: [
      { name: "Golf Green Covers Brochure", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/cc9aa98a1_GOLFGREENSELLSHEET.pdf" }
    ]
  },
  "curing-blankets": {
    name: "Concrete Curing Blankets",
    category: "Construction & Industrial",
    tagline: "Professional-grade concrete protection",
    description: "Heavy-duty insulated curing blankets designed to maintain optimal concrete curing temperatures in cold weather conditions. Ideal for construction sites, concrete pours, and winter projects.",
    fullDescription: "Our curing blankets provide superior insulation to protect concrete during the critical curing phase. The reflective surface retains heat while the durable construction withstands harsh job site conditions. Perfect for ensuring proper concrete strength development in temperatures as low as -20°F.",
    warranty: 2,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0429f79f7_Tarp.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/cc48f869a_BlackMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6fea5fec5_BlueMesh.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/432f4831c_GreenMesh.png"
    ],
    features: ["Cold Weather Protection", "Heat Retention", "Heavy-Duty Construction", "Multiple Sizes Available", "Reusable", "UV Resistant"],
    specifications: { 
      Category: "Construction & Industrial", 
      Application: "Concrete Curing", 
      "Temperature Range": "Down to -20°F", 
      Material: "Insulated Multi-Layer",
      "Custom Sizes": "Available",
      Colors: "Black, Blue, Green, Grey, Taupe"
    },
    bestseller: false,
    downloads: [],
    variants: [
      { name: "Standard Curing Blanket", features: ["6x6 to 12x50 sizes", "Single-sided insulation", "Grommeted edges"] },
      { name: "Premium Insulated Blanket", features: ["Double-layer insulation", "Enhanced heat retention", "Reinforced corners"] },
      { name: "Heavy-Duty Industrial", features: ["Extra thick padding", "Extreme weather rated", "Commercial grade"] }
    ]
  },
  "pool-insulation": {
    name: "Pool Insulation Systems",
    category: "Pool Accessories",
    tagline: "Maximum energy efficiency for your pool",
    description: "Advanced thermal insulation systems for above-ground and in-ground pools. Insul-Floor and Thermo-Wall products provide superior heat retention, reduce energy costs, and extend your swimming season.",
    fullDescription: "Our pool insulation technology creates a thermal barrier between your pool and the ground or walls, dramatically reducing heat loss. The reflective surface reflects heat back into the pool while the bubble design provides excellent insulation properties. Easy to install and compatible with all pool types.",
    warranty: 5,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b4c94711_Insu-floor.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/204ca0231_Insul.JPG",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f3acaf446_InsulationRoll.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3289fdcbe_Thero-wall.png"
    ],
    features: ["Reduces Heat Loss", "Energy Cost Savings", "Easy Installation", "Compatible with All Pool Types", "Reflective Technology", "Extends Swimming Season"],
    specifications: { 
      Category: "Pool Accessories", 
      Application: "Pool Floor & Walls", 
      "Heat Retention": "Up to 50%",
      Material: "Reflective Foam",
      Installation: "DIY Friendly",
      "Custom Sizes": "Available"
    },
    bestseller: false,
    downloads: [],
    variants: [
      { name: "Insul-Floor", description: "Floor insulation system", features: ["Installs under liner", "Reduces ground heat loss", "Smooth surface protection", "Prevents liner wear"] },
      { name: "Thermo-Wall", description: "Wall insulation system", features: ["Installs between wall & liner", "Reflects heat back to pool", "Easy to cut and fit", "Moisture resistant"] },
      { name: "Complete System", description: "Floor and wall combo", features: ["Maximum insulation", "Best energy savings", "Year-round efficiency", "Professional grade"] }
    ]
  }
};

export default function ProductDetails() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const slug = urlParams.get('slug') || 'in-ground-liners';
  const product = productsData[slug] || productsData['in-ground-liners'];
  
  const [activeImage, setActiveImage] = useState(0);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryModalIndex, setGalleryModalIndex] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  const openGalleryModal = (index) => {
    setGalleryModalIndex(index);
    setGalleryModalOpen(true);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Products", url: "https://covertechind.com/products" },
    { name: product.name, url: `https://covertechind.com/product/${slug}` }
  ]);

  const productSchema = createProductSchema({
    name: product.name,
    description: product.description,
    images: product.images
  });

  return (
    <>
      <SEOHead
        title={`${product.name} - ${product.tagline}`}
        description={`${product.description} ${product.warranty}-year warranty. Made in North America. ASTM certified. Buy from Covertech Industries.`}
        keywords={[product.name, product.category, "pool products", "Covertech", `${product.warranty} year warranty`]}
        ogImage={product.images[0]}
        schema={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, productSchema] }}
      />

      <section className="pt-24 lg:pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to={createPageUrl('Products')} className="hover:text-cyan-600">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-400">{product.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-100 aspect-square">
                {product.bestseller && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-amber-500 text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    Bestseller
                  </div>
                )}
                <img 
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index ? 'border-cyan-500 shadow-lg' : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-cyan-100 text-cyan-700 mb-4">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.slice(0, 6).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-cyan-700 border-cyan-200">
                    {feature}
                  </Badge>
                ))}
              </div>

              <p className="text-slate-600 text-lg mb-6 leading-relaxed">{product.description}</p>
              <p className="text-slate-600 mb-8">{product.fullDescription}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Contact')}>
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Request Quote
                  </Button>
                </Link>
                <Link to={createPageUrl('DesignCenter')}>
                  <Button size="lg" variant="outline" className="px-8 gap-2">
                    <Palette className="w-5 h-5" />
                    Design Custom
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">Warranty Protected</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">ASTM Certified</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-slate-900">Made in NA</p>
                </div>
              </div>

              {/* Downloads Section */}
              {product.downloads && product.downloads.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Product Documentation</h3>
                      <p className="text-sm text-slate-600">Download warranty & installation guides</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {product.downloads.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-cyan-50 hover:from-cyan-50 hover:to-blue-50 border border-slate-200 hover:border-cyan-300 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-cyan-600" />
                          <span className="font-medium text-slate-900">{doc.name}</span>
                        </div>
                        <Download className="w-5 h-5 text-cyan-600 group-hover:translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patterns Section (if available) */}
      {product.patterns && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Patterns</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.patterns.map((pattern) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={pattern.image}
                      alt={pattern.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-medium text-slate-900">{pattern.name}</p>
                    <p className="text-xs text-slate-500">{pattern.collection}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Variants Section (if available) */}
      {product.variants && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.variants.map((variant, index) => (
                <motion.div
                  key={variant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{variant.name}</h3>
                  {variant.warranty && (
                    <Badge className="bg-cyan-100 text-cyan-700 mb-4">{variant.warranty} Warranty</Badge>
                  )}
                  <ul className="space-y-2">
                    {variant.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-cyan-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div 
                key={key}
                className={`flex justify-between py-4 px-6 ${index !== Object.entries(product.specifications).length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="text-slate-500">{key}</span>
                <span className="font-medium text-slate-900">{value}</span>
              </div>
            ))}
          </div>
          
          {/* Warranty Card */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Up to {product.warranty} Years Warranty</h3>
            <p className="text-cyan-100 mb-4">Industry-leading warranty coverage</p>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Material defects covered</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> UV degradation protected</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Seam integrity guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Gallery */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-50 rounded-full mb-4">
                <Image className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold">Installation Gallery</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">See Our Work</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Browse through our collection of professionally installed {product.name.toLowerCase()} showcasing quality craftsmanship and stunning results.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.galleryImages.map((image, index) => (
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
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-8">Contact our team for a personalized quote or use our Design Center to customize your perfect pool product.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                Request Quote
              </Button>
            </Link>
            <Link to={createPageUrl('DesignCenter')}>
              <Button size="lg" variant="outline" className="px-8">
                Design Custom
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryModalOpen && product.galleryImages && (
          <GalleryModal
            images={product.galleryImages}
            initialIndex={galleryModalIndex}
            onClose={() => setGalleryModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}