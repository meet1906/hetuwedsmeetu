import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MediaModal from '../components/MediaModal';

// Import Photos
import wcPhoto1 from '../assets/welcomeceremony/115f3cc9-60db-49fc-9754-9b4463ebe69f.jpg';
import wcPhoto2 from '../assets/welcomeceremony/425e3e7d-c60e-4ff6-a5b1-80b9185762f6.jpg';
import wcPhoto3 from '../assets/welcomeceremony/4fecaebb-d808-4e1e-8b59-74b57d2f51f3.jpg';
import wcPhoto4 from '../assets/welcomeceremony/58fffcc0-91c6-418c-a24f-c5ea8c05f1e1.jpg';
import wcPhoto5 from '../assets/welcomeceremony/6796ba37-4597-42d1-a7e9-bce0701bafdc.jpg';
import wcPhoto6 from '../assets/welcomeceremony/768b68a7-9742-49ce-9b98-08700f4c36e4.jpg';
import wcPhoto7 from '../assets/welcomeceremony/9743a047-60d6-40a8-9796-c5111ceda1ef.jpg';
import wcPhoto8 from '../assets/welcomeceremony/9F41D0F9-15A2-4C01-87BD-92025102F55D.jpg';
import wcPhoto9 from '../assets/welcomeceremony/d5e1dcf4-a24e-4c36-b9c6-d6acace37429.jpg';
import wcPhoto10 from '../assets/welcomeceremony/f11b0b79-5069-4b5e-a2dc-13b7b3da2914.jpg';
import wcPhoto11 from '../assets/welcomeceremony/IMG_0150.HEIC';
import wcPhoto12 from '../assets/welcomeceremony/IMG_0157.HEIC';
import wcPhoto13 from '../assets/welcomeceremony/IMG_0171.HEIC';
import wcPhoto14 from '../assets/welcomeceremony/IMG_1407.HEIC';
import wcPhoto15 from '../assets/welcomeceremony/IMG_1410.HEIC';
import wcPhoto16 from '../assets/welcomeceremony/IMG_1415.HEIC';
import wcPhoto17 from '../assets/welcomeceremony/IMG_1458.HEIC';
import wcPhoto18 from '../assets/welcomeceremony/IMG_1471.HEIC';
import wcPhoto19 from '../assets/welcomeceremony/IMG_1477.HEIC';
import wcPhoto20 from '../assets/welcomeceremony/IMG_5417.HEIC';

// Import Videos
import wcVid1 from '../assets/welcomeceremony/IMG_0109.MOV';
import wcVid2 from '../assets/welcomeceremony/IMG_0115.MOV';
import wcVid3 from '../assets/welcomeceremony/IMG_0121.MOV';
import wcVid4 from '../assets/welcomeceremony/IMG_0150.MP4';
import wcVid5 from '../assets/welcomeceremony/IMG_0157.MP4';
import wcVid6 from '../assets/welcomeceremony/IMG_0171.MP4';
import wcVid7 from '../assets/welcomeceremony/IMG_1407.MP4';
import wcVid8 from '../assets/welcomeceremony/IMG_1409.MOV';
import wcVid9 from '../assets/welcomeceremony/IMG_1471.MP4';
import wcVid10 from '../assets/welcomeceremony/IMG_1477.MP4';

const Memories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [modalState, setModalState] = React.useState({
    isOpen: false,
    media: [],
    currentIndex: 0
  });

  const openLightbox = (mediaArray, index) => {
    setModalState({
      isOpen: true,
      media: mediaArray,
      currentIndex: index
    });
  };

  const memories = [
    {
      id: 1,
      title: "Welcome Ceremony",
      date: "13 & 15 Dec 2024",
      theme: "Welcome Home",
      description: "13 Dec: Hetvi visited G2 901 Happy Glorious & 15 Dec: Meet visited Neelkamal. Family welcome, blessings, cake, and Gujarati snacks.",
      colors: "from-pink-300 to-cream",
      media: [
        { type: 'photo', src: wcPhoto1 },
        { type: 'photo', src: wcPhoto2 },
        { type: 'photo', src: wcPhoto3 },
        { type: 'photo', src: wcPhoto4 },
        { type: 'photo', src: wcPhoto5 },
        { type: 'photo', src: wcPhoto6 },
        { type: 'photo', src: wcPhoto7 },
        { type: 'photo', src: wcPhoto8 },
        { type: 'photo', src: wcPhoto9 },
        { type: 'photo', src: wcPhoto10 },
        { type: 'photo', src: wcPhoto11 },
        { type: 'photo', src: wcPhoto12 },
        { type: 'photo', src: wcPhoto13 },
        { type: 'photo', src: wcPhoto14 },
        { type: 'photo', src: wcPhoto15 },
        { type: 'photo', src: wcPhoto16 },
        { type: 'photo', src: wcPhoto17 },
        { type: 'photo', src: wcPhoto18 },
        { type: 'photo', src: wcPhoto19 },
        { type: 'photo', src: wcPhoto20 },
        { type: 'video', src: wcVid1 },
        { type: 'video', src: wcVid2 },
        { type: 'video', src: wcVid3 },
        { type: 'video', src: wcVid4 },
        { type: 'video', src: wcVid5 },
        { type: 'video', src: wcVid6 },
        { type: 'video', src: wcVid7 },
        { type: 'video', src: wcVid8 },
        { type: 'video', src: wcVid9 },
        { type: 'video', src: wcVid10 },
      ]
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
      title: "Shah Premier League - Box Cricket Match",
      date: "12 July 2025",
      theme: "Cricket Showdown",
      description: "3-match box cricket tournament - family vs family competition.",
      colors: "from-green-300 to-blue-300",
      images: 15,
      videos: 1,
      scorecard: {
        matches: [
          { match: 1, teamMeet: "85/7", teamHetvi: "86/1", winner: "Team Hetvi" },
          { match: 2, teamMeet: "110/3", teamHetvi: "112/3", winner: "Team Hetvi" },
          { match: 3, teamMeet: "76/5", teamHetvi: "33/7", winner: "Team Hetvi" }
        ],
        finalWinner: "Team Hetvi",
        playerOfMatch: "Deep Shah (Team Hetvi), Yash Shah (Team Hetvi) & Parva Shah (Team Meet)"
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {memory.media ? (
                    memory.media.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openLightbox(memory.media, i)}
                        className="aspect-square bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        {item.type === 'photo' ? (
                          <img 
                            src={item.src} 
                            alt={`${memory.title} ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback for potentially unsupported formats like HEIC in some browsers
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `
                                <div class="flex flex-col items-center justify-center h-full p-2 text-center bg-gray-100">
                                  <svg class="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                  <span class="text-[10px] text-gray-500">Image ${i + 1}</span>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="relative w-full h-full bg-black/10 group">
                            <video
                              src={item.src}
                              className="w-full h-full object-cover"
                              muted
                              onMouseEnter={(e) => e.target.play()}
                              onMouseLeave={(e) => {
                                e.target.pause();
                                e.target.currentTime = 0;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                              <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-0 h-0 border-l-8 border-l-pink-500 border-y-6 border-y-transparent ml-1"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <>
                      {/* Original Placeholders for other memories */}
                      {[...Array(Math.min(memory.images || 0, 8))].map((_, i) => (
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

                      {[...Array(memory.videos || 0)].map((_, i) => (
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
                    </>
                  )}
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
                        <div className="text-sm">Players of the Tournament: {memory.scorecard.playerOfMatch}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalState.isOpen && (
          <MediaModal
            key="media-modal"
            isOpen={modalState.isOpen}
            onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
            media={modalState.media}
            currentIndex={modalState.currentIndex}
            setCurrentIndex={(newIndex) => setModalState(prev => ({ 
              ...prev, 
              currentIndex: typeof newIndex === 'function' ? newIndex(prev.currentIndex) : newIndex 
            }))}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memories;