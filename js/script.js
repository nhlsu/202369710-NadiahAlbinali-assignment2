/* =========================================================
   Nadiah Albinali — Portfolio Script
   Features:
   1. Dark / light theme toggle (persisted in localStorage)
   2. Personalized greeting (time of day + visitor name saved in localStorage)
   3. Smooth scrolling + mobile nav toggle
   4. Contact form validation (client-side only, no backend)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  renderGreeting();
  initNameForm();
  initMobileNav();
  initContactForm();
  initFooterYear();
});

/* ---------- 1. Theme toggle ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  // Respect a saved preference, otherwise fall back to system preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      icon.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      icon.textContent = '🌙';
    }
  }
}

/* ---------- 2. Greeting (time of day + saved visitor name) ---------- */
const NAME_KEY = 'visitorName';

// Returns the time-based part of the greeting
function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour < 5) return 'Welcome, night owl';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Writes the greeting, adding the visitor's name if one is saved
function renderGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  const name = localStorage.getItem(NAME_KEY);
  const timeGreeting = getTimeGreeting();

  greetingEl.textContent = name
    ? `${timeGreeting}, ${name}! Welcome to my portfolio.`
    : `${timeGreeting}! Welcome to my portfolio.`;

  playFadeIn(greetingEl);
}

// Restarts the fade-in animation on an element
function playFadeIn(el) {
  el.classList.remove('fade-in');
  void el.offsetWidth; // forces the browser to notice the removal
  el.classList.add('fade-in');
}

/* ---------- 2b. Name form (first-time visitors) ---------- */
function initNameForm() {
  const form = document.getElementById('name-form');
  const input = document.getElementById('visitor-name');
  const errorEl = document.getElementById('name-error');
  const changeBtn = document.getElementById('change-name');
  if (!form || !input || !errorEl || !changeBtn) return;

  updateNameUI();

  // Handles both clicking Save and pressing Enter in the input
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = input.value.trim();

    if (name === '') {
      showError('You haven’t entered a name yet. Please type your name and click Save.');
      return;
    }

    localStorage.setItem(NAME_KEY, name);
    clearError();
    updateNameUI();
    renderGreeting();
  });

  changeBtn.addEventListener('click', () => {
    localStorage.removeItem(NAME_KEY);
    input.value = '';
    clearError();
    updateNameUI();
    renderGreeting();
    input.focus();
  });

  // Shows the form OR the "Change name" button, depending on whether a name is saved
  function updateNameUI() {
    const hasName = Boolean(localStorage.getItem(NAME_KEY));
    form.hidden = hasName;
    changeBtn.hidden = !hasName;
  }

  function showError(message) {
    errorEl.textContent = message;
    input.classList.add('invalid');
    playFadeIn(errorEl);
  }

  function clearError() {
    errorEl.textContent = '';
    input.classList.remove('invalid');
  }
}
/* ---------- 3. Mobile nav toggle + smooth scroll close ---------- */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a link is clicked (smooth scroll is
  // handled natively via CSS `scroll-behavior: smooth` + href anchors)
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- 4. Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = '';

    const isNameValid = validateField(nameInput, (v) => v.trim().length >= 2,
      'Please enter your name (2+ characters).');

    const isEmailValid = validateField(emailInput, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      'Please enter a valid email address.');

    const isMessageValid = validateField(messageInput, (v) => v.trim().length >= 10,
      'Message should be at least 10 characters.');

    if (isNameValid && isEmailValid && isMessageValid) {
      // No backend: simulate a successful submission
      successMsg.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been noted (no backend is connected yet).`;
      form.reset();
    }
  });

  function validateField(input, isValid, message) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const valid = isValid(input.value);
    input.classList.toggle('invalid', !valid);
    errorEl.textContent = valid ? '' : message;
    return valid;
  }
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
