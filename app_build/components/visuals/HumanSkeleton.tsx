"use client";

import React from "react";
import { motion } from "framer-motion";

interface HumanSkeletonProps {
  className?: string;
  fill?: string;
  stroke?: string;
  waterLevel?: number;
  isRunning?: boolean;
}

export default function HumanSkeleton({
  className = "",
  fill = "currentColor",
  stroke = "none",
  waterLevel,
  isRunning = false,
}: HumanSkeletonProps) {
  return (
    <motion.svg
      viewBox="0 0 100 250"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <clipPath id="skeleton-clip">
          <circle cx="50" cy="20" r="15" />
          <path d="M 35 45 Q 50 40 65 45 L 60 110 L 40 110 Z" />
          <path d="M 30 50 Q 20 60 15 90 Q 15 95 20 95 Q 25 90 35 60 Z" />
          <path d="M 70 50 Q 80 60 85 90 Q 85 95 80 95 Q 75 90 65 60 Z" />
          <path d="M 40 110 L 35 180 Q 35 185 40 185 Q 45 185 48 180 L 50 110 Z" />
          <path d="M 60 110 L 65 180 Q 65 185 60 185 Q 55 185 52 180 L 50 110 Z" />
        </clipPath>
      </defs>

      {/* Head */}
      <circle cx="50" cy="20" r="15" fill={fill} stroke={stroke} />
      
      {/* Torso */}
      <path
        d="M 35 45 Q 50 40 65 45 L 60 110 L 40 110 Z"
        fill={fill}
        stroke={stroke}
      />
      
      {/* Left Arm */}
      <path
        d="M 30 50 Q 20 60 15 90 Q 15 95 20 95 Q 25 90 35 60 Z"
        fill={fill}
        stroke={stroke}
      />
      
      {/* Right Arm */}
      <path
        d="M 70 50 Q 80 60 85 90 Q 85 95 80 95 Q 75 90 65 60 Z"
        fill={fill}
        stroke={stroke}
      />
      
      {/* Left Leg */}
      <motion.g
        animate={isRunning ? { rotate: [-20, 20, -20] } : {}}
        transition={isRunning ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
        style={{ transformOrigin: "45px 110px" }}
      >
        <path
          d="M 40 110 L 35 180 Q 35 185 40 185 Q 45 185 48 180 L 50 110 Z"
          fill={fill}
          stroke={stroke}
        />
      </motion.g>
      
      {/* Right Leg */}
      <motion.g
        animate={isRunning ? { rotate: [20, -20, 20] } : {}}
        transition={isRunning ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
        style={{ transformOrigin: "55px 110px" }}
      >
        <path
          d="M 60 110 L 65 180 Q 65 185 60 185 Q 55 185 52 180 L 50 110 Z"
          fill={fill}
          stroke={stroke}
        />
      </motion.g>

      {/* Water Fill */}
      {waterLevel !== undefined && (
        <g clipPath="url(#skeleton-clip)">
          <motion.rect
            x="0"
            width="100"
            fill="#3b82f6"
            opacity={0.6}
            initial={{ y: 250, height: 0 }}
            animate={{ 
              y: 250 - (250 * (waterLevel / 100)),
              height: 250 * (waterLevel / 100)
            }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </g>
      )}
      
      {/* C7 Marker (approx base of neck) */}
      <circle cx="50" cy="38" r="1.5" fill="red" opacity="0.7" />
      {/* Xiphoid Marker (approx bottom of sternum) */}
      <circle cx="50" cy="70" r="1.5" fill="red" opacity="0.7" />
      {/* ASIS Marker (approx hip bone) */}
      <circle cx="40" cy="105" r="1.5" fill="red" opacity="0.7" />
      <circle cx="60" cy="105" r="1.5" fill="red" opacity="0.7" />
    </motion.svg>
  );
}
