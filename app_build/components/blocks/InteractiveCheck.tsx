"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface InteractiveCheckBite {
  bite_id: string;
  type: string;
  title: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

interface Props {
  bite: InteractiveCheckBite;
}

export default function InteractiveCheck({ bite }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === bite.correct_index;

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
        <div className="relative inline-block mb-3 self-start">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {bite.title || "שאלת הבנה"}
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-4 bg-indigo-300/60 -z-0 rounded-full"
          />
        </div>
      </motion.div>

      {/* Quiz Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex-1 w-full flex flex-col items-center justify-center relative min-h-0 px-6" dir="rtl"
      >
        <div className="w-full max-w-sm rounded-[2.5rem] bg-white shadow-xl border border-slate-200 p-6 flex flex-col h-auto">
          
          <div className="mb-6">
            <h3 className="text-[1.15rem] font-bold text-slate-800 leading-snug">{bite.question}</h3>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {bite.options?.map((option, index) => {
              const isSelected = selectedIndex === index;
              const isThisCorrect = index === bite.correct_index;
              
              let btnClass = "text-right p-4 rounded-xl border-2 transition-all duration-300 font-medium ";
              
              if (!isAnswered) {
                btnClass += "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300";
              } else {
                if (isThisCorrect) {
                  btnClass += "border-green-400 bg-green-50 text-green-800";
                } else if (isSelected && !isThisCorrect) {
                  btnClass += "border-red-400 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-slate-100 bg-transparent text-slate-400 opacity-50";
                }
              }

              return (
                <button 
                  key={index}
                  onClick={() => !isAnswered && setSelectedIndex(index)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-blue-50 border-blue-200 text-blue-900'}`}
            >
              <p className="text-[0.95rem] font-medium leading-relaxed">{bite.explanation}</p>
            </motion.div>
          )}

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
