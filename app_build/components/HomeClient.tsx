"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Compass, Search as SearchIcon } from "lucide-react";
import ReelRenderer from "./ReelRenderer";
import SpotlightSearch from "./SpotlightSearch";
import TopicBottomSheet from "./TopicBottomSheet";
import SequenceProgressBar from "./SequenceProgressBar";
import BackToTopButton from "./BackToTopButton";
import { CheckCircle2 } from "lucide-react";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface Bite {
  bite_id: string;
  sequence_title?: string;
  [key: string]: any;
}

interface SequenceGroup {
  lessonId: string;
  lessonTitle: string;
  sequenceTitle: string;
  bites: Bite[];
}

interface SearchItem {
  lesson_id: string;
  lesson_title: string;
  bite_title: string;
  bite_id: string;
  sequence_title: string;
  category_title: string;
  category_icon: string;
}

interface CategoryData {
  category_id: string;
  category_title: string;
  icon: string;
  color_from: string;
  color_to: string;
  description: string;
  lessons: { lesson_id: string; lesson_title: string; bite_count: number }[];
}

interface HomeClientProps {
  sequences: SequenceGroup[];
  searchIndex: SearchItem[];
  categories: CategoryData[];
  totalBites: number;
  totalLessons: number;
}

// ==========================================
// HOME CLIENT COMPONENT
// ==========================================

export default function HomeClient({
  sequences,
  searchIndex,
  categories,
  totalBites,
  totalLessons,
}: HomeClientProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [activeSeqSteps, setActiveSeqSteps] = useState(1);
  const [activeBiteStep, setActiveBiteStep] = useState(0);

  // Flat list of all scrollable sections to map scrollY to sequence progress
  const flatReels = useMemo(() => {
    const arr: { sIdx: number; bIdx: number; total: number; isBridge: boolean; title?: string }[] = [];
    // Index 0 is the Hero/Onboarding screen
    arr.push({ sIdx: -1, bIdx: -1, total: 1, isBridge: true });

    sequences.forEach((seq, sIdx) => {
      seq.bites.forEach((bite, bIdx) => {
        arr.push({
          sIdx,
          bIdx,
          total: seq.bites.length,
          isBridge: seq.sequenceTitle === "__bridge__",
          title: seq.lessonTitle,
        });
      });
    });
    return arr;
  }, [sequences]);

  // Track progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const idx = Math.round(window.scrollY / window.innerHeight);
      const safeIdx = Math.max(0, Math.min(idx, flatReels.length - 1));
      const activeInfo = flatReels[safeIdx];
      
      if (activeInfo) {
        if (!activeInfo.isBridge) {
          setActiveSeqSteps(activeInfo.total);
          setActiveBiteStep(activeInfo.bIdx);
          setShowToast(false);
        } else if (activeInfo.sIdx !== -1 && activeInfo.isBridge) {
          // It's a bridge card - show completion toast
          setToastMessage(`סיימת את: ${activeInfo.title || 'הנושא'}`);
          setShowToast(true);
        } else {
          setShowToast(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [flatReels]);

  const handleSelectLesson = useCallback((lessonId: string) => {
    setShowBottomSheet(false);
    const el = document.getElementById(`lesson-${lessonId}`);
    if (el) {
      el.scrollIntoView({ behavior: "auto" }); // Avoid smooth scrolling firing all animations in between
    }
  }, []);

  const handleSearchSelect = useCallback((lessonId: string) => {
    const el = document.getElementById(`lesson-${lessonId}`);
    if (el) {
      el.scrollIntoView({ behavior: "auto" }); // Instant jump
    }
  }, []);

  const handleGoHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="w-full bg-[#fafcff] relative">
      {/* ==========================================
          PROGRESS BAR (Tracks Active Sequence)
          ========================================== */}
      <SequenceProgressBar
        totalSteps={activeSeqSteps}
        activeStep={activeBiteStep}
      />

      {/* ==========================================
          TOAST NOTIFICATION (Sequence Completion)
          ========================================== */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-emerald-400">
              <CheckCircle2 size={20} />
              <span className="font-bold text-sm" dir="rtl">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          HERO / ONBOARDING SCREEN (First Snap Section)
          ========================================== */}
      <section className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white shadow-inner">
        {/* Decorative Blobs */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-20 -right-32 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-blue-800/20 rounded-full blur-3xl -bottom-20 -left-32 pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-cyan-300/15 rounded-full blur-2xl top-1/3 left-1/4 pointer-events-none animate-float-bubble" />
        <div className="z-10 text-center px-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-6 p-5 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl inline-block border border-white/20"
          >
            <span className="text-7xl drop-shadow-lg">🌊</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl font-black mb-3 tracking-tight leading-none drop-shadow-md"
          >
            Hydro-Reels
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-lg font-semibold mb-3 text-blue-50"
            dir="rtl"
          >
            האקדמיה להידרותרפיה בפורמט Bite-Sized
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-white/70 mb-8 bg-blue-900/20 px-4 py-2 rounded-full"
            dir="rtl"
          >
            {totalBites} יחידות לימוד • {totalLessons} נושאים
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-3 w-full max-w-xs"
          >
            {/* Search Trigger - the actual spotlight search is triggered from here */}
            <SpotlightSearch
              searchIndex={searchIndex}
              onSelect={handleSearchSelect}
              placeholder="חפש נושא או יחידת לימוד..."
            />

            {/* Browse Topics Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowBottomSheet(true)}
              className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:bg-white/25 transition-colors"
            >
              <Compass size={18} />
              <span dir="rtl">דפדף בנושאים</span>
            </motion.button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 animate-bounce flex flex-col items-center"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-white/90">
              החלק למעלה להתחלה
            </span>
            <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
              <div className="w-1.5 h-3 bg-white rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          REEL FEED - All Lessons as Continuous Feed
          ========================================== */}
      {sequences.map((seq, seqIndex) => {
        if (seq.sequenceTitle === "__bridge__") {
          // Bridge cards render directly
          return (
            <section key={`bridge-${seqIndex}`} className="relative w-full">
              {seq.bites.map((bite: Bite) => (
                <ReelRenderer
                  key={bite.bite_id}
                  bite={{
                    ...bite,
                    onContinue: bite.next_lesson_id
                      ? () => handleSelectLesson(bite.next_lesson_id!)
                      : undefined,
                    onGoHome: handleGoHome,
                  }}
                />
              ))}
            </section>
          );
        }

        // First bite of each lesson gets an ID anchor for navigation
        const isFirstSequenceOfLesson =
          seqIndex === 0 ||
          sequences[seqIndex - 1]?.lessonId !== seq.lessonId;

        return (
          <section
            key={seqIndex}
            id={isFirstSequenceOfLesson ? `lesson-${seq.lessonId}` : undefined}
            className="relative w-full"
          >
            {/* Sticky Sequence Title */}
            <header className="sticky top-2 pt-4 z-40 w-full flex justify-center pointer-events-none">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 animate-gradient-flow px-5 py-2 rounded-full shadow-md border border-white/20 flex flex-col items-center">
                <span
                  className="text-[10px] font-semibold text-white/80 uppercase tracking-widest"
                  dir="rtl"
                >
                  {seq.lessonTitle}
                </span>
                <h3
                  className="text-white font-bold text-sm md:text-base tracking-tight drop-shadow-sm"
                  dir="rtl"
                >
                  {seq.sequenceTitle}
                </h3>
              </div>
            </header>

            {seq.bites.map((bite: Bite) => (
              <ReelRenderer key={`${seqIndex}-${bite.bite_id}`} bite={bite} />
            ))}
          </section>
        );
      })}

      {/* ==========================================
          FLOATING NAVIGATION ELEMENTS
          ========================================== */}

      {/* Bottom Sheet for Topic Navigation */}
      <TopicBottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        categories={categories}
        onSelectLesson={handleSelectLesson}
        searchSlot={
          <SpotlightSearch
            searchIndex={searchIndex}
            onSelect={handleSearchSelect}
            placeholder="חפש כאן יחידה או נושא..."
          />
        }
      />

      {/* Back to Top FAB */}
      <BackToTopButton showAfterIndex={2} />

      {/* Fixed Bottom Nav Button - Topics Shortcut */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowBottomSheet(true)}
        className="fixed bottom-6 right-5 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-xl flex items-center justify-center text-white border-2 border-white/30"
        aria-label="נושאי לימוד"
      >
        <BookOpen size={20} />
      </motion.button>
    </main>
  );
}
