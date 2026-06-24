"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Props – pure data, no hardcoded clinical content                  */
/* ------------------------------------------------------------------ */
export interface SequenceEndCardProps {
  completedTitle: string;
  nextLessonTitle?: string;
  nextLessonId?: string;
  onContinue?: () => void;
  onGoHome?: () => void;
  onOpenTopics?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Floating bubble seed – deterministic per‑render, random positions */
/* ------------------------------------------------------------------ */
interface Bubble {
  id: number;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  opacity: number;
}

function generateBubbles(count = 8): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 10 + Math.random() * 30,
    x: `${5 + Math.random() * 90}%`,
    y: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.25,
  }));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SequenceEndCard({
  completedTitle,
  nextLessonTitle,
  onContinue,
  onGoHome,
  onOpenTopics,
}: SequenceEndCardProps) {
  const bubbles = useMemo(() => generateBubbles(8), []);

  return (
    <section
      dir="rtl"
      className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
    >
      {/* ---- Floating Bubbles ---- */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full bg-white"
            style={{
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
              opacity: b.opacity,
            }}
            animate={{ y: [0, -18, 0, 14, 0] }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ---- Central Content ---- */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-md">
        {/* Glassmorphism Emoji Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex items-center justify-center w-28 h-28 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl"
        >
          <span className="text-6xl leading-none select-none" role="img" aria-label="target">
            🎯
          </span>
        </motion.div>

        {/* Completion Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/80 text-lg font-medium mb-1">מעולה! סיימת את:</p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
            {completedTitle}
          </h2>
        </motion.div>

        {/* Divider sparkle line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "50%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-[2px] rounded-full bg-white/30"
        />

        {/* ---- Buttons ---- */}
        <div className="flex flex-col items-center gap-3 w-full mt-2">
          {/* Primary CTA – only when a next lesson exists */}
          {nextLessonTitle && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="w-full max-w-xs py-4 rounded-2xl bg-white text-teal-700 font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-colors hover:bg-white/90 active:bg-white/80 cursor-pointer"
            >
              <span>המשך ל: {nextLessonTitle}</span>
              <ArrowLeft className="w-5 h-5 rtl:rotate-0" />
            </motion.button>
          )}

          {/* Secondary CTA - Open topics drawer */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenTopics}
            className="w-full max-w-xs py-3 rounded-2xl border-2 border-white/50 text-white font-semibold text-base flex items-center justify-center gap-2 backdrop-blur-sm transition-colors hover:bg-white/10 cursor-pointer"
          >
            <span>בחר נושא אחר</span>
          </motion.button>

          {/* Tertiary CTA – always visible */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoHome}
            className="w-full max-w-xs py-3 text-white/80 font-medium text-sm flex items-center justify-center gap-2 transition-colors hover:text-white cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>חזור להתחלה</span>
          </motion.button>
        </div>
      </div>

      {/* ---- Bottom ambient glow ---- */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-gradient-to-t from-white/10 to-transparent rounded-t-full z-0" />
    </section>
  );
}
