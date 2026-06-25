"use client";

import React, { useState } from "react";
import QuizConfigurator from "./QuizConfigurator";
import InteractiveQuizCard from "./InteractiveQuizCard";
import TopicSummary from "./TopicSummary";
import QuizResults from "./QuizResults";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function QuizClient({ allQuestions }: { allQuestions: any[] }) {
  const [step, setStep] = useState<"config" | "quiz" | "topic_summary" | "results">("config");
  
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [chunks, setChunks] = useState<Record<string, any[]>>({});
  
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [topicScores, setTopicScores] = useState<Record<string, number>>({});
  const [topicBreakdown, setTopicBreakdown] = useState<Record<string, { question: string, isCorrect: boolean }[]>>({});

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
    // Filter base interactive check questions
    let baseFiltered = allQuestions.filter(q => q.type === "interactive_check" && q.options && q.options.length > 0);
    
    // Normalize correct_index
    baseFiltered = baseFiltered.map(q => ({
      ...q,
      correct_index: q.correct_index !== undefined ? q.correct_index : q.correct_answer_index
    }));

    // Filter by difficulty (fallback to basic if undefined)
    baseFiltered = baseFiltered.filter(q => (q.difficulty || "basic") === difficulty);

    // Distribute question count across topics
    const countPerTopic = Math.ceil(questionCount / selectedTopics.length);
    
    const newChunks: Record<string, any[]> = {};
    const validTopics: string[] = [];

    selectedTopics.forEach(topic => {
      // Find questions that match the topic
      const topicQuestions = baseFiltered.filter(q => {
        const sourceStr = (q.bite_id + " " + (q.source_lesson_id || "")).toLowerCase();
        if (topic === "orthopedics") return sourceStr.includes("ortho");
        if (topic === "pediatrics") return sourceStr.includes("pediatrics") || sourceStr.includes("peds");
        if (topic === "physics") return sourceStr.includes("physics") || sourceStr.includes("pascal");
        return sourceStr.includes(topic.toLowerCase());
      });

      if (topicQuestions.length > 0) {
        // Shuffle and slice
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
    
    // Reset scores
    const initialScores: Record<string, number> = {};
    const initialBreakdown: Record<string, any[]> = {};
    validTopics.forEach(t => {
      initialScores[t] = 0;
      initialBreakdown[t] = [];
    });
    setTopicScores(initialScores);
    setTopicBreakdown(initialBreakdown);

    setStep("quiz");
  };

  const handleNext = (isCorrect: boolean) => {
    const currentTopic = activeTopics[currentTopicIndex];
    const currentQ = activeQuestions[currentIndex];

    setTopicScores(prev => ({
      ...prev,
      [currentTopic]: prev[currentTopic] + (isCorrect ? 1 : 0)
    }));

    setTopicBreakdown(prev => ({
      ...prev,
      [currentTopic]: [
        ...prev[currentTopic],
        { question: currentQ.question, isCorrect }
      ]
    }));

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep("topic_summary");
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

  // Calculate total score for final results
  const totalScore = Object.values(topicScores).reduce((a, b) => a + b, 0);
  const totalQuestions = Object.values(chunks).reduce((a, b) => a + b.length, 0);

  return (
    <div className="min-h-[100dvh] bg-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for glassmorphism - now with lively animations */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          rotate: [0, 15, -15, 0],
          x: [0, 20, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-pink-400/40 rounded-full blur-[80px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1], 
          rotate: [0, -10, 10, 0],
          y: [0, -30, 30, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-rose-400/30 rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Top bar with back button */}
      <div className="absolute top-4 right-4 z-50">
        <Link href="/" className="bg-white/60 backdrop-blur-md border border-white/40 text-rose-700 p-2 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm">
          <ChevronRight size={24} />
        </Link>
      </div>

      <div className="w-full z-10 pt-12 pb-8">
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
          {step === "topic_summary" && (
            <TopicSummary 
              key={`summary-${activeTopics[currentTopicIndex]}`}
              topicName={getTopicLabel(activeTopics[currentTopicIndex])}
              score={topicScores[activeTopics[currentTopicIndex]]}
              total={chunks[activeTopics[currentTopicIndex]].length}
              questionsBreakdown={topicBreakdown[activeTopics[currentTopicIndex]]}
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
