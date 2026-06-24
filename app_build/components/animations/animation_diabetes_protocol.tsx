"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DiabetesProtocolAnimation() {
  const steps = [
    { title: "לפני טיפול", text: "בדיקת סוכר חובה", color: "bg-blue-500" },
    { title: "בזמן טיפול", text: "זמינות פחמימה פשוטה על השפה", color: "bg-emerald-500" },
    { title: "אחרי טיפול", text: "בדיקה חוזרת למניעת צניחה מאוחרת", color: "bg-purple-500" },
  ];

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
            פרוטוקול סוכרת במים
          </span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center min-h-0 overflow-hidden w-full gap-4 px-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + idx * 0.4, duration: 0.5, type: "spring" }}
            className={`w-full max-w-[280px] p-4 rounded-xl shadow-lg text-white text-center ${step.color}`}
          >
            <h3 className="font-bold text-lg">{step.title}</h3>
            <p className="text-sm">{step.text}</p>
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
              בטיחות מעל הכל
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              המים החמים מזרזים משמעותית את המטבוליזם וספיגת האינסולין
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
