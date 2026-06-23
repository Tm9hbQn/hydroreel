"use client";

import React from "react";
import { motion } from "framer-motion";
import HumanSkeleton from "../visuals/HumanSkeleton";

export default function SciRehabAnimation() {
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
            SCI (חוט שדרה) - מים כשלד חיצוני
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        <div className="relative h-full w-full max-h-[350px] max-w-[220px]">
          <HumanSkeleton 
            className="w-full h-full text-slate-300 dark:text-slate-600 drop-shadow-md" 
            fill="currentColor"
            waterLevel={70}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute z-30 flex items-center"
            style={{ top: '60%', left: '0%', transform: 'translate(0, -50%)' }}
            dir="ltr"
          >
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-normal text-center max-w-[100px] mr-1" dir="rtl">
              תמיכה פסיבית (Exoskeleton)
            </div>
            <div className="w-12 sm:w-20 h-[2px] bg-blue-600" />
          </motion.div>

          {/* Hydrostatic Support Arrows */}
          <motion.div 
            animate={{ scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-0 w-full h-1/2 pointer-events-none flex flex-col justify-between py-10"
          >
            <div className="flex justify-between px-8">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-blue-500 font-bold">←</span>
            </div>
            <div className="flex justify-between px-10">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-blue-500 font-bold">←</span>
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
              הלחץ ההידרוסטטי מתפקד כשלד חיצוני ומאפשר למטופל עמידה (Standing)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
