import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Memories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const memories = [
    {
      id: 1,
      title: "Welcome Ceremony",
      date: "13 Dec 2024",
      theme: "Welcome Home",
      description: "Arrival of Hetvi to G2 901. Jain family welcome, blessings, cake, snacks.",
      colors: "from-pink-300 to-cream",
      images: 8,
      videos: 0
    },
    {
      id: 2,
      title: "Engagement",
      date: "9 Feb 2025",
      theme: "Ring Exchange",
      description: "A romantic evening filled with love, laughter, and the promise of forever.",
      colors: "from-purple-300 to-pink-300",
      images: 12,
      videos: 2
    },
    {
      id: 3,
      title: "Box Cricket Match",
      date: "12 July 2025",
      theme: "Cricket Showdown",
      description: "3-match box cricket tournament - family vs family competition.",
      colors: "from-green-300 to-blue-300",
      images: 15,
      videos: 1,
      scorecard: {
        matches: [
          { match: 1, teamMeet: "56/5", teamHetvi: "62/3", winner: "Team Hetvi" },
          { match: 2, teamMeet: "48/4", teamHetvi: "40/6", winner: "Team Meet" },
          { match: 3, teamMeet: "65/2", teamHetvi: "63/4", winner: "Team Meet" }
        ],
        finalWinner: "Team Meet",
        playerOfMatch: "To be announced"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Our Memories
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Capturing the beautiful moments of our journey together
          </p>
        </motion.div>

        {/* Memories Grid */}
        <div ref={ref} className="space-y-16">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`bg-gradient-to-br ${memory.colors} rounded-3xl shadow-xl overflow-hidden`}
            >
              <div className="p-8 md:p-12">
                {/* Memory Header */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                    {memory.title}
                  </h2>
                  <p className="text-xl text-gray-700 mb-2">{memory.date}</p>
                  <p className="text-lg text-gray-600 italic">{memory.theme}</p>
                </div>

                {/* Description */}
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    {memory.description}
                  </p>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {/* Image Placeholders */}
                  {[...Array(Math.min(memory.images, 8))].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs text-gray-600">Photo {i + 1}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Video Placeholders */}
                  {[...Array(memory.videos)].map((_, i) => (
                    <motion.div
                      key={`video-${i}`}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-red-400 rounded-lg mx-auto mb-2 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent"></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600">Video {i + 1}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cricket Scorecard */}
                {memory.scorecard && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Match Scorecard
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {memory.scorecard.matches.map((match, i) => (
                        <div key={i} className="bg-white/50 rounded-xl p-4">
                          <h4 className="font-bold text-gray-800 mb-3 text-center">
                            Match {match.match}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Team Meet</span>
                              <span className="font-mono">{match.teamMeet}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Team Hetvi</span>
                              <span className="font-mono">{match.teamHetvi}</span>
                            </div>
                            <div className="border-t pt-2 font-semibold text-center text-green-600">
                              Winner: {match.winner}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-xl">
                        <div className="font-bold text-lg">Final Winner: {memory.scorecard.finalWinner}</div>
                        <div className="text-sm">Player of the Match: {memory.scorecard.playerOfMatch}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* View More Button */}
                <div className="text-center mt-8">
                  <button className="bg-white/70 hover:bg-white text-gray-800 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg">
                    View All Photos
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memories;