import React from 'react';
import bgImage from '../assets/hsp-219.jpg';

const Banner = () => {
  return (
    <div
      className="w-screen h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-10 left-10 text-black drop-shadow-lg">
        <h1 className="m-0 text-4xl font-bold">MEET & HETVI</h1>
        <h2 className="mt-2 text-2xl font-normal">13 February 2026</h2>
        <div className="mt-2 italic text-lg">Coming Soon</div>
      </div>
    </div>
  );
};

export default Banner;