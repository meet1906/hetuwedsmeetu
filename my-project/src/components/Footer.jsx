import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-pink-100 via-purple-50 to-cream py-12"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Main Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Thank you for being part of our journey
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your presence in our lives makes our love story even more beautiful
          </p>
        </motion.div>

        {/* Hashtag */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="inline-block bg-white/50 backdrop-blur-sm rounded-full px-8 py-3">
            <span className="text-xl font-semibold text-pink-600">#HetuWedsMeetu</span>
          </div>
        </motion.div>

        {/* Decorative Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center items-center space-x-4 mb-8"
        >
          <div className="w-4 h-4 bg-pink-400 transform rotate-45 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-400 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full"></div>
          </div>
          <span className="text-gray-500 font-serif italic">With Love</span>
          <div className="w-4 h-4 bg-pink-400 transform rotate-45 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-400 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full"></div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm text-gray-500"
        >
          <p>© 2026 Meet & Hetvi Wedding. Made with love.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;