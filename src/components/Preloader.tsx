"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookDoodle, StarDoodle, HeartDoodle, SunDoodle } from "./Doodle";
import { Confetti } from "./Confetti";

// Timeline: doodles pop in around the logo → confetti pop sends them flying →
// curtain wipes up to reveal the page.
const BURST_MS = 620; // when the confetti pop fires
const HOLD_MS = 1450; // when the curtain wipes up

export const REPLAY_INTRO_EVENT = "rwm:replay-intro";

// Doodles cluster at the logo's corners, then fly outward on the burst.
const doodles = [
  { C: StarDoodle, pos: "left-[37%] top-[37%]", size: 34, fly: { x: -300, y: -250, rotate: -200 } },
  { C: BookDoodle, pos: "right-[37%] top-[36%]", size: 40, fly: { x: 300, y: -250, rotate: 200 } },
  { C: HeartDoodle, pos: "left-[38%] bottom-[37%]", size: 30, fly: { x: -300, y: 250, rotate: -160 } },
  { C: SunDoodle, pos: "right-[38%] bottom-[36%]", size: 34, fly: { x: 300, y: 250, rotate: 160 } },
];

export function Preloader() {
  // Start visible so the page never flashes before the intro on first load.
  const [show, setShow] = useState(true);
  const [burst, setBurst] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const play = () => {
      clearTimers();
      setBurst(false);
      setShow(true);
      timers.current.push(setTimeout(() => setBurst(true), BURST_MS));
      timers.current.push(setTimeout(() => setShow(false), HOLD_MS));
    };

    play(); // plays on every page load / reload

    const replay = () => play();
    window.addEventListener(REPLAY_INTRO_EVENT, replay);
    return () => {
      clearTimers();
      window.removeEventListener(REPLAY_INTRO_EVENT, replay);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-gradient-to-b from-rwm-sky via-rwm-blue to-rwm-blue-deep"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <Confetti fire={burst} />

          {doodles.map(({ C, pos, size, fly }, i) => (
            <motion.span
              key={i}
              className={`absolute ${pos}`}
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={
                burst
                  ? { ...fly, scale: [1, 1.25, 0.6], opacity: [1, 1, 0] }
                  : { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
              }
              transition={
                burst
                  ? { duration: 0.7, ease: "easeOut" }
                  : { type: "spring", stiffness: 320, damping: 12, delay: 0.12 + i * 0.06 }
              }
            >
              <C size={size} />
            </motion.span>
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 12 }}
            animate={
              burst
                ? { scale: 1.08, opacity: 1, y: 0 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ type: "spring", stiffness: 240, damping: 13 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Logo_Color.avif"
              alt="Read With Me"
              className="w-52 drop-shadow-[0_5px_0_rgba(21,35,59,0.45)] sm:w-72"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
