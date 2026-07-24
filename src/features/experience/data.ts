export interface Experience {
  company: string;
  url: string;
  title: { en: string; es: string };
  startDate: string;
  endDate?: string;
  responsibilities: { en: string[]; es: string[] };
}

export const experience: Experience[] = [
  {
    company: 'BBVA Technology',
    url: 'https://www.bbvatechnology.com/',
    title: {
      en: 'Senior Frontend Developer & Software Architect',
      es: 'Senior Frontend Developer & Software Architect',
    },
    startDate: '2024-05',
    responsibilities: {
      en: [
        'Develop frontend interfaces with React 18+ and TypeScript 5+ using modular architecture and reusable components.',
        'Define cross-cutting frontend pieces using hexagonal architecture, SOLID and Clean Code principles to improve integration, testability and maintainability.',
        'Lead AI-assisted migration automation with agents, orchestration and Spec Driven Development, integrating scaffolding, Storybook and testing workflows.',
        'Modernise Ember/HBS components into Lit and Web Components while protecting legacy behaviour through technical validation.',
        'Apply QUnit, Vitest, Sinon and Playwright to prevent regressions across critical journeys.',
        'Optimise Lit properties, directives and lifecycle work to avoid unnecessary processing.',
        'Validate accessibility with axe, accessibility tree inspection, VoiceOver and TalkBack across web, iOS and Android.',
        'Act as a technical reference through code review, ESLint rules, mentoring and onboarding.',
      ],
      es: [
        'Desarrollo interfaces frontend con React 18+ y TypeScript 5+ mediante arquitectura modular y componentes reutilizables.',
        'Defino piezas transversales con criterios de arquitectura hexagonal, SOLID y Clean Code para mejorar integracion, testabilidad y mantenimiento.',
        'Lidero automatizacion de migraciones mediante IA, agentes, orquestacion y Spec Driven Development, integrando scaffolding, Storybook y testing.',
        'Modernizo componentes Ember/HBS hacia Lit y Web Components protegiendo el comportamiento legacy mediante validaciones tecnicas.',
        'Aplico QUnit, Vitest, Sinon y Playwright para prevenir regresiones en flujos criticos.',
        'Optimizo propiedades, directivas y lifecycle de Lit para evitar procesamiento innecesario.',
        'Valido accesibilidad con axe, accessibility tree, VoiceOver y TalkBack en web, iOS y Android.',
        'Actuo como referente tecnico mediante code review, reglas ESLint, mentoring y onboarding.',
      ],
    },
  },
  {
    company: 'BBVA',
    url: 'https://www.bbva.com/',
    title: { en: 'Senior Frontend Developer', es: 'Senior Frontend Developer' },
    startDate: '2023-03',
    endDate: '2024-05',
    responsibilities: {
      en: [
        'Developed interfaces with React 18+ and TypeScript 5+ through reusable components.',
        'Integrated REST APIs and managed UI state with modular architecture, SOLID principles and code quality standards.',
        'Worked in hybrid banking environments with AWS, Jenkins, Bamboo, Lerna and Bash-based tooling.',
      ],
      es: [
        'Desarrolle interfaces con React 18+ y TypeScript 5+ mediante componentes reutilizables.',
        'Integre APIs REST y gestione estado de interfaz con arquitectura modular, principios SOLID y criterios de calidad.',
        'Trabaje en entornos bancarios hibridos con AWS, Jenkins, Bamboo, Lerna y tooling basado en Bash.',
      ],
    },
  },
  {
    company: 'Minsait',
    url: 'https://www.minsait.com/es',
    title: { en: 'Full Stack Developer', es: 'Full Stack Developer' },
    startDate: '2022-06',
    endDate: '2023-03',
    responsibilities: {
      en: [
        'Developed full-stack features with React, TypeScript and Node.js, integrating interfaces and APIs end to end.',
        'Modernised components through the Ember Classic to Ember Octane/Glimmer migration, reducing dependency on legacy patterns.',
        'Wrote end-to-end tests with Cucumber and WebDriver, and unit tests with QUnit and Sinon.',
      ],
      es: [
        'Desarrolle funcionalidades full stack con React, TypeScript y Node.js, integrando interfaces y APIs de extremo a extremo.',
        'Modernice componentes mediante la migracion Ember Classic a Ember Octane/Glimmer, reduciendo dependencia de patrones legacy.',
        'Escribi tests end-to-end con Cucumber y WebDriver, y tests unitarios con QUnit y Sinon.',
      ],
    },
  },
];
