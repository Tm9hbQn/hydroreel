"use client";

import React from "react";
import { motion } from "framer-motion";
import AutonomicDysreflexiaSvg from "../visuals/AutonomicDysreflexiaSvg";
import GenericGauge from "../visuals/GenericGauge";

export default function AutonomicDysreflexiaAnimation() {
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
            Autonomic Dysreflexia - חירום רפואי!
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        <div className="relative h-full w-full max-h-[400px] max-w-[280px]">
          <AutonomicDysreflexiaSvg 
            className="w-full h-full text-slate-400 dark:text-slate-500 drop-shadow-md" 
            triggerVisible={true}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute z-30 flex items-center"
            style={{ top: '65%', left: '0%', transform: 'translate(0, -50%)' }}
            dir="ltr"
          >
            <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-normal text-center max-w-[90px] mr-1" dir="rtl">
              גירוי כאב (מתחת לחתך)
            </div>
            <div className="w-12 sm:w-20 h-[2px] bg-amber-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute z-30 flex items-center"
            style={{ top: '15%', right: '0%', transform: 'translate(15px, -50%)' }}
            dir="ltr"
          >
            <div className="w-8 sm:w-10 h-[2px] bg-red-600" />
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md whitespace-normal text-center max-w-[80px] ml-1" dir="rtl">
              זינוק בלחץ הדם (Vasoconstriction)
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
          className="bg-red-50 dark:bg-red-900/30 p-4 rounded-2xl shadow-xl flex items-center gap-6 border border-red-200 dark:border-red-800 text-center"
        >
          <div>
            <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">
              פעולה מיידית
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              יש להוציא מהמים ולהושיב את המטופל למניעת שבץ
            </p>
          </div>
          <div className="flex-shrink-0">
            <GenericGauge 
              value={95} 
              label="Blood Pressure" 
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
