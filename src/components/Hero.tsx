"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { StarDoodle, RocketDoodle, HeartDoodle, SunDoodle, Pencil } from "./Doodle";
import { heroReveal } from "@/lib/heroReveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop-only scroll reveal (mobile keeps the static hero). We intentionally
  // run this even for reduced-motion users since it's a requested signature
  // effect and the bg video already autoplays. Default assumes mobile so first
  // paint is safe; CSS (sm:opacity-0 / sm:opacity-[0.06]) holds the correct
  // hidden/faint state before JS runs.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const dq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(dq.matches);
    update();
    dq.addEventListener("change", update);
    return () => dq.removeEventListener("change", update);
  }, []);
  const reveal = isDesktop;

  // "start start" → "end end" maps progress 0→1 over the pinned scroll distance.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Latch the reveal: progress only ever increases, so once the hero assembles
  // it STAYS assembled — scrolling back up (or scroll jitter) can't undo it; it
  // only resets on a page reload. This is what locks the content in place.
  const latched = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reveal && v > latched.get()) latched.set(v);
  });

  // Timeline over the (latched) pin progress:
  //   0.00–0.25  long plain-video lead-in (scroll cue invites scrolling)
  //   0.25–0.45  blue tint washes over
  //   0.42–0.56  title / photo / doodles + nav items fade up into place
  //   0.56–1.00  long hold on the finished, locked-in hero
  const overlayOpacity = useTransform(latched, [0.25, 0.45], [0.05, 0.9]);
  const revealOpacity = useTransform(latched, [0.42, 0.56], [0, 1]);
  const revealY = useTransform(latched, [0.42, 0.56], [70, 0]);

  // Share the content-reveal amount so the Nav fades its links/CTA in with it.
  useMotionValueEvent(revealOpacity, "change", (v) => {
    if (reveal) heroReveal.set(v);
  });

  // Drive from scroll on desktop; on mobile leave the CSS defaults (visible).
  const overlayStyle = reveal ? { opacity: overlayOpacity } : undefined;
  const contentStyle = reveal ? { opacity: revealOpacity, y: revealY } : undefined;
  const doodleStyle = reveal ? { opacity: revealOpacity } : undefined;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen sm:h-[320vh]"
    >
      {/* Sticky stage: holds video + tint + content. On desktop it pins while
          the section scrolls, giving the reveal its runway. */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-rwm-sky/40 via-rwm-blue to-rwm-blue-deep pt-28 pb-16">
        {/* --- looping background video (easy to remove: delete this block) --- */}
        <video
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full object-cover sm:block"
          src="/assets/website-video.mp4"
          poster="/assets/website-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        {/* blue wash — faint at the top on desktop, deepens on scroll */}
        <motion.div
          style={overlayStyle}
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-rwm-blue/85 via-rwm-blue/80 to-rwm-blue-deep/90 opacity-100 sm:opacity-[0.06]"
        />

        {/* floating doodles — hidden on mobile; fade in with the content on desktop */}
        <motion.span style={doodleStyle} className="absolute left-[3%] top-[26%] z-10 hidden -rotate-6 sm:block sm:opacity-0">
          <SunDoodle size={34} className="animate-pulse" />
        </motion.span>
        <motion.span style={doodleStyle} className="absolute right-[4%] top-[16%] z-10 hidden rotate-12 sm:block sm:opacity-0">
          <RocketDoodle size={30} />
        </motion.span>
        <motion.span style={doodleStyle} className="absolute left-[4%] bottom-[18%] z-10 hidden -rotate-12 sm:block sm:opacity-0">
          <HeartDoodle size={26} />
        </motion.span>
        <motion.span style={doodleStyle} className="absolute right-[6%] bottom-[26%] z-10 hidden rotate-6 sm:block sm:opacity-0">
          <StarDoodle size={22} />
        </motion.span>

        <motion.div
          style={contentStyle}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 opacity-100 sm:opacity-0 md:grid-cols-2 md:gap-6"
        >
          {/* Copy */}
          <div className="text-center md:text-left">
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
              Read With Me is a personalized program from two veteran
              kindergarten teachers, built for{" "}
              <strong>beginning readers ages 3 and up</strong>. Just 15 minutes a
              day takes kids to a 1st-grade reading level — with their own name
              and face in every lesson.
            </p>

            {/* Hero CTA buttons hidden for now (nav "Build Your Reader" remains).
                To restore: change "hidden" back to "flex". */}
            <div className="mt-8 hidden flex-col items-center gap-4 sm:flex-row md:items-start">
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
          </div>

          {/* Hero photo + badge */}
          <div className="relative mx-auto w-full max-w-md">
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
          </div>
        </motion.div>

        {/* scroll cue — invites the initial scroll, fades as the content arrives */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-center sm:block"
        >
          <p className="text-sm font-bold text-white/80">scroll to read on</p>
          <span className="mx-auto mt-1 block w-fit drop-shadow-[0_2px_0_rgba(21,35,59,0.35)]">
            <Pencil size={20} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
