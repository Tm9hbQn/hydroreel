"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Compass, ChevronDown, ChevronLeft } from "lucide-react";
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

const resolveIcon = (key: string): string => {
  const map: Record<string, string> = {
    water: "💧", heart: "❤️", brain: "🧠", bone: "🦴", lungs: "🫁",
    baby: "👶", muscle: "💪", spa: "🧖", rehab: "🏥", swim: "🏊",
    wave: "🌊", star: "⭐",
  };
  return map[key] ?? "📘";
};

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

  // Default to the first lesson
  const defaultLessonId = sequences.length > 0 ? sequences[0].lessonId : "";
  const [activeLessonId, setActiveLessonId] = useState<string>(defaultLessonId);
  const [expandedHeroCat, setExpandedHeroCat] = useState<string | null>(null);

  // Filter sequences for the active lesson
  const activeSequences = useMemo(() => {
    return sequences.filter((seq) => seq.lessonId === activeLessonId);
  }, [sequences, activeLessonId]);

  const [activeSeqSteps, setActiveSeqSteps] = useState(1);
  const [activeBiteStep, setActiveBiteStep] = useState(0);

  // Flat list of all scrollable sections for progress bar
  const flatReels = useMemo(() => {
    const arr: { sIdx: number; bIdx: number; total: number; isBridge: boolean; title?: string }[] = [];
    // Index 0 is the Hero/Onboarding screen
    arr.push({ sIdx: -1, bIdx: -1, total: 1, isBridge: true });

    activeSequences.forEach((seq, sIdx) => {
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
  }, [activeSequences]);

  // Track progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const idx = Math.round(window.scrollY / window.innerHeight);
      const safeIdx = Math.max(0, Math.min(idx, flatReels.length - 1));
      const activeInfo = flatReels[safeIdx];
      
      if (activeInfo) {
        if (!activeInfo.isBridge && activeInfo.sIdx !== -1) {
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [flatReels]);

  const scrollToLessonIntro = useCallback(() => {
    // Wait for DOM to update with new lesson reels
    setTimeout(() => {
      const el = document.getElementById("active-lesson-start");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback: scroll past the hero reel (100vh)
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const handleSelectLesson = useCallback((lessonId: string) => {
    setShowBottomSheet(false);
    setActiveLessonId(lessonId);
    scrollToLessonIntro();
  }, [scrollToLessonIntro]);

  const handleSearchSelect = useCallback((lessonId: string) => {
    setShowBottomSheet(false);
    setActiveLessonId(lessonId);
    scrollToLessonIntro();
  }, [scrollToLessonIntro]);

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
      <section className="snap-start h-[100dvh] w-full flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white shadow-inner pt-12 pb-6">
        {/* Decorative Blobs */}
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-20 -right-32 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-blue-800/20 rounded-full blur-3xl -bottom-20 -left-32 pointer-events-none" />
        
        <div className="z-10 text-center px-4 w-full flex flex-col items-center h-full">
          {/* Header */}
          <div className="flex-shrink-0 flex flex-col items-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-black mb-2 tracking-tight drop-shadow-md"
            >
              Hydro-Reels
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-white/80 bg-blue-900/20 px-3 py-1 rounded-full"
              dir="rtl"
            >
              {totalBites} יחידות • {totalLessons} נושאים
            </motion.p>
          </div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-sm mb-6 flex-shrink-0 z-50"
          >
            <SpotlightSearch
              searchIndex={searchIndex}
              onSelect={handleSearchSelect}
              placeholder="חפש נושא או יחידת לימוד..."
            />
          </motion.div>

          {/* Embedded Topics List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 w-full max-w-sm overflow-y-auto no-scrollbar rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4"
            dir="rtl"
          >
            <h2 className="text-xl font-bold mb-4 text-right">התחל ללמוד מהנושאים:</h2>
            <div className="flex flex-col gap-3 pb-8">
              {categories.map((cat) => {
                const isExp = expandedHeroCat === cat.category_id;
                return (
                  <div key={cat.category_id} className="bg-white/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedHeroCat(isExp ? null : cat.category_id)}
                      className="w-full p-4 flex items-center gap-3 text-right"
                    >
                      <span className="text-2xl shrink-0">{resolveIcon(cat.icon)}</span>
                      <span className="flex-1 font-bold">{cat.category_title}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExp ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isExp && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-black/10"
                        >
                          <ul className="flex flex-col">
                            {cat.lessons.map((lesson) => (
                              <li key={lesson.lesson_id}>
                                <button
                                  onClick={() => handleSelectLesson(lesson.lesson_id)}
                                  className="w-full flex items-center justify-between p-3 px-4 hover:bg-white/10 transition-colors"
                                >
                                  <span className="text-sm">{lesson.lesson_title}</span>
                                  <ChevronLeft className="w-4 h-4 opacity-50" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex-shrink-0 animate-bounce flex flex-col items-center"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/90 mb-2">
              החלק למעלה להמשך הקורס
            </span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-1.5 backdrop-blur-sm">
              <div className="w-1 h-2.5 bg-white rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          ACTIVE TOPIC FEED
          ========================================== */}
      <div id="active-lesson-start">
        {activeSequences.map((seq, seqIndex) => {
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
                      onOpenTopics: () => setShowBottomSheet(true)
                    }}
                  />
                ))}
              </section>
            );
          }

          if (seq.sequenceTitle === "__intro__") {
            return (
              <section key={`intro-${seqIndex}`} className="relative w-full">
                {seq.bites.map((bite: Bite) => (
                  <ReelRenderer key={bite.bite_id} bite={bite} />
                ))}
              </section>
            );
          }

          return (
            <section
              key={seqIndex}
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
      </div>

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
