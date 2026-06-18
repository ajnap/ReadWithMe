"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookDoodle } from "./Doodle";
import { stats } from "@/lib/content";

type Beat = {
  side: "left" | "right";
  text: string;
  sub?: string;
  image?: string;
};

const beats: Beat[] = [
  {
    side: "left",
    text: "Apps promised to teach reading…",
    sub: "…but kids just stared at a screen and tuned out.",
  },
  {
    side: "right",
    text: "Real reading happens side-by-side.",
    sub: "A grown-up, a child, and a story they star in.",
    image: "/assets/Pic5.avif",
  },
  {
    side: "left",
    text: "15 minutes a day is all it takes.",
    sub: "No prep, no guesswork. Open the book and go.",
  },
];

export function Promise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  // a star token travels down the dashed spine
  const tokenY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const tokenRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden bg-rwm-blue-deep px-5 py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bubble text-4xl sm:text-5xl">
          Why <span className="text-rwm-yellow">Read With Me</span> works
        </h2>
        <p className="mt-4 text-lg font-semibold text-white/85">
          The secret isn&apos;t a smarter app. It&apos;s the oldest trick
          teachers know — and we made it effortless.
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl">
        {/* dashed spine */}
        <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 border-l-[3px] border-dashed border-white/40" />
        {/* traveling token */}
        <motion.div
          style={{ top: tokenY, rotate: tokenRotate }}
          className="absolute left-1/2 z-10 -translate-x-1/2"
        >
          <span className="block rounded-full border-[3px] border-rwm-ink bg-rwm-yellow p-2 shadow-[0_3px_0_rgba(21,35,59,1)]">
            <BookDoodle size={30} />
          </span>
        </motion.div>

        <div className="flex flex-col gap-24">
          {beats.map((beat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: beat.side === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`relative w-full md:w-[46%] ${
                beat.side === "left" ? "md:mr-auto md:text-right" : "md:ml-auto"
              }`}
            >
              {beat.image && (
                <div className="card-pop mb-4 hidden overflow-hidden bg-white sm:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={beat.image} alt="" className="h-auto w-full" />
                </div>
              )}
              <p className="bubble bubble-sm text-3xl sm:text-4xl">{beat.text}</p>
              {beat.sub && (
                <p className="mt-3 text-lg font-semibold text-white/85">
                  {beat.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* stat band */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-24 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="card-pop bg-rwm-blue px-4 py-6 text-center"
          >
            <p className="bubble bubble-sm text-4xl text-rwm-yellow">
              {s.value}
            </p>
            <p className="mt-1 text-sm font-bold text-white/90">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
