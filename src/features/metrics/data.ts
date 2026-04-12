import { experience } from '../experience/data';
import { skills } from '../skills/data';

// ─── Types ───────────────────────────────────────────────────────────────────

export type KpiSource = 'static' | 'calculated' | 'external';

export interface PublicKpi {
  id: string;
  /** Numeric value uses CountUp animation; string value renders as-is */
  value: number | string;
  /** Appended to numeric values, e.g. "+" or "%" */
  unit?: string;
  label: { en: string; es: string };
  description?: { en: string; es: string };
  /** Heroicons outline path `d` attributes */
  iconPaths: string[];
  /** Renders as larger card in the highlights row */
  highlight?: boolean;
  /** Enable CountUp animation (only meaningful when value is a number) */
  animated?: boolean;
  /** Where the value comes from — for documentation/maintenance */
  source: KpiSource;
}

/**
 * Private metrics — never rendered in the HTML.
 * Populate from your analytics source (Plausible, GA4, Supabase…).
 * See data.private.ts for the writable template.
 */
export interface PrivateKpi {
  id: string;
  value: number;
  label: string;
  /** Human-readable note about the data source */
  source: string;
}

// ─── Calculated values ───────────────────────────────────────────────────────

/** Years of professional experience from the earliest start date in experience data */
const earliestStart = [...experience]
  .map(e => e.startDate)
  .sort()[0]; // e.g. "2022-06"

const [sy, sm] = earliestStart.split('-').map(Number);
const yearsExp = Math.max(
  1,
  Math.floor((Date.now() - new Date(sy, sm - 1).getTime()) / 31_557_600_000)
);

/** Total unique technologies tracked in skills data */
const techCount = skills.length;

// ─── Public KPI data ─────────────────────────────────────────────────────────

export const publicKpis: PublicKpi[] = [
  // ── Highlights (top row, larger cards) ──────────────────────────────────
  {
    id: 'experience',
    value: yearsExp,
    unit: '+',
    label: {
      en: 'Years of experience',
      es: 'Años de experiencia',
    },
    description: {
      en: 'Building production-grade frontend systems in fintech.',
      es: 'Construyendo sistemas frontend de producción en fintech.',
    },
    iconPaths: [
      'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
    ],
    highlight: true,
    animated: true,
    source: 'calculated',
  },
  {
    id: 'features',
    value: 100,
    unit: '+',
    label: {
      en: 'Features shipped',
      es: 'Funcionalidades entregadas',
    },
    description: {
      en: "Across BBVA's hybrid banking platform serving millions.",
      es: 'En la plataforma bancaria híbrida de BBVA con millones de usuarios.',
    },
    iconPaths: [
      'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    ],
    highlight: true,
    animated: true,
    source: 'static',
  },
  {
    id: 'technologies',
    value: techCount,
    unit: '+',
    label: {
      en: 'Technologies',
      es: 'Tecnologías',
    },
    description: {
      en: 'From Web Components and TypeScript to AI-assisted workflows.',
      es: 'Desde Web Components y TypeScript hasta flujos asistidos por IA.',
    },
    iconPaths: [
      'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    ],
    highlight: true,
    animated: true,
    source: 'calculated',
  },

  // ── Secondary (bottom row, standard cards) ───────────────────────────────
  {
    id: 'companies',
    value: 2,
    label: {
      en: 'Companies',
      es: 'Empresas',
    },
    description: {
      en: 'Minsait & BBVA Technology.',
      es: 'Minsait & BBVA Technology.',
    },
    iconPaths: [
      'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
    ],
    animated: true,
    source: 'static',
  },
  {
    id: 'response',
    value: '< 24 h',
    label: {
      en: 'Response time',
      es: 'Tiempo de respuesta',
    },
    description: {
      en: 'Average reply time for new enquiries.',
      es: 'Tiempo medio de respuesta a consultas nuevas.',
    },
    iconPaths: [
      'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    ],
    source: 'static',
  },
  {
    id: 'location',
    value: 'Remote',
    label: {
      en: 'Work mode',
      es: 'Modalidad',
    },
    description: {
      en: 'Remote-first. Open to hybrid in Spain.',
      es: 'Remote-first. Abierto a híbrido en España.',
    },
    iconPaths: [
      'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
      'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    ],
    source: 'static',
  },
];
