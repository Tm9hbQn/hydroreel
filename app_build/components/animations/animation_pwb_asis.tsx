"use client";

import React from "react";
import { motion } from "framer-motion";
import HumanSkeleton from "../visuals/HumanSkeleton";
import GenericGauge from "../visuals/GenericGauge";

export default function PwbAsisAnimation() {
  const WATER_LEVEL = 50; 
  const WEIGHT_BEARING = 50;

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="flex-none pt-8 pb-4 px-4 w-full flex justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-800/90 shadow-lg rounded-full px-4 py-2 border border-blue-200 dark:border-blue-800 text-center backdrop-blur-sm"
        >
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            ASIS (אגן) - נשיאת חצי משקל
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        <div className="relative h-full w-full max-h-[320px] max-w-[220px]">
          <HumanSkeleton 
            className="w-full h-full text-slate-300 dark:text-slate-600 drop-shadow-md" 
            fill="currentColor"
            waterLevel={WATER_LEVEL}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute z-30 flex items-center"
            style={{ bottom: `calc(${WATER_LEVEL}% - 1px)`, right: '50%', transform: 'translate(10px, 50%)' }}
            dir="ltr"
          >
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap ml-1" dir="rtl">
              קו מים (ASIS)
            </div>
            <div className="w-8 sm:w-16 h-[2px] bg-blue-600" />
          </motion.div>
        </div>
      </div>

      <div className="flex-none pb-6 px-4 w-full flex justify-center z-20">
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
              כ-50%
            </p>
          </div>
          <GenericGauge 
            value={WEIGHT_BEARING} 
            label="נשיאת משקל" 
            size={80} 
            strokeWidth={8}
            color="#3b82f6" 
          />
        </motion.div>
      </div>
    </div>
  );
}
