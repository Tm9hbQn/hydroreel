"use client";

import React from "react";
import { motion } from "framer-motion";
import GenericGauge from "../visuals/GenericGauge";

export default function HypoglycemiaRiskAnimation() {
  return (
    <div className="relative w-full h-full flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="flex-none pt-8 pb-4 px-4 w-full flex justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/90 dark:bg-slate-800/90 shadow-lg rounded-full px-4 py-2 border border-red-200 dark:border-red-800 text-center backdrop-blur-sm"
        >
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            סכנת היפוגליקמיה מואצת
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center min-h-0 overflow-hidden w-full gap-8">
        
        {/* Animated Glucose Meter */}
        <motion.div 
          className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border-4 border-slate-200 dark:border-slate-700 flex flex-col items-center"
        >
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">mg/dL</div>
          {/* We animate the number by changing its scale and color */}
          <motion.div
            initial={{ color: "#3b82f6" }}
            animate={{ color: ["#3b82f6", "#f59e0b", "#ef4444"] }}
            transition={{ duration: 4, times: [0, 0.5, 1], repeat: Infinity }}
            className="text-6xl font-black tabular-nums"
          >
            <motion.span
              animate={{ 
                // We fake a decreasing number with a fast counter in Framer Motion (not perfect, but visually effective)
                opacity: [1, 0, 1, 0, 1, 0, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              120
            </motion.span>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-6xl font-black bg-white dark:bg-slate-800"
              animate={{ opacity: [0, 1, 0, 0, 0] }}
              transition={{ duration: 4, times: [0, 0.3, 0.4, 0.5, 1], repeat: Infinity }}
            >
              95
            </motion.div>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-6xl font-black bg-white dark:bg-slate-800 text-red-500"
              animate={{ opacity: [0, 0, 0, 1, 1] }}
              transition={{ duration: 4, times: [0, 0.5, 0.6, 0.8, 1], repeat: Infinity }}
            >
              65
            </motion.div>
          </motion.div>
          
          <div className="mt-4 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-red-500"
              animate={{ width: ["100%", "50%", "10%"] }}
              transition={{ duration: 4, times: [0, 0.5, 1], repeat: Infinity }}
            />
          </div>
        </motion.div>

      </div>

      <div className="flex-none pb-6 px-4 w-full flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="bg-red-50 dark:bg-red-900/30 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-red-200 dark:border-red-800 text-center"
        >
          <div>
            <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">
              צניחת סוכר (Hypoglycemia)
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              השילוב של מאמץ אירובי וספיגה מהירה של אינסולין מרוקן את הסוכר בדם בפתאומיות
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
