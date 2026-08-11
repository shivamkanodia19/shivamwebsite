# Product Requirements Document

## Product

**Name:** Shivam Kanodia Portfolio Redesign

**Tagline:** A portfolio-first personal site with pitch-deck sharpness, real proof, and a separate high-conviction narrative mode.

## Product Summary

This project is a redesign and rebuild plan for `shivamkanodia.com`.

The current site already has a distinctive point of view:

- dark editorial presentation
- strong serif + mono contrast
- pitch-deck-inspired framing
- ambitious personal brand positioning

The redesign should preserve that edge, but fix the main trust and usability problems:

- the site currently feels more like a stylish wrapper than a finished portfolio system
- the most credible proof is present, but under-leveraged
- the pitch experience is interesting, but works better as a dedicated route than as a modal overlay
- mobile readability and conversion clarity need work

The target outcome is not a safer, more generic site.

The target outcome is a sharper site that feels:

- memorable
- high-agency
- credible
- easier to trust
- easier to skim
- easier to act on

## Problem

The current live site has four core issues:

1. It communicates taste faster than proof.
2. It asks visitors to buy into the narrative before they have enough evidence.
3. The `Pitch` experience behaves like a dramatic add-on instead of a core, intentional surface.
4. Important trust details break or land weakly on mobile, including a broken resume embed.

## Live Audit Findings

These findings were observed from the production site on 2026-05-21.

### What Is Working

- The visual identity is coherent and more memorable than a typical student portfolio.
- `Everything outside the pitch.` is a strong section heading.
- The typography pairing is strong.
- The site already frames Shivam as someone who spans research, product, and execution.
- The portfolio includes real projects and real metrics, not filler.

### What Is Not Working

- The embedded resume points to `/resume.pdf` and currently returns `404`.
- Body copy is too faint and small in several places, especially on mobile.
- The main page is portfolio content, but the pitch concept is treated like a modal experience rather than a first-class route.
- The first pitch slide is bold, but it risks overreaching before proof is established.
- Project cards are text-heavy and under-visualized.
- The design language promises a deck, but the site often delivers stacked text panels instead of actual narrative proof surfaces.

## Product Vision

Build a portfolio that feels like:

- a founder-quality personal brand site
- an operator/researcher portfolio with proof
- an optional pitch-deck layer for visitors who want the narrative

The homepage should be the high-trust default.

The pitch should be a deliberate secondary route for:

- founders
- mentors
- investors
- startup operators
- anyone who wants the compressed story

## Target Audiences

### Primary

- startup founders
- product, ops, and engineering hiring managers
- internship recruiters
- research collaborators
- mentors and advisors

### Secondary

- peers
- student builders
- people discovering Shivam through LinkedIn or cold outreach

## Product Goals

- Preserve the current distinctiveness without keeping the current friction.
- Make the portfolio-first experience clearer and more credible in the first 20 seconds.
- Separate `Portfolio` and `Pitch` into clearly intentional surfaces.
- Increase trust by emphasizing proof, outcomes, screenshots, and specifics.
- Make mobile readability materially better.
- Fix broken assets and obvious quality leaks.
- Make it easier for a visitor to decide:
  - who Shivam is
  - what he has built
  - what he wants next
  - how to contact him

## Non-Goals

- Turning the site into a generic SaaS-style portfolio
- Adding a CMS or blog in v1
- Overcomplicating the site with heavy motion or animation-first storytelling
- Replacing the dark, editorial identity with a bright corporate style
- Expanding scope into a full case-study publishing engine before the core site is strong

## Product Thesis

The right move is not to abandon the pitch-deck theme.

The right move is to evolve it:

- portfolio-first for trust
- pitch-second for narrative
- proof before grandiosity
- visuals before dense text

The design should still feel unmistakably Shivam, but the information hierarchy should become more professional and more conversion-aware.

## Jobs To Be Done

- Tell me quickly what Shivam is unusually good at.
- Show me real proof that he builds, researches, and ships.
- Help me understand his best 2-3 projects without making me dig.
- Let me skim a compelling narrative if I want the story version.
- Make it obvious how I should reach out if I want to hire, advise, or collaborate.

## User Stories

- As a recruiter, I want to understand Shivam's strongest projects and fit in under a minute.
- As a founder, I want to quickly tell whether Shivam has real operator energy or just polished self-presentation.
- As a mentor or advisor, I want a concise way to understand his trajectory and current ask.
- As a mobile visitor, I want the site to feel readable and finished rather than dense and fragile.
- As Shivam, I want the site to stand out without undermining trust.

## Current Decisions

- Keep the dark editorial aesthetic.
- Keep the serif + mono pairing unless implementation quality forces a close substitute.
- Keep the phrase `pitch` in the product language, but move the pitch experience out of a modal and into its own route.
- Keep the homepage as the default landing surface.
- Make the homepage more visual and proof-heavy.
- Elevate 2-3 strongest stories rather than giving all projects equal weight.
- Keep contact and internship ask visible, but make them feel more intentional and less like a footer afterthought.
- Fix `resume.pdf` as a non-negotiable baseline task.

## Information Architecture

### Primary Surfaces

- Homepage
- Dedicated pitch route
- Resume asset
- Optional project detail anchors or lightweight case-study sections

### Homepage Structure

1. Hero
2. Fast credibility strip
3. Core thesis / who I am
4. Selected work
5. Traction and outcomes
6. Direction / what I am looking for
7. Contact

### Dedicated Pitch Route

The pitch route should feel like a compact story, not a modal interruption.

Recommended flow:

1. Problem / worldview
2. Founder
3. Selected proof
4. Traction
5. Direction
6. Ask
7. Contact

## Functional Requirements

### 1. Homepage Must Be Portfolio-First

- The homepage must work without requiring the pitch route.
- It must stand on its own as the main hiring and credibility surface.
- A visitor must be able to understand Shivam's background, strongest work, and current ask without opening a secondary experience.

### 2. Pitch Must Be A Dedicated Route

- Replace the modal pitch with a full route such as `/pitch`.
- Keep keyboard navigation if it remains useful.
- Preserve narrative energy while improving accessibility and shareability.
- The pitch route should be linkable directly.

### 3. Proof Must Be More Visual

- At least the top 2-3 projects should have richer proof surfaces:
  - screenshots
  - diagrams
  - metrics
  - logos
  - mini timelines
  - before/after summaries

### 4. Mobile Readability Must Improve

- Body copy must become easier to read.
- Low-contrast text should be reduced.
- Dense paragraphs should be broken up.
- Important proof should not rely on tiny caption text.

### 5. Resume Must Work Reliably

- The resume asset must resolve in production.
- The resume should be reachable from a clear CTA.
- The embed should degrade gracefully if the browser does not render PDFs inline.

### 6. Navigation Must Clarify Intent

- `Portfolio`, `Pitch`, and `Contact` must feel like distinct destinations or actions.
- Navigation labels should map cleanly to the content structure.
- `Pitch` should no longer surprise users with a modal takeover.

### 7. Accessibility Must Be Good Enough To Trust

- Keyboard navigation must remain usable.
- Modal behavior should not be retained unless it behaves as a true accessible modal.
- If a modal remains anywhere in the product, it must follow current dialog accessibility guidance.

### 8. Performance Must Remain Lightweight

- Keep the site fast and static-friendly.
- Avoid introducing a heavy client-side experience unless it materially improves storytelling.

## Design Principles

- Proof before posture
- Editorial, not ornamental
- Dramatic where earned
- Calm where clarity matters
- Strong hierarchy, not wall-of-text density
- Real projects over self-description
- Memorable without becoming gimmicky

## Success Criteria

The redesign is successful if it can pass these tests:

- A recruiter can understand the site's core message in under 30 seconds.
- A founder can see real proof of execution without hunting.
- The pitch route feels intentional and polished, not bolted on.
- The homepage feels more trustworthy without feeling generic.
- Mobile readability improves noticeably.
- No broken key assets remain in production.

## Assumptions And Constraints

- The website source code was not present in this vault during planning.
- The deployed site appears to be a `React` + `Vite` static app, based on the live production bundle structure:
  - `#root` mount point
  - module script under `/assets/index-*.js`
  - stylesheet under `/assets/index-*.css`
- The current production site uses:
  - `Playfair Display`
  - `IBM Plex Mono`
- This PRD is intended as a build brief for the actual site repo, not as a direct implementation inside this vault.

## Documentation Notes

`Context7` was requested for current documentation lookup, but it was not available in this environment on 2026-05-21.

Fallback official references used for build guidance:

- Vite static asset handling and `public` directory:
  - https://vite.dev/guide/assets.html
- React root guidance:
  - https://react.dev/reference/react-dom/client/createRoot
- WAI modal dialog accessibility guidance:
  - https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

Implications for implementation:

- If the live app is still Vite-based, `resume.pdf` should either live in `public/` and be referenced as `/resume.pdf`, or be imported properly if hashing is desired.
- If any modal remains, it should behave like a real modal dialog with correct focus handling and close behavior.
