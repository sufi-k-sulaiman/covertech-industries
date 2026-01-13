import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GalleryModal({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-7xl max-h-[90vh] w-full px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg"
        />
      </motion.div>

      {/* Next Button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}
    </motion.div>
  );
}