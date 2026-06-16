# 5. Templates, Sections, and Blocks

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#templates-sections-and-blocks

All required templates must be present as JSON. Custom Liquid section and block must exist. App blocks must be supported on the main product section and featured product section.

## Required Templates

- [ ] `theme.liquid`
- [ ] `404.json`
- [ ] `article.json`
- [ ] `blog.json`
- [ ] `cart.json`
- [ ] `collection.json`
- [ ] `index.json`
- [ ] `list-collections.json`
- [ ] `page.json`
- [ ] `page.contact.json`
- [ ] `password.json`
- [ ] `product.json`
- [ ] `search.json`
- [ ] `gift_card.liquid`
- [ ] `settings_data.json`
- [ ] `settings_schema.json`
- [ ] `config/markets.json` is NOT included in the submission zip

## Sections

- [ ] All templates (except Customer Account, Gift Card, Checkout) use JSON templates with sections
- [ ] **Custom Liquid section** exists with `liquid`-type setting, available on all section-supporting templates
- [ ] Header and footer sections rendered within section groups

## Blocks and App Blocks

- [ ] Main product section elements (price, vendor, description, etc.) are individual blocks
- [ ] `@app` blocks supported in main product section and featured product section
- [ ] **Custom Liquid blocks** added wherever app blocks are used, each with a `liquid`-type setting

## Status: `[ ]` Not started
