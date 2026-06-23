"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdTriggersAnimation() {
  const triggers = [
    { title: "צנתר (Catheter) סתום", color: "bg-amber-500", delay: 0 },
    { title: "בגד ים לוחץ מדיי", color: "bg-orange-500", delay: 0.5 },
    { title: "ציפורן חודרנית / פצע", color: "bg-red-500", delay: 1.0 },
  ];

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
            טריגרים נפוצים ל-AD
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center min-h-0 overflow-hidden w-full gap-6 px-4">
        {triggers.map((trig, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + trig.delay, duration: 0.5, type: "spring" }}
            className={`w-full max-w-[280px] p-4 rounded-xl shadow-lg text-white font-bold text-center ${trig.color}`}
          >
            {trig.title}
          </motion.div>
        ))}
      </div>

      <div className="flex-none pb-6 px-4 w-full flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-slate-100 dark:border-slate-700 text-center"
        >
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
              בדיקה טרום-כניסה
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              חובה לוודא שאין טריגרים חבויים (כמו צינורית מקופלת) לפני הכניסה למים
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
