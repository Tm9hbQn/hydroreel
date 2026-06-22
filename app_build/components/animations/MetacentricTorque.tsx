"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MetacentricTorque() {
  const [amputations, setAmputations] = useState({
    leftArm: false,
    rightArm: false,
    leftLeg: false,
    rightLeg: false,
  });

  const parts = [
    { id: 'head', mass: 8, buoy: 8, x: 0, y: -80, massY: -80, buoyY: -80, present: true },
    { id: 'torso', mass: 48, buoy: 68, x: 0, y: 0, massY: 30, buoyY: -30, present: true },
    { id: 'leftArm', mass: 6, buoy: 4, x: -50, y: -10, massY: -10, buoyY: -10, present: !amputations.leftArm },
    { id: 'rightArm', mass: 6, buoy: 4, x: 50, y: -10, massY: -10, buoyY: -10, present: !amputations.rightArm },
    { id: 'leftLeg', mass: 16, buoy: 8, x: -22, y: 80, massY: 80, buoyY: 80, present: !amputations.leftLeg },
    { id: 'rightLeg', mass: 16, buoy: 8, x: 22, y: 80, massY: 80, buoyY: 80, present: !amputations.rightLeg },
  ];

  let totalMass = 0;
  let totalBuoy = 0;
  let cgX = 0;
  let cgY = 0;
  let cbX = 0;
  let cbY = 0;
  let visualCgX = 0;
  let visualCgY = 0;
  let visualCbX = 0;
  let visualCbY = 0;

  for (const p of parts) {
    if (p.present) {
      totalMass += p.mass;
      totalBuoy += p.buoy;
      // Physics calculation for angle (same as before to keep the dramatic rotation)
      cgX += p.mass * p.x;
      cgY += p.mass * p.y;
      cbX += p.buoy * p.x;
      cbY += p.buoy * p.y;
      
      // Visual calculation for dots (split points for anatomy)
      visualCgX += p.mass * p.x;
      visualCgY += p.mass * p.massY;
      visualCbX += p.buoy * p.x;
      visualCbY += p.buoy * p.buoyY;
    }
  }

  cgX /= totalMass;
  cgY /= totalMass;
  cbX /= totalBuoy;
  cbY /= totalBuoy;

  visualCgX /= totalMass;
  visualCgY /= totalMass;
  visualCbX /= totalBuoy;
  visualCbY /= totalBuoy;

  const dx = cgX - cbX;
  const dy = cgY - cbY;
  
  // Angle to align CG directly below CB
  const targetAngle = Math.atan2(dx, dy) * (180 / Math.PI);
  
  // Adjust vertical position slightly to simulate buoyancy changes
  const floatY = (totalMass / totalBuoy) * 15 - 15; 

  const handleToggle = (limb: keyof typeof amputations) => {
    setAmputations(prev => ({ ...prev, [limb]: !prev[limb] }));
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-sky-100 flex items-center justify-center font-sans">
      
      {/* Controls */}
      <div className="absolute top-2 md:top-4 left-2 right-2 md:right-auto md:left-4 z-50 bg-white/90 p-2 md:p-3 rounded-xl shadow-lg backdrop-blur-md text-[10px] md:text-sm rtl flex flex-col md:block" dir="rtl">
        <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-center md:text-right">סימון קטיעות:</h3>
        <div className="flex flex-row md:grid md:grid-cols-2 gap-2 justify-center">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={amputations.rightArm} onChange={() => handleToggle('rightArm')} className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
            <span>יד ימין</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={amputations.leftArm} onChange={() => handleToggle('leftArm')} className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
            <span>יד שמאל</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={amputations.rightLeg} onChange={() => handleToggle('rightLeg')} className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
            <span>רגל ימין</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={amputations.leftLeg} onChange={() => handleToggle('leftLeg')} className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
            <span>רגל שמאל</span>
          </label>
        </div>
      </div>

      {/* Water Level */}
      <div className="absolute bottom-0 w-full h-[55%] bg-blue-500/50 border-t border-cyan-300 z-20 pointer-events-none"></div>

      {/* The Body Container */}
      <motion.div 
        className="relative z-10 w-0 h-0"
        animate={{ 
          rotate: targetAngle,
          y: floatY 
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
      >
        {/* Subtle breathing/floating animation wrapper */}
        <motion.div
          className="relative w-0 h-0"
          animate={{ y: [-3, 3, -3], rotate: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Head */}
          <div 
            className="absolute top-0 left-0 w-[48px] h-[56px] bg-orange-200 rounded-full border-2 border-orange-300" 
            style={{ transform: `translate(calc(-50% + ${parts[0].x}px), calc(-50% + ${parts[0].y}px))` }}
          />
          
          {/* Torso */}
          <div 
            className="absolute top-0 left-0 w-[80px] h-[112px] bg-orange-300 rounded-3xl border-2 border-orange-400 overflow-hidden" 
            style={{ transform: `translate(calc(-50% + ${parts[1].x}px), calc(-50% + ${parts[1].y}px))` }}
          >
            {/* Lungs visual indication */}
            <div className="absolute top-2 left-2 right-2 h-14 bg-blue-100/40 rounded-2xl border border-blue-200/50"></div>
          </div>
          
          {/* Left Arm */}
          {!amputations.leftArm && (
            <div 
              className="absolute top-0 left-0 w-[32px] h-[90px] bg-orange-200 rounded-full border-2 border-orange-300 origin-top" 
              style={{ transform: `translate(calc(-50% + ${parts[2].x}px), calc(-50% + ${parts[2].y}px)) rotate(15deg)` }}
            />
          )}
          
          {/* Right Arm */}
          {!amputations.rightArm && (
            <div 
              className="absolute top-0 left-0 w-[32px] h-[90px] bg-orange-200 rounded-full border-2 border-orange-300 origin-top" 
              style={{ transform: `translate(calc(-50% + ${parts[3].x}px), calc(-50% + ${parts[3].y}px)) rotate(-15deg)` }}
            />
          )}
          
          {/* Left Leg */}
          {!amputations.leftLeg && (
            <div 
              className="absolute top-0 left-0 w-[40px] h-[110px] bg-orange-200 rounded-full border-2 border-orange-300 origin-top" 
              style={{ transform: `translate(calc(-50% + ${parts[4].x}px), calc(-50% + ${parts[4].y}px)) rotate(5deg)` }}
            />
          )}
          
          {/* Right Leg */}
          {!amputations.rightLeg && (
            <div 
              className="absolute top-0 left-0 w-[40px] h-[110px] bg-orange-200 rounded-full border-2 border-orange-300 origin-top" 
              style={{ transform: `translate(calc(-50% + ${parts[5].x}px), calc(-50% + ${parts[5].y}px)) rotate(-5deg)` }}
            />
          )}

          {/* Center of Buoyancy (B) */}
          <motion.div 
            className="absolute w-5 h-5 bg-white rounded-full shadow-[0_0_12px_white] flex items-center justify-center z-30"
            animate={{ x: visualCbX, y: visualCbY }}
            style={{ x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="absolute -left-7 text-[11px] font-bold text-blue-900 bg-white/90 px-1 rounded shadow">CB</span>
          </motion.div>

          {/* Center of Gravity (G) */}
          <motion.div 
            className="absolute w-5 h-5 bg-black rounded-full shadow-[0_0_12px_black] flex items-center justify-center z-30"
            animate={{ x: visualCgX, y: visualCgY }}
            style={{ x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="absolute -right-7 text-[11px] font-bold text-black bg-white/90 px-1 rounded shadow">CG</span>
          </motion.div>

          {/* Metacentric Torque Line */}
          <motion.svg 
            className="absolute top-0 left-0 overflow-visible z-20 pointer-events-none opacity-60"
          >
            <motion.line
              x1={visualCbX}
              y1={visualCbY}
              x2={visualCgX}
              y2={visualCgY}
              animate={{ x1: visualCbX, y1: visualCbY, x2: visualCgX, y2: visualCgY }}
              transition={{ type: "spring", stiffness: 100 }}
              stroke="yellow"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
      
      {/* Legend */}
      <div className="absolute bottom-2 md:bottom-4 left-2 right-2 md:left-auto md:right-4 z-50 bg-white/90 p-2 md:p-3 rounded-xl shadow-lg backdrop-blur-md text-[10px] md:text-xs rtl flex justify-around md:block" dir="rtl">
        <div className="flex items-center gap-1 md:gap-2 md:mb-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] border border-gray-300"></div>
          <span className="font-semibold text-gray-800">CB</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 md:mb-1">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"></div>
          <span className="font-semibold text-gray-800">CG</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 md:mt-2 md:pt-2 md:border-t border-gray-200 text-gray-600">
          <div className="w-4 h-0 border-t-2 border-yellow-500 border-dashed"></div>
          <span>מומנט</span>
        </div>
      </div>
    </div>
  );
}
