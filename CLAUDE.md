# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build (static output to dist/)
npm run preview    # Preview built site locally
npm run test       # Run tests once
npm run test:ui    # Interactive Vitest UI
```

To run a single test file:
```bash
npx vitest run src/test/SomeComponent.test.tsx
```

## Environment Setup

Copy `.env.example` to `.env` and fill in EmailJS credentials for the contact form to work:
- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_KEY`

## Architecture

This is a personal portfolio static site built with **Astro + React islands**. Astro generates static HTML; React is used only for interactive components (dynamic project filtering, theme toggle, hamburger menu, contact form).

The project follows **Feature-Sliced Design lite** — each domain is self-contained, shared primitives live in `shared/`, and pages only orchestrate features.

```
src/
├── features/           # Self-contained domain modules
│   ├── hero/           # HeroSection.astro
│   ├── about/          # AboutSection.astro
│   ├── skills/         # data.ts + SkillsSection.astro
│   ├── projects/       # data.ts + ProjectsSection.astro + ProjectCard.astro + ProjectFilter.tsx
│   ├── experience/     # data.ts + ExperienceSection.astro
│   ├── metrics/        # data.ts + data.private.ts + MetricsSection.astro + KpiCard.astro
│   └── contact/        # ContactSection.astro + ContactModal.tsx + ContactForm.tsx
├── shared/
│   ├── i18n/           # translations.ts — single source of truth for all UI strings
│   └── ui/             # Nav.astro, Footer.astro, ThemeToggle.tsx, HamburgerMenu.tsx,
│                       # CountUp.tsx, CustomCursor.astro
├── layouts/
│   └── BaseLayout.astro  — Root layout (head, theme init, scroll bar, footer)
├── pages/
│   ├── index.astro       — Language-detection redirect (no-JS fallback: meta refresh)
│   ├── en/index.astro    — English home, composes all features
│   ├── es/index.astro    — Spanish home, composes all features
│   └── projects/[slug].astro  — Static project detail page
└── test/
```

**Key rules:**
- Features import from `../../shared/` but never from other features directly (except `metrics/data.ts` which reads `experience` and `skills` data to compute KPIs).
- `shared/` contains no business logic — only generic UI primitives and i18n.
- Data lives co-located with its feature (`features/*/data.ts`). To add content, edit the relevant `data.ts`.
- `features/metrics/data.private.ts` is never rendered in HTML; use it for internal analytics tracking.
- React components use `client:load` or `client:visible` directives for selective hydration. Avoid adding `client:*` to static-only components.
- Path alias `@/*` maps to `src/*`.

**i18n:** Routes duplicated under `src/pages/en/` and `src/pages/es/`. All UI strings live in `src/shared/i18n/translations.ts`. To add a new string, add the key to both `en` and `es` objects and the `UIKey` type updates automatically.

**Styling:** Tailwind CSS with class-based dark mode (`dark:` prefix). Custom animations defined in `tailwind.config.cjs`. Supports 320px–2560px viewports.

**Testing:** Vitest with jsdom + React Testing Library. Property-based tests use `fast-check`. Test files live in `src/test/`.
