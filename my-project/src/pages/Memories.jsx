import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getOptimizedImage, getOptimizedVideo } from '../lib/cloudinary';
import MediaModal from '../components/MediaModal';



const getYouTubeThumbnail = (url) => {
  if (!url || typeof url !== 'string') return null;
  // Support standard videos and Shorts
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
};

const getGoogleDriveThumbnail = (url) => {
  if (!url || !url.includes('drive.google.com')) return null;
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return null;
};

const isGoogleDriveLink = (url) => {
  return url && url.includes('drive.google.com');
};

// --- SUB-COMPONENTS ---

const MemoryCard = ({ memory, index, openLightbox }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
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
            <div className="text-center space-y-6">
              <div className="inline-block bg-gradient-to-br from-yellow-400 to-amber-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                <div className="font-bold text-xl mb-1 text-white">🏆 Final Winner: {memory.scorecard.finalWinner}</div>
                <div className="text-sm font-medium opacity-90">{memory.scorecard.playerOfMatch}</div>
              </div>

              {memory.scorecard.externalUrl && (
                <div className="mt-4">
                  <a 
                    href={memory.scorecard.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Full Scorecard on CricHeroes
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const MediaSection = ({ memory, openLightbox }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { combined, displayedMedia, hasMore } = useMemo(() => {
    if (!memory.media) return { combined: [], displayedMedia: [], hasMore: false };
    
    // Resolve full URLs for Cloudinary assets
    const resolvedMedia = memory.media.map(item => ({
      ...item,
      // If it's not a YouTube link, it's a Cloudinary public ID
      originalSrc: item.isExternal ? item.src : (item.type === 'video' ? getOptimizedVideo(item.src) : getOptimizedImage(item.src))
    }));

    const vids = resolvedMedia.filter(m => m.type === 'video');
    const pics = resolvedMedia.filter(m => m.type === 'photo');
    const full = [...vids, ...pics];
    const initial = [...vids.slice(0, 3), ...pics.slice(0, 10)];
    
    return { 
      combined: full, 
      displayedMedia: isExpanded ? full : initial,
      hasMore: full.length > initial.length 
    };
  }, [memory.media, isExpanded]);

  if (!memory.media || memory.media.length === 0) {
    // Placeholder grid (same as before)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="aspect-square bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
            <div className="text-center opacity-50">
              <div className="w-8 h-8 bg-gray-400/50 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-gray-600 font-medium">Coming Soon</span>
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
          const ytThumbnail = item.isExternal ? getYouTubeThumbnail(item.src) : null;
          const driveThumbnail = item.isExternal ? getGoogleDriveThumbnail(item.src) : null;
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
                  src={item.originalSrc} 
                  alt="Memory"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full bg-slate-900 group">
                  {item.isExternal ? (
                    <img 
                      src={ytThumbnail || driveThumbnail} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      alt="Video preview"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x600?text=Video+Preview'; }}
                    />
                  ) : (
                    <video
                      src={item.originalSrc}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      muted
                      playsInline
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  {item.isExternal && (
                    <div className={`absolute bottom-2 right-2 px-2 py-0.5 text-white text-[10px] rounded font-bold uppercase tracking-wider ${isGoogleDriveLink(item.src) ? 'bg-blue-600' : 'bg-red-600'}`}>
                      {isGoogleDriveLink(item.src) ? 'Drive' : 'YouTube'}
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
  const [modalState, setModalState] = useState({ isOpen: false, media: [], currentIndex: 0 });
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Firestore
  React.useEffect(() => {
    const q = query(collection(db, "memories"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
      setMemories(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openLightbox = (mediaArray, index) => {
    // MediaModal expects { type, src }
    // We pass combined items which now have 'originalSrc' ready
    const modalMedia = mediaArray.map(m => ({ ...m, src: m.originalSrc }));
    setModalState({ isOpen: true, media: modalMedia, currentIndex: index });
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading memories from the cloud...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {memories.map((memory, index) => (
              <MemoryCard 
                key={memory.docId} 
                memory={memory} 
                index={index} 
                openLightbox={openLightbox} 
              />
            ))}
          </div>
        )}
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