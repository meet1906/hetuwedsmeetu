import { motion } from 'framer-motion';
import AnimatedOverlay from '../components/AnimatedOverlay';
import { getOptimizedImage } from '../lib/cloudinary';

const Home = () => {
  const bgImage = getOptimizedImage('wedding/core/hero_bg');

  return (
    <div id="home" className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      
      {/* Animated Memory Canvas */}
      <AnimatedOverlay />
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white px-4"
        >
          {/* Golden Logo Text */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-10 left-10"
          >
            <h3 className="text-4xl font-serif text-gold tracking-wider">MH</h3>
          </motion.div> */}
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-4 text-shadow-lg"
          >
            Meet & Hetvi
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl font-light mb-6 text-white"
          >
            A journey from strangers to soulmates
          </motion.p>
          
          {/* Decorative Caption */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-2xl md:text-3xl font-serif italic text-white"
          >
            Hetu weds Meetu
          </motion.div>
          
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 text-lg md:text-xl text-white"
          >
            13 February 2026
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;