"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function MetacentricTorque() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-400 to-blue-700 flex items-center justify-center">
      {/* Water Level */}
      <div className="absolute bottom-0 w-full h-1/2 bg-blue-900/30 backdrop-blur-sm border-t border-white/20"></div>

      {/* The Object (Boat-like) */}
      <motion.div 
        className="w-48 h-24 bg-orange-400 rounded-b-full border-4 border-orange-600 relative z-10"
        animate={{ rotate: [-15, 15, -15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "center top" }}
      >
        {/* Center of Gravity (G) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full shadow-[0_0_10px_black] flex items-center justify-center">
          <span className="absolute -top-6 text-xs font-bold text-black bg-white/80 px-1 rounded">G</span>
        </div>
        
        {/* Center of Buoyancy (B) */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] flex items-center justify-center"
          animate={{ x: [10, -10, 10] }} // Shifts dynamically as it tilts
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute -bottom-6 text-xs font-bold text-white bg-black/80 px-1 rounded">B</span>
        </motion.div>

        {/* Metacentric Torque Arrow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-t-4 border-l-4 border-yellow-300 rounded-tl-full opacity-70"
          animate={{ rotate: [10, -10, 10], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
