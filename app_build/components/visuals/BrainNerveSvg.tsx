"use client";

import React from "react";
import { motion } from "framer-motion";

interface BrainNerveSvgProps {
  mode: "conduction";
  className?: string;
}

export default function BrainNerveSvg({ mode, className = "" }: BrainNerveSvgProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Neuron Body */}
      <circle cx="30" cy="80" r="15" fill="currentColor" opacity="0.8" />
      {/* Dendrites */}
      <path d="M 30 65 L 20 50 M 30 95 L 20 110 M 15 80 L 5 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      
      {/* Axon */}
      <path d="M 45 80 L 140 80" stroke="currentColor" strokeWidth="4" opacity="0.8" />
      
      {/* Myelin Sheaths */}
      <rect x="55" y="75" width="20" height="10" rx="3" fill="#94a3b8" />
      <rect x="85" y="75" width="20" height="10" rx="3" fill="#94a3b8" />
      <rect x="115" y="75" width="20" height="10" rx="3" fill="#94a3b8" />

      {/* Signal (Action Potential) */}
      {mode === "conduction" && (
        <motion.circle 
          initial={{ cx: 45 }}
          animate={{ cx: [45, 140] }}
          // Slow conduction due to cold water
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          cy="80" r="4" fill="#f59e0b"
        />
      )}

      {/* Cold Water Effect (Snowflakes / Blue aura) */}
      {mode === "conduction" && (
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <path d="M 80 40 L 80 50 M 75 45 L 85 45 M 76 41 L 84 49 M 76 49 L 84 41" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M 110 110 L 110 120 M 105 115 L 115 115 M 106 111 L 114 119 M 106 119 L 114 111" stroke="#3b82f6" strokeWidth="1.5" />
        </motion.g>
      )}
    </svg>
  );
}
