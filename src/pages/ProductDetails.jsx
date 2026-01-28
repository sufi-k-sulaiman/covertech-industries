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
import PatternGallery from '@/components/products/PatternGallery';

const productsData = {
  "in-ground-liners": {
    name: "In-Ground Pool Liners",
    category: "Pool Liners",
    tagline: "Premium AquaShimmer vinyl liners with custom patterns",
    description: "Premium 30 Mil liners with AquaShimmer effect patterns. Custom designed and fabricated incorporating proprietary sealing technology. Manufactured with attached vinyl over-steps, benches,and sundecks.",
    fullDescription: "Experience unmatched quality with our In-Ground Liners. Engineered with precision and crafted from premium materials, this product delivers exceptional performance and durability that pool owners have trusted for over 35 years. Our commitment to excellence means every liner undergoes rigorous quality testing and meets the highest industry standards.",
    warranty: 25,
    warrantyDetails: {
      title: "25 Year Limited Warranty - Acu-Fit™ In-Ground Vinyl Swimming Pool Liner",
      type: "Non-transferable Limited Warranty for Diving and Non-Diving Pools",
      coverage: "Subject to the disclaimers, limitations and conditions below, COVERTECH INDUSTRIES LIMITED warrants that its Acu-Fit pool liner will not leak due to workmanship that causes seam seal de-lamination for up to 25 years from the date of original purchase. COVERTECH'S obligation is limited to replace or repair (at our option) any liner found defective in workmanship within the warranty period.",
      notCovered: "This Limited Warranty does not include or cover, and specifically excludes, any costs, damages or expenses associated with the repair or replacement of the defective product, or damage to or loss of use of any water, chemicals, products, pool, building component or other property.",
      exclusions: [
        "If the product has not been installed, used or maintained in accordance with COVERTECH'S written instructions and limitations, including any damage caused by improper winterizing procedures.",
        "Use of the liner in any condition other than a residential inground, outdoor swimming pool",
        "Fire, insects, floods, animals, mishandling, chemicals, poor water chemistry, chemical damage due to concentrations under an automatic cover, chemical damage due to salt water systems, chemical stains, shrinkage due to removal of pool water, abrasion due to automatic or manual pool cleaning, ice damage, and microbiological staining",
        "Natural disasters, including floods, lightning, hail, earthquakes, gales, hurricanes, or excessive high winds",
        "Structural movement, settlement, deflection, failure or movement of any pool or supporting material",
        "Tears, punctures, scuff-off prints, discoloration, ground water damage, shipping damage, improper handling, improper installation, or any acts of negligence, abuse, misuse or vandalism",
        "Lack of proper or adequate design, engineering or construction of the pool, building or pool system"
      ],
      conditions: [
        "Register online at www.covertechind.com or fill in the liner Warranty Registration Card completely, sign and mail within thirty (30) days of installation.",
        "Apply the Danger No Diving Decals per the instructions provided.",
        "Ensure the liner is not exposed to extreme heat or cold, chemical abuse or improper chemical maintenance. The installed temperature should be a minimum of 16°C or 60°F.",
        "Do NOT use floating chemical dispensers and do NOT allow un-dissolved chemicals to settle on the liner. Ensure the pool is circulating during chemical dissolution. Have water tested by a professional on regular intervals."
      ],
      proratedSchedule: [
        { years: "Up to 5 years", reduction: "No Charge or Reduction" },
        { years: "6th through 7th", reduction: "33% of Retail List Price" },
        { years: "8th through 12th", reduction: "70% of Retail List Price" },
        { years: "13th through 19th", reduction: "80% of Retail List Price" },
        { years: "20th through 25th", reduction: "90% of Retail List Price" }
      ],
      nonTransferable: "The warranty is issued to the original consumer only and no other person or party may make a claim against this warranty. All warranty claims must be made directly with the manufacturer.",
      contact: {
        address: "26 Dansk Court, Toronto, Ontario M9W 5V8",
        phone: "(416) 640-5590",
        fax: "(416) 642-0686",
        email: "info@covertechind.com"
      }
    },
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
      { name: "2026 Pattern Catalogue", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/af5daff1a_2026LinerCatalogue-Web-R0.pdf", featured: true },
      { name: "25-Season In-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/940bf589f_25SeasonIn-GroundLinerWarranty.pdf" },
      { name: "20-Season On-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5f9b4602_20SeasonOn-GroundLinerWarranty.pdf" },
      { name: "10-Season Above-Ground Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/94ddb6eba_10SeasonAbove-GroundLinerWarranty.pdf" },
      { name: "Installation Instructions", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ce2f38147_CVT-IngroundLinerMaintenanceandInstallation.pdf" },
      { name: "Care & Maintenance Guide", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fcfa016dc_CVT-LinerCareMaintenance.pdf" }
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/410142be5_20240518_125429.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e1fba1d5_20240518_151820.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/35289ddf1_20240518_151835.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f74d47fc_AllBlue-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2c68702dd_BayviewWD-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b9f5b29a8_BayviewWD-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a765f5e4e_BayviewWD-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/442cb4d81_BlueBeachPebble_004.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/534873d93_BlueBeachPebble_005.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/dc0de6121_BlueBeachPebble-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/10b05a6e0_BlueMaui-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b6bf078ee_Butterfly1.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/34689cb4d_Butterfly-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f37c4d890_Butterfly-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/584ff1ddf_butterfly.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2bf8d5f05_Canterbury-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/df6bfb339_Canterbury-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b9c629c2f_Carnival-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e6b16d3a_Carnival-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f28985cd0_Carnival-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c90c9f4a9_Carrara-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/61199a218_Carrara-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ebc80cc13_Esagono_Freeform_002.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/853c8af66_Esagono_Freeform_007.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0bbbd463b_GreystoneRiverinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/393f7d406_HARMONY-NOWATER.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/401b5d2ad_HDElectric-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15bd58a13_HDEAntigua_012.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/03663726d_HDEAntigua_014.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e3989b8f7_Maui-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c513c236e_OceanMidnight-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2d13b3263_OceanMidnight-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eaf710fc8_OceanMidnight_002.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/29133b79e_OceanMidnight_003.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5ae3051ee_OceanMidnight.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/79e82ae48_OxfordHDElectric.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c20f8dd03_Oxford-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/03ebaf6f4_Oxford-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f3432461c_Oxford-03.JPG",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c9c24f6b6_OysterBayinstallfinal.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3fa967c11_Oysterbay-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7cdbb3895_RaleighBB-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3a71b795d_RaleighWB-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b7821e9e6_Raleigh_003copy.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/60c52adf8_Raleigh_BlueBeachPebble_composite.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fe28b2106_RaleignBeachPebble.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c411218e0_RiverWallinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b5ad8cd74_RiverWhite-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/921ea1656_RiverWhite-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/63175bc2f_SANDSTONE1.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ff6f2cfe3_Sandstone-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/920571967_Sandstone-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5ded5467f_SapphirePebble.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5d7b5955_summerRiverinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e3e2d61a6_SunburstOysterBayinstallfinal.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/44bdcd4a5_WhiteDiffusion-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/367ee6341_WhiteDiffusion-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8637b2a4a_WhiteBeachPebble_009.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eb0ffad28_WhiteBeachPebble_011copy.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/457b00097_WhiteBeachPebble_Composite.jpg"
    ],
    patterns: [
      { 
        name: "Butterfly", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4f5b14b1f_Butterfly.jpg", 
        tier: "platinum-plus",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2a9e40a86_Butterfly-03.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1355f5e7c_Butterfly-04.jpg"
        ]
      },
      { 
        name: "Esagono", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1c3b1ba72_Esagono.jpg", 
        tier: "platinum-plus",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1d1847a43_Esagono_Freeform_002.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e4d77751_Esagono_Freeform_007.jpg"
        ]
      },
      { 
        name: "Harmony Gold HDE", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b24218ff9_HarmonyGold-HDE.jpg", 
        tier: "platinum-plus",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9eeefdc81_HARMONY-NOWATER.jpg"
        ]
      },
      { 
        name: "Twilight", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/867ae4129_Twilight.jpg", 
        tier: "platinum-plus"
      },
      { 
        name: "Carnival", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/91640be38_Carnival.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e223c261b_Carnival-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/aab823049_Carnival-02.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0acfffa3f_Carnival-03.jpg"
        ]
      },
      { 
        name: "Canterbury", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1235fa641_Canterbury.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0cf3e1044_Canterbury-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eef884101_Canterbury-02.jpg"
        ]
      },
      { 
        name: "HD Antigua", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b574d1bd_HDAntigua.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/63a3043f4_HDAntigua-01.jpeg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d5a8a1cf1_HDEAntigua_012.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1beae7db6_HDEAntigua_014.jpg"
        ]
      },
      { 
        name: "Gladstone", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e7ef00922_Gladstone.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0be27b714_Gladstone-01.png"
        ]
      },
      { 
        name: "Celest", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/82ef3daba_Celest.jpg", 
        tier: "platinum"
      },
      { 
        name: "Tahoe", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/370383aaa_Tahoe.jpg", 
        tier: "platinum"
      },
      { 
        name: "Garden", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3580d7287_Garden.jpg", 
        tier: "platinum"
      },
      { 
        name: "Sapphire", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9cefde4f9_Sapphire.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f2c66e0cd_SapphirePebble.jpg"
        ]
      },
      { 
        name: "Sunburst Oyster Bay", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6bc0f75ad_SunburstOysterBay.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/029b5531e_SunburstOysterBayinstallfinal.jpg"
        ]
      },
      { 
        name: "Oyster Bay", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d6fd36b0a_OysterBay.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0db7b1cd9_OysterBayinstallfinal.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c297207e9_Oysterbay-01.jpg"
        ]
      },
      { 
        name: "Oxford HD Electric", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/86cfd7e9a_OXFORDHDELECTRIC.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c376dbbd2_Oxford-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/075baf271_Oxford-02.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/747123332_Oxford-03.JPG"
        ]
      },
      { 
        name: "HD Electric", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/07fc1b793_HDELECTRIC.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/571a39603_HDElectric-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/89ee2f35a_HDElectric-02.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/383733282_HDElectric-03.jpg"
        ]
      },
      { 
        name: "Bayview White Diffusion", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5a67f1612_BayviewWhiteDiffusion.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d4baf72b5_BayviewWD-02.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/60c749ddc_BayviewWD-03.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1447302c4_BayviewWD-04.jpg"
        ]
      },
      { 
        name: "White Diffusion", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b2b3f0178_WhiteDiffusion.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c793728a5_WhiteDiffusion-03.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/41fd87db6_WhiteDiffusion-04.jpg"
        ]
      },
      { 
        name: "Grey Maui", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d73c2c8d9_GreyMaui.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2c88d5791_GrayMaui-01.jpg"
        ]
      },
      { 
        name: "Blue Maui", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ac2618ef1_BlueMaui.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f9cd91406_BlueMaui-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6e40a45d6_Maui-02.jpg"
        ]
      },
      { 
        name: "Greystone River White", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/97c559cf9_GreystoneRiverWhite.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/80b33e08e_GreystoneRiverinstall.jpg"
        ]
      },
      { 
        name: "River White", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8a1e62d22_RiverWhite.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bc2072771_RiverWhite-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c176a55c2_RiverWhite-02.jpg"
        ]
      },
      { 
        name: "Summer River White", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/296e83210_SummerRiverWhite.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d8e684421_summerRiverinstall.jpg"
        ]
      },
      { 
        name: "Ocean Midnight", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf54bc3ba_OceanMidnight.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/65f71a98b_OceanMidnight_002.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8f8ed7ed9_OceanMidnight_003.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b4ee72c83_OceanMidnight.jpg"
        ]
      },
      { 
        name: "Carrara Marble", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e59feeea_CarraraMarble.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a92251539_Carrara-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e26bab066_Carrara-02.jpg"
        ]
      },
      { 
        name: "Raleigh Blue Beach Pebble", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0fdb87fd3_RaleighBlueBeachPebble.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/78bdc1e9c_RaleighBB-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ba4e3494d_Raleigh_BlueBeachPebble_composite.jpg"
        ]
      },
      { 
        name: "Blue Beach Pebble", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/49bca1208_BlueBeachPebble.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5be7e0f43_BlueBeachPebble_004.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ec9700c39_BlueBeachPebble_005.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0185c54f6_BlueBeachPebble-01.jpg"
        ]
      },
      { 
        name: "Sandstone", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a7f229630_Sandstone.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/846455a5b_Sandstone-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/381543a8f_Sandstone-02.jpg"
        ]
      },
      { 
        name: "Raleigh White Beach Pebble", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a149dfe63_RaleighWhiteBeachPebble.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fe4b45353_RaleighWB-01.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9f01e8e7b_Raleigh_003copy.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9d3e2a022_RaleignBeachPebble.jpg"
        ]
      },
      { 
        name: "White Beach Pebble", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3d44fed9a_WhiteBeachPebble.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/973340eba_WhiteBeachPebble-02.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/41dcdf212_WhiteBeachPebble-03.jpg",
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e7c7ad0e_WhiteBeachPebble-04.jpg"
        ]
      },
      { 
        name: "White", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bf175feaa_White.jpg", 
        tier: "platinum"
      },
      { 
        name: "Blue", 
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/415691248_Blue.jpg", 
        tier: "platinum",
        gallery: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/db6b5dd6a_AllBlue-01.jpg"
        ]
      },
    ]
  },
  "safety-covers": {
    name: "Pool Safety Covers",
    category: "Safety Covers",
    tagline: "ASTM F1346-91 certified protection",
    description: "Premium ASTM-certified safety covers engineered for maximum protection and durability. Our safety covers meet or exceed ASTM F1346-91 standards, providing unmatched safety for your pool during off-season months.",
    fullDescription: "Designed to support the weight of children, pets, and adults. Enhances the appearance and value of your outdoor space. Made from high-strength UV-resistant materials. Meets or exceed ASTM safety standards. Results in cleaner pool opening in the spring. Built to withstand snow loads, ice, wind, and harsh winter conditions. Helps protect the pool structure, liner & coping. Manufactured to fit any pool shape or size. Available in mesh or solid options, multiple colors, and fabric grades.",
    warranty: 30,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2e2d0d292_02.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9ccd62a77_64922LEA.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7ce8b575e_attachment1669383714640.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/db941bb08_attachment1669391953454.jpg"
    ],
    features: ["ASTM F1346-91 Certified", "Up to 30-Year Warranty", "Custom-Fit Design", "Multiple Anchoring Systems", "Winter-Ready Protection"],
    specifications: { Category: "Safety Covers", Certification: "ASTM F1346-91", Types: "Mesh & Solid", Warranty: "Up to 30 Years", Installation: "Professional Recommended", Origin: "North America" },
    bestseller: true,
    downloads: [
      { name: "Safety Covers Brochure 2024", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/59cb887bb_2024SafetyCoversBrochure.pdf", featured: true },
      { name: "Safety Cover Warranty 2025", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9876ef1df_CVT-SafetyCoverWarranty-2025.pdf" },
      { name: "Measuring Form", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a24979399_CVTSafey-Cover-Form.pdf" },
      { name: "Installation Instructions", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f1acc1b5e_CVT-SafetyCoverInstructions.pdf" },
      { name: "Care & Maintenance Guide", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/37f0becda_CVT-SafetyCoverCareGuide.pdf" }
    ],
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2e2d0d292_02.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9ccd62a77_64922LEA.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7ce8b575e_attachment1669383714640.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/db941bb08_attachment1669391953454.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4e7e9539a_BlackStripeCover.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a7ba8e524_bumper.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/16e9324fa_CustomBox.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4901f214e_edge.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/81a0b3240_Henry-Cover.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/32c6d2963_IMG_2599.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/976e07681_IMG_4493_Edited.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/39f86d777_IMG_5751.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f247bc1f7_IMG-20251016-WA0001.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/72232cc91_IMG-20251016-WA0004.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1a537bbee_IMG-20251020-WA0002.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/21454b808_IMG-20251020-WA0003.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/921369b82_Latif.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/108b08a04_LWCover-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/501eda757_LWCover-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3fdf75e83_MAgnolia-Tag2050.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3d85f675b_MunroMclean-Edited.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/33f24e1e4_original-1FE66A3F-D38C-4890-A084-2B6AE8832726.jpeg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a14743f19_Prestige-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/dc76cab70_Prestige-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d03c944cc_Prestige-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e81a6513f_ProconCover.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f71edf4f8_PZ-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/621646ef7_PZ-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b4f04d624_TaupeCover.jpg"
    ],
    variants: [
      {
        name: "Premier Mesh Safety Cover",
        warranty: "18 Years (2 Years Full)",
        features: ["500 psi Burst Strength", "95%+ Sun Block", "Water Seepage Design", "Inhibits Algae Growth", "ASTM F1346-91 Certified"],
        description: "Allows water to seep through, preventing danger from standing water. Premium mesh construction."
      },
      {
        name: "Deluxe Mesh Safety Cover",
        warranty: "20 Years (3 Years Full)",
        features: ["670 psi Burst Strength", "99% Sun Block", "Tighter Weave", "Less Debris", "Superior Abrasion Resistance"],
        description: "Superior strength with cleaner water and enhanced durability. Best for heavy debris areas."
      },
      {
        name: "Commercial Mesh Cover",
        warranty: "30 Years (4 Years Full)",
        features: ["760 psi Burst Strength", "93%+ Sun Block", "Basket Weave", "Highest Break Strength", "Commercial Grade"],
        description: "The highest break strength mesh available. Perfect for commercial pools and heavy-use applications."
      },
      {
        name: "LW Solid Safety Cover",
        warranty: "15 Years (3 Years Full)",
        features: ["100% Sun Block", "7.5oz Copolymer", "Stress Crack Resistant", "Optional Mesh Drain Panel"],
        description: "100% barrier against sunlight and debris. High-tech copolymer material eliminates stress cracks."
      },
      {
        name: "Solid Safety Cover",
        warranty: "15 Years (2 Years Full)",
        features: ["100% Sun Block", "12oz PVC Coated", "Cold Crack -22°F", "Optional Mesh Drain Panel", "Premium Materials"],
        description: "Heavy-duty 12oz PVC coated material. Available with optional mesh drain panel for water management."
      }
    ],
    safetyColors: ["Green", "Grey", "Blue", "Taupe", "Black"]
  },
  "solar-covers": {
    name: "Solar Pool Covers",
    category: "Solar Covers",
    tagline: "Reduce heating costs by up to 70%",
    description: "Premium solar covers and systems designed to maximize your pool's efficiency. Reduce heating costs by up to 70%, minimize evaporation, and extend your swimming season with our innovative solar solutions.",
    fullDescription: "Solar covers are one of the most cost-effective investments you can make for your pool, providing year-round benefits and substantial savings on heating and chemical costs.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9d4b0311e_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b01955c2_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/db6908d7d_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a12858356_image.png"
    ],
    features: ["Up to 70% Heating Cost Reduction", "Prevents Night Heat Loss", "Reduces Evaporation & Chemicals", "Keeps Pool Clean", "Raises Water Temperature", "Multiple Options Available"],
    specifications: { Category: "Solar Covers", "Heat Reduction": "Up to 70%", Types: "Solar-Extreme™, Thermo Shield™", "Custom Sizes": "Available" },
    bestseller: true,
    downloads: [
      { name: "Solar Blanket Warranty", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/042934906_SolarWarranty-CVT-English.pdf" },
      { name: "Solar Cover - What to Know", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/6c47e8eb2_CVTSolarCover-WhattoKnow.pdf" }
    ],
    installationGuide: {
      title: "Solar Blanket Installation & Use",
      installation: "Your solar blanket must be installed on the pool with the bubble side down. If trimming is necessary, allow the blanket to rest on the pool until the packing folds have straightened. The initial cut should be slightly larger due to sun exposure. Precision trimming may be necessary to ensure a perfect fit. Be very careful not to cut the liner if you have a vinyl-lined pool. The blanket should not overlap the pool sidewall to prevent wind infiltration under the blanket.",
      removal: "To remove the blanket, two people can pull 3 to 4 feet at a time and fan-fold the blanket in an accordion fashion outside of the pool. To avoid handling damage, do not drag across coping or rough deck. Once off the pool, the blanket must be kept in the shade or covered with a protective cover sheet. An uncovered solar blanket (when not in use) exposed to the sun will result in extensive damage to the blanket.",
      maintenance: [
        "Monitor the level of chlorine below 3 parts per million (PPM). When shocking the pool, keep the blanket off for at least 24 hours.",
        "Damage caused by excessive chlorine exposure (patches of brittle, flaked bubbles) is excluded from this warranty.",
        "You can clean your cover using a mild detergent, water, and a soft brush. A clean cover will perform much better.",
        "Store your cover away from rodents and avoid areas where the temperature can reach 120°F."
      ],
      performance: "When used properly, your solar blanket will provide maximum heat by day and insulate by night. The temperature will rise by 10°F or more. The blanket will keep the pool clean, reduce chemical usage and result in water conservation."
    },
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
    name: "Superior Beaded & Winter Pool Cover",
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
    name: "Above-Ground Pool Liners",
    category: "Pool Liners",
    tagline: "Premium patterns with industry-leading warranty",
    description: "Classic full-print patterns with UV and chemical resistant materials. Available in Lancashire Wall with Blue Beach Floor pattern, designed specifically for above-ground pools.",
    fullDescription: "Our above-ground liners feature heat-sealed floors and Unibead design for easy installation. Made with 18 mil thickness (±10%) for durability and long-lasting performance. Available in round sizes from 12' to 27' and oval configurations, with custom sizes available upon request.",
    warranty: 10,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3082ce0f7_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d3bbf53c6_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/4a36d4fd3_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/76b2dc29f_image.png"
    ],
    features: ["10-Year Warranty, (1-Year Full)", "Heat Sealed Floors", "Unibead or Overlap Design", "18 Mil Thickness", "UV & Chemical Resistant", "Custom Sizes Available"],
    specifications: {
      Category: "Pool Liners",
      Thickness: "18 Mil (±10%)",
      "Bead Type": "Unibead or Overlap",
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
    galleryImages: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/410142be5_20240518_125429.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e1fba1d5_20240518_151820.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/35289ddf1_20240518_151835.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f74d47fc_AllBlue-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2c68702dd_BayviewWD-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b9f5b29a8_BayviewWD-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a765f5e4e_BayviewWD-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/442cb4d81_BlueBeachPebble_004.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/534873d93_BlueBeachPebble_005.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/dc0de6121_BlueBeachPebble-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/10b05a6e0_BlueMaui-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b6bf078ee_Butterfly1.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/34689cb4d_Butterfly-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f37c4d890_Butterfly-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/584ff1ddf_butterfly.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2bf8d5f05_Canterbury-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/df6bfb339_Canterbury-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b9c629c2f_Carnival-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7e6b16d3a_Carnival-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f28985cd0_Carnival-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c90c9f4a9_Carrara-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/61199a218_Carrara-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ebc80cc13_Esagono_Freeform_002.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/853c8af66_Esagono_Freeform_007.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0bbbd463b_GreystoneRiverinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/393f7d406_HARMONY-NOWATER.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/401b5d2ad_HDElectric-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15bd58a13_HDEAntigua_012.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/03663726d_HDEAntigua_014.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e3989b8f7_Maui-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c513c236e_OceanMidnight-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/2d13b3263_OceanMidnight-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eaf710fc8_OceanMidnight_002.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/29133b79e_OceanMidnight_003.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5ae3051ee_OceanMidnight.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/79e82ae48_OxfordHDElectric.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c20f8dd03_Oxford-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/03ebaf6f4_Oxford-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f3432461c_Oxford-03.JPG",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c9c24f6b6_OysterBayinstallfinal.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3fa967c11_Oysterbay-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/7cdbb3895_RaleighBB-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3a71b795d_RaleighWB-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b7821e9e6_Raleigh_003copy.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/60c52adf8_Raleigh_BlueBeachPebble_composite.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/fe28b2106_RaleignBeachPebble.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c411218e0_RiverWallinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b5ad8cd74_RiverWhite-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/921ea1656_RiverWhite-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/63175bc2f_SANDSTONE1.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/ff6f2cfe3_Sandstone-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/920571967_Sandstone-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5ded5467f_SapphirePebble.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e5d7b5955_summerRiverinstall.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/e3e2d61a6_SunburstOysterBayinstallfinal.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/44bdcd4a5_WhiteDiffusion-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/367ee6341_WhiteDiffusion-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/8637b2a4a_WhiteBeachPebble_009.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/eb0ffad28_WhiteBeachPebble_011copy.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/457b00097_WhiteBeachPebble_Composite.jpg"
    ],
    variants: [
      { name: "48″ Unibead", features: ["Requires 4″ cove", "Easy installation", "Standard wall height"] },
      { name: "52″ Unibead", features: ["Requires 6″ cove", "Extended wall height", "Enhanced durability"] }
    ],
    installationGuide: {
      title: "Above Ground Liner Installation Instructions",
      recommendedItems: [
        "Screwdriver",
        "Sharp nail or ice pick",
        "Tamping tool",
        "Industrial vacuum or household vacuum (filter bag removed)",
        "Utility knife",
        "2\" gray duct tape with non-asphaltic adhesive",
        "Masking tape",
        "Garden hose"
      ],
      poolBottomPrep: [
        "Spread 2\" layer of brick sand over the entire pool foundation area inside the base rails. Use a rake to make the sand flat and smooth. Tamp sand to help reduce foot prints. Instead of brick sand, you can use ARMOR SHIELD® floor padding.",
        "With the brick sand, make a curved cove about 8\" high and 8\" wide all around the bottom of the pool wall on the inside. Pack firmly into shape. Pre-cast Styrofoam cove can also be used."
      ],
      linerInstallation: [
        "Set the liner in place.",
        "Place the closed liner carton in the center of the pool.",
        "Open the carton. DO NOT use anything sharp to open the carton.",
        "Unpack and unfold the liner and spread it out in the sun to warm up.",
        "Inspect all seams and surfaces for holes.",
        "Spread out liner. The seam where wall meets floor should be centered on the cove at the base of the wall. The other seams will form straight lines across the bottom of the pool. If seams appear to have flaps, check to see if the correct side is up.",
        "Smooth out all wrinkles in the bottom.",
        "If you have a beaded liner, refer to \"Beaded Liner Installation\". If you have a unibead liner, refer to \"Unibead Liner Installation\".",
        "Lift the sides of the liner and drape them over the top of the pool wall.",
        "Fasten liner to the top of the wall with plastic coping. Let the liner hang slack for now. Do not pull liner tight.",
        "Refer to \"Optional Step to Eliminate Wrinkles\" section or continue with Step 12.",
        "Start filling pool with water. As the pool fills, work out the wrinkles and smooth the liner to the wall. Remove the plastic coping around the top edge of the wall one piece at a time and adjust the liner. Keep smoothing out the wrinkles.",
        "Do not install face-plates, inlets, light fixtures, etc. until water reaches 3\" below each opening. Premature installation might result in the liner taring away from the opening due to stretching as the water level increases.",
        "Proceed filling pool until water reaches desired level.",
        "Attach \"No Diving\" stickers to your liner two inches above the water level. \"No Diving\" stickers must be clearly visible from all angles around pool."
      ],
      unibeadInstallation: {
        description: "You have purchased a deluxe liner using Unibead construction. The patented Unibead design enables you to convert your overlap pool to an upgraded tile design or can also be used on an existing beaded pool.",
        overlapConversion: "A traditional overlap liner is installed by draping the top of the liner over the pool wall and securing it with a plastic coping strip. Your Unibead liner is designed with a \"J-Hook\" sealed to the top of the liner. To install, simply attached the \"J-Hook\" to the top of the pool wall. Once your liner is in place, continue with installation steps.",
        beadedApplication: "If you are using your Unibead liner for a beaded application, you will need to peel the \"J-Hook\" from the top of the bead. Once the \"J-Hook\" is removed, simply insert the beaded edge of the liner into the bead receiver which is attached to the top of your pool wall."
      },
      beadedInstallation: [
        "Fasten the liner in place (beaded liner only). This step applies only if you have a beaded liner.",
        "Lift the sides of the liner and insert the beaded edge into the liner retainer on the TOP edge.",
        "Continue with installation steps."
      ],
      wrinkleElimination: [
        "To remove air from behind the liner, which prevents wrinkles, insert a vacuum cleaner hose through the skimmer hole in the pool wall behind the liner. To minimize vacuum loss, seal the opening around the hose and the water inlet using card board and masking tape.",
        "Turn vacuum cleaner on. While vacuum is running, you should be adjusting the liner with short tugs to eliminate wrinkles. If you have trouble shifting the liner into position, shut the vacuum off for a few minutes. You should then be able to adjust the trouble area before continuing with the vacuum.",
        "Start filling the pool with water. The vacuum cleaner should continue to run until the water level nears the top. Make sure the vacuum cleaner hose is above the water level at all times.",
        "Continue with installation steps."
      ]
    }
  },
  "steel-kits": {
    name: "Steel Pool Kits",
    category: "Accessories",
    tagline: "Professional-grade construction kits",
    description: "Premium steel pool kits, manufactured by Malach Metals – an industry leader in metal fabrication technologies. Using Heavy-duty 14-gauge G235 galvanized steel, these panels can be curved to any radius, and staircases, ledges, and benches can be fabricated to spec or purchased from our standard offering.",
    fullDescription: "We also welcome custom inquiries for unique, one-of-a-kind builds. Give us a call and we’ll introduce you to this innovative pool-kits solutions.",
    warranty: 25,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/dd3767799_Steelkit-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d7552b103_Steelkit-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b3120339d_Steelkit-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/70f678ca6_Steelkit-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f771b20aa_Steelkit-05.png"
    ],
    features: ["Heavy Duty Construction", "Corrosion Resistant", "Easy Installation", "Professional Grade", "Complete Kit", "Made in North America"],
    specifications: { Category: "Pool Steel Kits", Material: "14-gauge G235 galvanized steel", Coating: "Standard and Custom", Origin: "North America" },
    bestseller: false,
    downloads: []
  },
  "golf-covers": {
    name: "Golf Green Covers",
    category: "Golf & Sports",
    tagline: "Protect your turf investment",
    description: "The Green Shield Ice Cover is specifically engineered to prevent ice formation on golf greens and sports fields during winter months.",
    fullDescription: "This innovative cover system protects your turf from crown hydration, which is the leading cause of winter turf damage in northern climates.",
    warranty: 7,
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png"
    ],
    features: ["Ice protection", "Winter durability", "Easy removal", "Reusable", "Breathable fabric", "UV stabilized"],
    specifications: { Category: "Golf & Sports", Application: "Golf Greens, Sports Fields", Season: "Winter", "Custom Sizes": "Available" },
    bestseller: false,
    downloads: [
      { name: "Golf Green Covers Brochure", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/cc9aa98a1_GOLFGREENSELLSHEET.pdf" }
    ],
    installationGuide: {
      title: "Supreme Green Turf Cover - When to Use & Remove",
      fullWinter: {
        title: "Full Winter Conditions (consistent subfreezing temperatures over 4-6 months)",
        instructions: ["The turf cover should be installed before the ground freezes, and after the turf is dormant.", "The cover can be removed when temperatures are consistently above freezing and there is no longer a risk of frost."]
      },
      moderateWinter: {
        title: "Moderate Winter Conditions (temperature drops below freezing for short periods over the winter months)",
        instructions: ["Install the Supreme Green Turf Cover just before the onset of severe conditions.", "Remove the cover when there is no longer a risk of frost or wind desiccation."]
      },
      seeding: {
        title: "Seeding and Germination",
        instructions: ["Use the Supreme Green Turf Cover immediately following seeding to enhance root development and germination.", "Remove the cover when there is enough uniform growth to require a first mowing."]
      },
      extending: {
        title: "Extending Your Season",
        instructions: ["Get an early start on your season by using our Supreme Green Turf Cover to accelerate green-up. Install the cover upon the onset of spring weather.", "Remove the cover as for seeding and germination."]
      },
      installation: {
        title: "Installation Instructions",
        steps: [
          "Installation: Lay the turf cover over the green. Secure with supplied pegs every three feet around the perimeter (insert the pegs through the hem).",
          "For windy conditions: Secure with additional lines of pegs down the middle seams.",
          "For extremely windy conditions: Run a rope line (or lines) on top of the turf cover, over the middle area.",
          "Removal: Timing of removal depends on application and weather conditions.",
          "Storage: To prolong the life of your turf cover, store it away from the sun in the storage bag provided."
        ]
      }
    }
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
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d0ddf1098_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/50dcbcca9_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/93a6600f0_image.png"
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
    downloads: [
      { name: "2024 Curing Blanket Brochure", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5d03ac9ab_2024CuringBlanketBrochure.pdf" }
    ],
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
    downloads: [
      { name: "Thermo-Floor Literature", url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/10699896d_PoolInsulation-compressed.pdf" }
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
              {slug === 'safety-covers' ? (
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Designed to support the weight of children, pets, and adults.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Enhances the appearance and value of your outdoor space.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Made from high-strength UV-resistant materials.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Meets or exceed ASTM safety standards.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Results in cleaner pool opening in the spring.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Built to withstand snow loads, ice, wind, and harsh winter conditions.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Helps protect the pool structure, liner & coping.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Manufactured to fit any pool shape or size.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span>Available in mesh or solid options, multiple colors, and fabric grades.</span>
                  </li>
                </ul>
              ) : (
                <p className="text-slate-600 mb-8">{product.fullDescription}</p>
              )}

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
                      <Link
                        key={idx}
                        to={createPageUrl(`PDFViewer?url=${encodeURIComponent(doc.url)}&title=${encodeURIComponent(doc.name)}`)}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all group ${
                          doc.featured
                            ? 'bg-blue-900 hover:bg-blue-800 border-2 border-blue-700'
                            : 'bg-gradient-to-r from-slate-50 to-cyan-50 hover:from-cyan-50 hover:to-blue-50 border border-slate-200 hover:border-cyan-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className={`w-5 h-5 ${doc.featured ? 'text-white' : 'text-cyan-600'}`} />
                          <span className={`font-medium ${doc.featured ? 'text-white' : 'text-slate-900'}`}>{doc.name}</span>
                        </div>
                        <Download className={`w-5 h-5 ${doc.featured ? 'text-white' : 'text-cyan-600'} group-hover:translate-y-0.5 transition-transform`} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Installation Guide Section */}
              {product.installationGuide && (
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{product.installationGuide.title}</h3>

                  {/* Winter Cover Guide */}
                  {slug === 'winter-covers' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">General Preparations</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.generalPrep.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Above-Ground Pool Installation</h4>
                        <ol className="space-y-2">
                          {product.installationGuide.aboveGround.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">In-Ground Pool Installation</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.inGround.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Solar Cover Guide */}
                  {slug === 'solar-covers' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Installation</h4>
                        <p className="text-slate-700 leading-relaxed">{product.installationGuide.installation}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Removal</h4>
                        <p className="text-slate-700 leading-relaxed">{product.installationGuide.removal}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Important Maintenance Tips</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.maintenance.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-cyan-50 rounded-xl p-6">
                        <h4 className="font-semibold text-cyan-900 mb-2">Performance</h4>
                        <p className="text-cyan-800">{product.installationGuide.performance}</p>
                      </div>
                    </div>
                  )}

                  {/* Golf Cover Guide */}
                  {slug === 'golf-covers' && (
                    <div className="space-y-8">
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">{product.installationGuide.fullWinter.title}</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.fullWinter.instructions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">{product.installationGuide.moderateWinter.title}</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.moderateWinter.instructions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">{product.installationGuide.seeding.title}</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.seeding.instructions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">{product.installationGuide.extending.title}</h4>
                        <ul className="space-y-2">
                          {product.installationGuide.extending.instructions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-1" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">{product.installationGuide.installation.title}</h4>
                        <ol className="space-y-2">
                          {product.installationGuide.installation.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
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
            {/* Platinum Plus Patterns */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">2026 Platinum Plus Patterns</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {product.patterns.filter(p => p.tier === 'platinum-plus').map((pattern) => (
                  <PatternGallery key={pattern.name} pattern={pattern} />
                ))}
              </div>
            </div>

            {/* Platinum Patterns */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">2026 Platinum Patterns</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {product.patterns.filter(p => p.tier === 'platinum').map((pattern) => (
                  <PatternGallery key={pattern.name} pattern={pattern} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Variants Section (if available) */}
      {product.variants && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Options</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.variants.map((variant, index) => (
                <motion.div
                  key={variant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{variant.name}</h3>
                  {variant.warranty && (
                    <Badge className="bg-cyan-100 text-cyan-700 mb-3 text-xs">{variant.warranty}</Badge>
                  )}
                  {variant.description && (
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{variant.description}</p>
                  )}
                  <ul className="space-y-2 mb-4">
                    {variant.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Additional details for Insul-Floor */}
                  {variant.advantages && (
                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="font-semibold text-slate-900 text-sm mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {variant.advantages.map((adv) => (
                          <li key={adv} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {variant.specifications && (
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h4 className="font-semibold text-slate-900 text-sm mb-3">Specifications</h4>
                      <div className="space-y-2 text-xs">
                        {Object.entries(variant.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-slate-600">{key}:</span>
                            <span className="text-slate-900 font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {variant.installation && (
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h4 className="font-semibold text-slate-900 text-sm mb-3">Installation Steps</h4>
                      <ol className="space-y-2">
                        {variant.installation.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="font-semibold text-cyan-500 flex-shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Safety Cover Colors (if available) */}
      {slug === 'safety-covers' && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Available Colors</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden mb-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/031b3bbe7_GreenMesh.png"
                    alt="Green Mesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-900">Green</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden mb-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/09d3933b4_GreyMesh.png"
                    alt="Grey Mesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-900">Grey</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden mb-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/bd76c5987_BlueMesh.png"
                    alt="Blue Mesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-900">Blue</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden mb-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/5f3d20276_TaupeMesh.png"
                    alt="Taupe Mesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-900">Taupe</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden mb-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/c4494b8d4_BlackMesh.png"
                    alt="Black Mesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-900">Black</span>
              </div>
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
          {slug !== 'steel-kits' && slug !== 'pool-insulation' && slug !== 'curing-blankets' && (
            <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Up to {product.warranty} Years Warranty</h3>
              <p className="text-cyan-100 mb-4">Industry-leading warranty coverage</p>
              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Material defects covered</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> UV degradation protected</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4" /> Seam integrity guaranteed</div>
              </div>
            </div>
          )}

          {/* Detailed Warranty Information */}
          {product.warrantyDetails && (
            <div className="mt-8 border-t border-slate-200 pt-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{product.warrantyDetails.title}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Warranty Type</h3>
                  <p className="text-slate-700">{product.warrantyDetails.type}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Coverage</h3>
                  <p className="text-slate-700 leading-relaxed">{product.warrantyDetails.coverage}</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">What's Not Covered</h3>
                  <p className="text-amber-800 mb-4">{product.warrantyDetails.notCovered}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Exclusions</h3>
                  <ul className="space-y-2">
                    {product.warrantyDetails.exclusions.map((exclusion, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Warranty Conditions</h3>
                  <ol className="space-y-3">
                    {product.warrantyDetails.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Pro-Rated Warranty Schedule</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-slate-300">
                          <th className="px-4 py-3 font-semibold text-slate-900">Period</th>
                          <th className="px-4 py-3 font-semibold text-slate-900">Warranty Coverage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.warrantyDetails.proratedSchedule.map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="px-4 py-3 text-slate-700">{row.years}</td>
                            <td className="px-4 py-3 text-slate-700 font-medium">{row.reduction}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Non-Transferable Warranty</h3>
                  <p className="text-slate-700 mb-4">{product.warrantyDetails.nonTransferable}</p>

                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-slate-700">
                      <p><span className="font-medium">Address:</span> {product.warrantyDetails.contact.address}</p>
                      <p><span className="font-medium">Phone:</span> {product.warrantyDetails.contact.phone}</p>
                      <p><span className="font-medium">Fax:</span> {product.warrantyDetails.contact.fax}</p>
                      <p><span className="font-medium">Email:</span> <a href={`mailto:${product.warrantyDetails.contact.email}`} className="text-cyan-600 hover:underline">{product.warrantyDetails.contact.email}</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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