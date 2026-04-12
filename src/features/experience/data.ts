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
    title: { en: 'Frontend Engineer', es: 'Ingeniero Frontend' },
    startDate: '2023-03',
    responsibilities: {
      en: [
        'Active contributor to the team-wide migration from Ember.js to Web Components (Lit) in a hybrid banking app serving millions of users across 100+ features.',
        'Applied AI tools and models (GitHub Copilot, Cursor, Codex) to automate component migration, code generation, and repetitive refactoring tasks.',
        'Built and maintained reusable, accessible UI components with full Storybook documentation and QUnit/Sinon test coverage.',
        'Contributed to performance optimisation initiatives, reducing bundle size and improving Lighthouse scores across key user journeys.',
        'Maintained critical authentication and service-communication flows (OAuth, REST API integration).',
        'Conducted blocking code reviews, enforced coding standards via custom ESLint rules, and mentored junior and mid-level engineers.',
        'Resolved mobile-specific incidents and lifecycle issues in the hybrid application.',
        'Worked in an agile Kanban environment using Jira, Bitbucket, and Bamboo CI/CD.',
      ],
      es: [
        'Contribuidor activo a la migración en equipo de Ember.js a Web Components (Lit) en una app bancaria híbrida con millones de usuarios y más de 100 funcionalidades.',
        'Aplicamos herramientas y modelos de IA (GitHub Copilot, Cursor, Codex) para automatizar la migración de componentes, generación de código y tareas de refactoring repetitivas.',
        'Construí y mantuve componentes de interfaz reutilizables y accesibles con documentación completa en Storybook y cobertura de tests con QUnit/Sinon.',
        'Contribuí a iniciativas de optimización del rendimiento, reduciendo el tamaño del bundle y mejorando las puntuaciones de Lighthouse en los principales flujos de usuario.',
        'Mantuve flujos críticos de autenticación y comunicación con servicios (OAuth, integración REST API).',
        'Realicé revisiones de código bloqueantes, apliqué estándares mediante reglas ESLint personalizadas y mentoriçé a ingenieros junior y de nivel medio.',
        'Resolví incidencias específicas de móvil y problemas de ciclo de vida en la aplicación híbrida.',
        'Trabajé en entorno ágil Kanban utilizando Jira, Bitbucket y Bamboo CI/CD.',
      ],
    },
  },
  {
    company: 'Minsait',
    url: 'https://www.minsait.com/es',
    title: { en: 'Frontend Developer', es: 'Desarrollador Frontend' },
    startDate: '2022-06',
    endDate: '2023-03',
    responsibilities: {
      en: [
        'Developed and maintained a production Progressive Web App (PWA) built with Ember.js.',
        'Executed the migration from Ember Classic to Ember Octane, adopting Glimmer components, tracked properties, and native ES classes.',
        'Wrote end-to-end tests using Cucumber and WebDriver, and unit tests with QUnit and Sinon.',
        'Collaborated with design and backend teams to deliver new features on schedule.',
      ],
      es: [
        'Desarrollé y mantuve una Progressive Web App (PWA) en producción construida con Ember.js.',
        'Ejecuté la migración de Ember Classic a Ember Octane, adoptando componentes Glimmer, propiedades tracked y clases nativas de ES.',
        'Escribí tests end-to-end con Cucumber y WebDriver, y tests unitarios con QUnit y Sinon.',
        'Colaboré con los equipos de diseño y backend para entregar nuevas funcionalidades en plazo.',
      ],
    },
  },
];
