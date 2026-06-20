"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ReelContainerProps {
  children: React.ReactNode[];
}

export const ReelContainer: React.FC<ReelContainerProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer is generally better for snap containers than raw scroll events
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.6, // trigger when 60% of the card is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index) && index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const cards = containerRef.current?.querySelectorAll(".reel-card");
    
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [activeIndex]);

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
              opacity: isActive ? 1 : 0.3,
              scale: isActive ? 1 : 0.9,
              y: isActive ? 0 : 20,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
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
