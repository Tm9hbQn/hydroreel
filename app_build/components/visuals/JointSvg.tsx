"use client";

import React from "react";
import { motion } from "framer-motion";

interface JointSvgProps {
  type: "hip" | "knee";
  mode: "thr" | "perthes" | "tkr" | "valgum";
  className?: string;
}

export default function JointSvg({ type, mode, className = "" }: JointSvgProps) {
  
  if (type === "hip") {
    return (
      <svg viewBox="0 0 100 160" className={className} preserveAspectRatio="xMidYMid meet">
        {/* Pelvis / Acetabulum */}
        <path d="M 20 20 Q 50 10 70 30 Q 80 50 60 70 Q 50 75 40 60 Q 30 40 20 20 Z" fill="currentColor" opacity="0.8" />
        
        {/* Femur */}
        <motion.g
          animate={
            mode === "thr" || mode === "perthes" 
              ? { rotate: [0, -15, 0] } 
              : {}
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "50px", originY: "50px" }}
        >
          {/* Femoral Head */}
          <circle cx="50" cy="50" r="12" fill={mode === "thr" ? "#94a3b8" : "currentColor"} opacity="0.9" />
          {/* Femoral Shaft */}
          <path d="M 45 60 L 55 60 L 60 150 L 40 150 Z" fill="currentColor" opacity="0.8" />
        </motion.g>

        {mode === "thr" && (
          <motion.g animate={{ opacity: [0, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}>
            <path d="M 65 90 Q 80 80 80 60" stroke="#10b981" strokeWidth="2" fill="none" />
            <path d="M 75 65 L 80 60 L 85 65" stroke="#10b981" strokeWidth="2" fill="none" />
          </motion.g>
        )}
        
        {mode === "perthes" && (
          <motion.circle 
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            cx="50" cy="50" r="16" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2"
          />
        )}
      </svg>
    );
  }

  // Knee
  return (
    <svg viewBox="0 0 100 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Femur (Top) */}
      <motion.g
        animate={mode === "valgum" ? { rotate: 10 } : {}}
        style={{ originX: "50px", originY: "80px" }}
      >
        <path d="M 40 10 L 60 10 L 55 70 Q 55 80 65 80 Q 70 80 65 75 M 40 10 L 45 70 Q 45 80 35 80 Q 30 80 35 75" fill="currentColor" opacity="0.8" />
        <path d="M 35 75 Q 50 90 65 75" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.8" />
      </motion.g>

      {/* Tibia (Bottom) */}
      <motion.g
        animate={mode === "valgum" ? { rotate: -10 } : {}}
        style={{ originX: "50px", originY: "80px" }}
      >
        <path d="M 35 90 L 65 90 L 55 150 L 45 150 Z" fill="currentColor" opacity="0.8" />
      </motion.g>

      {mode === "tkr" && (
        <motion.g>
          {/* Swelling */}
          <motion.ellipse 
            animate={{ rx: [25, 18, 25], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            cx="50" cy="80" rx="25" ry="15" fill="#ef4444" opacity="0.6"
          />
          {/* Hydrostatic Pressure */}
          <motion.g animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "50px", originY: "80px" }}>
            <path d="M 10 80 L 25 80 M 20 75 L 25 80 L 20 85" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M 90 80 L 75 80 M 80 75 L 75 80 L 80 85" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M 50 110 L 50 95 M 45 100 L 50 95 L 55 100" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M 50 50 L 50 65 M 45 60 L 50 65 L 55 60" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </motion.g>
        </motion.g>
      )}

      {mode === "valgum" && (
        <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          {/* Water Resistance opposing valgus */}
          <path d="M 85 80 L 70 80 M 75 75 L 70 80 L 75 85" stroke="#10b981" strokeWidth="2" fill="none" />
        </motion.g>
      )}
    </svg>
  );
}
