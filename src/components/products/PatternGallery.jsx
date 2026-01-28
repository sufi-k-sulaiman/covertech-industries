import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PatternGallery({ pattern }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = [pattern.image, ...(pattern.gallery || [])];

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
      >
        {/* Main Pattern Image */}
        <div className="overflow-hidden relative cursor-pointer" onClick={() => openModal(0)}>
          <img
            src={pattern.image}
            alt={pattern.name}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {pattern.gallery && pattern.gallery.length > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{pattern.gallery.length}
            </div>
          )}
        </div>

        {/* Pattern Name */}
        <div className="p-3 text-center">
          <p className="font-medium text-slate-900 text-sm">{pattern.name}</p>
        </div>

        {/* Thumbnail Gallery */}
        {pattern.gallery && pattern.gallery.length > 0 && (
          <div className="px-2 pb-2 grid grid-cols-3 gap-1">
            {pattern.gallery.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-cyan-500 transition-all"
                onClick={() => openModal(idx + 1)}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
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

            {allImages.length > 1 && (
              <>
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
              </>
            )}

            <div className="max-w-5xl w-full px-16 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={allImages[currentIndex]}
                alt={pattern.name}
                className="max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium text-lg">{pattern.name}</p>
                {allImages.length > 1 && (
                  <p className="text-white/60 text-sm mt-1">
                    {currentIndex + 1} / {allImages.length}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}