"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { includedItems, type IncludedItem } from "@/lib/content";
import { BookDoodle, StarDoodle, HeartDoodle, SunDoodle } from "./Doodle";
import { LockedButton } from "./LockedButton";

const LEAD = 0.06;
const TAIL = 0.06;

// total leaves = cover + each included item
const TOTAL = includedItems.length + 1;
const USABLE = 1 - LEAD - TAIL;
const SEG = USABLE / TOTAL;

function Leaf({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const start = LEAD + index * SEG;
  const end = start + SEG;

  const rotateY = useTransform(progress, [start, end], [0, -180]);
  const zIndex = useTransform(progress, (p) => {
    if (p < start) return TOTAL - index; // stacked, cover on top
    if (p > end) return index; // turned, fanned to the left
    return TOTAL + 5; // actively flipping → on top
  });

  return (
    <motion.div
      style={{
        rotateY,
        zIndex,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
      }}
      className="absolute inset-0"
    >
      {/* front face */}
      <div className="absolute inset-0 [backface-visibility:hidden]">
        {children}
      </div>
      {/* back face (plain page) */}
      <div className="absolute inset-0 rounded-2xl border-[3px] border-rwm-ink bg-rwm-cream [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="flex h-full items-center justify-center opacity-25">
          <BookDoodle size={44} />
        </div>
      </div>
    </motion.div>
  );
}

function Spiral() {
  return (
    <div className="pointer-events-none absolute -left-2 top-0 z-[60] flex h-full flex-col justify-around py-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="h-3 w-5 rounded-full border-[3px] border-rwm-ink bg-white/80"
        />
      ))}
    </div>
  );
}

function ItemFace({ item }: { item: IncludedItem }) {
  return (
    <div
      className={`flex h-full w-full flex-col rounded-2xl border-[3px] border-rwm-ink ${item.pageColor} p-6 sm:p-7`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-rwm-ink text-2xl ${item.badgeColor}`}
        >
          {item.emoji}
        </span>
        <span className="rounded-full border-2 border-rwm-ink bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-rwm-ink">
          {item.kicker}
        </span>
      </div>

      <h3 className="bubble bubble-sm mt-5 text-3xl text-rwm-ink sm:text-[2rem]">
        {item.title}
      </h3>
      <p className="mt-2 text-base font-semibold text-rwm-ink/80">
        {item.desc}
      </p>

      <div className="mt-auto pt-4">
        {item.image ? (
          <div className="overflow-hidden rounded-xl border-[3px] border-rwm-ink bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover sm:h-44"
            />
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border-[3px] border-rwm-ink bg-white/40 sm:h-44">
            <span className="text-7xl">{item.emoji}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CoverFace() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-[3px] border-rwm-ink bg-[radial-gradient(circle_at_center,#5b9bff_0%,#2767f4_55%,#1742b8_100%)] p-6 text-center">
      <StarDoodle className="absolute left-5 top-6 -rotate-6" size={24} />
      <HeartDoodle className="absolute right-6 top-10 rotate-12" size={18} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/Logo_Color.avif"
        alt="Read With Me"
        className="w-32 drop-shadow-[0_3px_0_rgba(21,35,59,0.4)]"
      />
      <p className="bubble mt-6 text-4xl">Read with Leo</p>
      <p className="mt-4 max-w-[16rem] text-sm font-bold text-white/90">
        A side-by-side learning adventure — just 15 minutes a day.
      </p>
      <span className="mt-8 rounded-full border-2 border-rwm-ink bg-rwm-yellow px-4 py-1.5 text-sm font-extrabold text-rwm-ink">
        scroll to open ↓
      </span>
    </div>
  );
}

export function IncludedBook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(
      TOTAL - 1,
      Math.max(0, Math.floor((p - LEAD) / SEG) + 1),
    );
    setActive(idx);
  });

  return (
    <section
      id="inside"
      ref={sectionRef}
      className="relative bg-rwm-red"
      style={{ height: `${TOTAL * 95 + 40}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <SunDoodle className="absolute left-[8%] top-[14%] hidden -rotate-6 sm:block" size={30} />
        <StarDoodle className="absolute right-[10%] top-[20%] hidden rotate-12 sm:block" size={22} />

        <div className="mb-6 text-center">
          <h2 className="bubble text-4xl sm:text-5xl">What&apos;s in the box</h2>
          <p className="mt-2 text-base font-bold text-white/90">
            Scroll to flip through everything your reader gets ↓
          </p>
        </div>

        {/* the book */}
        <div
          className="relative aspect-[3/4] w-[min(86vw,420px)]"
          style={{ perspective: "2200px" }}
        >
          {/* back cover with final CTA, revealed when last page turns */}
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center rounded-2xl border-[3px] border-rwm-ink bg-rwm-blue p-6 text-center">
            <p className="bubble text-3xl">That&apos;s the whole box!</p>
            <p className="mt-3 text-base font-semibold text-white/90">
              Ready to put your child on the cover?
            </p>
            <LockedButton
              wrapperClassName="mt-6"
              className="btn-pop bg-rwm-yellow px-6 py-3 text-base text-rwm-ink"
            >
              Build Your Reader
            </LockedButton>
          </div>

          <Spiral />

          {/* cover leaf */}
          <Leaf index={0} progress={scrollYProgress}>
            <CoverFace />
          </Leaf>

          {/* item leaves */}
          {includedItems.map((item, i) => (
            <Leaf key={item.title} index={i + 1} progress={scrollYProgress}>
              <ItemFace item={item} />
            </Leaf>
          ))}
        </div>

        {/* progress dots */}
        <div className="mt-7 flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 rounded-full border-2 border-rwm-ink transition-all ${
                i === active ? "w-7 bg-rwm-yellow" : "w-2.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
