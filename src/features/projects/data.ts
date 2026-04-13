export interface Project {
  slug: string;
  title: string;
  description: { en: string; es: string };
  longDescription?: string;
  thumbnail: string;
  techStack: string[];
  categories: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'lexis-website',
    title: 'Lexis — Accounting Firm Website',
    description: {
      en: 'Professional website for an accounting and consulting firm, featuring animated sections, an interactive Leaflet map, and Astro Content Collections for service management.',
      es: 'Sitio web profesional para una firma de contabilidad y consultoría, con secciones animadas, mapa interactivo con Leaflet y Astro Content Collections para la gestión de servicios.',
    },
    longDescription:
      'Built a full-featured marketing website for a professional accounting firm using Astro and React. The site uses Framer Motion for scroll-triggered animations, Leaflet for an interactive office location map, Tailwind CSS for styling, and Astro Content Collections to manage the services catalogue without a CMS. Optimised for performance with image preloading and static generation.',
    thumbnail: '/images/projects/lexis.svg',
    techStack: ['Astro', 'React', 'Tailwind CSS', 'Framer Motion', 'Leaflet', 'TypeScript'],
    categories: ['Web', 'Open Source'],
    repoUrl: 'https://github.com/develop-iro/lexis',
  },
  {
    slug: 'gifs-app',
    title: 'GIFs Search App',
    description: {
      en: 'React 19 search app with full i18n (EN/ES), custom hooks, Axios API integration, and test coverage across components using Vitest and React Testing Library.',
      es: 'App de búsqueda en React 19 con i18n completo (EN/ES), custom hooks, integración de API con Axios y cobertura de tests con Vitest y React Testing Library.',
    },
    longDescription:
      'A GIF search application built with React 19 and TypeScript that integrates with an external GIFs API via Axios. Features full internationalisation (EN/ES) with i18next, previous-search history, custom hooks for data fetching and state management, and a test suite covering SearchInput, Header and PreviousSearches components with Vitest and React Testing Library.',
    thumbnail: '/images/projects/gifs-app.svg',
    techStack: [
      'React',
      'TypeScript',
      'Axios',
      'i18next',
      'Vitest',
      'React Testing Library',
      'Vite',
    ],
    categories: ['Web', 'Open Source'],
    repoUrl: 'https://github.com/develop-iro/ReactReview/tree/main/01-gifs-app',
  },
  {
    slug: 'portfolio-website',
    title: 'Personal Portfolio — iro.dev',
    description: {
      en: 'This portfolio site — a statically generated Astro application with React islands, Tailwind CSS dark mode, project filtering, and an EmailJS contact form.',
      es: 'Este portfolio — una aplicación Astro de generación estática con React islands, modo oscuro con Tailwind CSS, filtrado de proyectos y formulario de contacto con EmailJS.',
    },
    longDescription:
      "Designed and built from scratch using Astro's partial hydration model to ship near-zero JavaScript by default. Features include dark/light mode with localStorage persistence, client-side project filtering, a validated contact form powered by EmailJS, and a fully responsive layout tested across 320 px–2560 px viewports.",
    thumbnail: '/images/projects/portfolio.svg',
    techStack: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'EmailJS', 'Vitest', 'fast-check'],
    categories: ['Web', 'Open Source'],
    liveUrl: 'https://ivanromero.dev',
    repoUrl: 'https://github.com/develop-iro',
  },
];
