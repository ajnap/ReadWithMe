import { motionValue } from "motion/react";

// Shared 0→1 signal for how far the desktop hero "assembly" has revealed.
// The Hero drives it from scroll; the Nav reads it so the header fades in only
// once the hero content appears. Stays 0 on mobile (Nav ignores it there).
export const heroReveal = motionValue(0);
