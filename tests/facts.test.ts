import { describe, it, expect } from 'vitest';
import { FactsSchema } from '../content/facts-schema';
import {
  PERSONAL,
  EDUCATION,
  CREDENTIALS,
  TIMELINE_EVENTS,
  EXPERIENCE,
  SKILLS,
  PROJECTS,
  SITE_CONFIG,
} from '../content/facts';

describe('FACTS schema validation', () => {
  it('validates personal info against Zod schema', () => {
    expect(() => FactsSchema.shape.personal.parse(PERSONAL)).not.toThrow();
  });

  it('validates education against Zod schema', () => {
    expect(() => FactsSchema.shape.education.parse(EDUCATION)).not.toThrow();
  });

  it('validates credentials against Zod schema', () => {
    expect(() => FactsSchema.shape.credentials.parse(CREDENTIALS)).not.toThrow();
  });

  it('validates timeline events against Zod schema', () => {
    expect(() => FactsSchema.shape.timelineEvents.parse(TIMELINE_EVENTS)).not.toThrow();
  });

  it('validates experience against Zod schema', () => {
    expect(() => FactsSchema.shape.experience.parse(EXPERIENCE)).not.toThrow();
  });

  it('validates skills against Zod schema', () => {
    expect(() => FactsSchema.shape.skills.parse(SKILLS)).not.toThrow();
  });

  it('validates projects against Zod schema', () => {
    expect(() => FactsSchema.shape.projects.parse(PROJECTS)).not.toThrow();
  });

  it('validates siteConfig against Zod schema', () => {
    expect(() => FactsSchema.shape.siteConfig.parse(SITE_CONFIG)).not.toThrow();
  });
});
