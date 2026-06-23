"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface Option {
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

interface QuizCardProps {
  bite: {
    bite_id: string;
    question: string;
    options: Option[];
    [key: string]: any;
  };
}

export default function QuizCard({ bite }: QuizCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100 flex flex-col mx-auto w-full max-w-sm mb-6 relative overflow-hidden"
      dir="rtl"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 -mt-10 -mr-10" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <HelpCircle size={24} className="animate-pulse" />
        <span className="font-bold text-sm uppercase tracking-wide">מבדק ידע</span>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold text-slate-800 mb-6 leading-tight">
        {bite.question}
      </h3>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {bite.options.map((option, idx) => {
          const isSelected = selectedIdx === idx;
          const isAnswerRevealed = selectedIdx !== null;
          const isCorrectAnswer = option.isCorrect;

          let btnClass = "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50";
          if (isAnswerRevealed) {
            if (isCorrectAnswer) {
              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
            } else if (isSelected) {
              btnClass = "border-red-400 bg-red-50 text-red-800";
            } else {
              btnClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
            }
          }

          return (
            <motion.button
              key={idx}
              whileTap={isAnswerRevealed ? {} : { scale: 0.98 }}
              onClick={() => handleSelect(idx)}
              disabled={isAnswerRevealed}
              className={`relative w-full p-4 rounded-2xl border-2 text-right transition-all duration-300 flex items-start gap-3 ${btnClass}`}
            >
              <div className="mt-0.5 shrink-0">
                {isAnswerRevealed && isCorrectAnswer ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </motion.div>
                ) : isAnswerRevealed && isSelected && !isCorrectAnswer ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
              </div>
              <span className="font-medium flex-1">{option.text}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Area */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            className="overflow-hidden"
          >
            <div
              className={`p-4 rounded-2xl ${
                bite.options[selectedIdx].isCorrect
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                  : "bg-amber-100 text-amber-900 border border-amber-200"
              }`}
            >
              <h4 className="font-bold text-sm mb-1 flex items-center gap-1">
                {bite.options[selectedIdx].isCorrect ? "✅ כל הכבוד!" : "💡 הסבר:"}
              </h4>
              <p className="text-sm leading-relaxed">
                {bite.options[selectedIdx].feedback || 
                 (bite.options[selectedIdx].isCorrect 
                    ? "תשובה נכונה." 
                    : "תשובה שגויה, נסה לחזור על החומר שלמדנו.")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
