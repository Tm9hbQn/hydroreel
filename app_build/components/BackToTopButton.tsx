"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface BackToTopButtonProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  showAfterIndex?: number; // Show after this many reels scrolled (default 2 = 3rd reel)
}

export default function BackToTopButton({ 
  scrollContainerRef,
  showAfterIndex = 2,
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef?.current || window;
    const scrollTarget = scrollContainerRef?.current || document.documentElement;
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollTop = scrollTarget instanceof HTMLElement 
        ? scrollTarget.scrollTop 
        : window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Show after scrolling past N screens
      const threshold = viewportHeight * (showAfterIndex + 1);
      setIsVisible(scrollTop > threshold);
      
      // Reset idle timer
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 3000);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(idleTimer);
    };
  }, [scrollContainerRef, showAfterIndex]);

  const scrollToTop = () => {
    const container = scrollContainerRef?.current || window;
    container.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: isIdle ? 0.35 : 0.85,
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-5 z-40 w-11 h-11 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/30 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-xl transition-colors"
          aria-label="חזרה למעלה"
        >
          <ChevronUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
