"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { steps, stats } from "@/lib/content";
import { Confetti } from "./Confetti";
import { Pencil } from "./Doodle";

type Node =
  | { kind: "step"; side: "left" | "right"; index: number; title: string; desc: string }
  | { kind: "divider"; side: "center"; title: string; sub: string }
  | { kind: "beat"; side: "left" | "right"; text: string; sub?: string; image?: string };

const beats = [
  { text: "Apps promised to teach reading…", sub: "…but kids just stared at a screen and tuned out." },
  { text: "Real reading happens side-by-side.", sub: "A grown-up, a child, and a story they star in.", image: "/assets/Pic5.avif" },
  { text: "15 minutes a day is all it takes.", sub: "No prep, no guesswork. Open the book and go." },
];

const nodes: Node[] = [
  ...steps.map((s, i) => ({
    kind: "step" as const,
    side: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    index: i,
    title: s.title,
    desc: s.desc,
  })),
  { kind: "divider", side: "center", title: "Why it works", sub: "The side-by-side secret behind every step." },
  ...beats.map((b, i) => ({
    kind: "beat" as const,
    side: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    ...b,
  })),
];

// Gentle curve params (px). amp = how far the line sways from center.
const AMP = 34;
const FREQ = nodes.length; // ~one gentle bend per node

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  // Build the gently-curving path the pencil draws.
  const curveX = (t: number) => size.w / 2 + AMP * Math.sin(t * Math.PI * FREQ);
  let d = "";
  if (size.h > 0) {
    const pts: string[] = [];
    const N = 80;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      pts.push(`${i === 0 ? "M" : "L"} ${curveX(t).toFixed(1)} ${(t * size.h).toFixed(1)}`);
    }
    d = pts.join(" ");
  }

  // Pencil rides the same curve so it stays at the drawn tip.
  const pencilLeft = useTransform(scrollYProgress, (t) => curveX(t));
  const pencilTop = useTransform(scrollYProgress, (t) => t * size.h);
  const pencilRotate = useTransform(
    scrollYProgress,
    (t) => Math.cos(t * Math.PI * FREQ) * 6,
  );

  const [done, setDone] = useState(false);
  // Re-arm so the A+ / confetti replays every time the pencil reaches the
  // bottom (fires past 0.9, resets once you scroll back up past 0.7) — no
  // reload needed.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.9) setDone(true);
    else if (v < 0.7) setDone(false);
  });

  return (
    <section id="how" className="relative overflow-hidden bg-rwm-blue-deep px-5 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bubble text-4xl sm:text-5xl">
          How <span className="text-rwm-yellow">Read With Me</span> works
        </h2>
        <p className="mt-4 text-lg font-semibold text-white/85">
          Four simple steps — and the side-by-side secret that makes them stick.
        </p>
      </div>

      <div ref={trackRef} className="relative mx-auto mt-20 max-w-4xl">
        {/* the drawn curve */}
        <svg
          className="pointer-events-none absolute left-0 top-0 z-0"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          aria-hidden
        >
          <motion.path
            d={d}
            stroke="#ffc012"
            strokeWidth={4}
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* the pencil at the leading edge — floats down into place to start */}
        <motion.div
          style={{ left: pencilLeft, top: pencilTop, rotate: pencilRotate }}
          className="absolute z-20 -translate-x-1/2 -translate-y-full"
        >
          <motion.span
            initial={{ y: -180, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="block drop-shadow-[0_3px_0_rgba(21,35,59,0.4)]"
          >
            <Pencil size={26} />
          </motion.span>
        </motion.div>

        <div className="flex flex-col gap-20">
          {nodes.map((node, i) => {
            if (node.kind === "divider") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative z-10 mx-auto text-center"
                >
                  <span className="inline-block rounded-full border-[3px] border-rwm-ink bg-rwm-yellow px-6 py-2 shadow-[0_3px_0_rgba(21,35,59,1)]">
                    <span className="bubble bubble-sm text-2xl text-rwm-ink">
                      {node.title}
                    </span>
                  </span>
                  <p className="mt-3 text-base font-semibold text-white/80">
                    {node.sub}
                  </p>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: node.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative w-full md:w-[46%] ${
                  node.side === "left" ? "md:mr-auto md:text-right" : "md:ml-auto"
                }`}
              >
                {node.kind === "step" ? (
                  <div className="card-pop relative bg-white p-6 pt-8 text-left">
                    <span
                      className={`absolute -top-5 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-rwm-red ${
                        node.side === "left" ? "right-5" : "left-5"
                      }`}
                    >
                      <span className="bubble bubble-sm text-2xl leading-none text-white">
                        {node.index + 1}
                      </span>
                    </span>
                    <h3 className="bubble bubble-sm mt-2 text-2xl text-rwm-ink">
                      {node.title}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-rwm-ink/75">
                      {node.desc}
                    </p>
                  </div>
                ) : (
                  <>
                    {node.image && (
                      <div className="card-pop mb-4 hidden overflow-hidden bg-white sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={node.image} alt="" className="h-auto w-full" />
                      </div>
                    )}
                    <p className="bubble bubble-sm text-3xl sm:text-4xl">{node.text}</p>
                    {node.sub && (
                      <p className="mt-3 text-lg font-semibold text-white/85">
                        {node.sub}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}

          {/* finale: the pencil reaches the notebook and "writes" an A+ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 mx-auto mt-6"
          >
            <div className="card-pop relative bg-white px-12 py-9 text-center">
              {/* spiral binding */}
              <div className="absolute -top-2 left-0 right-0 flex justify-center gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full border-2 border-rwm-ink bg-rwm-yellow"
                  />
                ))}
              </div>
              <motion.p
                initial={{ scale: 0, rotate: -14 }}
                animate={done ? { scale: 1, rotate: -8 } : { scale: 0, rotate: -14 }}
                transition={{ type: "spring", stiffness: 260, damping: 12 }}
                className="bubble text-7xl text-rwm-red"
              >
                A+
              </motion.p>
              <p className="mt-2 text-sm font-extrabold uppercase tracking-wide text-rwm-ink/70">
                a brand-new reader
              </p>
            </div>
          </motion.div>
        </div>

        <Confetti fire={done} origin="top-[97%]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-24 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="card-pop bg-rwm-blue px-4 py-6 text-center">
            <p className="bubble bubble-sm text-4xl text-rwm-yellow">{s.value}</p>
            <p className="mt-1 text-sm font-bold text-white/90">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
