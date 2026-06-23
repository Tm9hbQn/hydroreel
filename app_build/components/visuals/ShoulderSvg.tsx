"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShoulderSvgProps {
  mode: "high_five" | "aarom" | "rom";
  className?: string;
}

export default function ShoulderSvg({ mode, className = "" }: ShoulderSvgProps) {
  
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Torso/Scapula */}
      <path d="M 20 20 L 60 20 Q 70 40 60 80 L 20 80 Z" fill="currentColor" opacity="0.8" />
      
      {/* Humeral Head / Shoulder Joint */}
      <circle cx="65" cy="40" r="10" fill="currentColor" opacity="0.9" />

      {/* Arm Assembly */}
      <motion.g
        animate={
          mode === "high_five" ? { rotate: [0, -90, -90] } :
          mode === "aarom" ? { rotate: [0, -45, 0] } :
          mode === "rom" ? { rotate: [0, -120, 0] } : {}
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "65px", originY: "40px" }}
      >
        {/* Upper Arm */}
        <path d="M 60 40 L 70 40 L 70 90 L 60 90 Z" fill="currentColor" opacity="0.8" />
        {/* Elbow Joint */}
        <circle cx="65" cy="90" r="6" fill="currentColor" opacity="0.9" />
        
        {/* Forearm - high five bends it */}
        <motion.g
          animate={mode === "high_five" ? { rotate: [0, 90, 90] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "65px", originY: "90px" }}
        >
          <path d="M 62 90 L 68 90 L 68 140 L 62 140 Z" fill="currentColor" opacity="0.8" />
        </motion.g>
        
        {/* Buoy for AAROM */}
        {mode === "aarom" && (
          <ellipse cx="65" cy="140" rx="15" ry="10" fill="#3b82f6" opacity="0.7" />
        )}
      </motion.g>

      {/* High Five Warning X */}
      {mode === "high_five" && (
        <motion.g
          animate={{ opacity: [0, 0, 1, 1], scale: [0.5, 0.5, 1.5, 1.2] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 0.7, 1], ease: "anticipate" }}
          style={{ originX: "115px", originY: "40px" }}
        >
          {/* Glow */}
          <path d="M 85 10 L 145 70 M 145 10 L 85 70" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" opacity="0.4" filter="blur(4px)" />
          {/* Core */}
          <path d="M 85 10 L 145 70 M 145 10 L 85 70" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        </motion.g>
      )}

      {/* Buoyancy Arrow for AAROM */}
      {mode === "aarom" && (
        <motion.g
          animate={{ rotate: [0, -45, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "65px", originY: "40px" }}
        >
          <motion.path 
            d="M 90 140 L 90 110 M 85 115 L 90 110 L 95 115" 
            stroke="#3b82f6" strokeWidth="3" fill="none" 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>
      )}

      {/* ROM Protractor Arc */}
      {mode === "rom" && (
        <motion.g>
          <path d="M 65 100 A 60 60 0 0 1 125 40" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          {/* Animated filled arc */}
          <motion.path 
            d="M 65 40 L 65 100 A 60 60 0 0 1 125 40 Z" 
            fill="#f59e0b" opacity="0.2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      )}
    </svg>
  );
}
