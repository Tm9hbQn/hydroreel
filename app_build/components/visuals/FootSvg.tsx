"use client";

import React from "react";
import { motion } from "framer-motion";

interface FootSvgProps {
  mode: "planus" | "cavus" | "sprain_early" | "sprain_advanced";
  className?: string;
}

export default function FootSvg({ mode, className = "" }: FootSvgProps) {
  
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Tibia/Fibula */}
      <motion.path 
        animate={mode === "sprain_advanced" ? { rotate: [-5, 5, -5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "80px", originY: "120px" }}
        d="M 65 20 L 95 20 L 90 90 L 70 90 Z" 
        fill="currentColor" opacity="0.8" 
      />

      {/* Foot */}
      <motion.g
        animate={
          mode === "sprain_advanced" ? { rotate: [5, -5, 5] } : {}
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "80px", originY: "120px" }}
      >
        <path d="M 60 90 L 100 90 L 110 110 Q 140 120 140 140 L 40 140 Q 30 130 50 110 Z" fill="currentColor" opacity="0.8" />
        
        {/* Arch modification */}
        {(mode === "planus" || mode === "cavus") && (
          <motion.path 
            animate={
              mode === "planus" 
                ? { d: ["M 60 140 Q 90 120 120 140", "M 60 140 Q 90 140 120 140"] }
                : { d: ["M 60 140 Q 90 140 120 140", "M 60 140 Q 90 100 120 140"] }
            }
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            stroke="currentColor" strokeWidth="4" fill="none"
          />
        )}
      </motion.g>

      {/* Sprain Early (Edema & Pressure) */}
      {mode === "sprain_early" && (
        <motion.g>
          {/* Swelling */}
          <motion.ellipse 
            animate={{ rx: [15, 10, 15], ry: [20, 15, 20], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            cx="65" cy="110" rx="15" ry="20" fill="#ef4444" opacity="0.6"
          />
          {/* Hydrostatic Pressure */}
          <motion.g animate={{ x: [10, 25] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}>
            <path d="M 30 110 L 50 110 M 45 105 L 50 110 L 45 115" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </motion.g>
        </motion.g>
      )}

      {/* Sprain Advanced (Proprioception Waves) */}
      {mode === "sprain_advanced" && (
        <motion.g>
          <motion.circle 
            animate={{ r: [0, 40], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx="80" cy="120" fill="none" stroke="#f59e0b" strokeWidth="2"
          />
          <motion.circle 
            animate={{ r: [0, 40], opacity: [1, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            cx="80" cy="120" fill="none" stroke="#f59e0b" strokeWidth="2"
          />
        </motion.g>
      )}
    </svg>
  );
}
