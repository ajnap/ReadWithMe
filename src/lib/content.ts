export type IncludedItem = {
  kicker: string;
  title: string;
  desc: string;
  image?: string;
  emoji: string;
  pageColor: string; // tailwind bg class for the page
  badgeColor: string; // tailwind bg class for the icon badge
};

// The flip-book pages. Index 0 is the cover (rendered specially).
export const includedItems: IncludedItem[] = [
  {
    kicker: "60 lessons",
    title: "Your Custom Workbook",
    desc: "A personalized, 60-lesson workbook that walks you and your child through reading, one fun page at a time.",
    image: "/assets/Gif3.webp",
    emoji: "📖",
    pageColor: "bg-white",
    badgeColor: "bg-rwm-red",
  },
  {
    kicker: "60+ minibooks",
    title: "A Library of Minibooks",
    desc: "Professionally illustrated minibooks that get your child reading real stories from day one.",
    image: "/assets/Bookgif.webp",
    emoji: "📚",
    pageColor: "bg-white",
    badgeColor: "bg-rwm-sky",
  },
  {
    kicker: "50+ cards",
    title: "Sound & Sight Flashcards",
    desc: "Flashcards with letters and actions that make sounds and sight words stick.",
    image: "/assets/flashcards.jpg",
    emoji: "🃏",
    pageColor: "bg-white",
    badgeColor: "bg-rwm-yellow",
  },
  {
    kicker: "28 of them",
    title: "Songs & Videos",
    desc: "Catchy songs and videos that reinforce every lesson in a way kids actually remember.",
    emoji: "🎵",
    pageColor: "bg-rwm-sky",
    badgeColor: "bg-rwm-yellow",
  },
  {
    kicker: "60+ stickers",
    title: "Reward Stickers",
    desc: "A sticker sheet that celebrates progress and keeps your reader motivated lesson after lesson.",
    image: "/assets/Characters_2.webp",
    emoji: "⭐",
    pageColor: "bg-rwm-yellow",
    badgeColor: "bg-rwm-red",
  },
  {
    kicker: "the finale",
    title: "Completion Certificate",
    desc: "A keepsake certificate to crown your child the reader they just became.",
    emoji: "🏆",
    pageColor: "bg-rwm-cream",
    badgeColor: "bg-rwm-blue",
  },
];

export const stats = [
  { value: "60", label: "guided lessons" },
  { value: "50+", label: "years teaching" },
  { value: "15", label: "minutes a day" },
  { value: "3+", label: "ages & up" },
];

// The "why it's different" pillars (sourced from the brand's WhyRWM material).
// `featured` items render as the two large hero cards; the rest are the
// supporting icon cards below them.
export type Feature = {
  icon: "star" | "sun" | "book" | "heart" | "rocket";
  title: string;
  desc: string;
  featured?: boolean;
  highlight?: string; // short stat/emphasis shown on featured cards
};

export const features: Feature[] = [
  {
    icon: "star",
    title: "Personalized Learning Materials",
    desc: "Your child's name and face are woven into the program, so every lesson feels made just for them.",
    featured: true,
    highlight: "Their name & face in every lesson",
  },
  {
    icon: "rocket",
    title: "Classroom-Proven Method",
    desc: "Developed and refined by two real teachers — the same approach that's worked in their classrooms for decades.",
    featured: true,
    highlight: "50+ years combined experience",
  },
  {
    icon: "sun",
    title: "Interactive & Multi-Sensory",
    desc: "Kids stay engaged through storytelling, music, and hands-on exercises — not a passive screen.",
  },
  {
    icon: "book",
    title: "Structured & Easy to Follow",
    desc: "No prep work required. Open the book and start teaching right away.",
  },
  {
    icon: "heart",
    title: "Fits Your Busy Schedule",
    desc: "15-minute daily lessons built for busy parents and short attention spans.",
  },
];

// The 4-step "How does it work?" process (sourced from the brand's Kickstarter material).
export type Step = {
  title: string;
  desc: string;
};

export const steps: Step[] = [
  {
    title: "Custom Character",
    desc: "Customize your character and order your personalized Read with Me™ program.",
  },
  {
    title: "Open the Lesson",
    desc: "Each day, just open the lesson — everything is laid out for you, so there's no prep work needed.",
  },
  {
    title: "Practice Together",
    desc: "Follow the simple exercises together — designed to build confidence and make reading fun!",
  },
  {
    title: "Celebrate Progress",
    desc: "Each lesson builds on the last, so every day your child gets better and better — until they're reading full sentences and stories!",
  },
];

// Real parent reviews (sourced from the brand's testimonials material).
export type Testimonial = {
  quote: string;
  name: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I loved using the Read with Me™ program for my daughter! The lessons were a quick and easy 15 minutes so it's manageable to stay consistent. My daughter looked forward to these lessons and it helped her build confidence and enjoy reading.",
    name: "Marissa P.",
  },
  {
    quote:
      "We love this reading program! When my son started school, he didn't know his letters and sounds and I was pretty worried about him. When we were introduced to this program it seemed like a great fit. Between the videos and the books it was really fun and creative for him and it was great to watch him grow in his confidence for reading.",
    name: "Angelina W.",
  },
];
