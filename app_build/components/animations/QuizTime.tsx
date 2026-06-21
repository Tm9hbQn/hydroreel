"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuizTime() {
  const [speed, setSpeed] = useState(1);
  const resistance = speed * speed; // F ∝ v²

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 relative flex flex-col items-center justify-center overflow-hidden font-sans text-white p-6">
      
      {/* Question Header */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full text-center shadow-xl mb-8 z-20" dir="rtl">
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">שאלת מחשבה: חוק הגרר</h2>
        <p className="text-sm text-indigo-100">"אם נבקש מהמטופל להניע את היד במהירות כפולה, מה יקרה להתנגדות המים?"</p>
      </div>

      {/* Interactive Formula Visualizer */}
      <div className="w-full max-w-sm flex flex-col items-center z-20">
        
        {/* The Formula */}
        <div className="text-4xl font-mono mb-8 drop-shadow-md">
          F ∝ <span className="text-pink-400">v</span><sup className="text-pink-400">2</sup>
        </div>

        <div className="flex w-full items-end justify-center gap-12 h-40 border-b-2 border-white/20 pb-2">
          
          {/* Speed Bar (Input) */}
          <div className="flex flex-col items-center gap-2">
             <span className="text-xs text-indigo-200">מהירות תנועה (v)</span>
             <motion.div 
               className="w-12 bg-indigo-500 rounded-t-lg"
               animate={{ height: speed * 30 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
             />
             <span className="font-bold text-lg">{speed}x</span>
          </div>

          {/* Resistance Bar (Output) */}
          <div className="flex flex-col items-center gap-2">
             <span className="text-xs text-pink-200 font-bold">התנגדות המים (F)</span>
             <motion.div 
               className="w-16 bg-gradient-to-t from-pink-600 to-rose-400 rounded-t-lg shadow-[0_0_15px_rgba(244,63,94,0.5)]"
               animate={{ height: resistance * 15 }} // Scaled differently to fit screen
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
             />
             <span className="font-black text-2xl text-pink-400 drop-shadow-md">{resistance}x</span>
          </div>
          
        </div>

        {/* Interactive Slider */}
        <div className="mt-8 w-full flex flex-col items-center" dir="rtl">
          <label className="mb-4 text-sm font-bold text-indigo-200">שחק עם המהירות כדי לגלות את התשובה:</label>
          <input 
            type="range" 
            min="1" 
            max="3" 
            step="1" 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-3/4 accent-pink-500"
          />
          <div className="w-3/4 flex justify-between text-xs mt-2 text-white/50">
            <span>רגיל (1x)</span>
            <span>כפול (2x)</span>
            <span>פי 3 (3x)</span>
          </div>
        </div>

      </div>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

    </div>
  );
}
