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
    slug: 'bbva-web-components-library',
    title: 'BBVA Web Components Library',
    description: {
      en: 'Core UI component library built with Lit (Web Components) as part of the migration from Ember.js to a framework-agnostic architecture powering a hybrid banking app with 100+ features.',
      es: 'Biblioteca de componentes de interfaz principal construida con Lit (Web Components) como parte de la migración de Ember.js a una arquitectura agnóstica de framework que impulsa una app bancaria híbrida con más de 100 funcionalidades.',
    },
    longDescription:
      "Led the architecture and development of a large-scale Web Components library using Lit, enabling a seamless migration from Ember.js. The library serves millions of users across BBVA's digital banking platform, with a focus on performance, accessibility, and design-system consistency. Includes comprehensive Storybook documentation and QUnit/Sinon test coverage.",
    thumbnail: '/images/projects/bbva-web-components.svg',
    techStack: ['Web Components', 'Lit', 'TypeScript', 'Storybook', 'QUnit', 'Sinon', 'SCSS'],
    categories: ['Frontend Architecture', 'Web Components'],
    repoUrl: undefined,
  },
  {
    slug: 'ember-octane-migration',
    title: 'Ember Classic → Octane Migration',
    description: {
      en: 'Progressive migration of a production PWA from Ember Classic to Ember Octane, adopting Glimmer components, tracked properties, and native classes to modernise the codebase.',
      es: 'Migración progresiva de una PWA en producción de Ember Classic a Ember Octane, adoptando componentes Glimmer, propiedades tracked y clases nativas para modernizar el código base.',
    },
    longDescription:
      'Planned and executed a phased migration of a large Ember.js PWA from the Classic programming model to Ember Octane at Minsait. The migration introduced Glimmer components, @tracked state, and native ES classes, significantly reducing boilerplate and improving rendering performance. Included updating the test suite from QUnit classic patterns to modern Ember testing conventions.',
    thumbnail: '/images/projects/ember-octane.svg',
    techStack: ['Ember.js', 'Glimmer', 'TypeScript', 'JavaScript', 'QUnit', 'Cucumber', 'WebDriver'],
    categories: ['Frontend Architecture', 'PWA'],
  },
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
    techStack: ['React', 'TypeScript', 'Axios', 'i18next', 'Vitest', 'React Testing Library', 'Vite'],
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
