import { doodleSet } from "./Doodle";

const phrases = [
  "Personalized for your child",
  "Just 15 minutes a day",
  "Classroom-proven",
  "60 guided lessons",
  "Built by real teachers",
  "Reading from day one",
];

export function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden border-y-[3px] border-rwm-ink bg-rwm-yellow py-3">
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {row.map((p, i) => {
          // Cycle through the doodle set so the separator changes every phrase.
          const Doodle = doodleSet[i % doodleSet.length];
          return (
            <span key={i} className="flex items-center gap-6">
              <span className="font-[var(--font-display)] text-lg font-bold text-rwm-ink">
                {p}
              </span>
              <Doodle size={22} className="-rotate-6" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
