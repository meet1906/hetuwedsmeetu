import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/journey', label: 'Our Journey' },
    { id: '/events', label: 'Events' },
    { id: '/memories', label: 'Memories' },
    { id: '/blessings', label: 'Blessings' }
  ];

  const navigateToPage = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  // Determine if on home page
  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isHome
          ? (isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent')
          : 'bg-white/95 backdrop-blur-md shadow-lg'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigateToPage('/') }>
            <div className="text-2xl font-serif text-gold font-bold tracking-wider">
              MH
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.id
                    ? 'text-pink-600'
                    : isHome
                      ? (isScrolled ? 'text-gray-700 hover:text-pink-600' : 'text-white hover:text-pink-200')
                      : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-60">
            <button
              className={`p-2 ${isHome ? (isScrolled ? 'text-gray-700' : 'text-white') : 'text-gray-700'}`}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-black/40 md:hidden">
          <motion.div
            ref={mobileMenuRef}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded-b-2xl p-6 flex flex-col items-center justify-center min-h-[60vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="absolute top-4 right-4 text-black text-3xl p-2 focus:outline-none"
            >
              &times;
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`text-lg font-semibold transition-colors duration-200 ${
                  location.pathname === item.id
                    ? 'text-pink-600'
                    : 'text-gray-800 hover:text-pink-600'
                } mb-4 w-full text-center`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;