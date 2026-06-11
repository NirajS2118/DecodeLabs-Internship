# Digital Craftsmanship — Project 1

A fully responsive, accessible frontend website built with **pure HTML, CSS, and JavaScript** — no frameworks, no libraries. Developed as part of the DecodeLabs Full Stack Industrial Training program.

---

## Project Overview

Digital Craftsmanship is a modern frontend interface that demonstrates mobile-first responsive design, semantic HTML structure, and accessible UI patterns. The project focuses on mastering the fundamentals before reaching for frameworks.

---

## Features

- Responsive layout from 320px to 1920px
- Mobile-first CSS with media queries
- Semantic HTML5 landmark elements
- WCAG 2.1 AA accessibility compliance
- Animated hero section with live stat counters
- Portfolio filter system (All / Layout / UI Components / Mobile)
- Contact form with client-side validation
- Smooth scroll and Back-to-Top button
- Scrolling marquee tech strip
- Dark section (Roadmap) and tinted section variants
- Keyboard navigable and screen reader friendly

---

## Tech Stack

| Technology        | Usage                              |
|-------------------|------------------------------------|
| HTML5             | Semantic structure and landmarks   |
| CSS3              | Grid, Flexbox, Custom Properties   |
| Vanilla JavaScript| DOM manipulation, interactivity    |
| Google Fonts      | Montserrat + Open Sans             |

No React. No Vue. No Bootstrap. No Tailwind.

---

## Folder Structure

```
Project-1/
├── index.html
│
├── css/
│   ├── reset.css          # CSS reset and base styles
│   ├── variables.css      # CSS custom properties (design tokens)
│   ├── main.css           # Layout and section styles
│   ├── components.css     # Cards, buttons, form, footer
│   └── responsive.css     # Media queries (mobile-first)
│
└── js/
    └── main.js            # Navigation, counters, filters, form validation
```

---

## Sections

| Section      | Description                                               |
|--------------|-----------------------------------------------------------|
| Header / Nav | Sticky navigation with mobile hamburger menu              |
| Hero         | Full-screen intro with animated stat counters             |
| Marquee      | Auto-scrolling tech stack strip                           |
| About        | Vision, pillars, and blueprint card visual                |
| Services     | HTML5 / CSS3 / JavaScript feature cards                   |
| Work         | Filterable portfolio grid with mock UI previews           |
| Roadmap      | 6-step process timeline on dark background                |
| Blog         | Frontend insights article cards                           |
| Contact      | Contact info + validated contact form                     |
| Footer       | Brand, navigation, tech stack, and quote                  |

---

## Installation

No build tools or dependencies required.

```bash
# 1. Clone or download the project
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 2. Navigate to the project folder
cd Project-1

# 3. Open in browser
open index.html
```

Or simply double-click `index.html` to open it in your browser.

---

## How To Run

Since this is a static frontend project, no server is needed.

**Option 1 — Direct open:**
Double-click `index.html`

**Option 2 — VS Code Live Server:**
1. Install the Live Server extension in VS Code
2. Right-click `index.html`
3. Select **Open with Live Server**

**Option 3 — Python local server:**
```bash
python -m http.server 5500
# Visit http://localhost:5500
```

---

## Responsive Breakpoints

| Breakpoint | Target Device        |
|------------|----------------------|
| 320px      | Small mobile         |
| 480px      | Mobile               |
| 768px      | Tablet               |
| 1024px     | Small desktop        |
| 1280px     | Desktop              |
| 1920px     | Large desktop        |

---

## Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA roles and labels on interactive elements
- `aria-live` regions for form error messages
- Skip-to-content link for keyboard users
- Visible focus styles on all interactive elements
- `aria-expanded` on hamburger menu toggle
- `aria-pressed` on portfolio filter buttons
- Decorative elements marked with `aria-hidden="true"`

---

## Screenshots

> _Add screenshots after running the project locally._

| View            | Screenshot       |
|-----------------|------------------|
| Desktop Hero    | _(screenshot)_   |
| Mobile Nav      | _(screenshot)_   |
| Portfolio Grid  | _(screenshot)_   |
| Contact Form    | _(screenshot)_   |

---

## Future Improvements

- Add dark mode toggle using CSS custom properties
- Connect contact form to a real backend or EmailJS
- Add page transition animations
- Improve Lighthouse performance score with lazy loading
- Add a real blog section with separate pages

---

## Author

**DecodeLabs Intern**
Full Stack Development — Industrial Training
Batch 2026

- Email: decodelabs.tech@gmail.com
- Website: [www.decodelabs.tech](https://www.decodelabs.tech)
- Location: Greater Lucknow, India
