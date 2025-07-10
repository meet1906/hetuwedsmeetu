import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Journey = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const journeySteps = [
    {
      title: "Hetvi's Sweet Tooth",
      description: "Loved tutti frutti if free; her dada prepaid it for her",
      icon: "🍭",
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Meet's Dance Passion",
      description: "Dancer to 'Piya Piya' since childhood",
      icon: "💃",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "The Arrangement",
      description: "Arranged marriage brought two hearts together",
      icon: "💕",
      color: "from-red-400 to-red-600"
    },
    {
      title: "Digital Connection",
      description: "WhatsApp messages sparked the first conversations",
      icon: "📱",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Voice to Voice",
      description: "Phone calls that lasted hours, building connection",
      icon: "📞",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "First Meetings",
      description: "Face to face meetings that confirmed what hearts already knew",
      icon: "👫",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "Travel Tales",
      description: "Hetvi: Mumbai to Surat by train, Meet: Bengaluru to Surat by flight",
      icon: "🚆",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      title: "Instant Connection",
      description: "Instant vibe connection; families clicked perfectly",
      icon: "✨",
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-50 to-peach-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Meet & Hetvi share their love story - from strangers to soulmates
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300 rounded-full"></div>

          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white text-xl mb-4`}>
                    <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-pink-400 rounded-full z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-20 h-20 bg-pink-300 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <div className="w-16 h-16 bg-purple-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="w-24 h-24 bg-yellow-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Journey;