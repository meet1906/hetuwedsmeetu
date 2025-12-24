import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaModal = ({ isOpen, onClose, media, currentIndex, setCurrentIndex }) => {
  const handlePrevious = useCallback((e) => {
    e?.stopPropagation();
    if (!media || media.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  }, [media?.length, setCurrentIndex]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    if (!media || media.length === 0) return;
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  }, [media?.length, setCurrentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!isOpen || !media || media.length === 0) return null;

  const currentItem = media[currentIndex];
  if (!currentItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
    >
      {/* Semi-transparent Backdrop - Clicking this closes the modal */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white z-[110] p-2 bg-white/10 rounded-full transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Arrows - Sibling to backdrop, so no bubbling to onClose */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[110] p-4 bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[110] p-4 bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Media Container */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative z-[105] max-w-full max-h-full flex items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.type === 'photo' ? (
          <img
            src={currentItem.src}
            alt="Memory"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="relative w-full max-w-5xl">
            <video
              src={currentItem.src}
              controls
              autoPlay
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl mx-auto"
            />
          </div>
        )}

        {/* Counter info */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/70 font-medium text-lg">
          {currentIndex + 1} / {media.length}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaModal;
