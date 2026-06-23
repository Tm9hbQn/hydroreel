"use client";

import React from "react";
import { motion } from "framer-motion";

interface VenousReturnSvgProps {
  mode: "pooling" | "g_suit";
  className?: string;
}

export default function VenousReturnSvg({ mode, className = "" }: VenousReturnSvgProps) {
  // Generates blood particles
  const particles = Array.from({ length: 20 });

  return (
    <svg viewBox="0 0 100 180" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Body Silhouette */}
      <path d="M 50 20 Q 70 20 70 70 L 65 160 L 50 160 L 50 90 L 50 160 L 35 160 L 30 70 Q 30 20 50 20 Z" fill="currentColor" opacity="0.1" />
      
      {/* Heart */}
      <motion.path 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ originX: "50px", originY: "45px" }}
        d="M 50 50 Q 45 40 40 45 Q 35 50 50 60 Q 65 50 60 45 Q 55 40 50 50 Z" fill="#ef4444" 
      />

      {/* Blood particles */}
      {particles.map((_, i) => {
        const isLeft = i % 2 === 0;
        const startX = isLeft ? 40 : 60;
        
        return mode === "pooling" ? (
          // Pooling: Drop down and stay at bottom
          <motion.circle 
            key={i}
            cx={startX + (Math.random() * 4 - 2)}
            r="1.5"
            fill="#ef4444"
            initial={{ cy: 60 }}
            animate={{ cy: [60, 140 + Math.random() * 15] }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "loop" }}
          />
        ) : (
          // G-Suit: Start at bottom, pushed up to heart
          <motion.circle 
            key={i}
            cx={startX + (Math.random() * 4 - 2)}
            r="1.5"
            fill="#ef4444"
            initial={{ cy: 150 }}
            animate={{ cy: [150, 60] }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "easeOut" }}
          />
        );
      })}

      {/* Hydrostatic G-Suit Arrows */}
      {mode === "g_suit" && (
        <motion.g animate={{ x: [0, 5], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          {/* Left leg arrows pointing rightwards/inwards */}
          <path d="M 15 140 L 25 140 M 20 135 L 25 140 L 20 145" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M 15 110 L 25 110 M 20 105 L 25 110 L 20 115" stroke="#3b82f6" strokeWidth="2" fill="none" />
        </motion.g>
      )}
      {mode === "g_suit" && (
        <motion.g animate={{ x: [0, -5], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          {/* Right leg arrows pointing leftwards/inwards */}
          <path d="M 85 140 L 75 140 M 80 135 L 75 140 L 80 145" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M 85 110 L 75 110 M 80 105 L 75 110 L 80 115" stroke="#3b82f6" strokeWidth="2" fill="none" />
        </motion.g>
      )}
    </svg>
  );
}
