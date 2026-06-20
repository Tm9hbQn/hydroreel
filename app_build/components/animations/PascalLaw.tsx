"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PascalLaw() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center">
      {/* Central object (e.g., a leg or body part simplified) */}
      <motion.div 
        className="w-24 h-48 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50 relative z-10 flex items-center justify-center"
        animate={{ scale: [1, 0.95, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="w-16 h-40 bg-white/10 rounded-full blur-sm" animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      {/* Arrows pointing inwards */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 flex items-center justify-center"
          style={{ transform: `rotate(${angle}deg) translateX(100px)` }}
        >
          <motion.div
            className="w-8 h-2 bg-cyan-300 rounded-full relative"
            animate={{ x: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          >
            {/* Arrowhead */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-cyan-300" />
          </motion.div>
        </motion.div>
      ))}

      {/* Ambient water rings */}
      <motion.div 
        className="absolute w-64 h-64 border-[1px] border-white/10 rounded-full"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
