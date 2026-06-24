"use client";

import React from "react";
import { motion } from "framer-motion";
import LungsSvg from "../visuals/LungsSvg";
import GenericGauge from "../visuals/GenericGauge";

export default function VitalCapacityAnimation() {
  return (
    <div className="relative w-full h-full flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="flex-none pt-8 pb-4 px-4 w-full flex justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-800/90 shadow-lg rounded-full px-4 py-2 border border-blue-200 dark:border-blue-800 text-center backdrop-blur-sm"
        >
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            קיבולת הריאה (Vital Capacity)
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        <div className="relative h-full w-full max-h-[350px] max-w-[280px]">
          <LungsSvg 
            mode="vital_capacity" 
            className="w-full h-full text-slate-400 dark:text-slate-500 drop-shadow-md" 
          />
        </div>
      </div>

      <div className="flex-none pb-6 px-4 w-full flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-slate-100 dark:border-slate-700 text-center"
        >
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
              ירידה בנפח המקסימלי
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              נפח האוויר המקסימלי שהריאות יכולות להכיל יורד במים העמוקים
            </p>
          </div>
          <div className="flex-shrink-0">
            <GenericGauge 
              value={10} 
              label="-10%" 
              size={60} 
              strokeWidth={6}
              color="#ef4444" 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
