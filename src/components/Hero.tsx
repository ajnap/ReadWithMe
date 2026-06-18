"use client";

import { motion } from "motion/react";
import { StarDoodle, RocketDoodle, HeartDoodle, SunDoodle } from "./Doodle";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-rwm-sky/40 via-rwm-blue to-rwm-blue-deep pt-28 pb-16"
    >
      {/* --- looping background video (easy to remove: delete this block) --- */}
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        src="/assets/website-video.mp4"
        poster="/assets/website-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* blue wash so the copy stays readable over the video */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-rwm-blue/85 via-rwm-blue/80 to-rwm-blue-deep/90" />
      {/* --- end background video block --- */}

      {/* floating doodles — gutter-only; hidden on mobile where they'd cover copy */}
      <SunDoodle className="absolute left-[3%] top-[26%] z-10 hidden animate-pulse -rotate-6 sm:block" size={34} />
      <RocketDoodle className="absolute right-[4%] top-[16%] z-10 hidden rotate-12 sm:block" size={30} />
      <HeartDoodle className="absolute left-[4%] bottom-[18%] z-10 hidden -rotate-12 sm:block" size={26} />
      <StarDoodle className="absolute right-[6%] bottom-[26%] z-10 hidden rotate-6 sm:block" size={22} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-2 md:gap-6">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-rwm-ink bg-white/95 px-4 py-1.5 text-sm font-bold text-rwm-ink shadow-[0_3px_0_rgba(21,35,59,1)]">
            <StarDoodle size={18} /> Backed by 99+ families on Kickstarter
          </span>

          <h1 className="bubble mt-5 text-5xl sm:text-6xl lg:text-7xl">
            Make your child
            <br />
            the <span className="text-rwm-yellow">hero</span> of their
            <br />
            reading story.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg font-semibold text-white/95 md:mx-0">
            Read With Me is a personalized program from two veteran kindergarten
            teachers. Just <strong>15 minutes a day</strong> takes kids to a
            1st-grade reading level — with their own name and face in every
            lesson.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <a
              href="#build"
              className="btn-pop bg-rwm-yellow px-8 py-4 text-lg text-rwm-ink"
            >
              Build Your Reader →
            </a>
            <a
              href="#inside"
              className="btn-pop bg-white px-8 py-4 text-lg text-rwm-ink"
            >
              See what&apos;s inside
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 md:justify-start">
            <span className="text-xl text-rwm-yellow">★★★★★</span>
            <span className="text-sm font-bold text-white/90">
              Loved by parents &amp; teachers
            </span>
          </div>
        </motion.div>

        {/* Hero photo + characters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-3, -1, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="card-pop overflow-hidden bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Pic_Leo.webp"
              alt="A child smiling while holding their personalized Read With Me book"
              className="h-auto w-full"
            />
          </motion.div>

          {/* little floating badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="card-pop absolute -bottom-5 -left-4 bg-rwm-red px-4 py-2 text-center"
          >
            <p className="bubble bubble-sm text-2xl leading-none">15</p>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-white">
              min / day
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <p className="text-sm font-bold text-white/80">scroll to read on</p>
        <p className="text-2xl text-white/80">↓</p>
      </motion.div>
    </section>
  );
}
