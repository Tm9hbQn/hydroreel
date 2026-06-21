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
    <section className="snap-start h-[100dvh] w-full flex flex-col relative overflow-hidden bg-[#fafcff] pb-16">
      
      {/* Content Area - Designed to flow at the top naturally */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-10 px-6 pt-8 pb-2 flex flex-col shrink-0"
      >
        <div className="relative inline-block mb-3 self-start">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {title}
          </h2>
          {/* Animated Highlight Underline */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-4 bg-blue-300/60 -z-0 rounded-full"
          />
        </div>
        
        <p className="text-slate-700 text-[1.15rem] leading-relaxed font-medium" dir="rtl">
          {text}
        </p>
      </motion.div>

      {/* Visual / Simulation Area - Takes the remaining space */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex-1 w-full flex justify-center items-stretch pt-2 relative z-0 overflow-visible min-h-0"
      >
        <AnimationRenderer triggerId={visual_trigger_id} />
      </motion.div>

      {/* Dead space at the bottom & Swipe Up Indicator */}
      <div className="absolute bottom-0 w-full h-16 flex flex-col justify-end items-center pb-4 z-20 pointer-events-none">
        <div className="animate-bounce flex flex-col items-center opacity-50">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">החלק למעלה</span>
          <div className="mt-1 w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-slate-300 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
