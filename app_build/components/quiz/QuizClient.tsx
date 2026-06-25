"use client";

import React, { useState, useEffect } from "react";
import QuizConfigurator from "./QuizConfigurator";
import InteractiveQuizCard from "./InteractiveQuizCard";
import TopicSummary from "./TopicSummary";
import QuizResults from "./QuizResults";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Flag } from "lucide-react";

export default function QuizClient({ allQuestions }: { allQuestions: any[] }) {
  const [step, setStep] = useState<"config" | "quiz" | "topic_summary" | "results">("config");
  
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [chunks, setChunks] = useState<Record<string, any[]>>({});
  
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // New free-navigation state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const [savedStateExists, setSavedStateExists] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hydroreel_quiz_state");
    if (saved) {
      setSavedStateExists(true);
    }
  }, []);

  useEffect(() => {
    if (step !== "config" && step !== "results") {
      const stateToSave = {
        chunks,
        activeTopics,
        currentTopicIndex,
        activeQuestions,
        currentIndex,
        answers,
        checked,
        step
      };
      localStorage.setItem("hydroreel_quiz_state", JSON.stringify(stateToSave));
    }
    if (step === "results") {
      localStorage.removeItem("hydroreel_quiz_state");
    }
  }, [chunks, activeTopics, currentTopicIndex, activeQuestions, currentIndex, answers, checked, step]);

  const handleResume = () => {
    const saved = localStorage.getItem("hydroreel_quiz_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChunks(parsed.chunks || {});
        setActiveTopics(parsed.activeTopics || []);
        setCurrentTopicIndex(parsed.currentTopicIndex || 0);
        setActiveQuestions(parsed.activeQuestions || []);
        setCurrentIndex(parsed.currentIndex || 0);
        setAnswers(parsed.answers || {});
        setChecked(parsed.checked || {});
        setStep(parsed.step && parsed.step !== "results" ? parsed.step : "quiz");
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  };

  const getTopicLabel = (topicId: string) => {
    const map: Record<string, string> = {
      physics: "פיזיקה של המים",
      anatomy: "אנטומיה",
      physiology: "פיזיולוגיה",
      movement: "תנועה וכושר",
      methodology: "מתודולוגיה",
      neuro: "נוירולוגיה",
      orthopedics: "אורתופדיה",
      pediatrics: "רפואת ילדים"
    };
    return map[topicId] || topicId;
  };

  const handleStart = (selectedTopics: string[], difficulty: string, questionCount: number) => {
    let baseFiltered = allQuestions.filter(q => q.type === "interactive_check" && q.options && q.options.length > 0);
    
    baseFiltered = baseFiltered.map(q => ({
      ...q,
      correct_index: q.correct_index !== undefined ? q.correct_index : q.correct_answer_index
    }));

    baseFiltered = baseFiltered.filter(q => (q.difficulty || "basic") === difficulty);

    const countPerTopic = Math.ceil(questionCount / selectedTopics.length);
    
    const newChunks: Record<string, any[]> = {};
    const validTopics: string[] = [];

    selectedTopics.forEach(topic => {
      const topicQuestions = baseFiltered.filter(q => {
        const sourceStr = (q.bite_id + " " + (q.source_lesson_id || "")).toLowerCase();
        if (topic === "orthopedics") return sourceStr.includes("ortho");
        if (topic === "pediatrics") return sourceStr.includes("pediatrics") || sourceStr.includes("peds");
        if (topic === "physics") return sourceStr.includes("physics") || sourceStr.includes("pascal");
        return sourceStr.includes(topic.toLowerCase());
      });

      if (topicQuestions.length > 0) {
        const shuffled = [...topicQuestions].sort(() => 0.5 - Math.random());
        newChunks[topic] = shuffled.slice(0, countPerTopic);
        validTopics.push(topic);
      }
    });

    if (validTopics.length === 0) {
      alert("לא מצאנו שאלות מתאימות להגדרות שנבחרו. נסה לשנות נושא או רמת קושי.");
      return;
    }

    setChunks(newChunks);
    setActiveTopics(validTopics);
    setCurrentTopicIndex(0);
    setActiveQuestions(newChunks[validTopics[0]]);
    setCurrentIndex(0);
    
    setAnswers({});
    setChecked({});
    setStep("quiz");
  };

  const handleSelectOption = (idx: number) => {
    const currentQ = activeQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [currentQ.bite_id]: idx }));
  };

  const handleCheckAnswer = () => {
    const currentQ = activeQuestions[currentIndex];
    const selectedIdx = answers[currentQ.bite_id];
    if (selectedIdx === undefined) return;
    
    const isCorrect = selectedIdx === currentQ.correct_index;
    setChecked(prev => ({ ...prev, [currentQ.bite_id]: isCorrect }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // If at the end of a topic, prompt topic summary
      setStep("topic_summary");
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < activeTopics.length - 1) {
      const nextIndex = currentTopicIndex + 1;
      setCurrentTopicIndex(nextIndex);
      setActiveQuestions(chunks[activeTopics[nextIndex]]);
      setCurrentIndex(0);
      setStep("quiz");
    } else {
      setStep("results");
    }
  };

  const handleRestart = () => {
    setStep("config");
  };

  const handleFinishQuiz = () => {
    const totalQ = Object.values(chunks).reduce((acc, curr) => acc + curr.length, 0);
    const checkedCount = Object.keys(checked).length;
    
    if (checkedCount < totalQ) {
      if (!window.confirm(`ישנן ${totalQ - checkedCount} שאלות שעוד לא בדקת. האם אתה בטוח שברצונך לסיים את המבחן?`)) {
        return;
      }
    }
    setStep("results");
  };

  // Calculate scores derived dynamically from `checked` state
  const totalScore = Object.values(checked).filter(v => v).length;
  const totalQuestions = Object.values(chunks).reduce((a, b) => a + b.length, 0);

  // Topic specific scores for TopicSummary
  const currentTopicId = activeTopics[currentTopicIndex];
  const currentTopicQuestions = chunks[currentTopicId] || [];
  const currentTopicScore = currentTopicQuestions.reduce((acc, q) => acc + (checked[q.bite_id] ? 1 : 0), 0);
  const currentTopicBreakdown = currentTopicQuestions.map(q => ({
    question: q.question,
    isCorrect: !!checked[q.bite_id]
  }));

  return (
    <div className="min-h-[100dvh] bg-rose-50 flex flex-col items-center justify-start p-4 relative overflow-x-hidden overflow-y-auto">
      {/* 
        PERFORMANCE FIX: 
        Replaced expensive blur-[100px] + rotate/scale animations with fast radial-gradients and opacity/y pulsing.
        Added transform-gpu to offload to hardware. 
      */}
      <motion.div 
        animate={{ opacity: [0.4, 0.7, 0.4], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0) 70%)' }}
        className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none fixed transform-gpu will-change-transform" 
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.4) 0%, rgba(251,113,133,0) 70%)' }}
        className="absolute bottom-[-10%] left-[-20%] w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none fixed transform-gpu will-change-transform" 
      />

      {/* Top bar with back button */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Link href="/" className="bg-white/80 backdrop-blur-md border border-white/40 text-rose-700 p-2 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm">
          <ChevronRight size={24} />
        </Link>
      </div>

      <div className="w-full z-10 pt-16 pb-8 flex-1 flex flex-col justify-start items-center">
        <AnimatePresence mode="wait">
          {step === "config" && (
            <div className="w-full flex flex-col items-center z-20">
              {savedStateExists && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-200 rounded-3xl p-6 mb-6 shadow-sm text-center relative"
                  dir="rtl"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-2">נראה שמבחן פעיל מחכה לך!</h3>
                  <p className="text-slate-600 mb-4 text-sm">יצאת מהמבחן הקודם באמצע. רוצה להמשיך מאותה נקודה?</p>
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={handleResume}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                    >
                      המשך מבחן קודם
                    </button>
                    <button 
                      onClick={() => { localStorage.removeItem("hydroreel_quiz_state"); setSavedStateExists(false); }}
                      className="bg-slate-100 text-slate-600 font-bold py-2 px-4 rounded-xl hover:bg-slate-200 transition-all text-sm"
                    >
                      התחל מחדש
                    </button>
                  </div>
                </motion.div>
              )}
              <QuizConfigurator key="config" onStart={handleStart} />
            </div>
          )}

          {step === "quiz" && activeQuestions.length > 0 && (
            <motion.div 
              key="quiz-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              {/* NAVIGATION MENU */}
              <div className="w-full max-w-md mx-auto mb-6 bg-white/70 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/40 z-20" dir="rtl">
                {/* Topic Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  {activeTopics.map((t, idx) => (
                    <button 
                      key={t}
                      onClick={() => { setCurrentTopicIndex(idx); setCurrentIndex(0); setActiveQuestions(chunks[t]); }}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentTopicIndex === idx ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'bg-white/50 text-slate-600 hover:bg-white'}`}
                    >
                      {getTopicLabel(t)}
                    </button>
                  ))}
                </div>
                
                {/* Question Circles */}
                <div className="flex gap-2 overflow-x-auto pb-1 mt-1" style={{ scrollbarWidth: 'none' }}>
                  {activeQuestions.map((q, qIdx) => {
                     const bId = q.bite_id;
                     const isCurrent = qIdx === currentIndex;
                     const isAnswered = answers[bId] !== undefined;
                     const isQChecked = checked[bId] !== undefined;
                     const isQCorrect = checked[bId];
                     
                     let bgClass = "bg-slate-200 text-slate-500";
                     if (isQChecked) {
                       bgClass = isQCorrect ? "bg-green-500 text-white shadow-sm shadow-green-500/30" : "bg-red-500 text-white shadow-sm shadow-red-500/30";
                     } else if (isAnswered) {
                       bgClass = "bg-violet-400 text-white shadow-sm shadow-violet-400/30";
                     }

                     return (
                       <button
                         key={bId}
                         onClick={() => setCurrentIndex(qIdx)}
                         className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-all ${bgClass} ${isCurrent ? 'ring-4 ring-violet-200 ring-offset-1 scale-110' : 'hover:scale-105'}`}
                       >
                         {qIdx + 1}
                       </button>
                     )
                  })}
                </div>
              </div>

              {/* ACTIVE QUESTION CARD */}
              <InteractiveQuizCard
                key={`quiz-${activeQuestions[currentIndex].bite_id}`}
                question={activeQuestions[currentIndex]}
                currentIndex={currentIndex}
                totalQuestions={activeQuestions.length}
                selectedOptionIndex={answers[activeQuestions[currentIndex].bite_id] ?? null}
                isChecked={checked[activeQuestions[currentIndex].bite_id] ?? false}
                onSelect={handleSelectOption}
                onCheck={handleCheckAnswer}
                onNextQuestion={handleNextQuestion}
                onPrevQuestion={handlePrevQuestion}
                isFirstQuestion={currentIndex === 0}
                isLastQuestion={currentIndex === activeQuestions.length - 1 && currentTopicIndex === activeTopics.length - 1}
              />

              {/* FINISH TEST BUTTON */}
              <button 
                onClick={handleFinishQuiz}
                className="mt-8 bg-white/80 backdrop-blur-md text-pink-600 font-bold px-6 py-3 rounded-2xl shadow-sm border border-pink-100 hover:bg-white hover:shadow-md transition-all flex items-center gap-2"
              >
                <Flag size={20} />
                סיים מבחן
              </button>
            </motion.div>
          )}

          {step === "topic_summary" && (
            <TopicSummary 
              key={`summary-${currentTopicId}`}
              topicName={getTopicLabel(currentTopicId)}
              score={currentTopicScore}
              total={currentTopicQuestions.length}
              questionsBreakdown={currentTopicBreakdown}
              onNextTopic={handleNextTopic}
              isLastTopic={currentTopicIndex === activeTopics.length - 1}
            />
          )}

          {step === "results" && (
            <QuizResults 
              key="results" 
              score={totalScore} 
              total={totalQuestions} 
              onRestart={handleRestart} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
