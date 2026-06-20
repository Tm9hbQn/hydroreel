"use client";
import React, { useState } from 'react';

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
    <div className="snap-start h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white p-6 font-sans">
      <div className="w-full max-w-sm rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 flex flex-col min-h-[60vh]">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-2 block">{bite.title || "Quick Check"}</span>
          <h2 className="text-2xl font-semibold text-slate-100 leading-snug">{bite.question}</h2>
        </div>
        
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {bite.options?.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isThisCorrect = index === bite.correct_index;
            
            let btnClass = "text-left p-4 rounded-xl border transition-all duration-300 ";
            
            if (!isAnswered) {
              btnClass += "border-white/20 bg-white/5 hover:bg-white/10 text-slate-200";
            } else {
              if (isThisCorrect) {
                btnClass += "border-green-500 bg-green-500/20 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
              } else if (isSelected && !isThisCorrect) {
                btnClass += "border-red-500/50 bg-red-500/10 text-red-200 opacity-70";
              } else {
                btnClass += "border-white/5 bg-transparent text-slate-500 opacity-50";
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
          <div className={`mt-6 p-4 rounded-xl border transition-opacity duration-500 ${isCorrect ? 'bg-green-900/30 border-green-500/30 text-green-50' : 'bg-red-900/30 border-red-500/30 text-red-50'}`}>
            <p className="text-sm font-medium leading-relaxed">{bite.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
