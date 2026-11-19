import { FactsSchema } from '../content/facts-schema.ts';
import {
  PERSONAL,
  EDUCATION,
  CREDENTIALS,
  TIMELINE_EVENTS,
  EXPERIENCE,
  SKILLS,
  PROJECTS,
  SITE_CONFIG,
} from '../content/facts.ts';

console.log('🔍 Validating facts.ts against Zod schema at build time...');

const factsToValidate = {
  personal: PERSONAL,
  education: EDUCATION,
  credentials: CREDENTIALS,
  timelineEvents: TIMELINE_EVENTS,
  experience: EXPERIENCE,
  skills: SKILLS,
  projects: PROJECTS,
  siteConfig: SITE_CONFIG,
};

try {
  FactsSchema.parse(factsToValidate);
  console.log('✅ Build-time validation passed: all facts in facts.ts are structurally valid.');
} catch (error) {
  console.error('❌ Build-time validation failed: facts.ts violates schema rules:');
  console.error(error);
  process.exit(1);
}
