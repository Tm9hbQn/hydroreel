"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GenericGaugeProps {
  value: number; // 0 to 100
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export default function GenericGauge({
  value,
  label,
  size = 120,
  strokeWidth = 10,
  color = "#3b82f6", // blue-500
  className = "",
}: GenericGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90 drop-shadow-md">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200/50 dark:text-gray-700/50"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          className="text-2xl font-bold tabular-nums text-slate-800 dark:text-slate-100"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {value}%
        </motion.span>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center px-2">
          {label}
        </span>
      </div>
    </div>
  );
}
