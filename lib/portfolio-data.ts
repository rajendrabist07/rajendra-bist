/**
 * lib/portfolio-data.ts
 *
 * Backward-compatible re-export layer.
 * All content lives in content/facts.ts (Zod-validated single source of truth).
 */
export {
  PERSONAL,
  EDUCATION,
  CREDENTIALS,
  EXPERIENCE,
  TIMELINE_EVENTS,
  SKILLS,
  PROJECTS,
  DRAFT_PROJECTS,
  SITE_CONFIG,
} from '../content/facts'

export const FEATURED_LINKS = {
  chronicle: 'https://chronicle-platform.vercel.app/',
  sovereign: 'https://sovereign-saas-platform.vercel.app/',
  devguard: 'https://dev-guard-ai.vercel.app/',
}
