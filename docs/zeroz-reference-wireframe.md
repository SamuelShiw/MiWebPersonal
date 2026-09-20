# /zeroz About — Reference Wireframe

Reference: https://otsuka-air.jp/about/
Analysis date: 2026-09-20

## Purpose

This document is the source of truth for the next portfolio rebuild.

The goal is not to improvise another inspired portfolio. First we map the reference page as a sequence of screens, content roles, media roles, and transitions. Only after this map is approved do we design J. Samuel's assets and implement the experience.

We do not copy Otsuka's source code, copywriting, photos, logos, or proprietary assets.

---

## 0. Global shell

Persistent elements:
- Minimal top navigation.
- Brand/logo at the top.
- Menu trigger and full-screen navigation overlay.
- Small vertical progress indicator at the right side.
- Progress text shown as 01 / 11 in the reference.
- Long-form single-page scroll.
- Three numbered chapters: 001 Concept, 002 Oxygen & Energy, 003 Scene.

## 1. Screen A — Page intro / About hero

Top/right internal chapter index:
- 001 Concept
- 002 Oxygen & Energy
- 003 Scene

Primary title:
- Slash /
- Large widely spaced A b o u t

Secondary:
- Side progress indicator.
- Minimal navigation / menu.
- One hero visual.

Structural intent: this is a page cover, not a conventional portfolio hero. No value-proposition cards, CTA stack, technology badges, testimonials, or project grid.

J. Samuel mapping: keep / About and the 001/002/003 chapter index. Replace content only.

## 2. Chapter 001 — Concept

Reference heading:
- 001
- /
- C o n c e p t
- small translation/subtitle

Reading order:
1. Chapter heading
2. Large editorial statement
3. Long-form explanatory copy
4. One large visual/media block

J. Samuel content role:
- Who is J. Samuel?
- What does he believe about software?
- Why understand process before implementation?
- Where is he going professionally?

Visual rule: ONE deliberate hero visual for the chapter. Do not replace it with generic cards or random decorative geometry.

Suggested subject: reality → process → rules → system.

## 3. Chapter 002 — Oxygen & Energy equivalent

Reference heading:
- 002
- /
- O x y g e n & / E n e r g y
- small translation/subtitle

Directly after heading:
1. Large statement
2. Supporting explanatory copy
3. A three-visual overview

The reference overview presents the sequence visually as 02, 03, 01 before the three detailed explanations.

J. Samuel mapping:
- Chapter role: Process & Systems
- Large statement: software begins before code.
- Supporting copy: real operations contain people, time, information, rules, decisions and exceptions.

## 4. Chapter 002 — Story 01 /03

Reference structure:
- Dedicated visual
- 01 /03
- Strong subheading
- Supporting paragraphs

J. Samuel mapping: FIELD / AS-IS.
Purpose: observe the real operation.
Content: people, delays, documents, repeated information, handoffs and exceptions.
Asset: documentary or diagrammatic visual of raw operational input.

## 5. Chapter 002 — Story 02 /03

Same structure with a different dedicated visual.

J. Samuel mapping: MODEL / RULES.
Purpose: turn reality into a model.
Content: states, roles, permissions, constraints, flows and data.
Asset: a structured diagram clearly different from Story 01.

## 6. Chapter 002 — Story 03 /03

Same structure with a third dedicated visual.

J. Samuel mapping: BUILD / PRODUCT.
Purpose: turn the model into maintainable software.
Content: architecture, security, interfaces, implementation, verification and iteration.
BRACKET can become the strongest real example here.

## 7. Chapter 003 — Scene

Reference heading:
- 003
- /
- S c e n e
- small translation/subtitle

Reading order:
1. Large statement
2. Supporting text
3. Image-led gallery

The reference uses eight photographic scene images.

Reference grouping:
- For / ON: Work, Sports, Hobby, Housework
- For / OFF: Break, Holiday, Relax, Rest

Structural rule: two contrasting groups, four real-world scenes per group, image-led presentation, short captions.

## 8. J. Samuel Scene mapping

Preserve exact 4 + 4 grouping.

Group A — BUILD:
1. BRACKET
2. Architecture
3. Security
4. Product

Group B — EXPLORE:
1. Applied AI
2. Data
3. Computer Vision
4. QITIAN / Creative Tech

Critical rule: final version needs eight intentional visual assets. Do not fill the final scene with eight generic CSS circles.

Possible sources: real BRACKET UI, architecture diagrams, code/system screenshots, original renders, original photography, Blender or generated art.

## 9. Ending / navigation

After Scene, the reference transitions into site-wide navigation, not another storytelling chapter.

J. Samuel mapping:
- About
- Process & Systems
- Scene
- GitHub / Work
- WhatsApp direct to +51 901 036 216
- Home / GitHub / location / QITIAN / copyright

No extra Chapter 004 Contact unless later reference inspection proves it exists.

## Macro wireframe

SCREEN A
/ ABOUT + 001/002/003 INDEX + HERO VISUAL

↓

001 / CONCEPT
LARGE EDITORIAL STATEMENT
LONG-FORM COPY
ONE LARGE VISUAL

↓

002 / PROCESS & SYSTEMS
LARGE STATEMENT + SUPPORTING COPY
THREE PREVIEWS: 02 / 03 / 01

↓

DEDICATED VISUAL 01
01 /03 + SUBHEADING + COPY

↓

DEDICATED VISUAL 02
02 /03 + SUBHEADING + COPY

↓

DEDICATED VISUAL 03
03 /03 + SUBHEADING + COPY

↓

003 / SCENE
LARGE STATEMENT + SUPPORTING COPY
FOR / BUILD: 01 02 03 04
FOR / EXPLORE: 05 06 07 08

↓

SITE NAVIGATION / FOOTER

## Asset inventory required before implementation

Hero:
- A-00 About hero visual

Concept:
- A-01 Concept main visual

Process & Systems:
- A-02 01/03 field visual
- A-03 02/03 model visual
- A-04 03/03 build/product visual
- A-05 overview thumbnail of A-02
- A-06 overview thumbnail of A-03
- A-07 overview thumbnail of A-04

Scene:
- A-08 BUILD / BRACKET
- A-09 BUILD / Architecture
- A-10 BUILD / Security
- A-11 BUILD / Product
- A-12 EXPLORE / Applied AI
- A-13 EXPLORE / Data
- A-14 EXPLORE / Computer Vision
- A-15 EXPLORE / QITIAN

Total initial visual assets: 16.

## Motion inventory to measure next

Do not implement yet. Next analysis phase must determine:
- whether each media block is sticky or static
- scroll distance per scene
- parallax amount
- title entrance behavior
- menu transition
- chapter-index behavior
- progress-indicator behavior
- image reveal style
- mobile substitutions

This becomes the Motion Specification.

## Decisions locked by this wireframe

1. Three chapters only.
2. No extra custom portfolio sections between them.
3. Chapter 002 contains exactly three narrative steps.
4. Chapter 003 contains two groups with four scenes each.
5. Media is a first-class part of the experience.
6. Assets are designed before final implementation.
7. WhatsApp remains direct to +51 901 036 216.
8. Fonts and colors are intentionally different from the reference.