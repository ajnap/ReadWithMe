"use client";

import { motion } from "motion/react";
import { steps } from "@/lib/content";
import { StarDoodle, HeartDoodle } from "./Doodle";

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-rwm-cream px-5 py-28">
      <StarDoodle className="absolute left-[6%] top-[12%] hidden -rotate-12 sm:block" size={30} />
      <HeartDoodle className="absolute right-[7%] bottom-[14%] hidden rotate-12 sm:block" size={26} />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bubble text-4xl text-rwm-ink sm:text-5xl">
          How does it <span className="text-rwm-red">work</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-rwm-ink/80">
          Four simple steps from &ldquo;just got it&rdquo; to a kid reading full
          stories — no teaching degree required.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* superhero swoops across the row as the cards pop in (wide screens) */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute z-20 hidden lg:block"
          initial={{ left: "4%", top: 24, opacity: 0, rotate: -12 }}
          whileInView={{
            left: ["4%", "8%", "34%", "60%", "86%", "94%"],
            top: [24, 44, 150, 44, 150, 300],
            opacity: [0, 1, 1, 1, 1, 0],
            rotate: [-12, -12, 14, -12, 14, 8],
          }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            times: [0, 0.08, 0.34, 0.58, 0.82, 1],
          }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-rwm-yellow text-2xl shadow-[0_3px_0_rgba(21,35,59,1)]">
            🦸
          </span>
        </motion.span>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.5, ease: "easeOut" }}
              className="card-pop relative bg-white p-6 pt-8 text-left"
            >
            <span className="absolute -top-5 left-5 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-rwm-red">
              <span className="bubble bubble-sm text-2xl leading-none text-white">
                {i + 1}
              </span>
            </span>
            <h3 className="bubble bubble-sm mt-2 text-2xl text-rwm-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-base font-semibold text-rwm-ink/75">
              {s.desc}
            </p>
          </motion.div>
        ))}
        </div>
      </div>

      {/* See it in action — mobile only (desktop highlights the same video in
          the hero background, so we don't repeat it here). */}
      <div className="sm:hidden">
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h3 className="bubble text-3xl text-rwm-ink sm:text-4xl">
            See it in <span className="text-rwm-red">action</span>
          </h3>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card-pop mx-auto mt-8 max-w-4xl overflow-hidden bg-white p-0"
        >
          <video
            className="aspect-video h-auto w-full"
            src="/assets/website-video.mp4"
            poster="/assets/website-poster.jpg"
            controls
            playsInline
            preload="metadata"
          />
        </motion.div>
      </div>
    </section>
  );
}
