# Project 3 — Frontend Learning Hub

## Project Overview

A simple interactive webpage built as part of the industrial training program.  
The project demonstrates core JavaScript concepts — DOM manipulation, event listeners, arrays, and dynamic content updates — without any frameworks or libraries.

---

## Features Implemented

| # | Feature | What it does |
|---|---------|-------------|
| 1 | **Hero Section** | Clicking the button changes the heading, description, and button text |
| 2 | **Theme Toggle** | Switches the page between light mode and dark mode |
| 3 | **Learning Progress** | Tracks progress from 0% to 100% in steps of 10; resets on demand |
| 4 | **Fun Fact Generator** | Shows a random JavaScript fact from an array on each click |

---

## JavaScript Concepts Used

- `document.getElementById()` — selecting elements
- `addEventListener()` — handling button clicks
- `textContent` — updating text dynamically
- `classList.toggle() / .add() / .remove()` — switching classes
- `style.width` — updating CSS properties from JS
- Arrays and `Math.random()` — storing and picking facts
- Functions — keeping logic organized and reusable
- Boolean flags (`heroToggled`) — tracking state

---

## Folder Structure

```
Frontend-Development/
└── Project-3/
    ├── index.html
    ├── README.md
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    
```

---

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern web browser.
3. No build tools, no installations, no dependencies needed.

> Works on Chrome, Firefox, Edge, and Safari.

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 720px | Full desktop layout |
| ≤ 720px | Sections get side padding; buttons stack vertically |
| ≤ 480px | Hero text scales down for small phones |

---

*Industrial Training — Frontend Development Track*
