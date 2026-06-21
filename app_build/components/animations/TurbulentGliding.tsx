"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TurbulentGliding() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-700 to-cyan-400 relative flex items-center justify-center overflow-hidden">
      
      {/* Gliding Body */}
      <motion.div 
        className="w-32 h-12 bg-white rounded-full shadow-lg relative z-20 flex items-center px-4"
        animate={{ x: [-100, 100], y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full ml-auto"></div>
        {/* Wake / Turbulence lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute right-full w-16 h-8 border-t-2 border-b-2 border-white/40 rounded-full"
            style={{ top: `${i * 10 - 5}px` }}
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2], x: -60 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        {/* Vortex spirals */}
        {[0, 1].map((i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute right-[120%] w-10 h-10 border-2 border-dashed border-white/50 rounded-full"
            style={{ top: i === 0 ? '-20px' : '20px' }}
            initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
            animate={{ rotate: i === 0 ? -360 : 360, opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.8], x: -80 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* Water flow lines background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 bg-white absolute rounded-full"
            style={{ top: `${20 + i * 15}%`, left: '100%', width: '100px' }}
            animate={{ left: ['100%', '-50%'] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 bg-white/80 px-5 py-2 rounded-full font-bold text-blue-900 shadow-sm z-30">
        זרימה מערבולית (Drag)
      </div>
    </div>
  );
}
