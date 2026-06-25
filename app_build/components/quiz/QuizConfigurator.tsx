"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface QuizConfiguratorProps {
  onStart: (topics: string[], difficulty: string) => void;
}

const TOPICS = [
  { id: "anatomy", label: "אנטומיה" },
  { id: "physiology", label: "פיזיולוגיה" },
  { id: "neuro", label: "נוירולוגיה" },
  { id: "ortho", label: "אורתופדיה" },
  { id: "peds", label: "רפואת ילדים" },
];

const DIFFICULTIES = [
  { id: "basic", label: "בסיסי" },
  { id: "advanced", label: "מתקדם" },
];

export default function QuizConfigurator({ onStart }: QuizConfiguratorProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("basic");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    if (selectedTopics.length === 0) {
      alert("אנא בחר לפחות נושא אחד");
      return;
    }
    onStart(selectedTopics, difficulty);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 text-slate-800"
      dir="rtl"
    >
      <div className="text-center">
        <h2 className="text-2xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
          הגדרות מבחן
        </h2>
        <p className="text-sm opacity-80">בחר נושאים ורמת קושי להתחלה</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-sm">נושאים:</h3>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-pink-500 text-white shadow-md scale-105"
                    : "bg-white/50 border border-pink-200 text-pink-700 hover:bg-pink-100"
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-sm">רמת קושי:</h3>
        <div className="flex gap-2">
          {DIFFICULTIES.map((diff) => {
            const isSelected = difficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => setDifficulty(diff.id)}
                className={`flex-1 py-2 rounded-2xl text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-rose-500 text-white shadow-md scale-105"
                    : "bg-white/50 border border-rose-200 text-rose-700 hover:bg-rose-100"
                }`}
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all active:scale-95"
      >
        <Play size={20} fill="currentColor" />
        התחל מבחן
      </button>
    </motion.div>
  );
}
