"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ArchimedesVectors() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-300 to-blue-500 flex items-center justify-center">
      {/* Water surface */}
      <motion.div 
        className="absolute top-1/3 left-0 right-0 h-2 bg-white/30 backdrop-blur-sm"
        animate={{ y: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* The object */}
      <motion.div 
        className="w-32 h-32 bg-amber-400 rounded-xl shadow-lg border-4 border-amber-600 relative z-10"
        animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Gravity Arrow */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 80, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-2 h-16 bg-red-500 rounded-t-full"></div>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-red-500"></div>
          <span className="text-xs font-bold text-red-700 bg-white/80 px-1 rounded absolute top-20">Gravity</span>
        </motion.div>

        {/* Buoyancy Arrow */}
        <motion.div 
          className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center rotate-180"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 100, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-2 h-20 bg-blue-100 rounded-t-full"></div>
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-blue-100"></div>
          <span className="text-xs font-bold text-blue-900 bg-white/80 px-1 rounded absolute top-24 rotate-180">Buoyancy</span>
        </motion.div>
      </motion.div>

      {/* Bubbles */}
      {[...Array(5)].map((_, i) => {
        // Deterministic values based on index to prevent SSR hydration mismatch
        const xPos = (i * 25) - 50; 
        const dur = 2 + (i % 3);
        const del = i * 0.4;
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/50 rounded-full"
            initial={{ y: 200, x: xPos, opacity: 0 }}
            animate={{ y: -200, opacity: [0, 1, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay: del }}
          />
        );
      })}
    </div>
  );
}
