"use client";

import React, { useState } from "react";
import QuizConfigurator from "./QuizConfigurator";
import InteractiveQuizCard from "./InteractiveQuizCard";
import QuizResults from "./QuizResults";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function QuizClient({ allQuestions }: { allQuestions: any[] }) {
  const [step, setStep] = useState<"config" | "quiz" | "results">("config");
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = (topics: string[], difficulty: string) => {
    // Filter out only interactive_check questions that have options
    let filtered = allQuestions.filter(q => q.type === "interactive_check" && q.options && q.options.length > 0);
    
    // Normalize correct_index
    filtered = filtered.map(q => ({
      ...q,
      correct_index: q.correct_index !== undefined ? q.correct_index : q.correct_answer_index
    }));

    // Filter by difficulty (fallback to basic if undefined)
    filtered = filtered.filter(q => (q.difficulty || "basic") === difficulty);

    // Naive shuffle
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    
    // Take up to 10 questions
    setActiveQuestions(shuffled.slice(0, 10));
    setStep("quiz");
    setCurrentIndex(0);
    setScore(0);
  };

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep("results");
    }
  };

  const handleRestart = () => {
    setStep("config");
  };

  return (
    <div className="min-h-[100dvh] bg-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-pink-200/60 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-rose-300/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Top bar with back button */}
      <div className="absolute top-4 right-4 z-50">
        <Link href="/" className="bg-white/50 backdrop-blur-sm border border-white/40 text-rose-700 p-2 rounded-full flex items-center justify-center hover:bg-white/80 transition-all">
          <ChevronRight size={24} />
        </Link>
      </div>

      <div className="w-full z-10">
        <AnimatePresence mode="wait">
          {step === "config" && (
            <QuizConfigurator key="config" onStart={handleStart} />
          )}
          {step === "quiz" && activeQuestions.length > 0 && (
            <InteractiveQuizCard
              key={`quiz-${activeQuestions[currentIndex].bite_id}`}
              question={activeQuestions[currentIndex]}
              onNext={handleNext}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
            />
          )}
          {step === "quiz" && activeQuestions.length === 0 && (
            <div key="empty" className="text-center text-slate-800 bg-white/70 backdrop-blur-xl p-6 rounded-3xl max-w-sm mx-auto border border-white/50">
              <p className="font-bold mb-4 text-xl">לא נמצאו שאלות מתאימות.</p>
              <button
                onClick={handleRestart}
                className="bg-pink-500 text-white px-6 py-2 rounded-xl font-medium"
              >
                חזור להגדרות
              </button>
            </div>
          )}
          {step === "results" && (
            <QuizResults key="results" score={score} total={activeQuestions.length} onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
