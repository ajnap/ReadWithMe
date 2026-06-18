"use client";

import { motion } from "motion/react";
import { testimonials } from "@/lib/content";
import { HeartDoodle, StarDoodle } from "./Doodle";

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-rwm-blue px-5 py-28"
    >
      <HeartDoodle className="absolute left-[6%] top-[14%] hidden -rotate-12 sm:block" size={30} />
      <StarDoodle className="absolute right-[7%] bottom-[16%] hidden rotate-12 sm:block" size={28} />

      <div className="mx-auto max-w-3xl text-center">
        <span className="text-2xl text-rwm-yellow">★★★★★</span>
        <h2 className="bubble mt-2 text-4xl sm:text-5xl">
          Parents are <span className="text-rwm-yellow">cheering</span>
        </h2>
        <p className="mt-4 text-lg font-semibold text-white/85">
          Real families, real readers. Here&apos;s what they told us.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="card-pop flex flex-col bg-white p-7 text-left"
          >
            <span className="text-xl text-rwm-yellow">★★★★★</span>
            <blockquote className="mt-3 text-lg font-semibold text-rwm-ink/85">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-rwm-red text-lg font-extrabold text-white">
                {t.name.charAt(0)}
              </span>
              <span className="bubble bubble-sm text-xl text-rwm-ink">
                {t.name}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="bubble mt-12 text-center text-3xl text-rwm-yellow">
        You can do it too!
      </p>
    </section>
  );
}
