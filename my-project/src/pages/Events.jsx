import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// RSVPModal import removed

// Import attire images
import mehendiImg from '../assets/attire/Mehendi image.png';
import haldiImg from '../assets/attire/Carnival of Colours image.png';
import mameruImg from '../assets/attire/Mameru image.png';
import sangeetImg from '../assets/attire/Sangeet image.png';
import weddingImg from '../assets/attire/The Wedding image.png';
import attireVid from '../assets/attire/Attire.mp4';

const ALL_EVENTS = [
  {
    id: 5,
    name: "Mehendi",
    date: "11 Feb 2026",
    time: "5:30 PM",
    theme: "Green Color",
    colors: "Dark Green + Emerald",
    dressCode: "Kurta Green",
    location: "Happy Glorious Basement Hall",
    mapLink: "https://maps.app.goo.gl/zYxi69vwd56k9X42A",
    bgColor: "from-green-100 via-emerald-50 to-teal-100",
    targetDate: new Date("2026-02-11T17:30:00"),
    attireImage: mehendiImg,
    timeline: [
      { time: "5:30 PM", event: "Ceremony Begins" },
      { time: "8:00 PM", event: "Dinner & Music" }
    ]
  },
  {
    id: 1,
    name: "Phoolon ki Haldi (Carnival of Colors)",
    date: "12 Feb 2026",
    time: "7:30 AM",
    theme: "Pastel Floral",
    colors: "Yellow + Pink + Flower Motion",
    dressCode: "Light Pastel",
    location: "Purple Iris",
    mapLink: "https://maps.app.goo.gl/DHXbhCEX6zKDqo6b9",
    bgColor: "from-yellow-100 via-orange-50 to-pink-100",
    targetDate: new Date("2026-02-12T07:30:00"),
    attireImage: haldiImg,
    timeline: [
      { time: "7:30 AM", event: "Rituals Start" },
      { time: "9:30 AM", event: "Breakfast" }
    ]
  },
  {
    id: 2,
    name: "Mameru",
    date: "12 Feb 2026",
    time: "12:00 PM",
    theme: "Gujarati Tradition",
    colors: "Subtle Red/Orange",
    dressCode: "Saree / Kurta-Coti",
    location: "Purple Iris",
    mapLink: "https://maps.app.goo.gl/DHXbhCEX6zKDqo6b9",
    bgColor: "from-red-100 via-orange-50 to-yellow-100",
    targetDate: new Date("2026-02-12T12:00:00"),
    attireImage: mameruImg,
    timeline: [
      { time: "12:00 PM", event: "Mameru Arrival" },
      { time: "1:30 PM", event: "Traditional Lunch" }
    ]
  },
  {
    id: 3,
    name: "Sangeet",
    date: "12 Feb 2026",
    time: "7:30 PM",
    theme: "Cocktail Western",
    colors: "Purple, Black, Musical Motion",
    dressCode: "Gown / Blazer",
    location: "Purple Iris",
    mapLink: "https://maps.app.goo.gl/DHXbhCEX6zKDqo6b9",
    bgColor: "from-indigo-100 via-purple-100 to-pink-100",
    targetDate: new Date("2026-02-12T19:30:00"),
    attireImage: sangeetImg,
    timeline: [
      { time: "7:30 PM", event: "Performances" },
      { time: "9:00 PM", event: "DJ Night" }
    ]
  },
  {
    id: 4,
    name: "Wedding",
    date: "13 Feb 2026",
    time: "10:00 AM",
    theme: "Jain Wedding",
    colors: "Cream + Red",
    dressCode: "Traditional Wedding Attire",
    location: "Vijyalaxmi Hall",
    mapLink: "https://maps.app.goo.gl/e8HQSAd7LU833MPBA",
    bgColor: "from-red-100 via-cream to-red-50",
    targetDate: new Date("2026-02-13T10:00:00"),
    attireImage: weddingImg,
    timeline: [
      { time: "10:00 AM", event: "Jaan Prasthaan" },
      { time: "12:39 PM", event: "Hasta Melap" }
    ]
  }
];

const Events = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      ALL_EVENTS.forEach(event => {
        const distance = event.targetDate.getTime() - now;
        
        if (distance > 0) {
          newTimeLeft[event.id] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            Wedding Events
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join us in celebrating our special moments
          </p>
        </motion.div>

        {/* Grand Attire Showcase Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-5xl mx-auto mb-20 px-4"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">Grand Attire Showcase</h2>
            <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full" />
          </div>
          
          <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl bg-white p-2">
            <video
              src={attireVid}
              autoPlay
              loop
              muted
              controls
              playsInline
              className="w-full h-auto rounded-[1.6rem]"
            />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {ALL_EVENTS.map((event, index) => {
            const isLastOdd = ALL_EVENTS.length % 2 !== 0 && index === ALL_EVENTS.length - 1;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`bg-gradient-to-br ${event.bgColor} rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full 
                  ${isLastOdd ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''}`}
              >
                <div className="p-8 flex flex-col h-full">
                {/* Event Header */}
                <div className="mb-6">
                  <h3 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {event.date} at {event.time}
                  </p>
                </div>

                {/* Countdown Timer */}
                {timeLeft[event.id] && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {timeLeft[event.id].days}
                        </div>
                        <div className="text-sm text-gray-600">Days</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {timeLeft[event.id].hours}
                        </div>
                        <div className="text-sm text-gray-600">Hours</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {timeLeft[event.id].minutes}
                        </div>
                        <div className="text-sm text-gray-600">Minutes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {timeLeft[event.id].seconds}
                        </div>
                        <div className="text-sm text-gray-600">Seconds</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6 mt-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Theme: </span>
                      <span className="text-gray-600">{event.theme}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Dress Code: </span>
                      <span className="text-gray-600">{event.dressCode}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Location: </span>
                      <span className="text-gray-600">{event.location}</span>
                    </div>
                  </div>

                  {/* Attire Preview */}
                  {event.attireImage && (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                      <div className="relative bg-white p-2 rounded-2xl shadow-sm overflow-hidden">
                        <img 
                          src={event.attireImage} 
                          alt={`${event.name} Attire`}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                        <div className="mt-1 text-center">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suggested Attire</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Wedding Timeline */}
                {event.timeline && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Timeline:</h4>
                    {event.timeline.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1">
                        <span className="font-medium text-gray-600">{item.time}</span>
                        <span className="text-gray-600">{item.event}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center mt-auto">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white text-center font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    View Map Details
                  </a>
                </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RSVP Modal removed */}
    </div>
  );
};

export default Events;