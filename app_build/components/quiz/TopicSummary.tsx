"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface TopicSummaryProps {
  topicName: string;
  score: number;
  total: number;
  questionsBreakdown: {
    question: string;
    isCorrect: boolean;
  }[];
  onNextTopic: () => void;
  isLastTopic: boolean;
}

export default function TopicSummary({
  topicName,
  score,
  total,
  questionsBreakdown,
  onNextTopic,
  isLastTopic,
}: TopicSummaryProps) {
  const percentage = Math.round((score / total) * 100);
  
  let feedback = "";
  if (percentage >= 90) feedback = "מעולה! שליטה מלאה בחומר.";
  else if (percentage >= 70) feedback = "כל הכבוד, הבנה טובה.";
  else feedback = "כדאי לחזור על החומר בנושא זה.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl flex flex-col text-slate-800 relative z-10"
      dir="rtl"
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-4">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-1">
          סיכום ביניים
        </h2>
        <h3 className="text-xl font-bold text-pink-600 mb-2">
          {topicName}
        </h3>
        <p className="font-bold text-lg">
          {score} מתוך {total} ({percentage}%)
        </p>
        <p className="text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full mt-2">
          {feedback}
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-6 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
        <h4 className="font-bold text-sm mb-2 opacity-70">פירוט שאלות:</h4>
        {questionsBreakdown.map((q, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
              q.isCorrect ? "bg-green-50 text-green-900 border border-green-100" : "bg-red-50 text-red-900 border border-red-100"
            }`}
          >
            <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${q.isCorrect ? "bg-green-500" : "bg-red-500"}`} />
            <p className="leading-snug">{q.question}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNextTopic}
        className="w-full bg-slate-800 text-white rounded-2xl p-4 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-slate-700"
      >
        <span>{isLastTopic ? "לתוצאות הסופיות" : "המשך לנושא הבא"}</span>
        <ArrowLeft size={20} />
      </button>
    </motion.div>
  );
}
