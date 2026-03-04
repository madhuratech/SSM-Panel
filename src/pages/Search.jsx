import React from "react";
import { ShieldCheck, DollarSign, Clock, Star } from "lucide-react";

const Search = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
      
      <div className="max-w-4xl text-center">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Buy Instagram Followers for Reach high
          
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Buy Instagram followers from SMM and grow your profile with the fast
          Instagram followers increase.
        </p>

        {/* Input + Button */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center bg-white border-2 border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-xl">
            
            {/* Icon */}
            <div className="pl-4 text-gray-500">
              👤
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Username"
              className="flex-1 px-4 py-4 outline-none"
            />

            {/* Button */}
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 font-semibold hover:opacity-90 transition">
              SEARCH
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-700">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <span>Secure Service</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="text-pink-500" size={20} />
            <span>Affordable For All</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" size={20} />
            <span>Saves Your Time</span>
          </div>

        </div>

        {/* Rating Section */}
        <div className="mt-10 flex flex-col items-center gap-3">
          
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow">
            
            <div className="flex text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            <span className="font-semibold text-gray-700">4.9</span>
          </div>

          <p className="text-sm text-gray-600">
            Rated <span className="font-semibold">4.9 out of 5</span> <br />
            Based on 1678+ Reviews
          </p>

        </div>

      </div>
    </div>
  );
};

export default Search;