"use client";
import React from 'react';

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
    <div className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#0B1120] text-white p-6 font-sans">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-200 tracking-tight">{bite.title}</h2>
      
      <div className="w-full max-w-sm rounded-3xl overflow-hidden flex flex-col h-[70vh] shadow-2xl">
        {/* Top Half / Section A (Usually Land/Dry) */}
        <div className="flex-1 bg-slate-800/80 p-6 flex flex-col justify-center relative border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-transparent pointer-events-none"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">
            {bite.compare_a?.label || "Option A"}
          </span>
          <p className="text-lg text-slate-100 font-light leading-relaxed">
            {bite.compare_a?.text}
          </p>
        </div>
        
        {/* Bottom Half / Section B (Usually Water) */}
        <div className="flex-1 bg-teal-900/80 p-6 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/20 to-transparent pointer-events-none"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-3 block">
            {bite.compare_b?.label || "Option B"}
          </span>
          <p className="text-lg text-teal-50 font-light leading-relaxed">
            {bite.compare_b?.text}
          </p>
        </div>
      </div>
    </div>
  );
}
