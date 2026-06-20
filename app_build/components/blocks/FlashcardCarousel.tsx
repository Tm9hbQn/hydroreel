"use client";
import React from 'react';

export interface FlashcardCarouselBite {
  bite_id: string;
  type: string;
  title: string;
  items: Array<{ title: string; text: string; icon?: string }>;
}

interface Props {
  bite: FlashcardCarouselBite;
}

export default function FlashcardCarousel({ bite }: Props) {
  return (
    <div className="snap-start h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-cyan-950 via-slate-900 to-blue-950 text-white font-sans p-4 overflow-hidden">
      <div className="w-full max-w-sm mb-6 text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-sm">
          {bite.title}
        </h2>
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">Swipe left / right</p>
      </div>
      
      {/* Horizontal Carousel */}
      <div className="w-full max-w-md flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 px-4 hide-scrollbar">
        {bite.items?.map((item, index) => (
          <div 
            key={index} 
            className="snap-center shrink-0 w-64 h-96 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col justify-center p-6 relative"
          >
            <div className="absolute top-4 left-4 text-4xl opacity-20 font-black italic">{index + 1}</div>
            <h3 className="text-xl font-semibold text-cyan-100 mb-4 z-10">{item.title}</h3>
            <p className="text-sm text-slate-200 leading-relaxed z-10 font-light">{item.text}</p>
            {item.icon && <span className="absolute bottom-6 right-6 text-4xl opacity-50">{item.icon}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
