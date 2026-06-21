"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TurbulentGliding() {
  return (
    <div className="w-full h-full bg-[#0284c7] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Title */}
      <div className="absolute top-6 text-center z-30" dir="rtl">
        <div className="bg-white/90 px-4 py-2 rounded-xl shadow-md border-r-4 border-cyan-400 inline-block">
           <h3 className="font-bold text-slate-800 text-sm">אפקט יניקה: שובל מערבולות</h3>
           <p className="text-xs text-slate-600">אזור התת-לחץ הנוצר מאחורי גוף בתנועה שואב את המטופל פנימה.</p>
        </div>
      </div>

      <div className="relative w-full h-64 flex items-center justify-center mt-10">
        
        {/* Streamlines (Water flowing around the therapist) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
           {[30, 60, 140, 170].map((y, i) => (
             <motion.path
               key={`streamline-${i}`}
               d={`M 0,${y} C 150,${y} 180,${y<100 ? y-40 : y+40} 220,${y<100 ? y-40 : y+40} C 280,${y} 400,${y} 400,${y}`}
               fill="none"
               stroke="rgba(255,255,255,0.3)"
               strokeWidth="2"
               strokeDasharray="10 10"
               animate={{ strokeDashoffset: [0, -100] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
           ))}
        </svg>

        {/* Therapist Figure (Moving Right -> Left, so wake is on the right) */}
        <motion.div 
          className="w-16 h-24 bg-slate-800 rounded-full border-2 border-slate-600 shadow-xl relative z-20 flex items-center justify-center"
          animate={{ x: [-20, -30, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white text-xs font-bold -rotate-90 block">מטפל</span>
        </motion.div>

        {/* Low Pressure Wake Zone */}
        <motion.div 
          className="absolute right-[10%] w-48 h-32 bg-rose-500/30 rounded-full blur-xl z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute right-[20%] z-20 text-center">
          <span className="text-white font-bold text-sm bg-rose-600/80 px-2 py-1 rounded">תת-לחץ (Vacuum)</span>
          
          {/* Swirling Vortices */}
          <div className="flex gap-4 mt-2 justify-center">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-t-transparent border-rose-300 rounded-full" />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-t-transparent border-rose-300 rounded-full" />
          </div>
        </div>

        {/* Patient Figure (Being pulled into the wake) */}
        <motion.div 
          className="absolute right-4 w-12 h-20 bg-emerald-400 rounded-full border-2 border-emerald-200 shadow-lg z-20 flex items-center justify-center"
          animate={{ x: [20, -40, 20] }} // Pulled left toward therapist
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
           <span className="text-emerald-900 text-[10px] font-bold -rotate-90 block">מטופל</span>
        </motion.div>
        
        {/* Force arrow showing the pull */}
        <motion.div 
          className="absolute right-16 text-rose-200 text-3xl font-black z-30"
          animate={{ x: [10, -20, 10], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ←
        </motion.div>

      </div>
    </div>
  );
}
