"use client";

import React from "react";
import { motion } from "framer-motion";
import HumanSkeleton from "../visuals/HumanSkeleton";

export default function DualTaskingCvaAnimation() {
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
            CVA - חלוקת קשב (Dual Tasking)
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        {/* Character & Environment */}
        <div className="relative h-full w-full max-h-[350px] max-w-[220px]">
          <HumanSkeleton 
            className="w-full h-full text-slate-300 dark:text-slate-600 drop-shadow-md" 
            fill="currentColor"
            waterLevel={60}
          />
          
          {/* Ball (Cognitive/Motor Task) */}
          <motion.circle 
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            cx="35%" cy="45%" r="15" fill="#f59e0b" className="absolute top-1/2 left-1/4"
          />

          {/* Dual Task Bars */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute top-10 right-0 w-32 bg-white/80 dark:bg-slate-800/80 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
            dir="rtl"
          >
            <div className="mb-2">
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="text-blue-600">קשב מוטורי</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <motion.div 
                  animate={{ width: ["40%", "80%", "40%"] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-blue-600 h-1.5 rounded-full" 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="text-purple-600">קשב קוגניטיבי</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <motion.div 
                  animate={{ width: ["80%", "30%", "80%"] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-purple-600 h-1.5 rounded-full" 
                />
              </div>
            </div>
          </motion.div>
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
              אפקט המים
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              המים מאיטים את הנפילה (תגובות שיווי משקל), ומשחררים קשב לביצוע מטלות קוגניטיביות במקביל
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
