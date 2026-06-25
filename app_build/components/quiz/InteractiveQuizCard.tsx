"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  bite_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

interface InteractiveQuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  isChecked: boolean;
  onSelect: (idx: number) => void;
  onCheck: () => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export default function InteractiveQuizCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionIndex,
  isChecked,
  onSelect,
  onCheck,
  onNextQuestion,
  onPrevQuestion,
  isFirstQuestion,
  isLastQuestion,
}: InteractiveQuizCardProps) {

  const isCorrect = selectedOptionIndex === question.correct_index;

  const handleSelect = (idx: number) => {
    if (isChecked) return;
    onSelect(idx);
  };

  const processExplanation = (text: string, isCorrect: boolean) => {
    if (isCorrect) return text;
    let cleanText = text.replace(/^(תשובה נכונה!|נכון!|תשובה נכונה|נכון)\s*/i, "");
    return `תשובה שגויה. התשובה הנכונה: ${cleanText}`;
  };

  return (
    <motion.div
      key={question.bite_id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl flex flex-col text-slate-800 relative z-10"
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-6 opacity-70 text-sm font-bold">
        <span>
          שאלה {currentIndex + 1} מתוך {totalQuestions}
        </span>
      </div>

      <h2 className="text-xl font-bold mb-6 leading-snug">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3 flex-1 mb-4">
        {question.options.map((opt, idx) => {
          let btnClass = "bg-white border-2 border-pink-100 hover:border-pink-300 text-slate-700";
          
          if (!isChecked && selectedOptionIndex === idx) {
            btnClass = "bg-pink-50 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] text-pink-800 scale-[1.02] transform transition-all duration-300";
          }

          if (isChecked) {
            if (idx === question.correct_index) {
              btnClass = "bg-green-100 border-green-500 text-green-800";
            } else if (idx === selectedOptionIndex) {
              btnClass = "bg-red-100 border-red-500 text-red-800";
            } else {
              btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isChecked}
              className={`p-4 rounded-2xl text-right font-medium transition-all duration-300 ${btnClass} flex justify-between items-center`}
            >
              <span>{opt}</span>
              {isChecked && idx === question.correct_index && (
                <CheckCircle className="text-green-600 shrink-0" size={20} />
              )}
              {isChecked && idx === selectedOptionIndex && idx !== question.correct_index && (
                <XCircle className="text-red-600 shrink-0" size={20} />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!isChecked ? (
          <motion.div
            key="submit-btn"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <button
              onClick={onCheck}
              disabled={selectedOptionIndex === null}
              className={`w-full rounded-xl p-4 font-bold transition-all ${
                selectedOptionIndex !== null
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              בדוק תשובה
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            className="overflow-hidden"
          >
            <div
              className={`p-4 rounded-2xl text-sm font-medium ${
                isCorrect
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {processExplanation(question.explanation, isCorrect)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onNextQuestion}
          disabled={isLastQuestion}
          className={`p-3 rounded-full transition-all ${
            isLastQuestion ? "opacity-30 cursor-not-allowed text-slate-400" : "bg-slate-800 text-white hover:bg-slate-700 shadow-md active:scale-95"
          }`}
        >
          <ArrowRight size={24} />
        </button>
        <button
          onClick={onPrevQuestion}
          disabled={isFirstQuestion}
          className={`p-3 rounded-full transition-all ${
            isFirstQuestion ? "opacity-30 cursor-not-allowed text-slate-400" : "bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm active:scale-95"
          }`}
        >
          <ArrowLeft size={24} />
        </button>
      </div>
    </motion.div>
  );
}
