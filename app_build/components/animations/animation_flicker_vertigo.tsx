"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FlickerVertigoAnimation() {
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
            Flicker Vertigo (ריצוד אורות) - סכנה
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden w-full">
        <div className="relative w-full h-full max-h-[300px] max-w-[300px] rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 bg-sky-100 dark:bg-slate-800 flex flex-col items-center justify-center">
          
          {/* Pulsing Sun Reflection (Strobe effect) */}
          <motion.div 
            animate={{ opacity: [1, 0.2, 1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 w-32 h-32 bg-yellow-400 blur-2xl rounded-full"
          />

          {/* Water Waves */}
          <motion.svg viewBox="0 0 100 100" className="absolute bottom-0 w-full h-1/2" preserveAspectRatio="none">
            <motion.path 
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              d="M 0 50 Q 10 40 20 50 T 40 50 T 60 50 T 80 50 T 100 50 T 120 50 L 120 100 L 0 100 Z" 
              fill="#3b82f6" opacity="0.6"
            />
            <motion.path 
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              d="M -20 60 Q -10 70 0 60 T 20 60 T 40 60 T 60 60 T 80 60 T 100 60 L 100 100 L -20 100 Z" 
              fill="#2563eb" opacity="0.8"
            />
          </motion.svg>

          {/* Warning Icon Overlay */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 1] }}
            transition={{ delay: 1, duration: 1.5, ease: "anticipate" }}
            className="absolute z-30"
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" opacity="0.4" filter="blur(4px)" />
              <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
            </svg>
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
              טריגר להתקף
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              השתקפות קרני השמש על הגלים יוצרת אפקט ריצוד העלול לעורר התקף באפילפסיה פוטו-סנסיטיבית. יש להשתמש במשקפי שמש.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
