"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function EdemaReduction() {
  return (
    <div className="w-full h-full bg-[#e0f2fe] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Water Gradient (Pressure visualization) */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-700 via-blue-400 to-transparent opacity-40"></div>
      
      {/* Informational overlay */}
      <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-xl shadow-md border-r-4 border-blue-600 z-30" dir="rtl">
        <h3 className="font-bold text-blue-900 text-sm">גרב הלחץ של הטבע</h3>
        <p className="text-xs text-slate-600">לחץ הידרוסטטי גבוה יותר בעומק דוחף נוזלים כלפי מעלה.</p>
      </div>

      <div className="relative w-48 h-80 z-10 flex justify-center">
        {/* Anatomical Leg SVG (Simplified) */}
        <svg viewBox="0 0 100 300" className="w-full h-full drop-shadow-xl">
          <defs>
            {/* Skin gradient */}
            <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
            
            {/* Swelling overlay */}
            <linearGradient id="swelling" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          
          {/* Base Leg Path (Thigh to Foot) */}
          <motion.path 
            d="M 30,0 C 30,50 40,100 40,150 C 40,200 35,250 20,280 C 15,290 20,300 40,300 C 60,300 70,290 70,280 C 65,250 60,200 60,150 C 60,100 70,50 70,0 Z" 
            fill="url(#skin)"
            animate={{ 
              d: [
                "M 20,0 C 20,50 30,100 30,150 C 25,200 15,250 5,280 C 0,290 10,300 50,300 C 90,300 100,290 95,280 C 85,250 75,200 70,150 C 70,100 80,50 80,0 Z", // Swollen state
                "M 30,0 C 30,50 40,100 40,150 C 40,200 35,250 20,280 C 15,290 20,300 40,300 C 60,300 70,290 70,280 C 65,250 60,200 60,150 C 60,100 70,50 70,0 Z"  // Reduced state
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          
          {/* Edema Indicator (Blue Hue at bottom) */}
          <motion.path 
            d="M 30,0 C 30,50 40,100 40,150 C 40,200 35,250 20,280 C 15,290 20,300 40,300 C 60,300 70,290 70,280 C 65,250 60,200 60,150 C 60,100 70,50 70,0 Z" 
            fill="url(#swelling)"
            animate={{ opacity: [0.8, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>

        {/* Lymphatic flow arrows (Upward drainage) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div 
              key={i}
              className="absolute text-blue-900 font-black text-xl"
              initial={{ y: 250, opacity: 0, scale: 0.5 }}
              animate={{ y: 50, opacity: [0, 1, 0], scale: 1.2 }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            >
              ↑
            </motion.div>
          ))}
        </div>
        
        {/* Pressure indicators on sides */}
        <div className="absolute -left-12 bottom-10 flex flex-col items-end gap-2 text-blue-800 font-bold text-sm">
           <span className="opacity-50">לחץ נמוך →</span>
           <span className="opacity-75">לחץ בינוני →</span>
           <span className="opacity-100 text-lg">לחץ גבוה ➔</span>
        </div>
      </div>
      
    </div>
  );
}
