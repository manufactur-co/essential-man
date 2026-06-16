# 8. Consistency and Functionality

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#consistency-and-functionality

RTE styling must be consistent across all templates. All scripts must be hosted on Shopify servers. No app-dependent features, no fake urgency/scarcity tactics, all links to Shopify domains must have `rel="nofollow"`.

## Checklist

- [ ] RTE content (`h1–h6`, `blockquote`, `ul`, `ol`) styled consistently across all templates (articles, product descriptions, collection descriptions)
- [ ] All scripts hosted on Shopify's servers (except approved third-party libraries)
- [ ] No JS/code that interferes with native Shopify features or the theme editor
- [ ] All links pointing to Shopify domains include `rel="nofollow"`
- [ ] Assets use protocol-relative URLs (no hardcoded `http://` or `https://`)
- [ ] Appropriate licenses obtained for all third-party plugins and images
- [ ] No functionality dependent on a third-party app
- [ ] No app-like features requiring API access (wishlists, appointment scheduling, cart-level discounts, Instagram feeds)
- [ ] No false urgency/scarcity tactics (fake countdowns, fake stock levels, fake viewer counts)

## Status: `[ ]` Not started
