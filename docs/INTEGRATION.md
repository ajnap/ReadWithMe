# Integration guide — character builder & Shopify checkout

This site is the marketing front-end. The "Build Your Reader" experience is a
**preview teaser** today; this doc is for the team wiring up the real character
builder and commerce.

## Current state (what's stubbed)

| Piece | Where | Status |
| --- | --- | --- |
| Character builder UI | `src/components/BuilderTeaser.tsx` | Live preview only — name input + hero picker drive local state to render a card. **Nothing is submitted.** |
| Character data | `accents` in `BuilderTeaser.tsx` | Placeholder (`Leo/Mia/Theo`), typed as `CharacterOption[]`. |
| Commerce contract | `src/lib/commerce.ts` | Types (`CharacterOption`, `ReaderOrder`) + `startCheckout()` stub that throws. |
| CTAs | `LockedButton` (nav, flip-book, builder) | Show a "Coming soon!" bubble instead of navigating. |

## Recommended approach (Shopify Storefront API)

1. **Add credentials** — copy `.env.example` → `.env.local`, set
   `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`.
2. **Model characters as products/variants** — give each `CharacterOption` a real
   `variantId`. Replace the placeholder `accents` array (ideally move it to
   `src/lib/content.ts` or fetch it from Shopify).
3. **Implement `startCheckout()`** in `src/lib/commerce.ts`:
   - Create a Storefront cart with the selected `variantId`.
   - Attach the child's name as a line-item custom attribute (so it flows to
     fulfillment).
   - Redirect the browser to the returned `cart.checkoutUrl`.
4. **Wire the CTA** — in `BuilderTeaser.tsx`, swap the `<LockedButton>` for a real
   button that calls `startCheckout({ childName: name, character: accents[accent] })`.
5. **Re-introduce commerce copy** (price, "secure checkout", etc.) — but only on
   the **custom domain** (`readwithme.co`). That copy was removed because it
   triggered phishing/scam filters on the temporary `*.vercel.app` domain.

## Notes

- Keep the Admin API token server-only (no `NEXT_PUBLIC_` prefix); use a Route
  Handler / Server Action if you need privileged calls.
- The preview card styling reads `character.color` for its gradient — keep that
  field populated for real characters.
- `LockedButton` can stay for any CTA that genuinely isn't ready yet.
