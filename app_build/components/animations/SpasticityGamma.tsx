"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpasticityGamma() {
  const [isDamaged, setIsDamaged] = useState(false);
  const [afferentPulses, setAfferentPulses] = useState<number[]>([]);
  const [efferentPulses, setEfferentPulses] = useState<number[]>([]);
  const [inhibitoryPulses, setInhibitoryPulses] = useState<number[]>([]);

  // Generate signal pulses based on state
  useEffect(() => {
    // Afferent signals: spindle → spinal cord (faster when damaged)
    const afferentInterval = setInterval(() => {
      setAfferentPulses(prev => [...prev.slice(-12), Date.now()]);
    }, isDamaged ? 300 : 900);

    // Efferent signals: spinal cord → muscle (faster when damaged)
    const efferentInterval = setInterval(() => {
      setEfferentPulses(prev => [...prev.slice(-12), Date.now()]);
    }, isDamaged ? 350 : 950);

    // Inhibitory signals: brain → spinal cord (only when NOT damaged)
    const inhibitoryInterval = setInterval(() => {
      if (!isDamaged) {
        setInhibitoryPulses(prev => [...prev.slice(-6), Date.now()]);
      }
    }, 700);

    return () => {
      clearInterval(afferentInterval);
      clearInterval(efferentInterval);
      clearInterval(inhibitoryInterval);
    };
  }, [isDamaged]);

  // Clear inhibitory pulses when switching to damaged
  useEffect(() => {
    if (isDamaged) {
      setInhibitoryPulses([]);
    }
  }, [isDamaged]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center font-sans"
    >
      {/* ═══════════ Controls Zone ═══════════ */}
      <div className="w-full shrink-0 px-4 pt-4 pb-2" dir="rtl">
        <div className="w-full max-w-md mx-auto bg-slate-800/90 p-3 rounded-xl shadow-lg border border-slate-700">
          <h3 className="font-bold text-slate-100 text-sm mb-1.5 text-center">
            מקור הספסטיות
          </h3>
          <p className="text-[10px] text-slate-300 text-center mb-3 leading-relaxed">
            פגיעה במסלול מוטורי עליון מבטלת את העיכוב ומובילה לפעילות יתר של רפלקס המתיחה, הגורמת לנוקשות שרירית.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsDamaged(false)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                !isDamaged
                  ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              מערכת עצבים תקינה
            </button>
            <button
              onClick={() => setIsDamaged(true)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                isDamaged
                  ? 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              לאחר פגיעת UMN
            </button>
          </div>

          {/* Status indicator */}
          <motion.div
            className="mt-2 text-center text-[9px] font-bold"
            animate={{ color: isDamaged ? '#f87171' : '#6ee7b7' }}
          >
            {isDamaged
              ? '⚠ רפלקס מתיחה היפראקטיבי — ספסטיות'
              : '✓ עיכוב תקין — טונוס שרירי מאוזן'}
          </motion.div>
        </div>
      </div>

      {/* ═══════════ Visualization Zone ═══════════ */}
      <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center min-h-0">
        <svg
          viewBox="0 0 400 520"
          className="w-full h-full max-w-[400px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filters */}
            <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowYellow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── BRAIN ── */}
          <motion.rect
            x="160" y="20" width="80" height="45" rx="12"
            fill="#334155"
            stroke={isDamaged ? '#475569' : '#10b981'}
            strokeWidth="2"
            animate={{
              stroke: isDamaged ? '#475569' : '#10b981',
              fill: isDamaged ? '#1e293b' : '#334155',
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Brain folds decoration */}
          <motion.path
            d="M175,35 Q190,30 200,38 Q210,30 225,35"
            fill="none"
            stroke={isDamaged ? '#475569' : '#6ee7b7'}
            strokeWidth="1.5"
            animate={{ stroke: isDamaged ? '#475569' : '#6ee7b7' }}
          />
          <motion.path
            d="M175,45 Q195,52 225,45"
            fill="none"
            stroke={isDamaged ? '#475569' : '#6ee7b7'}
            strokeWidth="1.5"
            animate={{ stroke: isDamaged ? '#475569' : '#6ee7b7' }}
          />
          <text x="200" y="57" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
            מוח
          </text>

          {/* ── DESCENDING PATHWAY (Brain → Spinal Cord) ── */}
          <motion.line
            x1="200" y1="65" x2="200" y2="170"
            stroke={isDamaged ? '#334155' : '#10b981'}
            strokeWidth={isDamaged ? 1 : 3}
            strokeDasharray={isDamaged ? '4 4' : '0'}
            animate={{
              stroke: isDamaged ? '#334155' : '#10b981',
              strokeWidth: isDamaged ? 1 : 3,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* ── DAMAGE MARKER (X) ── only when damaged */}
          <AnimatePresence>
            {isDamaged && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Red circle background */}
                <circle cx="200" cy="115" r="16" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                {/* X mark */}
                <line x1="191" y1="106" x2="209" y2="124" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <line x1="209" y1="106" x2="191" y2="124" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                {/* Label */}
                <text x="230" y="118" fill="#f87171" fontSize="8" fontWeight="bold">
                  פגיעת UMN
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── Inhibitory signal pulses (brain → cord) ── */}
          <AnimatePresence>
            {!isDamaged && inhibitoryPulses.map(id => (
              <motion.circle
                key={`inhib-${id}`}
                cx="200"
                r="4"
                fill="#10b981"
                filter="url(#glowGreen)"
                initial={{ cy: 70, opacity: 1 }}
                animate={{ cy: 170, opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'linear' }}
              />
            ))}
          </AnimatePresence>

          {/* Inhibition label (only normal) */}
          <AnimatePresence>
            {!isDamaged && (
              <motion.text
                x="220" y="95"
                fill="#6ee7b7"
                fontSize="8"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                עיכוב ↓
              </motion.text>
            )}
          </AnimatePresence>

          {/* ── SPINAL CORD SEGMENT ── */}
          <motion.rect
            x="165" y="170" width="70" height="55" rx="8"
            fill="#1e293b"
            stroke={isDamaged ? '#f87171' : '#64748b'}
            strokeWidth="2"
            animate={{
              stroke: isDamaged ? '#f87171' : '#64748b',
              fill: isDamaged ? '#1c1917' : '#1e293b',
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Spinal cord interior detail */}
          <motion.ellipse
            cx="200" cy="197" rx="18" ry="12"
            fill="none"
            stroke={isDamaged ? '#dc2626' : '#475569'}
            strokeWidth="1.5"
            animate={{ stroke: isDamaged ? '#dc2626' : '#475569' }}
          />
          <text x="200" y="218" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
            חוט שדרה
          </text>

          {/* ── Activity indicator on spinal cord ── */}
          <AnimatePresence>
            {isDamaged && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.ellipse
                  cx="200" cy="197" rx="22" ry="15"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1"
                  filter="url(#glowRed)"
                  animate={{ rx: [22, 28, 22], ry: [15, 20, 15], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── AFFERENT PATHWAY (Spindle → Cord) — LEFT SIDE ── */}
          <line
            x1="155" y1="380" x2="175" y2="225"
            stroke="#1e3a5f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Afferent label */}
          <text x="125" y="305" fill="#60a5fa" fontSize="7" fontWeight="bold" transform="rotate(-70,125,305)">
            Ia Afferent ↑
          </text>

          {/* Afferent signal pulses (spindle → cord) */}
          <AnimatePresence>
            {afferentPulses.map(id => (
              <motion.circle
                key={`aff-${id}`}
                r={isDamaged ? 5 : 3.5}
                fill="#3b82f6"
                filter="url(#glowBlue)"
                initial={{ cx: 155, cy: 380, opacity: 1 }}
                animate={{ cx: 175, cy: 225, opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isDamaged ? 0.5 : 1, ease: 'linear' }}
              />
            ))}
          </AnimatePresence>

          {/* ── EFFERENT PATHWAY (Cord → Muscle) — RIGHT SIDE ── */}
          <line
            x1="225" y1="225" x2="245" y2="380"
            stroke="#4a3520"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Efferent label */}
          <text x="265" y="305" fill="#f59e0b" fontSize="7" fontWeight="bold" transform="rotate(70,265,305)">
            α Motor ↓
          </text>

          {/* Efferent signal pulses (cord → muscle) */}
          <AnimatePresence>
            {efferentPulses.map(id => (
              <motion.circle
                key={`eff-${id}`}
                r={isDamaged ? 5 : 3.5}
                fill="#f59e0b"
                filter="url(#glowYellow)"
                initial={{ cx: 225, cy: 225, opacity: 1 }}
                animate={{ cx: 245, cy: 380, opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isDamaged ? 0.5 : 1, ease: 'linear' }}
              />
            ))}
          </AnimatePresence>

          {/* ── MUSCLE FIBER ── */}
          <motion.rect
            y="390" height="40" rx="20"
            fill="#991b1b"
            stroke="#7f1d1d"
            strokeWidth="2"
            animate={{
              x: isDamaged ? 130 : 100,
              width: isDamaged ? 140 : 200,
              fill: isDamaged ? '#b91c1c' : '#991b1b',
            }}
            transition={{ type: 'spring', stiffness: 40, damping: 15 }}
          />
          {/* Muscle striations */}
          <motion.g
            animate={{ opacity: isDamaged ? 0.8 : 0.3 }}
            transition={{ duration: 0.4 }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <motion.line
                key={`striation-${i}`}
                y1="395" y2="425"
                stroke="#fca5a5"
                strokeWidth="1"
                animate={{
                  x1: isDamaged ? 145 + i * 16 : 115 + i * 23,
                  x2: isDamaged ? 145 + i * 16 : 115 + i * 23,
                }}
                transition={{ type: 'spring', stiffness: 40, damping: 15 }}
              />
            ))}
          </motion.g>

          {/* Muscle label */}
          <motion.text
            y="415" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold"
            animate={{ x: 200 }}
          >
            שריר
          </motion.text>

          {/* ── MUSCLE SPINDLE (inside muscle) ── */}
          <motion.g
            animate={{
              x: isDamaged ? 10 : 0,
            }}
            transition={{ type: 'spring', stiffness: 40, damping: 15 }}
          >
            {/* Spindle capsule */}
            <motion.rect
              x="170" y="397" width="60" height="14" rx="7"
              fill="none"
              stroke="#eab308"
              strokeWidth="1.5"
              animate={{
                stroke: isDamaged ? '#facc15' : '#a16207',
                strokeWidth: isDamaged ? 2.5 : 1.5,
              }}
            />
            {/* Spindle coils inside */}
            <motion.path
              d="M175,404 Q180,398 185,404 Q190,410 195,404 Q200,398 205,404 Q210,410 215,404 Q220,398 225,404"
              fill="none"
              stroke="#eab308"
              strokeWidth="1.5"
              animate={{
                stroke: isDamaged ? '#facc15' : '#a16207',
                strokeWidth: isDamaged ? 2 : 1,
              }}
            />
            {/* Spindle firing indicator when damaged */}
            <AnimatePresence>
              {isDamaged && (
                <motion.rect
                  x="168" y="395" width="64" height="18" rx="9"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="1"
                  filter="url(#glowYellow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [1, 1.15, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          </motion.g>
          {/* Spindle label */}
          <text x="200" y="380" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">
            כישור שריר
          </text>

          {/* ── CONTRACTION ARROWS (show muscle tension) ── */}
          <AnimatePresence>
            {isDamaged && (
              <>
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Left arrow → pointing inward */}
                  <motion.path
                    d="M105,410 L125,410 L120,405 M125,410 L120,415"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                  {/* Right arrow ← pointing inward */}
                  <motion.path
                    d="M295,410 L275,410 L280,405 M275,410 L280,415"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ x: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                  <text x="85" y="425" fill="#f87171" fontSize="7" fontWeight="bold">כיווץ!</text>
                  <text x="295" y="425" fill="#f87171" fontSize="7" fontWeight="bold">כיווץ!</text>
                </motion.g>
              </>
            )}
          </AnimatePresence>

          {/* ── Relaxed arrows (normal state) ── */}
          <AnimatePresence>
            {!isDamaged && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              >
                {/* Left arrow ← pointing outward */}
                <path
                  d="M100,410 L80,410 L85,405 M80,410 L85,415"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Right arrow → pointing outward */}
                <path
                  d="M300,410 L320,410 L315,405 M320,410 L315,415"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── LEGEND ── */}
          <g transform="translate(10, 460)">
            <rect x="0" y="0" width="380" height="50" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            {/* Afferent */}
            <circle cx="20" cy="18" r="5" fill="#3b82f6" />
            <text x="30" y="22" fill="#94a3b8" fontSize="8">סיב תחושתי Ia</text>
            {/* Efferent */}
            <circle cx="140" cy="18" r="5" fill="#f59e0b" />
            <text x="150" y="22" fill="#94a3b8" fontSize="8">עצב מוטורי α</text>
            {/* Inhibitory */}
            <circle cx="280" cy="18" r="5" fill="#10b981" />
            <text x="290" y="22" fill="#94a3b8" fontSize="8">עיכוב מרכזי</text>
            {/* Signal speed note */}
            <text x="190" y="42" textAnchor="middle" fill="#64748b" fontSize="7">
              {isDamaged ? 'ירי מהיר ובלתי מבוקר • אין עיכוב מרכזי' : 'ירי מתון ומבוקר • עיכוב תקין מהמוח'}
            </text>
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
