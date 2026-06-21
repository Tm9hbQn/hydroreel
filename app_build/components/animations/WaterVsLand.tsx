"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WaterVsLand() {
  const [isMoving, setIsMoving] = useState(true);

  // Toggle movement every 3 seconds to show accommodative resistance
  useEffect(() => {
    const interval = setInterval(() => setIsMoving(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex relative overflow-hidden font-sans">
      
      {/* Informational overlay */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
        <div className="bg-white/90 px-4 py-2 rounded-full shadow border border-slate-200 text-sm font-bold text-slate-800" dir="rtl">
          {isMoving ? 'בתנועה: התנגדות פעילה' : 'בעצירה: התנגדות צונחת לאפס'}
        </div>
      </div>

      {/* Land Side (Constant Load) */}
      <div className="w-1/2 h-full bg-orange-50 relative flex flex-col items-center justify-center border-r-4 border-slate-800">
        <div className="absolute top-16 bg-orange-200 text-orange-900 px-3 py-1 rounded-full font-bold text-sm z-10">יבשה (עומס קבוע)</div>
        
        {/* Arm carrying Dumbbell */}
        <div className="relative w-20 h-40 flex flex-col items-center justify-end">
           {/* Arm */}
           <motion.div 
             className="w-8 bg-orange-300 rounded-full border-2 border-orange-400 origin-top"
             animate={{ height: isMoving ? [60, 100, 60] : 80 }}
             transition={isMoving ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
           >
             {/* Dumbbell */}
             <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
               5 KG
             </div>
             
             {/* Gravity Vector (Constant size, always pointing down) */}
             <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-2 h-12 bg-red-600"></div>
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-red-600"></div>
                <span className="text-red-600 font-bold text-xs mt-1">100%</span>
             </div>
           </motion.div>
        </div>
      </div>

      {/* Water Side (Accommodative Load) */}
      <div className="w-1/2 h-full bg-blue-100 relative flex flex-col items-center justify-center">
        {/* Water pattern */}
        <div className="absolute inset-0 bg-blue-500/10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-16 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-sm z-10 shadow-md">מים (עומס אקומודטיבי)</div>
        
        {/* Arm moving through water (No Dumbbell) */}
        <div className="relative w-20 h-40 flex flex-col items-center justify-end">
           {/* Arm */}
           <motion.div 
             className="w-8 bg-orange-300 rounded-full border-2 border-orange-400 origin-top relative z-20"
             animate={{ height: isMoving ? [60, 100, 60] : 80 }}
             transition={isMoving ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
           >
             {/* Drag Vector (Appears ONLY when moving, points UP because hand pushes DOWN) */}
             {isMoving && (
               <motion.div 
                 className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1, y: [10, -20, 10] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               >
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-sky-600"></div>
                  <div className="w-2 h-16 bg-sky-600"></div>
                  <span className="text-sky-700 font-bold text-xs bg-white/80 px-1 rounded absolute top-[-20px]">גרר</span>
               </motion.div>
             )}
           </motion.div>
        </div>
      </div>

    </div>
  );
}
