# Design Document: Portfolio Website

## Overview

A personal portfolio website built with the Astro framework, statically generated at build time and deployable to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.). The site presents the developer's identity, skills, projects, and experience to potential employers, clients, and collaborators.

Key design goals:
- Near-zero JavaScript by default; client-side JS only where interactivity is required (partial hydration)
- Dark/light mode with `localStorage` persistence and `prefers-color-scheme` fallback
- Project filtering by category (client-side, no server required)
- Contact form delivered via EmailJS client-side SDK
- Lighthouse Performance ≥ 90 on desktop
- WCAG AA color contrast (4.5:1 normal text, 3:1 large text)

---

## Architecture

The site is a single Astro project with a file-based routing structure. All pages are statically generated (`output: 'static'`). Interactive islands (theme toggle, hamburger menu, project filter, contact form) are hydrated with `client:load` or `client:visible` directives.

```
┌─────────────────────────────────────────────────────┐
│                    Build Time (Astro SSG)            │
│  src/pages/index.astro  ──►  dist/index.html         │
│  src/pages/projects/[slug].astro ──► dist/projects/  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  Runtime (Browser)                   │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ ThemeToggle  │  │ HamburgerMenu│  (client:load)  │
│  └──────────────┘  └──────────────┘                 │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ProjectFilter │  │ ContactForm  │  (client:load)  │
│  └──────────────┘  └──────────────┘                 │
│                                                      │
│  EmailJS SDK (loaded only on Contact section)        │
└─────────────────────────────────────────────────────┘
```

### Theme Strategy

Theme state is managed via a CSS class on `<html>` (`class="dark"`). An inline `<script>` in `<head>` reads `localStorage` (or `prefers-color-scheme`) before first paint to avoid flash of wrong theme (FOWT). Tailwind CSS drives the color tokens using its `darkMode: 'class'` strategy — when the `dark` class is present on `<html>`, all `dark:` variant utilities activate.

```
Page Load
  └─► inline script reads localStorage["theme"]
        ├─ found  → apply class to <html>
        └─ not found → read prefers-color-scheme → apply class
```

### Project Filtering Strategy

All project data is embedded in the static HTML as JSON in a `<script type="application/json">` tag. The `ProjectFilter` island reads this data, maintains a `selectedCategory` state, and re-renders the visible cards — no network request needed.

---

## Components and Interfaces

### Page Layout

```
BaseLayout.astro
  ├── <head> (meta, fonts, inline theme script)
  ├── Nav.astro
  │     ├── NavLinks (static)
  │     ├── ThemeToggle (island, client:load)
  │     └── HamburgerMenu (island, client:load)
  ├── <main>
  │     ├── HeroSection.astro
  │     ├── AboutSection.astro
  │     ├── SkillsSection.astro
  │     ├── ProjectsSection.astro
  │     │     └── ProjectFilter (island, client:load)
  │     ├── ExperienceSection.astro
  │     └── ContactSection.astro
  │           └── ContactForm (island, client:load)
  └── Footer.astro
```

### Component Interfaces

#### ThemeToggle (React island)
```ts
// No props — reads/writes localStorage and toggles <html> class
interface ThemeToggleProps {}
```

#### HamburgerMenu (React island)
```ts
interface HamburgerMenuProps {
  links: { label: string; href: string }[];
}
```

#### ProjectFilter (React island)
```ts
interface ProjectFilterProps {
  projects: Project[];
  categories: string[];
}
```

#### ContactForm (React island)
```ts
interface ContactFormProps {
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
}
```

#### ProjectCard (static Astro component)
```ts
interface ProjectCardProps {
  project: Project;
}
```

---

## Data Models

All content is authored as TypeScript objects in `src/data/` and imported at build time. No CMS or database is required.

### Project

```ts
interface Project {
  slug: string;           // URL-safe identifier, e.g. "my-app"
  title: string;
  description: string;   // Short summary shown on card
  longDescription?: string; // Shown on detail page
  thumbnail: string;     // Path to image asset
  techStack: string[];   // e.g. ["React", "TypeScript", "Postgres"]
  categories: string[];  // e.g. ["Web", "Open Source"]
  liveUrl?: string;      // Optional live demo link
  repoUrl?: string;      // Optional source code link
}
```

### Skill

```ts
interface Skill {
  name: string;
  category: string;      // e.g. "Languages", "Frameworks", "Tools"
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}
```

### Experience

```ts
interface Experience {
  company: string;
  title: string;
  startDate: string;     // ISO 8601 date string, e.g. "2021-06"
  endDate?: string;      // Omit for current position
  responsibilities: string[];
}
```

### ContactFormState (client-side only)

```ts
interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
```

### Theme

```ts
type Theme = 'light' | 'dark';
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Hero section renders all identity fields

*For any* developer profile with a name, professional title, and tagline, the rendered Hero section output SHALL contain all three values.

**Validates: Requirements 1.1**

---

### Property 2: Skills are grouped by category

*For any* array of skill objects with varying category values, the rendered Skills section SHALL group skills such that every skill appears under its declared category and no skill appears under a different category.

**Validates: Requirements 5.1**

---

### Property 3: Skill label and optional proficiency are rendered

*For any* skill object, the rendered output SHALL always contain the skill's name; and when a proficiency value is present, the rendered output SHALL also contain that proficiency indicator.

**Validates: Requirements 5.2**

---

### Property 4: Project card count matches project data

*For any* non-empty array of projects, the rendered Projects section SHALL contain exactly as many Project_Cards as there are projects in the input array.

**Validates: Requirements 6.1**

---

### Property 5: Project card displays all required fields

*For any* project object, the rendered Project_Card SHALL contain the project's title, description, each technology in the tech stack, and a thumbnail image.

**Validates: Requirements 6.2**

---

### Property 6: Every project has at least one category

*For any* project in the data array, the `categories` field SHALL contain at least one value.

**Validates: Requirements 6.3**

---

### Property 7: Filter controls list all unique categories

*For any* array of projects with varying category assignments, the rendered filter controls SHALL display exactly the set of unique category values present across all projects (plus an "All" option).

**Validates: Requirements 6.4**

---

### Property 8: Category filter shows only matching cards; All shows all cards

*For any* array of projects and any selected category, the ProjectFilter component SHALL display only Project_Cards whose `categories` array includes the selected category. When the "All" filter is selected, all Project_Cards SHALL be visible regardless of category.

**Validates: Requirements 6.5, 6.6**

---

### Property 9: Optional project links appear if and only if the URL is present

*For any* project object, a live demo link SHALL appear in the rendered Project_Card if and only if `liveUrl` is defined; a repository link SHALL appear if and only if `repoUrl` is defined.

**Validates: Requirements 6.8, 6.9**

---

### Property 10: Experience entries are rendered in reverse chronological order

*For any* array of experience entries with varying start dates, the rendered Experience section SHALL display entries ordered from most recent to oldest based on `startDate`.

**Validates: Requirements 7.1**

---

### Property 11: Experience entry displays all required fields

*For any* experience entry object, the rendered entry SHALL contain the company name, job title, employment dates, and all responsibility strings.

**Validates: Requirements 7.2**

---

### Property 12: Contact form validation rejects empty required fields

*For any* submission attempt where one or more of the name, email, or message fields is empty, the ContactForm SHALL display an inline validation error for each empty field and SHALL NOT call the Email_Service.

**Validates: Requirements 8.3**

---

### Property 13: Contact form validation rejects invalid email formats

*For any* string that does not conform to a valid email address format, submitting the ContactForm with that value in the email field SHALL display a validation error on the email field.

**Validates: Requirements 8.4**

---

### Property 14: Theme toggle switches between light and dark

*For any* current theme state (light or dark), activating the Theme_Toggle SHALL switch the `<html>` element's theme class to the opposite theme.

**Validates: Requirements 9.2**

---

### Property 15: Theme persistence round-trip

*For any* theme value selected via the Theme_Toggle, that value SHALL be written to `localStorage["theme"]`; and when the theme initialization script runs subsequently, it SHALL read that value and apply the matching theme class to `<html>` — restoring the same theme across page loads.

**Validates: Requirements 9.3, 9.4**

---

### Property 16: OS preference fallback when no persisted theme exists

*For any* `prefers-color-scheme` value (light or dark) and an empty `localStorage`, the theme initialization script SHALL apply the theme class that matches the OS preference.

**Validates: Requirements 9.5**

---

### Property 17: Below-fold images have lazy loading attribute

*For any* image element that is not within the initial viewport, the rendered HTML SHALL include `loading="lazy"` on that `<img>` element.

**Validates: Requirements 11.2**

---

### Property 18: Non-decorative images have non-empty alt text

*For any* non-decorative image rendered on the page (project thumbnails, profile photo, etc.), the `<img>` element SHALL have a non-empty `alt` attribute.

**Validates: Requirements 12.1**

---

### Property 19: Semantic HTML structure is present

*For any* rendered page, the HTML output SHALL contain at least one each of `<header>`, `<nav>`, `<main>`, `<footer>`, and multiple `<section>` elements corresponding to the site's content sections.

**Validates: Requirements 12.4**

---

## Error Handling

### Contact Form Errors

| Scenario | Behavior |
|---|---|
| Empty required field on submit | Inline error message below the field; form not submitted |
| Invalid email format | Inline error on email field; form not submitted |
| EmailJS network/API error | Toast or inline error: "Something went wrong. Please try again." |
| EmailJS success | Success message shown; all fields reset to empty |

### Theme Initialization Errors

| Scenario | Behavior |
|---|---|
| `localStorage` unavailable (private browsing) | Silently fall back to `prefers-color-scheme`; wrap in try/catch |
| Invalid value in `localStorage["theme"]` | Treat as missing; apply OS preference |

### Image Loading Errors

| Scenario | Behavior |
|---|---|
| Thumbnail fails to load | CSS `object-fit` fallback color or placeholder shown via `onerror` handler |

### Build-Time Errors

| Scenario | Behavior |
|---|---|
| Missing required project field | TypeScript compile error at build time (strict types on data files) |
| Invalid slug (duplicate or special chars) | Astro build fails with descriptive error |

---

## Testing Strategy

### Overview

This project uses a dual testing approach:
- **Unit / component tests** for specific examples, edge cases, and error conditions
- **Property-based tests** for universal properties across all inputs

Property-based testing is appropriate here because the core logic (filtering, sorting, rendering, theme management, form validation) consists of pure or near-pure functions whose correctness should hold across a wide input space.

**PBT Library**: [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, works with Vitest)

**Test Runner**: Vitest

**Component Testing**: @testing-library/react (for React islands) + Astro's built-in component testing utilities

### Property-Based Tests

Each property test runs a minimum of **100 iterations** via fast-check's `fc.assert(fc.property(...))`.

Each test is tagged with a comment in the format:
`// Feature: portfolio-website, Property N: <property text>`

| Property | Test Description | fast-check Arbitraries |
|---|---|---|
| P1 | Hero renders name/title/tagline | `fc.string()` × 3 |
| P2 | Skills grouped by category | `fc.array(fc.record({name, category}))` |
| P3 | Skill label + optional proficiency | `fc.record({name, proficiency: fc.option(...)})` |
| P4 | Card count matches project array | `fc.array(projectArb, {minLength: 1})` |
| P5 | Card displays all required fields | `projectArb` |
| P6 | Every project has ≥1 category | `projectArb` |
| P7 | Filter controls list all unique categories | `fc.array(projectArb)` |
| P8 | Category filter / All filter | `fc.array(projectArb)` + `fc.constantFrom(...categories)` |
| P9 | Optional links iff URL present | `projectArb` with optional liveUrl/repoUrl |
| P10 | Experience reverse chronological order | `fc.array(experienceArb, {minLength: 2})` |
| P11 | Experience entry fields | `experienceArb` |
| P12 | Form rejects empty fields | `fc.subarray(['name','email','message'])` |
| P13 | Form rejects invalid email | `fc.string()` filtered to non-email patterns |
| P14 | Theme toggle switches theme | `fc.constantFrom('light', 'dark')` |
| P15 | Theme persistence round-trip | `fc.constantFrom('light', 'dark')` |
| P16 | OS preference fallback | `fc.constantFrom('light', 'dark')` |
| P17 | Below-fold images have lazy loading | `fc.array(imageArb)` |
| P18 | Non-decorative images have alt text | `fc.array(imageArb)` |
| P19 | Semantic HTML structure | rendered page HTML |

### Unit / Example-Based Tests

- Nav renders all five section links
- Hamburger menu toggles visibility of nav links
- ContactForm shows success message and resets fields on successful EmailJS mock
- ContactForm shows error message on EmailJS failure mock
- ProjectCard renders a link to `/projects/[slug]`
- ThemeToggle is visible in Nav at all viewport sizes
- About section contains resume download link and external profile links

### Integration Tests

- EmailJS SDK integration: mock SDK, submit valid form, verify `emailjs.send` called with correct service/template/key
- Lighthouse CI: run against production build, assert Performance ≥ 90
- LCP ≤ 2.5s: verified via Lighthouse CI `lcp` metric

### Smoke Tests

- `astro` present in `package.json` dependencies
- `astro.config` has `output: 'static'`
- Interactive islands use `client:` directives
- axe-core accessibility audit passes in both light and dark themes (contrast ratio ≥ 4.5:1)
- CSS uses relative units (rem, %, vw) — no px-only fluid layout values
