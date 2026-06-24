"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function FallbackAnimation({ triggerId }: { triggerId: string }) {
  const colors = [
    'from-blue-500 via-cyan-500 to-blue-400',
    'from-purple-500 via-fuchsia-500 to-indigo-400',
    'from-teal-500 via-emerald-500 to-teal-400',
    'from-orange-500 via-amber-500 to-rose-400',
    'from-pink-500 via-rose-500 to-purple-400',
  ];
  const colorClass = colors[triggerId.length % colors.length];

  return (
    <motion.div 
      className={`w-full h-full absolute inset-0 bg-gradient-to-br ${colorClass} opacity-90`}
      style={{ backgroundSize: '400% 400%' }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        backgroundPosition: { duration: 15, ease: "linear", repeat: Infinity }
      }}
    />
  );
}
