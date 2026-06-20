"use client";
import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const AnimationRenderer = dynamic(() => import('./AnimationRenderer'), { ssr: false });

interface BiteProps {
  title: string;
  text: string;
  visual_trigger_id: string;
  layout?: string;
}

export default function ReelCard({ title, text, visual_trigger_id, layout = 'top_text' }: BiteProps) {
  
  return (
    <section className="snap-start h-[100dvh] w-full flex flex-col relative overflow-hidden bg-[#fafcff]">
      
      {/* Content Area - Designed to flow at the top naturally */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-10 px-6 pt-16 pb-4 flex flex-col"
      >
        <div className="relative inline-block mb-4 self-start">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {title}
          </h2>
          {/* Animated Highlight Underline */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-3 bg-blue-300/60 -z-0 rounded-full"
          />
        </div>
        
        <p className="text-slate-700 text-[1.15rem] leading-relaxed font-medium" dir="rtl">
          {text}
        </p>
      </motion.div>

      {/* Visual / Simulation Area - Takes the remaining space */}
      <div className="flex-1 w-full flex justify-center items-center relative z-0">
        <AnimationRenderer triggerId={visual_trigger_id} />
      </div>
      
    </section>
  );
}
