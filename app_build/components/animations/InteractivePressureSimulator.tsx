"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractivePressureSimulator() {
  const [waterHeight, setWaterHeight] = useState(1.0); // 0 to 1.8 meters

  const points = [
    { name: 'קרסול', height: 0.1 },
    { name: 'ברך', height: 0.5 },
    { name: 'אגן', height: 1.0 },
    { name: 'חזה', height: 1.4 },
  ];

  const calcPressure = (pointHeight: number) => {
    const depth = waterHeight - pointHeight;
    return depth > 0 ? Math.round(depth * 73.5) : 0;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative p-2" dir="rtl">
      
      {/* Simulation Area - removed overflow-hidden so tooltips can render outside */}
      <div className="relative w-full max-w-[280px] flex-1 min-h-[180px] max-h-[300px] bg-white/60 rounded-3xl shadow-xl border border-white/50 flex items-end justify-center mb-3 backdrop-blur-md">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] rounded-3xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* The Human Silhouette */}
        <div className="relative w-20 h-[90%] bg-slate-300 rounded-full z-10 flex flex-col items-center justify-end pb-2">
          <div className="absolute top-0 w-14 h-14 bg-slate-300 rounded-full -mt-6"></div>
          
          {/* Pressure Points */}
          {points.map((p, i) => {
            const pressure = calcPressure(p.height);
            const isActive = pressure > 0;
            // Cap visual arrow width so it doesn't break the layout completely, but still scales
            const visualPressure = Math.min(pressure, 100); 
            const arrowWidth = isActive ? 15 + visualPressure * 0.4 : 0;
            
            return (
              <div key={i} className="absolute w-full flex justify-between items-center" style={{ bottom: `${(p.height / 1.8) * 100}%` }}>
                {/* Left Arrow (pointing right, into the person) */}
                {isActive && (
                  <motion.div 
                    layout="position"
                    className="absolute right-full mr-2 h-1.5 bg-blue-600 flex items-center justify-start rounded-l-full"
                    style={{ width: arrowWidth }}
                  >
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[10px] border-blue-600 -mr-1" />
                  </motion.div>
                )}
                
                {/* Right Arrow (pointing left, into the person) */}
                {isActive && (
                  <motion.div 
                    layout="position"
                    className="absolute left-full ml-2 h-1.5 bg-blue-600 flex items-center justify-end rounded-r-full"
                    style={{ width: arrowWidth }}
                  >
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[10px] border-blue-600 -ml-1" />
                  </motion.div>
                )}

                {/* Point Label - Positioned far left to escape the water column */}
                {isActive && (
                  <motion.div 
                    layout="position"
                    className="absolute right-full mr-[70px] whitespace-nowrap bg-white px-3 py-1.5 rounded-lg shadow-lg text-[0.8rem] font-bold text-slate-700 border border-slate-100 z-50 flex flex-col items-end"
                  >
                    <span className="text-slate-400 text-[0.65rem] uppercase tracking-wider">{p.name}</span>
                    <span className="text-blue-600">{pressure} <span className="text-[0.6rem]">mmHg</span></span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Water (Clipped inside rounded container) */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div 
            layout="position"
            className="absolute bottom-0 w-full bg-blue-500/30 border-t-2 border-blue-400/60"
            style={{ height: `${(waterHeight / 1.8) * 100}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
        </div>
      </div>

      {/* Slider Control */}
      <div className="w-full max-w-xs bg-white p-6 rounded-3xl shadow-xl border-2 border-blue-100 shrink-0 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
        <label className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-base font-extrabold text-slate-800 tracking-tight">שלוט בגובה המים</span>
          <span className="text-blue-700 font-black bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 text-sm">{waterHeight.toFixed(1)}m</span>
        </label>
        <div className="relative z-10 pt-2 pb-1">
          <input 
            type="range" 
            min="0" 
            max="1.8" 
            step="0.1" 
            value={waterHeight} 
            onChange={(e) => setWaterHeight(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-inner"
            dir="ltr"
          />
        </div>
      </div>

    </div>
  );
}
