# Handoff checklist

Steps to hand this project to a new dev team. The build is the marketing site;
the work to integrate is the character builder + Shopify checkout
(see [`docs/INTEGRATION.md`](docs/INTEGRATION.md)).

## 1. GitHub repo access
- **Quick:** repo → Settings → Collaborators → add the devs with **Write** access.
- **Better for a team:** create a GitHub **Organization**, transfer this repo into
  it, add the devs as a team (unties ownership from a personal account).
- **Before granting access:** enable **branch protection on `main`** (Settings →
  Branches) to require PRs + passing CI — pushes to `main` auto-deploy to prod.

## 2. Vercel (deploys)
- Add the devs to the Vercel project/team (project → Settings → Members), or
  transfer the project to a Vercel Team.
- If the repo moves to a GitHub org, **reconnect** Vercel to the new repo location.
- Framework Preset **must be Next.js** (an "Other" preset serves a 404 at `/`).

## 3. Domain — readwithme.co
- Owned by **CJ**. Decide who manages DNS: CJ adds the records Vercel provides,
  or CJ grants the team registrar access.
- Moving to this real domain also clears the "scam" warnings seen on the
  temporary `*.vercel.app` link.

## 4. Shopify (for the integration)
- The Shopify store owner adds the dev team as **staff**.
- They'll create the character products/variants and a **Storefront API token**
  → put it in `.env.local` (template: `.env.example`).

## 5. Source assets
- The repo only contains **web-compressed** media. High-res originals (full
  `Customer_Reactions.mp4`, raw GIFs, etc.) live outside git — share that folder
  via Drive/Dropbox if the team needs to re-encode anything.

## 6. Onboarding order
Point new devs at the docs in this order:
1. `README.md` — overview, stack, structure
2. `CONTRIBUTING.md` — setup, workflow, conventions
3. `docs/INTEGRATION.md` + `src/lib/commerce.ts` — the builder/Shopify work

## Quick verify after access is granted
```bash
git clone <repo-url> && cd site
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass
```
