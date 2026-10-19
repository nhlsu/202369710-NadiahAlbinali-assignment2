# Nadiah Albinali — Personal Portfolio (Assignment 2)

A simple, responsive personal portfolio site, built in Assignment 1 and
extended in Assignment 2 (*Interactive Features*) with personalization,
clearer form feedback, and animation.

## Project Description

This is a single-page portfolio with four core sections:

- **About Me** — a short intro and quick facts about me.
- **Projects** — cards for coursework and portfolio projects: a data science
  project on factors affecting study performance, a CPU design (COE 301), a
  traffic light controller (COE 203), a Football Analytics Dashboard
  (pending), and a computer-vision project in progress.
- **Experience** — cards summarizing my roles across student
  organizations and activities.
- **Contact** — a client-side-only form (Name, Email, Message) with
  validation and no backend.

It's built with plain **HTML, CSS, and JavaScript** — no frameworks — and is
fully responsive across desktop, tablet, and mobile.

### Interactive features (JavaScript)

- **Dark / light theme toggle**, saved to `localStorage` so it persists
  between visits.
- **Personalized greeting** — a time-of-day greeting (morning/afternoon/
  evening/night) that includes the visitor's name once they save it.
- **Mobile navigation menu** with a hamburger toggle.
- **Contact form validation** with inline error messages.
- Smooth scrolling to sections via anchor links.

### New in Assignment 2

| Criterion | Feature | Where to find it | How to check |
|---|---|---|---|
| **Dynamic content** | Personalized greeting — time-of-day greeting that includes the visitor's name | `index.html` (`#greeting`), `js/script.js` → `renderGreeting()` | Save a name; the greeting updates to "Good evening, Name!" |
| **Data handling / localStorage** | Name saved under the key `visitorName`; form shown only to first-time visitors, with a "Not you? Change name" option | `js/script.js` → `initNameForm()` | Save a name, reload — it's remembered. Click "Change name" to clear it. |
| **Error handling** | Separate messages for *empty* and *invalid* input; errors clear while typing; cursor jumps to the first problem field | Name form: `#visitor-name-error`. Contact form: `js/script.js` → `validateField()` | Submit both forms empty, then with invalid values |
| **User feedback** | Clearer contact-form error messages and a friendlier success message that states no backend is connected | `js/script.js` → `initContactForm()` (the `fields` list) | Submit valid details in the Contact section |
| **Animation** | Fade-in on the greeting, error messages, and success message; disabled for `prefers-reduced-motion` | `css/styles.css` → `@keyframes fadeIn`, `.fade-in`; `js/script.js` → `playFadeIn()` | Save a name or trigger an error and watch it fade in |
| **Documentation** | Updated README, technical documentation, and AI usage report | `README.md`, `docs/` | — |
| **AI integration** | AI usage documented; AI evidence kept outside the repository | `docs/ai-usage-report.md`; evidence submitted separately | — |

## Folder Structure
```
202369710-NadiahAlbinali-assignment2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Setup Instructions (Run Locally)

No build tools or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` directly in your browser, **or** serve it locally for
   the best experience:
```bash
   # Python 3
   python3 -m http.server 8000
   # then visit http://localhost:8000
```
3. That's it — no `npm install`, no build step.

## How to Test the Assignment 2 Features

1. Open the site. The name form should appear under the greeting.
2. Click **Save** with the field empty — an error message appears.
3. Type your name and press **Enter** — the greeting updates with your
   name and the form is replaced by "Not you? Change name".
4. Reload the page — your name is still in the greeting.
5. Click **Not you? Change name** — the greeting resets and the form returns.
6. In the Contact section, submit the form empty, then with an invalid
   email — each field shows its own message, and errors clear as you type.
7. Submit valid details — a success message fades in.

To clear saved data manually: DevTools → **Application** → **Local Storage**,
then delete `visitorName` (and `theme`).

## Deployment (optional)

To deploy for free on **GitHub Pages**:

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under "Source," select the `main` branch and `/ (root)` folder.
4. Save — your site will be live at
   `https://<username>.github.io/<repo-name>/` within a minute or two.

## AI Usage

AI assistance (Claude) was used in both assignments for planning,
scaffolding HTML/CSS/JS, reviewing code, and debugging. In Assignment 2 it
was also used to plan the new features step by step and to catch bugs
during testing. Full details, including what was modified and why, are in
[`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## Author

**Nadiah Albinali** — Computer Science student, King Fahd University of
Petroleum and Minerals (KFUPM), focused on ML and data science.
