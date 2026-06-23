"use client";

import React from "react";
import { motion } from "framer-motion";
import HumanSkeleton from "../visuals/HumanSkeleton";
import WaterLevelMask from "../visuals/WaterLevelMask";
import GenericGauge from "../visuals/GenericGauge";

export default function PwbC7Animation() {
  // C7 is approximately 85% from the bottom of our HumanSkeleton viewBox
  const WATER_LEVEL = 85; 
  const WEIGHT_BEARING = 10;

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* 
        Safe Zone Top: Floating Tooltips 
        Absolute positioned to avoid interfering with the center
      */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20 pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-800/90 shadow-lg rounded-full px-4 py-2 border border-blue-200 dark:border-blue-800 text-center backdrop-blur-sm"
        >
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            C7 (עורף) - הפחתת משקל מקסימלית
          </span>
        </motion.div>
      </div>

      {/* 
        Safe Zone Center: The Animation
        Uses flex-1 to take up available space between top and bottom
      */}
      <div className="flex-1 relative flex items-center justify-center pt-16 pb-32">
        {/* Container for Character and Water */}
        <div className="relative w-48 h-72 sm:w-56 sm:h-80 max-h-full">
          {/* Background Character */}
          <HumanSkeleton 
            className="w-full h-full text-slate-300 dark:text-slate-600" 
            fill="currentColor"
          />
          
          {/* Water Mask - Rises up to 85% */}
          <WaterLevelMask levelPercentage={WATER_LEVEL} />

          {/* Tooltip pointing to C7 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute z-30 flex items-center"
            style={{ bottom: `calc(${WATER_LEVEL}% - 1px)`, left: '50%', transform: 'translateY(50%)' }}
            dir="ltr"
          >
            <div className="w-8 sm:w-12 h-[2px] bg-blue-600" />
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap ml-1" dir="rtl">
              קו מים (C7)
            </div>
          </motion.div>
        </div>
      </div>

      {/* 
        Safe Zone Bottom: Metrics
        Fixed at bottom to ensure no collision with the center character
      */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-slate-100 dark:border-slate-700"
        >
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
              משקל מופעל (קרקעית)
            </p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
              כ-10% בלבד
            </p>
          </div>
          <GenericGauge 
            value={WEIGHT_BEARING} 
            label="נשיאת משקל" 
            size={80} 
            strokeWidth={8}
            color="#3b82f6" // blue-500
          />
        </motion.div>
      </div>
    </div>
  );
}
