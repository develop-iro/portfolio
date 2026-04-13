# ivan-romero.dev — Personal Portfolio

Source code for my personal portfolio and resume site, built with Astro and deployed on Vercel.

**Live:** [ivan-romero.dev](https://ivan-romero.dev)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 4](https://astro.build) — static output |
| UI islands | [React 18](https://react.dev) — interactive components only |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) + class-based dark mode |
| Contact form | [EmailJS](https://emailjs.com) — client-side, no backend required |
| Analytics | Vercel Analytics + Speed Insights |
| Testing | Vitest + React Testing Library + fast-check |
| Deployment | [Vercel](https://vercel.com) |

---

## Features

- **Bilingual (EN / ES)** — full i18n with separate routes (`/en/`, `/es/`) and auto language detection on first visit
- **Dark / light mode** — persisted in `localStorage`, no flash on load
- **Printable resume** — `/en/resume` and `/es/resume` with a dedicated print stylesheet
- **Project filtering** — client-side filter by tech stack with animated cards
- **Accessible** — skip-to-content link, `prefers-reduced-motion` support, ARIA labels, keyboard-navigable modal
- **SEO** — canonical URLs, Open Graph, Twitter Card, hreflang alternates, JSON-LD Person schema, auto-generated sitemap
- **Security headers** — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy via `vercel.json`
- **Custom cursor** — desktop only, hidden on touch/pointer-coarse devices

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
git clone https://github.com/develop-iro/portfolio.git
cd portfolio
npm install
```

### Environment variables

```bash
cp .env.example .env
```

Fill in your [EmailJS](https://emailjs.com) credentials:

```
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These are `PUBLIC_*` Astro variables — intentionally exposed to the browser (EmailJS is designed for client-side use).

### Develop

```bash
npm run dev        # http://localhost:4321
```

The root `/` route detects browser language and redirects to `/en/` or `/es/`.

### Build & preview

```bash
npm run build      # Outputs static files to dist/
npm run preview    # Serves dist/ locally
```

---

## Project Structure

```
src/
├── features/        # One folder per domain (hero, about, skills, projects, experience, resume, contact)
├── shared/
│   ├── i18n/        # translations.ts — all UI strings, both languages
│   └── ui/          # Generic components (Nav, Footer, ThemeToggle, HamburgerMenu…)
├── layouts/
│   └── BaseLayout.astro   # Head (SEO meta, JSON-LD), skip link, theme init, footer
└── pages/
    ├── index.astro          # Language redirect
    ├── en/                  # English routes
    ├── es/                  # Spanish routes
    └── projects/[slug].astro
```

See [CLAUDE.md](CLAUDE.md) for the full architectural reference, content update guide, and deployment notes.

---

## Updating Content

| What | Where |
|------|-------|
| Work experience | `src/features/experience/data.ts` |
| Projects | `src/features/projects/data.ts` |
| Skills | `src/features/skills/data.ts` |
| UI strings (any language) | `src/shared/i18n/translations.ts` |
| Resume PDF | Replace `public/resume.pdf` |
| Profile photo | Replace `public/images/profile.jpeg` |

---

## Deployment

Deployed automatically via Vercel on every push to `main`. Preview deployments are created for all other branches.

Set the three `PUBLIC_EMAILJS_*` variables in **Vercel → Project → Settings → Environment Variables**.

---

## License

The **source code** is available under the [MIT License](LICENSE).
The **content** (text, images, personal data) is © Ivan Romero Matallana — all rights reserved.
