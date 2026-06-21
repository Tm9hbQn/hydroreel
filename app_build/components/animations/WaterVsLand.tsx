"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function WaterVsLand() {
  return (
    <div className="w-full h-full flex relative overflow-hidden">
      
      {/* Land Side */}
      <div className="w-1/2 h-full bg-gradient-to-b from-orange-100 to-amber-200 relative flex flex-col items-center justify-center border-r-4 border-slate-800">
        <div className="absolute top-4 bg-orange-500/20 text-orange-900 px-3 py-1 rounded-full font-bold text-sm">יבשה</div>
        
        {/* Joint */}
        <div className="w-12 h-24 bg-orange-300 rounded-full border-4 border-orange-500 relative flex items-center justify-center">
           {/* Gravity Vector (Full Weight) */}
           <motion.div 
             className="absolute -top-16 w-2 bg-red-600 origin-bottom flex flex-col items-center"
             animate={{ height: [60, 60] }}
           >
             <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-red-600 absolute -bottom-2"></div>
           </motion.div>
        </div>
        <div className="mt-8 font-black text-red-600 text-xl">100% משקל</div>
      </div>

      {/* Water Side */}
      <div className="w-1/2 h-full bg-gradient-to-b from-cyan-300 to-blue-500 relative flex flex-col items-center justify-center">
        <div className="absolute top-4 bg-blue-900/20 text-white px-3 py-1 rounded-full font-bold text-sm">מים</div>
        
        {/* Joint */}
        <div className="w-12 h-24 bg-blue-100 rounded-full border-4 border-blue-300 relative flex items-center justify-center">
           {/* Gravity Vector (Reduced Weight) */}
           <motion.div 
             className="absolute -top-16 w-2 bg-red-600 origin-bottom flex flex-col items-center"
           >
             <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-red-600 absolute -bottom-2"></div>
           </motion.div>

           {/* Buoyancy Vector (Upward force) */}
           <motion.div 
             className="absolute -bottom-16 w-2 bg-green-400 origin-top flex flex-col items-center h-12"
             animate={{ height: [40, 50, 40] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
             <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-green-400 absolute -top-2"></div>
           </motion.div>
        </div>
        <div className="mt-8 font-black text-white text-xl">30% משקל</div>
      </div>

    </div>
  );
}
