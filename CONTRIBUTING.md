# Contributing

## Setup

```bash
npm install
cp .env.example .env.local   # optional today; needed for commerce integration
npm run dev                  # http://localhost:3000
```

## Before you push

```bash
npm run lint
npm run build   # must pass — Vercel runs this on deploy
```

## Workflow

- `main` is the production branch — **every push to `main` auto-deploys to Vercel.**
  Work on a feature branch and open a PR for anything non-trivial.
- Keep commits focused; the build must stay green.

## Conventions

- **Content/copy lives in `src/lib/content.ts`** — edit data there, not inside
  components, wherever possible.
- **Brand colors & shared styles** are defined once in `src/app/globals.css`
  (`--color-rwm-*` tokens; `.bubble`, `.btn-pop`, `.card-pop`). Reuse them.
- **One component per page section** in `src/components/`, composed in
  `src/app/page.tsx`.
- **Unfinished CTAs** should use `<LockedButton>` (shows "Coming soon!") rather
  than dead `href="#"` links.
- **Mobile-only / desktop-only** styling uses Tailwind breakpoints (e.g.
  `hidden sm:block`). Decorative floating doodles are hidden on mobile by design.
- **Next.js 16** — see `AGENTS.md`; check `node_modules/next/dist/docs/` before
  assuming older Next patterns.

## Integration work

Character builder + Shopify: see [`docs/INTEGRATION.md`](docs/INTEGRATION.md) and
the contract in `src/lib/commerce.ts`.
