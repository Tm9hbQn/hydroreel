"use client";

import React from "react";
import { motion } from "framer-motion";
import HumanSkeleton from "../visuals/HumanSkeleton";

export default function EpilepsyRiskManagementAnimation() {
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
            אפילפסיה - ניהול סיכונים במים
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full gap-4">
        {/* Patient */}
        <div className="relative h-full w-[120px] max-h-[300px]">
          <HumanSkeleton 
            className="w-full h-full text-slate-300 dark:text-slate-600 drop-shadow-md" 
            fill="currentColor"
            waterLevel={70}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap"
          >
            מטופל
          </motion.div>
        </div>

        {/* Buddy */}
        <div className="relative h-full w-[120px] max-h-[300px]">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <HumanSkeleton 
              className="w-full h-full text-blue-400 dark:text-blue-500 drop-shadow-md" 
              fill="currentColor"
              waterLevel={70}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-30"
          >
            1:1 השגחה
          </motion.div>
        </div>
      </div>

      <div className="flex-none pb-6 px-4 w-full flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.8 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-slate-100 dark:border-slate-700 text-center"
        >
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
              כלל ברזל
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              אין להיכנס למים ללא מטפל צמוד (מרחק נגיעה) שמוכן לחילוץ מיידי
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
