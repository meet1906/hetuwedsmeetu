import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RSVPModal from '../components/RSVPModal';

const Events = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const events = [
    {
      id: 1,
      name: "Phoolon ki Haldi",
      date: "12 Feb 2026",
      time: "7:30 AM",
      theme: "Pastel Floral",
      colors: "Yellow + Pink + Flower Motion",
      dressCode: "Light Pastel",
      location: "Purple Iris",
      mapLink: "https://maps.google.com",
      bgColor: "from-yellow-200 to-pink-200",
      targetDate: new Date("2026-02-12T07:30:00")
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
      mapLink: "https://maps.google.com",
      bgColor: "from-red-200 to-orange-200",
      targetDate: new Date("2026-02-12T12:00:00")
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
      mapLink: "https://maps.google.com",
      bgColor: "from-purple-200 to-black/20",
      targetDate: new Date("2026-02-12T19:30:00")
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
      mapLink: "https://maps.google.com",
      bgColor: "from-red-200 to-cream",
      targetDate: new Date("2026-02-13T10:00:00"),
      timeline: [
        { time: "10:00 AM", event: "Jaan Prasthaan from Jash Residency" },
        { time: "12:39 PM", event: "Hasta Melap at Vijyalaxmi Hall" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      events.forEach(event => {
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

        {/* Events Grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`bg-gradient-to-br ${event.bgColor} rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
            >
              <div className="p-8">
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
                <div className="space-y-3 mb-6">
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
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    RSVP
                  </button>
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/70 hover:bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Map
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <RSVPModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Events;