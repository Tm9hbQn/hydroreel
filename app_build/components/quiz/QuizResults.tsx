"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface QuizResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function QuizResults({ score, total, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100);
  
  let feedback = "";
  if (percentage >= 90) feedback = "מעולה! אתה שולט בחומר ברמה גבוהה.";
  else if (percentage >= 70) feedback = "כל הכבוד! הבנה טובה של העקרונות.";
  else feedback = "יש מקום לשיפור, מומלץ לחזור על החומר שוב.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-slate-800 text-center gap-6"
      dir="rtl"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-2">
        <Trophy size={48} className="text-white" />
      </div>

      <div>
        <h2 className="text-3xl font-black mb-2 text-slate-800">תוצאות המבחן</h2>
        <p className="text-pink-600 font-bold text-xl">
          {score} מתוך {total} תשובות נכונות ({percentage}%)
        </p>
      </div>

      <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 w-full text-pink-800 font-medium">
        {feedback}
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-4 font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
        >
          <RefreshCcw size={20} />
          נסה שוב
        </button>
        <Link
          href="/"
          className="w-full bg-white text-slate-700 border border-slate-200 rounded-xl p-4 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
        >
          <Home size={20} />
          חזרה למסך הראשי
        </Link>
      </div>
    </motion.div>
  );
}
