# Manufactur Core Starter Theme
Custom Shopify theme built for Essential Man. Not Dawn-based.

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Shopify CLI | latest | Theme dev server + deployment |
| Tailwind CSS | v4.2.4 | Primary styling (100% migrated) |
| SCSS / Sass | 1.38.1 | Exceptions only (schema classes, third-party DOM) |
| Alpine.js | — | Interactivity |
| GSAP | — | Animations |
| Gulp | 4.0.2 | JS/SCSS build pipeline |

---

## Development Setup

### Prerequisites

- Node.js (LTS)
- Shopify CLI (`npm install -g @shopify/cli`)
- Run `npm install` to install all dependencies

### Starting Development

Run everything in parallel (recommended):

```bash
npm run dev
```

This starts three concurrent processes:
- `dev:shopify-3.0` — Shopify theme dev server with hot reload (`shopify theme serve`)
- `dev:gulp` — Gulp watcher (SCSS + JS compilation with sourcemaps)
- `dev:tw` — Tailwind CSS watcher (compiles `tailwind.input.css` → `assets/mfr-styles.css`)

### Individual Watchers

```bash
npm run watch:shopify   # Shopify CLI only
npm run watch:gulp      # SCSS + JS compilation only
npm run watch:tw        # Tailwind CSS only
```

### Production Build

```bash
npm run build
```

Compiles all SCSS/JS via Gulp and then runs a final Tailwind CSS build. Run this before pushing to production.

### Pulling from Shopify

```bash
npm run pull
```

Pulls the live theme files down without deleting local-only files (uses `--nodelete`).

### Gulp Tasks (what gets compiled)

| Task | Input | Output |
|------|-------|--------|
| `sass` | `styles/theme.scss` | `assets/theme.css` |
| `sections` | `styles/sections/*.scss` | `assets/<filename>.css` (one per section) |
| `components` | `scripts/components/*.js` | `assets/mfr-component__<Name>.min.js` |
| `js` | `scripts/theme/*.js` | `assets/<name>.min.js` |
| `gsap` | `scripts/gsap/*.js` | `assets/mfr-gsap.js` (all GSAP plugins bundled) |
| `quickload` | `styles/quickload-css.scss` | `snippets/quickload-css.liquid` (critical CSS) |

Gulp watches for file changes and recompiles only the affected file, with a 100ms debounce on section SCSS.

---

## Folder: `blocks/`

Blocks are reusable content pieces added inside sections. Every block lives in its own file.

### Naming Convention

```
_<section-name>__<block-name>.liquid
```

Examples:
- `_footer__menu.liquid` — Menu block inside the footer section
- `_product-top__submit-button.liquid` — Submit button block inside the product top section
- `_mfr-core__text-list__item.liquid` — List item block inside the text-list section

The schema `"type"` field must match the full filename minus `.liquid`:

```json
"type": "_mfr-core__text-list__item"
```

Never abbreviate (e.g. `"item"` is wrong).

### Schema Requirements

Every block must have a schema with all four keys:

```liquid
{% schema %}
{
  "name": "Human Readable Name",
  "class": "bem-class-name",
  "settings": [],
  "blocks": [],
  "presets": [{ "name": "Human Readable Name" }]
}
{% endschema %}
```

- `"class"` — BEM class names only. No Tailwind utilities. Shopify rejects `[` and `]` characters. 200-character limit.
- `"settings": []` — empty array if no settings
- `"blocks": []` — empty array if no nested blocks
- `"presets"` — required for the block to appear in the editor

### Markup Convention

Every block must have an outer wrapper and inner container:

```liquid
<div class="my-block">
  <div class="my-block__inner">
    ...
  </div>
</div>
```

Every child element needs a BEM class — not just the wrappers. This keeps elements targetable without structural selectors:

```liquid
<div class="my-block">
  <div class="my-block__inner">
    <div class="my-block__media">...</div>
    <div class="my-block__content">
      <div class="my-block__title"><p>{{ block.settings.title }}</p></div>
      <div class="my-block__text"><p>{{ block.settings.text }}</p></div>
      <a class="my-block__button button primary">Shop Now</a>
    </div>
  </div>
</div>
```

### Styled Text Rule

Never put font, size, color, or spacing Tailwind classes on a `<p>` tag. Wrap it in a `<div>` instead:

```liquid
{{/* Wrong */}}
<p class="my-block__title text-[34px] font-[500] uppercase">Text</p>

{{/* Correct */}}
<div class="my-block__title text-[34px] font-[500] uppercase"><p>Text</p></div>
```

### Schema Settings — Grouping

Group related settings under a `"header"` input:

```json
{
  "type": "header",
  "content": "Image Settings"
},
{
  "type": "image_picker",
  "id": "image",
  "label": "Image"
}
```

### Common Block Setting Groups

These reusable setting groups can be added to any block schema. Full JSON for each lives in `.claude/instructions/settings-groups/block-settings.md`.

#### Aspect Ratio Settings
Two selects (mobile + desktop) with standard presets (9:16, 1:1, 16:9, etc.) plus a Custom option that reveals a text input via `visible_if`. Resolve in Liquid before applying:

```liquid
{%- assign ar_mobile = block.settings.aspect_ratio_mobile_custom | default: block.settings.aspect_ratio_mobile -%}
{%- assign ar_desktop = block.settings.aspect_ratio_desktop_custom | default: block.settings.aspect_ratio_desktop -%}
```

Apply as:
```html
<div class="aspect-[{{ ar_mobile }}] large:aspect-[{{ ar_desktop }}] w-full overflow-hidden">
```

#### Font Settings
Override typography per block: font family (CSS class), font case, font size, line-height, letter-spacing, font weight — all mobile + desktop. Gated behind an "Override Font Styles" checkbox. Render the CSS snippet in markup:

```liquid
{%- render "settings__font-settings" -%}
```

Apply font family as a class on the target element:

```liquid
<div class="my-block__text {{ block.settings.font_family }}">
```

#### Block Layout Controls
Width, padding, and margin controls per breakpoint with unit selection (px, %, vw, custom). Render the snippet:

```liquid
{%- render "settings__block-layout-controls" -%}
```

Always add Block Layout Controls as the **last** group in a block's settings array.

#### Column Inner Max Width
Controls `max-width` on the `__inner` div per breakpoint. Used in column blocks.

#### Column Order Settings
Controls CSS `order` per breakpoint, enabling different visual ordering on mobile vs desktop.

### Blocks by Section (key groups)

| Prefix | Section |
|--------|---------|
| `_header__*` | Header navigation |
| `_footer__*` | Footer columns, menus, social links |
| `_product-top__*` | PDP gallery, info, price, variants, add-to-cart |
| `_mfr-core__text-list__*` | Text list items |
| `_mfr-core__featured-product__*` | Featured product cards |
| `_offcanvas-menu__*` | Mobile menu items, social icons |
| `_hero-section__*` | Hero carousel slides |
| `_image-video-banner__*` | Image/video carousel |
| `_customer-testimonials__*` | Testimonial variants (v1–v4) |
| `_mfr-product__*` | Features, ingredients, how-to-use blocks |
| `_collection-*` | Collection carousel/grid/list |
| `_article-*` | Article header, content, comments, related |
| `_blog-*` | Blog grid, carousel, featured article |

---

## Folder: `scripts/`

```
scripts/
├── components/    Alpine.js components (18 files)
├── gsap/          GSAP plugin files (11 files)
└── theme/         Global theme utilities (8 files)
```

### `scripts/components/` — Alpine.js Components

Each file is a self-contained Alpine component compiled to `assets/mfr-component__<Name>.min.js`.

**Naming convention:** `MFR` + PascalCase, matching the `Alpine.data()` key and the filename.

#### Boilerplate

Copy `scripts/components/alpine-script-boilerplate.js` and replace `MFRComponentName`:

```javascript
window._mfrAlpineRegistered = window._mfrAlpineRegistered || {};

if (!window._mfrAlpineRegistered["MFRComponentName"]) {
  document.addEventListener("alpine:init", () => {
    Alpine.data("MFRComponentName", () => ({
      // state properties here

      init() {
        // runs on component mount
      },

      // methods here
    }));
  });

  window._mfrAlpineRegistered["MFRComponentName"] = true;
}
```

The `_mfrAlpineRegistered` guard prevents the component from registering twice if the script is included on a page multiple times.

#### Loading a Component in Liquid

Use the `script__section` snippet to defer-load a component:

```liquid
{%- render "script__section", file: "MFRComponentName.js" -%}
```

This outputs `<script src="assets/mfr-component__MFRComponentName.min.js" defer></script>`.

#### Using the Component

Wire the component in Liquid with `x-data`:

```liquid
<div x-data="MFRComponentName">
  ...
</div>
```

#### Available Components

| File | x-data key | Purpose |
|------|-----------|---------|
| `MFRCarousel.js` | `MFRCarousel` | Flickity carousel with lazy init, mobile settings, video autoplay |
| `MFRCarouselMarquee.js` | `MFRCarouselMarquee` | Auto-scrolling marquee carousel |
| `MFRProductVariantSelector.js` | `MFRProductVariantSelector` | AJAX variant selection without page reload |
| `MFRProductForm.js` | `MFRProductForm` | Add-to-cart form, quantity, subscription |
| `MFRProductTop.js` | `MFRProductTop` | PDP coordination (gallery + form) |
| `MFRProductSubscriptionSelector.js` | `MFRProductSubscriptionSelector` | Subscribe & save option picker |
| `MFRMegaMenu.js` | `MFRMegaMenu` | Desktop mega menu open/close with 300ms delay |
| `MFRDropdownMenu.js` | `MFRDropdownMenu` | Accessible dropdown menus (mouse, focus, keyboard) |
| `MFRSearch.js` | `MFRSearch` | Predictive search input handler |
| `MFRArticlesFetcher.js` | `MFRArticlesFetcher` | AJAX blog article fetching |
| `MFRCommentForm.js` | `MFRCommentForm` | Article comment form |
| `MFRDiscountCodeOnCart.js` | `MFRDiscountCodeOnCart` | Discount code input in cart |
| `MFRDragScroll.js` | `MFRDragScroll` | Click-and-drag horizontal scroll |
| `MFRMatchHeight.js` | `MFRMatchHeight` | Equalises heights across sibling elements |
| `MFRSectionScale.js` | `MFRSectionScale` | Section scale/zoom animation |
| `MFRTextCycle.js` | `MFRTextCycle` | Cycling animated text |
| `mfr-timed-carousel.js` | `mfrTimedCarousel` | Auto-advancing timed carousel |

### `scripts/gsap/` — GSAP Plugins

11 GSAP plugin files (`ScrollTrigger.js`, `ScrollSmoother.js`, `SplitText.js`, `Flip.js`, `Observer.js`, `CustomEase.js`, `CustomBounce.js`, `CustomWiggle.js`, `MorphSVGPlugin.js`, `ScrollToPlugin.js`, `TextPlugin.js`) are bundled into a single `assets/mfr-gsap.js` file by Gulp. Do not load them individually.

### `scripts/theme/` — Global Utilities

These run on every page and are compiled to `assets/<name>.min.js`.

| File | Purpose |
|------|---------|
| `mfr-global.js` | Lozad lazy loading, sticky header (120px threshold), quicklink prefetching, external links target, hash-based offcanvas/popup triggers, CCPA "Do Not Sell" opt-out |
| `mfr-utils.js` | `onWidthResize()`, `onHeightResize()`, `onViewportChange()` — ResizeObserver + MediaQuery helpers |
| `mfr-alpine-functions.js` | Registers `Alpine.store("methods")` with `isMobile` state (updates on resize, true ≤ 1024px) |
| `mfr-alpine-global-states.js` | Other global Alpine stores |
| `mfr-cart.js` | Cart drawer interactions |
| `mfr-custom-js.js` | Project-specific custom JS |
| `mfr-gsap-scripts.js` | GSAP animation initialization |
| `mfr-initialize-functions.js` | General init hooks |

---

## Folder: `sections/`

### Naming Conventions

| Prefix | Use |
|--------|-----|
| `mfr-core__<name>` | Core reusable sections (any template) |
| `mfr-product__<name>` | Product page sections |
| `mfr-collection__<name>` | Collection sections |
| `mfr-article__<name>` | Article sections |
| `mfr-blog__<name>` | Blog sections |
| `mfr-accounts__<name>` | Customer account sections |
| `mfr-search__<name>` | Search sections |
| `header`, `footer`, `offcanvas-*`, `modal` | Section-group sections (fixed placement) |

### Section Groups

These sections are pinned to structural groups and cannot be added to regular pages.

#### Header Group (`header-group.json`)
| Section | File | Description |
|---------|------|-------------|
| Announcement Bar | `header__announcement-bar.liquid` | Marquee-style bar at the top. Supports multiple announcement blocks, sticky collapse behavior. |
| Header | `header.liquid` | Main navigation — logo, mega menu, cart/account/search actions. Configured per template type. |
| Mobile Menu | `header__mobile-menu.liquid` | Mobile drawer navigation. |

#### Footer Group (`footer-group.json`)
| Section | File | Description |
|---------|------|-------------|
| Footer | `footer.liquid` | Main footer — newsletter, menus, social links. Supports column blocks. |
| Footer Socket | `footer__socket.liquid` | Bottom bar — copyright, social links. Disabled by default. |

#### Offcanvas Group (`offcanvas-group.json`)
| Section | File | Description |
|---------|------|-------------|
| Offcanvas Menu | `offcanvas-menu.liquid` | Left-slide mobile menu with image-text links, menus, social icons. |
| Offcanvas Cart | `offcanvas-cart.liquid` | Right-slide cart drawer — progress bars, upsells, checkout. |
| Offcanvas Contact | `offcanvas-contact.liquid` | Contact form in a drawer. |
| Offcanvas Login | `offcanvas-login.liquid` | Login/register form in a drawer. |
| Offcanvas Product Form | `offcanvas-product-form.liquid` | Quick-add product form in a drawer. |

#### Modals Group (`modals-group.json`)
| Section | File | Description |
|---------|------|-------------|
| Modal | `modal.liquid` | Popup dialog. Identified by a unique `modal_id` setting. Supports icon, text, button, list, image blocks. |

Sections that should not appear in any group use:
```json
"disabled_on": {
  "groups": ["header", "footer", "custom.offcanvas", "custom.modals"]
}
```

---

### Template Sections

Each template in `templates/` pre-configures a set of sections. These can be changed in the Shopify editor.

#### Homepage (`templates/index.json`)
| Section | Purpose |
|---------|---------|
| `mfr-core__hero-banner` | Full-width hero carousel |
| `mfr-core__image-video-text-section` | 50/50 image + text layout |
| `mfr-core__featured-product` | Highlight a single product |
| `mfr-core__text-icon-card-grid` | 4-column features/benefits grid |
| `mfr-product__grid` | Product grid |
| `mfr-core__scrolling-bar` | Scrolling logo/brand bar |
| `mfr-core__customer-testimonials` | Testimonials carousel |

#### Product Page (`templates/product.json`, `product.the-essential.json`)
| Section | Purpose |
|---------|---------|
| `mfr-product__top` | Gallery, price, variants, add-to-cart |
| `mfr-product__features` | Icon/image feature highlights |
| `mfr-product__how-to-use` | Step-by-step usage instructions |
| `mfr-product__ingredients` | Ingredient breakdown |
| `mfr-core__image-video-text-section` | Supporting content sections |
| `mfr-core__table-section` | Comparison/data table |
| `mfr-core__customer-testimonials` | Reviews carousel |
| `apps` | Third-party app embeds (Okendo, etc.) |

#### Collection Page (`templates/collection.json`)
| Section | Purpose |
|---------|---------|
| `main-page` | Optional page header |
| `mfr-collection__product-grid` | Product grid with filters |
| `mfr-core__image-video-banner` | Banner section |

#### Article (`templates/article.json`)
| Section | Purpose |
|---------|---------|
| `mfr-article__header` | Title, date, author, featured image |
| `mfr-article__content` | Article body |
| `mfr-article__related-articles` | Related posts carousel |
| `mfr-article__comments` | Comments section |

#### Blog (`templates/blog.json`)
| Section | Purpose |
|---------|---------|
| `main-page` | Page header |
| `mfr-blog__featured-article` | Large featured post card |
| `mfr-blog__grid` | Article grid with filters |

#### Page Templates

| Template | Pre-configured Sections |
|----------|------------------------|
| `page.json` | `main-page` (page content) |
| `page.the-standard.json` | Hero banner, features, text list, floating images |
| `page.about.json` | Featured product, floating images, product grid |
| `page.faq.json` | Accordion section, banner, product grid |

#### Other Templates

| Template | Main Section |
|----------|-------------|
| `search.json` | `mfr-search__results` |
| `cart.json` | `cart-template` |
| `404.json` | `main-404` |
| `password.json` | `mfr-password__section` |
| `customers/account.json` | `mfr-accounts__dashboard` |
| `customers/addresses.json` | `mfr-accounts__addresses` |
| `customers/login.json` | `mfr-accounts__login` |
| `customers/register.json` | `mfr-accounts__register` |

---

### Addable Sections (Core)

These sections can be added to any page template via the Shopify editor.

#### `mfr-core__*` Sections

| Section | File | Description |
|---------|------|-------------|
| Hero Banner | `mfr-core__hero-banner.liquid` | Full-width carousel with image/video slides and overlay content |
| Accordion Section | `mfr-core__accordion-section.liquid` | Collapsible FAQ/content accordion |
| Featured Product | `mfr-core__featured-product.liquid` | Highlight a product with custom blocks and an add-to-cart CTA |
| Image/Video Banner | `mfr-core__image-video-banner.liquid` | Full-width carousel of images or videos |
| Image/Video Text Section | `mfr-core__image-video-text-section.liquid` | Side-by-side media and text (50/50 or variable split) |
| Customer Testimonials | `mfr-core__customer-testimonials.liquid` | Testimonial carousel (4 card style variants) |
| Floating Images | `mfr-core__floating-images.liquid` | Decorative staggered/overlapping image layout |
| Scrolling Bar | `mfr-core__scrolling-bar.liquid` | Horizontal marquee ticker (logos, icons, text) |
| Table Section | `mfr-core__table-section.liquid` | Structured data/comparison table |
| Text Icon Card Grid | `mfr-core__text-icon-card-grid.liquid` | Grid of cards with icons and text |
| Text List | `mfr-core__text-list.liquid` | Customizable bulleted/styled list |
| Text Section | `mfr-core__text-section.liquid` | General-purpose rich text content |

#### `mfr-product__*` Sections (also addable to any template)

| Section | File | Description |
|---------|------|-------------|
| Product Carousel | `mfr-product__carousel.liquid` | Related/featured products in a carousel |
| Product Grid | `mfr-product__grid.liquid` | Grid of product cards |
| Product Features | `mfr-product__features.liquid` | Feature highlights with icons/images |
| Product Ingredients | `mfr-product__ingredients.liquid` | Ingredient list and details |
| Product How To Use | `mfr-product__how-to-use.liquid` | Step-by-step instructions grid |
| Product Reviews | `mfr-product__reviews.liquid` | Customer reviews/ratings section |

#### `mfr-collection__*` Sections

| Section | File | Description |
|---------|------|-------------|
| Collection Carousel | `mfr-collection__carousel.liquid` | Collection products in carousel |
| Collection Highlights | `mfr-collection__highlights.liquid` | Featured collection cards |
| Collection List | `mfr-collection__list.liquid` | List/table view of collection products |

#### `mfr-article__*` / `mfr-blog__*` Sections

| Section | File | Description |
|---------|------|-------------|
| Blog Carousel | `mfr-blog__carousel.liquid` | Blog posts in a carousel |
| Blog Featured Article | `mfr-blog__featured-article.liquid` | Large featured post highlight card |
| Blog Grid | `mfr-blog__grid.liquid` | Article grid with optional filters |
| Related Articles | `mfr-article__related-articles.liquid` | Related posts carousel |

---

### Common Section Settings

Most sections share these settings groups. The full JSON for each lives in `.claude/instructions/settings-groups/section-settings.md`.

#### Section Settings
- **Width** (`container_width`) — `full` (edge-to-edge) or `contain` (max-width wrapper)
- **Max Content Width** (`max_width`) — 0–100rem slider; 0 means no limit
- **Section Margin** (`grid_gutter`) — apply horizontal gutters on mobile, desktop, or both

#### Alignment Settings
- **Content Alignment — Mobile** and **Desktop** — Left / Center / Right
- Requires `{%- render "section__settings-styles.liquid" -%}` in the section

#### Color Scheme Settings
- **Color Scheme** — selects from theme-defined schemes (scheme_1 through scheme_N)
- Sets background color, text color, and border color for the section

#### Mobile Section Spacing
- **Top Spacing** / **Bottom Spacing** — pixels (default 100px each)

#### Desktop Section Spacing
- Same as mobile but applied at ≥ 1024px

#### Background
- **Background Color/Gradient** (`bg_color`) — inline CSS
- **Background Image — Mobile** and **Desktop** — Shopify image pickers
- **Background Texture** (`bg_texture`) — overlay texture image

#### Section Dividers
- **Divider — Top**: None / Line / Rounded / Scale
- **Divider — Bottom**: None / Line / Rounded

#### Attribute Settings
- **Custom Class** — appended to section wrapper
- **Custom ID** — applied to section wrapper (for anchor links)

---

## Folder: `snippets/`

Snippets are partials rendered with `{%- render "snippet-name" -%}`. They are organized by prefix.

### Icon Snippets (`icon__*.liquid`) — 28 files

SVG icon snippets. Each accepts a `color` variable and outputs an SVG with `fill="{{ color }}"` applied dynamically:

```liquid
{%- render "icon__cart", color: "currentColor" -%}
```

Available icons: `accordion-close`, `accordion-plus`, `arrows`, `carets`, `cart`, `checkmark`, `chevrons`, `close`, `close-with-circle`, `eyes`, `global`, `loading-spinner`, `minus`, `mute`, `mute-v2`, `pause`, `pause-v2`, `play`, `play-v2-big`, `plus`, `rotate`, `search`, `social-media`, `speaker`, `speaker-v2`, `star`, `stars`, `x-circle`

### Component Snippets (`component__*.liquid`) — 18 files

Reusable UI components used throughout the theme.

| Snippet | Purpose |
|---------|---------|
| `component__lazyload-image` | Responsive lazy-loaded image via Lozad.js. Accepts: `image`, `width`, `widths`, `alt`, `class`. Generates a full `srcset` and uses `data-src`/`data-srcset` to defer loading. |
| `component__button` | Renders a styled button/link. Accepts style, label, URL, target. |
| `component__video-with-controls` | Video embed with custom play/mute/pause controls. |
| `component__video` | Bare video embed (no custom controls). |
| `component__social-links` | Social media icon links (renders from theme settings). |
| `component__header-logo` | Logo image with link, supports sticky variant. |
| `component__product-badges` | Product badge overlays (Sale, New, etc.). |
| `component__product-rating` | Star rating display. |
| `component__quantity-selector-v2` | Quantity +/- input. |
| `component__add-to-cart-button` | ATC button with loading state. |
| `component__section-dividers` | Renders the top/bottom dividers configured in section settings. |
| `component__gradient-bg-styles` | Outputs inline `<style>` for gradient background settings. |
| `component__accent-graphics` | Decorative accent graphic renderer. |
| `component__placeholder-image` | Shopify placeholder when no image is set. |
| `component__responsive-image` | Eagerly loaded responsive image. |
| `component__responsive-image-v2` | Responsive image with art direction (mobile/desktop sources). |
| `component__seo-page-title` | Hidden SEO page title block. |
| `component__svg-encoder` | Encodes SVG strings for inline use. |

### Settings Snippets

These snippets output `<style>` blocks based on block/section settings.

| Snippet | Purpose | Usage |
|---------|---------|-------|
| `section__settings-styles.liquid` | Outputs responsive alignment CSS and section margin CSS for a section. Required when a section uses alignment settings. | `{%- render "section__settings-styles" -%}` inside the section |
| `settings__block-layout-controls.liquid` | Outputs width/padding/margin CSS per block ID. | `{%- render "settings__block-layout-controls" -%}` inside a block |
| `settings__font-settings.liquid` | Outputs font-size/line-height/letter-spacing/weight/case CSS per block ID. | `{%- render "settings__font-settings" -%}` inside a block |
| `settings__aspect-ratio.liquid` | Outputs aspect-ratio CSS variable for image wrappers. | `{%- render "settings__aspect-ratio" -%}` inside a block |
| `style-tags__section.liquid` | Wraps inline `<style>` output for a section. | Used internally by settings snippets |

### Script Snippets

| Snippet | Purpose |
|---------|---------|
| `script__section.liquid` | Deferred script loader. Pass `file: "ComponentName.js"` → outputs `<script src="assets/mfr-component__ComponentName.min.js" defer>`. |
| `scripts__deferred-tags.liquid` | Async/deferred loading of multiple scripts. |
| `scripts__initializers.liquid` | Runs initialization functions after DOM is ready. |
| `preload__fonts.liquid` | Font preload link tags for performance. |

### Feature Component Snippets (`mfr-component__*.liquid`)

Liquid partials that wrap Alpine.js component markup. These pair with `scripts/components/` files.

| Snippet | Alpine Component |
|---------|----------------|
| `mfr-component__carousel.liquid` | `MFRCarousel` |
| `mfr-component__carousel-marquee.liquid` | `MFRCarouselMarquee` |
| `mfr-component__accordion.liquid` | Accordion logic |
| `mfr-component__dropdown-menu.liquid` | `MFRDropdownMenu` |
| `mfr-component__mega-menu.liquid` | `MFRMegaMenu` |
| `mfr-component__offcanvas.liquid` | Offcanvas drawer |
| `mfr-component__popup.liquid` | Popup/modal trigger |
| `mfr-component__tab.liquid` | Tab switcher |

### Cart Snippets (`cart__*.liquid`) — 12 files

| Snippet | Purpose |
|---------|---------|
| `cart__form.liquid` | Main cart form wrapper |
| `cart__product.liquid` | Single line item in cart |
| `cart__product-upsell.liquid` | Upsell product card in cart |
| `cart__price-progress-bar.liquid` | "Spend $X for free shipping" progress bar |
| `cart__quantity-progress-bar.liquid` | Quantity-based progress bar |
| `cart__discount.liquid` | Discount code input |
| `cart__submit.liquid` | Checkout button |
| `cart__footer-message.liquid` | Message below checkout button |
| `cart__tax-note.liquid` | Tax/shipping estimate note |
| `cart__note.liquid` | Order note input |
| `cart__additional-fee.liquid` | Extra fee line item |
| `cart__scripts.liquid` | Cart-specific JS |

### Partial Snippets (`partial__*.liquid`)

| Snippet | Purpose |
|---------|---------|
| `partial__product-card.liquid` | Product card (image, title, price, CTA) |
| `partial__blog-card.liquid` | Blog post card (image, title, excerpt, date) |
| `partial__collection-card.liquid` | Collection card |
| `partial__alpine-metaobject-card.liquid` | Metaobject card for Alpine-rendered lists |
| `partial__account-login.liquid` | Login form partial |

### Renderer Snippets (`renderer__block-*.liquid`)

Common block types rendered from a shared snippet rather than duplicating markup:

| Snippet | Renders |
|---------|---------|
| `renderer__block-title.liquid` | Heading/title block |
| `renderer__block-text.liquid` | Rich text block |
| `renderer__block-small-text.liquid` | Small accent text |
| `renderer__block-icon.liquid` | Icon block |
| `renderer__block-button.liquid` | Button/CTA block |

### Schema Snippets (`schema__*.liquid`)

Structured data (JSON-LD) for SEO:

| Snippet | Schema type |
|---------|------------|
| `schema__product.liquid` | Product schema |
| `schema__article.liquid` | Article schema |
| `schema__store.liquid` | Organization schema |
| `schema__breadcrumbs.liquid` | BreadcrumbList schema |
| `schema__all.liquid` | Combines all applicable schemas |

### Style Loading (`style-tags.liquid`)

Loaded in `layout/theme.liquid`. Outputs four stylesheets in this order:

```liquid
{{ 'header.css' | asset_url | stylesheet_tag: preload: true }}
{{ 'theme.css' | asset_url | stylesheet_tag: preload: true }}
{{ 'footer.css' | asset_url | stylesheet_tag: preload: false }}
{{ 'mfr-styles.css' | asset_url | stylesheet_tag: preload: false }}
```

`header.css` and `theme.css` are preloaded (critical). `footer.css` and `mfr-styles.css` (Tailwind) are not.

---

## Folder: `styles/`

### Rule: Tailwind First, SCSS for Exceptions Only

All layout, spacing, and visual styling goes in Tailwind utility classes directly in `.liquid` files. SCSS is only for:

- Schema `"class"` field rules (Shopify injects these — Tailwind classes are not allowed there)
- Third-party generated DOM (Flickity, Klaviyo, Lottie, Okendo, Lozad, GSAP)
- Styles that structurally cannot use Tailwind (e.g. `:nth-child`, complex selector chains)

**Never add styles to `tailwind.input.css`** beyond the initial `@theme` tokens and `@source` paths. No `@layer components` either.

### Tailwind Configuration (`tailwind.input.css`)

```css
@import "tailwindcss";

@theme {
  /* Remove Tailwind defaults */
  --breakpoint-sm: initial;
  --breakpoint-md: initial;
  --breakpoint-lg: initial;
  --breakpoint-xl: initial;
  --breakpoint-2xl: initial;

  /* Theme breakpoints */
  --breakpoint-medium:  640px;
  --breakpoint-large:  1024px;
  --breakpoint-xlarge: 1200px;
  --breakpoint-xxlarge: 1440px;

  /* Container max-width tokens */
  --max-width-container-sm:  80rem;   /* 1280px */
  --max-width-container-md:  90rem;   /* 1440px — default */
  --max-width-container-lg: 100rem;   /* 1600px */
  --max-width-container-xl: 120rem;   /* 1920px */
}

@source "./sections/**/*.liquid";
@source "./snippets/**/*.liquid";
@source "./layout/**/*.liquid";
@source "./templates/**/*.liquid";
@source "./blocks/**/*.liquid";
```

**Custom breakpoint prefixes** (never use `sm:`, `md:`, `lg:`, etc.):

| Prefix | Breakpoint |
|--------|-----------|
| *(none)* | Mobile — default, no prefix |
| `medium:` | ≥ 640px |
| `large:` | ≥ 1024px |
| `xlarge:` | ≥ 1200px |
| `xxlarge:` | ≥ 1440px |

**Arbitrary values:**
```html
<div class="[color:var(--section-heading)]">
<div class="large:[text-align:var(--text-align-desktop)]">
<div class="h-[calc(100%_+_60px)]">   <!-- underscores for spaces inside calc() -->
```

### SCSS Variables (`styles/variables.scss`)

Maps SCSS variables to CSS custom properties from theme settings. Reference these instead of hardcoding values:

- **Colors:** `$color-body`, `$color-body-text`, `$brand-color`, `$color-accent`, `$white`, `$black`, `$off-white`, `$off-black`, `$color-error`, `$color-success`
- **Typography:** `$font-heading-h1` through `$font-heading-h6` — each with weight, mobile size, desktop size, line-height, letter-spacing variants
- **Easing:** `$sharp_ease`, `$smooth_ease`

### Breakpoint Mixin

```scss
@include breakpoint(large up) { ... }   // >= 1024px
@include breakpoint(medium up) { ... }  // >= 640px
```

### Pixel Values

Use `rem-calc()` — no spaces inside:

```scss
padding: rem-calc(15) rem-calc(30);    // correct
padding: rem-calc(15 30);              // also correct
```

### Folder Structure

```
styles/
├── tailwind.input.css          Tailwind v4 config + source paths
├── theme.scss                  Main SCSS entry point
├── variables.scss              SCSS vars → CSS custom properties
├── general.scss                Base/reset styles
├── site-specifics.scss         Project-specific overrides
├── footer.scss                 Footer styles (compiled separately)
├── header.scss                 Header styles (compiled separately)
├── hero.scss                   Hero styles (compiled separately)
├── quickload-css.scss          Critical above-the-fold CSS
│
├── core/                       Base layer — 12 files
│   ├── typography.scss
│   ├── forms.scss
│   ├── layout.scss
│   ├── animations.scss
│   ├── transitions.scss
│   ├── blocks.scss
│   ├── modals.scss
│   ├── offcanvas-general.scss
│   ├── section-colors.scss
│   ├── section-content.scss
│   ├── helpers.scss
│   └── utilities.scss
│
├── components/                 Reusable UI — 37 files
│   ├── buttons.scss
│   ├── product-card.scss
│   ├── carousel.scss
│   ├── accordion.scss
│   ├── mega-menu.scss
│   ├── dropdown-menu.scss
│   ├── variant-selector.scss
│   ├── quantity-picker.scss
│   ├── search.scss
│   ├── announcement-bar.scss
│   ├── social-links.scss
│   ├── price.scss
│   └── ... (25 more)
│
├── sections/                   Per-section exceptions — 39 files
│   ├── mfr-core__text-list.scss
│   ├── mfr-product__top.scss
│   └── ... (one file per section, matching section filename)
│
├── templates/                  Template-level styles — 5 files
│   ├── article.scss
│   ├── cart.scss
│   ├── product.scss
│   ├── pages.scss
│   └── policy-pages.scss
│
├── plugins/                    Third-party integrations — 8 files
│   ├── flickity.scss
│   ├── gsap.scss
│   ├── klaviyo.scss
│   ├── lottie.scss
│   ├── lozad.scss
│   ├── okendo.scss
│   ├── shopify-app-blocks.scss
│   └── shopify-option-selectors.scss
│
└── tools/                      SCSS utilities
    ├── mixins.scss
    ├── functions.scss
    ├── normalize.scss
    └── util/                   Utility modules (breakpoint, flex, color, math, typography, rem-calc, etc.)
```

### Where to Add New Styles

| Situation | File |
|-----------|------|
| New reusable UI component | `styles/components/<component-name>.scss` |
| Section-specific exception | `styles/sections/<section-filename>.scss` |
| Template-level style | `styles/templates/<template>.scss` |
| Third-party app integration | `styles/plugins/<app-name>.scss` |
| Layout/spacing/color on elements you control | Tailwind classes in the `.liquid` file — **not** in any SCSS file |
| Schema `"class"` field styles | The section's own `styles/sections/<section>.scss` |

### SCSS Scaffold for a New Section

When creating a new section, create `styles/sections/<filename>.scss`:

```scss
@import "../variables";
@import "../tools/util/util";
@import "../tools/mixins";

.<filename> {
  .<sub-name> {
    // only schema "class" exceptions go here
  }
}
```

`<sub-name>` is the part after `__` in the section filename (e.g. `mfr-core__accordion-section` → `accordion-section`). Import `"../site-specifics"` only when the section needs project-specific variables.

---

## Privacy — CCPA "Do Not Sell or Share My Personal Information"

`mfr-global.js` includes a click handler for CCPA opt-out. No third-party app or the Audiences app is required.

### How it works

Any `<a>` tag with `href="#do-not-share-my-personal-info"` on the page will trigger the opt-out when clicked:

```html
<a href="#do-not-share-my-personal-info">Do Not Sell or Share My Personal Information</a>
```

When clicked, the handler:
1. Prevents the default anchor navigation
2. Sets a `mfr_do_not_sell=1` cookie that expires in 365 days (uses the global `setCookie` utility)
3. Updates the link text to `"Preference saved."`

Read this cookie server-side in Liquid (`request.cookies["mfr_do_not_sell"]`) or client-side via `getCookie("mfr_do_not_sell")` to conditionally suppress tracking scripts for opted-out visitors.

### Where to add the link

Add the link to your footer or privacy policy page via the Shopify editor. No code changes needed — the handler is always active.

---

## 🪄 Easter Egg — Claude Skill: `figma-to-shopify-qa`

If you're using [Claude Code](https://claude.ai/code), this project ships with a custom skill that QAs Shopify sections against Figma comps and auto-fixes visual differences until pixel-perfect.

### What it does

`/figma-to-shopify-qa` is a QA skill that:

1. **Reads the Figma comp** — fetches screenshots and full design context (typography, spacing, colors, layout, aspect ratios) from both mobile and desktop frames via the Figma MCP server
2. **Screenshots the live section** — captures the running dev server at 375px (mobile) and 1440px (desktop)
3. **Diffs comp vs live** — compares every visible element: font sizes, weights, letter-spacing, padding, gap, colors, borders, image aspect ratios, and flex alignment
4. **Auto-fixes** — edits the block/section `.liquid` and `.scss` files directly to match the comp, following all project conventions (Tailwind-first, custom breakpoints, no fixed heights, BEM wrappers)
5. **Verifies** — re-screenshots and re-diffs up to 3 rounds until pixel-perfect
6. **Reports** — lists every change made, what's verified, and anything that couldn't be auto-resolved

### How to use it

Make sure the dev server is running (`npm run dev`), then in Claude Code:

```
/figma-to-shopify-qa <mobile-figma-url> <desktop-figma-url> <preview-url> [section-name]
```

**Example:**
```
/figma-to-shopify-qa https://www.figma.com/design/.../NodeA https://www.figma.com/design/.../NodeB http://127.0.0.1:9292/pages/test mfr-core__customer-testimonials
```

| Argument | Required | Description |
|----------|----------|-------------|
| `mobile-figma-url` | Yes | Figma node URL for the mobile frame |
| `desktop-figma-url` | Yes | Figma node URL for the desktop frame |
| `preview-url` | Yes | Local dev server URL where the section is visible |
| `section-name` | No | If omitted, Claude derives it from the Figma frame name |

### Requirements

- **Figma desktop app** with the MCP server enabled (provides `get_screenshot` and `get_design_context`)
- **Claude Code** with the `figma-to-shopify-qa` skill in `~/.claude/skills/figma-to-shopify-qa/`
- Dev server running via `npm run dev`

Screenshots are saved to `qa-screenshots/<section-name>/` in the project root for reference.
