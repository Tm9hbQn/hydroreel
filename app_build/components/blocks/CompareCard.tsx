"use client";
import React from 'react';
import { motion } from 'framer-motion';

export interface CompareBite {
  bite_id: string;
  type: string;
  title: string;
  compare_a: { label: string; text: string };
  compare_b: { label: string; text: string };
}

interface Props {
  bite: CompareBite;
}

export default function CompareCard({ bite }: Props) {
  return (
    <section className="snap-start h-[100dvh] w-full flex flex-col relative overflow-hidden bg-[#fafcff] pb-16">
      
      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-10 px-6 pt-24 pb-2 flex flex-col shrink-0"
      >
        <div className="relative inline-block mb-6 self-start">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {bite.title}
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-4 bg-orange-300/60 -z-0 rounded-full"
          />
        </div>
      </motion.div>

      {/* Comparison Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex-1 w-full flex flex-col items-center justify-center relative min-h-0 px-6 mt-2" dir="rtl"
      >
        <div className="w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col h-full max-h-[60vh] shadow-xl border-2 border-slate-200">
          
          {/* Top Half / Section A */}
          <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex flex-col justify-center relative border-b-2 border-slate-200">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2 block">
              {bite.compare_a?.label || "אפשרות א'"}
            </span>
            <p className="text-[1.1rem] text-slate-800 font-medium leading-relaxed">
              {bite.compare_a?.text}
            </p>
          </div>
          
          {/* Bottom Half / Section B */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 flex flex-col justify-center relative">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-2 block">
              {bite.compare_b?.label || "אפשרות ב'"}
            </span>
            <p className="text-[1.1rem] text-slate-800 font-medium leading-relaxed">
              {bite.compare_b?.text}
            </p>
          </div>

        </div>
      </motion.div>

      {/* Dead space at the bottom */}
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
