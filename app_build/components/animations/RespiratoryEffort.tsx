"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function RespiratoryEffort() {
  return (
    <div className="w-full h-full bg-[#f8fafc] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Water Depth */}
      <div className="absolute inset-0 bg-blue-500/20"></div>

      {/* Info Card */}
      <div className="absolute top-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border-r-4 border-rose-500 z-30 flex justify-between items-center" dir="rtl">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">מאמץ נשימתי מוגבר (WOB)</h3>
          <p className="text-xs text-slate-600">הלחץ ההידרוסטטי על דופן החזה והבטן דורש הפעלת כוח שרירי רב יותר לשאיפה.</p>
        </div>
        {/* Dynamic WOB Meter */}
        <div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center relative overflow-hidden">
           <motion.div 
             className="absolute bottom-0 w-full bg-rose-500"
             animate={{ height: ['40%', '100%', '40%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           />
           <span className="relative z-10 font-black text-sm text-slate-800 mix-blend-screen">
             <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>+60%</motion.span>
           </span>
        </div>
      </div>

      <div className="relative w-64 h-64 mt-12 z-10">
        {/* Anatomical Lungs Outline */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          {/* Diaphragm */}
          <motion.path 
            d="M 20,150 Q 100,100 180,150 L 180,200 L 20,200 Z" 
            fill="#cbd5e1"
            animate={{ d: ["M 20,150 Q 100,100 180,150 L 180,200 L 20,200 Z", "M 20,150 Q 100,160 180,150 L 180,200 L 20,200 Z"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          
          {/* Left Lung */}
          <motion.path 
            d="M 90,40 C 50,40 30,100 40,150 C 60,140 80,140 90,120 Z" 
            fill="#fecaca" stroke="#ef4444" strokeWidth="2"
            style={{ transformOrigin: "90px 40px" }}
            animate={{ scale: [1, 1.15] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          
          {/* Right Lung */}
          <motion.path 
            d="M 110,40 C 150,40 170,100 160,150 C 140,140 120,140 110,120 Z" 
            fill="#fecaca" stroke="#ef4444" strokeWidth="2"
            style={{ transformOrigin: "110px 40px" }}
            animate={{ scale: [1, 1.15] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          
          {/* Trachea */}
          <path d="M 95,10 L 95,50 M 105,10 L 105,50 M 95,50 L 85,70 M 105,50 L 115,70" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {/* Constricting Water Pressure Ring */}
        <motion.div 
          className="absolute inset-0 border-8 border-blue-500 rounded-full opacity-60"
          animate={{ scale: [1.1, 0.9], opacity: [0.3, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        {/* Struggle Lines (Red tension) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div className="text-rose-600 font-black text-2xl absolute -left-4">→</div>
          <div className="text-rose-600 font-black text-2xl absolute -right-4">←</div>
        </motion.div>
      </div>
      
    </div>
  );
}
