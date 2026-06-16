# 14. Settings

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#settings

Settings must use correct Shopify terminology, sentence case, active voice, and American English. Must be intuitive and merchant-first. Includes terminology table and section/preset naming guidelines.

## Basic Requirements

- [ ] All theme settings follow text style and terminology requirements
- [ ] Setting labels and info text are grammatically correct and spelling-error free
- [ ] Default values indicate how to use the setting (no Lorem Ipsum or demo store content as placeholders)
- [ ] Favicon setting exists
- [ ] Logo upload works with varying aspect ratios (landscape and portrait)
- [ ] All settings have a `label`
- [ ] All `link_list` settings in Header/Footer have `default` of `main-menu` or `footer`
- [ ] Default values for resource-based settings reference resources that exist in all stores
- [ ] `metaobject`/`metaobject_list` settings use only standard definitions (no custom or app-owned)
- [ ] `theme_info` section exists
- [ ] Theme editor changes are reflected in the preview in real time

## Text Style

- [ ] Section, preset, and category names in sentence case (first word + proper nouns only)
- [ ] Descriptive setting names (no numbered options except colors/palettes)
- [ ] Merchant-friendly language: "Horizontal position" not "X position"; "Button label" not "CTA label"
- [ ] American English used throughout
- [ ] No ampersands (`&`)
- [ ] Declarative statements, not questions
- [ ] Section subject stated only once — no repetition (e.g. avoid "Slideshow", "Slideshow color", "Slideshow image")
- [ ] Active voice
- [ ] Buttons and actions start with a verb
- [ ] Technical specs follow format: `64 x 64px required`, `3:2 aspect ratio recommended`, `32 words max`

## Terminology (key items — full table at source URL)

| Use This | Don't Use This |
|---|---|
| home page | homepage |
| slideshow | slider |
| heading | title |
| subheading | sub-heading |
| signup | sign-up, sign up |
| navigation | menus, menu |
| main menu | navigation, menu |
| cart type (drawer/page/modal) | Ajax, Ajax cart |
| show | use, enable (for hide/show basic elements) |
| enable | use, show (for apps/plugins or significant layout changes) |
| use | show, enable (for actionable options with next step) |

- [ ] Correct Shopify terminology used throughout (no "slider", "title", "Ajax cart", "homepage", etc.)

## Status: `[ ]` Not started
