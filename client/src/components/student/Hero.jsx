import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-hero-gradient">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        Learn the skills that actually get you hired.
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        Structured courses for DSA, Web Development, and System Design. Built for developers. Taught by people who've done the work.
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        Structured courses for DSA, Web Development, and System Design. Built for developers. Taught by people who've done the work.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
