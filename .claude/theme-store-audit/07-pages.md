# 7. Pages

**Source:** https://shopify.dev/docs/storefronts/themes/store/requirements#pages

Each page type has specific data output and feature requirements. Every item below is mandatory.

## Layout (`theme.liquid`)

- [ ] Payment icons use `enabled_payment_types` + `payment_type_img_url` / `payment_type_svg_tag` (full color)
- [ ] `<html>` element has `lang` attribute populated from `request.locale`
- [ ] All URLs use `routes` object (e.g. `routes.root_url`) — no hardcoded `/` hrefs
- [ ] `content_for_header` is NOT modified or parsed

## Product Page

- [ ] Outputs: `product.title` (not truncated), `variant.price`, `variant.unit_price`, compare-at price, `product.description`, option names and values
- [ ] All product images displayed; varying aspect ratios don't break layout
- [ ] Variant images shown when associated variant is selected
- [ ] `cart.taxes_included` used to display tax-inclusive pricing notice
- [ ] Variants split into separate selectable options
- [ ] Quantity selector present
- [ ] Add to Cart button (disabled/replaced for unavailable/sold-out variants)
- [ ] Callback updates price, compare-at-price, and sold-out message on variant change
- [ ] First available variant loads by default
- [ ] Supports: product recommendations, rich media, accelerated checkout (enabled by default), pickup availability, Shop Pay Installments
- [ ] Gift card products support sending to recipient (uses `form.email`, `form.name`, `form.message`, `gift_card.send_on`)
- [ ] Swatches supported using `swatch.image` and `swatch.color`

## Collection Page

- [ ] Outputs: `collection.title` (not truncated), `collection.description`, `collection.image`
- [ ] Products in grid/list with: `product.title` (links to url), `product.price`, `product.images`, `variant.unit_price`, at least one media
- [ ] Grid doesn't break with varying image aspect ratios
- [ ] Sale badge / `product.compare_at_price_max` shown when applicable
- [ ] Products sortable
- [ ] Empty collection message displayed
- [ ] Price range shown with `product.price_varies` / `price_min` to `price_max`
- [ ] Pagination or lazy loading

## Collection List Page

- [ ] Outputs `collection.title` (not truncated)
- [ ] Uses `collection.featured_image` (falls back to first product's featured image)
- [ ] Pagination or lazy loading

## Cart Page

- [ ] Displays line item: `title`, `unit_price`, `image`, `final_price`, `quantity`, `options_with_values`
- [ ] `cart.total_price` visible
- [ ] `cart.taxes_included` used to display tax-inclusive pricing notice
- [ ] Checkout button submits cart form
- [ ] All line items refresh when quantity is updated (total updates correctly)
- [ ] Quantity editable per line item
- [ ] Empty cart message displayed
- [ ] Supports: cart notes, selling plans, automatic discount codes, accelerated checkout (enabled by default)

## Page (Standard)

- [ ] Outputs `page.title` and `page.content`
- [ ] Alternate contact form template (`page.contact.json`) exists

## Blog Page

- [ ] Outputs `blog.title`
- [ ] Each article shows: `article.title` (not truncated, links to url), `article.image`, `article.excerpt_or_content` (NOT `article.content`)
- [ ] Pagination or lazy loading

## Article Page

- [ ] Outputs: `article.title` (not truncated), `article.comments`, `article.published_at` (NOT `article.created_at`)
- [ ] Comments paginated
- [ ] Comments work without moderation; all success/error messages properly output

## Search Page

- [ ] No-results message displayed
- [ ] Returns multiple object types (products, blogs, pages) using `object_type`
- [ ] Pagination or lazy loading

## 404 Page

- [ ] Clear "page not found" message
- [ ] Options to proceed (search bar and/or homepage link)

## Gift Card Page

- [ ] Apple Wallet supported
- [ ] Gift card code displayed
- [ ] QR code displayed (minimum 120×120px)
- [ ] Logo or `shop.name` included

## Customer Page

- [ ] Displays `line_item.unit_price`
- [ ] Supports selling plans and unit pricing

## Password Page

- [ ] Shows logo or `shop.name`
- [ ] Shows `shop.password_message`
- [ ] Includes a way to enter the storefront password

## Status: `[ ]` Not started
