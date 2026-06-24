"use client";

import React from "react";
import { motion } from "framer-motion";

interface KidneySvgProps {
  mode: "normal" | "diuresis" | "anp" | "adh_suppression";
  className?: string;
}

export default function KidneySvg({ mode, className = "" }: KidneySvgProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Aorta & Vena Cava */}
      <path d="M 75 20 L 75 140" stroke="#ef4444" strokeWidth="6" />
      <path d="M 85 20 L 85 140" stroke="#3b82f6" strokeWidth="6" />

      {/* Renal Arteries */}
      <path d="M 75 60 L 50 65" stroke="#ef4444" strokeWidth="4" />
      <path d="M 75 60 L 110 65" stroke="#ef4444" strokeWidth="4" />

      {/* Kidneys */}
      <path d="M 55 50 Q 30 40 20 60 Q 10 90 30 100 Q 50 110 50 80 Q 40 70 55 50 Z" fill="#b45309" opacity="0.9" />
      <path d="M 105 50 Q 130 40 140 60 Q 150 90 130 100 Q 110 110 110 80 Q 120 70 105 50 Z" fill="#b45309" opacity="0.9" />

      {/* Ureters */}
      <path d="M 40 90 Q 50 120 60 150" stroke="#fbbf24" strokeWidth="3" fill="none" />
      <path d="M 120 90 Q 110 120 100 150" stroke="#fbbf24" strokeWidth="3" fill="none" />

      {/* Diuresis Drops */}
      {(mode === "diuresis" || mode === "anp" || mode === "adh_suppression") && (
        <motion.g>
          {[...Array(6)].map((_, i) => (
            <motion.circle 
              key={i}
              cx={i % 2 === 0 ? 55 : 105} 
              r="2.5" 
              fill="#fde047"
              initial={{ cy: 110, opacity: 1 }}
              animate={{ cy: 160, opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: "easeIn" }}
            />
          ))}
        </motion.g>
      )}

      {/* ANP arriving */}
      {mode === "anp" && (
        <motion.g>
          {[...Array(3)].map((_, i) => (
            <motion.circle 
              key={`anp-${i}`}
              cx="75" r="3" fill="#fbbf24"
              initial={{ cy: 20 }}
              animate={{ cy: 60, x: i % 2 === 0 ? -25 : 35 }}
              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </motion.g>
      )}
    </svg>
  );
}
