type DoodleProps = {
  className?: string;
  size?: number;
};

// Hand-drawn, kid-style spot icons that echo the brand's chunky-ink look.
// These replace the old generic 4-point "sparkle" decoration. Each is drawn
// with a heavy ink outline + flat brand-color fills so they read as crafted,
// not stock.

const ink = "#15233b";

export function BookDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M16 7C12 4 6 4 4 5v20c2-1 8-1 12 2 4-3 10-3 12-2V5c-2-1-8-1-12 2Z" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 7v22" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 11c2-.5 4-.5 6 0M7 15c2-.5 4-.5 6 0M19 11c2-.5 4-.5 6 0M19 15c2-.5 4-.5 6 0" stroke="#38b6ff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function StarDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M16 3l3.6 7.6 8.4 1-6.1 5.8 1.6 8.3L16 23.6 8.5 25.7l1.6-8.3L4 11.6l8.4-1L16 3Z" fill="#ffc012" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function CrayonDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="11" y="9" width="10" height="18" rx="2" transform="rotate(20 16 18)" fill="#ff3b2e" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 6l3.5 1.7-1.2 3.7" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M16 27C7 21 4 16 4 11.5 4 8 7 5 10.5 5 13 5 15 6.5 16 8c1-1.5 3-3 5.5-3C25 5 28 8 28 11.5 28 16 25 21 16 27Z" fill="#ff3b2e" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function SunDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="7" fill="#ffc012" stroke={ink} strokeWidth="2" />
      <path d="M16 2v3M16 27v3M2 16h3M27 16h3M6 6l2 2M24 24l2 2M26 6l-2 2M8 24l-2 2" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RocketDoodle({ className = "", size = 28 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M16 3c5 3 7 8 7 13l-3 3h-8l-3-3c0-5 2-10 7-13Z" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="13" r="2.4" fill="#38b6ff" stroke={ink} strokeWidth="2" />
      <path d="M9 19l-3 2 1 4 4-3M23 19l3 2-1 4-4-3" fill="#ff3b2e" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 25c0 2 2 4 2 4s2-2 2-4" fill="#ffc012" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Ordered set used by the marquee + scattered decoration so the same shape
// never repeats back-to-back.
export const doodleSet = [BookDoodle, StarDoodle, HeartDoodle, CrayonDoodle, SunDoodle, RocketDoodle];
