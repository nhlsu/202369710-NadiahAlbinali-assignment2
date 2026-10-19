# Technical Documentation

## Overview

A static, four-section personal portfolio site (About, Projects, Experience,
Contact) built with vanilla HTML, CSS, and JavaScript — no frameworks or
build tools.

Assignment 2 extends the Assignment 1 site with a personalized greeting, a
visitor name saved in `localStorage`, clearer validation messages, and a
fade-in animation.

## File Structure

| File | Purpose |
|---|---|
| `index.html` | Page markup: header/nav, hero (greeting + name form), About, Projects, Experience, Contact, footer. |
| `css/styles.css` | All styling: CSS variables for theming, reset, layout (Flexbox/Grid), components, name form, fade-in animation, and responsive breakpoints. |
| `js/script.js` | All interactivity, split into small functions (see below). |
| `assets/images/` | Placeholder SVGs for the profile photo and project cards. |
| `docs/ai-usage-report.md` | AI usage documentation. |
| `docs/technical-documentation.md` | This file. |

## Architecture & Key Decisions

### Theming
Theme colors are defined as CSS custom properties on `:root`, with a
`[data-theme="dark"]` override block. `js/script.js` toggles a
`data-theme="dark"` attribute on `<html>` and saves the choice in
`localStorage`, falling back to the OS-level `prefers-color-scheme` on the
first visit. All new Assignment 2 styles use the same variables, so they
switch with the theme automatically.

### Layout
- **Flexbox** is used for the navbar, hero content, both forms, and the
  name input + Save button row.
- **CSS Grid** (`repeat(auto-fit, minmax(260px, 1fr))`) is used for the
  Projects grid so cards reflow without extra media queries.
- Responsive breakpoints at `900px` (tablet) and `640px` (mobile).

### JavaScript (`js/script.js`)
All features start from one `DOMContentLoaded` listener:

| Function | What it does |
|---|---|
| `initThemeToggle()` | Reads/writes the `theme` key, toggles `data-theme`, swaps the icon. |
| `getTimeGreeting()` | Returns the time-of-day phrase based on the visitor's local hour. |
| `renderGreeting()` | Builds the full greeting, adding the saved name if there is one. Called on load, after saving, and after "Change name". |
| `playFadeIn(el)` | Restarts the fade-in animation on any element (shared helper). |
| `initNameForm()` | Handles the hero name form: validation, saving, hiding the form, and the "Not you? Change name" button. |
| `initMobileNav()` | Toggles the mobile menu and `aria-expanded`; closes it on link click. |
| `initContactForm()` | Validates the contact form and shows error / success messages. |
| `initFooterYear()` | Writes the current year in the footer. |

### Data storage (`localStorage`)

| Key | Value | Set by |
|---|---|---|
| `theme` | `"dark"` or `"light"` | Theme toggle |
| `visitorName` | The visitor's trimmed name | Name form |

The name key is stored once in a constant (`NAME_KEY`) so it can't be
misspelled in different places. Data stays in the visitor's own browser
only. To clear it: DevTools → Application → Local Storage → delete the keys,
or click "Not you? Change name".

### Personalized greeting flow
1. On page load, `renderGreeting()` checks `localStorage` for `visitorName`.
2. **No name saved:** shows the time-of-day greeting only, and
   `initNameForm()` reveals the name form.
3. **Name saved:** shows e.g. "Good evening, Nadiah! Welcome to my
   portfolio." and the "Not you? Change name" button instead of the form.
4. Saving works by clicking **Save** or pressing **Enter**, because the code
   listens to the form's `submit` event, which fires for both.
5. "Change name" removes the key, clears the input, shows the form again,
   resets the greeting, and moves focus into the input.

Both the form and the "Change name" button start with the HTML `hidden`
attribute, and JavaScript decides which one to show. This prevents the form
from flashing for returning visitors, and the page still works if
JavaScript fails to load.

### Validation & error messages
Each field has separate messages for **empty** and **invalid** input. All
input is trimmed with `.trim()` before checking.

| Field | Empty | Invalid |
|---|---|---|
| Hero name | You haven't entered a name yet. Please type your name and click Save. | — |
| Contact name | Please enter your name. | Your name needs at least 2 characters. |
| Contact email | Please enter your email address. | That email looks incomplete. Try something like name@example.com. |
| Contact message | Please write a message before sending. | Your message is a bit short. Please write at least 10 characters. |

In the contact form, the rules and messages are kept together in one
`fields` array, so a message can be changed in one place. All fields are
checked on submit so every problem shows at once. The cursor moves to the
first invalid field, and each field's error clears as soon as the visitor
types in it (`input` event). Invalid inputs also get a red border (`.invalid`).

### Animation
- `@keyframes fadeIn` moves an element from invisible and 8px lower to fully
  visible in place, over 0.5s. The `.fade-in` class applies it.
- `playFadeIn()` removes the class, forces a reflow (`void el.offsetWidth`),
  and adds the class back. Without the reflow, the browser merges the remove
  and add into one step and the animation would not replay.
- It runs on the greeting, error messages, and the success message.
- `@media (prefers-reduced-motion: reduce)` turns the animation off for
  visitors who have asked their device for less motion.

### Security note
The visitor's name is always inserted with `textContent`, never
`innerHTML`, so typed HTML (e.g. `<b>Name</b>`) is shown as plain text and
cannot change the page.

### Accessibility notes
- All interactive controls have `aria-label`/`aria-expanded` where relevant.
- Form inputs use `<label for="">` tied to input `id`s.
- The greeting and the name form's error use `aria-live="polite"`, so
  screen readers announce changes without interrupting.
- "Not you? Change name" is a `<button>` (not a link) because it performs an
  action, so it is keyboard-accessible and announced correctly.
- The fade-in animation respects `prefers-reduced-motion`.
- Images include descriptive `alt` text.

## Bugs Found & Fixed in Assignment 2

| Bug | Cause | Fix |
|---|---|---|
| Contact form's Name error never appeared | Two elements had `id="name-error"` (hero form and contact form); `getElementById` returned the first one | Renamed the hero error to `visitor-name-error` |
| Hero and button styles disappeared | Pasting new CSS replaced existing rules instead of adding to them | Restored the rules from the last commit; now checking `git diff` before committing |
| Save button used a different font | `<button>` elements don't inherit fonts by default | Added `font: inherit` to `.btn` (also fixes Send Message) |
| Footer year was blank | A misplaced `}` nested `initFooterYear()` inside `initContactForm()` | Moved the closing brace |
| Risk: form would never hide | `display: flex` overrides the `hidden` attribute | Added `.name-form[hidden], .change-name[hidden] { display: none; }` |

## Known Limitations

- The contact form has no backend. Submissions are validated client-side
  only and are not sent or stored anywhere.
- The saved name is stored per browser. It doesn't follow the visitor to
  another device, and clearing site data removes it.
- The hero name form only rejects empty names; any other text up to 30
  characters (`maxlength`) is accepted.
- Project images are placeholder SVGs.
- Not yet tested end-to-end with a screen reader.

## Browser/Device Testing

Manually tested in Google Chrome using DevTools device emulation at 375px,
768px, 1024px, and 1440px, in both light and dark themes.

Checked: saving a name with the button and with Enter; empty-name error;
name remembered after reload; "Change name" reset; contact form empty,
invalid, and valid submissions; errors clearing while typing; fade-in on
greeting, errors, and success message; theme toggle and mobile menu still
working. No JavaScript console errors during testing.