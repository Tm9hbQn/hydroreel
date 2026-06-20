"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function DragEquation() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center">
      {/* Moving object */}
      <motion.div 
        className="w-20 h-20 bg-slate-800 rounded-xl relative z-10 flex items-center justify-center rotate-45"
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-2 bg-slate-600 rounded-lg"></div>
      </motion.div>

      {/* Streamlines & Turbulence */}
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full flex relative">
            <motion.div 
              className="h-1 bg-white/40 rounded-full absolute"
              style={{ top: (i - 2) * 30 }}
              initial={{ left: "100%", width: "50%" }}
              animate={{ left: "-50%" }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear" }}
            />
            {/* Swirls for turbulence behind the object (left side) */}
            <motion.div 
              className="absolute h-8 w-8 border-2 border-white/30 rounded-full"
              style={{ top: (i - 2) * 30 - 15, left: "30%" }}
              animate={{ rotate: 360, scale: [0.5, 1.5, 0.5], opacity: [0, 0.5, 0], x: -100 }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
            />
          </div>
        ))}
      </div>

      <motion.div className="absolute bottom-8 right-8 bg-black/40 px-4 py-2 rounded-lg text-white font-mono text-sm border border-white/20 z-20">
        F<sub className="text-[10px]">d</sub> = ½ ρ v² C<sub className="text-[10px]">d</sub> A
      </motion.div>
    </div>
  );
}
