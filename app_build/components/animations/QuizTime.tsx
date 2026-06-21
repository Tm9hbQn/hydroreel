"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function QuizTime() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background pulsing circle */}
      <motion.div
        className="absolute w-64 h-64 bg-white/10 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center rotate-12 relative z-10"
        animate={{ rotate: [12, -12, 12], y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-600 drop-shadow-sm">?</span>
      </motion.div>

      {/* Floating particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: (Math.random() - 0.5) * 200, 
            y: (Math.random() - 0.5) * 200, 
            opacity: [0, 1, 0] 
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="mt-12 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-bold text-white text-xl shadow-inner border border-white/30 z-20">
        זמן לבחון את הידע!
      </div>
    </div>
  );
}
