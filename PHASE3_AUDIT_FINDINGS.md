# Phase 3: Codebase Audit Findings
## Dar E Nabi Travels — Awwwards/CSS Design Awards/FWA Standards Assessment

---

## Executive Summary

After inspecting **47 files** across the entire codebase (design tokens, engine components, UI components, home Acts, content pages, and context), the Dar E Nabi Travels codebase reveals an **exceptionally mature foundation** — one of the most sophisticated design systems I've encountered in a production Next.js application. The craftsmanship is already at **Awwwards Honorable Mention / CSS Design Awards Special Kudos tier**. To reach **Site of the Day / FWA Winner tier**, the work is not "fixing broken things" but **elevating the exceptional to the transcendent** through surgical refinements in motion physics, typographic nuance, WebGL artistry, and architectural coherence.

---

## 1. STRENGTHS (What is already world-class)

| Area | Evidence | Why It Matters for Awards |
|------|----------|---------------------------|
| **Token System Architecture** | `globals.css` ~590 lines of semantically named CSS custom properties with fluid `clamp()` scales, motion physics variables (`--ease-sakinah`, `--ease-threshold`, `--ease-tactile`), section theming via `data-theme` (not `prefers-color-scheme`) | Demonstrates systems thinking; tokens are *design decisions*, not just values. Enables global art-direction changes in one file. |
| **Fluid Typography System** | `clamp()`-based display/body scales (`--step-*` from -2 to 7), Cormorant Garamond (static) + DM Sans (variable-capable) + Amiri (Arabic), editorial em-dash ligatures, word-by-word scroll illumination | Typography *is* the brand. The variable font capability (DM Sans) is loaded but underutilized — huge opportunity. |
| **Motion Physics Language** | Named easings map to brand values: `sakinah` (tranquility), `threshold` (anticipation), `tactile` (response). `prefers-reduced-motion` respected at context + component level. | Motion as *meaning*, not decoration. Jurors notice when easing has semantic intent. |
| **WebGL Integration (OGL)** | `WebGLAtmosphere` (4 modes, chromatic interpolation), `WebGLHeroCanvas` (living photography shader, cover UVs, pointer parallax, scroll-linked warmth, editorial film grade) | Custom shaders > Three.js presets. The "editorial film grade" LUT approach is distinctive. |
| **GSAP Mastery** | `Flip` for journey filtering, `ScrollTrigger` scrub/reveal patterns, `magnetic` pointer tracking, velocity-reactive ribbon (`--scroll-velocity` CSS var), zero React re-renders for cursor | Performance-first animation. The `CompassCursor` zero-re-render pattern is senior-level. |
| **Section-Level Theming** | `data-theme="ivory|burgundy|obsidian|sand"` on `<html>` drives atmosphere, WebGL mode, *and* component tokens simultaneously | Cohesive "acts" feel like chapters in a book, not disconnected pages. |
| **Arabic/RTL Excellence** | `ArabicSweep` (clip-path ink reveal), `Amiri` font loaded correctly, `dir="rtl"` + `lang="ar"` on every Arabic string, Khatam geometric patterns | Cultural authenticity *is* the brand differentiator. Most sites treat RTL as afterthought. |
| **Component Architecture** | Engine (WebGL, scroll, cursor, transition) cleanly separated from UI (buttons, headings, icons, forms). Composition over inheritance. | Scalable, testable, award-jury-readable code structure. |
| **Content-First Design** | `content.ts` — 700+ lines of curated, verified photography (Unsplash HTTP 200 checked), pilgrim reflections, sacred guide chapters, Madinah chapters | Content *drives* design. No lorem ipsum. Real photography catalog with art direction notes. |
| **Accessibility Baseline** | Semantic HTML, ARIA roles on tabs/drawers, focus-visible styles, `prefers-reduced-motion` context, `lang`/`dir` on Arabic, print styles | Passes baseline — but "baseline" doesn't win awards. |

---

## 2. WEAKNESSES (Gaps between current state and FWA/SOTD)

### 2.1 Typographic Refinement (High Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **DM Sans variable font loaded but not exploited** | `layout.tsx:22-28` — `variable="--font-dm-sans"` defined but no `font-variation-settings` usage | **Critical** — Variable weight/width could replace 4 static weights, enable micro-adjustments for optical compensation at display sizes |
| **Cormorant Garamond static only** | `layout.tsx:18-21` — No variable variant; display sizes lack optical size axis | **High** — At `clamp(3rem, 6vw, 7rem)`, static fonts show hinting artifacts |
| **No typographic rhythm tokens** | `globals.css` — Missing `--leading-tight`, `--leading-relaxed`, `--tracking-tight` scales | **High** — Line-height/letter-spacing hardcoded in components; breaks token consistency |
| **Arabic/English baseline misalignment** | `ActIntention`, `ActHero`, `SplitHeading` — Mixed scripts share line-height | **Medium** — Amiri ascenders/descenders differ from Cormorant; causes visual "wobble" |
| **Editorial em-dash / ligature gaps** | `SplitHeading` uses `<em className="editorial-em">` but no `font-feature-settings` for `liga`, `dlig`, `calt` | **Medium** — Missing typographic polish jurors expect |

### 2.2 Motion Physics Polish (High Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **`--scroll-velocity` only used in `ActIntention` ribbon** | `SmoothScroll.tsx` exposes it globally; `ActIntention` consumes it; no other component reacts | **Critical** — Inconsistent physics language breaks immersion |
| **MagneticButton magnetic strength static** | `MagneticButton.tsx:68` — `strength: 0.35` hardcoded; no token | **High** — Should respond to `--ease-tactile` or dedicated `--magnetic-strength` |
| **No "momentum" easing for scroll-linked animations** | `ActSacredSteps` progress line, `ActJourneys` Flip — use `power3.out` not brand easings | **High** — Brand easings defined but not systematically applied |
| **CompassCursor trail physics disconnected from scroll velocity** | `CompassCursor.tsx` — Fixed spring; could breathe with `--scroll-velocity` | **Medium** — Missed opportunity for unified motion language |

### 2.3 WebGL Artistry Depth (Medium-High Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **Atmosphere shader: 4 modes but no "gold hour" transition** | `WebGLAtmosphere.tsx` — `ivory/sand/burgundy/ink` discrete; no temporal blend | **High** — Awards sites have *living* atmospheres that shift with scroll/time |
| **Hero canvas: film grade LUT hardcoded** | `WebGLHeroCanvas.tsx:180-220` — No token control; can't art-direct per journey | **High** — Each journey deserves distinct color grade (Serenity=cool, Heritage=warm, Ramadan=gold) |
| **No WebGL performance budget monitoring** | No `requestAnimationFrame` budget, no GPU memory tracking | **Medium** — Risk on low-end devices; FWA tests on mobile |
| **Particle/dust motes absent** | `WebGLAtmosphere` — Pure color fields; no atmospheric particulate | **Medium** — "Living" atmosphere needs micro-motion |

### 2.4 Component Tokenization Gaps (Medium Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **Inline styles dominate components** | `ActPillars`, `ActJourneys`, `ActIntention`, `ActHero` — 200+ lines of inline `style={{}}` | **High** — Tokens exist but components don't use them systematically |
| **No component-level token contracts** | `MagneticButton` has 4 variants but no `--btn-*` token namespace | **High** — Variant explosion unmanageable without token contract |
| **Spacing/rhythm hardcoded** | `clamp(28px, 3.8vw, 44px)` repeated across 15+ components | **Medium** — Should be `--space-section-gap`, `--space-row-gap` tokens |
| **Color usage inconsistent** | Some components use `var(--color-burgundy)`, others `#4A0711` literal | **Medium** — Breaks theming; `data-theme` won't affect literals |

### 2.5 Architecture & Performance Risks (Medium Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **GSAP `ScrollTrigger` refresh on every filter** | `ActJourneys.tsx:110` — `ScrollTrigger.refresh()` after Flip | **High** — Layout thrash on filter; should batch |
| **`CompassCursor` RAF loop runs globally** | `CompassCursor.tsx:64-91` — Always on for fine pointers; no intersection observer gate | **Medium** — Wasted cycles when cursor off-screen |
| **`WebGLAtmosphere` + `WebGLHeroCanvas` = 2 contexts** | Both create separate `<canvas>` + OGL renderer | **Medium** — Could share context; 2x GPU memory |
| **No image optimization strategy** | Unsplash URLs direct; no `next/image`, no blur placeholders, no `sizes` | **High** — LCP risk; awards jurors test on 3G |
| **Font loading: Cormorant 4 weights + DM Sans 4 weights + Amiri = 9 font files** | `layout.tsx:18-35` — No `preload`, no `font-display: optional` strategy | **High** — CLS/FCP impact; variable font could cut 6 files |

### 2.6 Accessibility Gaps (Medium Impact)
| Issue | Location | Severity |
|-------|----------|----------|
| **`ArabicSweep` clip-path animation not screen-reader announced** | `ArabicSweep.tsx` — Pure visual; no `aria-live` for content reveal | **Medium** — Sacred text reveal should be perceivable |
| **`ConciergeDrawer` focus trap incomplete** | `ConciergeDrawer.tsx` — No `FocusLock` on open; tab escapes to background | **High** — Modal accessibility failure |
| **`Navigation` overlay not keyboard navigable** | `Navigation.tsx` — Architectural index overlay opens on click; no ESC close, no focus management | **High** — Critical path inaccessible |
| **`prefers-reduced-motion` respected but `prefers-contrast` ignored** | `globals.css` — No high-contrast token overrides | **Medium** — WCAG 2.1 AA gap |
| **No skip-to-main link** | `layout.tsx` — Missing | **Low** — Easy win |

---

## 3. ART-DIRECTION ASSESSMENT

### Current Visual Language: **"Quiet Luxury Pilgrimage"**
- **Palette**: Deep Burgundy (#4A0711) + Warm Gold (#D2A04A) + Warm Ivory (#F3EEE6) — *distinctive, ownable*
- **Typography**: Editorial serif (Cormorant) + Humanist sans (DM Sans) + Calligraphic Arabic (Amiri) — *culturally authentic*
- **Motion**: Silk, breath, anticipation — *emotionally resonant*
- **Imagery**: Verified real photography, art-directed — *trust-building*

### Gaps to "Transcendent" (Awwwards SOTD / FWA Winner)
| Dimension | Current | Target | Gap |
|-----------|---------|--------|-----|
| **Typographic Voice** | Excellent static | Variable, optically compensated, micro-tuned per viewport | **Variable font exploitation + optical sizing** |
| **Atmosphere** | 4 discrete modes | Continuous, scroll-linked, time-aware, particulate | **Living shader + temporal blending** |
| **Motion Unity** | Component-scoped | Global physics language (velocity → magnetic → cursor → scroll) | **Unified motion token system** |
| **Narrative Arc** | 8 Acts linear | Act transitions as *moments* (veil, breath, gold hairline) | **PageTransition as narrative punctuation** |
| **Cultural Depth** | Authentic content | Typographic honor (Arabic baseline, ligatures, calligraphic nuance) | **Arabic typographic excellence** |
| **Interactive Soul** | Magnetic, hover, scroll | *Responsive environment* (cursor breathes with scroll, atmosphere remembers journey) | **Stateful, persistent micro-interactions** |

### Jury Perspective
> "This site *feels* like a pilgrimage — the motion has intention, the typography has reverence, the WebGL has soul. But the variable font opportunity is unused, the atmosphere doesn't *breathe* with scroll, and the magnetic interactions feel like UI patterns rather than extensions of the brand's physics. Fix those three things and this wins."

---

## 4. ARCHITECTURE ASSESSMENT

### Strengths
- **Clean separation**: `engine/` (WebGL, scroll, cursor, transition) vs `ui/` (buttons, headings, icons, forms) vs `home/` (Acts) vs `pages/`
- **Context-driven state**: `ExperienceContext` centralizes preloader, menu, concierge, transition, atmosphere, active act, audio, reduced motion
- **GSAP context scoping**: `gsap.context(() => {...}, section)` — proper cleanup, no memory leaks
- **Composition over inheritance**: `ActHero` composes `WebGLHeroCanvas` + `LivingImage` + `SplitHeading` + `ArabicSweep` + `HaramainLiveBar`

### Risks & Technical Debt
| Risk | Location | Impact |
|------|----------|--------|
| **Inline style sprawl** | All Act components | Hard to theme; token changes don't propagate; design review impossible |
| **No component token contracts** | `MagneticButton`, `SplitHeading`, `LivingImage` | Variant explosion; inconsistent APIs; breaking changes likely |
| **Two WebGL contexts** | `WebGLAtmosphere` + `WebGLHeroCanvas` | GPU memory; could share renderer + scene graph |
| **Content/Component coupling** | `ActJourneys` imports `JOURNEYS` directly | Hard to test; CMS migration painful |
| **No Storybook / visual regression** | — | Design system changes untested visually |

### Scalability Score: **8/10** — Excellent foundation; tokenization is the only blocker to 10/10.

---

## 5. PROPOSED TOKEN & COMPONENT STRATEGY

### 5.1 Token Namespace Expansion (in `globals.css`)

```css
/* ===== TYPOGRAPHIC RHYTHM ===== */
--leading-none: 1;
--leading-tight: 1.1;
--leading-snug: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;

/* ===== VARIABLE FONT AXES ===== */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* DM Sans variable: wght 200-700, wdth 75-125 */
/* Usage: font-variation-settings: 'wght' var(--font-weight-regular), 'wdth' 100; */

/* ===== SPACING RHYTHM ===== */
--space-xs: clamp(4px, 0.5vw, 8px);
--space-sm: clamp(8px, 1vw, 16px);
--space-md: clamp(16px, 2vw, 24px);
--space-lg: clamp(24px, 3vw, 36px);
--space-xl: clamp(32px, 4vw, 48px);
--space-2xl: clamp(48px, 6vw, 72px);
--space-3xl: clamp(64px, 8vw, 96px);
--space-4xl: clamp(96px, 12vw, 144px);

--space-section-pad: var(--space-4xl);
--space-row-gap: var(--space-xl);
--space-col-gap: var(--space-lg);

/* ===== MOTION PHYSICS (EXTENDED) ===== */
--magnetic-strength: 0.35;
--magnetic-strength-hover: 0.5;
--cursor-spring-stiffness: 180;
--cursor-spring-damping: 18;
--cursor-trail-delay: 0.08;

/* ===== COMPONENT TOKEN CONTRACTS ===== */
/* Button */
--btn-height: clamp(48px, 5vw, 56px);
--btn-padding-x: clamp(24px, 3vw, 36px);
--btn-radius: 0; /* Brand: sharp corners */
--btn-font-size: clamp(0.75rem, 1vw, 0.875rem);
--btn-letter-spacing: 0.12em;
--btn-transition: var(--duration-normal) var(--ease-tactile);

/* Input */
--input-height: clamp(48px, 5vw, 56px);
--input-padding-x: clamp(16px, 2vw, 20px);
--input-border-width: 1px;
--input-radius: 0;
--input-transition: var(--duration-fast) var(--ease-tactile);

/* Card / Panel */
--card-padding: var(--space-xl);
--card-border: 1px solid var(--color-hairline);
--card-radius: 0;
--card-shadow: none; /* Brand: flat, editorial */

/* ===== THEME OVERRIDES (per data-theme) ===== */
[data-theme="ivory"] {
  --atmosphere-mode: ivory;
  --bg-primary: var(--color-ivory);
  --bg-secondary: var(--color-sand);
  --text-primary: var(--color-ink);
  --text-muted: var(--color-ink-muted);
  --accent: var(--color-gold);
  --accent-hover: var(--color-burgundy);
}

[data-theme="burgundy"] {
  --atmosphere-mode: burgundy;
  --bg-primary: var(--color-burgundy);
  --bg-secondary: var(--color-obsidian);
  --text-primary: var(--color-ivory);
  --text-muted: var(--color-sand);
  --accent: var(--color-gold);
  --accent-hover: var(--color-ivory);
}

[data-theme="obsidian"] {
  --atmosphere-mode: ink;
  --bg-primary: var(--color-obsidian);
  --bg-secondary: var(--color-burgundy);
  --text-primary: var(--color-ivory);
  --text-muted: var(--color-gold-text);
  --accent: var(--color-gold);
  --accent-hover: var(--color-sand);
}

[data-theme="sand"] {
  --atmosphere-mode: sand;
  --bg-primary: var(--color-sand);
  --bg-secondary: var(--color-ivory);
  --text-primary: var(--color-ink);
  --text-muted: var(--color-ink-muted);
  --accent: var(--color-burgundy);
  --accent-hover: var(--color-gold);
}
```

### 5.2 Component Token Contracts (TypeScript)

```typescript
// src/components/ui/tokenContracts.ts
export interface MagneticButtonTokens {
  height: string;
  paddingX: string;
  radius: string;
  fontSize: string;
  letterSpacing: string;
  transition: string;
  // Variants
  primary: { bg: string; color: string; border: string; hoverBg: string; hoverColor: string };
  secondary: { bg: string; color: string; border: string; hoverBg: string; hoverColor: string };
  ghost: { bg: string; color: string; border: string; hoverBg: string; hoverColor: string };
  arabic: { bg: string; color: string; border: string; hoverBg: string; hoverColor: string };
}

export interface SplitHeadingTokens {
  lineGap: string;
  letterSpacing: string;
  rotationRange: [number, number];
  revealDuration: string;
  revealEase: string;
}

export interface LivingImageTokens {
  parallaxDepth: number;
  revealDuration: string;
  revealEase: string;
  cursorReflectionOpacity: number;
  archMaskScale: number;
}
```

### 5.3 Variable Font Integration Strategy

```css
/* In globals.css — DM Sans variable font exploitation */
@font-face {
  font-family: 'DM Sans VF';
  src: url('/fonts/DM_Sans-VF.woff2') format('woff2-variations');
  font-weight: 200 700;
  font-stretch: 75% 125%;
  font-display: optional;
  font-named-instance: 'Regular';
}

/* Optical compensation at display sizes */
.t-display-xl {
  font-family: 'Cormorant Garamond', 'DM Sans VF', serif;
  font-variation-settings: 'wght' 300, 'wdth' 95;
  font-feature-settings: 'liga' 1, 'dlig' 1, 'calt' 1, 'kern' 1;
}

.t-display-l {
  font-variation-settings: 'wght' 300, 'wdth' 98;
}

.t-display-m {
  font-variation-settings: 'wght' 400, 'wdth' 100;
}

.t-body {
  font-family: 'DM Sans VF', sans-serif;
  font-variation-settings: 'wght' 400, 'wdth' 100;
  font-feature-settings: 'liga' 1, 'calt' 1, 'kern' 1;
}

.t-body-sm {
  font-variation-settings: 'wght' 400, 'wdth' 102; /* Slightly wider for readability */
}

/* Arabic baseline alignment */
.font-arabic {
  font-family: 'Amiri', 'DM Sans VF', serif;
  /* Amiri metrics differ — use CSS custom property for line-height adjustment */
  line-height: var(--leading-arabic, 1.85);
}
```

---

## 6. ACCESSIBILITY & PERFORMANCE RISKS

### Accessibility (Must Fix Before Launch)
| Priority | Issue | File | Fix |
|----------|-------|------|-----|
| **P0** | ConciergeDrawer focus trap missing | `ConciergeDrawer.tsx` | Add `FocusLock` (floating-ui/react or custom) |
| **P0** | Navigation overlay not keyboard accessible | `Navigation.tsx` | ESC close, focus management, roving tabindex |
| **P0** | ArabicSweep no screen-reader announcement | `ArabicSweep.tsx` | `aria-live="polite"` on reveal container |
| **P1** | prefers-contrast not supported | `globals.css` | Add `@media (prefers-contrast: more)` token overrides |
| **P1** | Skip-to-main link missing | `layout.tsx` | Add `<a href="#main" class="skip-link">Skip to content</a>` |
| **P2** | MagneticButton focus-visible style weak | `MagneticButton.tsx` | Stronger `outline: 2px solid var(--color-gold); outline-offset: 4px` |

### Performance (Must Fix Before Awards Submission)
| Priority | Issue | File | Fix |
|----------|-------|------|-----|
| **P0** | 9 font files, no preload strategy | `layout.tsx` | Switch to DM Sans VF (1 file), preload Cormorant VF if available, `font-display: optional` |
| **P0** | Unsplash images unoptimized | All Act components | Migrate to `next/image` with `sizes`, `priority` on hero, blur placeholders |
| **P0** | Two WebGL contexts | `WebGLAtmosphere`, `WebGLHeroCanvas` | Share single OGL renderer; two scenes, one context |
| **P1** | ScrollTrigger.refresh on filter | `ActJourneys.tsx:110` | Batch: `ScrollTrigger.refresh(true)` after Flip completes |
| **P1** | CompassCursor RAF always running | `CompassCursor.tsx` | Gate with `IntersectionObserver` on viewport |
| **P2** | No WebGL performance budget | `WebGLAtmosphere`, `WebGLHeroCanvas` | Add `requestAnimationFrame` budget monitor; auto-reduce quality on low FPS |
| **P2** | Inline styles prevent CSS caching | All Act components | Extract to CSS modules / token-driven classes |

---

## 7. PRIORITIZED FILE-BY-FILE IMPLEMENTATION PLAN

### PHASE A: ESSENTIAL — Foundation & Accessibility (Week 1-2)
*These changes unblock everything else and fix critical gaps.*

| # | File | Change | Type | Effort |
|---|------|--------|------|--------|
| A1 | `globals.css` | Add full token namespace (typographic rhythm, spacing rhythm, component contracts, theme overrides) | **Token** | 4h |
| A2 | `layout.tsx` | Migrate to DM Sans Variable Font (1 file), add preload links, `font-display: optional`, Cormorant VF investigation | **Performance/Typography** | 3h |
| A3 | `ConciergeDrawer.tsx` | Add FocusLock on open; restore focus on close; ESC handling | **Accessibility** | 2h |
| A4 | `Navigation.tsx` | Add keyboard navigation to overlay: ESC close, focus trap, roving tabindex for index links | **Accessibility** | 3h |
| A5 | `ArabicSweep.tsx` | Add `aria-live="polite"` container; ensure Arabic content announced on reveal | **Accessibility** | 1h |
| A6 | `globals.css` | Add `@media (prefers-contrast: more)` overrides for all color tokens | **Accessibility** | 1h |
| A7 | `layout.tsx` | Add skip-to-main link; ensure `#main` on page.tsx wrapper | **Accessibility** | 0.5h |
| A8 | `MagneticButton.tsx` | Strengthen focus-visible; add `data-focus-visible-added` polyfill pattern | **Accessibility** | 1h |
| A9 | `WebGLAtmosphere.tsx` + `WebGLHeroCanvas.tsx` | Merge into single OGL renderer with two scenes; shared context | **Performance** | 4h |
| A10 | `ActJourneys.tsx` | Batch `ScrollTrigger.refresh(true)` after Flip; remove duplicate refresh | **Performance** | 1h |

**Phase A Total: ~20.5 hours**

---

### PHASE B: ESSENTIAL — Tokenization & Variable Fonts (Week 2-3)
*Systematic token adoption across all components; variable font exploitation.*

| # | File | Change | Type | Effort |
|---|------|--------|------|--------|
| B1 | `src/components/ui/tokenContracts.ts` | Create TypeScript token contracts for all UI components | **Architecture** | 2h |
| B2 | `MagneticButton.tsx` | Replace all inline styles with token contracts; magnetic strength from `--magnetic-strength` | **Tokenization** | 3h |
| B3 | `SplitHeading.tsx` | Tokenize line gap, rotation range, reveal duration/ease; add `font-feature-settings` for ligatures | **Tokenization/Typography** | 2h |
| B4 | `LivingImage.tsx` | Tokenize parallax depth, reveal duration/ease, cursor reflection opacity | **Tokenization** | 2h |
| B5 | `ArabicSweep.tsx` | Tokenize sweep duration, ease, clip-path params; align Arabic baseline with `--leading-arabic` | **Tokenization/Typography** | 2h |
| B6 | `BrandLogo.tsx` | Tokenize sizes, crest plate dimensions, gold hairline | **Tokenization** | 1h |
| B7 | `SacredIcons.tsx` | Tokenize KhatamStar/Lattice sizes, stroke widths, gold color | **Tokenization** | 1h |
| B8 | `HaramainRouteLine.tsx` | Tokenize line weight, gold color, draw duration, ease | **Tokenization** | 1h |
| B9 | `HaramainLiveBar.tsx` | Tokenize padding, border, font sizes, gold accents | **Tokenization** | 1h |
| B10 | `Preloader.tsx` | Tokenize canvas size, arch stroke, counter timing, logo size | **Tokenization** | 2h |
| B11 | `PageTransition.tsx` | Tokenize veil duration, clip-path params, gold hairline, logo scale | **Tokenization** | 2h |
| B12 | `CompassCursor.tsx` | Tokenize spring stiffness, damping, trail delay, size; connect to `--scroll-velocity` | **Tokenization/Motion** | 2h |
| B13 | `SmoothScroll.tsx` | Expose `--scroll-velocity` as documented token; add `--scroll-direction` | **Tokenization/Motion** | 1h |
| B14 | All Act components (`ActHero` through `ActEpilogue`) | Systematic inline style → token replacement; use `var(--space-*)`, `var(--leading-*)`, `var(--tracking-*)` | **Tokenization** | 12h |
| B15 | `globals.css` | Add variable font optical compensation classes (`.t-display-xl`, `.t-body`, etc.) with `font-variation-settings` | **Typography** | 3h |

**Phase B Total: ~37 hours**

---

### PHASE C: AWARD-ELEVATION — Motion Unity & WebGL Artistry (Week 3-4)
*The differentiators that push from "excellent" to "award-winning."*

| # | File | Change | Type | Effort |
|---|------|--------|------|--------|
| C1 | `WebGLAtmosphere.tsx` | **Living Atmosphere Shader**: temporal blending between modes, gold-hour transition, dust motes (GPU particles), scroll-linked chromatic shift | **WebGL Artistry** | 8h |
| C2 | `WebGLHeroCanvas.tsx` | **Per-Journey Film Grades**: token-driven LUT selection (Serenity=cool, Heritage=warm, Ramadan=gold, Family=soft); art-directable via `data-journey-category` | **WebGL Artistry** | 6h |
| C3 | `CompassCursor.tsx` | **Velocity-Reactive Cursor**: breathe with `--scroll-velocity` (scale, trail length, gold intensity); pause on `prefers-reduced-motion` | **Motion Unity** | 3h |
| C4 | `MagneticButton.tsx` | **Physics-Unified Magnetic**: strength from `--magnetic-strength` token; react to `--scroll-velocity` (stronger when scrolling fast) | **Motion Unity** | 2h |
| C5 | `ActIntention.tsx` | **Ribbon as Physics Anchor**: already uses `--scroll-velocity` — enhance with gold particle burst at direction change | **Motion Unity** | 2h |
| C6 | `ActSacredSteps.tsx` | **Progress Line Physics**: live-drawing line uses brand easings (`--ease-sakinah`); progress tied to scroll velocity | **Motion Unity** | 2h |
| C7 | `ActJourneys.tsx` | **Flip + Atmosphere Sync**: filter change triggers atmosphere mode shift (Serenity→ivory, Heritage→sand, Ramadan→gold, Family→burgundy) | **Motion Unity** | 3h |
| C8 | `PageTransition.tsx` | **Narrative Veil**: transition remembers *from* act and *to* act; veil color = departure act atmosphere; gold hairline = arrival act accent | **Narrative** | 3h |
| C9 | `ExperienceContext.tsx` | **Journey Memory**: persist last viewed journey slug; on return, preload its WebGL film grade; atmosphere "welcomes back" | **Stateful Soul** | 2h |
| C10 | `globals.css` | **High-Contrast Theme**: complete `--color-*` overrides for `prefers-contrast: more`; gold → higher contrast gold | **Accessibility Polish** | 1h |

**Phase C Total: ~32 hours**

---

### PHASE D: OPTIONAL — Polish & Depth (Week 4+)
*Nice-to-have; only if Phases A-C complete with budget remaining.*

| # | File | Change | Type | Effort |
|---|------|--------|------|--------|
| D1 | `ActHero.tsx` | **Hero Canvas Entrance**: WebGL shader "develops" like film (chemical bloom → image) on preloader complete | **Art Direction** | 4h |
| D2 | `ActSanctuaries.tsx` | **Arch Portal WebGL**: Madinah portal as actual WebGL depth (not CSS mask) with parallax layers | **WebGL Depth** | 6h |
| D3 | `ActReflections.tsx` | **Testimonial Physics**: cards respond to cursor proximity (subtle tilt) + scroll velocity (stagger timing) | **Motion Polish** | 3h |
| D4 | `ActPillars.tsx` | **Pillar Image Crossfade**: current CSS transition → GSAP crossfade with `--ease-sakinah` | **Motion Polish** | 2h |
| D5 | `Navigation.tsx` | **Index Overlay Physics**: photo preview crossfade uses brand easings; scroll velocity affects preview scale | **Motion Polish** | 3h |
| D6 | `globals.css` | **Print Stylesheet Enhancement**: `@page` margins, `@media print` hide WebGL/cursor, serialize journey data | **Print Polish** | 2h |
| D7 | `content.ts` | **Journey-Specific Typography**: per-journey `font-variation-settings` in content data (width/weight per spirit) | **Typography Depth** | 2h |
| D8 | `Footer.tsx` | **KhatamLatticePattern WebGL**: canvas-based living pattern (not SVG) with gold dust motes | **WebGL Depth** | 4h |

**Phase D Total: ~26 hours (Optional)**

---

## 8. ESSENTIAL vs OPTIONAL SUMMARY

| Category | Phases | Hours | Description |
|----------|--------|-------|-------------|
| **ESSENTIAL** | A + B | **~57.5h** | Accessibility compliance, tokenization foundation, variable font migration, WebGL context merge, performance fixes — *required for production quality and award eligibility* |
| **AWARD-ELEVATION** | C | **~32h** | Motion physics unity, living atmosphere, per-journey film grades, narrative transitions, stateful micro-interactions — *required for Awwwards SOTD / FWA Winner tier* |
| **OPTIONAL** | D | **~26h** | Deep art-direction polish, WebGL depth enhancements, print polish — *only if time/budget allows after A+C* |

**Total Essential + Award-Elevation: ~89.5 hours**

---

## 9. IMMEDIATE NEXT STEPS (Upon Approval)

1. **Start Phase A1** — Token namespace in `globals.css` (enables all subsequent tokenization)
2. **Parallel A2** — Variable font migration in `layout.tsx` (biggest performance win)
3. **Parallel A3-A8** — Accessibility fixes (can be done by separate developer)
4. **A9-A10** — WebGL merge + ScrollTrigger batch (performance critical path)

---

## 10. APPROVAL REQUEST

Per the 16-phase specification guardrail: **"Present the audit findings and proposed changes, then STOP and wait for my explicit approval."**

### I recommend proceeding with **Phases A + C (Essential + Award-Elevation)** — skipping Phase B's full tokenization of every Act component in favor of a **hybrid approach**:

- **Tokenize engine/UI components first** (MagneticButton, SplitHeading, LivingImage, etc.) — high leverage
- **Act components**: adopt spacing/typography tokens (`--space-*`, `--leading-*`, `--tracking-*`) but keep layout-specific inline styles for complex grids — *pragmatic balance*
- **Full component token contracts** only for reusable UI primitives

This reduces Phase B from ~37h to ~18h while capturing 80% of tokenization value.

---

**Awaiting your explicit approval to begin implementation.** Please confirm:
1. Proceed with Phases A + C (Essential + Award-Elevation)?
2. Accept hybrid tokenization approach for Act components?
3. Any Phase D items to promote to Essential?
4. Preferred sequencing: parallel tracks or sequential?