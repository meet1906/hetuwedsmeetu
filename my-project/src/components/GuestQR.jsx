import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

const GuestQR = () => {
  const galleryUrl = "https://site.fotoowl.ai/studio942/gallery/198677?album_selection=true&pass_key=7976";
  const logoUrl = "/MH.png"; // Assuming it's in public folder

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-4 mb-16"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100/50 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Guest Photo Access</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Scan the QR code below to view and download all the beautiful moments captured by our professional photographers.
          </p>

          <div className="inline-block p-6 bg-white rounded-3xl shadow-inner border border-gray-100 mb-8 transform hover:scale-105 transition-transform duration-300">
            <QRCodeSVG 
              value={galleryUrl}
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: logoUrl,
                x: undefined,
                y: undefined,
                height: 48,
                width: 48,
                excavate: true,
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href={galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Open Gallery Directly
            </a>
            <p className="text-sm text-gray-500 font-medium">
              Gallery provided by Studio 9
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestQR;
