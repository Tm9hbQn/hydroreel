"use client";
import React from 'react';
import { motion } from 'framer-motion';
import AnimationFactory from '../AnimationFactory';

export interface PrincipleBite {
  bite_id: string;
  type: string;
  visual_trigger?: string;
  title: string;
  content: string;
  clinical_highlight?: string;
}

interface Props {
  bite: PrincipleBite;
}

export default function PrincipleCard({ bite }: Props) {
  return (
    <section className="snap-start h-[100dvh] w-full flex flex-col relative overflow-hidden bg-[#fafcff] pb-16">
      
      {/* Content Area - Designed to flow at the top naturally */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-10 px-6 pt-10 pb-2 flex flex-col shrink-0"
      >
        <div className="relative inline-block mb-3 self-start">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {bite.title}
          </h2>
          {/* Animated Highlight Underline */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-4 bg-blue-300/60 -z-0 rounded-full"
          />
        </div>
        
        <p className="text-slate-700 text-[1.15rem] leading-relaxed font-medium" dir="rtl">
          {bite.content}
        </p>

        {bite.clinical_highlight && (
          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-slate-800 font-medium shadow-sm" dir="rtl">
            <span className="block text-xs uppercase tracking-wider text-blue-600 mb-1">דגש קליני</span>
            {bite.clinical_highlight}
          </div>
        )}
      </motion.div>

      {/* Visual / Simulation Area - Takes the remaining space */}
      <div className="flex-1 w-full flex justify-center items-stretch pt-2 relative z-0 overflow-visible min-h-0">
        <AnimationFactory triggerId={bite.visual_trigger} />
      </div>

      {/* Dead space at the bottom & Swipe Up Indicator */}
      <div className="absolute bottom-0 w-full h-16 flex flex-col justify-end items-center pb-4 z-20 pointer-events-none">
        <div className="animate-bounce flex flex-col items-center opacity-50">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">החלק למעלה ללמידה</span>
          <div className="mt-1 w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-slate-300 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
