import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); 
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        setIsPlaying(false);
        setShowOverlay(true);
        // Do NOT set hasPrompted here
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          setShowOverlay(true);
        });
      }
      setIsPlaying(!isPlaying);
      setShowOverlay(false); // Always hide prompt after first click
      setHasPrompted(true); // Only set hasPrompted after user interacts
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-16 md:top-4 right-2 z-30 md:z-50 flex flex-col items-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-pink-600" />
          ) : (
            <Play className="w-6 h-6 text-pink-600" />
          )}
        </motion.button>
        {showOverlay && !isPlaying && !hasPrompted && (
          <>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-3xl mt-2"
              role="img"
              aria-label="finger pointing up"
            >
              👆
            </motion.span>
            <div className="mt-1 text-pink-600 text-sm font-semibold text-center max-w-[160px] leading-snug">
              Click here to play wedding bells!
            </div>
          </>
        )}
      </div>
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/18221_download_kuch_kuch_hota_hai_instrumental_ringtone_bollywood_ringtones.mp3" type="audio/mpeg" />
      </audio>
    </motion.div>
  );
};

export default MusicPlayer;