"use client";

import React from "react";
import { motion } from "framer-motion";

interface BoneSvgProps {
  mode: "normal" | "spiral" | "wolff";
  className?: string;
}

export default function BoneSvg({ mode, className = "" }: BoneSvgProps) {
  // A simple long bone
  const bonePath = "M 40 10 Q 50 0 60 10 Q 55 20 55 30 L 55 130 Q 55 140 65 150 Q 50 160 35 150 Q 45 140 45 130 L 45 30 Q 45 20 40 10 Z";

  return (
    <svg viewBox="0 0 100 160" className={className} preserveAspectRatio="xMidYMid meet">
      <motion.path 
        d={bonePath} 
        fill="currentColor" 
        opacity="0.8"
      />

      {mode === "spiral" && (
        <motion.g>
          {/* Rotational Force Arrows */}
          <motion.path 
            animate={{ opacity: [0, 1, 0], rotate: [0, 15] }} 
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "50px", originY: "80px" }}
            d="M 20 80 Q 20 50 50 50" stroke="#f59e0b" strokeWidth="2" fill="none" 
          />
          <motion.path 
            animate={{ opacity: [0, 1, 0], rotate: [0, 15] }} 
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "50px", originY: "80px" }}
            d="M 80 80 Q 80 110 50 110" stroke="#f59e0b" strokeWidth="2" fill="none" 
          />
          {/* Fracture Line */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            d="M 45 70 L 55 90" stroke="#ef4444" strokeWidth="3" fill="none" 
          />
          {/* Huge Red X */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], ease: "anticipate" }}
            style={{ originX: "50px", originY: "80px" }}
          >
            {/* Glow */}
            <path d="M 20 50 L 80 110 M 80 50 L 20 110" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" opacity="0.4" filter="blur(4px)" />
            {/* Core */}
            <path d="M 20 50 L 80 110 M 80 50 L 20 110" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          </motion.g>
        </motion.g>
      )}

      {mode === "wolff" && (
        <motion.g>
          {/* Hydrostatic Pressure Arrows */}
          <motion.g animate={{ x: [0, 5], opacity: [0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}>
            <path d="M 10 50 L 35 50 M 30 45 L 35 50 L 30 55" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M 10 110 L 35 110 M 30 105 L 35 110 L 30 115" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </motion.g>
          <motion.g animate={{ x: [0, -5], opacity: [0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}>
            <path d="M 90 50 L 65 50 M 70 45 L 65 50 L 70 55" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M 90 110 L 65 110 M 70 105 L 65 110 L 70 115" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </motion.g>

          {/* Bone Density Dots */}
          {[...Array(15)].map((_, i) => (
            <motion.circle 
              key={i}
              cx={45 + Math.random() * 10} 
              cy={30 + Math.random() * 100} 
              r="1.5"
              fill="#10b981"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  );
}
