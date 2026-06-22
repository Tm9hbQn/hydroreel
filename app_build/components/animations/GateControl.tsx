"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GateControl() {
  const [inWater, setInWater] = useState(false);
  const [painSignals, setPainSignals] = useState<number[]>([]);
  const [reliefSignals, setReliefSignals] = useState<number[]>([]);

  // Generate signals
  useEffect(() => {
    const painInterval = setInterval(() => {
      setPainSignals(prev => [...prev.slice(-10), Date.now()]);
    }, 800);

    const reliefInterval = setInterval(() => {
      if (inWater) {
        setReliefSignals(prev => [...prev.slice(-20), Date.now()]);
      }
    }, 200);

    return () => {
      clearInterval(painInterval);
      clearInterval(reliefInterval);
    };
  }, [inWater]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center font-sans"
    >
      
      {/* ===== Controls Zone (shrink-0, max ~30% height) ===== */}
      <div className="w-full shrink-0 px-4 pt-5 pb-3 z-10" dir="rtl">
        <h3 className="font-bold text-slate-100 text-sm mb-1.5 text-center">תיאוריית שער הכאב (Gate Control)</h3>
        <p className="text-[10px] text-slate-300 text-center mb-3 leading-relaxed max-w-[90%] mx-auto">
          גירויים סנסוריים מהמים (טמפרטורה ולחץ הידרוסטטי) מועברים דרך סיבי A-beta מהירים, &quot;סוגרים את השער&quot; בחוט השדרה, וחוסמים את אותות הכאב האיטיים (סיבי C).
        </p>

        <div className="flex justify-center gap-3">
          <button 
            onClick={() => setInWater(false)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${!inWater ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-slate-700 text-slate-400'}`}
          >
            יבשה (כאב פעיל)
          </button>
          <button 
            onClick={() => setInWater(true)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${inWater ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30' : 'bg-slate-700 text-slate-400'}`}
          >
            מים חמימים
          </button>
        </div>
      </div>

      {/* ===== Visualization Zone (flex-1, takes remaining space) ===== */}
      <div className="flex-1 w-full relative overflow-hidden flex justify-center items-center min-h-0">
        
        {/* Spinal Cord / Gate representation */}
        <div className="absolute w-28 h-56 border-x-4 border-slate-700 bg-slate-800 flex flex-col items-center justify-center z-20 overflow-hidden">
          <div className="text-slate-400 text-[10px] font-bold mb-4">חוט השדרה</div>
          
          {/* The Gate */}
          <div className="relative w-full h-10 flex items-center justify-center border-y-2 border-slate-700 bg-slate-800/50">
             <motion.div 
               className="absolute w-full h-full bg-slate-600 origin-left"
               animate={{ scaleX: inWater ? 1 : 0.1 }}
               transition={{ type: "spring", stiffness: 50, damping: 15 }}
             >
                {inWater && <div className="w-full h-full flex items-center justify-center text-slate-200 text-xs font-bold bg-slate-600">שער סגור</div>}
                {!inWater && <div className="absolute inset-0 flex items-center justify-center text-rose-400 text-[10px] font-bold">פתוח</div>}
             </motion.div>
          </div>

          <div className="text-slate-400 text-[10px] font-bold mt-4">למוח</div>
        </div>

        {/* C-Fibers (Pain) */}
        <div className="absolute left-[-15%] w-[35%] h-28 top-1/2 -translate-y-1/2 flex items-center justify-end z-10">
          <div className="h-1 w-full bg-rose-900/50 relative overflow-hidden flex items-center">
             <div className="absolute left-0 -top-5 text-rose-500 text-[9px] font-bold">סיבי C (כאב)</div>
             <AnimatePresence>
               {painSignals.map(id => (
                 <motion.div 
                   key={`pain-${id}`}
                   className="absolute w-3.5 h-3.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                   initial={{ left: 0 }}
                   animate={{ left: inWater ? "60%" : "250%" }}
                   transition={{ duration: 2, ease: "linear" }}
                   exit={{ opacity: 0, scale: 0 }}
                 />
               ))}
             </AnimatePresence>
          </div>
        </div>

        {/* A-Beta Fibers (Water/Relief) */}
        <div className="absolute left-[-15%] w-[35%] h-28 top-1/2 translate-y-10 flex items-center justify-end z-10">
          <div className="h-1.5 w-full bg-cyan-900/50 relative overflow-hidden flex items-center">
             <div className="absolute left-0 top-4 text-cyan-400 text-[9px] font-bold">סיבי A-beta (מגע/מים)</div>
             <AnimatePresence>
               {reliefSignals.map(id => (
                 <motion.div 
                   key={`relief-${id}`}
                   className="absolute w-7 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                   initial={{ left: 0 }}
                   animate={{ left: "100%" }}
                   transition={{ duration: 0.8, ease: "linear" }}
                   exit={{ opacity: 0 }}
                 />
               ))}
             </AnimatePresence>
          </div>
        </div>

      </div>
      
    </motion.div>
  );
}
