"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function TurbulentGliding() {
  return (
    <div className="w-full h-full bg-[#0369a1] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Explanation Tag */}
      <div className="absolute top-6 z-30 flex justify-center w-full px-4">
        <div className="bg-white/95 px-4 py-3 rounded-2xl shadow-xl border-t-4 border-cyan-400 text-center" dir="rtl">
           <h3 className="font-black text-slate-800 text-base mb-1">אפקט היניקה (Turbulent Gliding)</h3>
           <p className="text-xs text-slate-600 font-medium">המטפל נע לאחור, חותך את המים ויוצר מאחוריו "חלל" של תת-לחץ.<br/>המים והמטופל נשאבים פנימה כדי למלא את החלל.</p>
        </div>
      </div>

      <div className="relative w-full h-[60%] mt-16 flex items-center justify-center">
        
        {/* The Therapist (Moving Right to Left) */}
        {/* We fix the camera on the therapist, so the water moves Left to Right */}
        
        {/* Flow Lines (Water wrapping around the therapist) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
           {/* Top flow line */}
           <path d="M 0,100 C 120,100 150,50 200,50 C 250,50 300,100 400,100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
           <motion.circle cx="0" cy="0" r="4" fill="white" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M 0,100 C 120,100 150,50 200,50 C 250,50 300,100 400,100')" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
           
           {/* Bottom flow line */}
           <path d="M 0,200 C 120,200 150,250 200,250 C 250,250 300,200 400,200" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
           <motion.circle cx="0" cy="0" r="4" fill="white" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M 0,200 C 120,200 150,250 200,250 C 250,250 300,200 400,200')" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        </svg>

        {/* Therapist */}
        <div className="absolute left-[30%] z-20 flex flex-col items-center">
           <div className="w-16 h-16 bg-slate-800 rounded-full border-4 border-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center relative">
             <span className="text-white font-bold text-xs">מטפל</span>
             {/* Movement indicator for therapist */}
             <motion.div 
               className="absolute -left-12 flex items-center text-white/80 font-black text-xl"
               animate={{ x: [-5, 5, -5] }}
               transition={{ duration: 1, repeat: Infinity }}
             >
               ←←
             </motion.div>
           </div>
        </div>

        {/* Low Pressure Wake (Vacuum Zone) */}
        <div className="absolute left-[45%] right-[20%] h-32 flex items-center justify-center z-10">
           {/* The colored vacuum area */}
           <motion.div 
             className="w-full h-full bg-gradient-to-r from-rose-500/40 to-transparent rounded-l-full blur-md flex items-center pl-8"
             animate={{ opacity: [0.5, 0.8, 0.5], scaleY: [0.9, 1.1, 0.9] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
           >
              <div className="text-rose-100 font-bold text-sm bg-rose-600/80 px-2 py-1 rounded shadow-sm whitespace-nowrap">
                 תת-לחץ (שאיבה)
              </div>
           </motion.div>
        </div>

        {/* Patient inside the wake */}
        <div className="absolute right-[15%] z-20 flex flex-col items-center">
           <motion.div 
             className="w-14 h-14 bg-emerald-400 rounded-full border-4 border-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.8)] flex items-center justify-center"
             animate={{ x: [-5, -25, -5] }} // Pulled Left toward the therapist
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
             <span className="text-emerald-900 font-bold text-[10px]">מטופל</span>
           </motion.div>
        </div>

        {/* Force Connection Arrow (Patient -> Therapist) */}
        <div className="absolute left-[45%] right-[25%] flex items-center justify-center z-30 pointer-events-none">
           <motion.div 
             className="flex items-center text-rose-300 drop-shadow-md"
             animate={{ x: [10, -10, 10] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
              <span className="text-3xl font-black">←</span>
              <div className="h-1 w-16 bg-rose-300 border-y border-rose-400"></div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
