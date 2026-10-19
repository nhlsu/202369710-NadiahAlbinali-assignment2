# AI Usage Report

## Tools Used & Use Cases

**Claude (Anthropic)** was the primary AI tool used for this assignment.

| Use Case | How it was used |
|---|---|
| Code generation | Generated the initial HTML structure (About/Projects/Experience/Contact sections), the CSS layout (Flexbox/Grid, theme variables, responsive breakpoints), and the JavaScript features (theme toggle, greeting message, mobile nav, form validation). |
| Iteration & revision | Used across several rounds of edits: swapping placeholder projects for my real coursework (CPU design for COE 301, traffic light controller for COE 203, a data science project on study performance), marking a project as pending, removing one that no longer applied, adding a new Experience section, and rewriting the About Me text in my own voice. |
| Documentation support | Drafted the initial structure of this `README.md`, `ai-usage-report.md`, and `technical-documentation.md`, which I then reviewed and edited. |
| UI/UX design suggestions | Suggested a card-based layout for the Projects and Experience sections and a sticky navbar with a theme toggle, informed by common portfolio site patterns. |
| Debugging | Used to catch and fix a real bug: in dark mode, some sections weren't picking up the dark background properly during the toggle transition. Also helped troubleshoot Git/GitHub push errors (repository naming, folder nesting from a zip extraction, remote URL mismatches). |
| Automated visual testing | Rather than manually eyeballing the CSS, I had Claude render the page in a headless browser and take screenshots of both the light and dark themes. Comparing those screenshots is what actually caught the dark-mode background bug — a transition timing issue that wasn't obvious from reading the code alone. |

## Benefits & Challenges

**Benefits:**
- Sped up the boilerplate/scaffolding stage significantly — I could focus my
  time on customizing content and layout instead of writing repetitive CSS
  resets and JS event-listener wiring from scratch.
- Helped me apply responsive design patterns (CSS Grid `auto-fit`, `clamp()`
  for fluid typography) that I hadn't used confidently before.
- Made revising content fast — when I decided to change which projects to
  feature or rewrite my About Me section to sound more like me, I could
  iterate in minutes instead of manually editing HTML/CSS by hand each time.
- Helped debug a real Git/GitHub issue I ran into while pushing (a nested
  folder from unzipping, and a repo name typo) instead of me having to guess.

**Challenges:**
- AI-generated first drafts of the "About Me" text and project descriptions
  read as generic and needed multiple rounds of rewriting before they
  actually sounded like me.
- Had to verify AI suggestions rather than trust them outright — for
  example, catching a dark-mode background bug that only showed up when
  actually testing the toggle, not from reading the code alone.
- Some AI assumptions about my personal interests (from an earlier draft)
  weren't accurate, which was a good reminder to double-check any personal
  content the AI generates before keeping it.

## Learning Outcomes

- Reinforced how CSS custom properties (`:root` variables) can drive a full
  dark/light theme without duplicating styles, and how transition timing
  can cause visual bugs if not every element explicitly references the
  themed variables.
- Learned how `prefers-color-scheme` and `localStorage` work together to
  respect both system settings and explicit user choice.
- Practiced writing clean, semantic HTML with accessibility in mind (`alt`
  text, `aria-expanded`, `aria-label`, form labels tied to inputs).
- Got more comfortable with CSS Grid's `repeat(auto-fit, minmax(...))`
  pattern for responsive card layouts without media queries.
- Picked up a clearer understanding of Git workflows: initializing a repo,
  fixing an accidentally nested folder structure, and resolving a
  "repository not found" error caused by a remote URL mismatch.

## Responsible Use & Modifications

- All AI-generated content (project descriptions, About Me text) was
  rewritten in multiple passes with my own real information, interests, and
  voice rather than left as generic placeholder text.
- I reviewed every file line by line, removed unused code, and adjusted
  naming/comments for clarity before committing.
- I manually tested the site (resizing the browser, toggling the theme,
  submitting the contact form with valid/invalid input) rather than trusting
  that the AI-generated code worked without verification, which is how the
  dark-mode background bug was caught and fixed.
- No AI-generated content was submitted unmodified — the structure was
  AI-assisted, but the content, personalization, project selection, and
  final code review are my own.
- Used an automated screenshot-comparison approach (rather than just reading code or clicking around manually) to verify the site actually rendered correctly in both themes — this caught a real bug that code review alone had missed.


---

# Assignment 2 — AI Usage

## Tools Used & Use Cases

**Claude (Anthropic)** was used again, this time with a more step-by-step,
collaborative approach: I asked it to suggest one change at a time, leave
small parts for me to fill in, and explain each change so I could document it.

| Use Case | How it was used |
|---|---|
| Planning | Claude reviewed my Assignment 1 repository and proposed a file-by-file plan (which files to check first and what each needed) before any code was written. |
| Code generation | Suggested the HTML for the name form, the JavaScript for the personalized greeting and `localStorage` logic, the CSS for the name form and fade-in animation, and a refactor of the contact form validation. |
| Guided coding | For several steps, Claude left blanks for me to complete, e.g. the `novalidate` attribute, the input placeholder, `display: none`, the error color, the animation offset (`8px`), the `input` event, and my own success message wording. |
| Design decisions | I made the key choices myself: showing the name form only to first-time visitors with a "Not you? Change name" option, not auto-filling the contact form, and keeping the error messages simple. |
| Testing | Claude tested the new JavaScript in a headless browser on a copy of my page before I applied it; I then tested everything manually in Chrome. |
| Debugging | Used to diagnose bugs I noticed while testing (see below). |
| Documentation | Drafted the updated README (including the criteria table, which I asked for) and technical documentation, which I reviewed and adjusted. |

## Bugs Found During Assignment 2

| Bug | How it was found | Fix |
|---|---|---|
| Contact form's Name error never appeared | I noticed it while testing. Claude traced it to a duplicate `id="name-error"` — **a mistake in the AI-suggested HTML** — which made the contact form write into the hidden hero form's error instead. | Renamed the hero error to `visitor-name-error`. |
| Hero and button styles disappeared | My paste replaced existing CSS instead of adding to it. Claude compared my file with the last commit to find what was missing. | Restored the missing rules from the last commit. |
| Save button looked "off" | I noticed it visually; Claude explained that `<button>` elements don't inherit fonts. | Added `font: inherit` to `.btn`. |
| Footer year would break | Claude reviewed my pasted JavaScript and found a misplaced `}` that nested `initFooterYear()` inside another function. | Moved the closing brace. |

## Benefits & Challenges

**Benefits:**
- Breaking the work into small steps (HTML → JS → CSS → messages → docs)
  with one Git branch per feature kept every change easy to review and test.
- Filling in parts of the code myself helped me understand *why* each line
  is there instead of just pasting a finished file.
- Having the AI test code before I applied it, and review my pasted files
  afterwards, caught problems early.

**Challenges:**
- The AI introduced a real bug (the duplicate `id`), which showed me that
  AI-suggested code still has to be tested in the full page, not just on
  its own.
- Copy-pasting large blocks caused my own mistakes (overwritten CSS, a
  misplaced brace), so I started checking `git diff` before every commit.

## Learning Outcomes

- How to use `localStorage` to persist data across visits (`setItem`,
  `getItem`, `removeItem`) and why a single constant for the key avoids typos.
- Why an `id` must be unique: `getElementById` silently returns only the
  first match.
- How `display` rules override the HTML `hidden` attribute, and how to
  prevent that with a `[hidden]` rule.
- How to restart a CSS animation from JavaScript (remove class → force
  reflow → add class), and how to respect `prefers-reduced-motion`.
- Why `textContent` is safer than `innerHTML` for user input.
- Writing clearer form feedback by separating "empty" and "invalid" errors.
- Using feature branches and `git diff` as part of my normal workflow.

## Responsible Use & Modifications

- I reviewed every suggested change before applying it and tested each
  feature manually in Chrome, in both light and dark themes.
- I made the design and wording decisions myself, and wrote parts of the
  code where the AI left blanks.
- Bugs were caught through my own testing and fixed with AI help; the
  AI's own mistake (duplicate `id`) is documented above rather than hidden.
- Commits that included AI-assisted code are marked with an
  `Assisted-by: Claude` line.
  - The full conversation (share link), a readable transcript, and the
  intermediate AI artifacts are submitted in the AI evidence ZIP on
  Blackboard, not in this repository.
## Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Opus 5.5) | 2026-10-19 – 2026-10-20 | Full Assignment 2 session: planning, code suggestions, debugging, documentation | All files below | Worked step by step, filling in parts of the code myself; full conversation in `conversations/` |
| A01 | Claude (Opus 5.5) | 2026-10-19 | Name form HTML in the hero section | `index.html` | Filled in `novalidate` and the placeholder; later renamed the error id to `visitor-name-error` to fix a duplicate-id bug. Verified by testing both forms in Chrome. |
| A02 | Claude (Opus 5.5) | 2026-10-19 | Personalized greeting and `localStorage` name logic | `js/script.js` | Updated the error id after the duplicate-id bug. Verified by saving, reloading, and changing the name in Chrome. |
| A03 | Claude (Opus 5.5) | 2026-10-19 | Name form styles and fade-in animation | `css/styles.css` | Filled in `display: none`, the error color, and the `8px` offset; added `font: inherit` to `.btn`; restored hero/button rules my paste had overwritten. Verified visually in light and dark mode. |
| A04 | Claude (Opus 5.5) | 2026-10-19 | Contact form validation messages | `js/script.js` | Filled in the `input` event and wrote my own success message; fixed a misplaced `}`. Verified empty, invalid, and valid submissions in Chrome. |
| A05 | Claude (Opus 5.5) | 2026-10-19 – 2026-10-20 | README update (first version and criteria-table version) | `README.md` | Filled in the assignment name; asked for each feature to be labeled with its criterion. Checked how it renders on GitHub. |
| A06 | Claude (Opus 5.5) | 2026-10-19 | Technical documentation | `docs/technical-documentation.md` | Filled in my testing browser; reviewed against my code. |
| A07 | Claude (Opus 5.5) | 2026-10-19 – 2026-10-20 | AI usage report and this log | `docs/ai-usage-report.md` | Added the declaration; checked every statement against what I actually did. |
| A08 | Claude (Opus 5.5) | 2026-10-20 | Readable chat transcript (prompts word for word, replies summarized) | None (evidence only) | Used only as a readable extra; the full unedited conversation is the share link in `conversations/chat-link.txt`.
| A09 | Claude (Opus 5.5) | 2026-10-20 | Final complete README, after my pasted version had duplicated sections | `README.md` | Replaced the README with the complete version; checked the table and sections render correctly on GitHub. |

## Declaration

I declare that this report and the attached evidence document all of my AI
use in this assignment, with complete and unedited conversations, and that
I understand and can explain all the code I submitted. I understand that
undeclared AI use or a false declaration will be treated as plagiarism
according to KFUPM regulations.

**Name:** Nadiah Albinali
**Student ID:** 202369710
**Date:** 20 October 2026
