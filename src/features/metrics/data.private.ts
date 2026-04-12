/**
 * PRIVATE METRICS — internal tracking only.
 *
 * ⚠️  Add this file to .gitignore:
 *       src/features/metrics/data.private.ts
 *
 * This file is NEVER imported by any rendered component.
 * Use it to monitor your own KPIs without exposing them publicly.
 *
 * Recommended data sources:
 *  - Plausible Analytics  → https://plausible.io/api/v1/stats/aggregate
 *  - Google Analytics 4   → GA4 Data API
 *  - Supabase             → SELECT from a "metrics" table
 *  - Local JSON           → import from a .json file updated by a cron job
 *
 * To connect a live source, replace the mock values below with an async
 * fetch inside an Astro endpoint (src/pages/api/metrics.ts) and use
 * `output: 'server'` or on-demand ISR.
 */

import type { PrivateKpi } from './data';

export const privateKpis: PrivateKpi[] = [
  {
    id: 'portfolio_views_30d',
    value: 0,           // ← replace with real value from analytics
    label: 'Portfolio views (last 30 days)',
    source: 'Plausible / GA4',
  },
  {
    id: 'contact_clicks_30d',
    value: 0,
    label: 'Contact button clicks (last 30 days)',
    source: 'Plausible / GA4 event: contact_open',
  },
  {
    id: 'conversion_rate',
    value: 0,           // (contact_clicks / views) * 100
    label: 'Visit-to-contact conversion rate (%)',
    source: 'Calculated',
  },
  {
    id: 'avg_session_seconds',
    value: 0,
    label: 'Average session duration (seconds)',
    source: 'Plausible / GA4',
  },
  {
    id: 'top_referrer',
    value: 0,           // store as separate string field if needed
    label: 'Top traffic source (placeholder)',
    source: 'Plausible / GA4',
  },
];
