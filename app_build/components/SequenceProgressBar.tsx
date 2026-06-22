"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface SequenceProgressBarProps {
  /** Total number of reels/bites in the sequence */
  totalSteps: number;
  /** Currently active step (0-indexed) */
  activeStep: number;
  /** Optional accent color — applied as a solid fill and glow. Falls back to the default blue→cyan gradient when omitted. */
  accentColor?: string;
}

export default function SequenceProgressBar({
  totalSteps,
  activeStep,
  accentColor,
}: SequenceProgressBarProps) {
  const [isActive, setIsActive] = useState(true);

  // ── Scroll-activity tracker ───────────────────────────────
  // While the user scrolls the bar stays fully opaque.
  // After 3 s of inactivity it fades to 0.4 opacity.
  const handleActivity = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      handleActivity();
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsActive(false), 3000);
    };

    // Also listen for touch events so swipe-based scrolling triggers the bar
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    // Start the initial 3-second countdown
    timeout = setTimeout(() => setIsActive(false), 3000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [handleActivity]);

  // ── Segment style helpers ─────────────────────────────────
  const getSegmentStyle = (index: number): React.CSSProperties => {
    const isFilled = index < activeStep;
    const isCurrentlyActive = index === activeStep;

    if (isFilled || isCurrentlyActive) {
      const base: React.CSSProperties = accentColor
        ? { backgroundColor: accentColor }
        : {
            background: "linear-gradient(to right, #60a5fa, #22d3ee)", // blue-400 → cyan-400
          };

      if (isCurrentlyActive) {
        const glowColor = accentColor ?? "#22d3ee";
        return {
          ...base,
          boxShadow: `0 0 8px 2px ${glowColor}80, 0 0 16px 4px ${glowColor}40`,
        };
      }

      return base;
    }

    // Unfilled segment
    return { backgroundColor: "rgba(255,255,255,0.20)" };
  };

  // Guard: nothing to render if there are no steps
  if (totalSteps <= 0) return null;

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 1 }}
      animate={{ opacity: isActive ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 h-1.5 z-50 flex gap-[2px] px-2 pt-1"
      role="progressbar"
      aria-valuenow={activeStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          layout
          className="flex-1 h-full rounded-full"
          style={getSegmentStyle(i)}
          initial={false}
          animate={{
            scale: i === activeStep ? 1 : 1,
            opacity: 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}
