"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ReelContainerProps {
  children: React.ReactNode[];
}

export const ReelContainer: React.FC<ReelContainerProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  // Stable observer — no dependency on activeIndex, preventing race conditions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index) && index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: container,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const cards = container.querySelectorAll(".reel-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []); // ← Empty deps: observer created once, no re-registration

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-slate-950 relative scroll-smooth no-scrollbar"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      {React.Children.map(children, (child, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={index}
            data-index={index}
            className="reel-card h-[100dvh] w-full snap-start snap-always flex flex-col items-center justify-center relative overflow-hidden"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0.4,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* The child card content is injected here, strictly adhering to Decoupling Rule */}
            <div className="w-full h-full p-4 flex flex-col justify-center items-center">
               {child}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

