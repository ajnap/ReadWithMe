# Read With Me — Marketing Site

Marketing/landing site for **Read With Me**, a personalized early-reading program
for beginning readers ages 3 and up. Single-page, scroll-driven, built with
Next.js. This repo is the **marketing front-end only** — the character builder and
checkout are intentionally stubbed (see [Integration points](#integration-points)).

## Stack

- **Next.js 16** (App Router, Turbopack) — ⚠️ see `AGENTS.md`: this is a newer
  Next.js with breaking changes; check `node_modules/next/dist/docs/` before
  relying on older patterns.
- **React 19**
- **Tailwind CSS v4** (config-less; theme tokens live in `src/app/globals.css`)
- **motion** (Framer Motion's `motion/react`) for animation
- **TypeScript**, strict mode

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run this before deploying)
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx        # <html>/<body>, fonts (Fredoka + Nunito), <head> metadata
    page.tsx          # section composition order for the whole page
    globals.css       # brand color tokens + reusable classes (.bubble/.btn-pop/.card-pop)
    icon.png / apple-icon.png / favicon.ico   # generated from the logo
  components/         # one component per page section + shared primitives
  lib/
    content.ts        # ALL site copy/data (features, steps, testimonials, stats)
public/assets/        # images, GIFs, the compressed brand video + poster
```

Page order is defined in `src/app/page.tsx`:
Nav → Hero → Marquee → HowItWorks → Promise → Features → IncludedBook →
Testimonials → MeetTheTeam → BuilderTeaser → Footer.

### Shared primitives
- `Doodle.tsx` — hand-drawn brand icons (Book/Star/Crayon/Heart/Sun/Rocket).
- `LockedButton.tsx` — a CTA that shows a "Coming soon!" bubble instead of
  navigating. Used everywhere a real action isn't wired up yet.
- `Confetti.tsx` — deterministic confetti burst (no SSR hydration mismatch).

## Editing content

Most text lives in `src/lib/content.ts` — edit there, not in the components:
`features`, `steps`, `testimonials`, `stats`, and `includedItems` (the flip-book).

## Brand system

Colors and type are defined once in `src/app/globals.css`:
`--color-rwm-blue/-blue-deep/-sky/-red/-yellow/-cream/-ink`, used via Tailwind
classes like `bg-rwm-blue`, `text-rwm-ink`. Reusable classes: `.bubble`
(outlined display text), `.btn-pop` (chunky button), `.card-pop` (outlined card).

## Integration points

These are the stubs a new team needs to replace:

1. **Character builder** — `src/components/BuilderTeaser.tsx`
   - It's a **live preview teaser only**. The name `<input>` and hero picker
     update local React state (`name`, `accent`) to render a preview card.
     **Nothing is submitted anywhere.**
   - `accents` (Leo / Mia / Theo) is **placeholder data** — replace with the real
     character options (likely Shopify product/variant data).
2. **Checkout / commerce** — currently no checkout exists.
   - CTAs use `LockedButton` ("Build Your Reader", "Join the waitlist") which just
     show "Coming soon!". Replace these with real navigation/cart actions.
   - NOTE: earlier `$149` / Shopify / "secure checkout" copy was removed because
     it triggered phishing/scam filters on the temporary `*.vercel.app` domain.
     Re-introduce commerce copy only on the real custom domain.

## Deploy

Hosted on **Vercel** (auto-deploys on push to `main`). Framework Preset **must be
Next.js** (a misconfigured "Other" preset serves a 404 at `/`).

The production link should move to the custom domain **readwithme.co** (owned by
CJ) for trust/SEO — Vercel → Project → Settings → Domains, then add the DNS
records at the registrar.

## Unused assets

`public/assets/` contains extra images not currently referenced in code, kept for
the builder/future use: `Character_1.webp`, `KickstartPic1.avif`,
`KickstartPic3.avif`, `Pic6.avif`, `Pic_Items.webp`, `Pic_L1.webp`, `SmallBook.jpg`,
`Smallbookpic.avif`, `bookpic.avif`.
