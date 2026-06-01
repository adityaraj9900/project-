"use client";

import { motion } from "framer-motion";

/* Pure CSS/SVG 3D scene — gold luxury theme, no external deps */
export function HeroScene() {
  return (
    <div className="relative h-[520px] w-full select-none overflow-hidden">
      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56"
        style={{
          background: `
            linear-gradient(rgba(201,168,76,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      />

      {/* Ambient gold glow */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(201,168,76,0.08)] blur-[80px]" />

      {/* Floating cube */}
      <motion.div
        animate={{ y: [-12, 12, -12], rotateY: [0, 360] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 12, repeat: Infinity, ease: "linear" } }}
        style={{ position: "absolute", top: "12%", left: "60%", transformStyle: "preserve-3d", perspective: 800 }}
        className="h-20 w-20"
      >
        <Cube size={80} />
      </motion.div>

      {/* Floating sphere */}
      <motion.div
        animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "40%", left: "75%", transformStyle: "preserve-3d" }}
      >
        <Sphere size={56} />
      </motion.div>

      {/* Floating ring */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [0, 360] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 8, repeat: Infinity, ease: "linear" } }}
        style={{ position: "absolute", top: "60%", left: "55%", transformStyle: "preserve-3d" }}
      >
        <Ring size={48} />
      </motion.div>

      {/* Floating small diamond */}
      <motion.div
        animate={{ y: [5, -10, 5], x: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "20%", left: "80%", transformStyle: "preserve-3d" }}
      >
        <Diamond size={30} />
      </motion.div>

      {/* Particle dots */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-[#C9A84C]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
          animate={{ y: [0, -20, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Corner bracket accents */}
      <CornerAccent className="absolute left-[52%] top-[8%]" />
      <CornerAccent className="absolute right-[2%] bottom-[20%] rotate-180" />
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function Cube({ size }: { size: number }) {
  const s = size;
  const h = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {/* Front face */}
      <polygon
        points={`${h},10 ${s - 10},${h / 2 + 5} ${s - 10},${s - h / 2 + 5} ${h},${s - 10}`}
        fill="rgba(201,168,76,0.12)"
        stroke="rgba(201,168,76,0.6)"
        strokeWidth="1"
      />
      {/* Top face */}
      <polygon
        points={`${h},10 ${s - 10},${h / 2 + 5} ${h},${h + 5} 10,${h / 2 + 5}`}
        fill="rgba(201,168,76,0.20)"
        stroke="rgba(201,168,76,0.6)"
        strokeWidth="1"
      />
      {/* Left face */}
      <polygon
        points={`10,${h / 2 + 5} ${h},${h + 5} ${h},${s - 10} 10,${s - h / 2 + 5}`}
        fill="rgba(201,168,76,0.08)"
        stroke="rgba(201,168,76,0.4)"
        strokeWidth="1"
      />
    </svg>
  );
}

function Sphere({ size }: { size: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <radialGradient id="sg" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8A6F2E" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 2} fill="url(#sg)" stroke="rgba(201,168,76,0.5)" strokeWidth="1" />
      <ellipse cx={r} cy={r} rx={r - 2} ry={(r - 2) * 0.35} fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8" />
    </svg>
  );
}

function Ring({ size }: { size: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <ellipse cx={r} cy={r} rx={r - 3} ry={(r - 3) * 0.38} fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="2.5" />
      <ellipse cx={r} cy={r} rx={r - 3} ry={(r - 3) * 0.38} fill="none" stroke="rgba(232,201,122,0.25)" strokeWidth="6" />
    </svg>
  );
}

function Diamond({ size }: { size: number }) {
  const h = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <polygon
        points={`${h},2 ${size - 2},${h} ${h},${size - 2} 2,${h}`}
        fill="rgba(201,168,76,0.15)"
        stroke="rgba(201,168,76,0.7)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CornerAccent({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M2 16 L2 2 L16 2" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/* ─── Particle data ────────────────────────────────────────── */

const PARTICLES = [
  { id: 1, x: 54, y: 18, opacity: 0.4, dur: 4.2, delay: 0 },
  { id: 2, x: 62, y: 50, opacity: 0.3, dur: 5.5, delay: 0.8 },
  { id: 3, x: 71, y: 33, opacity: 0.5, dur: 3.8, delay: 1.2 },
  { id: 4, x: 80, y: 55, opacity: 0.25, dur: 6, delay: 0.4 },
  { id: 5, x: 58, y: 72, opacity: 0.35, dur: 4.8, delay: 2 },
  { id: 6, x: 87, y: 38, opacity: 0.3, dur: 5.2, delay: 1.6 },
  { id: 7, x: 78, y: 22, opacity: 0.45, dur: 3.5, delay: 2.4 },
  { id: 8, x: 66, y: 65, opacity: 0.2, dur: 7, delay: 0.6 },
  { id: 9, x: 92, y: 70, opacity: 0.3, dur: 4.5, delay: 3 },
  { id: 10, x: 55, y: 45, opacity: 0.4, dur: 5.8, delay: 1.8 },
];
