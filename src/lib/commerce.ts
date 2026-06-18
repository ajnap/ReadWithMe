// Commerce + character-builder integration contract.
//
// These types define the boundary the integrating team implements. Nothing here
// is wired up yet — the marketing site only uses the `CharacterOption` type to
// shape its placeholder data in `components/BuilderTeaser.tsx`.
//
// See docs/INTEGRATION.md for the recommended Shopify Storefront API approach.

export type CharacterOption = {
  /** Display name shown in the builder + on the preview card. */
  name: string;
  /** Accent color (hex) used for the preview card's gradient. */
  color: string;
  /** Placeholder emoji art — replace with real character artwork. */
  emoji: string;
  /** Shopify product/variant id, once commerce is wired up. */
  variantId?: string;
};

export type ReaderOrder = {
  /** The child's name, personalized into the program. */
  childName: string;
  /** The selected character. */
  character: CharacterOption;
};

/**
 * Start checkout for a personalized reader.
 *
 * TODO(integrating team): implement with the Shopify Storefront API —
 *   1. Create a cart with `character.variantId`.
 *   2. Attach `childName` as a line-item custom attribute.
 *   3. Redirect the browser to the returned `cart.checkoutUrl`.
 * Then replace the <LockedButton> in `BuilderTeaser.tsx` with a call to this.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function startCheckout(_order: ReaderOrder): Promise<never> {
  throw new Error(
    "startCheckout is not implemented yet — see docs/INTEGRATION.md",
  );
}
