"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LockedButton } from "./LockedButton";
import { REPLAY_INTRO_EVENT } from "./Preloader";
import { heroReveal } from "@/lib/heroReveal";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#inside", label: "What's inside" },
  { href: "#reviews", label: "Reviews" },
  { href: "#team", label: "Our teachers" },
  { href: "#build", label: "Build a reader" },
];

export function Nav() {
  // The logo stays visible the whole time. On desktop the links + CTA fade in
  // with the hero reveal, and the header background only turns blue once you've
  // scrolled past the video hero section. Mobile keeps the classic behavior.
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const dq = window.matchMedia("(min-width: 640px)");
    // On desktop, hold the transparent header until past the pinned hero
    // (its scroll height minus one viewport). Otherwise switch at 40px.
    const threshold = () => {
      const hero = document.getElementById("top");
      return dq.matches && hero ? hero.offsetHeight - window.innerHeight : 40;
    };
    let t = threshold();
    const onScroll = () => setScrolled(window.scrollY > t);
    const recompute = () => {
      setIsDesktop(dq.matches);
      t = threshold();
      onScroll();
    };
    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    dq.addEventListener("change", recompute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
      dq.removeEventListener("change", recompute);
    };
  }, []);

  // Links + CTA fade with the hero reveal on desktop; always visible on mobile.
  const itemStyle = isDesktop ? { opacity: heroReveal } : undefined;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-rwm-blue/90 backdrop-blur-md shadow-[0_3px_0_rgba(21,35,59,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        {/* Logo — visible the whole time */}
        <a
          href="#top"
          onClick={() => window.dispatchEvent(new Event(REPLAY_INTRO_EVENT))}
          className="flex items-center gap-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Logo_Color.avif"
            alt="Read With Me"
            className="h-10 w-auto drop-shadow-[0_2px_0_rgba(21,35,59,0.3)]"
          />
        </a>

        <motion.div
          style={itemStyle}
          className="hidden items-center gap-7 opacity-100 sm:opacity-0 md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[var(--font-display)] text-base font-semibold text-white/95 transition hover:text-rwm-yellow"
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        <motion.div style={itemStyle} className="opacity-100 sm:opacity-0">
          <LockedButton className="btn-pop bg-rwm-yellow px-5 py-2.5 text-sm text-rwm-ink sm:text-base">
            Build Your Reader
          </LockedButton>
        </motion.div>
      </nav>
    </header>
  );
}
