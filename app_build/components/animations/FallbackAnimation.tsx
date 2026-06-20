"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function FallbackAnimation({ triggerId }: { triggerId: string }) {
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-indigo-400',
    'from-teal-500 to-emerald-400',
    'from-orange-500 to-rose-400',
    'from-pink-500 to-purple-400',
  ];
  const colorClass = colors[triggerId.length % colors.length];

  return (
    <motion.div 
      className={`w-full h-full absolute inset-0 flex items-center justify-center bg-gradient-to-br ${colorClass} opacity-90`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-white/90 font-mono text-sm px-4 py-3 bg-black/40 rounded-xl backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center gap-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <span className="text-2xl drop-shadow-md">✨</span>
        <span className="font-bold">Animation Pending</span>
        <span className="text-xs opacity-70">{triggerId}</span>
      </motion.div>
    </motion.div>
  );
}
