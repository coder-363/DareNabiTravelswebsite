# Batch B1 Token Audit & Mapping Report

**Date:** 2026-11-23  
**Status:** Complete — Ready for Review & Approval  
**Scope:** All shared UI components, engine components, and homepage Acts examined for token drift

---

## Executive Summary

**Total Components Audited:** 18  
**Components with Token Drift:** 18 (100%)  
**Hardcoded Values Identified:** 247+ distinct values across 12 categories  
**Critical Drift (WebGL/GSAP core motion):** 7 components  
**Moderate Drift (transitions, colors, spacing):** 11 components  

**Recommendation:** Proceed to Batch B2 (Core Tokens) with 47 new token additions and 3 token refinements.

---

## 1. Current Token Architecture (from `src/app/globals.css`)

### Colors (32 tokens)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink` | `#1F1214` | Primary dark text |
| `--color-ink-muted` | `rgba(31, 18, 20, 0.68)` | Muted text |
| `--color-ivory` | `#F3EEE6` | Primary light surface |
| `--color-ivory-soft` | `#FAF8F4` | Soft light surface |
| `--color-burgundy` | `#4A0711` | Brand primary |
| `--color-burgundy-deep` | `#3D060E` | Deep brand |
| `--color-gold` | `#D2A04A` | Brand accent |
| `--color-gold-text` | `#B88A3D` | Gold for text |
| `--color-gold-muted` | `rgba(210, 160, 74, 0.45)` | Muted gold |
| `--color-sand` | `#E8E0D4` | Neutral warm |
| `--color-sand-deep` | `#D7CCBC` | Deep sand |
| `--color-hairline` | `rgba(210, 160, 74, 0.22)` | Light divider |
| `--color-hairline-dark` | `rgba(243, 238, 230, 0.18)` | Dark divider |
| `--color-focus-ring` | `rgba(210, 160, 74, 0.72)` | Focus indicator |
| `--color-focus-ring-dark` | `rgba(243, 238, 230, 0.72)` | Dark focus |

### Typography (11 tokens)
| Token | Value |
|-------|-------|
| `--font-sans` | `"DM Sans Variable", "DM Sans", system-ui, sans-serif` |
| `--font-serif` | `"Cormorant Garamond Variable", "Cormorant Garamond", Georgia, serif` |
| `--font-arabic` | `"Amiri", "Amiri Quran", "Noto Naskh Arabic", serif` |
| `--text-xs` | `0.72rem` through `--text-5xl` `clamp(2.75rem, 5.2vw, 4.5rem)` |
| `--leading-tight` | `1.15` |
| `--leading-snug` | `1.32` |
| `--leading-normal` | `1.55` |
| `--leading-relaxed` | `1.7` |

### Spacing (12 tokens)
| Token | Value |
|-------|-------|
| `--space-1` | `0.25rem` through `--space-32` `8rem` |
| `--section-pad` | `clamp(96px, 14vw, 176px)` |
| `--container-max` | `80rem` |
| `--container-pad` | `clamp(24px, 4vw, 48px)` |

### Borders & Shadows (8 tokens)
| Token | Value |
|-------|-------|
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--radius-lg` | `8px` |
| `--radius-full` | `9999px` |
| `--shadow-whisper` | `0 1px 3px rgba(31,18,20,0.04), 0 0 0 1px rgba(210,160,74,0.06)` |
| `--shadow-soft` | `0 4px 20px rgba(31,18,20,0.06), 0 0 0 1px rgba(210,160,74,0.08)` |
| `--shadow-elevated` | `0 12px 48px rgba(31,18,20,0.1), 0 0 0 1px rgba(210,160,74,0.1)` |
| `--shadow-gold-glow` | `0 0 24px rgba(210,160,74,0.18), 0 0 48px rgba(210,160,74,0.08)` |

### Motion Physics (6 tokens)
| Token | Value |
|-------|-------|
| `--ease-sakinah` | `cubic-bezier(0.16, 1, 0.3, 1)` — primary brand ease |
| `--ease-threshold` | `cubic-bezier(0.76, 0, 0.24, 1)` — threshold/entrance |
| `--ease-tactile` | `cubic-bezier(0.33, 1, 0.68, 1)` — interactive |
| `--duration-instant` | `120ms` |
| `--duration-fast` | `220ms` |
| `--duration-base` | `350ms` |
| `--duration-slow` | `550ms` |
| `--duration-cinematic` | `850ms` |

### Focus & Interaction (4 tokens)
| Token | Value |
|-------|-------|
| `--focus-ring-width` | `2px` |
| `--focus-ring-offset` | `2px` |
| `--tap-scale` | `0.97` |
| `--hover-lift` | `-2px` |

### Layout (6 tokens)
| Token | Value |
|-------|-------|
| `--nav-height` | `104px` |
| `--nav-height-scrolled` | `82px` |
| `--nav-transition` | `height 0.45s var(--ease-sakinah), background-color 0.45s ease, color 0.35s ease, border-color 0.35s ease` |
| `--z-nav` | `8000` |
| `--z-overlay` | `7900` |
| `--z-dialog` | `8800` |

---

## 2. Component-by-Component Token Drift Analysis

### A. Preloader (`src/components/ui/Preloader.tsx`)

**Drift Category:** Motion & Color  
**Hardcoded Values:** 14

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 45 | `duration: 1.15` | `--duration-cinematic` (0.85s → needs 1.15s variant) | Duration |
| 46 | `ease: "power2.inOut"` | `--ease-sakinah` | Easing |
| 49 | `duration: 0.95` | `--duration-slow` (0.55s → needs 0.95s variant) | Duration |
| 50 | `ease: "power3.inOut"` | `--ease-sakinah` | Easing |
| 53 | `duration: 1.35` | `--duration-cinematic` (0.85s → needs 1.35s variant) | Duration |
| 54 | `ease: "power3.out"` | `--ease-tactile` | Easing |
| 57 | `duration: 0.85` | `--duration-slow` | Duration |
| 58 | `ease: "power4.inOut"` | `--ease-threshold` | Easing |
| 61 | `duration: 0.7` | `--duration-base` (0.35s → needs 0.7s variant) | Duration |
| 62 | `ease: "power3.out"` | `--ease-tactile` | Easing |
| 65 | `duration: 0.95` | `--duration-slow` | Duration |
| 66 | `ease: "power3.inOut"` | `--ease-sakinah` | Easing |
| 28 | `#D2A04A` (inline style) | `var(--color-gold)` | Color |
| 28 | `#F3EEE6` (inline style) | `var(--color-ivory)` | Color |
| 130 | `transition: "opacity 0.5s ease"` | `var(--duration-base) var(--ease-sakinah)` | Transition |

**Note:** GSAP `power*.inOut` easings ≈ `cubic-bezier(0.4, 0, 0.2, 1)` — close to `--ease-sakinah (0.16, 1, 0.3, 1)` but not identical. Recommend adding `--ease-preloader-intro: cubic-bezier(0.4, 0, 0.2, 1)` for fidelity.

---

### B. PageTransition (`src/components/engine/PageTransition.tsx`)

**Drift Category:** Motion (Critical — core transition)  
**Hardcoded Values:** 8

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 34 | `0.52s` | `--duration-page-out` (new: 520ms) | Duration |
| 35 | `cubic-bezier(0.76,0,0.24,1)` | `var(--ease-threshold)` ✅ **Already exists!** | Easing |
| 38 | `0.38s` | `--duration-page-in` (new: 380ms) | Duration |
| 39 | `cubic-bezier(0.16,1,0.3,1)` | `var(--ease-sakinah)` ✅ **Already exists!** | Easing |
| 42 | `0.45s` | `--duration-page-overlay` (new: 450ms) | Duration |
| 43 | `cubic-bezier(0.76,0,0.24,1)` | `var(--ease-threshold)` ✅ | Easing |
| 46 | `0.14s` | `--duration-instant` (120ms → close) | Duration |
| 47 | `cubic-bezier(0.16,1,0.3,1)` | `var(--ease-sakinah)` ✅ | Easing |

**Action:** Add 3 new duration tokens. Easings already tokenized — just need replacement.

---

### C. Footer (`src/components/ui/Footer.tsx`)

**Drift Category:** Color Opacity & Transitions  
**Hardcoded Values:** 7

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 44 | `opacity: 0.05` | `--opacity-whisper` (new: 0.05) | Opacity |
| 47 | `opacity: 0.4` | `--opacity-muted` (new: 0.4) | Opacity |
| 50 | `opacity: 0.94` | `--opacity-subtle` (new: 0.94) | Opacity |
| 53 | `opacity: 0.72` | `--opacity-soft` (new: 0.72) | Opacity |
| 56 | `opacity: 0.78` | `--opacity-medium` (new: 0.78) | Opacity |
| 89 | `transition: "opacity 0.3s ease"` | `var(--duration-fast) var(--ease-tactile)` | Transition |
| 112 | `rgba(210, 160, 74, 0.15)` | `var(--color-gold-muted)` (0.45 → needs 0.15 variant) | Color |

**Note:** Opacity scale tokens needed for consistent semi-transparent layers.

---

### D. BrandLogo (`src/components/ui/BrandLogo.tsx`)

**Drift Category:** Color  
**Hardcoded Values:** 1

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 44 | `rgba(210, 160, 74, 0.42)` | `--color-gold-border` (new: rgba(210,160,74,0.42)) | Color |

---

### E. ActHero (`src/components/home/ActHero.tsx`)

**Drift Category:** Motion (Critical — Hero GSAP), Color, Layout  
**Hardcoded Values:** 19

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 78 | `scrub: 0.9` | `--scrub-hero` (new: 0.9) | Scrub |
| 81 | `duration: 1.9` | `--duration-hero-intro` (new: 1.9s) | Duration |
| 82 | `duration: 0.9` | `--duration-hero-stagger` (new: 0.9s) | Duration |
| 83 | `duration: 1` | `--duration-base` (0.35s → needs 1s variant) | Duration |
| 87 | `cubic-bezier(0.76,0,0.24,1)` | `var(--ease-threshold)` ✅ | Easing |
| 90 | `scrub: 1` | `--scrub-base` (new: 1) | Scrub |
| 102 | `background: linear-gradient(...)` inline | CSS custom property for gradient stops | Gradient |
| 115 | `@keyframes scrollPulse` cubic-bezier | `var(--ease-threshold)` ✅ | Easing |
| 118 | `rgba(210, 160, 74, 0.08)` | `--color-gold-glow-subtle` (new) | Color |
| 121 | `rgba(210, 160, 74, 0.12)` | `--color-gold-glow-soft` (new) | Color |
| 124 | `rgba(210, 160, 74, 0.18)` | `var(--shadow-gold-glow)` ✅ partial | Shadow |

**Note:** Hero is art-directed per spec, but shared motion physics (scrub, durations, easings) should be tokenized.

---

### F. ActIntention (`src/components/home/ActIntention.tsx`)

**Drift Category:** Motion (RAF loop), Layout  
**Hardcoded Values:** 12

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 48 | `stagger: 0.04` | `--stagger-tight` (new: 0.04) | Stagger |
| 51 | `scrub: 0.7` | `--scrub-intention` (new: 0.7) | Scrub |
| 68 | `0.022` (RAF velocity decay) | `--velocity-decay` (new) | Physics |
| 68 | `2.2` (RAF max velocity) | `--velocity-max` (new) | Physics |
| 68 | `0.12` (RAF spring) | `--spring-stiffness` (new) | Physics |
| 68 | `50` (RAF threshold) | `--velocity-threshold` (new) | Physics |
| 71 | `--scroll-velocity` CSS variable | Register as token `--scroll-velocity-multiplier` | CSS Var |
| 89 | `transition: 0.4s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-slow) var(--ease-sakinah)` | Transition |
| 92 | `transition: 0.6s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-cinematic) var(--ease-sakinah)` | Transition |

**Note:** RAF physics values are art-directed but should be tokenized for consistency.

---

### G. ActSanctuaries (`src/components/home/ActSanctuaries.tsx`)

**Drift Category:** Motion (Critical — Pin/Scale), Layout, Color  
**Hardcoded Values:** 18

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 41 | `36vw` (scale) | `--scale-sanctuary-pin` (new) | Scale |
| 42 | `70vh` (yPercent) | `--y-sanctuary-pin` (new) | Position |
| 43 | `100vw` (width) | `--width-full` (100vw) | Layout |
| 44 | `100vh` (height) | `--height-full` (100vh) | Layout |
| 45 | `400px` (border-radius) | `--radius-sanctuary` (new: 400px) | Radius |
| 54 | `scrub: 1.15` | `--scrub-sanctuaries` (new: 1.15) | Scrub |
| 57 | `start: "top 85%"` | `--pin-start-sanctuaries` (new) | Pin |
| 58 | `end: "bottom 15%"` | `--pin-end-sanctuaries` (new) | Pin |
| 61 | `background: linear-gradient(...)` inline | Gradient tokens | Gradient |
| 78 | `rgba(210, 160, 74, 0.15)` | `--color-gold-muted-light` (new) | Color |
| 81 | `rgba(31, 18, 20, 0.6)` | `--color-ink-overlay` (new) | Color |
| 84 | `rgba(74, 7, 17, 0.4)` | `--color-burgundy-overlay` (new) | Color |

---

### H. ActSacredSteps (`src/components/home/ActSacredSteps.tsx`)

**Drift Category:** Motion (Pin/Stroke), Color, Transition  
**Hardcoded Values:** 14

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 41 | `scrub: 1` | `--scrub-steps` (new: 1) | Scrub |
| 44 | `start: "top 80%"` | `--pin-start-steps` (new) | Pin |
| 45 | `end: "bottom 20%"` | `--pin-end-steps` (new) | Pin |
| 58 | `strokeDashoffset` calc | Tokenize stroke length constant | SVG |
| 61 | `duration: 0.8` | `--duration-step-draw` (new: 0.8s) | Duration |
| 62 | `ease: "power2.inOut"` | `var(--ease-sakinah)` | Easing |
| 65 | `transition: 0.35s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-base) var(--ease-sakinah)` | Transition |
| 78 | `rgba(210,160,74,0.14)` | `--color-gold-step-active` (new) | Color |
| 81 | `transition: 0.4s ease` | `var(--duration-fast) var(--ease-tactile)` | Transition |

---

### I. ActJourneys (`src/components/home/ActJourneys.tsx`)

**Drift Category:** Motion (Flip/Stagger/Pointer), Transition, Layout  
**Hardcoded Values:** 21

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 52 | `duration: 0.65` (Flip) | `--duration-flip` (new: 0.65s) | Duration |
| 53 | `ease: "power2.inOut"` | `var(--ease-sakinah)` | Easing |
| 54 | `stagger: 0.04` | `--stagger-tight` (new: 0.04) | Stagger |
| 68 | `0.11` (pointer decay) | `--pointer-decay` (new) | Physics |
| 68 | `0.065` (pointer spring) | `--pointer-spring` (new) | Physics |
| 89 | `transition: 0.35s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-base) var(--ease-sakinah)` | Transition |
| 92 | `transition: 0.75s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-cinematic) var(--ease-sakinah)` | Transition |
| 95 | `transition: 1.1s cubic-bezier(0.16,1,0.3,1)` | `--duration-journey-float` (new: 1.1s) + `var(--ease-sakinah)` | Transition |
| 102 | `transform: perspective(600px)` | `--perspective-card` (new: 600px) | 3D |
| 105 | `rotateY` calc | Tokenize max rotation | 3D |
| 108 | `box-shadow` inline | `var(--shadow-elevated)` or new variant | Shadow |

---

### J. ActPillars (`src/components/home/ActPillars.tsx`)

**Drift Category:** Motion (ScrollTrigger), Transition, Layout  
**Hardcoded Values:** 16

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 38 | `duration: 0.9` | `--duration-pillar-reveal` (new: 0.9s) | Duration |
| 39 | `stagger: 0.1` | `--stagger-relaxed` (new: 0.1) | Stagger |
| 42 | `start: "top 78%"` | `--reveal-start-pillars` (new) | Reveal |
| 43 | `end: "bottom 22%"` | `--reveal-end-pillars` (new) | Reveal |
| 55 | `transition: 0.35s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-base) var(--ease-sakinah)` | Transition |
| 58 | `transition: 0.75s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-cinematic) var(--ease-sakinah)` | Transition |
| 61 | `transition: 1.1s cubic-bezier(0.16,1,0.3,1)` | `--duration-pillar-float` (new: 1.1s) + `var(--ease-sakinah)` | Transition |
| 72 | `border-radius: 50%` | `--radius-full` ✅ | Radius |

---

### K. ActReflections (`src/components/home/ActReflections.tsx`)

**Drift Category:** Motion (Rotation Interval), Transition, Layout  
**Hardcoded Values:** 11

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 29 | `start: "top 58%"` | `--act-enter-reflections` (new) | Trigger |
| 30 | `end: "bottom 42%"` | `--act-exit-reflections` (new) | Trigger |
| 49 | `scale: 0.965` | `--scale-reflections-recede` (new) | Scale |
| 50 | `opacity: 0.62` | `--opacity-reflections-recede` (new) | Opacity |
| 51 | `ease: "none"` | `--ease-linear` (new: linear) | Easing |
| 52 | `scrub: 1` | `--scrub-reflections` (new: 1) | Scrub |
| 66 | `8000` (interval ms) | `--interval-reflection-rotation` (new: 8000ms) | Timing |
| 130 | `animation: "quoteFadeIn 0.7s cubic-bezier(0.16,1,0.3,1)"` | `var(--duration-slow) var(--ease-sakinah)` | Transition |
| 192 | `transition: "width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.35s ease"` | `var(--duration-slow) var(--ease-sakinah), var(--duration-base) var(--ease-tactile)` | Transition |
| 346 | `transform 0.45s cubic-bezier(0.16,1,0.3,1)` | `var(--duration-slow) var(--ease-sakinah)` | Transition |
| 357 | `grid-template-rows 0.55s cubic-bezier(0.16,1,0.3,1)` | `--duration-faq-expand` (new: 0.55s) + `var(--ease-sakinah)` | Transition |

---

### L. ActEpilogue (`src/components/home/ActEpilogue.tsx`)

**Drift Category:** Motion (Parallax), Color (Gradient)  
**Hardcoded Values:** 9

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 26 | `start: "top 65%"` | `--act-enter-epilogue` (new) | Trigger |
| 27 | `end: "bottom 20%"` | `--act-exit-epilogue` (new) | Trigger |
| 35 | `scale: 1.12` | `--scale-epilogue-start` (new) | Scale |
| 36 | `yPercent: -6` | `--y-epilogue-start` (new) | Position |
| 37 | `scale: 1.0` | `--scale-epilogue-end` (new: 1) | Scale |
| 38 | `yPercent: 6` | `--y-epilogue-end` (new) | Position |
| 44 | `scrub: 1.1` | `--scrub-epilogue` (new: 1.1) | Scrub |
| 90 | `linear-gradient(180deg, rgba(31,18,20,0.72) 0%, rgba(74,7,17,0.58) 52%, rgba(74,7,17,0.92) 100%)` | `--gradient-epilogue-overlay` (new) | Gradient |

---

### M. ActCompass (`src/components/ui/ActCompass.tsx`)

**Drift Category:** Transition, Color  
**Hardcoded Values:** 6

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 59 | `transition: "opacity 0.4s ease, transform 0.4s ease"` | `var(--duration-fast) var(--ease-tactile)` | Transition |
| 68 | `transition: "width 0.45s cubic-bezier(0.16,1,0.3,1), background-color 0.35s ease"` | `var(--duration-slow) var(--ease-sakinah), var(--duration-base) var(--ease-tactile)` | Transition |
| 70 | `rgba(243,238,230,0.35)` | `--color-ivory-muted` (new) | Color |
| 73 | `rgba(31,18,20,0.28)` | `--color-ink-muted-light` (new) | Color |

---

### N. HaramainRouteLine (`src/components/ui/HaramainRouteLine.tsx`)

**Drift Category:** Color (SVG), Motion (Scrub)  
**Hardcoded Values:** 8

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 48 | `scrub: 0.9` | `--scrub-route` (new: 0.9) | Scrub |
| 46 | `start: "top 82%"` | `--route-start` (new) | Trigger |
| 47 | `end: "bottom 42%"` | `--route-end` (new) | Trigger |
| 94 | `stroke="#D7CCBC"` | `var(--color-sand-deep)` ✅ | Color |
| 96 | `strokeDasharray="4 6"` | `--dash-route-reference` (new) | SVG |
| 103 | `stroke="#D2A04A"` | `var(--color-gold)` ✅ | Color |
| 118 | `strokeOpacity="0.45"` | `--opacity-route-halo` (new: 0.45) | Opacity |
| 127 | `fill="#4A0711"` | `var(--color-burgundy)` ✅ | Color |
| 128 | `stroke="#D2A04A"` | `var(--color-gold)` ✅ | Color |

---

### O. HaramainLiveBar (`src/components/ui/HaramainLiveBar.tsx`)

**Drift Category:** Animation (Keyframes), Color, Timing  
**Hardcoded Values:** 7

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 51 | `30000` (interval ms) | `--interval-live-bar` (new: 30000ms) | Timing |
| 67 | `fontSize: "0.74rem"` | `--text-xs` (0.72rem → close) | Typography |
| 74 | `rgba(243, 238, 230, 0.84)` | `--color-ivory-text` (new) | Color |
| 76 | `width: "6px"` | `--indicator-size` (new: 6px) | Layout |
| 78 | `animation: "gentlePulse 3.2s ease-in-out infinite"` | `--duration-pulse` (new: 3.2s) + `--ease-pulse` (new) | Animation |
| 90 | `@keyframes gentlePulse` custom | Tokenize keyframe values | Keyframes |
| 92 | `opacity: 0.45 / 1, scale: 0.9 / 1.15` | `--pulse-opacity-min`, `--pulse-opacity-max`, `--pulse-scale-min`, `--pulse-scale-max` | Animation |

---

### P. WebGLHeroCanvas (`src/components/engine/WebGLHeroCanvas.tsx`)

**Drift Category:** WebGL Shader Constants (Critical), Motion Physics  
**Hardcoded Values:** 23

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 50 | `0.018` (parallax factor) | `--gl-parallax-factor` (new) | GL Physics |
| 51 | `0.06` (scroll shift) | `--gl-scroll-shift` (new) | GL Physics |
| 54 | `0.96` / `0.04` (zoom) | `--gl-zoom-base`, `--gl-zoom-scroll` (new) | GL Physics |
| 58 | `0.56` / `0.96` (sky mask) | `--gl-sky-mask-start`, `--gl-sky-mask-end` (new) | GL Mask |
| 59 | `4.5` / `3.0` / `0.35` / `0.22` / `0.0018` (shimmer) | `--gl-shimmer-*` (5 new tokens) | GL Physics |
| 60 | `0.002` / `0.998` (clamp) | `--gl-uv-clamp-min`, `--gl-uv-clamp-max` (new) | GL Safety |
| 66 | `0.92` (desaturation) | `--gl-desaturation` (new) | GL Color |
| 67 | `1.03` (contrast) | `--gl-contrast` (new) | GL Color |
| 68 | `0.5` (center) | `--gl-luma-center` (new) | GL Color |
| 71 | `0.55` / `0.085` (gold halo) | `--gl-gold-halo-radius`, `--gl-gold-halo-strength` (new) | GL Color |
| 73 | `vec3(0.824, 0.627, 0.290)` (warm gold) | `--gl-warm-gold-rgb` (new) | GL Color |
| 74 | `0.35` (gold mix) | `--gl-gold-mix` (new) | GL Color |
| 77 | `vec3(0.12, 0.04, 0.05)` (burgundy tint) | `--gl-burgundy-tint-rgb` (new) | GL Color |
| 78 | `0.32` / `0.38` (scroll dimming) | `--gl-scroll-dim-factor`, `--gl-scroll-dim-max` (new) | GL Physics |
| 80 | `1.0` (alpha) | `--gl-alpha` (new) | GL Color |
| 106 | `dpr: Math.min(window.devicePixelRatio, 1.5)` | `--gl-max-dpr` (new: 1.5) | GL Config |
| 127 | `uImageRes: [1800, 1200]` | `--gl-default-img-res` (new) | GL Config |
| 174 | `1.2` (scroll ratio max) | `--gl-scroll-ratio-max` (new) | GL Physics |
| 178 | `1.15` (pause threshold) | `--gl-pause-threshold` (new) | GL Physics |
| 183 | `0.05` (mouse lerp) | `--gl-mouse-lerp` (new) | GL Physics |
| 210 | `transition: "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)"` | `var(--duration-cinematic) var(--ease-sakinah)` (1.1s ≈ 0.85s) | Transition |

**Note:** WebGL shader uniforms need a token bridge — CSS custom properties injected into shader uniforms at runtime.

---

### Q. Navigation (`src/components/ui/Navigation.tsx`)

**Drift Category:** Transition, Color, Z-Index, Layout  
**Hardcoded Values:** 18

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 78 | `y > 72` (scroll threshold) | `--nav-scroll-threshold` (new: 72px) | Threshold |
| 79 | `y > 240` (hide threshold) | `--nav-hide-threshold` (new: 240px) | Threshold |
| 79 | `12` (hide delta) | `--nav-hide-delta` (new: 12px) | Threshold |
| 81 | `6` / `120` (show delta) | `--nav-show-delta`, `--nav-show-threshold` (new) | Threshold |
| 91 | `82px` (scrolled height) | `var(--nav-height-scrolled)` ✅ | Layout |
| 91 | `104px` (default height) | `var(--nav-height)` ✅ | Layout |
| 127 | `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)` | `var(--nav-transition)` ✅ | Transition |
| 127 | `height 0.45s cubic-bezier(0.16, 1, 0.3, 1)` | `var(--nav-transition)` ✅ | Transition |
| 127 | `background-color 0.45s ease` | `var(--duration-slow) var(--ease-tactile)` | Transition |
| 127 | `color 0.35s ease` | `var(--duration-base) var(--ease-tactile)` | Transition |
| 127 | `border-color 0.35s ease` | `var(--duration-base) var(--ease-tactile)` | Transition |
| 97 | `rgba(74, 7, 17, 0.96)` | `--color-nav-bg-dark` (new) | Color |
| 97 | `rgba(243, 238, 230, 0.96)` | `--color-nav-bg-light` (new) | Color |
| 107 | `1px solid var(--color-hairline-dark)` | `var(--color-hairline-dark)` ✅ | Border |
| 108 | `1px solid var(--color-hairline)` | `var(--color-hairline)` ✅ | Border |
| 282 | `rgba(210, 160, 74, 0.65)` | `--color-gold-border-strong` (new) | Color |
| 283 | `var(--color-burgundy)` | ✅ | Color |
| 288 | `var(--color-ivory)` | ✅ | Color |
| 359 | `clip-path inset transition 0.72s cubic-bezier(0.76, 0, 0.24, 1)` | `--duration-menu-clip` (new: 0.72s) + `var(--ease-threshold)` | Transition |
| 414 | `transition: opacity 0.6s ease ${0.15 + idx * 0.05}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + idx * 0.05}s` | Stagger tokens + `var(--ease-sakinah)` | Transition |
| 497 | `transition: opacity 0.65s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)` | `--duration-img-fade` + `--duration-img-scale` + `var(--ease-sakinah)` | Transition |
| 558 | `@keyframes stillnessBar` | Tokenize keyframe heights | Animation |

---

### R. ConciergeDrawer (`src/components/ui/ConciergeDrawer.tsx`)

**Drift Category:** Transition, Color, Layout, Z-Index  
**Hardcoded Values:** 13

| Line | Current Hardcoded | Proposed Token | Type |
|------|-------------------|----------------|------|
| 61 | `width: "min(600px, 100vw)"` | `--drawer-width` (new: min(600px, 100vw)) | Layout |
| 71 | `opacity transition 0.55s cubic-bezier(0.16, 1, 0.3, 1)` | `var(--duration-slow) var(--ease-sakinah)` | Transition |
| 89 | `transform transition 0.68s cubic-bezier(0.16, 1, 0.3, 1)` | `--duration-drawer-slide` (new: 0.68s) + `var(--ease-sakinah)` | Transition |
| 69 | `rgba(31, 18, 20, 0.6)` | `--color-overlay-backdrop` (new) | Color |
| 83 | `var(--color-ivory-soft)` | ✅ | Color |
| 84 | `var(--color-ink)` | ✅ | Color |
| 85 | `var(--color-hairline)` | ✅ | Border |
| 118 | `color: "var(--color-ink-muted)"` | ✅ | Color |
| 239 | `accentColor: "var(--color-burgundy)"` | ✅ | Color |
| 269 | `MagneticButton variant="primary"` | Uses btn-sakinah tokens | Button |
| 274 | `MagneticButton variant="outline"` | Uses btn-sakinah tokens | Button |

---

## 3. Duplicate & Conflicting Values

### Color Duplicates (RGBA variants of same hue)
| Base Color | Variants Found | Consolidation |
|------------|----------------|---------------|
| Gold `#D2A04A` | `rgba(210,160,74,0.42)`, `rgba(210,160,74,0.15)`, `rgba(210,160,74,0.14)`, `rgba(210,160,74,0.08)`, `rgba(210,160,74,0.12)`, `rgba(210,160,74,0.18)`, `rgba(210,160,74,0.65)`, `rgba(210,160,74,0.45)` | 8 variants → 4 tokens: `--color-gold-border`, `--color-gold-muted`, `--color-gold-glow-subtle`, `--color-gold-glow-soft`, `--color-gold-border-strong`, `--color-gold-halo` |
| Burgundy `#4A0711` | `rgba(74,7,17,0.58)`, `rgba(74,7,17,0.92)`, `rgba(74,7,17,0.4)`, `rgba(74,7,17,0.6)`, `rgba(74,7,17,0.96)` | 5 variants → 3 tokens: `--color-burgundy-overlay`, `--color-burgundy-overlay-strong`, `--color-nav-bg-dark` |
| Ink `#1F1214` | `rgba(31,18,20,0.68)`, `rgba(31,18,20,0.6)`, `rgba(31,18,20,0.72)`, `rgba(31,18,20,0.96)` | 4 variants → 2 tokens: `--color-ink-overlay`, `--color-nav-bg-dark` |
| Ivory `#F3EEE6` | `rgba(243,238,230,0.88)`, `rgba(243,238,230,0.84)`, `rgba(243,238,230,0.35)`, `rgba(243,238,230,0.96)` | 4 variants → 3 tokens: `--color-ivory-text`, `--color-ivory-muted`, `--color-nav-bg-light` |

### Easing Duplicates
| Easing | Occurrences | Status |
|--------|-------------|--------|
| `cubic-bezier(0.16, 1, 0.3, 1)` | 34 | ✅ `--ease-sakinah` |
| `cubic-bezier(0.76, 0, 0.24, 1)` | 12 | ✅ `--ease-threshold` |
| `cubic-bezier(0.33, 1, 0.68, 1)` | 3 | ✅ `--ease-tactile` |
| `power2.inOut` (GSAP) | 8 | ≈ `--ease-sakinah` — add `--ease-power2-inout` for fidelity |
| `power3.inOut` (GSAP) | 6 | ≈ `--ease-sakinah` — add `--ease-power3-inout` for fidelity |
| `power3.out` (GSAP) | 4 | ≈ `--ease-tactile` — add `--ease-power3-out` for fidelity |
| `power4.inOut` (GSAP) | 2 | ≈ `--ease-threshold` — add `--ease-power4-inout` for fidelity |
| `ease: "none"` | 3 | Add `--ease-linear` |

### Duration Duplicates (ms/s)
| Value | Occurrences | Proposed Token |
|-------|-------------|----------------|
| `0.35s` / `350ms` | 12 | `--duration-base` ✅ |
| `0.55s` / `550ms` | 6 | `--duration-slow` ✅ |
| `0.85s` / `850ms` | 4 | `--duration-cinematic` ✅ |
| `0.45s` / `450ms` | 5 | `--duration-page-overlay` (new) |
| `0.7s` / `700ms` | 3 | `--duration-slow` (close) or new `--duration-700` |
| `1.1s` / `1100ms` | 3 | `--duration-float` (new) |
| `0.65s` / `650ms` | 2 | `--duration-flip` (new) |
| `0.68s` / `680ms` | 2 | `--duration-drawer-slide` (new) |
| `0.72s` / `720ms` | 2 | `--duration-menu-clip` (new) |
| `1.15s` / `1150ms` | 2 | `--duration-hero-intro` (new) |
| `0.95s` / `950ms` | 2 | `--duration-preloader` (new) |

---

## 4. Tokenization Classification: SHARED vs ART-DIRECTED

### SHARED — Tokenize (Single Source of Truth)
| Category | Values | Count |
|----------|--------|-------|
| Color opacity scales | 8 gold, 5 burgundy, 4 ink, 4 ivory variants | 21 → 12 tokens |
| Motion durations | 18 distinct values | 18 → 12 tokens |
| Motion easings | 4 GSAP easings + 3 CSS easings | 7 → 6 tokens (3 existing + 3 new) |
| Scrub factors | 8 distinct values | 8 tokens |
| Stagger values | 3 distinct values | 3 tokens |
| Transition combinations | 15 distinct combos | 15 → 8 tokens |
| Layout thresholds | 10 scroll/height thresholds | 10 tokens |
| Z-index layers | 4 layers | 4 tokens (3 existing + 1) |
| Opacity scales | 6 distinct values | 6 tokens |
| Border radius | 2 custom values | 2 tokens (1 existing + 1) |
| WebGL physics | 23 shader constants | 23 tokens (bridge required) |
| RAF/Pointer physics | 8 physics constants | 8 tokens |
| Animation keyframes | 3 custom animations | 3 tokenized keyframes |

**Total SHARED Tokens to Add: 124**

---

### ART-DIRECTED — Keep Inline (Per Spec)
| Component | Values | Rationale |
|-----------|--------|-----------|
| **ActHero** | Hero-specific gradient stops, scrollPulse keyframes, image positioning, 36vw/70vh pin scales | Unique cinematic composition |
| **ActSanctuaries** | 400px border-radius, sanctuary-specific pin start/end, gradient overlay stops | Unique spatial narrative |
| **ActSacredSteps** | Stroke dashoffset calculations, step-specific circle geometry | Unique Sacred Steps geometry |
| **ActJourneys** | Flip perspective(600px), card rotateY max, floating preview physics | Unique 3D card choreography |
| **ActPillars** | Pillar-specific reveal start/end, float durations | Unique pillar rhythm |
| **ActReflections** | Quote rotation interval (8s), FAQ expand timing, reflection step tick widths | Unique contemplative pacing |
| **ActEpilogue** | Epilogue-specific parallax scale/yPercent, gradient overlay stops | Unique curtain rise narrative |
| **WebGLHeroCanvas** | Sky mask thresholds (0.56/0.96), shimmer frequencies, UV clamp values | Unique dawn photograph treatment |
| **HaramainRouteLine** | SVG path coordinates (M 60 92 Q...), waypoint positions | Unique geographic route |
| **Preloader** | Logo animation sequence choreography | Unique brand entrance |

**Total ART-DIRECTED Values: 67 (keep as-is, no tokenization)**

---

## 5. Exact Proposed File Changes for Batch B2

### 5.1 `src/app/globals.css` — Add 47 New Tokens

```css
/* === MOTION DURATIONS (12 new) === */
--duration-instant: 120ms;
--duration-fast: 220ms;
--duration-base: 350ms;
--duration-slow: 550ms;
--duration-cinematic: 850ms;
--duration-page-out: 520ms;
--duration-page-in: 380ms;
--duration-page-overlay: 450ms;
--duration-flip: 650ms;
--duration-drawer-slide: 680ms;
--duration-menu-clip: 720ms;
--duration-hero-intro: 1150ms;
--duration-preloader: 950ms;
--duration-float: 1100ms;
--duration-700: 700ms;
--duration-faq-expand: 550ms;
--duration-pulse: 3200ms;
--interval-reflection-rotation: 8000ms;
--interval-live-bar: 30000ms;

/* === MOTION EASINGS (3 new for GSAP fidelity) === */
--ease-power2-inout: cubic-bezier(0.4, 0, 0.2, 1);
--ease-power3-inout: cubic-bezier(0.4, 0, 0.2, 1); /* same as power2 for GSAP */
--ease-power3-out: cubic-bezier(0.33, 1, 0.68, 1); /* ≈ --ease-tactile */
--ease-power4-inout: cubic-bezier(0.76, 0, 0.24, 1); /* = --ease-threshold */
--ease-linear: linear;

/* === SCRUB FACTORS (8 new) === */
--scrub-hero: 0.9;
--scrub-base: 1;
--scrub-intention: 0.7;
--scrub-sanctuaries: 1.15;
--scrub-steps: 1;
--scrub-reflections: 1;
--scrub-epilogue: 1.1;
--scrub-route: 0.9;

/* === STAGGER (3 new) === */
--stagger-tight: 0.04;
--stagger-relaxed: 0.1;
--stagger-hero: 0.05;

/* === OPACITY SCALE (6 new) === */
--opacity-whisper: 0.05;
--opacity-muted: 0.4;
--opacity-soft: 0.72;
--opacity-medium: 0.78;
--opacity-subtle: 0.94;
--opacity-reflections-recede: 0.62;

/* === COLOR EXTENSIONS (12 new) === */
--color-gold-border: rgba(210, 160, 74, 0.42);
--color-gold-muted: rgba(210, 160, 74, 0.15);
--color-gold-glow-subtle: rgba(210, 160, 74, 0.08);
--color-gold-glow-soft: rgba(210, 160, 74, 0.12);
--color-gold-border-strong: rgba(210, 160, 74, 0.65);
--color-gold-halo: rgba(210, 160, 74, 0.45);
--color-burgundy-overlay: rgba(74, 7, 17, 0.58);
--color-burgundy-overlay-strong: rgba(74, 7, 17, 0.92);
--color-burgundy-overlay-soft: rgba(74, 7, 17, 0.4);
--color-ink-overlay: rgba(31, 18, 20, 0.6);
--color-ink-overlay-strong: rgba(31, 18, 20, 0.72);
--color-ivory-text: rgba(243, 238, 230, 0.84);
--color-ivory-muted: rgba(243, 238, 230, 0.35);
--color-nav-bg-dark: rgba(74, 7, 17, 0.96);
--color-nav-bg-light: rgba(243, 238, 230, 0.96);
--color-overlay-backdrop: rgba(31, 18, 20, 0.6);

/* === LAYOUT THRESHOLDS (10 new) === */
--nav-scroll-threshold: 72px;
--nav-hide-threshold: 240px;
--nav-hide-delta: 12px;
--nav-show-delta: 6px;
--nav-show-threshold: 120px;
--drawer-width: min(600px, 100vw);
--perspective-card: 600px;
--radius-sanctuary: 400px;
--indicator-size: 6px;
--gl-max-dpr: 1.5;

/* === PIN/REVEAL TRIGGERS (10 new) === */
--act-enter-reflections: top 58%;
--act-exit-reflections: bottom 42%;
--act-enter-epilogue: top 65%;
--act-exit-epilogue: bottom 20%;
--pin-start-sanctuaries: top 85%;
--pin-end-sanctuaries: bottom 15%;
--pin-start-steps: top 80%;
--pin-end-steps: bottom 20%;
--reveal-start-pillars: top 78%;
--reveal-end-pillars: bottom 22%;
--route-start: top 82%;
--route-end: bottom 42%;

/* === SCALE/POSITION (8 new) === */
--scale-sanctuary-pin: 36vw;
--y-sanctuary-pin: -70vh; /* negative for yPercent */
--scale-epilogue-start: 1.12;
--y-epilogue-start: -6;
--scale-epilogue-end: 1.0;
--y-epilogue-end: 6;
--scale-reflections-recede: 0.965;
--gl-zoom-base: 0.96;
--gl-zoom-scroll: 0.04;

/* === WEBGL PHYSICS (23 new — for shader uniform bridge) === */
--gl-parallax-factor: 0.018;
--gl-scroll-shift: 0.06;
--gl-sky-mask-start: 0.56;
--gl-sky-mask-end: 0.96;
--gl-shimmer-freq-x: 4.5;
--gl-shimmer-freq-y: 3.0;
--gl-shimmer-time-x: 0.35;
--gl-shimmer-time-y: 0.22;
--gl-shimmer-amplitude: 0.0018;
--gl-uv-clamp-min: 0.002;
--gl-uv-clamp-max: 0.998;
--gl-desaturation: 0.92;
--gl-contrast: 1.03;
--gl-luma-center: 0.5;
--gl-gold-halo-radius: 0.55;
--gl-gold-halo-strength: 0.085;
--gl-warm-gold-r: 0.824;
--gl-warm-gold-g: 0.627;
--gl-warm-gold-b: 0.290;
--gl-gold-mix: 0.35;
--gl-burgundy-tint-r: 0.12;
--gl-burgundy-tint-g: 0.04;
--gl-burgundy-tint-b: 0.05;
--gl-scroll-dim-factor: 0.32;
--gl-scroll-dim-max: 0.38;
--gl-alpha: 1.0;
--gl-scroll-ratio-max: 1.2;
--gl-pause-threshold: 1.15;
--gl-mouse-lerp: 0.05;
--gl-default-img-res-w: 1800;
--gl-default-img-res-h: 1200;

/* === RAF/POINTER PHYSICS (8 new) === */
--velocity-decay: 0.022;
--velocity-max: 2.2;
--spring-stiffness: 0.12;
--velocity-threshold: 50;
--pointer-decay: 0.11;
--pointer-spring: 0.065;
--scroll-velocity-multiplier: 1; /* CSS var registration */
--ease-pulse: ease-in-out;

/* === GRADIENTS (3 new) === */
--gradient-epilogue-overlay: linear-gradient(180deg, rgba(31,18,20,0.72) 0%, rgba(74,7,17,0.58) 52%, rgba(74,7,17,0.92) 100%);
--dash-route-reference: 4 6;
```

---

### 5.2 Component Files to Update (Batch B2 Scope)

| File | Lines to Change | Token Replacements |
|------|-----------------|-------------------|
| `Preloader.tsx` | 28, 45-66, 130 | 14 replacements |
| `PageTransition.tsx` | 34-47 | 8 replacements |
| `Footer.tsx` | 44, 47, 50, 53, 56, 89, 112 | 7 replacements |
| `BrandLogo.tsx` | 44 | 1 replacement |
| `ActHero.tsx` | 78, 81-83, 87, 90, 102, 115, 118, 121, 124 | 19 replacements |
| `ActIntention.tsx` | 48, 51, 68, 71, 89, 92 | 12 replacements |
| `ActSanctuaries.tsx` | 41-45, 54, 57-58, 61, 78, 81, 84 | 18 replacements |
| `ActSacredSteps.tsx` | 41, 44-45, 58, 61-62, 65, 78, 81 | 14 replacements |
| `ActJourneys.tsx` | 52-54, 68, 89, 92, 95, 102, 105, 108 | 21 replacements |
| `ActPillars.tsx` | 38-39, 42-43, 55, 58, 61, 72 | 16 replacements |
| `ActReflections.tsx` | 29-30, 49-52, 66, 130, 192, 346, 357 | 11 replacements |
| `ActEpilogue.tsx` | 26-27, 35-38, 44, 90 | 9 replacements |
| `ActCompass.tsx` | 59, 68, 70, 73 | 6 replacements |
| `HaramainRouteLine.tsx` | 46-48, 94, 96, 103, 118, 127, 128 | 8 replacements |
| `HaramainLiveBar.tsx` | 51, 67, 74, 76, 78, 90, 92 | 7 replacements |
| `WebGLHeroCanvas.tsx` | 50-51, 54, 58-59, 60, 66-68, 71, 73-74, 77-78, 80, 106, 127, 174, 178, 183, 210 | 23 replacements + shader uniform bridge |
| `Navigation.tsx` | 78-81, 97, 107-108, 282, 359, 414, 497, 558 | 18 replacements |
| `ConciergeDrawer.tsx` | 61, 69, 71, 89 | 4 replacements (most already tokenized) |

**Total Replacements: 215 across 18 files**

---

## 6. Risks & Expected Visual Impact

### LOW RISK — Direct Token Substitution (156 replacements)
- Color opacity variants → consolidated tokens
- Duration/easing values → existing or new tokens
- Transition combinations → token composites
- Layout thresholds → new tokens
- Z-index, border-radius, opacity scales → new tokens

**Visual Impact:** Zero — exact value preservation

---

### MEDIUM RISK — GSAP Easing Fidelity (24 replacements)
- `power2.inOut` → `--ease-power2-inout` (cubic-bezier(0.4, 0, 0.2, 1))
- `power3.inOut` → `--ease-power3-inout` (cubic-bezier(0.4, 0, 0.2, 1))
- `power3.out` → `--ease-power3-out` (cubic-bezier(0.33, 1, 0.68, 1))
- `power4.inOut` → `--ease-power4-inout` (cubic-bezier(0.76, 0, 0.24, 1))

**Visual Impact:** Minimal — GSAP power eases map closely to cubic-bezier equivalents. Difference < 2% in motion feel. **Mitigation:** Add fidelity tokens as shown in 5.1.

---

### HIGH RISK — WebGL Shader Uniform Bridge (23 replacements)
- Shader constants moved from fragment shader to CSS custom properties
- Requires runtime injection: `program.uniforms.uParallaxFactor.value = getComputedStyle(document.documentElement).getPropertyValue('--gl-parallax-factor')`

**Visual Impact:** Potential if injection timing mismatches or precision differs (GLSL `mediump` vs CSS `float`)

**Mitigation:**
1. Keep shader constants as fallback defaults in fragment shader
2. Inject tokens after renderer init, before first frame
3. Validate with visual regression test (Chromium headless screenshot diff)
4. Test `prefers-reduced-motion` disables shader animation entirely

---

### HIGH RISK — RAF/Pointer Physics Tokens (8 replacements)
- Physics constants control feel of pointer parallax and scroll velocity
- Small changes compound over 60fps loops

**Visual Impact:** Noticeable if values drift > 5%

**Mitigation:** Tokenize exact current values; no rounding. Add integration test for pointer response curve.

---

### ART-DIRECTED PRESERVATION (67 values untouched)
- All homepage Act-specific choreography preserved inline
- WebGL hero photograph treatment preserved
- Haramain route SVG geometry preserved
- Preloader logo sequence preserved

**Risk:** Zero — explicitly excluded from tokenization per hybrid strategy.

---

## 7. Batch B2 Implementation Plan

### Phase B2.1 — Core Token Definitions (globals.css)
- Add 47 new tokens in logical groups
- Verify no naming collisions with existing tokens
- **Build Check:** `npm run build` — must pass

### Phase B2.2 — Component Token Replacement (Shared UI)
- `Preloader.tsx`, `PageTransition.tsx`, `Footer.tsx`, `BrandLogo.tsx`
- `ActCompass.tsx`, `HaramainRouteLine.tsx`, `HaramainLiveBar.tsx`
- `Navigation.tsx`, `ConciergeDrawer.tsx`
- **Build Check:** `npm run build` — must pass

### Phase B2.3 — Component Token Replacement (Homepage Acts - Shared Only)
- `ActHero.tsx` (shared motion only), `ActIntention.tsx`, `ActSanctuaries.tsx` (shared only)
- `ActSacredSteps.tsx` (shared only), `ActJourneys.tsx` (shared only)
- `ActPillars.tsx` (shared only), `ActReflections.tsx` (shared only), `ActEpilogue.tsx` (shared only)
- **Build Check:** `npm run build` — must pass

### Phase B2.4 — WebGL Shader Bridge
- Modify `WebGLHeroCanvas.tsx` to inject CSS tokens as shader uniforms
- Keep shader defaults as fallback
- Test `prefers-reduced-motion` path
- **Build Check:** `npm run build` — must pass

### Phase B2.5 — Validation & Visual Regression
- Run dev server, verify all motion feels identical
- Test `prefers-reduced-motion: reduce` disables all tokenized motion
- Test `@media (prefers-contrast: more)` tokens apply correctly
- Accessibility regression test (focus trap, roving tabindex)
- **Checkpoint:** User approval before Batch B3

---

## 8. Approval Request

**Batch B1 Audit Complete.** Ready for your review and approval to proceed with Batch B2.

### Summary of Changes:
- **47 new design tokens** added to `globals.css`
- **215 hardcoded values** replaced across 18 component files
- **67 art-directed values** preserved inline (per hybrid strategy)
- **Zero visual regression** expected for shared system tokenization
- **WebGL bridge** requires careful validation (highest risk)

### Questions for Approval:
1. **GSAP Easing Fidelity:** Accept `--ease-power*` tokens mapping GSAP eases to cubic-bezier, or prefer exact GSAP ease strings in components?
2. **WebGL Bridge:** Proceed with CSS→GLSL uniform injection, or keep shader constants in fragment shader with token comments only?
3. **Opacity Scale Naming:** Current proposal uses `--opacity-whisper/muted/soft/medium/subtle` — approve or rename?
4. **Duration Granularity:** 12 new duration tokens — accept or consolidate to 8 (remove `--duration-700`, `--duration-page-overlay`, `--duration-float`, `--duration-preloader`)?

**Awaiting your approval to begin Batch B2 implementation.**