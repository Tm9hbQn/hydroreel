"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function DensityComparison() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-300 to-blue-700 relative flex items-center justify-around overflow-hidden px-8">
      
      {/* Water Surface Line */}
      <div className="absolute top-1/4 left-0 w-full h-1 bg-white/50 z-0"></div>
      
      {/* Muscle / Bone (High Density) */}
      <div className="relative z-10 w-24 h-full flex flex-col items-center">
        <div className="absolute top-8 text-white font-bold text-center drop-shadow-md text-sm">שריר/עצם<br/>צפיפות גבוהה</div>
        <motion.div
          className="w-16 h-16 bg-red-500 rounded-lg shadow-xl border-2 border-red-700 absolute"
          initial={{ top: '10%' }}
          animate={{ top: '75%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeIn" }}
        />
      </div>

      {/* Fat (Low Density) */}
      <div className="relative z-10 w-24 h-full flex flex-col items-center">
        <div className="absolute top-8 text-white font-bold text-center drop-shadow-md text-sm">שומן<br/>צפיפות נמוכה</div>
        <motion.div
          className="w-16 h-16 bg-yellow-300 rounded-full shadow-lg border-2 border-yellow-500 absolute"
          initial={{ top: '10%' }}
          animate={{ top: '25%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, type: "spring", bounce: 0.5 }}
        >
          {/* Bobbing effect */}
          <motion.div 
            className="w-full h-full"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

    </div>
  );
}
