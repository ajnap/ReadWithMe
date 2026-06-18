"use client";

import { motion } from "motion/react";
import { StarDoodle, SunDoodle } from "./Doodle";

export function MeetTheTeam() {
  return (
    <section
      id="team"
      className="relative flex min-h-screen items-center overflow-hidden bg-rwm-cream px-5 py-28"
    >
      <SunDoodle className="absolute left-[8%] top-[18%] hidden -rotate-6 sm:block" size={30} />
      <StarDoodle className="absolute right-[9%] top-[22%] hidden rotate-12 sm:block" size={24} />

      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card-pop mx-auto w-full max-w-md overflow-hidden bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Pic_Teachers.webp"
            alt="Kelly and Patty, the two kindergarten teachers behind Read With Me"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <span className="inline-block rounded-full border-2 border-rwm-ink bg-rwm-yellow px-4 py-1 text-sm font-extrabold uppercase tracking-wide text-rwm-ink">
            Meet the teachers
          </span>
          <h2 className="bubble mt-4 text-4xl text-rwm-ink sm:text-5xl">
            Built by <span className="text-rwm-red">Kelly</span> &amp;{" "}
            <span className="text-rwm-red">Patty</span>
          </h2>
          <p className="mt-5 text-lg font-semibold text-rwm-ink/80">
            With over <strong>50 years of combined teaching experience</strong>,
            Kelly and Patty have mastered the art of developing capable,
            confident readers.
          </p>
          <p className="mt-4 text-lg font-semibold text-rwm-ink/80">
            They built Read With Me to combine customized learning materials that
            meet the needs of each child — and reinforce learning in fun,
            engaging ways.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
