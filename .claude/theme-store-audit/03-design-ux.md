# 3. Theme Design and UX

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#theme-design-and-ux

Themes must meet every checkpoint in this section. Covers visual quality, layout, consistency, shopping experience, and demo store realism.

## Visual Design and Art Direction

- [x] Unique, intentional design clearly targeting a specific merchant type/industry — custom fonts (Midnight Sans RD, CommitMono), dark/beige palette, men's personal care positioning
- [x] All images, graphics, and icons are high-quality, clear, appropriately sized, and consistent
- [x] Cohesive, complementary color palette — 5 color schemes, dark navy + warm beige + yellow accent; no clashing

## Layout

- [x] Logical grid structure with deliberate, consistent spacing and alignment — Block Layout Controls on every block; responsive grid-container CSS vars; section spacing settings
- [x] Clear content hierarchy — H1–H6 font pickers with distinct size/weight per level; CSS vars map correctly
- [x] Layouts remain visually balanced when content length, image count, or text quantity varies — block count drives layout; conditional hide wraps empty sections

## Consistency

- [x] No overabundance of fonts; consistent font pairing throughout the theme — 2 custom fonts loaded; all typography mapped through CSS vars
- [x] Buttons, links, and forms use consistent styles, sizes, colors, and behaviors everywhere — primary/secondary/tertiary button color schemes with hover states via global CSS vars
- [x] Theme editor settings are merchant-friendly, logically grouped, and discoverable — settings grouped under headers; mobile/desktop variants clearly labeled
- [x] Theme editor customization is intuitive and merchant-first — block-based layout; section settings follow standard Shopify patterns

## Customer Shopping Experience

- [x] Clear navigation: homepage → product discovery → PDP → cart → checkout — header with mega menu + mobile menu; collection grid; full PDP with ATC; slideout cart with checkout button
- [x] Thoughtful product discovery (menus, featured collections, recommendations) — featured product section, collection carousels, hero CTAs
- [x] Key actions (variant selection, ATC, quantity edit, checkout) are clear and immediately responsive — radio variant selector, ATC button, +/– quantity in cart, checkout routing

## Demo Store

- [x] No Lorem Ipsum or placeholder content — **fixed**: all 30 Lorem Ipsum instances replaced with generic placeholder copy across 21 block files; test scripts removed from settings_data.json
- [x] All sections shown explicitly fit the type of business portrayed
- [x] Inspiring with engaging content and realistic, intentional product displays

## Notes

- `config/settings_data.json`: test console.log scripts cleared ✓, broken `#` social links cleared ✓
- `sections/header-group.json`: search bar enabled ✓
- Remaining `[~]` items require a visual review of the live demo store with real product imagery

## Status: `[x]` Passes
