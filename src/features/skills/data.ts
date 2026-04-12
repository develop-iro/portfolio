export interface Skill {
  name: string;
  category: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'expert' },
  { name: 'Web Components (Lit)', category: 'Frontend', proficiency: 'expert' },
  { name: 'Ember.js', category: 'Frontend', proficiency: 'expert' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 'intermediate' },
  { name: 'Astro', category: 'Frontend', proficiency: 'advanced' },
  { name: 'React', category: 'Frontend', proficiency: 'advanced' },
  { name: 'HTML5', category: 'Frontend', proficiency: 'advanced' },
  { name: 'SCSS', category: 'Frontend', proficiency: 'advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'advanced' },

  // AI & Emerging Technologies
  { name: 'LLMs', category: 'AI & Emerging Technologies', proficiency: 'intermediate' },
  { name: 'Prompt Engineering', category: 'AI & Emerging Technologies', proficiency: 'intermediate' },
  { name: 'AI Agents', category: 'AI & Emerging Technologies', proficiency: 'intermediate' },
  { name: 'GitHub Copilot', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'Cursor', category: 'AI & Emerging Technologies', proficiency: 'advanced' },
  { name: 'OpenAI Codex', category: 'AI & Emerging Technologies', proficiency: 'intermediate' },
  { name: 'Claude', category: 'AI & Emerging Technologies', proficiency: 'intermediate' },

  // Architecture & Patterns
  { name: 'Component-based Architecture', category: 'Architecture & Patterns', proficiency: 'advanced' },
  { name: 'Design Patterns', category: 'Architecture & Patterns', proficiency: 'advanced' },
  { name: 'State Management', category: 'Architecture & Patterns', proficiency: 'advanced' },
  { name: 'OOP', category: 'Architecture & Patterns', proficiency: 'advanced' },

  // Tooling & Testing
  { name: 'Vite', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Vitest', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Storybook', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'QUnit', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Sinon', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Cucumber', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'WebDriver', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'ESLint', category: 'Tooling & Testing', proficiency: 'advanced' },
  { name: 'Git', category: 'Tooling & Testing', proficiency: 'advanced' },

  // Backend & Data
  { name: 'REST APIs', category: 'Backend & Data', proficiency: 'intermediate' },
  { name: 'Node.js', category: 'Backend & Data', proficiency: 'intermediate' },
  { name: 'SQL', category: 'Backend & Data', proficiency: 'intermediate' },
  { name: 'NoSQL', category: 'Backend & Data', proficiency: 'intermediate' },
];
