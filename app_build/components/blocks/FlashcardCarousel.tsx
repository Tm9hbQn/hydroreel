"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimationFactory from '../AnimationFactory';

export interface FlashcardCarouselBite {
  bite_id: string;
  type: string;
  visual_trigger?: string;
  title: string;
  items: Array<{ title: string; content: string; icon?: string }>;
}

interface Props {
  bite: FlashcardCarouselBite;
}

export default function FlashcardCarousel({ bite }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback gradients for the cards
  const fallbackColors = [
    "from-purple-500 to-indigo-600",
    "from-blue-400 to-cyan-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-red-500",
    "from-amber-400 to-orange-500"
  ];

  return (
    <section className="snap-start h-[100dvh] w-full flex flex-col relative overflow-hidden bg-[#fafcff] pb-16">
      
      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-10 px-6 pt-24 pb-2 flex flex-col shrink-0"
      >
        <div className="relative inline-block mb-3 self-start">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans relative z-10" dir="rtl">
            {bite.title}
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
            className="absolute bottom-1 left-0 h-4 bg-purple-300/60 -z-0 rounded-full"
          />
        </div>
        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest" dir="rtl">החלק ימינה / שמאלה</p>
      </motion.div>

      {/* Carousel Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex-1 w-full flex items-center justify-center relative min-h-0 mt-4" dir="rtl"
      >
        <div 
          ref={containerRef}
          className="w-full h-full flex-1 overflow-x-auto flex snap-x snap-mandatory hide-scrollbar pt-2 pb-4 px-6 gap-6 items-stretch"
        >
          {bite.items?.map((item, i) => (
            <div 
              key={i} 
              className="shrink-0 w-[92%] max-w-[400px] h-full max-h-[600px] snap-center rounded-[2.5rem] relative overflow-hidden transition-transform duration-300 shadow-xl"
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[i % fallbackColors.length]} z-0`} />
              
              {/* Content */}
              <div className="relative z-10 w-full h-full px-6 pt-10 pb-2 flex flex-col text-white overflow-y-auto custom-scrollbar">
                {item.icon && <div className="text-5xl mb-4 drop-shadow-md shrink-0">{item.icon}</div>}
                <h3 className="text-2xl font-black mb-3 shrink-0 drop-shadow-md">{item.title}</h3>
                <p className="text-white/95 leading-relaxed font-medium text-[1.05rem] pb-4 shrink-0 drop-shadow-sm">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-4 h-full" />
        </div>
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

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.4); border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.4) transparent; }
      `}} />
    </section>
  );
}
