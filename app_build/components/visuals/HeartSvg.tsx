"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeartSvgProps {
  mode: "normal" | "blood_shift" | "frank_starling" | "chf" | "anp";
  className?: string;
}

export default function HeartSvg({ mode, className = "" }: HeartSvgProps) {
  // A generic stylized heart with chambers
  const heartPath = "M 50 80 Q 30 50 20 60 Q 10 70 50 120 Q 90 70 80 60 Q 70 50 50 80 Z";

  return (
    <svg viewBox="0 0 100 160" className={className} preserveAspectRatio="xMidYMid meet">
      
      {/* Vena Cava / Veins returning to heart */}
      {mode === "blood_shift" && (
        <motion.g animate={{ y: [-20, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path d="M 50 160 L 50 110" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
          <path d="M 45 130 L 50 120 L 55 130" stroke="white" strokeWidth="2" fill="none" />
        </motion.g>
      )}

      {/* Main Heart */}
      <motion.path 
        d={heartPath} 
        fill={mode === "chf" ? "#991b1b" : "#ef4444"} 
        stroke="#991b1b" 
        strokeWidth="2"
        animate={
          mode === "chf" ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } :
          mode === "frank_starling" ? { scale: [1, 1.3, 1] } :
          { scale: [1, 1.15, 1] }
        }
        transition={
          mode === "chf" ? { duration: 0.4, repeat: Infinity, repeatType: "mirror" } :
          { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ originX: "50px", originY: "80px" }}
      />

      {/* Frank-Starling stretch markers */}
      {mode === "frank_starling" && (
        <motion.g 
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }} 
          transition={{ duration: 1, repeat: Infinity }}
          style={{ originX: "50px", originY: "80px" }}
        >
          <path d={heartPath} fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="4 4" />
        </motion.g>
      )}

      {/* ANP Release */}
      {mode === "anp" && (
        <motion.g>
          {[...Array(5)].map((_, i) => (
            <motion.circle 
              key={i}
              cx="40" cy="65" r="3" fill="#fbbf24"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: -20 - Math.random()*20, y: -20 - Math.random()*20, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </motion.g>
      )}

      {/* CHF Warning */}
      {mode === "chf" && (
        <motion.g
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ originX: "50px", originY: "80px" }}
        >
          <path d="M 40 70 L 60 90 M 60 70 L 40 90" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}
