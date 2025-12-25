import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWkyoTk6i3Qmvi35z6b8EQ0ogQl4eEmgJBMo7y7MUY-Uz1uegmTf2pm96cbQkWeqIGqQ/exec';

const Blessings = () => {
  // Blessings Form State
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [blessings, setBlessings] = useState([]);
  const [loadingBlessings, setLoadingBlessings] = useState(true);

  // UPI details
  const upiId = 'parvashah305@okicici';
  const upiName = 'Parva Shah';

  // Fetch approved blessings
  useEffect(() => {
    const fetchBlessings = async () => {
      if (!APPS_SCRIPT_URL) {
        setLoadingBlessings(false);
        return;
      }
      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        setBlessings(data);
      } catch (error) {
        console.error('Error fetching blessings:', error);
      } finally {
        setLoadingBlessings(false);
      }
    };
    fetchBlessings();
  }, []);

  // Generate QR code URL using Google Chart API
  const upiLink = formData.amount && !isNaN(formData.amount) && Number(formData.amount) > 0
    ? `upi://pay?pa=${upiId}&pn=${upiName}&am=${formData.amount}&cu=INR`
    : `upi://pay?pa=${upiId}&pn=${upiName}&cu=INR`;

  // Blessings Form Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Save to Google Sheets if URL is provided
    if (APPS_SCRIPT_URL) {
      try {
        const queryParams = new URLSearchParams({
          name: formData.name,
          message: formData.message
        });

        await fetch(`${APPS_SCRIPT_URL}?${queryParams.toString()}`, {
          method: 'GET',
          mode: 'no-cors'
        });
      } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
      }
    }

    setIsSubmitting(false);

    // 2. Handle payment flow
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) < 1) {
      setIsSubmitted(true);
      return;
    }

    const isMobile = /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiLink;
      setTimeout(() => setIsSubmitted(true), 1000);
    } else {
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for desktop modal 'Payment Done' button
  const handlePaymentDone = () => {
    setShowModal(false);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (showModal) {
      const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${encodeURIComponent(formData.amount)}&cu=INR`;
      // console.log('UPI QR value:', upiLink);
    }
  }, [showModal, formData.amount, upiId, upiName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-pink-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Modal for desktop QR code */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center relative max-w-xs w-full">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-pink-600">Scan to Pay via UPI</h3>
              <QRCodeCanvas value={upiLink} size={160} />
              <div className="mt-2 text-gray-700 text-sm text-center">
                Scan this QR code with any UPI app<br />
                {/* <span className="font-semibold">UPI ID:</span> {upiId} */}
              </div>
              <button
                className="mt-6 bg-pink-600 text-white px-6 py-2 rounded font-semibold hover:bg-pink-700 transition text-lg"
                onClick={handlePaymentDone}
              >
                Payment Done
              </button>
            </div>
          </div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Send Your Love
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            to Hetu & Meetu
          </p>
        </motion.div>

        {/* Blessing Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400"></div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Blessing Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg resize-none"
                  placeholder="Share your heartfelt blessings for the couple..."
                />
              </div>

              {/* Gift Amount (Optional) */}
              {/* <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Gift Amount (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This is just a message form. For actual payment, use the UPI button after submitting.
                </p>
              </div> */}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send Blessings'
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              {/* Petal Animation */}
              <div className="relative mb-8">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: -50, 
                      x: Math.random() * 400 - 200,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{ 
                      y: 300, 
                      opacity: 0,
                      rotate: 360,
                      x: Math.random() * 600 - 300
                    }}
                    transition={{ 
                      duration: 3,
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                    className="absolute top-0 left-1/2 w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#ff9a9e', '#fecfef'][Math.floor(Math.random() * 5)]
                    }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="text-8xl mb-6"
              >
                💝
              </motion.div>

              <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4">
                Thank You!
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Your blessings mean the world to us
              </p>
              <p className="text-lg text-gray-500">
                Hetu & Meetu are grateful for your love and support
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
              >
                ← Send another message
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Messages Section */}
        {blessings.length > 0 && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Messages of Love</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blessings.map((blessing, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-md border border-pink-50 relative group hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute top-4 right-6 text-4xl text-pink-100 group-hover:text-pink-200 transition-colors pointer-events-none font-serif rotate-12">
                    "
                  </div>
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-6 relative z-10">
                    {blessing.message}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center font-bold text-pink-600">
                      {blessing.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{blessing.name}</h4>
                      <p className="text-xs text-gray-400">Approved Blessing</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Loading/Empty State for Blessings */}
        {loadingBlessings && blessings.length === 0 && APPS_SCRIPT_URL && (
          <div className="mt-24 text-center">
            <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 italic">Fetching beautiful messages...</p>
          </div>
        )}

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-24"
        >
          <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-600 max-w-3xl mx-auto">
            "Love is not just looking at each other, it's looking in the same direction together."
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
};

export default Blessings;