import React from 'react';
import { motion } from 'framer-motion';

const AnimatedOverlay = () => {
  const floatingElements = [
    { icon: '🌻', delay: 0, x: '10%', y: '20%' },
    { icon: '✈️', delay: 1, x: '80%', y: '15%' },
    { icon: '🚆', delay: 2, x: '15%', y: '70%' },
    { icon: '💍', delay: 0.5, x: '85%', y: '75%' },
    { icon: '✨', delay: 1.5, x: '60%', y: '30%' },
    { icon: '🎉', delay: 2.5, x: '25%', y: '45%' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0.3, 0.6],
            scale: [0, 1, 1.1, 1],
            y: [0, -10, 0, -5, 0]
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute text-2xl md:text-4xl"
          style={{
            left: element.x,
            top: element.y,
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-3">
            {/* Using CSS icons instead of emojis */}
            {element.icon === '🌻' && (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full relative">
                <div className="absolute inset-1 bg-yellow-600 rounded-full"></div>
              </div>
            )}
            {element.icon === '✈️' && (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-400 transform rotate-45 relative">
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}
            {element.icon === '🚆' && (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-sm relative">
                <div className="absolute bottom-0 left-1 w-1 h-1 bg-black rounded-full"></div>
                <div className="absolute bottom-0 right-1 w-1 h-1 bg-black rounded-full"></div>
              </div>
            )}
            {element.icon === '💍' && (
              <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gold rounded-full relative">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}
            {element.icon === '✨' && (
              <div className="w-6 h-6 md:w-8 md:h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 transform rotate-45"></div>
                <div className="absolute inset-1 bg-gradient-to-r from-pink-300 to-yellow-300 transform -rotate-45"></div>
              </div>
            )}
            {element.icon === '🎉' && (
              <div className="w-6 h-6 md:w-8 md:h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 rounded-full"></div>
                <div className="absolute inset-1 bg-white/30 rounded-full"></div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedOverlay;