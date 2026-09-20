# /zeroz About — Motion Specification

Reference: https://otsuka-air.jp/about/
Analysis date: 2026-09-20
Companion document: docs/zeroz-reference-wireframe.md

## 0. Important distinction

This document separates:
- OBSERVED: behavior or structure supported by the live reference and external design coverage.
- INFERRED: likely interaction behavior from the page structure and motion-heavy implementation.
- TARGET: the values we will use for J. Samuel's implementation.

Exact millisecond timings from the original site are not copied or claimed. We reproduce the motion language, not proprietary source code.

External evidence indicates that /zeroz uses scrolling, Three.js, WebGL, 3D and Lenis-style smooth scrolling as meaningful parts of the experience.

---

## 1. Global motion language

### OBSERVED

- Long-form single-page narrative.
- Persistent minimal navigation.
- Fixed side progress indicator.
- Large typography used as page/chapter transitions.
- WebGL/3D is a meaningful part of the brand site.
- Scrolling is a primary interaction mode.
- Media and typography carry most of the experience.

### TARGET

Global motion should feel:
- slow enough to read
- smooth rather than springy
- deliberate rather than playful
- cinematic only where media deserves it
- almost static during body-copy reading

Recommended global values:
- Smooth-scroll lerp: 0.07–0.09
- Wheel multiplier: 0.85–0.95
- Standard reveal duration: 700–900 ms
- Fast UI duration: 220–360 ms
- Large menu/page transition: 700–950 ms
- Scroll scrub smoothing: 0.8–1.2
- Default stagger: 45–80 ms

Primary easing family:
- entrance: power4.out
- section transitions: power3.inOut
- menu overlay: cubic-bezier(.75,0,.25,1)
- hover/UI: power2.out

---

## 2. Global navigation

### OBSERVED

- Minimal header remains available throughout the long page.
- Menu opens a full-site navigation layer.
- Interior pages share one consistent shell.

### TARGET

Header:
- fixed at viewport top
- no shrinking animation
- subtle background treatment only after leaving first viewport
- transition: 250–350 ms

Menu open:
1. user taps Menu
2. full-screen layer enters vertically
3. navigation rows reveal with 50–70 ms stagger
4. background page is visually frozen

Menu close:
- reverse motion
- total target duration: 650–800 ms

Reduced motion:
- no sliding overlay
- immediate opacity transition only

---

## 3. Side progress indicator

### OBSERVED

- Reference exposes a vertical 01 / 11 indicator.

### TARGET

Behavior:
- fixed on desktop
- hidden on small mobile screens
- numeric position updates discretely at major scene boundaries
- central vertical line fills progressively

Implementation target:
- line height: roughly 72–96 px
- progress update based on normalized document scroll
- no elastic animation
- number transition: 200–300 ms opacity/translate

Important: progress represents scenes/screens, not chapter count.

---

## 4. Page intro — / About

### OBSERVED

The first viewport contains:
- / About
- internal chapter index 001/002/003
- one principal visual
- minimal navigation

### TARGET ENTRY

On first load:
1. page background visible immediately
2. / About characters reveal vertically through masks
3. chapter index rows fade/slide in
4. hero visual resolves last

Timing target:
- title reveal: 850–1050 ms
- character stagger: 35–55 ms
- chapter rows: 450–650 ms
- hero visual: 900–1200 ms
- total perceived intro: 1.3–1.7 s

Do not use:
- percentage loader
- fake terminal boot
- CTA button animation
- bouncing scroll indicator

### TARGET SCROLL EXIT

From 0–100vh:
- title drifts upward 6–12% of its own height
- title opacity can reduce slightly to 20–35%
- principal visual moves slower than text
- chapter index remains readable until hero leaves

Scroll budget:
- roughly 100–120vh for hero exit

---

## 5. Chapter 001 — Concept heading

### OBSERVED

Structure:
- 001
- slash
- spaced Concept heading
- subtitle
- large editorial copy
- large visual/media asset

### TARGET

Heading entrance:
- section number appears first
- slash and title follow
- no scale bounce
- x translation 18–28 px + opacity
- 600–750 ms

Large concept statement:
- reveal per line through overflow masks
- yPercent 100 → 0
- opacity 0 → 1
- 700–900 ms
- stagger 70–110 ms

Body copy:
- paragraphs reveal as a group
- y 18–28 px
- stagger 90–130 ms
- no scroll scrub on paragraphs

Reason:
Reading must become calm after the title animation.

---

## 6. Chapter 001 — Concept media

### OBSERVED

The reference has a dedicated image/media block after the Concept text.

### TARGET

Media entrance:
- reveal via clip/mask, not card scaling
- clip from 8–12% inset to full frame
- duration tied to scroll over ~45–70vh

Internal asset motion:
- subtle 3–7% parallax maximum
- if 3D is used, camera movement should remain slow
- no decorative looping rotation while user reads

Scroll budget:
- visual block itself: 90–120vh

Mobile:
- no pinning
- static asset with short reveal

---

## 7. Chapter 002 — Section introduction

### OBSERVED

Structure after heading:
- large statement
- supporting copy
- three visual previews ordered 02 / 03 / 01

### TARGET

Statement:
- same line-mask reveal family as Concept
- slightly faster: 700–800 ms

Supporting copy:
- standard body reveal

Three-preview entrance:
- visual 02 first
- visual 03 second
- visual 01 third
- 60–90 ms stagger
- each preview may move from y 30–45 px and opacity 0

Do not reorder them to 01/02/03 in the overview.

Scroll budget:
- intro text: ~90–110vh
- overview: ~90–120vh

---

## 8. Chapter 002 — Story 01 /03

### OBSERVED

Each story has:
- its own dedicated visual
- 01 /03 marker
- large subheading
- explanatory copy

### TARGET

Desktop composition:
- dedicated visual receives ~50–60% width
- text receives ~40–50%
- image and text are one narrative unit

Motion:
- asset enters first
- count enters second
- heading enters third
- copy enters last

Asset motion:
- parallax y: about ±5%
- optional SVG/3D internal motion controlled by scroll
- no infinite idle animation

Text reveal:
- count: 300–450 ms
- heading: 650–850 ms
- body: 550–700 ms

Scroll budget:
- 120–160vh

Content mapping:
- FIELD / AS-IS

---

## 9. Chapter 002 — Story 02 /03

### OBSERVED

Reference story 02 uses a data chart visual.

### TARGET

Motion should differ from Story 01.

Asset idea:
- workflow/rule graph
- states, permissions, constraints and data connections

Motion:
- graph lines draw progressively
- nodes fade in sequentially
- main structure should be complete before body copy finishes entering

Timing:
- line drawing tied to 40–60vh of scroll
- node stagger: 60–100 ms

Scroll budget:
- 120–160vh

Content mapping:
- MODEL / RULES

---

## 10. Chapter 002 — Story 03 /03

### OBSERVED

Reference story 03 transitions from explanation to the actual /zeroz product.

### TARGET

This should be the strongest J. Samuel product reveal.

Content mapping:
- BUILD / PRODUCT
- BRACKET becomes the real example

Motion:
1. abstract model/data visual resolves
2. real product/UI composition replaces or emerges from it
3. 03 /03 label enters
4. heading + explanatory copy

Best candidate:
- real BRACKET UI screenshot or tablet mockup
- architecture/system diagram behind or beside it

Scroll budget:
- 150–190vh

This is the only Process story where stronger WebGL or 3D is justified.

---

## 11. Transition from 002 to 003

### TARGET

Do not hard-cut from dark technical section to gallery.

Transition target:
- background/color interpolation over 50–80vh
- previous visual fades or recedes
- Scene section title becomes dominant

No wipe gimmicks or page-turn effects.

---

## 12. Chapter 003 — Scene heading and intro

### OBSERVED

Reference structure:
- 003 / Scene
- large statement
- supporting copy
- eight real photographs
- two groups of four

### TARGET

Heading:
- same chapter-heading motion system

Intro:
- statement reveal once
- supporting copy follows
- then visual gallery becomes primary

Scroll budget before gallery:
- 90–110vh

---

## 13. Scene gallery — group A

### OBSERVED

Reference group A is For / ON with four photographic scenes.

### TARGET

Mapping:
- For / BUILD
- BRACKET
- Architecture
- Security
- Product

Animation:
- each image reveals from mask/clip
- no card pop animation
- slight image scale 1.04 → 1.00 during reveal
- captions appear 150–250 ms after image begins

Hover desktop:
- image scale +1.5–2.5%
- caption contrast increases
- 350–500 ms

Mobile:
- no hover equivalents
- imagery fully visible

Critical:
Use real designed media. CSS placeholder graphics are acceptable only during asset prototyping.

---

## 14. Scene gallery — group B

### OBSERVED

Reference group B is For / OFF with four photographic scenes.

### TARGET

Mapping:
- For / EXPLORE
- Applied AI
- Data
- Computer Vision
- QITIAN / Creative Tech

Motion system identical to BUILD.

Difference comes from art direction, not a different animation vocabulary.

---

## 15. Footer transition

### OBSERVED

Reference ends in broad site navigation.

### TARGET

Footer entrance:
- no giant contact chapter before it
- gallery concludes naturally
- footer navigation rows become visible
- subtle color transition if needed

WhatsApp:
- direct link to +51 901 036 216
- open in new tab/app
- prefilled message
- no recipient picker fallback

Target link form:
https://wa.me/51901036216?text=<encoded-message>

---

## 16. Motion scene budget

Recommended desktop scroll budgets:

- Hero: 100–120vh
- 001 heading + statement: 100–130vh
- 001 body copy: 70–100vh
- 001 visual: 90–120vh
- 002 intro: 90–110vh
- 002 overview: 90–120vh
- Story 01: 120–160vh
- Story 02: 120–160vh
- Story 03: 150–190vh
- 003 intro: 90–110vh
- BUILD gallery: content-driven
- EXPLORE gallery: content-driven
- Footer: content-driven

Important: these are implementation targets, not claimed measurements of the original site.

---

## 17. Motion architecture

Recommended modules:

- SmoothScrollController
- GlobalProgress
- FullscreenMenu
- SplitTextReveal
- ChapterHeading
- ScrollMediaReveal
- ProcessStory
- SceneGallery
- WebGLStage
- ReducedMotionBoundary

State boundaries:

- navigation state
- scroll/progress state
- active chapter state
- active WebGL scene state
- reduced-motion state

Do not bind all motion directly inside one App.tsx.

---

## 18. Technology target

Keep:
- React
- TypeScript
- Vite
- GSAP + ScrollTrigger
- Lenis

Use Three.js / R3F only for:
- hero principal visual, if chosen
- 001 concept media, if justified
- 03/03 product/system reveal

Do not ship Three.js just to animate circles.

---

## 19. Performance constraints

Desktop target:
- 60fps on modern mid-range laptop
- JS main bundle under control through lazy scenes

Mobile target:
- no long pinned WebGL sections
- no heavy continuous 3D camera motion
- no more than one active WebGL canvas at a time
- image/video assets loaded lazily after hero

Use:
- AVIF/WebP where appropriate
- responsive image sources
- route/scene lazy loading
- requestAnimationFrame centralized
- IntersectionObserver for non-GSAP media when possible

---

## 20. Reduced-motion mode

When prefers-reduced-motion is active:
- disable smooth scrolling
- disable scrubbed parallax
- remove pinned transitions
- keep all content visible
- replace 3D camera motion with static frame
- preserve hierarchy and navigation

Reduced-motion is an alternate presentation, not a broken fallback.

---

## 21. What we do next

Motion specification is now defined enough to move to Asset Direction.

Next task:
Design A-00 through A-15 before final implementation.

Priority order:
1. A-00 About hero visual
2. A-01 Concept visual
3. A-02 / A-03 / A-04 process visuals
4. A-08 through A-15 Scene assets
5. A-05 / A-06 / A-07 preview variants

Do not start the final React rebuild until A-00 through A-04 have an approved visual direction.