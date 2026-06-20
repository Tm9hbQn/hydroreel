"use client";
import React from 'react';
import AnimationFactory from '../AnimationFactory';

export interface ClinicalCaseBite {
  bite_id: string;
  type: string;
  visual_trigger?: string;
  title: string;
  content: string;
  clinical_highlight?: string;
}

interface Props {
  bite: ClinicalCaseBite;
}

export default function ClinicalCaseCard({ bite }: Props) {
  return (
    <div className="snap-start h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 to-slate-900 text-white p-6 font-sans">
      <div className="w-full max-w-sm rounded-3xl bg-blue-900/30 backdrop-blur-xl border border-blue-400/20 shadow-[0_0_40px_rgba(30,58,138,0.3)] overflow-hidden flex flex-col h-[85vh]">
        
        {/* Hero Image/Animation Area */}
        <div className="h-48 bg-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden">
          <AnimationFactory triggerId={bite.visual_trigger} />
          <div className="absolute top-4 right-4 bg-red-500/20 text-red-200 text-xs px-3 py-1 rounded-full border border-red-500/30 backdrop-blur-md z-10 shadow-lg">
            Clinical Case
          </div>
        </div>
        
        {/* Content Body */}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-3xl font-semibold text-white mb-6 leading-tight">{bite.title}</h2>
          <div className="bg-white/5 rounded-2xl p-5 mb-4 border border-white/10 flex-1">
            <p className="text-lg text-blue-50 leading-relaxed font-light">{bite.content}</p>
          </div>
          
          {bite.clinical_highlight && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-teal-500/20 border border-blue-400/30 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span className="text-xs uppercase tracking-wider text-teal-200 font-semibold">Treatment Note</span>
              </div>
              <p className="text-sm text-teal-50 leading-normal">{bite.clinical_highlight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
