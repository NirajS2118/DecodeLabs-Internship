# DecodeLabs — Project 2: Responsive Web Layout

A responsive landing page for a fictional tech company, built with pure HTML and CSS. No frameworks, no JavaScript (except the checkbox-hack mobile nav which requires zero JS).

---

## Features

- Mobile-first responsive layout
- CSS-only hamburger menu (checkbox hack)
- Hero section with two-column desktop layout
- 3-column features grid → single column on mobile
- 4-column services grid → 2-col tablet → 1-col mobile
- Two-column about section → stacks on mobile
- Responsive contact form with side-by-side fields on wider screens
- CSS custom properties for consistent spacing and color
- Sticky header

---

## Folder Structure

```
Project-2/
├── index.html
├── README.md
├── css/
│   └── styles.css
└── assets/
    ├── hero-placeholder.jpg
    └── about-placeholder.jpg
```

---

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| Default (no query) | Mobile — single column everything |
| `min-width: 768px` | Tablet — nav shows, two-column hero and about, 3-col features, 2-col services |
| `min-width: 1024px` | Desktop — services go to 4 columns, larger type, more padding |
| `max-width: 480px` | Small phones — slightly smaller hero text |

The approach is **mobile-first**: base styles are written for mobile, then media queries add complexity upward.

---

## Technologies

- HTML5 (semantic tags: `header`, `nav`, `main`, `section`, `footer`)
- CSS3 — Flexbox, Grid, Custom Properties, Media Queries
- No frameworks, no JavaScript, no build tools

---

## How to Run

Open `index.html` in a browser. That's it.
