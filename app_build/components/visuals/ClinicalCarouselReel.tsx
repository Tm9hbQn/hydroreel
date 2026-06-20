"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cases = [
  {
    id: 1,
    title: "תסמונת POTS",
    subtitle: "חליפת G-Suit טבעית",
    description: "תסמונת POTS (Postural Orthostatic Tachycardia Syndrome) מתאפיינת בעלייה חריגה בדופק בעת מעבר לעמידה, בגלל הצטברות דם ברגליים. המים משמשים כחליפת לחץ טבעית: הלחץ ההידרוסטטי סוחט את הדם חזרה ללב, מונע את הצטברותו (Venous Pooling) ומאפשר אימון בעמידה ללא טכיקרדיה קיצונית.",
    color: "from-purple-500 to-indigo-600",
    icon: "🫀"
  },
  {
    id: 2,
    title: "הפחתת בצקות",
    subtitle: "חוק סטארלינג",
    description: "בצקת נוצרת מהצטברות נוזלים בחלל הבין-תאי. הלחץ ההידרוסטטי של המים פועל מבחוץ פנימה, מנגד את יציאת הנוזלים מהנימים, ודוחק את הנוזל העודף חזרה לדרכי הלימפה והוורידים (על פי חוק סטארלינג).",
    color: "from-blue-400 to-cyan-500",
    icon: "💧"
  },
  {
    id: 3,
    title: "החזר ורידי משופר",
    subtitle: "אי-ספיקה ורידית",
    description: "באי-ספיקה ורידית, מסתמי הוורידים מתקשים למנוע דליפת דם אחורה (Reflux). הלחץ בסביבת המים מקטין פיזית את קוטר הוורידים. הקטנת הקוטר מגבירה את מהירות הזרימה ומסייעת למסתמים להיסגר ולמנוע דליפה.",
    color: "from-emerald-400 to-teal-500",
    icon: "🩸"
  }
];

export default function ClinicalCarouselReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full flex items-center justify-center relative" dir="rtl">
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full flex-1 overflow-x-auto flex snap-x snap-mandatory hide-scrollbar pt-6 pb-6 px-6 gap-6 items-stretch"
      >
        {cases.map((c, i) => (
          <motion.div 
            key={c.id} 
            animate={{ 
              boxShadow: ["0px 0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 0px 6px rgba(16, 185, 129, 0.4)", "0px 0px 0px 0px rgba(16, 185, 129, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="shrink-0 w-[88%] max-w-[340px] snap-center rounded-[2.5rem] relative overflow-hidden transition-transform duration-300 border-[3px] border-emerald-400/50"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-90`} />
            
            {/* Clinical Badge */}
            <div className="absolute top-5 left-5 z-20 bg-emerald-500 text-white text-[0.75rem] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              דוגמה קלינית
            </div>

            {/* Glass Content */}
            <div className="absolute inset-2 mt-14 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-6 flex flex-col text-white">
              <div className="text-5xl mb-4 drop-shadow-md">{c.icon}</div>
              <h3 className="text-2xl font-black mb-1">{c.title}</h3>
              <div className="text-white/80 font-medium text-sm mb-4 inline-block bg-black/20 px-3 py-1 rounded-full self-start">
                {c.subtitle}
              </div>
              <p className="text-white/95 leading-relaxed font-medium text-[1.05rem] mt-auto">
                {c.description}
              </p>
            </div>
          </motion.div>
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
