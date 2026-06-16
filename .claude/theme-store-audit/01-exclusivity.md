# 1. Theme Store Exclusivity

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#theme-store-exclusivity

Themes listed on the Shopify Theme Store can only be distributed through the Shopify Theme Store. Theme files must not contain designer credits, developer links, or affiliate links of any kind.

## Checklist

- [ ] Theme is NOT distributed on any other marketplace
- [!] Theme files contain NO developer/designer credits (no links to dev websites)
- [x] Theme files contain NO affiliate links

## Findings

### Developer/Designer Credits — FAILS

| File | Line | Content |
|------|------|---------|
| `layout/theme.liquid` | 4 | HTML comment: `<!-- Site by MANUFACTUR.co -->` |
| `layout/password.liquid` | 4 | HTML comment: `<!-- Site by MANUFACTUR.co -->` |
| `blocks/_footer__copyright.liquid` | 5 | Rendered link: `<a href="https://manufactur.co/">Manufactur</a>` |
| `sections/footer__socket.liquid` | 21 | Rendered link: `<a href="https://manufactur.co">Manufactur</a>` |

## Action Items

- [ ] `layout/theme.liquid:4` — delete `<!-- Site by MANUFACTUR.co -->`
- [ ] `layout/password.liquid:4` — delete `<!-- Site by MANUFACTUR.co -->`
- [ ] `blocks/_footer__copyright.liquid:5` — remove `<a href="https://manufactur.co/">Manufactur</a>` credit link
- [ ] `sections/footer__socket.liquid:21` — remove `<a href="https://manufactur.co">Manufactur</a>` credit link

### Affiliate Links — PASSES
No affiliate or referral links found anywhere in the theme.

### Exclusivity (marketplace distribution)
Cannot be verified from code — confirm manually that this theme is not listed on any other marketplace (ThemeForest, Creative Market, etc.).

## Status: `[!]` Action required — remove developer credits
