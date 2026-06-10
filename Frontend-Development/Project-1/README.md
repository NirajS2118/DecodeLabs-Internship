# DecodeLabs — Frontend Development Project 1
## Static Webpage Design | Batch 2026

---

### Project Overview

This project fulfills all requirements from the DecodeLabs Frontend Development Project 1 brief: a static webpage built with semantic HTML and external CSS, demonstrating Visual Architecture and Technical Integrity.

---

### File Structure

```
decodelabs-project/
├── index.html          ← Main HTML file (semantic structure)
├── css/
│   └── master.css      ← Single external stylesheet (all styles live here)
├── assets/
│   ├── project-portfolio.webp
│   ├── project-blog.webp
│   ├── project-product.webp
│   └── blueprint.webp
└── README.md
```

---

### Requirements Checklist ✅

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| **IA: Logical Sitemap defined first** | ✅ | Home → Skills → Projects → About → Contact |
| **HTML: Semantic tags** | ✅ | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`, `<figure>` |
| **HTML: One `<h1>` per page** | ✅ | Single `<h1>` in hero section; h2→h3 hierarchy preserved |
| **CSS: External file only** | ✅ | `css/master.css` — zero inline styles anywhere |
| **CSS: DRY Principle** | ✅ | CSS Custom Properties (design tokens), BEM naming, reusable `.button`, `.card`, `.tag`, `.input` blocks |
| **CSS: No IDs for styling** | ✅ | IDs used only for anchors/ARIA; all styling via classes |
| **Layout: Grid for macro page** | ✅ | `.projects__grid`, `.footer__grid`, `.about__grid`, `.skills__grid`, `.grid-12` |
| **Layout: Flexbox for micro components** | ✅ | `.header__inner`, `.nav`, `.hero__actions`, `.stats-row`, `.card__tag-group`, `.footer__links` |
| **Assets: Explicit width/height** | ✅ | All `<img>` tags have `width` and `height` attributes set |
| **Assets: WebP format** | ✅ | All images use `.webp` format |
| **A11Y: Alt text on all images** | ✅ | Descriptive alt text on every `<img>` |
| **A11Y: ARIA landmarks** | ✅ | `role="banner"`, `role="contentinfo"`, `aria-label` on all `<nav>` elements |
| **A11Y: Keyboard focus** | ✅ | `:focus-visible` styles on all interactive elements |
| **A11Y: Reduced motion** | ✅ | `@media (prefers-reduced-motion: reduce)` block in CSS |
| **Validation: W3C Ready** | ✅ | Valid DOCTYPE, lang attribute, meta charset, proper nesting |

---

### Architecture Decisions

**Why BEM?**
BEM (Block Element Modifier) keeps styles scoped and predictable. `.card__title` is always a title inside a card — it can't accidentally inherit from `.project-card__title` unless explicitly connected. This is the DRY principle in action: define `.button` once; use `.button--primary` and `.button--ghost` as modifiers.

**Why CSS Grid + Flexbox?**
As taught in the course: Grid is 2-dimensional (macro page structure), Flexbox is 1-dimensional (micro component alignment). The header uses Flexbox to align logo and nav. The projects section uses a 12-column CSS Grid to create a featured + secondary layout.

**Why CSS Custom Properties?**
Single source of truth for all design tokens. Change `--color-accent` once and it propagates everywhere — to buttons, tags, links, borders. This is the CSS equivalent of the DRY principle.

---

### How to Run

Open `index.html` in any modern browser. No build step, no server required — it is a static webpage.

To replace placeholder images: swap the `.webp` files in `/assets/` with your own screenshots, keeping the same filenames.

---

*DecodeLabs · Engineering Foundations · Internal Engineering Track: Phase I*
