"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── colour helpers ───────────────────────────────────── */
function zoneColor(temp: number) {
  if (temp <= 30) return { bg: 'bg-emerald-500', text: 'text-emerald-400', glow: 'rgba(16,185,129,0.6)', hex: '#10b981' };
  if (temp <= 33) return { bg: 'bg-amber-500', text: 'text-amber-400', glow: 'rgba(245,158,11,0.6)', hex: '#f59e0b' };
  return { bg: 'bg-red-500', text: 'text-red-400', glow: 'rgba(239,68,68,0.7)', hex: '#ef4444' };
}
function zoneLabel(temp: number) {
  if (temp <= 30) return 'בטוח (28–30°C)';
  if (temp <= 33) return 'זהירות';
  return '!סכנה';
}

/* ── signal type ──────────────────────────────────────── */
interface Signal {
  id: number;
  startTime: number;
}

/* ── main component ───────────────────────────────────── */
export default function UhthoffMS() {
  const [temp, setTemp] = useState(29);
  const [signals, setSignals] = useState<Signal[]>([]);

  const zone = zoneColor(temp);

  /* Signal success probability based on temperature */
  const signalSuccessRate = useCallback(() => {
    if (temp <= 30) return 1;
    if (temp <= 33) return Math.max(0.3, 1 - (temp - 30) * 0.23);
    return Math.max(0.05, 1 - (temp - 30) * 0.25);
  }, [temp]);

  /* Generate signal pulses */
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => [...prev.slice(-8), { id: Date.now(), startTime: Date.now() }]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  /* ── derived visual values ──────────────────────────── */
  const signalSpeed = temp <= 30 ? 2.8 : temp <= 33 ? 4 : 5.5;
  const myelinDamageScale = temp <= 30 ? 1 : temp <= 33 ? 1.15 : 1.35;

  /* Myelin segments: positions along the nerve (0-100%) */
  const myelinSegments = [
    { x: 5, w: 12, damaged: false },
    { x: 20, w: 8, damaged: true },   // GAP 1
    { x: 32, w: 14, damaged: false },
    { x: 50, w: 6, damaged: true },   // GAP 2
    { x: 60, w: 14, damaged: false },
    { x: 78, w: 8, damaged: true },   // GAP 3
    { x: 89, w: 10, damaged: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center font-sans"
    >
      {/* ═══ CONTROLS ZONE ═══════════════════════════════ */}
      <div className="w-full shrink-0 px-4 pt-4 pb-2 z-20" dir="rtl">
        <div className="w-full max-w-md mx-auto bg-slate-800/90 rounded-xl p-3 border border-slate-700 shadow-lg">
          {/* Title */}
          <h3 className="text-sm font-bold text-slate-100 text-center mb-1">
            ⚠️ תופעת אוהטוף (Uhthoff&apos;s)
          </h3>
          <p className="text-[10px] text-slate-300 text-center leading-relaxed mb-3">
            ב-MS, עלייה קטנה בטמפרטורה מחמירה חסימת הולכה עצבית וגורמת להחמרה זמנית.
          </p>

          {/* Temperature slider */}
          <div className="flex flex-col items-center gap-1">
            <label className="text-[10px] text-slate-400 font-bold">טמפרטורת מים (°C)</label>
            <input
              type="range"
              min={28}
              max={36}
              step={0.5}
              value={temp}
              onChange={e => setTemp(parseFloat(e.target.value))}
              className="w-full max-w-xs h-2 rounded-lg appearance-none cursor-pointer accent-current"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 25%, #f59e0b 37.5%, #f59e0b 62.5%, #ef4444 75%, #ef4444 100%)`,
                accentColor: zone.hex,
              }}
            />
            {/* Temp readout + zone badge */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-lg font-bold text-slate-100">{temp.toFixed(1)}°C</span>
              <motion.span
                key={zoneLabel(temp)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-3 py-0.5 rounded-full text-[10px] font-bold text-white ${zone.bg} shadow-lg`}
                style={{ boxShadow: `0 0 12px ${zone.glow}` }}
              >
                {zoneLabel(temp)}
              </motion.span>
            </div>
          </div>

          {/* Symptom icons at danger */}
          <AnimatePresence>
            {temp > 33 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center items-center gap-4 mt-2 overflow-hidden"
              >
                <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold">
                  <span className="text-base">👁️‍🗨️</span> טשטוש ראייה
                </span>
                <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold">
                  <span className="text-base">💪</span>❌ חולשת שרירים
                </span>
                <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold">
                  <span className="text-base">🔋</span> עייפות
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ VISUALIZATION ZONE ══════════════════════════ */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col items-center justify-center min-h-0 px-4 pb-4">
        <svg
          viewBox="0 0 500 180"
          className="w-full max-w-2xl"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Background body-temp indicator bar ── */}
          <rect x="10" y="5" width="480" height="6" rx="3"
            fill={temp <= 30 ? '#064e3b' : temp <= 33 ? '#78350f' : '#7f1d1d'}
            opacity={0.3}
          />
          <motion.rect
            x="10" y="5" rx="3"
            height="6"
            animate={{ width: ((temp - 28) / 8) * 480 }}
            fill={zone.hex}
            opacity={0.7}
          />

          {/* ── Axon (nerve fiber) ── */}
          <line x1="20" y1="90" x2="480" y2="90" stroke="#334155" strokeWidth="6" />
          <line x1="20" y1="90" x2="480" y2="90" stroke="#475569" strokeWidth="3" />

          {/* Label: עצב */}
          <text x="490" y="94" fill="#94a3b8" fontSize="9" textAnchor="end" fontWeight="bold">עצב</text>

          {/* ── Myelin segments ── */}
          {myelinSegments.map((seg, i) => {
            const sx = 20 + seg.x * 4.6;
            const sw = seg.w * 4.6;
            if (seg.damaged) {
              /* Damaged gap */
              return (
                <g key={`dmg-${i}`}>
                  {/* Inflamed area */}
                  <motion.rect
                    x={sx - 2}
                    y={68}
                    width={sw + 4}
                    height={44}
                    rx="6"
                    fill="none"
                    stroke={zone.hex}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    animate={{
                      opacity: [0.4, 0.9, 0.4],
                      scale: myelinDamageScale,
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{ transformOrigin: `${sx + sw / 2}px 90px` }}
                  />
                  {/* bare axon highlight */}
                  <rect x={sx} y={86} width={sw} height={8} rx="2" fill="#991b1b" opacity={0.4} />
                  {/* label */}
                  <text x={sx + sw / 2} y={128} fill="#f87171" fontSize="7" textAnchor="middle" fontWeight="bold">אזור פגוע</text>
                </g>
              );
            }
            /* Healthy myelin sheath */
            return (
              <g key={`my-${i}`}>
                <rect x={sx} y={72} width={sw} height={36} rx="10"
                  fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1" opacity={0.7}
                />
                {/* Myelin label (only first healthy one) */}
                {i === 0 && (
                  <text x={sx + sw / 2} y={128} fill="#38bdf8" fontSize="7" textAnchor="middle" fontWeight="bold">מיאלין</text>
                )}
              </g>
            );
          })}

          {/* ── Nerve signal pulses ── */}
          <AnimatePresence>
            {signals.map((sig) => {
              const willSucceed = Math.random() < signalSuccessRate();
              /* Where the signal might die: at the first damaged zone it fails on */
              const damagedPositions = [20 + 20 * 4.6, 20 + 50 * 4.6, 20 + 78 * 4.6];
              const failPoint = damagedPositions[Math.floor(Math.random() * damagedPositions.length)];

              if (willSucceed) {
                return (
                  <motion.circle
                    key={`sig-${sig.id}`}
                    cx={20}
                    cy={90}
                    r={5}
                    fill={zone.hex}
                    initial={{ cx: 20, opacity: 1 }}
                    animate={{ cx: 490, opacity: [1, 1, 1, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: signalSpeed, ease: 'linear' }}
                  >
                    <animate
                      attributeName="r"
                      values="5;3;5;3;5"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </motion.circle>
                );
              } else {
                /* Signal that gets blocked at a damaged section */
                return (
                  <motion.circle
                    key={`sig-${sig.id}`}
                    cx={20}
                    cy={90}
                    r={5}
                    fill={zone.hex}
                    initial={{ cx: 20, opacity: 1 }}
                    animate={{
                      cx: [20, failPoint],
                      opacity: [1, 1, 0],
                      r: [5, 5, 12],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: signalSpeed * 0.5, ease: 'easeOut' }}
                  />
                );
              }
            })}
          </AnimatePresence>

          {/* ── Direction arrow ── */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
            </marker>
          </defs>
          <line x1="30" y1="155" x2="100" y2="155" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <text x="65" y="168" fill="#64748b" fontSize="8" textAnchor="middle">כיוון ההולכה</text>

          {/* ── Legend ── */}
          <rect x="320" y="142" width="10" height="10" rx="3" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="0.7" />
          <text x="335" y="151" fill="#38bdf8" fontSize="7">מיאלין תקין</text>
          <rect x="400" y="142" width="10" height="10" rx="3" fill="none" stroke="#f87171" strokeWidth="1" strokeDasharray="3 2" />
          <text x="415" y="151" fill="#f87171" fontSize="7">אזור דמיאלינציה</text>

          {/* ── Thermometer icon (left side) ── */}
          <g transform="translate(2, 30)">
            <rect x="0" y="0" width="8" height="50" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <motion.rect
              x="1"
              rx="3"
              width="6"
              animate={{
                y: 50 - ((temp - 28) / 8) * 48,
                height: ((temp - 28) / 8) * 48,
              }}
              fill={zone.hex}
              opacity={0.9}
            />
            <circle cx="4" cy="56" r="6" fill={zone.hex} opacity={0.9} />
          </g>
        </svg>

        {/* Conduction status text */}
        <motion.p
          key={temp <= 30 ? 'safe' : temp <= 33 ? 'caution' : 'danger'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[10px] font-bold mt-1 ${zone.text} text-center`}
          dir="rtl"
        >
          {temp <= 30
            ? 'אותות עוברים דרך האזורים הפגועים — הולכה שמורה ✓'
            : temp <= 33
            ? 'האטה משמעותית בהולכה — חלק מהאותות נחסמים ⚠'
            : 'רוב האותות נחסמים באזורי הדמיאלינציה — החמרת תסמינים ✗'}
        </motion.p>
      </div>
    </motion.div>
  );
}
