"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GammaLoopHeat() {
  const [isWarm, setIsWarm] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center font-sans"
    >
      
      {/* Metrics UI */}
      <div className="absolute top-6 z-30 w-[85%] bg-slate-800/90 p-4 rounded-xl shadow-lg border border-slate-700" dir="rtl">
        <h3 className="font-bold text-slate-100 text-sm mb-2 text-center">השפעת חום על לולאת גמא (Gamma Loop)</h3>
        <p className="text-[10px] text-slate-300 text-center mb-4 leading-relaxed">
          מים חמימים מורידים את רגישות כישור השריר (Muscle Spindle) על ידי הפחתת ירי העצבים המוטוריים מסוג גמא, מה שמוביל להרפיית השריר והפחתת ספסטיות.
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsWarm(false)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-colors ${!isWarm ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-700 text-slate-400'}`}
          >
            מים קרירים / יבשה (כיווץ)
          </button>
          <button 
            onClick={() => setIsWarm(true)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold transition-colors ${isWarm ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-slate-700 text-slate-400'}`}
          >
            מים חמימים (34°C - הרפיה)
          </button>
        </div>
      </div>

      <div className="relative w-full h-[55%] flex flex-col justify-center items-center mt-24">
        
        {/* Muscle */}
        <motion.div 
          className="relative w-48 h-16 bg-red-800 rounded-full border-4 border-red-900 flex items-center justify-center z-20"
          animate={{ scaleX: isWarm ? 1.1 : 0.9, backgroundColor: isWarm ? "#7f1d1d" : "#991b1b" }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Muscle Spindle */}
          <div className="w-16 h-4 bg-yellow-600/50 rounded-full border border-yellow-500 flex items-center justify-center relative">
             {/* Spindle coils */}
             <motion.svg 
               className="absolute w-full h-8 text-yellow-400" 
               viewBox="0 0 100 20"
               animate={{ scaleX: isWarm ? 1.2 : 0.8 }}
               transition={{ type: "spring", stiffness: 50 }}
             >
                <path d="M0,10 Q5,0 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" fill="transparent" stroke="currentColor" strokeWidth="2" />
             </motion.svg>
          </div>
          <div className="absolute -bottom-6 text-[10px] text-red-300 font-bold">שריר (Muscle)</div>
        </motion.div>

        {/* Nerves connecting Spindle to Spinal Cord (Imagined above) */}
        <div className="absolute top-0 w-full h-32 flex justify-center z-10">
           {/* Afferent (Sensory) Ia */}
           <div className="absolute left-[35%] w-1 h-32 bg-blue-500/30">
              {/* Signals */}
              <motion.div 
                className="w-full h-4 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                animate={{ y: [-32, 128] }}
                transition={{ repeat: Infinity, duration: isWarm ? 1.5 : 0.5, ease: "linear" }}
              />
              <span className="absolute -left-12 top-10 text-[8px] text-blue-400 font-bold -rotate-90">Ia Afferent</span>
           </div>

           {/* Efferent (Gamma Motor) */}
           <div className="absolute right-[35%] w-1 h-32 bg-yellow-500/30">
              <motion.div 
                className="w-full h-4 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                animate={{ y: [128, -32] }}
                transition={{ repeat: Infinity, duration: isWarm ? 2 : 0.4, ease: "linear" }}
              />
              <span className="absolute -right-14 top-10 text-[8px] text-yellow-400 font-bold -rotate-90">Gamma Motor</span>
           </div>
        </div>

        {/* Spinal Cord (Top edge) */}
        <div className="absolute top-[-20px] w-24 h-10 bg-slate-700 rounded-b-full border-b-4 border-slate-600 flex items-end justify-center pb-1 z-20">
           <span className="text-[10px] text-slate-400 font-bold">חוט שדרה</span>
        </div>
      </div>
      
    </motion.div>
  );
}
