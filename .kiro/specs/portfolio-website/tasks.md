# Implementation Plan: Portfolio Website

## Overview

Incremental build of the Astro + React + Tailwind CSS portfolio site. Each task produces working, integrated code — no orphaned components. Islands are wired in as they are built.

## Tasks

- [x] 1. Project scaffolding and configuration
  - Run `npm create astro@latest` with the minimal template, then install `@astrojs/react`, `tailwindcss`, `@astrojs/tailwind`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `fast-check`
  - Configure `astro.config.mjs`: `output: 'static'`, add React and Tailwind integrations
  - Configure `tailwind.config.cjs`: set `darkMode: 'class'`, add `content` globs for `src/**`
  - Create `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts` with TypeScript interfaces (`Project`, `Skill`, `Experience`) and placeholder data arrays
  - Set up `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` setup file
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2. Base layout, theme initialization, and navigation
  - [x] 2.1 Create `BaseLayout.astro` with `<head>` meta tags, font links, and an inline `<script>` that reads `localStorage["theme"]` (with try/catch fallback) and applies the `dark` class to `<html>` before first paint
    - _Requirements: 9.4, 9.5_
  - [x] 2.2 Create `ThemeToggle.tsx` React island that reads the current `dark` class from `<html>`, toggles it, and writes the new value to `localStorage["theme"]`; wire into `BaseLayout` with `client:load`
    - _Requirements: 9.1, 9.2, 9.3_
  - [ ]* 2.3 Write property test for theme toggle (Property 14)
    - **Property 14: Theme toggle switches between light and dark**
    - **Validates: Requirements 9.2**
  - [ ]* 2.4 Write property test for theme persistence round-trip (Property 15)
    - **Property 15: Theme persistence round-trip**
    - **Validates: Requirements 9.3, 9.4**
  - [ ]* 2.5 Write property test for OS preference fallback (Property 16)
    - **Property 16: OS preference fallback when no persisted theme exists**
    - **Validates: Requirements 9.5**
  - [x] 2.6 Create `Nav.astro` with static section links (About, Skills, Projects, Experience, Contact), sticky positioning via Tailwind, and slot for `ThemeToggle`
    - _Requirements: 3.1, 3.3, 9.1_
  - [x] 2.7 Create `HamburgerMenu.tsx` React island that shows/hides a full-screen overlay of nav links on mobile (`< 768px`); wire into `Nav.astro` with `client:load`
    - _Requirements: 3.4, 3.5_
  - [ ]* 2.8 Write unit tests for `ThemeToggle` and `HamburgerMenu`
    - Test toggle visibility, overlay open/close, and keyboard accessibility
    - _Requirements: 3.4, 3.5, 9.1, 9.2_

- [x] 3. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [x] 4. Static content sections (Hero, About, Skills, Experience)
  - [x] 4.1 Create `HeroSection.astro` displaying name, professional title, tagline, profile photo (`loading="eager"`), and two CTA buttons (Projects anchor, Contact anchor)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 4.2 Write property test for Hero section rendering (Property 1)
    - **Property 1: Hero section renders all identity fields**
    - **Validates: Requirements 1.1**
  - [x] 4.3 Create `AboutSection.astro` with biography paragraph, resume download link, and external profile links (GitHub, LinkedIn)
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 4.4 Create `SkillsSection.astro` that imports `src/data/skills.ts`, groups skills by `category`, and renders each group in a responsive Tailwind grid
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ]* 4.5 Write property test for skills grouping (Property 2)
    - **Property 2: Skills are grouped by category**
    - **Validates: Requirements 5.1**
  - [ ]* 4.6 Write property test for skill label and proficiency rendering (Property 3)
    - **Property 3: Skill label and optional proficiency are rendered**
    - **Validates: Requirements 5.2**
  - [x] 4.7 Create `ExperienceSection.astro` that imports `src/data/experience.ts`, sorts entries by `startDate` descending, and renders a vertical timeline with company, title, dates, and responsibilities
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ]* 4.8 Write property test for experience reverse chronological order (Property 10)
    - **Property 10: Experience entries are rendered in reverse chronological order**
    - **Validates: Requirements 7.1**
  - [ ]* 4.9 Write property test for experience entry fields (Property 11)
    - **Property 11: Experience entry displays all required fields**
    - **Validates: Requirements 7.2**

- [x] 5. Projects section with filtering
  - [x] 5.1 Create `ProjectCard.astro` displaying title, description, tech stack badges, thumbnail (`loading="lazy"`), optional live demo link, optional repo link, and a link to `/projects/[slug]`
    - _Requirements: 6.2, 6.7, 6.8, 6.9, 11.2_
  - [ ]* 5.2 Write property test for project card required fields (Property 5)
    - **Property 5: Project card displays all required fields**
    - **Validates: Requirements 6.2**
  - [ ]* 5.3 Write property test for optional project links (Property 9)
    - **Property 9: Optional project links appear if and only if the URL is present**
    - **Validates: Requirements 6.8, 6.9**
  - [x] 5.4 Create `ProjectFilter.tsx` React island that accepts `projects` and `categories` props, maintains `selectedCategory` state, and renders filter buttons plus the filtered grid of `ProjectCard` components; embed project JSON in `ProjectsSection.astro` via `<script type="application/json">`
    - _Requirements: 6.1, 6.3, 6.4, 6.5, 6.6, 6.10_
  - [ ]* 5.5 Write property test for project card count (Property 4)
    - **Property 4: Project card count matches project data**
    - **Validates: Requirements 6.1**
  - [ ]* 5.6 Write property test for every project having at least one category (Property 6)
    - **Property 6: Every project has at least one category**
    - **Validates: Requirements 6.3**
  - [ ]* 5.7 Write property test for filter controls listing all unique categories (Property 7)
    - **Property 7: Filter controls list all unique categories**
    - **Validates: Requirements 6.4**
  - [ ]* 5.8 Write property test for category filter and All filter behavior (Property 8)
    - **Property 8: Category filter shows only matching cards; All shows all cards**
    - **Validates: Requirements 6.5, 6.6**
  - [x] 5.9 Create `src/pages/projects/[slug].astro` dynamic route that reads `src/data/projects.ts`, generates static paths, and renders the project detail page with `longDescription`, tech stack, and links
    - _Requirements: 6.7_

- [x] 6. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [x] 7. Contact section and EmailJS integration
  - [x] 7.1 Create `ContactForm.tsx` React island with name, email, and message fields; implement client-side validation (empty field check, email format regex) that shows inline errors without calling EmailJS
    - _Requirements: 8.1, 8.3, 8.4_
  - [ ]* 7.2 Write property test for form rejecting empty required fields (Property 12)
    - **Property 12: Contact form validation rejects empty required fields**
    - **Validates: Requirements 8.3**
  - [ ]* 7.3 Write property test for form rejecting invalid email formats (Property 13)
    - **Property 13: Contact form validation rejects invalid email formats**
    - **Validates: Requirements 8.4**
  - [x] 7.4 Wire EmailJS into `ContactForm.tsx`: on valid submission call `emailjs.send(serviceId, templateId, fields, publicKey)`, show success message and reset fields on resolve, show error message on reject; accept `emailjsServiceId`, `emailjsTemplateId`, `emailjsPublicKey` as props
    - _Requirements: 8.2, 8.5, 8.6_
  - [ ]* 7.5 Write unit tests for `ContactForm`
    - Mock EmailJS SDK; test success path (confirmation shown, fields reset) and error path (error message shown)
    - _Requirements: 8.2, 8.5, 8.6_
  - [x] 7.6 Create `ContactSection.astro` that passes EmailJS env vars (from `import.meta.env`) as props to `ContactForm` with `client:load`
    - _Requirements: 8.1, 8.2_

- [x] 8. Accessibility and image handling
  - [x] 8.1 Audit all `<img>` elements: add non-empty `alt` text to non-decorative images, add `aria-hidden="true"` to decorative images, confirm `loading="lazy"` on all below-fold images
    - _Requirements: 11.2, 12.1_
  - [ ]* 8.2 Write property test for non-decorative images having alt text (Property 18)
    - **Property 18: Non-decorative images have non-empty alt text**
    - **Validates: Requirements 12.1**
  - [ ]* 8.3 Write property test for below-fold images having lazy loading (Property 17)
    - **Property 17: Below-fold images have lazy loading attribute**
    - **Validates: Requirements 11.2**
  - [x] 8.4 Audit semantic HTML: ensure `<header>`, `<nav>`, `<main>`, `<footer>`, and per-section `<section>` elements are present; add `aria-label` attributes to landmark regions
    - _Requirements: 12.4_
  - [ ]* 8.5 Write property test for semantic HTML structure (Property 19)
    - **Property 19: Semantic HTML structure is present**
    - **Validates: Requirements 12.4**
  - [x] 8.6 Verify keyboard navigation: all interactive elements (links, buttons, form fields) are reachable and operable via Tab/Enter/Space; add `focus-visible` Tailwind ring styles where missing
    - _Requirements: 12.3_

- [x] 9. Responsive layout and touch targets
  - Audit all sections for correct reflow at 320px, 768px, and 1280px breakpoints using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
  - Ensure all tap targets (buttons, links, hamburger icon) are at least 44×44 CSS pixels on mobile
  - Confirm no horizontal scroll at any supported viewport width
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 10. Final checkpoint — ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations per `fc.assert`
- Unit/component tests use Vitest + `@testing-library/react`
- EmailJS credentials must be set as environment variables (`PUBLIC_EMAILJS_SERVICE_ID`, etc.) in `.env`
