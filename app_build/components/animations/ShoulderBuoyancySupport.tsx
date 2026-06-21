"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShoulderBuoyancySupport() {
  const [inWater, setInWater] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center font-sans"
    >
      
      {/* Metrics UI */}
      <div className="absolute top-6 z-30 w-[85%] bg-white/90 p-4 rounded-xl shadow-lg border border-slate-200" dir="rtl">
        <h3 className="font-bold text-slate-800 text-sm mb-2 text-center">תמיכת כוח העילוי במפרק הכתף</h3>
        <p className="text-xs text-slate-600 text-center mb-4 leading-relaxed">
          בסביבה יבשתית נדרש מאמץ שרירי רב להרמת הזרוע. המים מספקים תמיכה (AAROM), המפחיתה משמעותית את העומס על גידי השרוול המסובב (Rotator Cuff).
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setInWater(false)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${!inWater ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-600'}`}
          >
            יבשה
          </button>
          <button 
            onClick={() => setInWater(true)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${inWater ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' : 'bg-slate-200 text-slate-600'}`}
          >
            מים (עד הכתף)
          </button>
        </div>
      </div>

      <div className="relative w-full h-[60%] flex justify-center items-end pb-12 z-20 mt-20">
        
        {/* The Person */}
        <div className="relative w-32 h-64 flex flex-col items-center z-20">
          
          {/* Head */}
          <div className="w-14 h-16 bg-slate-300 rounded-full border-2 border-slate-400 z-10"></div>
          {/* Torso */}
          <div className="w-20 h-28 bg-slate-400 rounded-3xl border-2 border-slate-500 -mt-2 z-10 relative">
             {/* Muscle Effort Indicator */}
             <motion.div 
               className="absolute top-2 right-2 w-4 h-4 rounded-full"
               animate={{ 
                 backgroundColor: inWater ? '#10b981' : '#ef4444',
                 scale: inWater ? 1 : [1, 1.2, 1] 
               }}
               transition={{ duration: 1, repeat: inWater ? 0 : Infinity }}
             />
          </div>
          
          {/* Static Left Arm */}
          <div className="absolute top-16 -left-4 w-6 h-24 bg-slate-300 rounded-full border-2 border-slate-400 origin-top rotate-12"></div>
          
          {/* Moving Right Arm */}
          <motion.div 
            className="absolute top-16 -right-4 w-6 h-28 bg-slate-300 rounded-full border-2 border-slate-400 origin-top z-30 flex justify-center"
            initial={{ rotate: -10 }}
            animate={{ rotate: inWater ? -110 : -90 }}
            transition={{ 
              type: "spring", 
              stiffness: inWater ? 60 : 100, 
              damping: inWater ? 10 : 20,
              repeat: Infinity,
              repeatType: "reverse",
              duration: inWater ? 2.5 : 1.5
            }}
          >
             {/* Buoyancy Force Arrow for Arm */}
             <motion.div 
               className="absolute top-1/2 left-8 flex flex-col items-center origin-bottom rotate-90"
               initial={{ opacity: 0 }}
               animate={{ opacity: inWater ? 1 : 0, scale: inWater ? 1 : 0 }}
               transition={{ duration: 0.5 }}
             >
               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-blue-600"></div>
               <div className="w-1.5 h-6 bg-blue-600 rounded-b-sm"></div>
             </motion.div>
          </motion.div>

          {/* Legs */}
          <div className="flex gap-2 -mt-4">
             <div className="w-8 h-32 bg-slate-300 rounded-full border-2 border-slate-400"></div>
             <div className="w-8 h-32 bg-slate-300 rounded-full border-2 border-slate-400"></div>
          </div>

        </div>

        {/* Water Surface Container */}
        <motion.div 
          className="absolute bottom-0 w-full z-30 pointer-events-none flex items-end"
          initial={{ height: 0 }}
          animate={{ height: inWater ? 240 : 0 }} 
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
           <div className="w-full h-full bg-blue-500/40 border-t-2 border-cyan-300 backdrop-blur-[2px]"></div>
           {/* Water Wave SVG */}
           {inWater && (
             <motion.svg 
               className="absolute top-0 left-0 w-[200%] h-4 -mt-[14px] text-cyan-300 opacity-60" 
               viewBox="0 0 1200 120" 
               preserveAspectRatio="none"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ ease: "linear", duration: 5, repeat: Infinity }}
             >
               <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity=".25"></path>
               <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.84V0Z" fill="currentColor"></path>
             </motion.svg>
           )}
        </motion.div>

      </div>
      
    </motion.div>
  );
}
