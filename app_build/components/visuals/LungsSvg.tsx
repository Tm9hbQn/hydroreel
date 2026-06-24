"use client";

import React from "react";
import { motion } from "framer-motion";

interface LungsSvgProps {
  mode: "normal" | "hydrostatic_corset" | "vital_capacity" | "pulmonary_edema";
  className?: string;
}

export default function LungsSvg({ mode, className = "" }: LungsSvgProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} preserveAspectRatio="xMidYMid meet">
      {/* Trachea */}
      <path d="M 75 20 L 75 50 M 85 20 L 85 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M 75 50 L 60 70 M 85 50 L 100 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

      {/* Lungs */}
      <motion.g
        animate={
          mode === "hydrostatic_corset" || mode === "vital_capacity"
            ? { scaleX: [1, 0.8, 1], scaleY: [1, 0.9, 1] }
            : { scaleX: [1, 1.05, 1], scaleY: [1, 1.05, 1] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "80px", originY: "80px" }}
      >
        {/* Left Lung */}
        <path d="M 70 50 Q 30 50 30 100 Q 30 140 70 130 Z" fill="#f472b6" opacity="0.7" />
        {/* Right Lung */}
        <path d="M 90 50 Q 130 50 130 100 Q 130 140 90 130 Z" fill="#f472b6" opacity="0.7" />

        {/* Pulmonary Edema (Fluid in lungs) */}
        {mode === "pulmonary_edema" && (
          <g>
            <path d="M 30 100 Q 30 140 70 130 L 70 110 Q 50 100 30 100 Z" fill="#3b82f6" opacity="0.8" />
            <path d="M 130 100 Q 130 140 90 130 L 90 110 Q 110 100 130 100 Z" fill="#3b82f6" opacity="0.8" />
          </g>
        )}
      </motion.g>

      {/* Hydrostatic Corset Arrows */}
      {(mode === "hydrostatic_corset" || mode === "vital_capacity") && (
        <motion.g animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M 10 90 L 25 90 M 15 85 L 25 90 L 15 95" stroke="#3b82f6" strokeWidth="3" fill="none" />
          <path d="M 10 120 L 25 120 M 15 115 L 25 120 L 15 125" stroke="#3b82f6" strokeWidth="3" fill="none" />
        </motion.g>
      )}
      {(mode === "hydrostatic_corset" || mode === "vital_capacity") && (
        <motion.g animate={{ x: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M 150 90 L 135 90 M 145 85 L 135 90 L 145 95" stroke="#3b82f6" strokeWidth="3" fill="none" />
          <path d="M 150 120 L 135 120 M 145 115 L 135 120 L 145 125" stroke="#3b82f6" strokeWidth="3" fill="none" />
        </motion.g>
      )}
    </svg>
  );
}
