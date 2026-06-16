# 12. Accessibility

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#accessibility
**Accessibility best practices:** https://shopify.dev/docs/storefronts/themes/best-practices/accessibility

Full keyboard accessibility, visible focus states, proper alt text, valid HTML, correct contrast ratios, and proper form labels. An accessible theme can be used by everyone including people with vision impairment.

## Checklist

- [ ] All page parts keyboard accessible (including dropdown navigation)
- [ ] Visible focus state on all focusable elements during keyboard navigation
- [ ] All images have `alt` attribute — uses `image.alt` or `image_url | image_tag: alt:`
- [ ] Form inputs have unique IDs; labels use `for` attribute matching input ID
- [ ] Valid HTML throughout
- [ ] Text color contrast ratio ≥ 4.5:1 for main body content
- [ ] Text >18pt (regular) or >18.5px (bold) and non-text elements (borders, icons) ≥ 3:1 contrast ratio
- [ ] Keyboard focus order matches DOM order (top-bottom, left-right)
- [ ] Touch targets minimum 24×24 CSS pixels (inline body text and excepted elements exempt)
- [ ] Headings `h1–h6` are visually distinct from each other

## Status: `[ ]` Not started
