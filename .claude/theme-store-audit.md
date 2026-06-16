# Shopify Theme Store Requirements — Audit Index

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements
**Theme:** essential-man (Manufactur)
**Audit started:** 2026-06-16

Shopify requires themes to pass **every** checkpoint. Each category has its own file in `.claude/theme-store-audit/`.

## Legend
- `[ ]` Not yet checked
- `[x]` Passes
- `[~]` Partial / needs work
- `[!]` Fails — action required

---

## Workflow Rules

1. **Work per numbered category** — address each category's checklist items in order.
2. **Fix everything fixable in the codebase** — edit files, update Liquid/JSON/SCSS as needed.
3. **Non-codebase items get logged, not blocked** — for items that require manual action outside the codebase (e.g. partner dashboard settings, store policies, listing content, manual submissions), create `theme-store-audit-notes.md` in the repo root and add an entry for that category listing those items. The category is still considered **done** — the notes file is for the user's manual follow-up after the codebase pass is complete.
4. **Never leave a category unfinished** just because some items can't be resolved in code.

---

## Progress

| # | Category | File | Status | Notes |
|---|---|---|---|---|
| 1 | Theme Store Exclusivity | [01-exclusivity.md](theme-store-audit/01-exclusivity.md) | `[!]` | Remove 4 dev credit instances (layout/theme.liquid, layout/password.liquid, _footer__copyright.liquid, footer__socket.liquid) |
| 2 | Uniqueness from Other Themes | [02-uniqueness.md](theme-store-audit/02-uniqueness.md) | `[x]` | Proprietary codebase, no Dawn/Horizon; distinct section composition, UGC video strip, typographic banners |
| 3 | Theme Design and UX | [03-design-ux.md](theme-store-audit/03-design-ux.md) | `[x]` | All checkpoints pass. Lorem Ipsum cleared, test scripts removed, search enabled. |
| 4 | Features | [04-features.md](theme-store-audit/04-features.md) | `[ ]` | |
| 5 | Templates, Sections, and Blocks | [05-templates-sections-blocks.md](theme-store-audit/05-templates-sections-blocks.md) | `[ ]` | |
| 6 | Lighthouse Performance & Accessibility | [06-lighthouse.md](theme-store-audit/06-lighthouse.md) | `[ ]` | |
| 7 | Pages | [07-pages.md](theme-store-audit/07-pages.md) | `[ ]` | |
| 8 | Consistency and Functionality | [08-consistency-functionality.md](theme-store-audit/08-consistency-functionality.md) | `[ ]` | |
| 9 | Browser Compatibility | [09-browser-compatibility.md](theme-store-audit/09-browser-compatibility.md) | `[ ]` | |
| 10 | Assets | [10-assets.md](theme-store-audit/10-assets.md) | `[ ]` | |
| 11 | SEO | [11-seo.md](theme-store-audit/11-seo.md) | `[ ]` | |
| 12 | Accessibility | [12-accessibility.md](theme-store-audit/12-accessibility.md) | `[ ]` | |
| 13 | Social Media | [13-social-media.md](theme-store-audit/13-social-media.md) | `[ ]` | |
| 14 | Settings | [14-settings.md](theme-store-audit/14-settings.md) | `[ ]` | |
| 15 | Font Picker | [15-font-picker.md](theme-store-audit/15-font-picker.md) | `[ ]` | |
| 16 | Color System | [16-color-system.md](theme-store-audit/16-color-system.md) | `[ ]` | |
| 17 | Responsive Images | [17-responsive-images.md](theme-store-audit/17-responsive-images.md) | `[ ]` | |
| 18 | Naming Themes and Presets | [18-naming.md](theme-store-audit/18-naming.md) | `[ ]` | |
| 19 | Theme Versions and Release Notes | [19-versions-release-notes.md](theme-store-audit/19-versions-release-notes.md) | `[ ]` | |
| 20 | Demo Stores | [20-demo-stores.md](theme-store-audit/20-demo-stores.md) | `[ ]` | |
| 21 | Documentation and Contact Forms | [21-documentation-contact.md](theme-store-audit/21-documentation-contact.md) | `[ ]` | |
| 22 | Supporting Your Theme | [22-support.md](theme-store-audit/22-support.md) | `[ ]` | |
