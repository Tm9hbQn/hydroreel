"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpineCoronalProps {
  className?: string;
}

export default function SpineCoronal({ className = "" }: SpineCoronalProps) {
  // Coronal (frontal/back) view for Scoliosis
  // 5 vertebrae in an S-curve, slowly straightening
  
  // Base vertebra (width 30, height 20)
  const drawVertebra = (xOffset: number, yOffset: number, rotation: number) => (
    <motion.g
      animate={{ x: [xOffset, xOffset * 0.3], rotate: [rotation, rotation * 0.3] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      style={{ originX: "50px", originY: `${yOffset + 10}px` }}
    >
      <rect x="35" y={yOffset} width="30" height="20" rx="3" fill="currentColor" opacity="0.8" />
      {/* Transverse processes */}
      <rect x="25" y={yOffset + 5} width="10" height="10" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="65" y={yOffset + 5} width="10" height="10" rx="2" fill="currentColor" opacity="0.5" />
      {/* Spinous process (circle in middle) */}
      <circle cx="50" cy={yOffset + 10} r="3" fill="currentColor" opacity="0.9" />
    </motion.g>
  );

  return (
    <svg viewBox="0 0 100 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Draw vertebrae with initial S-curve offsets */}
      {drawVertebra(10, 10, 15)}
      {drawVertebra(20, 35, 10)}
      {drawVertebra(15, 60, 0)}
      {drawVertebra(-5, 85, -10)}
      {drawVertebra(-10, 110, -15)}

      {/* Discs in between */}
      {[10, 35, 60, 85].map((y, i) => {
        const xOffsets = [10, 20, 15, -5, -10];
        const rots = [15, 10, 0, -10, -15];
        return (
          <motion.g
            key={i}
            animate={{ 
              x: [(xOffsets[i] + xOffsets[i+1])/2, ((xOffsets[i] + xOffsets[i+1])/2) * 0.3],
              rotate: [(rots[i] + rots[i+1])/2, ((rots[i] + rots[i+1])/2) * 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ originX: "50px", originY: `${y + 25}px` }}
          >
            <rect x="38" y={y + 22} width="24" height="10" rx="2" fill="#3b82f6" opacity="0.5" />
          </motion.g>
        );
      })}

      {/* Water force arrows pushing towards midline */}
      <motion.g animate={{ opacity: [0, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
        {/* Pushing left from the right side of the upper curve */}
        <path d="M 90 45 L 75 45 M 80 40 L 75 45 L 80 50" stroke="#10b981" strokeWidth="2" fill="none" />
        <path d="M 90 35 L 75 35 M 80 30 L 75 35 L 80 40" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />
        
        {/* Pushing right from the left side of the lower curve */}
        <path d="M 10 95 L 25 95 M 20 90 L 25 95 L 20 100" stroke="#10b981" strokeWidth="2" fill="none" />
        <path d="M 10 105 L 25 105 M 20 100 L 25 105 L 20 110" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />
      </motion.g>

      {/* Midline reference (optional) */}
      <line x1="50" y1="0" x2="50" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
    </svg>
  );
}
