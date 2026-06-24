# ShivamKanodia.com Redesign V2 Vision

Status: planning only. No site implementation is authorized by this document.

## 1. Executive direction

The next version should feel like a sharp, evidence-first operator portfolio.

The current redesign has a strong visual foundation, but it still spends too much time explaining a philosophy. The next version should show the record directly: companies, roles, shipped work, research, awards, projects, and real artifacts.

The desired impression is:

> This person has done an unusual amount of real work, can move between product and engineering, and has proof for every claim.

The site should be a better-looking, better-edited version of LinkedIn. It should have LinkedIn's breadth without its clutter. The page can flex, but it must remain easy to scan.

### Core design idea

**Less manifesto. More receipts.**

Keep the warm ivory, ink, blue, amber, and green palette. Replace the editorial fashion serif with confident sans typography. Replace generic capability claims with logos, artifacts, placements, metrics, screenshots, and dates.

## 2. Non-negotiable changes

1. Remove Playfair Display, Georgia, serif italics, and every other curly type treatment from the homepage, `/pitch`, metadata, favicon, and 404 page.
2. Remove every user-visible em dash and en dash. Rewrite punctuation with periods, commas, colons, parentheses, or bullets. Do not blindly swap each dash for a hyphen.
3. Remove the complete Operating Style section.
4. Remove the Approach navigation item.
5. Remove the Build, Analyze, Decide strip and any other references to an operating philosophy. Replace it with proof or simply tighten the transition into Work.
6. Remove the "What I'm looking for" callout from the hero.
7. Remove similar job-seeking language from the closing CTA.
8. Add official logos for Matic, Legends Global, and ClinicalHours.
9. Fix the research poster treatment. Never stretch the current low-resolution poster as a cover image.
10. Add the dairy-farm research as a distinct research item after its exact scope is confirmed.
11. Expand the project archive using verified LinkedIn projects.
12. Add the full verified ClinicalHours recognition story.

## 3. Positioning and hero copy

### Recommended hero

Eyebrow:

> SHIVAM KANODIA / PRODUCT-MINDED ENGINEER

Headline:

> I build things that work.

Subheading:

> Software, products, research, and everything it takes to ship them.

Why this direction works:

- It is blunt and confident.
- It does not force the visitor to decode a consulting-style phrase.
- It is broad enough to cover Matic, Legends, ClinicalHours, research, and projects.
- It does not announce a list of desired jobs.
- The company logos and role cards provide the specificity that the copy no longer needs to carry.

Do not demote the current headline into the final subheading. "I turn messy operations into useful systems" contains the right underlying idea, but it still sounds more like positioning copy than a person speaking. The new subheading should be shorter and more natural.

### Strong alternatives

#### Option B

Headline:

> Product instincts. Engineering execution.

Subheading:

> I build software, products, and strategies that make ambitious ideas real.

#### Option C

Headline:

> I build more than prototypes.

Subheading:

> Software, products, research, and the work it takes to make them real.

#### Option D

Headline:

> Strategy you can ship.

Subheading:

> I work from first insight through implementation across software, research, and early-stage products.

#### Option E

Headline:

> From idea to operation.

Subheading:

> I connect product judgment, technical execution, and business context to get useful work into the world.

### Hero layout

The first desktop viewport should contain:

1. Name and identity.
2. Recommended headline and subheading.
3. Explore Work and View Resume actions.
4. A compact logo-backed role stack:
   - Matic, Software Engineering Intern
   - Legends Global, exact title to confirm
   - ClinicalHours, Co-founder
5. Headshot, but smaller than the work proof.

The first mobile viewport should show the copy plus all three logo credentials. It should not take nearly two screens to reach the first experience. Target the start of the Matic section by roughly 900 to 1,000 vertical pixels.

## 4. Typography and language system

### Recommended typography

Use one strong sans family across the site. Preferred direction:

- Primary: Instrument Sans variable
- Alternative: Manrope variable
- Metadata only: IBM Plex Mono

Use weight, scale, uppercase labels, spacing, rules, and color for contrast. Do not use italics as a substitute for hierarchy.

Implementation must remove:

- Google Fonts request for Playfair Display
- `--font-playfair`
- all `font-playfair` classes
- Georgia or serif declarations in the favicon
- serif styling in `/pitch`
- italic `<em>` styling in the hero

The current meaningful metadata is often only 6 to 9px. Raise the practical floor to 10 or 11px, and use 12px for information recruiters must read.

### Language rules

- No em dashes or en dashes.
- Prefer short declarative sentences.
- Avoid "messy systems," "operating thread," "how I approach," and generic builder philosophy.
- Do not list target job families.
- Do not lead with tools or tech stacks.
- Use exact titles, dates, placements, and outcomes.
- Label projections as estimates, not achieved results.
- Keep confidential internship work at the company and problem-space level.

A repository-wide sweep is required. Visible dash and serif references currently exist across the homepage, `/pitch`, slide data, chatbot context, metadata, favicon, 404 page, and other presentation components.

## 5. New information architecture

Recommended homepage order:

1. Hero and logo-backed current roles
2. Featured Experience
   - Matic
   - Legends Global
   - ClinicalHours
3. ClinicalHours Recognition and Traction
4. Research
   - Cattle futures forecasting
   - Dairy-farm decision support and system dynamics
5. Selected Projects
6. More Builds archive
7. Recognition and Programs
8. Small personal proof note
9. Resume, LinkedIn, email, and footer

Remove Operating Style completely. Do not replace it with another self-authored philosophy section.

### Navigation

Recommended navigation:

- Work
- Research
- Projects
- Recognition
- Resume

Contact can remain in the footer and closing CTA. Each featured role should have a unique anchor. Matic and Legends should not both link to a generic `#work` target.

## 6. Featured experience design

### Role card template

Each major experience should show:

- Official logo
- Exact public title
- Dates and current status
- One-sentence scope
- Two or three proof points
- One real artifact when public-safe
- A clear confidentiality note only when necessary

### Matic

Keep Matic visually first and strongest.

Public-safe framing can use Matic's public company language around clinical intelligence, documentation, coding, summarization, workflows, and physician-facing systems. Do not attribute any specific module, client, metric, architecture, or internal implementation to Shivam without approval.

Visual direction:

- Official white logo on the dark card or official dark logo on a light card
- One restrained workflow visualization
- Prefer a public Matic product image only if company policy permits it
- Exact dates and title near the logo

Official sources:

- [Matic website](https://maticinside.ai/)
- [Official dark Matic SVG](https://maticinside.ai/images/matic-logo-dark.svg)
- [Official white Matic SVG](https://maticinside.ai/images/matic-logo-white.svg)

### Legends Global

Use the current Legends Global mark, not the old ASM Global identity or a Legends apparel logo.

Visual direction:

- Official SVG normalized into the same optical logo box as Matic
- Strong venue or live-event visual if public-safe
- Data to decision framing, but no fake dashboard
- Exact HR title and status must be confirmed

Official sources:

- [Legends Global website](https://legendsglobal.com/)
- [Official Legends Global SVG](https://legendsglobal.com/wp-content/uploads/2025/09/legends-main-logo.svg)
- [Logo provenance and licensing context](https://commons.wikimedia.org/wiki/File:Legends_Global_logo_black.svg)

### ClinicalHours

ClinicalHours should feel like a real company, not a student project.

Visual direction:

- Use the official ClinicalHours mark prominently
- Pair the mark with the ClinicalHours name set in the site sans font
- Show one product screenshot if available
- Keep at least one pitch or award photo
- Add a recognition rail with exact placements
- Make product, GTM, operations, and pilot ownership visible

Official sources:

- [ClinicalHours website](https://clinicalhours.org/)
- [ClinicalHours logo declared by its website schema](https://storage.googleapis.com/gpt-engineer-file-uploads/HU45Mz21wIYXnhaW6iVGssUf6c02/uploads/1766690166705-Photoroom_20251225_123234-removebg-preview.png)

Cache all approved logos locally. Do not hotlink production assets. Keep logos unmodified, preserve clear space, add useful alt text, and link company names to official sites.

## 7. ClinicalHours recognition and traction

Create a compact static achievement rail, not a dense paragraph and not an auto-scrolling carousel.

Verified public items:

- Good Bull Pitch: 3rd place, $200, March 2026
- Ideas Challenge: finalist
- Meloy Bullet Pitch: 3 of 60
- Meloy Kickstart Launch: 1 of 3 teams selected from 11
- BCS Free Health Clinic: first clinic pilot partner
- Student user count: currently disputed and must be confirmed

Use the existing ClinicalHours pitching and award photos. The award photo should be shown at a natural editorial ratio without aggressive cropping.

Accuracy corrections:

- Replace generic "Good Bull Pitch winner" with "Good Bull Pitch, 3rd place" unless better primary evidence is supplied.
- Do not attach Persona's Product@TAMU 2nd-place result to ClinicalHours.
- The public record says 200+ student users while the current site says 400+. Confirm analytics before publishing either number.
- The current site says Spring 2025 for the clinic pilot. That date appears inconsistent with the rest of the timeline and should be confirmed.

Evidence sources:

- [Shivam's LinkedIn profile](https://www.linkedin.com/in/shivamkanodia19/)
- [Public repost containing the ClinicalHours milestones](https://www.linkedin.com/in/manish-kumar-kanodia-170593a)
- [McFerrin Ideas Challenge](https://mcferrin.tamu.edu/program/ideas-challenge/)
- [Meloy Kickstart](https://www.meloykickstart.tech/)

## 8. Research redesign

The Research section should show two distinct strands and treat each as serious work.

### Research item 1: cattle futures forecasting

Defensible current claims:

- Forecasting dashboard for feedlot cattle futures decision support
- 65 inputs across six cost categories
- SARIMA, LSTM, and XGBoost compared through walk-forward validation
- Presented at Texas A&M Student Research Week
- Work with Dr. Karun Kaniyamattam
- Manuscript or paper status must use exact current wording

### Research poster problem

The existing `research-poster.jpg` is only 483×378. Current CSS gives it `height: 100%`, a minimum height above 400px, and `object-fit: cover`. This enlarges a low-resolution landscape poster and crops it into a portrait slice.

Required treatment:

1. Preferred: obtain the original poster PDF or a 2x to 3x export.
2. Render it at its natural landscape aspect ratio.
3. Use `object-fit: contain`, never `cover`.
4. Add a keyboard-accessible View Poster lightbox or direct PDF action.
5. Keep the written research summary independent of the image.
6. If no high-resolution source exists, do not render the image above its intrinsic size.
7. A deliberate readable chart crop is acceptable only if the full poster remains available.

### Research item 2: dairy-farm decision support

This should be a distinct sibling card, not a decorative Venn diagram.

Working title pending confirmation:

> Dairy Farm Decision Support Through System Dynamics

Safe provisional description:

> Building systems models and economic decision-support tools for dairy-farm management with Dr. Karun Kaniyamattam.

Do not publish specific WEF nexus, scenario, geography, grant, coauthor, or outcome claims until Shivam confirms them. The broader lab direction around livestock and dairy decision modeling is public, but Shivam's exact contribution needs primary confirmation.

Useful context sources:

- [Texas A&M Animal Science faculty and lab context](https://animalscience.tamu.edu/?p=19497)
- [Public description of dairy system dynamics research direction](https://www.tealhq.com/job/postdoctoral-research-associate_7ea1adbf75c2b7f90e5bb5cb4a20d6ee2da7d)
- [Texas A&M livestock decision modeling coverage](https://www.feedstuffs.com/nutrition-and-health/employing-ai-for-faster-smarter-livestock-decision-making)

Assets needed from Shivam:

- High-resolution cattle futures poster or PDF
- Dairy research diagram, dashboard, model screenshot, lab photo, or poster
- Exact dairy research title
- Exact role and collaborators
- Current status and any presentation or publication information

## 9. Expanded project archive

The project section should flex breadth while preserving hierarchy.

### Recommended structure

- Two large featured project cards with strong images
- Two medium cards
- Four compact archive rows
- Optional "View all builds" expansion on mobile

Every project should answer:

1. What is it?
2. What did Shivam own?
3. What proves the result?

Do not use tech-stack pills as the primary content.

### Recommended project inventory and order

1. Clara
   - AI voice intake concept for clinical pre-visit workflows
   - Current site source, not clearly exposed in the indexed LinkedIn project list
2. Celvio
   - Wearable NMES rehabilitation concept
   - Product strategy, hardware, business case, and regulatory framing
3. FinSeek
   - Fraud detection platform
   - 95%+ precision and 99% false-positive reduction are self-reported and should link to evidence if published
4. Persona
   - Cross-platform digital identity concept
   - Product@TAMU Ideathon, 2nd place
5. JPMorgan Chase App Redesign
   - Product@TAMU semester project, 3rd place
   - Any 40%, 50%, or 30% metrics must be labeled estimates or projections
6. Study Buddy
   - Google Labs Make-A-Thon AI study app
7. Ignite Design Challenge
   - CAD solution for a Formula SAE chassis stability scenario
8. Blackjack Simulator
   - React and TypeScript training simulator with bankroll and strategy feedback

Optional writing item:

- [Inside FuzzingBrain](https://medium.com/%40shivamkanodia77/inside-fuzzingbrain-how-an-llm-powered-crs-detects-and-patches-vulnerabilities-at-scale-918fac5c5b1c)

This may fit better in a small Writing or Technical Explorations block than in Projects.

Primary project source:

- [Shivam's LinkedIn project inventory](https://www.linkedin.com/in/shivamkanodia19/)

### Project interactions

- Hover or focus can reveal a thumbnail and one proof point.
- On touch, proof must be visible without hover.
- Featured cards may swap from premise to result on hover.
- Do not add filters unless eight or more projects are visible at once.
- Avoid a separate route unless the homepage becomes difficult to scan.

## 10. Recognition, programs, and personal proof

After Projects, add a concise recognition index. This is where the page can feel like a visual LinkedIn without weakening the main work hierarchy.

Possible items:

- ClinicalHours placements listed above
- Persona, Product@TAMU Ideathon 2nd place
- JPMorgan Chase App Redesign, 3rd place
- Aggie Venture Fund Cohort 6
- EH EDGE, one of 35 in the 2026 cohort
- Texas A&M Student Research Week presenter

Add one small personal card or footer note for the Texas state bench press record if still accurate. It is memorable and human, but it should not compete with Matic, Legends, ClinicalHours, or Research.

## 11. Visual system and fun

The site should become more alive through evidence in motion, not gimmicks.

### Recommended ideas

1. Give each major role a restrained identity:
   - Matic: deep blue
   - Legends Global: black with warm amber accent
   - ClinicalHours: green plus the coral and blue found in its mark
2. Add a small recurring proof-stamp system:
   - SHIPPED
   - PRESENTED
   - 3RD PLACE
   - PILOT
   - IN PROGRESS
3. Reveal a real artifact on hover or keyboard focus.
4. Let the Matic workflow animate once, gently.
5. Let the Legends data-to-decision line draw once.
6. Let the ClinicalHours award rail snap horizontally on mobile.
7. Use an editorial contact-sheet rhythm for project imagery instead of uniform SaaS cards.
8. Add a subtle sticky desktop section index for Work, Research, Projects, and Recognition.
9. Use crisp focus states as part of the visual language.

### Avoid

- Cursor tricks
- Auto-moving logo carousels
- Terminal styling
- Fake code windows
- Fake dashboards
- Draggable cards
- Novelty loading screens
- Hidden information that only appears on hover
- Excessive animations
- Generic testimonials or references

## 12. Responsive and accessibility requirements

The Playwright audit covered:

- Homepage at 1440×1100, 1440×900, 768×1024, 390×844, and 375×667
- `/pitch` at 1440×900 and 390×844

Key findings to resolve:

- Tablet hero has too much empty vertical space.
- Mobile hero takes too long before reaching work.
- Research image is cropped and blurred at every breakpoint.
- Tiny metadata is too faint and too small.
- Hover effects need equivalent `:focus-visible` states.
- Mobile menu should close on Escape and return focus.
- Each role needs a unique anchor.
- `/pitch` is heavily serif-based and its mobile theater composition crops poorly.

Required QA:

- Test 1440×900, 1280×800, 768×1024, 390×844, and 375×667.
- Confirm no horizontal overflow.
- Confirm first-screen company recognition on mobile.
- Confirm all hover content is available by keyboard and touch.
- Confirm focus visibility.
- Confirm reduced-motion behavior.
- Confirm images do not upscale beyond reasonable intrinsic dimensions.
- Confirm the full poster or PDF is accessible.
- Test `/pitch` or explicitly archive it.

## 13. Accuracy and public-safety checklist

Before implementation publishes final copy, confirm:

1. Exact Matic title, dates, and current status.
2. Exact Legends title. The repository currently conflicts between BI Intern, Insights Intern, and Hospitality and Merchandise Insights Intern.
3. Whether Matic and Legends approve logo usage on a personal employment portfolio.
4. ClinicalHours user count: 200+ or 400+.
5. ClinicalHours clinic pilot date.
6. Exact dairy research title, scope, role, collaborators, and status.
7. Whether a high-resolution research poster or PDF is available.
8. Whether Clara should remain featured despite not appearing in the indexed LinkedIn project list.
9. Public links, screenshots, repositories, or demos for each project.
10. Whether the existing `/pitch` route should be updated, linked as proof, or archived.

Safe defaults:

- Use company-level language for internships.
- Do not publish internal metrics, clients, implementation details, or recommendations.
- Use "manuscript in progress" or "coauthoring" unless publication status is verified.
- Mark projected product metrics as estimates.
- Use 200+ for ClinicalHours only if a conservative public number is required before analytics are checked.

## 14. Implementation sequence

### Phase 1: factual lock

- Resolve titles, dates, metrics, research scope, and project links.
- Obtain approved logos and high-resolution research assets.
- Create a content inventory with source and confidence for every claim.

### Phase 2: global cleanup

- Remove all serif typography and imports.
- Remove all user-visible em dashes and en dashes.
- Remove Operating Style, its nav item, the capability strip, and job-seeking copy.
- Decide the future of `/pitch`.

### Phase 3: hero and experience

- Implement the recommended hero.
- Add the logo-backed role stack.
- Tighten desktop, tablet, and mobile height.
- Add logos, dates, and unique anchors to role cards.

### Phase 4: evidence expansion

- Build the ClinicalHours recognition rail.
- Rebuild Research with two real cards.
- Add the expanded project archive.
- Add Recognition and personal proof.

### Phase 5: interaction and polish

- Add proof reveals, subtle one-time animations, focus states, and mobile snap behavior.
- Normalize all image ratios and logo optical sizes.
- Update metadata, 404, favicon, chatbot context, and presentation route.

### Phase 6: verification

- Run lint, TypeScript, and production build.
- Run Playwright desktop, tablet, and mobile tests.
- Capture screenshots for all major sections.
- Run the recruiter scan and public-safety checklist.

## 15. Definition of done

The redesign is complete when:

- No curly or serif type remains anywhere in the public experience.
- No user-visible em dash or en dash remains.
- The hero uses approved concise copy and no job-seeking callout.
- Matic, Legends Global, and ClinicalHours logos are visible in the first viewport.
- Matic remains first and strongest.
- Operating Style and all related philosophy references are gone.
- ClinicalHours shows its full verified recognition story.
- Both research strands are present.
- The poster is sharp, contained, and accessible in full.
- At least six verified projects are represented without overwhelming the page.
- The site feels more fun through real artifacts and restrained interaction.
- Recruiters can identify roles, dates, scope, proof, resume, LinkedIn, and contact quickly.
- Desktop, tablet, mobile, `/pitch`, metadata, 404, and favicon are visually consistent.
- All tests pass.

## 16. Paste-ready goal prompt

```text
/goal Redesign shivamkanodia.com V2 as a sharp, evidence-first operator portfolio. Read REDESIGN_V2_VISION.md completely before making any edits and treat it as the source of truth. First audit the current repository, current deployed page, assets, LinkedIn-derived content, routes, metadata, 404 page, favicon, and /pitch experience. Do not invent facts or expose confidential internship information.

The creative direction is less manifesto, more receipts. The site should feel like a polished, edited, visually richer version of LinkedIn: complete enough to flex Shivam's experience, research, projects, awards, and personality, but still easy for product, engineering, and strategy recruiters to scan.

Use this hero direction unless visual testing produces a clearly stronger concise variant:
Eyebrow: SHIVAM KANODIA / PRODUCT-MINDED ENGINEER
Headline: I build things that work.
Subheading: Software, products, research, and everything it takes to ship them.

Remove the current "I turn messy operations into useful systems" hero. Remove the "What I'm looking for" callout and all similar job-seeking copy. Do not list target roles in the hero or closing CTA.

Remove Playfair Display, Georgia, serif italics, and all curly-font treatments across the homepage, /pitch, metadata, favicon, and 404 page. Use a confident all-sans system such as Instrument Sans with IBM Plex Mono only for small metadata. Raise tiny labels to readable sizes. Replace hero <em> styling with neutral markup.

Remove every user-visible em dash and en dash across TSX, data files, metadata, 404, chatbot context, and /pitch. Rewrite punctuation naturally with periods, commas, colons, parentheses, or bullets. Do not perform a blind hyphen substitution.

Delete the entire Operating Style section, the Approach nav item, the Build/Analyze/Decide capability strip, and all references to an operating philosophy. Do not replace them with another self-description section.

Preserve the priority order: 1) Matic, 2) Legends Global, 3) ClinicalHours, 4) Research, 5) Projects. Put official logo-backed role credentials in the first viewport. Add official logos to each experience card, cache them locally, preserve their marks, normalize optical sizing, and link organization names to official websites. Preferred sources are documented in REDESIGN_V2_VISION.md.

For Matic and Legends, use only public company-level language unless Shivam has explicitly approved more detail. Confirm the exact Legends title and both internship dates/statuses before publishing. Give each role its own anchor and proof artifact. Keep Matic visually dominant.

Make ClinicalHours feel like a real company. Use its official logo and existing pitch/award photography. Add a static recognition and traction rail with verified items: Good Bull Pitch 3rd place and $200, Ideas Challenge finalist, Meloy Bullet Pitch 3 of 60, Meloy Kickstart Launch 1 of 3 teams selected from 11, and the BCS Free Health Clinic pilot. Do not publish a user count or pilot date until the 200+/400+ and timeline conflicts are resolved. Do not attach Persona's award to ClinicalHours.

Rebuild Research as two serious sibling items. The first is cattle futures forecasting: 65 inputs, six cost categories, SARIMA/LSTM/XGBoost comparison, walk-forward validation, Texas A&M Student Research Week, and work with Dr. Karun Kaniyamattam. The second is dairy-farm decision support and system dynamics, but confirm Shivam's exact title, contribution, collaborators, model scope, and status before final copy. Do not invent WEF nexus details.

Fix the research poster. The current JPG is 483x378 and must never be stretched as a cover. Prefer the original PDF or a high-resolution export. Render it at its natural landscape ratio with object-fit: contain. Add an accessible View Poster lightbox or direct document link. If no better asset exists, keep it at or below its intrinsic size. Obtain a real asset for the dairy research instead of using a decorative Venn diagram.

Expand Projects into a curated visual archive using verified work from LinkedIn and the current site. Include Clara, Celvio, FinSeek, Persona, JPMorgan Chase App Redesign, Study Buddy, Ignite Design Challenge, and Blackjack Simulator. Use two featured cards, two medium cards, and compact archive rows for the rest. Every project must state what it is, what Shivam owned, and the proof or result. Label Chase metrics as estimates. Keep Persona's 2nd place and Chase Redesign's 3rd place attached to the correct projects. Consider Inside FuzzingBrain as a small Writing item, not automatically as a project.

Add a concise Recognition section for verified awards, programs, and presentations. Include ClinicalHours awards, Persona 2nd place, Chase Redesign 3rd place, Aggie Venture Fund Cohort 6, EH EDGE, and Texas A&M Student Research Week as verified. Add a small personal note for the Texas state bench press record if confirmed, but keep it secondary.

Make the site more fun through evidence in motion, not gimmicks. Use restrained organization colors, subtle proof stamps, artifact reveals on hover/focus, one-time workflow or line animations, a mobile-snapping ClinicalHours recognition rail, and an editorial contact-sheet rhythm for images. All interactions must work with keyboard and touch and respect reduced motion. Avoid cursor tricks, terminal styling, auto-moving logo carousels, fake dashboards, draggable cards, and novelty loaders.

Improve responsive pacing. The first mobile viewport should show the identity and all three company credentials, with Matic work beginning by roughly 900 to 1000 vertical pixels. Remove the tablet hero's empty vertical gulf. Test 1440x900, 1280x800, 768x1024, 390x844, and 375x667. Ensure no horizontal overflow, no broken images, readable metadata, visible focus states, Escape handling and focus return for the mobile menu, accessible poster viewing, and touch-safe proof reveals.

Work iteratively: factual audit and asset collection, global typography/language cleanup, hero and experience rebuild, ClinicalHours recognition, research rebuild, project expansion, recognition/personal proof, interaction polish, then QA. Use Playwright to inspect the actual rendered homepage and /pitch at every target viewport. Capture section screenshots and refine until the page is visually memorable, information-dense without feeling cluttered, and immediately credible to product, engineering, and strategy recruiters.

Run lint, TypeScript, production build, and Playwright QA before finishing. Do not deploy or push unless explicitly asked.
```
