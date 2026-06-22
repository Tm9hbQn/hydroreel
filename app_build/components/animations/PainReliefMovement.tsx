"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Joint positions for the stick figure (relative to SVG viewBox 0 0 200 360)
const JOINTS = {
  head: { cx: 100, cy: 30, r: 18 },
  neck: { x1: 100, y1: 48, x2: 100, y2: 60 },
  shoulderL: { cx: 65, cy: 75 },
  shoulderR: { cx: 135, cy: 75 },
  torsoTop: { x1: 65, y1: 75, x2: 135, y2: 75 },
  spine: { x1: 100, y1: 75, x2: 100, y2: 170 },
  hipL: { cx: 80, cy: 180 },
  hipR: { cx: 120, cy: 180 },
  hipBar: { x1: 80, y1: 180, x2: 120, y2: 180 },
  kneeL: { cx: 75, cy: 245 },
  kneeR: { cx: 125, cy: 245 },
  footL: { cx: 70, cy: 310 },
  footR: { cx: 130, cy: 310 },
};

function PainIndicator({ cx, cy, visible }: { cx: number; cy: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Outer glow */}
          <motion.circle
            cx={cx} cy={cy} r={14}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            opacity={0.4}
            animate={{ r: [14, 20, 14], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner pulse */}
          <motion.circle
            cx={cx} cy={cy} r={10}
            fill="rgba(239,68,68,0.35)"
            animate={{ r: [8, 12, 8], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Lightning bolt sparks */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = cx + Math.cos(rad) * 10;
            const y1 = cy + Math.sin(rad) * 10;
            const x2 = cx + Math.cos(rad) * 17;
            const y2 = cy + Math.sin(rad) * 17;
            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#fbbf24"
                strokeWidth={2}
                strokeLinecap="round"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
              />
            );
          })}
        </motion.g>
      )}
    </AnimatePresence>
  );
}

function MovementArc({ cx, cy, visible, direction }: { cx: number; cy: number; visible: boolean; direction: 'left' | 'right' }) {
  const flip = direction === 'left' ? -1 : 1;
  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[0, 1, 2].map(i => (
            <motion.path
              key={i}
              d={`M ${cx} ${cy} Q ${cx + flip * (20 + i * 8)} ${cy - 15 - i * 6} ${cx + flip * (5 + i * 4)} ${cy - 30 - i * 8}`}
              fill="none"
              stroke="#22d3ee"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="4 3"
              opacity={0.7 - i * 0.15}
              animate={{ opacity: [0.7 - i * 0.15, 0.2, 0.7 - i * 0.15] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <motion.text
            x={cx + flip * 35}
            y={cy - 10}
            fill="#22d3ee"
            fontSize={8}
            fontWeight="bold"
            textAnchor="middle"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            טווח תנועה
          </motion.text>
        </motion.g>
      )}
    </AnimatePresence>
  );
}

function WaterWaves({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Water background fill */}
          <motion.rect
            x={0} y={100} width={200} height={260}
            fill="rgba(14,116,144,0.12)"
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {/* Wave lines */}
          {[100, 160, 220, 280].map((y, i) => (
            <motion.path
              key={i}
              d={`M 0 ${y} Q 50 ${y - 6} 100 ${y} Q 150 ${y + 6} 200 ${y}`}
              fill="none"
              stroke="rgba(34,211,238,0.3)"
              strokeWidth={1.5}
              animate={{
                d: [
                  `M 0 ${y} Q 50 ${y - 6} 100 ${y} Q 150 ${y + 6} 200 ${y}`,
                  `M 0 ${y} Q 50 ${y + 6} 100 ${y} Q 150 ${y - 6} 200 ${y}`,
                  `M 0 ${y} Q 50 ${y - 6} 100 ${y} Q 150 ${y + 6} 200 ${y}`,
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
          {/* Bubbles */}
          {[
            { x: 30, delay: 0 }, { x: 160, delay: 1.2 }, { x: 90, delay: 0.6 },
            { x: 50, delay: 1.8 }, { x: 140, delay: 2.4 },
          ].map((b, i) => (
            <motion.circle
              key={i}
              cx={b.x} r={2.5}
              fill="rgba(165,243,252,0.4)"
              stroke="rgba(165,243,252,0.3)"
              strokeWidth={0.5}
              initial={{ cy: 350, opacity: 0 }}
              animate={{ cy: 80, opacity: [0, 0.6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
            />
          ))}
        </motion.g>
      )}
    </AnimatePresence>
  );
}

function ConfidenceMeter({ inWater }: { inWater: boolean }) {
  const level = inWater ? 0.85 : 0.2;
  const color = inWater ? '#22d3ee' : '#ef4444';
  const label = inWater ? '😊' : '😣';

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-lg">{label}</span>
      <div className="w-5 h-20 bg-slate-700 rounded-full overflow-hidden relative border border-slate-600">
        <motion.div
          className="absolute bottom-0 w-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ height: `${level * 100}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
      </div>
      <span className="text-[9px] text-slate-400 font-bold text-center leading-tight" dir="rtl">ביטחון</span>
    </div>
  );
}

export default function PainReliefMovement() {
  const [inWater, setInWater] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center font-sans"
    >
      {/* ═══════ Controls Zone ═══════ */}
      <div className="w-full shrink-0 px-4 pt-4 pb-2" dir="rtl">
        <h3 className="text-sm font-bold text-slate-100 text-center mb-1">תנועה ללא כאב</h3>
        <p className="text-[10px] text-slate-400 text-center leading-relaxed mb-3 max-w-[280px] mx-auto">
          חסימת אותות הכאב במים מאפשרת תנועה חופשית, מחזקת ביטחון ומאיצה שיקום.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setInWater(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              !inWater
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            יבשה (כאב)
          </button>
          <button
            onClick={() => setInWater(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              inWater
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30 scale-105'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            במים (ללא כאב)
          </button>
        </div>
      </div>

      {/* ═══════ Visualization Zone ═══════ */}
      <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center min-h-0">
        {/* Confidence meter - positioned on the side */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
          <ConfidenceMeter inWater={inWater} />
        </div>

        {/* Status badge */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              inWater
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700'
                : 'bg-rose-950/80 text-rose-300 border-rose-700'
            }`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            dir="rtl"
          >
            {inWater ? '✦ מפרקים חופשיים — תנועה מלאה' : '⚡ מפרקים כואבים — תנועה מוגבלת'}
          </motion.div>
        </div>

        {/* Main SVG Figure */}
        <svg viewBox="0 0 200 360" className="h-[90%] max-w-full" preserveAspectRatio="xMidYMid meet">
          {/* Water waves background layer */}
          <WaterWaves visible={inWater} />

          {/* ── Stick Figure ── */}
          <motion.g
            animate={{
              // Posture shift: hunched on land, upright in water
              y: inWater ? 0 : 8,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
          >
            {/* Head */}
            <motion.circle
              cx={JOINTS.head.cx}
              cy={JOINTS.head.cy}
              r={JOINTS.head.r}
              fill={inWater ? '#67e8f9' : '#fca5a5'}
              stroke={inWater ? '#06b6d4' : '#dc2626'}
              strokeWidth={2}
              animate={{
                cy: inWater ? 30 : 35,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Face */}
            <motion.text
              x={100}
              textAnchor="middle"
              fontSize={14}
              animate={{ y: inWater ? 35 : 40 }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            >
              {inWater ? '😊' : '😣'}
            </motion.text>

            {/* Neck */}
            <motion.line
              x1={100} x2={100}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{
                y1: inWater ? 48 : 53,
                y2: inWater ? 60 : 63,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />

            {/* Shoulder bar */}
            {/* Shoulder bar */}
            <motion.line
              x1={inWater ? 60 : 70}
              x2={inWater ? 140 : 130}
              y1={75}
              y2={75}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{
                x1: inWater ? 60 : 70,
                x2: inWater ? 140 : 130,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />

            {/* Left Arm — animated movement in water */}
            <motion.line
              x1={inWater ? 60 : 70}
              y1={75}
              x2={inWater ? 35 : 70}
              y2={inWater ? 130 : 140}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x2: inWater ? [35, 25, 40, 35] : [70, 68, 70],
                y2: inWater ? [130, 95, 120, 130] : [140, 138, 140],
              }}
              transition={{
                duration: inWater ? 2.5 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Right Arm — animated movement in water */}
            <motion.line
              x1={inWater ? 140 : 130}
              y1={75}
              x2={inWater ? 165 : 130}
              y2={inWater ? 130 : 140}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x2: inWater ? [165, 175, 160, 165] : [130, 132, 130],
                y2: inWater ? [130, 95, 120, 130] : [140, 138, 140],
              }}
              transition={{
                duration: inWater ? 2.5 : 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            {/* Spine */}
            <motion.line
              x1={100}
              x2={inWater ? 100 : 103}
              y1={75}
              y2={inWater ? 170 : 165}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{
                y2: inWater ? 170 : 165,
                // Slight spine curvature on land
                x2: inWater ? 100 : 103,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />

            {/* Hip bar */}
            <motion.line
              x1={inWater ? 75 : 82}
              x2={inWater ? 125 : 118}
              y1={inWater ? 175 : 170}
              y2={inWater ? 175 : 170}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeWidth={3}
              strokeLinecap="round"
              animate={{
                x1: inWater ? 75 : 82,
                x2: inWater ? 125 : 118,
                y1: inWater ? 175 : 170,
                y2: inWater ? 175 : 170,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />

            {/* Left Leg — upper */}
            <motion.line
              x1={inWater ? 75 : 82}
              y1={inWater ? 175 : 170}
              x2={inWater ? 68 : 78}
              y2={inWater ? 240 : 240}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x1: inWater ? 75 : 82,
                y1: inWater ? 175 : 170,
                x2: inWater ? [68, 60, 75, 68] : [78, 76, 78],
                y2: inWater ? [240, 230, 245, 240] : [240, 238, 240],
              }}
              transition={{
                duration: inWater ? 3 : 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Left Leg — lower */}
            <motion.line
              x1={inWater ? 68 : 78}
              y1={inWater ? 240 : 240}
              x2={inWater ? 62 : 75}
              y2={inWater ? 310 : 310}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x1: inWater ? [68, 60, 75, 68] : [78, 76, 78],
                y1: inWater ? [240, 230, 245, 240] : [240, 238, 240],
                x2: inWater ? [62, 50, 72, 62] : [75, 74, 75],
                y2: inWater ? [310, 300, 315, 310] : [310, 308, 310],
              }}
              transition={{
                duration: inWater ? 3 : 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Right Leg — upper */}
            <motion.line
              x1={inWater ? 125 : 118}
              y1={inWater ? 175 : 170}
              x2={inWater ? 132 : 122}
              y2={inWater ? 240 : 240}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x1: inWater ? 125 : 118,
                y1: inWater ? 175 : 170,
                x2: inWater ? [132, 140, 125, 132] : [122, 124, 122],
                y2: inWater ? [240, 230, 245, 240] : [240, 238, 240],
              }}
              transition={{
                duration: inWater ? 3 : 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Right Leg — lower */}
            <motion.line
              x1={inWater ? 132 : 122}
              y1={inWater ? 240 : 240}
              x2={inWater ? 138 : 125}
              y2={inWater ? 310 : 310}
              strokeWidth={3}
              stroke={inWater ? '#67e8f9' : '#fca5a5'}
              strokeLinecap="round"
              animate={{
                x1: inWater ? [132, 140, 125, 132] : [122, 124, 122],
                y1: inWater ? [240, 230, 245, 240] : [240, 238, 240],
                x2: inWater ? [138, 150, 128, 138] : [125, 126, 125],
                y2: inWater ? [310, 300, 315, 310] : [310, 308, 310],
              }}
              transition={{
                duration: inWater ? 3 : 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* ── Joint circles (highlighted) ── */}
            {/* Left shoulder */}
            <motion.circle
              cy={75} r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{ cx: inWater ? 60 : 70 }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Right shoulder */}
            <motion.circle
              cy={75} r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{ cx: inWater ? 140 : 130 }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Left hip */}
            <motion.circle
              r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{
                cx: inWater ? 75 : 82,
                cy: inWater ? 175 : 170,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Right hip */}
            <motion.circle
              r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{
                cx: inWater ? 125 : 118,
                cy: inWater ? 175 : 170,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Left knee */}
            <motion.circle
              r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{
                cx: inWater ? 68 : 78,
                cy: 240,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />
            {/* Right knee */}
            <motion.circle
              r={5}
              fill={inWater ? 'rgba(34,211,238,0.4)' : 'rgba(239,68,68,0.4)'}
              stroke={inWater ? '#22d3ee' : '#ef4444'}
              strokeWidth={1.5}
              animate={{
                cx: inWater ? 132 : 122,
                cy: 240,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            />

            {/* ── Pain indicators on land ── */}
            <PainIndicator cx={70} cy={75} visible={!inWater} />   {/* L shoulder */}
            <PainIndicator cx={130} cy={75} visible={!inWater} />  {/* R shoulder */}
            <PainIndicator cx={82} cy={170} visible={!inWater} />  {/* L hip */}
            <PainIndicator cx={118} cy={170} visible={!inWater} /> {/* R hip */}
            <PainIndicator cx={78} cy={240} visible={!inWater} />  {/* L knee */}
            <PainIndicator cx={122} cy={240} visible={!inWater} /> {/* R knee */}

            {/* ── Movement arcs in water ── */}
            <MovementArc cx={55} cy={75} visible={inWater} direction="left" />
            <MovementArc cx={145} cy={75} visible={inWater} direction="right" />
            <MovementArc cx={65} cy={240} visible={inWater} direction="left" />
            <MovementArc cx={135} cy={240} visible={inWater} direction="right" />
          </motion.g>

          {/* Ground / Floor line (only on land) */}
          <AnimatePresence>
            {!inWater && (
              <motion.line
                x1={20} y1={330} x2={180} y2={330}
                stroke="#475569"
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* Joint label */}
          <text
            x={100}
            y={350}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={10}
            fontWeight="bold"
          >
            מפרקים
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
