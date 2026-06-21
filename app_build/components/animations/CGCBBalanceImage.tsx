"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CGCBBalanceImage() {
  const [isBalanced, setIsBalanced] = useState(false);

  useEffect(() => {
    // Toggle balance state every 4 seconds
    const interval = setInterval(() => {
      setIsBalanced(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-50 to-blue-200 flex flex-col items-center justify-center font-sans">
      
      {/* Title / Status */}
      <div className="absolute top-6 z-30 flex flex-col items-center">
        <h3 className="font-bold text-slate-800 text-lg">שיווי משקל במים</h3>
        <span className={`px-4 py-1 rounded-full text-white font-bold text-sm shadow-md transition-colors duration-500 ${isBalanced ? 'bg-emerald-500' : 'bg-rose-500'}`}>
          {isBalanced ? "מיוצב: יציבות מטא-סנטרית" : "חוסר איזון: מומנט סיבוב"}
        </span>
      </div>

      {/* Water Surface */}
      <div className="absolute top-1/2 w-full h-[50%] bg-blue-500/30 border-t border-cyan-400 z-10 pointer-events-none"></div>

      <div className="relative w-full h-full flex justify-center items-center z-20">
        
        {/* The Body */}
        <motion.div 
          className="relative w-16 h-40 flex flex-col items-center justify-center origin-center"
          animate={{ rotate: isBalanced ? 0 : 35 }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          {/* Head */}
          <div className="w-12 h-14 bg-orange-200 rounded-full border-2 border-orange-300 absolute top-[-20px]"></div>
          
          {/* Torso */}
          <div className="w-16 h-28 bg-orange-300 rounded-3xl border-2 border-orange-400 absolute top-[40px]"></div>

          {/* Lungs (Buoyancy center area) */}
          <div className="absolute top-[50px] w-12 h-10 bg-blue-100/60 rounded-xl border border-blue-300/50"></div>

          {/* Legs */}
          <div className="absolute top-[160px] flex gap-2">
             <div className="w-6 h-20 bg-orange-200 rounded-full border-2 border-orange-300"></div>
             <div className="w-6 h-20 bg-orange-200 rounded-full border-2 border-orange-300"></div>
          </div>

          {/* CB Point */}
          <div className="absolute top-[60px] w-5 h-5 bg-white rounded-full border border-gray-400 shadow-md flex items-center justify-center z-30">
             <span className="absolute -left-6 text-[10px] font-black text-blue-800 bg-white/80 px-1 rounded">CB</span>
          </div>

          {/* CG Point */}
          <div className="absolute top-[130px] w-5 h-5 bg-black rounded-full border border-gray-600 shadow-md flex items-center justify-center z-30">
             <span className="absolute -right-6 text-[10px] font-black text-white bg-black/80 px-1 rounded">CG</span>
          </div>

        </motion.div>
        
        {/* Alignment Line (Vertical fixed) */}
        <motion.div 
          className="absolute w-0.5 h-64 border-l-2 border-dashed transition-colors duration-500 z-10"
          animate={{ borderColor: isBalanced ? "rgba(16, 185, 129, 0.8)" : "rgba(244, 63, 94, 0.4)" }}
        ></motion.div>

      </div>
      
    </div>
  );
}
