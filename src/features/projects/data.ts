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
    slug: 'meet-talk',
    title: 'Meet-talk',
    description: {
      en: 'Meeting transcription product that turns recordings into Notion-ready notes, with a web app, Google Drive hub, Chrome extension and AI-powered processing pipeline.',
      es: 'Producto de transcripcion de reuniones que convierte grabaciones en notas listas para Notion, con app web, hub de Google Drive, extension de Chrome y pipeline con IA.',
    },
    longDescription:
      'Built a meeting transcription and productivity workflow with Next.js, React, TypeScript, OpenAI, Notion API, Google Drive integration and a Chrome extension. The system processes meeting audio, extracts transcription-ready content, supports Drive-based workflows, and generates structured notes designed to be moved into Notion.',
    thumbnail: '/images/projects/meet-talk-thumbnail.png',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'OpenAI',
      'Notion API',
      'Google Drive',
      'Chrome Extension',
      'Railway',
    ],
    categories: ['Web', 'AI', 'Productivity', 'Open Source'],
    liveUrl: 'https://meet-talk-production.up.railway.app/',
    repoUrl: 'https://github.com/develop-iro/meet-talk',
  },
  {
    slug: 'inversora-app',
    title: 'Inversora',
    description: {
      en: 'Intelligent dashboard for beginner investors to compare index funds through clear rankings, comparative cards, and AI-assisted financial education.',
      es: 'Dashboard inteligente para inversores principiantes que compara fondos indexados con rankings claros, tarjetas comparativas y educacion financiera asistida por IA.',
    },
    longDescription:
      'Built a full-stack fintech education product for comparing index funds. The mobile-first app uses Expo, React Native, Expo Router, NativeWind, Zustand and Zod, backed by a NestJS API with PostgreSQL, Prisma, scheduled fund-data sync jobs, scoring logic and OpenAI-powered educational assistance.',
    thumbnail: '/images/projects/inversora-thumbnail-v3.png',
    techStack: [
      'Expo',
      'React Native',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'OpenAI',
    ],
    categories: ['Mobile', 'AI', 'Fintech', 'Open Source'],
    liveUrl: 'https://inversora--inversora.expo.app/',
    repoUrl: 'https://github.com/develop-iro/inversora-app',
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
    liveUrl: 'https://luminous-valkyrie-8b266e.netlify.app/#',
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
];
