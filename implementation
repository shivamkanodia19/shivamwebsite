# Implementation Plan

This roadmap is ordered by build sequence, not by calendar time.

Each phase should be completed and visually verified before the next one is treated as active.

## Build Philosophy

- Keep the current sharp identity, but make the product more trustworthy.
- Solve the highest-leverage clarity problems first.
- Favor small, testable iterations over a giant aesthetic rewrite.
- Use production screenshots as a baseline before touching layout.
- Verify every major step on desktop and mobile.

## Phase 1: Baseline And Foundations

### Goal

Capture the current state, confirm the real repo structure, and eliminate obvious production-quality leaks.

### Add

- local repo audit
- stack confirmation
- screenshot baseline
- route map
- asset map
- resume fix
- content inventory

### Must Be True Before Moving On

- the actual site repo is identified
- build and preview commands work locally
- `resume.pdf` no longer 404s
- there is a written baseline of the current homepage and pitch experience

## Phase 2: Information Architecture And Content Tightening

### Goal

Make the site easier to understand before changing too much styling.

### Add

- clear homepage section order
- dedicated `pitch` route plan
- tightened hero copy
- credibility strip
- reduced paragraph density
- revised CTA language

### Must Be True Before Moving On

- the homepage reads like a portfolio, not a text stack
- the pitch experience is scoped as a separate route, not a modal dependency
- the core ask is obvious

## Phase 3: Homepage Redesign

### Goal

Turn the homepage into the highest-trust default surface.

### Add

- revised hero
- stronger section spacing and hierarchy
- proof-first selected work section
- traction strip or metric cluster
- cleaner contact section
- improved footer

### Must Be True Before Moving On

- a first-time visitor can understand Shivam's positioning in under 30 seconds
- the page feels more confident and less text-heavy
- desktop and mobile both feel intentional

## Phase 4: Selected Work Upgrade

### Goal

Make the best projects feel real, specific, and visual.

### Add

- upgraded project cards
- screenshots or visual placeholders
- structured outcomes
- role / scope labels
- technology or capability tags
- project prioritization

### Must Be True Before Moving On

- the top 2-3 projects clearly outrank the rest in depth
- cards no longer depend on dense copy to communicate value
- proof is visible without opening every item

## Phase 5: Dedicated Pitch Route

### Goal

Preserve the pitch-deck energy while making it more intentional and accessible.

### Add

- `/pitch` route
- deck-style narrative layout
- slide or section navigation
- strong open
- proof inserted earlier in the narrative
- clean close and return path back to the homepage

### Must Be True Before Moving On

- `Pitch` is directly linkable
- the experience feels designed, not bolted on
- users are not forced into a modal takeover

## Phase 6: Responsive And Accessibility Polish

### Goal

Make the site feel finished on mobile and more reliable overall.

### Add

- contrast tuning
- type scale tuning
- touch target review
- keyboard navigation pass
- focus-state pass
- motion restraint review
- modal/dialog compliance check if any modal remains

### Must Be True Before Moving On

- mobile body copy is comfortably readable
- no core flow depends on tiny or low-contrast text
- navigation and interactive elements work with keyboard input

## Phase 7: Performance, SEO, And Deployment Hygiene

### Goal

Clean up the production layer so the site ships reliably.

### Add

- asset verification
- metadata review
- social preview review
- lighthouse-style sanity pass
- broken-link pass
- deployment checklist

### Must Be True Before Moving On

- no broken core assets remain
- key pages have reasonable metadata
- the site stays lightweight and static-friendly

## Phase 8: Final QA And Narrative Calibration

### Goal

Make sure the tone is ambitious without drifting into overclaiming.

### Add

- final copy pass
- recruiter skim test
- founder skim test
- mobile screenshot review
- desktop screenshot review
- final issue log

### Must Be True Before Launch

- the site feels memorable without feeling inflated
- the homepage is the safest default route
- the pitch route is impressive without being the only way to understand Shivam

## Verification Standard For Every Phase

After each phase:

1. Run the local site.
2. Capture Playwright screenshots at desktop and mobile widths.
3. Compare against the previous baseline.
4. Record what improved, what regressed, and what still feels weak.

Recommended viewports:

- desktop: `1440x1000`
- mobile: `390x844`

## Recommended Working Loop

1. Explore the current code and identify the smallest viable change set.
2. Make one phase-sized set of edits.
3. Verify with Playwright screenshots and manual skim.
4. Run a reviewer loop:
   - producer
   - skeptic
   - integrator
5. Commit or checkpoint before starting the next phase.

## Highest-Priority Backlog Items

- Fix the broken resume asset.
- Move `Pitch` off the modal path and into its own route.
- Increase mobile readability.
- Reduce text density across homepage sections.
- Add more visual proof to the strongest projects.
- Rewrite the hero and supporting hierarchy so the homepage sells trust faster.

## Nice-To-Haves After Core Completion

- lightweight case-study detail pages
- project-specific screenshot carousels
- richer social preview images
- downloadable one-page profile PDF tailored for outreach
