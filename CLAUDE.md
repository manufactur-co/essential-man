# Manufactur Theme v4 — AI Instructions

## Tech Stack

- **Shopify** theme (custom, not Dawn-based)
- **Tailwind CSS v4** — primary styling (migration 100% complete)
- **SCSS** — exceptions only (schema classes, third-party DOM)
- **Alpine.js** — interactivity
- **GSAP** — animations
- **Gulp** — JS/SCSS build pipeline

## Instruction Files

**MANDATORY: Before writing any code, identify which instruction files apply to the task and read them. Do not rely on memory — read the file. Standards live there.**

@.claude/instructions/sections.md
@.claude/instructions/blocks.md
@.claude/instructions/liquid-html.md
@.claude/instructions/styles.md
@.claude/instructions/scripts.md
@.claude/instructions/figma-comp-rules.md
@.claude/instructions/settings-groups/section-settings.md
@.claude/instructions/settings-groups/block-settings.md

| File | Covers | **Read before starting when** |
|------|--------|-------------------------------|
| sections.md | Section creation, naming, SCSS scaffold, section groups, conditional visibility | Touching any `sections/*.liquid` file — creating, editing, copying, or renaming |
| blocks.md | Block creation, naming, BEM, schema requirements | Touching any `blocks/*.liquid` file — creating, editing, or adding schema settings |
| liquid-html.md | Liquid/HTML patterns, render calls, Alpine in Liquid | Writing any Liquid tags, `render` calls, `content_for`, trim markers, or Alpine bindings in a `.liquid` file |
| styles.md | Tailwind-first, breakpoints, SCSS exceptions, build | Adding or changing any CSS — Tailwind classes, SCSS files, breakpoints, or build commands |
| scripts.md | JS conventions, Alpine components, build pipeline | Touching any JS file in `scripts/`; adding an Alpine component; touching Gulp/build |
| figma-comp-rules.md | Rules for translating Figma comps — images, typography, widths, heights | Implementing any Figma comp — **mandatory, no exceptions** |
| settings-groups/section-settings.md | Reusable section schema groups (spacing, alignment, bg, etc.) | Adding or editing settings in a section schema |
| settings-groups/block-settings.md | Reusable block schema groups (aspect ratio, layout controls) | Adding or editing settings in a block schema |

Most tasks touch sections, blocks, and liquid-html together — read all that apply. When in doubt, read it.

For Tailwind migration context: `tailwind-migration/CLAUDE.md`

## Global Rules

- 2-space indentation everywhere
- Keep existing style in the file you're editing — don't reformat unrelated lines
- Blank lines between logical blocks
- Schema arrays: each object on its own lines, never `},{`
- BEM class names throughout
