"use client";

import { motion } from "motion/react";

const COLORS = ["#ff3b2e", "#ffc012", "#38b6ff", "#2767f4", "#ffffff"];
const N = 64;

// Deterministic pseudo-random so the server and client render identical
// markup (no hydration mismatch from Math.random()).
function rand(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const pieces = Array.from({ length: N }, (_, i) => {
  const angle = rand(i, 1) * Math.PI * 2;
  const dist = 140 + rand(i, 2) * 420;
  return {
    color: COLORS[i % COLORS.length],
    dx: Math.cos(angle) * dist,
    burstY: Math.sin(angle) * dist - 80, // initial outward/up
    fall: 320 + rand(i, 3) * 520, // then gravity pulls down
    size: 8 + Math.round(rand(i, 4) * 10),
    rot: (rand(i, 5) - 0.5) * 900,
    delay: rand(i, 6) * 0.18,
    dur: 1.7 + rand(i, 7) * 1.5,
    round: rand(i, 8) > 0.5,
  };
});

export function Confetti({ fire }: { fire: boolean }) {
  if (!fire) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            x: [0, p.dx * 0.6, p.dx, p.dx],
            y: [0, p.burstY, p.burstY + p.fall * 0.5, p.burstY + p.fall],
            opacity: [0, 1, 1, 0],
            rotate: [0, p.rot * 0.5, p.rot, p.rot],
            scale: [0.5, 1, 1, 0.85],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeOut",
            times: [0, 0.12, 0.5, 1],
          }}
          className="absolute left-1/2 top-[40%]"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            border: "2px solid #15233b",
          }}
        />
      ))}
    </div>
  );
}
