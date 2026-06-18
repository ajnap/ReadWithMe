"use client";

import { motion } from "motion/react";
import { features, type Feature } from "@/lib/content";
import {
  StarDoodle,
  SunDoodle,
  BookDoodle,
  HeartDoodle,
  RocketDoodle,
} from "./Doodle";

const iconMap: Record<Feature["icon"], typeof StarDoodle> = {
  star: StarDoodle,
  sun: SunDoodle,
  book: BookDoodle,
  heart: HeartDoodle,
  rocket: RocketDoodle,
};

// The two big color cards alternate brand colors.
const featuredBg = ["bg-rwm-blue", "bg-rwm-red"];

export function Features() {
  const featured = features.filter((f) => f.featured);
  const supporting = features.filter((f) => !f.featured);

  return (
    <section id="why" className="relative overflow-hidden bg-rwm-cream px-5 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bubble text-4xl text-rwm-ink sm:text-5xl">
          Why families choose <span className="text-rwm-red">Read With Me</span>
        </h2>
        <p className="mt-4 text-lg font-semibold text-rwm-ink/80">
          Everything about the program is built to get a real kid reading — and
          to make it effortless for the grown-up beside them.
        </p>
      </div>

      {/* Two large hero cards */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        {featured.map((f, i) => {
          const Icon = iconMap[f.icon];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`card-pop relative overflow-hidden p-8 text-left ${featuredBg[i % featuredBg.length]}`}
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-rwm-ink bg-white">
                <Icon size={38} />
              </span>
              <h3 className="bubble mt-5 text-3xl text-white sm:text-[2rem]">
                {f.title}
              </h3>
              <p className="mt-3 text-lg font-semibold text-white/90">
                {f.desc}
              </p>
              {f.highlight && (
                <span className="mt-5 inline-block rounded-full border-2 border-rwm-ink bg-rwm-yellow px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-rwm-ink">
                  {f.highlight}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Three supporting cards */}
      <div className="mx-auto mt-6 grid max-w-5xl gap-6 sm:grid-cols-3">
        {supporting.map((f, i) => {
          const Icon = iconMap[f.icon];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="card-pop bg-white p-6 text-left"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-rwm-ink bg-rwm-yellow">
                <Icon size={30} />
              </span>
              <h3 className="bubble bubble-sm mt-4 text-2xl text-rwm-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-base font-semibold text-rwm-ink/75">
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
