"use client";
import React from 'react';
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
    <div className="snap-start h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-blue-900 text-white p-6 font-sans">
      <div className="w-full max-w-sm rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Visual Animation Area (Placeholder for Framer Motion / AnimationFactory) */}
        <div className="flex-1 bg-black/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 animate-pulse rounded-full blur-3xl" />
          <AnimationFactory triggerId={bite.visual_trigger} />
        </div>
        
        {/* Content Area */}
        <div className="p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-teal-100">{bite.title}</h2>
          <p className="text-base text-slate-200 leading-relaxed font-light">{bite.content}</p>
          
          {bite.clinical_highlight && (
            <div className="mt-4 p-4 rounded-xl bg-teal-500/20 border border-teal-500/30 text-sm text-teal-50 font-medium">
              <span className="block text-xs uppercase tracking-wider text-teal-300 mb-1">Clinical Highlight</span>
              {bite.clinical_highlight}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
