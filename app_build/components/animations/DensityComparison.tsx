"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function DensityComparison() {
  return (
    <div className="w-full h-full bg-slate-900 relative flex flex-col items-center justify-center overflow-hidden font-sans text-white">
      
      {/* Title */}
      <div className="absolute top-6 text-center z-30" dir="rtl">
        <h3 className="font-bold text-xl text-sky-300">מי יצוף ומי ישקע?</h3>
        <p className="text-sm text-slate-300">משקל סגולי (SG) קובע את הציפה במים</p>
      </div>

      {/* Tank */}
      <div className="relative w-[90%] h-3/5 bg-sky-900/40 rounded-b-3xl border-b-4 border-l-4 border-r-4 border-slate-600 mt-12 flex justify-around items-end pb-8">
        {/* Water Surface */}
        <div className="absolute top-0 left-0 w-full h-2 bg-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>

        {/* Person 1: Athlete (High Muscle) - Sinks */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
          <div className="bg-slate-800/80 px-2 py-1 rounded text-xs text-center border border-slate-600">
            <span className="text-rose-400 font-bold block">שריר (אתלט)</span>
            SG: 1.05
          </div>
          <motion.div 
            className="w-12 h-24 bg-rose-500 rounded-full border-2 border-rose-300 shadow-lg relative flex items-center justify-center overflow-hidden"
            initial={{ y: -100 }}
            animate={{ y: 20 }} // Sinks below surface
            transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.2 }}
          >
            {/* Dumbbell icon inside */}
            <span className="text-white/50 text-xl font-black">M</span>
          </motion.div>
        </div>

        {/* Person 2: Obese (High Fat) - Floats High */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
          <div className="bg-slate-800/80 px-2 py-1 rounded text-xs text-center border border-slate-600">
            <span className="text-yellow-400 font-bold block">שומן (השמנה)</span>
            SG: 0.8
          </div>
          <motion.div 
            className="w-16 h-16 bg-yellow-400 rounded-full border-2 border-yellow-200 shadow-lg relative flex items-center justify-center"
            initial={{ y: -100 }}
            animate={{ y: -50 }} // Floats high above surface
            transition={{ duration: 1.5, delay: 0.7, type: "spring", bounce: 0.5 }}
          >
             <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="text-yellow-800/50 text-xl font-black">F</motion.div>
          </motion.div>
        </div>

        {/* Person 3: DMD Patient - Unstable Float */}
        <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
          <div className="bg-slate-800/80 px-2 py-1 rounded text-xs text-center border border-slate-600">
            <span className="text-purple-400 font-bold block">דושן (DMD)</span>
            שריר מתחלף לשומן
          </div>
          <motion.div 
            className="w-14 h-20 bg-gradient-to-t from-rose-500 to-yellow-400 rounded-full border-2 border-purple-300 shadow-lg relative"
            initial={{ y: -100, rotate: 0 }}
            animate={{ y: -30, rotate: [-10, 20, -15, 5] }} // Floats but loses balance
            transition={{ y: { duration: 1.5, delay: 0.9, type: "spring", bounce: 0.4 }, rotate: { duration: 4, repeat: Infinity, delay: 2 } }}
          >
             <div className="absolute top-2 right-2 text-xl">⚠️</div>
          </motion.div>
        </div>
        
      </div>
      
    </div>
  );
}
