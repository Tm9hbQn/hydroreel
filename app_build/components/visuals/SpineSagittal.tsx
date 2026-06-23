"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpineSagittalProps {
  mode: "normal" | "herniated" | "spondy" | "kyphosis" | "lordosis";
  className?: string;
}

export default function SpineSagittal({ mode, className = "" }: SpineSagittalProps) {
  // Base SVG viewBox
  // We will draw L3, L4, L5 blocks.
  
  // Vertebrae path (simplified lateral view)
  const vertebraPath = "M 20 10 L 60 10 L 65 30 L 75 35 L 75 45 L 65 50 L 60 70 L 20 70 Z"; 
  // Wait, let's make it simpler. A block for the body, and a spike for the spinous process.
  // Body: M 10 10 h 40 v 30 h -40 z
  // Spinous process: M 50 20 h 20 v 10 h -20 z
  
  const drawVertebra = (yOffset: number, rotation: number, xOffset: number = 0) => (
    <motion.g 
      animate={{ y: yOffset, rotate: rotation, x: xOffset }} 
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      style={{ originX: "30px", originY: "25px" }}
    >
      {/* Vertebral Body */}
      <rect x="10" y="10" width="40" height="30" rx="4" fill="currentColor" opacity="0.8" />
      {/* Spinous Process */}
      <path d="M 50 20 L 75 25 L 75 35 L 50 30 Z" fill="currentColor" opacity="0.6" />
    </motion.g>
  );

  const drawDisc = (yOffset: number, scaleY: number, bulge: boolean = false, opacity: number = 0.5) => (
    <motion.g 
      animate={{ y: yOffset, scaleY: scaleY }} 
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      style={{ originY: "10px" }}
    >
      <rect x="12" y="0" width="36" height="10" rx="2" fill="#3b82f6" opacity={opacity} />
      {bulge && (
        <motion.ellipse 
          animate={{ rx: [0, 8, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          cx="10" cy="5" ry="5" fill="#ef4444" 
        />
      )}
    </motion.g>
  );

  // Define animations based on mode
  let l3_y = 0, l3_r = 0, l3_x = 0;
  let l4_y = 50, l4_r = 0, l4_x = 0;
  let l5_y = 100, l5_r = 0, l5_x = 0;
  
  let disc1_scale = 1;
  let disc2_scale = 1;

  if (mode === "herniated") {
    // Decompression: vertebrae move apart, red bulge shrinks
    l3_y = -5; // Moves up
    l4_y = 50; 
    l5_y = 105; // Moves down
    disc1_scale = 1.5;
    disc2_scale = 1.5;
  } else if (mode === "spondy") {
    // L4 slipped forward (left in our drawing)
    l4_x = -15; 
    // Water core stability pushes it back slightly
  } else if (mode === "lordosis") {
    // Exaggerated curve
    l3_r = 15; l3_x = 10;
    l4_r = 25; l4_x = 15;
    l5_r = 10; l5_y = 110;
  } else if (mode === "kyphosis") {
    l3_r = -15; l3_x = -10;
    l4_r = -25; l4_x = -15;
    l5_r = -10; l5_y = 110;
  }

  return (
    <svg viewBox="0 -20 100 180" className={className} preserveAspectRatio="xMidYMid meet">
      {/* L3 */}
      <motion.g
        animate={mode === "herniated" ? { y: [0, -10] } : mode === "lordosis" ? { rotate: [20, 5], x: [10, 0] } : mode === "kyphosis" ? { rotate: [-20, -5], x: [-10, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <rect x="10" y="10" width="40" height="30" rx="4" fill="currentColor" opacity="0.8" />
        <path d="M 50 20 L 75 25 L 75 35 L 50 30 Z" fill="currentColor" opacity="0.6" />
      </motion.g>

      {/* Disc L3-L4 */}
      <motion.g
        animate={
          mode === "herniated" ? { y: [40, 35], scaleY: [1, 2] } : 
          mode === "lordosis" ? { rotate: [22.5, 7.5], x: [12.5, 2.5], y: 40 } : 
          mode === "kyphosis" ? { rotate: [-22.5, -7.5], x: [-12.5, -2.5], y: 40 } : 
          mode === "spondy" ? { x: [-7.5, -2.5], y: 40 } :
          { y: 40 }
        }
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ originX: "30px", originY: "45px" }}
      >
        <rect x="12" y="0" width="36" height="10" rx="2" fill="#3b82f6" opacity="0.5" />
      </motion.g>

      {/* L4 */}
      <motion.g
        animate={mode === "spondy" ? { x: [-15, -5] } : mode === "lordosis" ? { rotate: [25, 10], x: [15, 5] } : mode === "kyphosis" ? { rotate: [-25, -10], x: [-15, -5] } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ originX: "30px", originY: "75px" }}
      >
        <rect x="10" y="50" width="40" height="30" rx="4" fill="currentColor" opacity="0.8" />
        <path d="M 50 60 L 75 65 L 75 75 L 50 70 Z" fill="currentColor" opacity="0.6" />
      </motion.g>

      {/* Disc L4-L5 */}
      <motion.g
        animate={
          mode === "herniated" ? { y: [80, 85], scaleY: [1, 2] } : 
          mode === "lordosis" ? { rotate: [17.5, 5], x: [7.5, 2.5], y: 80 } : 
          mode === "kyphosis" ? { rotate: [-17.5, -5], x: [-7.5, -2.5], y: 80 } : 
          mode === "spondy" ? { x: [-7.5, -2.5], y: 80 } : 
          { y: 80 }
        }
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ originX: "30px", originY: "85px" }}
      >
        <rect x="12" y="0" width="36" height="10" rx="2" fill="#3b82f6" opacity="0.5" />
        {/* Red Bulge for herniated */}
        {mode === "herniated" && (
          <motion.ellipse 
            animate={{ rx: [8, 0], opacity: [0.9, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            cx="10" cy="5" ry="5" fill="#ef4444" 
          />
        )}
      </motion.g>

      {/* L5 */}
      <motion.g
        animate={mode === "herniated" ? { y: [0, 10] } : mode === "lordosis" ? { rotate: [10, 0] } : mode === "kyphosis" ? { rotate: [-10, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ originX: "30px", originY: "115px" }}
      >
        <rect x="10" y="90" width="40" height="30" rx="4" fill="currentColor" opacity="0.8" />
        <path d="M 50 100 L 75 105 L 75 115 L 50 110 Z" fill="currentColor" opacity="0.6" />
      </motion.g>

      {/* Force Vectors / Arrows based on pathology */}
      {mode === "herniated" && (
        <motion.g animate={{ opacity: [1, 0.2] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          {/* Gravity arrows decreasing */}
          <path d="M 30 -15 L 30 5 M 25 0 L 30 5 L 35 0" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <path d="M 30 145 L 30 125 M 25 130 L 30 125 L 35 130" stroke="#f59e0b" strokeWidth="2" fill="none" />
        </motion.g>
      )}

      {mode === "spondy" && (
        <motion.g animate={{ opacity: [0, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          {/* Core stabilization arrow pushing L4 back */}
          <path d="M -10 65 L 5 65 M 0 60 L 5 65 L 0 70" stroke="#10b981" strokeWidth="2" fill="none" />
        </motion.g>
      )}

      {mode === "lordosis" && (
        <motion.g animate={{ opacity: [0, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          {/* Pelvic tilt correction arrows */}
          <path d="M -5 100 Q 15 120 35 130" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 2" />
          <path d="M 30 125 L 35 130 L 30 135" stroke="#10b981" strokeWidth="2" fill="none" />
        </motion.g>
      )}

      {mode === "kyphosis" && (
        <motion.g animate={{ opacity: [0, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
          {/* Extension correction arrows */}
          <path d="M 70 20 Q 50 0 30 -10" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 2" />
          <path d="M 35 -15 L 30 -10 L 30 -5" stroke="#10b981" strokeWidth="2" fill="none" />
        </motion.g>
      )}

    </svg>
  );
}
