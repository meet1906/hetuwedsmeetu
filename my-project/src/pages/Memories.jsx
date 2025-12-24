import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MediaModal from '../components/MediaModal';

// --- ASSET IMPORTS ---

// Welcome Ceremony
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

// Engagement
import engPhoto1 from '../assets/engagement/Photos-3-001/IMG_2546.JPG';
import engPhoto2 from '../assets/engagement/Photos-3-001/IMG_2547.JPG';
import engPhoto3 from '../assets/engagement/Photos-3-001/IMG_3074.JPG';
import engPhoto4 from '../assets/engagement/Photos-3-001/IMG_3552.JPG';
import engPhoto5 from '../assets/engagement/Photos-3-001/IMG_3553.JPG';
import engPhoto6 from '../assets/engagement/Photos-3-001/IMG_3554.JPG';
import engPhoto7 from '../assets/engagement/Photos-3-001/IMG_3555.JPG';
import engPhoto8 from '../assets/engagement/Photos-3-001/IMG_3556.JPG';
import engPhoto9 from '../assets/engagement/Photos-3-001/IMG_3557.JPG';
import engPhoto10 from '../assets/engagement/Photos-3-001/IMG_3559.JPG';
import engPhoto11 from '../assets/engagement/Photos-3-001/IMG_3561.JPG';
import engPhoto12 from '../assets/engagement/Photos-3-001/IMG_3564.JPG';
import engPhoto13 from '../assets/engagement/Photos-3-001/IMG_3565.JPG';
import engPhoto14 from '../assets/engagement/Photos-3-001/IMG_3567.JPG';
import engPhoto15 from '../assets/engagement/Photos-3-001/IMG_3572.JPG';
import engPhoto16 from '../assets/engagement/Photos-3-001/IMG_3574.JPG';
import engPhoto17 from '../assets/engagement/Photos-3-001/IMG_3577.JPG';
import engPhoto18 from '../assets/engagement/Photos-3-001/IMG_3588.JPG';
import engPhoto19 from '../assets/engagement/Photos-3-001/IMG_3592.JPG';
import engPhoto20 from '../assets/engagement/Photos-3-001/IMG_3598.JPG';
import engPhoto21 from '../assets/engagement/Photos-3-001/IMG_3599.JPG';
import engPhoto22 from '../assets/engagement/Photos-3-001/IMG_3600.JPG';
import engPhoto23 from '../assets/engagement/Photos-3-001/IMG_3601.JPG';
import engPhoto24 from '../assets/engagement/Photos-3-001/IMG_3602.JPG';
import engPhoto25 from '../assets/engagement/Photos-3-001/IMG_3604.JPG';
import engPhoto26 from '../assets/engagement/Photos-3-001/IMG_3634.JPG';
import engPhoto27 from '../assets/engagement/Photos-3-001/IMG_3638.JPG';
import engPhoto28 from '../assets/engagement/Photos-3-001/IMG_3639.JPG';
import engPhoto29 from '../assets/engagement/Photos-3-001/IMG_3641.JPG';
import engPhoto30 from '../assets/engagement/Photos-3-001/IMG_3648.JPG';

import engVid3 from '../assets/engagement/Photos-3-001/99a29675-fc09-466d-8c16-98639a7310c6.mp4';
const engVid1 = "https://youtu.be/sl02LXK0NHE?si=wWUIDqRKPp8o1aoP";
const engVid2 = "https://youtu.be/La_PHwnouGw?si=HC08bogI0liNu1dd";

// --- MEMORIES DATA ---

const ALL_MEMORIES = [
  {
    id: 1,
    title: "Welcome Ceremony",
    date: "13 & 15 Dec 2024",
    theme: "Welcome Home",
    description: "13 Dec: Hetvi visited G2 901 Happy Glorious & 15 Dec: Meet visited Neelkamal. Family welcome, blessings, cake, and Gujarati snacks.",
    colors: "from-pink-300 to-cream",
    media: [
      { type: 'photo', src: wcPhoto1 }, { type: 'photo', src: wcPhoto2 }, { type: 'photo', src: wcPhoto3 }, { type: 'photo', src: wcPhoto4 },
      { type: 'photo', src: wcPhoto5 }, { type: 'photo', src: wcPhoto6 }, { type: 'photo', src: wcPhoto7 }, { type: 'photo', src: wcPhoto8 },
      { type: 'photo', src: wcPhoto9 }, { type: 'photo', src: wcPhoto10 }, { type: 'photo', src: wcPhoto11 }, { type: 'photo', src: wcPhoto12 },
      { type: 'photo', src: wcPhoto13 }, { type: 'photo', src: wcPhoto14 }, { type: 'photo', src: wcPhoto15 }, { type: 'photo', src: wcPhoto16 },
      { type: 'photo', src: wcPhoto17 }, { type: 'photo', src: wcPhoto18 }, { type: 'photo', src: wcPhoto19 }, { type: 'photo', src: wcPhoto20 },
      { type: 'video', src: wcVid1 }, { type: 'video', src: wcVid2 }, { type: 'video', src: wcVid3 }, { type: 'video', src: wcVid4 },
      { type: 'video', src: wcVid5 }, { type: 'video', src: wcVid6 }, { type: 'video', src: wcVid7 }, { type: 'video', src: wcVid8 },
      { type: 'video', src: wcVid9 }, { type: 'video', src: wcVid10 },
    ]
  },
  {
    id: 2,
    title: "Engagement",
    date: "9 Feb 2025",
    theme: "Ring Exchange",
    description: "A romantic evening filled with love, laughter, and the promise of forever.",
    colors: "from-purple-300 to-pink-300",
    media: [
      { type: 'photo', src: engPhoto1 }, { type: 'photo', src: engPhoto2 }, { type: 'photo', src: engPhoto3 }, { type: 'photo', src: engPhoto4 },
      { type: 'photo', src: engPhoto5 }, { type: 'photo', src: engPhoto6 }, { type: 'photo', src: engPhoto7 }, { type: 'photo', src: engPhoto8 },
      { type: 'photo', src: engPhoto9 }, { type: 'photo', src: engPhoto10 }, { type: 'photo', src: engPhoto11 }, { type: 'photo', src: engPhoto12 },
      { type: 'photo', src: engPhoto13 }, { type: 'photo', src: engPhoto14 }, { type: 'photo', src: engPhoto15 }, { type: 'photo', src: engPhoto16 },
      { type: 'photo', src: engPhoto17 }, { type: 'photo', src: engPhoto18 }, { type: 'photo', src: engPhoto19 }, { type: 'photo', src: engPhoto20 },
      { type: 'photo', src: engPhoto21 }, { type: 'photo', src: engPhoto22 }, { type: 'photo', src: engPhoto23 }, { type: 'photo', src: engPhoto24 },
      { type: 'photo', src: engPhoto25 }, { type: 'photo', src: engPhoto26 }, { type: 'photo', src: engPhoto27 }, { type: 'photo', src: engPhoto28 },
      { type: 'photo', src: engPhoto29 }, { type: 'photo', src: engPhoto30 },
      { type: 'video', src: engVid1 }, { type: 'video', src: engVid2 }, { type: 'video', src: engVid3 },
    ]
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
      playerOfMatch: "Deep Shah, Yash Shah & Parva Shah"
    }
  }
];

// --- HELPERS ---

const getYouTubeThumbnail = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
};

// --- SUB-COMPONENTS ---

const MediaSection = ({ memory, openLightbox }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { combined, displayedMedia, hasMore } = useMemo(() => {
    if (!memory.media) return { combined: [], displayedMedia: [], hasMore: false };
    const vids = memory.media.filter(m => m.type === 'video');
    const pics = memory.media.filter(m => m.type === 'photo');
    const full = [...vids, ...pics];
    const initial = [...vids.slice(0, 3), ...pics.slice(0, 10)];
    return { 
      combined: full, 
      displayedMedia: isExpanded ? full : initial,
      hasMore: full.length > initial.length 
    };
  }, [memory.media, isExpanded]);

  if (!memory.media) {
    // Placeholder grid for events without actual media files yet
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(Math.min(memory.images || 0, 8))].map((_, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="aspect-square bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer border border-white/20">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-400/50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-600 font-medium">Photo {i + 1}</span>
            </div>
          </motion.div>
        ))}
        {[...Array(memory.videos || 0)].map((_, i) => (
          <motion.div key={`video-${i}`} whileHover={{ scale: 1.05 }} className="aspect-square bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer border border-white/20">
            <div className="text-center">
              <div className="w-8 h-8 bg-red-400/50 rounded-lg mx-auto mb-2 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-0.5"></div>
                </div>
              </div>
              <span className="text-xs text-gray-600 font-medium">Video {i + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {displayedMedia.map((item, i) => {
          const ytThumbnail = item.type === 'video' ? getYouTubeThumbnail(item.src) : null;
          const actualIndex = combined.indexOf(item);

          return (
            <motion.div
              key={`${memory.id}-${i}`}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(combined, actualIndex)}
              className="aspect-square bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {item.type === 'photo' ? (
                <img 
                  src={item.src} 
                  alt="Memory"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full bg-black group">
                  {ytThumbnail ? (
                    <img src={ytThumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Video preview"/>
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      muted
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  {ytThumbnail && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-red-600 text-white text-[10px] rounded font-bold uppercase tracking-wider">
                      YouTube
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 bg-white/80 hover:bg-white text-gray-800 font-semibold py-3 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <span>{isExpanded ? "Show Less" : `Show All (+${combined.length - displayedMedia.length})`}</span>
            <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

// --- MAIN PAGE ---

const Memories = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [modalState, setModalState] = useState({ isOpen: false, media: [], currentIndex: 0 });

  const openLightbox = (mediaArray, index) => {
    setModalState({ isOpen: true, media: mediaArray, currentIndex: index });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6 font-primary">Our Memories</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Capturing the beautiful moments of our journey together</p>
        </motion.div>

        <div ref={ref} className="space-y-16">
          {ALL_MEMORIES.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`bg-gradient-to-br ${memory.colors} rounded-3xl shadow-xl overflow-hidden`}
            >
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">{memory.title}</h2>
                  <p className="text-xl text-gray-700/80 mb-2 font-medium">{memory.date}</p>
                  <p className="text-lg text-gray-600 italic mb-6">{memory.theme}</p>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">{memory.description}</p>
                </div>

                <MediaSection memory={memory} openLightbox={openLightbox} />

                {memory.scorecard && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={inView ? { opacity: 1, scale: 1 } : {}} 
                    transition={{ duration: 0.8, delay: 0.5 }} 
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mt-12 shadow-inner border border-white/50"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Match Scorecard</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {memory.scorecard.matches.map((match, i) => (
                        <div key={i} className="bg-white/40 rounded-xl p-4 border border-white/30">
                          <h4 className="font-bold text-gray-800 mb-3 text-center">Match {match.match}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Team Meet</span>
                              <span className="font-mono font-bold text-gray-800">{match.teamMeet}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Team Hetvi</span>
                              <span className="font-mono font-bold text-gray-800">{match.teamHetvi}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 font-semibold text-center text-green-600 mt-2">
                              Winner: {match.winner}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="inline-block bg-gradient-to-br from-yellow-400 to-amber-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                        <div className="font-bold text-xl mb-1 text-white">🏆 Final Winner: {memory.scorecard.finalWinner}</div>
                        <div className="text-sm font-medium opacity-90">{memory.scorecard.playerOfMatch}</div>
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