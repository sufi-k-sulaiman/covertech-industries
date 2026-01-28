import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead, { createBreadcrumbSchema } from '@/components/seo/SEOHead';
import PageHero from '@/components/ui/PageHero';

const galleryCategories = [
  {
    category: "Pool Liners",
    images: [
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
    ]
  },
  {
    category: "Safety Covers",
    images: [
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
    ]
  },
  {
    category: "Solar Covers",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/9d4b0311e_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b01955c2_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/db6908d7d_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/a12858356_image.png"
    ]
  },
  {
    category: "Winter Covers",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/f0ddd1c7e_WinterCover-WinterCover.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/1de8c9711_WinterCover-Beaded-02.jpg"
    ]
  },
  {
    category: "Steel Pool Kits",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/dd3767799_Steelkit-01.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d7552b103_Steelkit-02.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/b3120339d_Steelkit-03.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/70f678ca6_Steelkit-04.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f771b20aa_Steelkit-05.png"
    ]
  },
  {
    category: "Golf & Sports",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6930eac464ae2f0c94b83c34/997e37872_image.png"
    ]
  },
  {
    category: "Pool Insulation",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/1b4c94711_Insu-floor.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/204ca0231_Insul.JPG",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/f3acaf446_InsulationRoll.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/3289fdcbe_Thero-wall.png"
    ]
  },
  {
    category: "Curing Blankets",
    images: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/0429f79f7_Tarp.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/d0ddf1098_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/50dcbcca9_image.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/93a6600f0_image.png"
    ]
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = galleryCategories.flatMap(cat => 
    cat.images.map(img => ({ url: img, category: cat.category }))
  );

  const filteredImages = selectedCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  const categories = ['All', ...galleryCategories.map(c => c.category)];

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://covertechind.com" },
    { name: "Gallery", url: "https://covertechind.com/gallery" }
  ]);

  return (
    <>
      <SEOHead
        title="Project Gallery - Pool Liners & Safety Covers Installation Photos"
        description="Browse our comprehensive gallery of completed pool liner and safety cover installations. See real examples of Covertech Industries products in action across North America."
        keywords={["pool liner gallery", "safety cover installations", "pool photos", "Covertech projects", "vinyl liner examples"]}
        schema={breadcrumbSchema}
      />

      <PageHero
        badge="Our Work"
        title="Project"
        titleAccent="Gallery"
        description="Explore hundreds of stunning installations across North America. From premium vinyl liners to ASTM-certified safety covers, see the quality and craftsmanship that sets us apart."
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80"
      />

      {/* Category Filter */}
      <section className="py-12 bg-white sticky top-20 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'hover:border-cyan-500 hover:text-cyan-600'
                }
              >
                {cat}
              </Button>
            ))}
          </div>
          <p className="text-center text-slate-600 mt-4">
            Showing <span className="font-semibold text-slate-900">{filteredImages.length}</span> images
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.category}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image.url}
                    alt={`${image.category} installation`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-cyan-500 text-white text-xs">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(false);
              }}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg">
              <p className="text-white text-sm">
                {currentIndex + 1} / {filteredImages.length}
              </p>
              <Badge className="bg-cyan-500 text-white text-xs mt-1">
                {filteredImages[currentIndex].category}
              </Badge>
            </div>

            <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={filteredImages[currentIndex].url}
                alt={`${filteredImages[currentIndex].category} installation`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}