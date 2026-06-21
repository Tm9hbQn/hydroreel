"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function RespiratoryEffort() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-200 to-blue-600 relative flex items-center justify-center overflow-hidden">
      
      {/* Lungs Container */}
      <div className="relative z-10 w-48 h-48 flex justify-center gap-2">
        {/* Left Lung */}
        <motion.div
          className="w-1/2 h-full bg-pink-300 rounded-[50px] border-4 border-pink-400 origin-bottom shadow-lg"
          animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Right Lung */}
        <motion.div
          className="w-1/2 h-full bg-pink-300 rounded-[50px] border-4 border-pink-400 origin-bottom shadow-lg"
          animate={{ scaleX: [1, 1.3, 1], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Water Pressure Resistance Arrows */}
        {[0, 1].map((i) => (
          <React.Fragment key={i}>
            <motion.div 
              className="absolute left-[-30px] text-blue-900 text-3xl font-black drop-shadow-md"
              style={{ top: `${30 + i * 30}%` }}
              animate={{ x: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.div>
            <motion.div 
              className="absolute right-[-30px] text-blue-900 text-3xl font-black drop-shadow-md"
              style={{ top: `${30 + i * 30}%` }}
              animate={{ x: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ←
            </motion.div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Label */}
      <div className="absolute bottom-6 bg-white/80 px-4 py-2 rounded-full font-bold text-blue-900 shadow-sm z-20">
        התנגדות מים לנשימה
      </div>
    </div>
  );
}
