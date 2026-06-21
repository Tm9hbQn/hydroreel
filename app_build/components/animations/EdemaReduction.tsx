"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function EdemaReduction() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-300 to-blue-500 relative flex items-center justify-center overflow-hidden">
      {/* Water background */}
      <motion.div 
        className="absolute inset-0 bg-blue-400/20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Leg SVG */}
      <div className="relative z-10 w-32 h-64 flex flex-col items-center">
        <motion.div
          className="w-full h-full bg-rose-200 rounded-full border-4 border-rose-300 shadow-inner origin-top"
          initial={{ scaleX: 1.4, scaleY: 1.1 }}
          animate={{ scaleX: 1.0, scaleY: 1.0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        {/* Hydrostatic Pressure Arrows */}
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            {/* Left Arrow */}
            <motion.div 
              className="absolute left-[-40px] text-blue-700 text-2xl font-bold"
              style={{ top: `${20 + i * 20}%` }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              →
            </motion.div>
            {/* Right Arrow */}
            <motion.div 
              className="absolute right-[-40px] text-blue-700 text-2xl font-bold"
              style={{ top: `${20 + i * 20}%` }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: -10, opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              ←
            </motion.div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Label */}
      <div className="absolute top-4 bg-white/80 px-4 py-2 rounded-full font-bold text-blue-900 shadow-sm z-20">
        לחץ הידרוסטטי מוריד בצקות
      </div>
    </div>
  );
}
