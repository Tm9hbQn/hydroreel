"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ArchimedesVectors() {
  const [immersion, setImmersion] = useState(0); // 0 to 100

  // Calculate percentage of weight based on immersion depth (rough approximation for teaching)
  // 0% immersion -> 100% weight
  // 30% (knees) -> 90% weight
  // 50% (waist) -> 50% weight
  // 75% (chest) -> 30% weight
  // 90% (neck) -> 10% weight
  const getWeightPercentage = (immersion: number) => {
    if (immersion < 10) return 100;
    if (immersion < 40) return 90 - ((immersion - 10) * 0.5); // linearly drop to ~75%
    if (immersion < 60) return 75 - ((immersion - 40) * 1.25); // linearly drop to 50%
    if (immersion < 85) return 50 - ((immersion - 60) * 0.8); // linearly drop to 30%
    return 30 - ((immersion - 85) * 1.5); // drop to 10%
  };

  const weightPercent = Math.max(10, Math.min(100, Math.round(getWeightPercentage(immersion))));

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-50 to-blue-200 flex flex-col items-center justify-center font-sans">
      
      {/* Metrics UI */}
      <div className="absolute top-6 z-30 w-[80%] bg-white/90 p-4 rounded-xl shadow-lg border-2 border-slate-200" dir="rtl">
        <h3 className="font-bold text-slate-800 text-sm mb-2 text-center">השפעת עומק הטבילה על משקל הגוף</h3>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500">עומס על המפרקים:</span>
          <span className={`text-lg font-black ${weightPercent < 50 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {weightPercent}% משקל יבשה
          </span>
        </div>

        {/* Immersion Slider */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={immersion} 
          onChange={(e) => setImmersion(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
          <span>יבשה</span>
          <span>אגן</span>
          <span>חזה</span>
          <span>צוואר</span>
        </div>
      </div>

      <div className="relative w-full h-[60%] flex justify-center items-end pb-8 z-20 mt-16">
        
        {/* The Person */}
        <motion.div 
          className="relative w-24 h-64 flex flex-col items-center z-20"
          animate={{ y: 20 }} // Keep person static
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Head */}
          <div className="w-12 h-14 bg-orange-200 rounded-full border-2 border-orange-300 z-10"></div>
          {/* Torso */}
          <div className="w-16 h-24 bg-orange-300 rounded-3xl border-2 border-orange-400 -mt-2 z-10"></div>
          {/* Arms */}
          <div className="absolute top-14 -left-4 w-6 h-20 bg-orange-200 rounded-full border-2 border-orange-300 origin-top rotate-12"></div>
          <div className="absolute top-14 -right-4 w-6 h-20 bg-orange-200 rounded-full border-2 border-orange-300 origin-top -rotate-12"></div>
          {/* Legs */}
          <div className="flex gap-2 -mt-4">
             <div className="w-6 h-32 bg-orange-200 rounded-full border-2 border-orange-300"></div>
             <div className="w-6 h-32 bg-orange-200 rounded-full border-2 border-orange-300"></div>
          </div>
          
          {/* Visualizing Buoyancy Force Arrow */}
          <motion.div 
            className="absolute left-[-40px] bottom-0 flex flex-col items-center rotate-180"
            animate={{ height: immersion > 0 ? 50 + immersion : 0, opacity: immersion > 0 ? 1 : 0 }}
          >
            <div className="w-2 h-full bg-blue-500/80 rounded-t-full"></div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-blue-500/80"></div>
            <span className="text-xs font-bold text-blue-800 rotate-180 absolute top-[-20px] bg-white/80 px-1 rounded shadow-sm whitespace-nowrap">כוח העילוי</span>
          </motion.div>

        </motion.div>

        {/* Water Surface Container */}
        <motion.div 
          className="absolute bottom-0 w-full z-30 pointer-events-none flex items-end"
          animate={{ height: immersion * 3 }} // Water rises based on immersion
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
           <div className="w-full h-full bg-blue-500/40 border-t-2 border-cyan-300 backdrop-blur-[2px]"></div>
        </motion.div>

      </div>
      
    </div>
  );
}
