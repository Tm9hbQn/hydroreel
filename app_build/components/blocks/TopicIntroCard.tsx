"use client";
import React from "react";
import { motion } from "framer-motion";

export interface TopicIntroCardProps {
  title: string;
}

export default function TopicIntroCard({ title }: TopicIntroCardProps) {
  return (
    <section
      dir="rtl"
      className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600"
    >
      {/* Decorative Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-20 -right-32 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-pink-800/20 rounded-full blur-3xl -bottom-20 -left-32 pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: 20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8 p-6 bg-white/20 backdrop-blur-md rounded-full shadow-2xl inline-block border border-white/20"
        >
          <span className="text-6xl drop-shadow-lg" role="img" aria-label="topic">
            📖
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-pink-100 text-lg font-medium mb-2 uppercase tracking-wider"
        >
          מתחילים נושא חדש
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-snug drop-shadow-md mb-12"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="animate-bounce flex flex-col items-center"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-white/90">
            החלק למעלה כדי להתחיל
          </span>
          <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-white rounded-full animate-ping" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
