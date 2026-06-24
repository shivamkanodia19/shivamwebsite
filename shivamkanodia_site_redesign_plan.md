# shivamkanodia.com Redesign Plan

Source-of-truth brief for Codex or any implementation agent working on `shivamkanodia.com`.

## 0. Immediate Objective

Redesign the current site so it feels more visually distinctive, more product/strategy-oriented, and less like a generic student engineering portfolio.

The site should visually prioritize, in this exact order:

1. **Matic — SWE Intern**
2. **Legends Global — Insights Intern**
3. **ClinicalHours — Co-founder**
4. **Research**
5. **Projects**

The internships and ClinicalHours should dominate the page. Research and projects should still exist, but they should be compact and secondary near the end.

Do not rebuild blindly. First inspect the current codebase, existing colors, typography, assets, resume link, images, and components. Preserve what is strong. Upgrade what is flat, generic, cluttered, or too technical.

---

## 1. Positioning

### Primary positioning

Shivam is not just an engineering student. Position him as a product/strategy builder working across healthcare operations, hospitality insights, and workflow automation.

### Suggested headline

> Building product and data systems for healthcare, hospitality, and operations.

### Alternate headline

> I work at the intersection of product, strategy, and operational systems.

### Avoid positioning him as only:

- a generic SWE student
- a pure ML/research person
- a hackathon/project collector
- an overly technical AI/agent builder
- a resume-in-website format

### Preferred tone

- polished
- sharp
- product-minded
- operationally grounded
- credible but not overhyped
- student/founder energy without looking amateur

---

## 2. Visual Direction

### Design concept

Use an **editorial product portfolio** style, not a terminal/dashboard-heavy style.

The site should feel like a clean strategy memo mixed with modern product case-study cards. It can have subtle systems/data cues, but do not make the UX feel like a developer terminal or overly technical command center.

### Visual references to emulate conceptually

- clean VC/founder personal site
- product strategy case study page
- premium startup landing page
- editorial portfolio with strong hierarchy
- light bento grid, but not a generic SaaS clone

### Visual traits

- strong whitespace
- oversized typography in hero
- structured cards with clear hierarchy
- tasteful accent color use
- subtle hover states
- visual proof blocks: metrics, screenshots, small diagrams, process cards
- selective motion only where it clarifies hierarchy

---

## 3. Color System

Before changing colors, audit the current site palette.

### If the current palette is already clean

Keep the base colors, but add more visual hierarchy through:

- richer card backgrounds
- stronger accent states
- better section contrast
- better typography scale
- better spacing
- more intentional badges and labels

### If the current palette is boring or too plain

Use this palette as the redesign baseline:

```css
:root {
  --background: #F7F3EA;      /* warm ivory */
  --surface: #FFFFFF;         /* primary card */
  --surface-soft: #EFE9DD;    /* secondary section */
  --ink: #111111;             /* primary text */
  --muted: #5F5A52;           /* secondary text */
  --border: #D8D1C4;          /* soft border */
  --accent: #2563EB;          /* strategic blue */
  --accent-soft: #DBEAFE;     /* blue tint */
  --clinical: #16A34A;        /* ClinicalHours accent */
  --clinical-soft: #DCFCE7;
  --insights: #B45309;        /* hospitality/insights accent */
  --insights-soft: #FEF3C7;
  --dark-card: #161616;       /* optional dark contrast block */
}
```

### Color usage rules

- Keep the overall site mostly light and editorial.
- Use blue for primary professional/product emphasis.
- Use green only for ClinicalHours/product-healthcare moments.
- Use amber/brown sparingly for Legends/insights/hospitality moments.
- Avoid neon gradients, cyberpunk visuals, matrix/terminal effects, or excessive dark-mode AI styling.
- Use one optional dark section only if it makes the site feel more premium, not more technical.

---

## 4. Typography

Audit current fonts first.

### Recommended direction

Use a high-quality sans-serif system with strong hierarchy. A serif accent is acceptable for editorial polish, but do not overdo it.

Recommended font approach:

- Headings: strong modern sans-serif or tasteful editorial serif
- Body: readable sans-serif
- Labels/badges: small uppercase sans-serif, not monospace unless existing site already uses it well

### Typography rules

- Hero headline should be large and confident.
- Work card titles should be prominent.
- Use short, scannable body copy.
- Avoid dense resume bullet blocks.
- Convert bullets into product/strategy cards, metrics, and short proof statements.

---

## 5. Information Architecture

### Required page structure

The homepage should be enough by itself. Additional pages are acceptable only if the current site already supports them cleanly.

Recommended homepage flow:

1. Hero
2. Featured Work: Matic, Legends, ClinicalHours
3. Product/Strategy Operating Style
4. Research, compact
5. Projects, compact
6. Resume and contact

### Do not lead with

- school details
- all projects
- skills list
- long research descriptions
- dense timeline
- hackathon awards

Those can exist later, but they should not dominate the first impression.

---

## 6. Homepage Blueprint

### Section 1 — Hero

Goal: immediately explain Shivam as product/strategy-oriented and currently active in serious work.

Required content:

- Name: Shivam Kanodia
- Short positioning line
- Status chips:
  - SWE Intern @ Matic
  - Insights Intern @ Legends Global
  - Co-founder @ ClinicalHours
- Primary CTA: View resume
- Secondary CTA: Contact / LinkedIn / Email

Suggested copy:

> Shivam Kanodia
>
> Building product and data systems for healthcare, hospitality, and operations.
>
> Currently working across healthcare automation at Matic, hospitality insights at Legends Global, and volunteer infrastructure through ClinicalHours.

Design notes:

- Use a strong hero layout with a large left-aligned headline.
- Include one visual panel on the right: a layered stack of three cards for Matic, Legends, and ClinicalHours.
- Do not use a terminal boot animation here.
- The first visible impression should be strategic and polished, not hacker-coded.

---

### Section 2 — Featured Work

This is the most important section.

Use three large cards in priority order:

1. Matic
2. Legends Global
3. ClinicalHours

Matic should be the largest or first card. Legends should be second. ClinicalHours should be third but still prominent.

#### Card 1: Matic — SWE Intern

Positioning:

- healthcare automation
- physician workflow
- AI-assisted clinical operations
- product + engineering exposure

Suggested card title:

> Matic — Software Engineering Intern

Suggested card subtitle:

> Building workflow automation for physician-facing healthcare operations.

Suggested visual elements:

- product workflow diagram
- inbox/task queue abstraction
- physician review loop
- cards labeled: intake, triage, draft, review, resolve

Avoid overemphasizing:

- raw API endpoint counts
- technical jargon
- internal/private implementation details
- anything that may be confidential

If public-safe, include:

- healthcare workflow automation
- physician inbox / EHR-adjacent workflows
- AI-assisted review systems
- product iteration cadence

If uncertain, ask the user before naming specific clients, internal products, or proprietary systems.

#### Card 2: Legends Global — Insights Intern

Positioning:

- hospitality insights
- pricing strategy
- stadium operations
- food and beverage analytics
- business intelligence applied to real venues

Suggested card title:

> Legends Global — Hospitality & Merchandise Insights Intern

Suggested card subtitle:

> Turning venue data and market context into clearer product, pricing, and operations decisions.

Suggested visual elements:

- pricing insight card
- venue/operations map abstraction
- simple chart panel
- product strategy memo preview
- “from data → recommendation → rollout” flow

Avoid overemphasizing:

- code
- generic analytics dashboards
- private client data
- internal report details unless user confirms they are public-safe

#### Card 3: ClinicalHours — Co-founder

Positioning:

- product company
- volunteer infrastructure
- clinics + students
- operations platform
- GTM and product strategy

Suggested card title:

> ClinicalHours — Co-founder

Suggested card subtitle:

> Building volunteer infrastructure for clinics and pre-health students.

Suggested proof points:

- 200+ student users
- BCS Free Health Clinic pilot
- application, onboarding, scheduling, and communication workflows
- clinic-focused volunteer lifecycle management

Suggested visual elements:

- mini product dashboard preview
- student → clinic → admin flow
- metrics cards
- screenshot/image if already available in site assets

ClinicalHours should feel real and substantial, but Matic and Legends should still come first.

---

## 7. Section 3 — Product / Strategy Operating Style

This section should connect the three main experiences into one coherent personal brand.

Suggested title:

> How I approach messy systems

Suggested cards:

1. **Map the workflow**
   - Understand the real operators, constraints, handoffs, and bottlenecks.

2. **Turn ambiguity into structure**
   - Convert scattered data, conversations, and workflows into decision-ready systems.

3. **Ship useful tools**
   - Build products, dashboards, automations, and recommendations that reduce operational friction.

Design:

- 3 cards in a row on desktop
- stacked cards on mobile
- simple icons or abstract line visuals
- keep copy short

This helps the site feel product/strategy-focused instead of a list of jobs.

---

## 8. Section 4 — Research, Compact

Research should be credible but secondary.

Suggested title:

> Research

Suggested layout:

Two compact cards:

1. **Cattle futures forecasting**
   - forecasting dashboard
   - 65 inputs across 6 cost categories
   - SARIMA selected via walk-forward validation
   - preliminary findings presented at TAMU Student Research Week

2. **System dynamics for dairy systems**
   - Vensim models
   - WEF nexus stress scenarios
   - economic and material impact modeling

Visual treatment:

- small chart line
- restrained academic label
- do not make this more prominent than Matic, Legends, or ClinicalHours

---

## 9. Section 5 — Projects, Compact

Projects should be near the end and should not overpower the current work.

Suggested title:

> Selected earlier builds

Suggested layout:

A compact grid or carousel with 3–5 projects maximum.

Suggested projects:

- Clara
- Celvio
- FinSeek
- FELT, if currently on site or if user wants it included
- Blackjack/trading bot only if current and polished enough

Each project card should have:

- name
- one-line problem
- one-line result
- tech hidden in small muted text, not foregrounded

Do not lead with the tech stack. Lead with product insight, user, or outcome.

---

## 10. Navigation

Suggested nav:

- Work
- ClinicalHours
- Research
- Projects
- Resume
- Contact

Or simpler:

- Work
- Research
- Projects
- Resume

Rules:

- Keep nav minimal.
- Resume link must remain clearly accessible.
- If current site already has working resume, preserve it.
- Use smooth scroll if it already fits the codebase.

---

## 11. Interaction Design

Use interaction sparingly.

Recommended interactions:

- card hover lift
- subtle border/accent change on hover
- smooth scroll to sections
- work cards can expand to reveal details
- small animated progress/flow lines in featured cards
- no heavy animation that slows site down

Avoid:

- terminal UI
- fake code windows as main motif
- excessive typing animations
- AI-glow gradients
- overbuilt dashboards
- gimmicky cursor effects

The UX should feel like a polished product strategist’s portfolio, not a hacker demo.

---

## 12. Asset Rules

Before changing anything, inspect existing assets.

Look for:

- resume PDF
- headshot or personal images
- project screenshots
- ClinicalHours screenshots
- logos
- icons
- existing OpenGraph image
- favicon

Rules:

- Do not delete existing resume functionality.
- Do not remove images unless they are unused and clearly irrelevant.
- Reuse strong existing assets.
- Add placeholders only where needed, and clearly mark them in code comments or copy.
- If logo usage may be sensitive, use text labels instead of official logos.

---

## 13. Implementation Plan for Codex

### Phase 1 — Audit

1. Inspect repository structure.
2. Identify framework: Next.js, React, Vite, Astro, static HTML, etc.
3. Locate existing pages, components, styles, assets, and resume.
4. Document current colors, fonts, spacing, and layout.
5. Identify what should be preserved.
6. Identify what feels boring, too technical, cluttered, or outdated.

Do not make major edits before completing the audit.

### Phase 2 — Design Tokens

1. Create or update design tokens for:
   - colors
   - typography
   - spacing
   - border radius
   - shadows
   - breakpoints
2. Preserve current palette if it is strong.
3. If current palette is weak, use the palette from this brief.
4. Ensure all colors meet basic contrast accessibility.

### Phase 3 — Content Hierarchy

1. Update homepage structure to match the priority order:
   - Matic
   - Legends Global
   - ClinicalHours
   - Research
   - Projects
2. Rewrite content to be product/strategy-first.
3. Avoid dense resume bullets.
4. Keep copy concise and scannable.
5. Do not include confidential details without user confirmation.

### Phase 4 — Components

Build reusable components where appropriate:

- HeroSection
- StatusChip
- FeaturedWorkCard
- ProofMetric
- WorkflowDiagram
- StrategyPrincipleCard
- CompactResearchCard
- CompactProjectCard
- SectionHeader
- CTAFooter

Do not over-engineer. Keep component boundaries clean and easy to maintain.

### Phase 5 — Responsive Layout

Desktop:

- strong hero
- 3-feature work layout
- bento-style cards where useful

Tablet:

- 2-column cards
- preserve hierarchy

Mobile:

- stacked cards
- Matic first
- Legends second
- ClinicalHours third
- no horizontal overflow
- CTAs visible early

### Phase 6 — Polish

1. Add hover states.
2. Add subtle section transitions only if existing stack supports it cleanly.
3. Add alt text.
4. Improve metadata and OpenGraph tags if accessible.
5. Make resume CTA obvious.
6. Ensure page loads quickly.

### Phase 7 — QA

Run available checks:

- lint
- typecheck
- build
- formatting
- responsive inspection
- Lighthouse-style sanity check if tooling exists

Fix all obvious issues before handing back.

---

## 14. Iteration Loop

After the first implementation, Codex should review the site using this checklist:

1. Does the first screen clearly show Matic, Legends, and ClinicalHours?
2. Is Matic visually first and strongest?
3. Is Legends clearly second?
4. Is ClinicalHours strong but not above the internships?
5. Are research and projects visibly lower priority?
6. Does the site feel product/strategy-oriented rather than overly technical?
7. Is the design visually memorable, or still boring?
8. Are the colors intentional?
9. Is the resume still accessible?
10. Are existing images/assets preserved or used better?
11. Is the mobile version clean?
12. Does the copy sound credible and not inflated?

If any answer is weak, make another focused iteration.

---

## 15. Confidentiality / Public-Safety Rules

Do not expose private internship details without confirmation.

Potentially sensitive areas:

- Matic internal product names
- Athena/API details
- physician names
- client names
- internal demos
- proprietary workflows
- Legends internal venue data
- pricing specifics
- unreleased recommendations

Safe general wording:

- “healthcare workflow automation”
- “physician-facing operations”
- “hospitality insights”
- “venue product and pricing strategy”
- “volunteer infrastructure for clinics”

Ask before using specific internal examples.

---

## 16. Questions to Ask the User Only if Needed

Ask these only if they block implementation or would materially improve the result:

1. Can the site publicly mention Matic’s healthcare workflow automation focus, or should it stay broader?
2. Can the site publicly mention Legends work involving venue pricing / F&B strategy, or should it stay high-level?
3. Should ClinicalHours include the 200+ student user metric and BCS Free Health Clinic pilot publicly?
4. Are official company logos allowed, or should the design use text labels only?
5. Which existing images should stay prominent?
6. Should the site feel more polished/professional or more founder/personality-driven?

Do not pause for these unless necessary. Use safe default language where possible.

---

## 17. Definition of Done

The redesign is done when:

- The homepage clearly prioritizes Matic, Legends, and ClinicalHours.
- The visual hierarchy matches the requested importance order.
- The UX feels product/strategy-first, not purely technical.
- The design is not boring: it has strong typography, intentional color, rich cards, and subtle interactions.
- Existing resume/images/assets are preserved or improved.
- Research and projects are present but secondary.
- The site is responsive and polished on mobile.
- The code passes available checks.
- Any sensitive/public-unsafe copy is either generalized or flagged for user review.

---

## 18. Pasteable Codex /goal Command

```text
/goal Redesign shivamkanodia.com into a polished product/strategy-oriented personal site. Start by auditing the existing codebase, assets, colors, typography, resume link, images, routes, and components. Preserve anything strong, especially the existing resume and useful images/assets. Do not blindly overwrite the site.

The visual priority order must be: 1) Matic SWE Intern, 2) Legends Global Insights Intern, 3) ClinicalHours Co-founder, 4) Research, 5) Projects. The first screen and main work section should heavily emphasize Matic, Legends, and ClinicalHours. Research and projects should be compact and secondary near the end.

The UX should not feel overly technical, terminal-like, or like a generic engineering portfolio. Aim for an editorial product portfolio: strong typography, intentional colors, clean cards, visual proof blocks, concise copy, and subtle interactions. Focus on product, strategy, operations, and real-world systems rather than code or tech stack.

Begin with a design audit. If the current colors are good, keep the base palette and improve hierarchy. If the current colors are boring, use a warm ivory / ink / strategic blue palette with green for ClinicalHours and amber for Legends accents. Build around existing assets and resume. Create reusable components only where useful. Keep mobile excellent.

Implement in iterations: audit -> plan -> first redesign -> run checks -> self-review against the priority order and product/strategy tone -> refine until the site is visually memorable and credible. Ask the user only for public-safety clarification if needed, especially around Matic details, Legends internal work, company logos, and ClinicalHours metrics. Run lint/typecheck/build if available before finishing.
```
