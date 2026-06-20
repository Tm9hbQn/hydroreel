"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cases = [
  {
    id: 1,
    title: "תסמונת POTS",
    subtitle: "חליפת G-Suit טבעית",
    description: "תרפיה אקוואטית משמשת כלי שיקומי מוביל ל-POTS. הלחץ ההידרוסטטי לוחץ על הגפיים ומונע הצטברות דם ורידי (Venous Pooling), ומאפשר אימון בעמידה ללא טכיקרדיה קיצונית.",
    color: "from-purple-500 to-indigo-600",
    icon: "🫀"
  },
  {
    id: 2,
    title: "הפחתת בצקות",
    subtitle: "משוואת סטארלינג",
    description: "הלחץ דוחק את הנוזל האינטרסטיציאלי חזרה לנימי הלימפה והוורידים. העלייה בלחץ ההידרוסטטי החיצוני מנגדת יציאת נוזלים מהנימים ומעודדת ספיגה מחדש לפי חוק סטארלינג.",
    color: "from-blue-400 to-cyan-500",
    icon: "💧"
  },
  {
    id: 3,
    title: "החזר ורידי משופר",
    subtitle: "עקרון הרציפות",
    description: "מפל הלחצים מקטין את קוטר הוורידים. הקטנת הקוטר מגבירה את מהירות הזרימה ומסייעת למסתמים במניעת דליפה אחורה (Reflux) בסובלים מאי-ספיקה ורידית.",
    color: "from-emerald-400 to-teal-500",
    icon: "🩸"
  }
];

export default function ClinicalCarouselReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-[500px] flex items-center relative" dir="rtl">
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-x-auto flex snap-x snap-mandatory hide-scrollbar pt-10 pb-10 px-6 gap-6 items-center"
      >
        {cases.map((c, i) => (
          <div 
            key={c.id} 
            className="shrink-0 w-[85%] max-w-[320px] h-[380px] snap-center rounded-[2rem] relative overflow-hidden shadow-2xl transition-transform duration-300"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-90`} />
            
            {/* Glass Content */}
            <div className="absolute inset-1 bg-white/10 backdrop-blur-xl rounded-[1.8rem] border border-white/20 p-6 flex flex-col text-white">
              <div className="text-5xl mb-4 drop-shadow-md">{c.icon}</div>
              <h3 className="text-2xl font-black mb-1">{c.title}</h3>
              <div className="text-white/80 font-medium text-sm mb-4 inline-block bg-black/20 px-3 py-1 rounded-full self-start">
                {c.subtitle}
              </div>
              <p className="text-white/95 leading-relaxed font-medium text-[0.95rem] mt-auto">
                {c.description}
              </p>
            </div>
          </div>
        ))}
        
        {/* Padding end */}
        <div className="shrink-0 w-4 h-full" />
      </div>

      {/* Helper text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
        <span>החלק ימינה</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
