"use client";

import React from "react";
import { motion } from "framer-motion";

interface AutonomicDysreflexiaSvgProps {
  className?: string;
  triggerVisible?: boolean;
}

export default function AutonomicDysreflexiaSvg({ className = "", triggerVisible = true }: AutonomicDysreflexiaSvgProps) {
  // A silhouette with a spinal cord
  return (
    <svg viewBox="0 0 100 180" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Basic body silhouette */}
      <path d="M 50 10 Q 65 10 65 25 Q 65 35 55 45 L 70 90 L 70 160 L 50 160 L 50 90 L 30 160 L 30 90 L 45 45 Q 35 35 35 25 Q 35 10 50 10 Z" fill="currentColor" opacity="0.1" />
      
      {/* Spinal Cord */}
      <path d="M 50 25 L 50 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      
      {/* Lesion at T6 */}
      <path d="M 40 55 L 60 55" stroke="#ef4444" strokeWidth="3" strokeDasharray="2 2" />

      {/* Trigger (e.g. Bladder) */}
      {triggerVisible && (
        <motion.circle 
          animate={{ scale: [1, 1.2, 1], fill: ["#f59e0b", "#ef4444", "#f59e0b"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          cx="50" cy="110" r="8" 
        />
      )}

      {/* Red Lightning Pain Signal going up to lesion */}
      {triggerVisible && (
        <motion.path 
          d="M 50 105 L 55 90 L 45 80 L 55 65 L 50 55" 
          stroke="#ef4444" strokeWidth="2" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Vasoconstriction above lesion */}
      {triggerVisible && (
        <motion.g animate={{ scaleX: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} style={{ originX: "50px" }}>
          {/* Blood vessels in neck/head */}
          <path d="M 45 35 L 45 25 M 55 35 L 55 25" stroke="#ef4444" strokeWidth="2" />
        </motion.g>
      )}

      {/* High BP Indicator (Brain) - Dramatic Warning */}
      {triggerVisible && (
        <motion.g 
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "50px", originY: "15px" }}
        >
          {/* Intense red glow */}
          <circle cx="50" cy="15" r="12" fill="#ef4444" opacity="0.6" filter="blur(3px)" />
          {/* Warning Triangle */}
          <path d="M 50 5 L 60 22 L 40 22 Z" fill="#ef4444" stroke="#fff" strokeWidth="1" />
          {/* Exclamation Mark */}
          <path d="M 50 10 L 50 16 M 50 19 L 50 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}
