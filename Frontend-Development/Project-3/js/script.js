// ─── Section 1: Hero DOM Manipulation ───────────────────────────────────────

const heroHeading = document.getElementById("hero-heading");
const heroDesc    = document.getElementById("hero-desc");
const heroBtn     = document.getElementById("hero-btn");

let heroToggled = false;

heroBtn.addEventListener("click", function () {
  if (!heroToggled) {
    heroHeading.textContent = "You're on Your Way!";
    heroDesc.textContent    = "Keep building, keep breaking things, keep learning. Every line of code counts.";
    heroBtn.textContent     = "Keep Going →";
    heroToggled = true;
  } else {
    heroHeading.textContent = "Welcome to Frontend Learning Hub";
    heroDesc.textContent    = "Your starting point for learning HTML, CSS, and JavaScript — one step at a time.";
    heroBtn.textContent     = "Start Learning";
    heroToggled = false;
  }
});


// ─── Section 2: Theme Toggle ─────────────────────────────────────────────────

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "Switch to Light Mode";
  } else {
    themeBtn.textContent = "Switch to Dark Mode";
  }
});


// ─── Section 3: Learning Progress ────────────────────────────────────────────

const progressValue = document.getElementById("progress-value");
const progressBar   = document.getElementById("progress-bar");
const increaseBtn   = document.getElementById("increase-btn");
const resetBtn      = document.getElementById("reset-btn");

let progress = 0;

function updateProgress() {
  progressValue.textContent = progress;
  progressBar.style.width   = progress + "%";
}

increaseBtn.addEventListener("click", function () {
  if (progress < 100) {
    progress += 10;
    updateProgress();
  }

  if (progress === 100) {
    increaseBtn.textContent = "Completed! 🎉";
    increaseBtn.disabled    = true;
  }
});

resetBtn.addEventListener("click", function () {
  progress = 0;
  updateProgress();
  increaseBtn.textContent = "Increase Progress";
  increaseBtn.disabled    = false;
});


// ─── Section 4: Fun Fact Generator ───────────────────────────────────────────

const factBtn = document.getElementById("fact-btn");
const factBox = document.getElementById("fact-box");

const facts = [
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "In JavaScript, typeof null returns 'object' — a bug that was never fixed to avoid breaking old code.",
  "JavaScript runs in the browser AND on the server, thanks to Node.js.",
  "Functions in JavaScript are first-class citizens, meaning you can pass them as arguments just like variables.",
  "The === operator checks both value and type, while == only checks value — always prefer ===."
];

let lastIndex = -1;

factBtn.addEventListener("click", function () {
  let index;

  do {
    index = Math.floor(Math.random() * facts.length);
  } while (index === lastIndex && facts.length > 1);

  lastIndex = index;

  factBox.textContent = facts[index];
  factBox.classList.remove("hidden");
});
