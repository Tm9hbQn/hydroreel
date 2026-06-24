"use client";

import React from "react";
import { motion } from "framer-motion";

interface BloodVesselVasoSvgProps {
  mode: "normal" | "vasodilation";
  className?: string;
}

export default function BloodVesselVasoSvg({ mode, className = "" }: BloodVesselVasoSvgProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      
      {/* Vessel walls */}
      <motion.path 
        animate={mode === "vasodilation" ? { d: ["M 20 60 L 140 60", "M 20 40 L 140 40", "M 20 40 L 140 40"] } : { d: "M 20 60 L 140 60" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        stroke="#ef4444" strokeWidth="4" strokeLinecap="round"
      />
      <motion.path 
        animate={mode === "vasodilation" ? { d: ["M 20 100 L 140 100", "M 20 120 L 140 120", "M 20 120 L 140 120"] } : { d: "M 20 100 L 140 100" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        stroke="#ef4444" strokeWidth="4" strokeLinecap="round"
      />

      {/* Red Blood Cells */}
      {[...Array(5)].map((_, i) => (
        <motion.circle 
          key={`rbc-${i}`}
          cy="80" r="6" fill="#ef4444" opacity="0.8"
          initial={{ cx: 20 }}
          animate={{ cx: 140 }}
          transition={{ duration: mode === "vasodilation" ? 1 : 2, delay: i * (mode === "vasodilation" ? 0.2 : 0.4), repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Insulin / Glucose Molecules */}
      {mode === "vasodilation" && (
        <motion.g>
          {[...Array(8)].map((_, i) => (
            <motion.rect 
              key={`ins-${i}`}
              y={50 + Math.random() * 60} width="4" height="4" fill="#3b82f6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 140, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.g>
      )}

      {/* Heat Waves */}
      {mode === "vasodilation" && (
        <motion.g animate={{ opacity: [0, 0.6, 0], y: [-5, -15] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path d="M 40 20 Q 45 10 50 20 T 60 20" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <path d="M 100 20 Q 105 10 110 20 T 120 20" stroke="#f59e0b" strokeWidth="2" fill="none" />
        </motion.g>
      )}
    </svg>
  );
}
