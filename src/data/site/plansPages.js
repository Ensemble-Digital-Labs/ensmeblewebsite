import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const plansPages = [
  page(
    '/plans',
    'Service plans',
    'Plans overview',
    'Local Foundation, Growth Engine, and Market Leader, AI-powered, HIPAA-conscious growth plans with clear deliverables.',
    [
      {
        body: 'Plans are designed as ladders: establish local credibility, scale acquisition, then dominate with automation and predictive targeting where appropriate.',
      },
    ],
    { tags: ['KEY PAGE'] }
  ),
  page(
    '/plans/local-foundation',
    'Plans',
    'Local Foundation plan',
    'AI-assisted GBP management, local SEO, citation building, and automated review generation, the credibility baseline.',
    [{ body: 'Best for practices establishing trust and visibility before scaling paid spend aggressively.' }]
  ),
  page(
    '/plans/growth-engine',
    'Plans',
    'Growth Engine plan',
    'AI-targeted Google and Meta, social, and email with send-time optimization plus bi-weekly AI reporting.',
    [{ body: 'Connects creative testing to booked consults with governance for sensitive categories.' }]
  ),
  page(
    '/plans/market-leader',
    'Plans',
    'Market Leader plan',
    'AI chatbot, predictive targeting, CRM automation, YouTube, and PR, full-market dominance where economics justify it.',
    [{ body: 'Includes executive-ready reporting and cross-channel orchestration across Ensemble verticals.' }]
  ),
]
