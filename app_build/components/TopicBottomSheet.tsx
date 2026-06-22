"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronDown, ChevronLeft, BookOpen } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Type Contracts                                                     */
/* ------------------------------------------------------------------ */

interface LessonData {
  lesson_id: string;
  lesson_title: string;
  bite_count: number;
}

interface CategoryData {
  category_id: string;
  category_title: string;
  icon: string;
  color_from: string;
  color_to: string;
  description: string;
  lessons: LessonData[];
}

interface TopicBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryData[];
  onSelectLesson: (lessonId: string) => void;
  searchSlot?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Icon Resolver                                                      */
/* ------------------------------------------------------------------ */

/** Maps a string icon key coming from data to an emoji/symbol.
 *  Keeps the component decoupled — no hardcoded icon assumptions. */
const resolveIcon = (key: string): string => {
  const map: Record<string, string> = {
    water: "💧",
    heart: "❤️",
    brain: "🧠",
    bone: "🦴",
    lungs: "🫁",
    baby: "👶",
    muscle: "💪",
    spa: "🧖",
    rehab: "🏥",
    swim: "🏊",
    wave: "🌊",
    star: "⭐",
  };
  return map[key] ?? "📘";
};

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { type: "spring" as const, damping: 32, stiffness: 380, mass: 0.8 },
  },
  exit: {
    y: "100%",
    transition: { type: "spring" as const, damping: 40, stiffness: 400, mass: 0.6 },
  },
};

const expandVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Category Card                                                      */
/* ------------------------------------------------------------------ */

function CategoryCard({
  category,
  isExpanded,
  onToggle,
  onSelectLesson,
}: {
  category: CategoryData;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectLesson: (lessonId: string) => void;
}) {
  return (
    <div className="mb-3">
      {/* ---- Header ---- */}
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.97 }}
        className="w-full rounded-2xl p-4 flex items-center gap-3 shadow-lg cursor-pointer
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{
          background: `linear-gradient(135deg, ${category.color_from}, ${category.color_to})`,
        }}
      >
        {/* Icon (appears on the right in RTL) */}
        <span className="text-3xl shrink-0 drop-shadow-md" role="img" aria-hidden>
          {resolveIcon(category.icon)}
        </span>

        {/* Text */}
        <div className="flex-1 text-right min-w-0">
          <h3 className="text-white font-bold text-lg leading-tight truncate">
            {category.category_title}
          </h3>
          <p className="text-white/75 text-xs mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>

        {/* Expand chevron */}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/80" />
        </motion.span>
      </motion.button>

      {/* ---- Expandable lessons list ---- */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.ul
            key="lessons"
            variants={expandVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden pr-6 pl-2 mt-1"
          >
            {category.lessons.map((lesson, idx) => (
              <motion.li
                key={lesson.lesson_id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => onSelectLesson(lesson.lesson_id)}
                  className="w-full flex items-center gap-2 py-3 px-3 rounded-xl
                             hover:bg-slate-100 active:bg-slate-200
                             transition-colors text-right group cursor-pointer"
                >
                  {/* Lesson icon */}
                  <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors" />

                  {/* Title */}
                  <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
                    {lesson.lesson_title}
                  </span>

                  {/* Bite count badge */}
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 shrink-0">
                    {lesson.bite_count}
                  </span>

                  {/* Navigate chevron (Left for RTL forward) */}
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0 transition-colors" />
                </button>

                {/* Divider — skip after last */}
                {idx < category.lessons.length - 1 && (
                  <div className="h-px bg-slate-100 mx-2" />
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TopicBottomSheet({
  isOpen,
  onClose,
  categories,
  onSelectLesson,
  searchSlot,
}: TopicBottomSheetProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 600) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        /* Root portal-like wrapper — fixed full-screen */
        <div className="fixed inset-0 z-50" dir="rtl">
          {/* ---- Backdrop ---- */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* ---- Bottom Sheet ---- */}
          <motion.div
            key="sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute bottom-0 w-full max-h-[70vh] rounded-t-3xl shadow-2xl
                       bg-white/95 backdrop-blur-xl flex flex-col overflow-hidden
                       touch-none"
            style={{ willChange: "transform" }}
          >
            {/* ---- Drag Handle ---- */}
            <div className="flex justify-center pt-3 pb-2 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* ---- Scrollable Content ---- */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 touch-auto flex flex-col"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Search Slot (injected from HomeClient) */}
              {searchSlot && (
                <div className="mb-4 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {searchSlot}
                </div>
              )}

              {/* Section title */}
              <h2 className="text-xl font-bold text-slate-800 mb-4 px-1 shrink-0">
                נושאי לימוד
              </h2>

              {categories.map((cat) => (
                <CategoryCard
                  key={cat.category_id}
                  category={cat}
                  isExpanded={expandedId === cat.category_id}
                  onToggle={() => handleToggle(cat.category_id)}
                  onSelectLesson={onSelectLesson}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
