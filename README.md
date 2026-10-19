# Nadiah Albinali — Personal Portfolio (Assignment 2)
A simple, responsive personal portfolio site, built in Assignment 1 and
extended in Assignment 2 (*Interactive Features*) with personalization, clearer form
feedback, and animation.
## Project Description

This is a single-page portfolio with 4 core sections:
### Interactive features (JavaScript)

- **Dark / light theme toggle**, saved to `localStorage` so it persists
  between visits.
- **Personalized greeting** — a time-of-day greeting (morning/afternoon/
  evening/night) that includes the visitor's name once they save it.
- **Mobile navigation menu** with a hamburger toggle.
- **Contact form validation** with inline error messages.
- Smooth scrolling to sections via anchor links.

### New in Assignment 2

- **Name form for first-time visitors** — asks "What's your name?" and
  saves the answer to `localStorage` (key: `visitorName`). After saving,
  the form hides and a "Not you? Change name" option appears.
- **Clearer error messages** — every field now has separate messages for
  *empty* and *invalid* input, errors clear as soon as the visitor starts
  fixing a field, and the cursor jumps to the first field with a problem.
- **Friendlier success message** on the contact form, which makes clear
  that no backend is connected yet.
- **Fade-in animation** on the greeting, error messages, and success
  message. It is turned off automatically for visitors who prefer reduced
  motion (`prefers-reduced-motion`).

It's built with plain **HTML, CSS, and JavaScript** — no frameworks — and is
fully responsive across desktop, tablet, and mobile.

### Interactive features (JavaScript)

- **Dark / light theme toggle**, saved to `localStorage` so it persists
  between visits.
- **Time-of-day greeting** above the hero heading (morning/afternoon/
  evening/night, based on the visitor's local time).
- **Mobile navigation menu** with a hamburger toggle.
- **Contact form validation** (name length, email format, message length)
  with inline error messages — no backend required.
- Smooth scrolling to sections via anchor links.

## Folder Structure
```
assignment-2/
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
