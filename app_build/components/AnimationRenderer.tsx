"use client";
import InteractivePressureSimulator from './visuals/InteractivePressureSimulator';
import ClinicalCarouselReel from './visuals/ClinicalCarouselReel';

export default function AnimationRenderer({ triggerId }: { triggerId: string }) {
  switch (triggerId) {
    case 'InteractivePressureSimulator':
      return <InteractivePressureSimulator />;
    case 'ClinicalCarouselReel':
      return <ClinicalCarouselReel />;
    default:
      return <div className="text-slate-400">Animation mapping missing for: {triggerId}</div>;
  }
}
