/**
 * main.js — Full Stack Project 1: Responsive Frontend Interface
 * DecodeLabs Industrial Training Kit | Batch 2026
 *
 * Features:
 *  1. Mobile navigation toggle (accessible)
 *  2. Sticky header scroll behavior
 *  3. Scroll-reveal animations (IntersectionObserver)
 *  4. Animated stat counters
 *  5. Portfolio filter system
 *  6. Contact form validation
 *  7. Back-to-top button
 *  8. Footer year
 *  9. Active nav link on scroll (scrollspy)
 * 10. Smooth focus management
 */

'use strict';

/* =============================================
   UTILITY HELPERS
   ============================================= */

/**
 * Query selector shorthand
 * @param {string} selector
 * @param {Element|Document} [context=document]
 * @returns {Element|null}
 */
const $ = (selector, context = document) => context.querySelector(selector);

/**
 * Query selector all shorthand
 * @param {string} selector
 * @param {Element|Document} [context=document]
 * @returns {NodeList}
 */
const $$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle a function
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/* =============================================
   1. MOBILE NAVIGATION
   ============================================= */

const initNav = () => {
  const toggle   = $('#\\30 nav-toggle, .nav-toggle');
  const menu     = $('.nav-menu');
  const header   = $('.site-header');

  if (!toggle || !menu) return;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  /**
   * Open the mobile menu
   */
  const openMenu = () => {
    menu.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus to first nav link
    const firstLink = menu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  };

  /**
   * Close the mobile menu
   */
  const closeMenu = () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  };

  // Toggle on button click
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on overlay click
  overlay.addEventListener('click', closeMenu);

  // Close on nav link click (mobile)
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  // Handle resize — ensure menu visible on desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 768) {
      menu.classList.remove('open');
      overlay.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }, 200));
};

/* =============================================
   2. STICKY HEADER — Add shadow on scroll
   ============================================= */

const initStickyHeader = () => {
  const header = $('.site-header');
  if (!header) return;

  const onScroll = throttle(() => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
};

/* =============================================
   3. SCROLL-REVEAL ANIMATIONS
   ============================================= */

const initScrollReveal = () => {
  if (prefersReducedMotion()) return;

  // Add .reveal class to elements that should animate in
  const revealTargets = [
    '.service-card',
    '.work-card',
    '.blog-card',
    '.roadmap__step',
    '.pillar',
    '.stat',
    '.section-header',
    '.about__visual',
    '.about__text',
    '.contact__text',
    '.contact__form-wrap',
  ];

  revealTargets.forEach((selector, selectorIndex) => {
    $$(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay for sibling items
      const delay = Math.min(i * 0.1, 0.4);
      el.style.transitionDelay = `${delay}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // only reveal once
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    }
  );

  $$('.reveal').forEach(el => observer.observe(el));
};

/* =============================================
   4. ANIMATED STAT COUNTERS
   ============================================= */

const initCounters = () => {
  const counters = $$('.stat__number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = prefersReducedMotion() ? 0 : 1800;
    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutQuart(progress) * target);
      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };

    if (duration === 0) {
      el.textContent = target;
    } else {
      requestAnimationFrame(tick);
    }
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => counterObserver.observe(el));
};

/* =============================================
   5. PORTFOLIO FILTER
   ============================================= */

const initPortfolioFilter = () => {
  const filterBtns = $$('.filter-btn');
  const workCards  = $$('.work-card');

  if (!filterBtns.length || !workCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards
      workCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.removeAttribute('aria-hidden');
        } else {
          card.classList.add('hidden');
          card.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
};

/* =============================================
   6. CONTACT FORM VALIDATION
   ============================================= */

const initContactForm = () => {
  const form       = $('#contact-form');
  if (!form) return;

  const statusEl   = $('#form-status');

  /**
   * Validate a single field
   * @param {HTMLInputElement|HTMLTextAreaElement} field
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (field) => {
    const value = field.value.trim();
    const id    = field.id;
    let error   = '';

    if (field.required && !value) {
      error = 'This field is required.';
    } else if (id === 'email' && value) {
      // Basic email pattern
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (id === 'name' && value && value.length < 2) {
      error = 'Name must be at least 2 characters.';
    } else if (id === 'message' && value && value.length < 10) {
      error = 'Message must be at least 10 characters.';
    }

    return error;
  };

  /**
   * Show or clear error for a field
   * @param {HTMLElement} field
   * @param {string} error
   */
  const setFieldError = (field, error) => {
    const errorEl = $(`#${field.id}-error`);
    if (errorEl) errorEl.textContent = error;
    if (error) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    }
  };

  // Live validation on blur
  $$('[required], #email', form).forEach(field => {
    field.addEventListener('blur', () => {
      const error = validateField(field);
      setFieldError(field, error);
    });

    // Clear error on input
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        setFieldError(field, '');
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = $$('input[required], textarea[required]', form);
    let hasErrors = false;

    fields.forEach(field => {
      const error = validateField(field);
      setFieldError(field, error);
      if (error) hasErrors = true;
    });

    if (hasErrors) {
      // Focus first error field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate successful submission
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // Simulate async operation
    setTimeout(() => {
      statusEl.className = 'form-status success';
      statusEl.textContent = '✓ Message sent! We\'ll be in touch shortly.';
      statusEl.focus();
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';

      // Clear status after 6 seconds
      setTimeout(() => {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      }, 6000);
    }, 1200);
  });
};

/* =============================================
   7. BACK TO TOP
   ============================================= */

const initBackToTop = () => {
  const btn = $('#back-to-top');
  if (!btn) return;

  const onScroll = throttle(() => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, 150);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Move focus to top for accessibility
    const skipLink = $('.skip-link');
    if (skipLink) skipLink.focus();
  });
};

/* =============================================
   8. FOOTER YEAR
   ============================================= */

const initFooterYear = () => {
  const yearEl = $('#footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

/* =============================================
   9. SCROLLSPY — Active nav link
   ============================================= */

const initScrollspy = () => {
  const sections = $$('main section[id]');
  const navLinks = $$('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            if (isActive) {
              link.setAttribute('aria-current', 'true');
              link.style.color = 'var(--clr-mocha)';
            } else {
              link.removeAttribute('aria-current');
              link.style.color = '';
            }
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));
};

/* =============================================
   10. SMOOTH FOCUS MANAGEMENT
   ============================================= */

const initFocusRing = () => {
  // Only show focus ring when navigating with keyboard
  let isKeyboard = false;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isKeyboard = true;
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    isKeyboard = false;
    document.body.classList.remove('keyboard-nav');
  });
};

/* =============================================
   INIT — DOMContentLoaded
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initStickyHeader();
  initScrollReveal();
  initCounters();
  initPortfolioFilter();
  initContactForm();
  initBackToTop();
  initFooterYear();
  initScrollspy();
  initFocusRing();

  // Log project info to console (DecodeLabs branding)
  console.log(
    '%c⬡ Digital Craftsmanship%c\nFull Stack Project 1 | DecodeLabs Batch 2026\nBuilt with: HTML5 · CSS3 · Vanilla JS\nNo frameworks. Fundamentals first.',
    'color: #A5856E; font-size: 18px; font-weight: bold; font-family: monospace;',
    'color: #6b6860; font-size: 12px; font-family: monospace;'
  );
});
