"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { StarDoodle, RocketDoodle, HeartDoodle } from "./Doodle";
import { Confetti } from "./Confetti";

const accents = [
  { name: "Leo", color: "#5b9bff", emoji: "🦁" },
  { name: "Mia", color: "#ff7eb6", emoji: "🦄" },
  { name: "Theo", color: "#ffc012", emoji: "🚀" },
];

export function BuilderTeaser() {
  const [name, setName] = useState("");
  const [accent, setAccent] = useState(0);
  const display = name.trim() || "Leo";
  const a = accents[accent];

  // Fire confetti once the final section scrolls into view.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      id="build"
      className="relative overflow-hidden bg-gradient-to-b from-rwm-blue to-rwm-blue-deep px-5 py-28"
    >
      <Confetti fire={inView} />
      <RocketDoodle className="absolute left-[10%] top-[12%] hidden -rotate-12 sm:block" size={32} />
      <StarDoodle className="absolute right-[12%] bottom-[14%] hidden rotate-12 sm:block" size={26} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* live preview */}
        <div className="order-2 mx-auto w-full max-w-sm md:order-1">
          <motion.div
            key={display + accent}
            initial={{ scale: 0.96, rotate: -2 }}
            animate={{ scale: 1, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="card-pop relative aspect-[3/4] overflow-hidden p-6 text-center"
            style={{
              background: `radial-gradient(circle at center, ${a.color} 0%, #2767f4 60%, #1742b8 100%)`,
            }}
          >
            <StarDoodle className="absolute left-5 top-6 -rotate-6" size={20} />
            <HeartDoodle className="absolute right-6 top-10 rotate-12" size={14} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Logo_Color.avif"
              alt="Read With Me"
              className="mx-auto w-24 drop-shadow-[0_3px_0_rgba(21,35,59,0.4)]"
            />
            <p className="mt-6 text-lg font-bold text-white/90">Read with</p>
            <p className="bubble mt-1 break-words text-5xl sm:text-6xl">
              {display}
            </p>
            <div className="mt-5 flex justify-center">
              <span className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-rwm-ink bg-white text-6xl">
                {a.emoji}
              </span>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wide text-white/80">
              A side-by-side learning adventure
            </p>
          </motion.div>
        </div>

        {/* controls */}
        <div className="order-1 text-center md:order-2 md:text-left">
          <h2 className="bubble text-4xl sm:text-5xl">
            Put your child
            <br />
            on the <span className="text-rwm-yellow">cover</span>.
          </h2>
          <p className="mt-4 max-w-md text-lg font-semibold text-white/90 md:mx-0">
            Type their name and pick their hero. Their personalized program
            ships in days — and checkout is the same secure Shopify cart you
            already trust.
          </p>

          <label className="mt-8 block text-sm font-extrabold uppercase tracking-wide text-white/80">
            Your child&apos;s name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 18))}
            placeholder="e.g. Ava"
            className="mt-2 w-full max-w-md rounded-full border-[3px] border-rwm-ink bg-white px-6 py-4 text-lg font-bold text-rwm-ink shadow-[0_4px_0_rgba(21,35,59,1)] outline-none placeholder:text-rwm-ink/40"
          />

          <p className="mt-6 text-sm font-extrabold uppercase tracking-wide text-white/80">
            Choose a hero
          </p>
          <div className="mt-2 flex justify-center gap-3 md:justify-start">
            {accents.map((opt, i) => (
              <button
                key={opt.name}
                onClick={() => setAccent(i)}
                className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-rwm-ink text-2xl transition ${
                  accent === i ? "scale-110 ring-4 ring-rwm-yellow" : "opacity-80"
                }`}
                style={{ background: opt.color }}
                aria-label={opt.name}
              >
                {opt.emoji}
              </button>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <a
              href="#"
              className="btn-pop bg-rwm-yellow px-8 py-4 text-lg text-rwm-ink"
            >
              Continue to checkout · $149
            </a>
            <span className="text-sm font-bold text-white/70">
              🔒 Secure checkout via Shopify
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
