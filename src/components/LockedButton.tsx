"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <rect x="5" y="10" width="14" height="10" rx="2" fill="#15233b" />
      <path
        d="M8 10V7.5a4 4 0 1 1 8 0V10"
        fill="none"
        stroke="#15233b"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.6" fill="#ffc012" />
    </svg>
  );
}

// A button that looks like a CTA but isn't wired up yet — clicking it shows a
// brief "Coming soon!" bubble instead of navigating anywhere.
export function LockedButton({
  children,
  className = "",
  wrapperClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2200);
  };

  return (
    <span className={`relative inline-flex ${wrapperClassName}`}>
      <button type="button" onClick={handleClick} className={className}>
        <span className="inline-flex items-center gap-2">
          <LockIcon />
          {children}
        </span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-rwm-ink bg-white px-3.5 py-1.5 text-sm font-extrabold text-rwm-ink shadow-[0_3px_0_rgba(21,35,59,1)]"
          >
            Coming soon! ✨
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
