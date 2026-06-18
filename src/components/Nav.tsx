"use client";

import { useEffect, useState } from "react";
import { LockedButton } from "./LockedButton";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#inside", label: "What's inside" },
  { href: "#reviews", label: "Reviews" },
  { href: "#team", label: "Our teachers" },
  { href: "#build", label: "Build a reader" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-rwm-blue/90 backdrop-blur-md shadow-[0_3px_0_rgba(21,35,59,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Logo_Color.avif"
            alt="Read With Me"
            className="h-10 w-auto drop-shadow-[0_2px_0_rgba(21,35,59,0.3)]"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[var(--font-display)] text-base font-semibold text-white/95 transition hover:text-rwm-yellow"
            >
              {l.label}
            </a>
          ))}
        </div>

        <LockedButton className="btn-pop bg-rwm-yellow px-5 py-2.5 text-sm text-rwm-ink sm:text-base">
          Build Your Reader
        </LockedButton>
      </nav>
    </header>
  );
}
