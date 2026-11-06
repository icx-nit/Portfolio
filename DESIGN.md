# DESIGN.md — Nittaya Pana Portfolio Design System
# Theme: Wope Cosmic Dark & Violet Horizon

> An illuminated, futuristic observatory interface crafted for **Nittaya Pana (UX/UI Designer & Software Engineer)**.
> Built on deep cosmic violet canvases (`#0a0118`) brought to life by ultraviolet glowing light blooms, cyan accents, and frosted glassmorphic card overlays.

---

## 1. Core Visual Principles

1. **Illumination over Heavy Shadow**:
   Surfaces float directly on deep violet-black canvas (`#0a0118`). Depth is created via illuminated translucent borders (`border-white/10` to `border-cyan-400/40`), glowing backdrops, and gradient halos rather than opaque shadows.

2. **Cosmic Glow & Horizon Blooms**:
   Subtle underlit aurora meshes (`animate-aurora-1 to 4`) and radial gradient flares (`from-[#713dff]/25 to-transparent blur-[120px]`) project energy into key focal points without distracting from content readability.

3. **Pill & Rounded Hierarchy**:
   - Small controls, tags, and category chips are **Full Pills** (`rounded-full`, 999px radius).
   - Content containers and dashboard cards use **Architectural Radii** (`rounded-2xl` to `rounded-3xl` / 16px - 24px).
   - Floating intro modals and hero cards feature top border illumination lines (`bg-gradient-to-r from-transparent via-cyan-400 to-transparent`).

4. **Tactile Feedback & Micro-Interactions**:
   Interactive elements provide responsive spring physics (`transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`). Buttons feature cyan ambient glows (`shadow-[0_0_30px_rgba(6,182,212,0.45)]`).

---

## 2. Color Palette & Design Tokens

| Token Name | Hex / Value | Tailwind Class | Application / Role |
|---|---|---|---|
| **Night Violet** | `#0a0118` | `bg-[#0a0118]` | Global page canvas, deep background surfaces |
| **Void Plum** | `#160c2b` | `bg-[#160c2b]` | Elevated cards, admin panel background, modal containers |
| **Obsidian Core** | `#0d061c` | `bg-[#0d061c]` | Input fields, recessed panels, code blocks |
| **Ultraviolet Core** | `#713dff` | `bg-[#713dff]` / `text-[#713dff]` | Primary brand accent, glowing light fields, active markers |
| **Lilac Beam** | `#b7a4fb` | `text-[#b7a4fb]` | Secondary accents, gradient high notes, subtle text highlights |
| **Horizon Violet** | `#8562ff` | `bg-[#8562ff]` | Midpoint gradient flare, illuminated borders |
| **Electric Cyan** | `#06b6d4` / `#22d3ee` | `text-cyan-400` / `bg-cyan-400` | High-priority CTAs, interactive highlights, live status badges |
| **Soft Quartz** | `#ffffff` | `text-white` | Primary headings, prominent body titles, icon strokes |
| **Ash Lilac** | `#9b96b0` | `text-ash-lilac` / `text-[#9b96b0]` | Standard body copy, navigation labels, timestamps |
| **Glass White 04** | `rgba(255, 255, 255, 0.04)` | `bg-white/[0.04]` | Glassmorphic card fill, ghost pill buttons |
| **Glass White 10** | `rgba(255, 255, 255, 0.10)` | `border-white/10` | Hairline borders on glass cards and dividers |

---

## 3. Typography Hierarchy

### Primary Body Font: **Inter** (`font-sans`)
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Role**: Navigation menus, descriptive body copy, input text, buttons, and system badges.
- **Tracking**:
  - Small text (`text-xs` / `text-sm`): standard tracking with `-0.01em` letter-spacing for crisp rendering.
  - Uppercase utility badges: `tracking-wider` or `tracking-widest` for structured visual labels.

### Display & Heading Moments: **Inter / Space Grotesk** (`font-display`)
- **Weights**: 700 (Bold), 800 (ExtraBold)
- **Role**: Hero headline statements ("UX/UI Designer"), section titles, and modal headers.
- **Treatment**: Tight negative tracking (`tracking-tight`) with linear gradient text effects (`bg-gradient-to-r from-white via-white/90 to-ash-lilac bg-clip-text text-transparent`).

---

## 4. Motion & Animation Standards

### 4.1 Aurora Mesh Glows
Four independently orbiting ambient radial light fields positioned behind the canvas:
- `animate-aurora-1`: Slow floating ultraviolet drift (duration 18s).
- `animate-aurora-2`: Counter-rotating cyan beam glow (duration 22s).
- `animate-aurora-3`: Subtle violet pulse in section transitions.
- `animate-aurora-4`: Deep bottom atmospheric haze.

### 4.2 3D Tilted Holographic Intro Card
- Entrance: `animate-intro-in` smooth scale up and perspective tilt.
- Floating Photo: `animate-intro-avatar` subtle vertical levitation.
- Heading Stagger: `animate-intro-text` delayed fade-in.

### 4.3 ScrollReveal
- Intersection Observer based viewport trigger (`components/ui/scroll-reveal.tsx`).
- Smooth cubic-bezier upward motion (`translateY(24px) -> 0`) combined with opacity transition.

---

## 5. Key Component Standards

### 5.1 Glassmorphic Cards
```html
<div class="backdrop-blur-2xl bg-[#160c2b]/80 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-violet-500/40 transition-all">
  <!-- Top glow accent line -->
  <div class="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
  <!-- Card Content -->
</div>
```

### 5.2 Primary Interactive Button
```html
<button class="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 text-black font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all">
  View Projects
</button>
```

### 5.3 Owner Status & Security Badges
- Verified Owner Badge: `bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md`
- Active State Indicator: Pulsing green dot with `animate-ping` ping halo.

---

## 6. Accessibility & Responsiveness (WCAG 2.1 AA)

- **Contrast Guarantee**: All text elements placed over `#0a0118` canvas maintain contrast ratios > 4.5:1 (Soft Quartz `#ffffff` and Muted Steel `#d2d0dd` exceed 12:1).
- **Interactive Focus States**: Visible cyan focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-400/50`) on all buttons, links, and form inputs.
- **Mobile Touch Targets**: All buttons, nav items, and interactive chips maintain a minimum touch bounding box of 44x44px.
- **Language Localization**: All core UI components support seamless instant switching between Thai and English with no layout displacement.
