"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImmersionDiuresis() {
  const [immersion, setImmersion] = useState(0); // 0 to 100

  // 100 immersion = neck deep. The higher immersion, the more blood shifts, the more ANP, the more diuresis.
  const isDeep = immersion > 70;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center font-sans"
    >
      
      {/* Metrics UI */}
      <div className="absolute top-6 z-30 w-[85%] bg-white/90 p-4 rounded-xl shadow-lg border border-slate-200" dir="rtl">
        <h3 className="font-bold text-slate-800 text-sm mb-2 text-center">השתנה עקב טבילה (Immersion Diuresis)</h3>
        <p className="text-[10px] text-slate-600 text-center mb-4 leading-relaxed">
          לחץ הידרוסטטי דוחף דם מהגפיים לבית החזה. הלב נמתח ומשחרר ANP, המדכא ADH וגורם לכליות להפריש מים.
        </p>

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
          <span>צוואר</span>
        </div>
      </div>

      <div className="relative w-full h-[60%] flex justify-center items-end pb-8 z-20 mt-16">
        
        {/* Body Outline */}
        <div className="relative w-32 h-72 flex flex-col items-center z-20">
          
          {/* Head */}
          <div className="w-12 h-14 bg-rose-100 rounded-full border-2 border-rose-200 z-10"></div>
          
          {/* Torso */}
          <div className="relative w-20 h-28 bg-rose-100 rounded-3xl border-2 border-rose-200 -mt-2 z-10 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Thoracic Blood Volume (Central Shift) */}
            <motion.div 
              className="absolute bottom-0 w-full bg-rose-500/30"
              animate={{ height: `${20 + immersion * 0.8}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />

            {/* Heart */}
            <motion.div 
              className="absolute top-4 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: 1 + (immersion * 0.005) }}
            >
              {isDeep && (
                 <motion.div 
                   className="absolute w-8 h-8 rounded-full border-2 border-cyan-400"
                   animate={{ scale: [1, 2], opacity: [1, 0] }}
                   transition={{ repeat: Infinity, duration: 1 }}
                 />
              )}
            </motion.div>
            {isDeep && <span className="absolute top-2 right-1 text-[8px] font-bold text-cyan-600 bg-white/80 px-1 rounded">ANP</span>}

            {/* Kidneys */}
            <div className="absolute bottom-6 flex gap-4">
              <div className="w-3 h-4 bg-orange-800 rounded-full"></div>
              <div className="w-3 h-4 bg-orange-800 rounded-full"></div>
            </div>
          </div>
          
          {/* Legs */}
          <div className="flex gap-2 -mt-2 relative">
             <div className="w-8 h-32 bg-rose-100 rounded-full border-2 border-rose-200 overflow-hidden relative">
                {/* Leg Blood Volume (Decreases with immersion) */}
                <motion.div 
                  className="absolute bottom-0 w-full bg-rose-500/30"
                  animate={{ height: `${100 - immersion}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
             </div>
             <div className="w-8 h-32 bg-rose-100 rounded-full border-2 border-rose-200 overflow-hidden relative">
                <motion.div 
                  className="absolute bottom-0 w-full bg-rose-500/30"
                  animate={{ height: `${100 - immersion}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
             </div>
          </div>

          {/* Diuresis Drops */}
          {isDeep && (
            <div className="absolute bottom-16 flex flex-col items-center">
              <motion.div 
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ y: [0, 40], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              <motion.div 
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ y: [0, 40], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Water Surface Container */}
        <motion.div 
          className="absolute bottom-0 w-full z-30 pointer-events-none flex items-end"
          animate={{ height: immersion * 2.8 }} 
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
           <div className="w-full h-full bg-blue-500/40 border-t-2 border-cyan-300 backdrop-blur-[2px]"></div>
        </motion.div>

      </div>
      
    </motion.div>
  );
}
