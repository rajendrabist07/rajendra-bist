import { z } from 'zod';

export const AvailabilitySchema = z.object({
  status: z.string(),
  noticePeriodDays: z.number().int().nonnegative(),
  formatted: z.string(),
});

export const PersonalSchema = z.object({
  name: z.string(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  phone: z.string(),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  website: z.string().url(),
  resumeUrl: z.string(),
  workAuthorization: z.string(),
  availability: AvailabilitySchema,
  noticePeriod: z.string(),
  languages: z.array(z.string()),
});

export const EducationItemSchema = z.object({
  school: z.string(),
  degree: z.string(),
  timeframe: z.string(),
  location: z.string(),
  description: z.string(),
});

export const CredentialSchema = z.object({
  institution: z.string(),
  title: z.string(),
  credentialType: z.string(),
  timeframe: z.string(),
  status: z.enum(['Completed', 'Ongoing']),
  description: z.string(),
  topics: z.array(z.string()),
  verifyUrl: z.string().url().optional(),
  draft: z.boolean().default(false),
});

export const TimelineEventSchema = z.object({
  lane: z.enum(['Building', 'Learning']),
  role: z.string(),
  organization: z.string(),
  timeframe: z.string(),
  start: z.string(),
  end: z.string(),
  label: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
  stack: z.array(z.string()),
});

export const ExperienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  timeframe: z.string(),
  location: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
  stack: z.array(z.string()),
});

export const SkillCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const EvidenceSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  source: z.string().min(1),
  verifiedOn: z.string().optional(),
  draft: z.boolean().default(false),
});

export const ProjectStatusSchema = z.enum(['Live', 'In Development', 'Archived']);

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  status: ProjectStatusSchema,
  timeframe: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  imageUrl: z.string(),
  liveUrl: z.string().url(),
  githubUrl: z.string().url(),
  frontendImplementation: z.string(),
  evidence: z.array(EvidenceSchema),
  draft: z.boolean().default(false),
});

export const SiteConfigSchema = z.object({
  SITE_URL: z.string().url(),
  SITE_NAME: z.string(),
  SITE_TITLE: z.string(),
  SITE_DESCRIPTION: z.string().max(155),
});

export const FactsSchema = z.object({
  personal: PersonalSchema,
  education: z.array(EducationItemSchema),
  credentials: z.array(CredentialSchema),
  timelineEvents: z.array(TimelineEventSchema),
  experience: z.array(ExperienceItemSchema),
  skills: z.array(SkillCategorySchema),
  projects: z.array(ProjectSchema),
  siteConfig: SiteConfigSchema,
});
