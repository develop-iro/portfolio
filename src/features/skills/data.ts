export interface Skill {
  name: string;
  category: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React 18+', category: 'Frontend', proficiency: 'expert' },
  { name: 'TypeScript 5+', category: 'Frontend', proficiency: 'expert' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'expert' },
  { name: 'Web Components (Lit)', category: 'Frontend', proficiency: 'expert' },
  { name: 'Ember.js / Glimmer', category: 'Frontend', proficiency: 'expert' },
  { name: 'Angular 18+', category: 'Frontend', proficiency: 'advanced' },
  { name: 'Astro', category: 'Frontend', proficiency: 'advanced' },
  { name: 'HTML5', category: 'Frontend', proficiency: 'advanced' },
  { name: 'SCSS', category: 'Frontend', proficiency: 'advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'advanced' },

  // AI & Emerging Technologies
  { name: 'AI Agents', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Migration Automation', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Spec Driven Development', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'LLMs', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Prompt Engineering', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'GitHub Copilot', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Cursor', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'OpenAI Codex', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Claude', category: 'AI & Emerging Technologies', proficiency: 'advanced' },

  // Architecture & Quality
  { name: 'Frontend Architecture', category: 'Architecture & Quality', proficiency: 'expert' },
  { name: 'Component-based Architecture', category: 'Architecture & Quality', proficiency: 'expert' },
  { name: 'Code Review', category: 'Architecture & Quality', proficiency: 'expert' },
  { name: 'Hexagonal Architecture', category: 'Architecture & Quality', proficiency: 'advanced' },
  { name: 'SOLID', category: 'Architecture & Quality', proficiency: 'advanced' },
  { name: 'Clean Code', category: 'Architecture & Quality', proficiency: 'advanced' },
  { name: 'Design Systems', category: 'Architecture & Quality', proficiency: 'advanced' },
  { name: 'Mentoring', category: 'Architecture & Quality', proficiency: 'advanced' },

  // Tooling & Testing
  { name: 'Vite', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Vitest', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Playwright', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Storybook', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'QUnit', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Sinon', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Testing Pyramid', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Cucumber', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'WebDriver', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'ESLint', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Jenkins', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Bamboo', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Lerna', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Git', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Bitbucket', category: 'Tooling & Testing', proficiency: 'advanced' },

  // Accessibility & Performance
  { name: 'axe', category: 'Accessibility & Performance', proficiency: 'advanced' },
  { name: 'Accessibility Tree', category: 'Accessibility & Performance', proficiency: 'advanced' },
  { name: 'VoiceOver', category: 'Accessibility & Performance', proficiency: 'advanced' },
  { name: 'TalkBack', category: 'Accessibility & Performance', proficiency: 'advanced' },
  { name: 'Rendering Lifecycle', category: 'Accessibility & Performance', proficiency: 'advanced' },

  // Backend & Data
  { name: 'REST APIs', category: 'Backend & Data', proficiency: 'advanced' },
  { name: 'Node.js 20+', category: 'Backend & Data', proficiency: 'advanced' },
  { name: 'AWS', category: 'Backend & Data', proficiency: 'intermediate' },
  { name: 'Bash', category: 'Backend & Data', proficiency: 'advanced' },
  { name: 'SQL', category: 'Backend & Data', proficiency: 'intermediate' },
  { name: 'NoSQL', category: 'Backend & Data', proficiency: 'intermediate' },
];
