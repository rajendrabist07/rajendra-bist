import { z } from 'zod'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const AvailabilitySchema = z.object({
  status: z.string(),
  noticePeriodDays: z.number().int().nonnegative(),
  formatted: z.string(),
})

const PersonalSchema = z.object({
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
})

const EducationItemSchema = z.object({
  school: z.string(),
  degree: z.string(),
  timeframe: z.string(),
  location: z.string(),
  description: z.string(),
})

const CredentialSchema = z.object({
  institution: z.string(),
  title: z.string(),
  credentialType: z.string(),
  timeframe: z.string(),
  status: z.enum(['Completed', 'Ongoing']),
  description: z.string(),
  topics: z.array(z.string()),
  verifyUrl: z.string().url().optional(),
  draft: z.boolean().default(false),
})

const TimelineEventSchema = z.object({
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
})

const ExperienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  timeframe: z.string(),
  location: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
  stack: z.array(z.string()),
})

const SkillCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
})

export const EvidenceSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  source: z.string().min(1),
  verifiedOn: z.string().optional(),
  draft: z.boolean().default(false),
})

export type Evidence = z.infer<typeof EvidenceSchema>

const ProjectStatusSchema = z.enum(['Live', 'In Development', 'Archived'])

const ProjectSchema = z.object({
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
})

export type Project = z.infer<typeof ProjectSchema>

const SiteConfigSchema = z.object({
  SITE_URL: z.string().url(),
  SITE_NAME: z.string(),
  SITE_TITLE: z.string(),
  SITE_DESCRIPTION: z.string().max(155),
})

// ---------------------------------------------------------------------------
// PERSONAL
// ---------------------------------------------------------------------------

export const PERSONAL = PersonalSchema.parse({
  name: 'Rajendra Bist',
  role: 'Full-Stack Developer & Backend Engineer',
  tagline:
    'Backend-focused full-stack developer (Node.js, TypeScript, PostgreSQL) who designs and ships complete applications end to end: schema design, REST APIs, authentication, tenant isolation, and deployment.',
  location: 'New Delhi, India',
  phone: '+91 8700918036',
  email: 'rajendrabist396@gmail.com',
  github: 'https://github.com/rajendrabist07',
  linkedin: 'https://www.linkedin.com/in/rajendra-bist-169926370',
  website: 'https://www.bistrajendra.com.np',
  resumeUrl: '/resume/Rajendra_Bist_Full_Stack_Developer.pdf',
  workAuthorization:
    'Nepali national; eligible to work in India without sponsorship under the 1950 Indo-Nepal Treaty.',
  availability: {
    status: 'Available immediately',
    noticePeriodDays: 0,
    formatted: 'Available immediately · Delhi NCR / remote',
  },
  noticePeriod: 'Available immediately',
  languages: ['English', 'Hindi (Proficient)', 'Nepali (Native)'],
})

// ---------------------------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------------------------

export const EDUCATION = z.array(EducationItemSchema).parse([
  {
    school: 'Vcare Technical Institute',
    degree: 'Diploma in IT (Full-Stack Web Development)',
    timeframe: '2025 – 2026',
    location: 'India',
    description: 'Node.js, Express.js, React, MongoDB, REST APIs',
  },
  {
    school: 'Kailali Multiple Campus',
    degree: 'Higher Secondary (+2 Science, Class XII equivalent)',
    timeframe: '2022',
    location: 'Nepal',
    description: 'Physics, Chemistry, and Mathematics',
  },
])

// ---------------------------------------------------------------------------
// CREDENTIALS — only real credentials with verifyUrl and draft flag
// ---------------------------------------------------------------------------

export const CREDENTIALS = z.array(CredentialSchema).parse([
  {
    institution: 'Vcare Technical Institute',
    title: 'Full-Stack Web Development',
    credentialType: 'Professional Engineering Training',
    timeframe: '2025 – 2026',
    status: 'Completed',
    verifyUrl: 'https://drive.google.com/file/d/1nRuMQefR-kxjTr32fHj0uK2v78Hy8FE1/view',
    draft: false,
    description:
      'Practical engineering diploma covering Node.js, Express.js, React, MongoDB, REST APIs, database modeling, and deployment workflows in India.',
    topics: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs', 'PostgreSQL'],
  },
  {
    institution: 'Kailali Multiple Campus',
    title: 'Higher Secondary (+2 Science)',
    credentialType: 'Class XII Science',
    timeframe: '2022',
    status: 'Completed',
    draft: false,
    description:
      '+2 Science stream (physics, chemistry, and mathematics).',
    topics: ['Science Stream'],
  },
])

// ---------------------------------------------------------------------------
// TIMELINE EVENTS — Dual-Lane: Building vs Learning
// ---------------------------------------------------------------------------

export const TIMELINE_EVENTS = z.array(TimelineEventSchema).parse([
  {
    lane: 'Building',
    role: 'Full-Stack Developer (Self-Employed)',
    organization: 'Independent Projects',
    timeframe: 'Feb 2025 – Present',
    start: '2025-02',
    end: 'Present',
    label: 'Engineering & Deployment',
    description:
      'Design, build, and deploy full-stack applications end to end across Next.js and Express with PostgreSQL and MongoDB, owning schema design, APIs, authentication, and deployment.',
    achievements: [
      'Architecting Sovereign: multi-tenant B2B SaaS in a Turborepo monorepo with PostgreSQL Row-Level Security tenant isolation, Inngest durable workflows, and RBAC.',
      'Built and deployed Chronicle: two-service platform with Next.js SSR/ISR on Vercel and Express REST API (JWT) on Render backed by PostgreSQL via Prisma with zero-drift migrations.',
      'Shipped DevGuard AI (Jul 2026 – Aug 2026): GitHub review application with multi-model failover (Groq, Gemini), AST security linting, HMAC-verified webhooks, and Redis rate limiting.',
    ],
    stack: [
      'TypeScript',
      'Turborepo',
      'PostgreSQL (RLS)',
      'Inngest',
      'Node.js',
      'Express',
      'Prisma',
      'Next.js 15',
      'Zod',
      'Gemini 2.5',
      'Vitest',
      'GitHub Actions',
    ],
  },
  {
    lane: 'Learning',
    role: 'Full-Stack Web Development Trainee',
    organization: 'Vcare Technical Institute',
    timeframe: '2025 – 2026',
    start: '2025-01',
    end: '2026',
    label: 'Professional Engineering Training',
    description:
      'Completed practical diploma training in full-stack engineering focused on API design, database schema modeling, protected authentication flows, and deployment in India.',
    achievements: [
      'Implemented REST API modules, protected JWT authentication routes, database schemas, and reusable React interface patterns.',
      'Practiced software delivery workflows including Git, environment variables, CI deployment checks, and debugging discipline.',
    ],
    stack: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs', 'Git'],
  },
])

// ---------------------------------------------------------------------------
// EXPERIENCE (Backward-compatible export for existing components)
// ---------------------------------------------------------------------------

export const EXPERIENCE = z.array(ExperienceItemSchema).parse([
  {
    role: 'Full-Stack Developer (Self-Employed)',
    company: 'Independent Projects',
    timeframe: 'Feb 2025 – Present',
    location: 'Remote',
    description:
      'Design, build, and deploy full-stack applications end to end across Next.js (Vercel) and Express (Render) with PostgreSQL (Prisma) and MongoDB, owning schema design, REST APIs, authentication, CI, and deployment.',
    achievements: [
      'Architecting Sovereign: multi-tenant B2B SaaS in a Turborepo monorepo where organizations define autonomous AI workflow agents; PostgreSQL Row-Level Security enforces tenant isolation alongside RBAC and audit logging.',
      'Built workflow execution on Inngest for durable, resumable runs with human-in-the-loop approval steps, and an agent tool-calling loop using JSON-mode requests and Zod output verification.',
      'Built and deployed Chronicle: two-service platform with Next.js SSR/ISR on Vercel and Express REST API (JWT) on Render backed by PostgreSQL via Prisma; Zod-validated Gemini tools with transactional email (Brevo) and boot-time zero-drift Prisma migrations.',
      'Engineered DevGuard AI (Jul 2026 – Aug 2026): GitHub App with tool-calling loop (AST-based security linting & OSV.dev CVE scanning), 3-path model failover (Groq → Gemini → rule engine), HMAC-verified webhooks, Zod validation, and Redis rate limiting.',
    ],
    stack: [
      'TypeScript',
      'Turborepo',
      'PostgreSQL (RLS)',
      'Inngest',
      'Node.js',
      'Express',
      'Prisma',
      'Next.js 15',
      'Zod',
      'Gemini 2.5',
      'Vitest',
      'GitHub Actions',
    ],
  },
  {
    role: 'Full-Stack Web Development Trainee',
    company: 'Vcare Technical Institute',
    timeframe: '2025 – 2026',
    location: 'India',
    description:
      'Completed practical diploma training in full-stack engineering focused on API engineering, database schema modeling, protected authentication flows, and deployment patterns in India.',
    achievements: [
      'Implemented REST API modules, protected JWT authentication routes, database schemas, and reusable React interface patterns.',
      'Practiced software delivery workflows including Git, environment variables, CI deployment checks, and debugging discipline.',
    ],
    stack: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs', 'Git'],
  },
])

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------

export const SKILLS = z.array(SkillCategorySchema).parse([
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js 15 (App Router, ISR)',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Authentication',
      'Zod Validation',
      'Prisma ORM',
      'Inngest',
      'WebSockets',
      'Server-Sent Events',
    ],
  },
  {
    category: 'Database',
    items: [
      'PostgreSQL (RLS, pgvector)',
      'MongoDB',
      'Redis (Upstash)',
      'Supabase',
      'Mongoose',
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      'Git',
      'GitHub Actions (CI/CD)',
      'Vitest',
      'Turborepo',
      'Vercel',
      'Render',
      'Docker (basic)',
      'Linux CLI',
    ],
  },
  {
    category: 'AI & APIs',
    items: [
      'Gemini API',
      'Groq API',
      'Tool-Calling Agents',
      'Structured JSON Output',
      'Multi-Provider Fallback',
      'RAG Pipelines',
    ],
  },
])

// ---------------------------------------------------------------------------
// PROJECTS — 3 canonical projects with real package.json stacks & evidence
// ---------------------------------------------------------------------------

export const PROJECTS = z.array(ProjectSchema).parse([
  {
    slug: 'sovereign',
    title: 'Sovereign',
    status: 'In Development',
    timeframe: '2026',
    description:
      'Multi-tenant B2B SaaS platform for AI workflow agents, isolating tenant data with PostgreSQL Row-Level Security (RLS) and executing durable workflows via Inngest.',
    stack: [
      'TypeScript',
      'Turborepo',
      'PostgreSQL (RLS)',
      'Inngest',
      'Zod',
      'Node.js',
      'Next.js 16',
      'React 19',
      'tRPC',
      'Prisma',
    ],
    imageUrl: '/images/sovereign-card.svg',
    liveUrl: 'https://sovereign-saas-platform.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/sovereign',
    frontendImplementation:
      'Built organizational workspace with tRPC client queries, workflow run list views, approval dialogs, and tenant-scoped dashboard components.',
    evidence: [
      {
        label: 'Monorepo Architecture',
        value: 'Turborepo + pnpm workspaces',
        source: 'github.com/rajendrabist07/sovereign/blob/main/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Database Isolation',
        value: 'PostgreSQL RLS with Prisma adapter',
        source: 'github.com/rajendrabist07/sovereign/blob/main/packages/db/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
    ],
    draft: false,
  },
  {
    slug: 'chronicle',
    title: 'Chronicle',
    status: 'Live',
    timeframe: '2026',
    description:
      'Two-service technical publishing platform with server-rendered public pages, email-verified accounts, and schema-validated Gemini AI writing tools.',
    stack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Gemini 2.5',
      'Brevo Email',
      'Vitest',
      'GitHub Actions',
    ],
    imageUrl: '/images/chronicle-card.svg',
    liveUrl: 'https://chronicle-platform.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/chronicle.git',
    frontendImplementation:
      'Server-rendered public reading pages with ISR, per-page metadata, and a writer workspace with markdown preview, autosave, and AI assist panels.',
    evidence: [
      {
        label: 'Production Services',
        value: '2 (Next.js client + Express API)',
        source: 'github.com/rajendrabist07/chronicle',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Automated Testing',
        value: 'Vitest unit & integration test suite',
        source: 'github.com/rajendrabist07/chronicle/blob/main/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
    ],
    draft: false,
  },
  {
    slug: 'devguard-ai',
    title: 'DevGuard AI',
    status: 'Live',
    timeframe: 'Jul 2026 – Aug 2026',
    description:
      'Autonomous GitHub review agent using AST checks, CVE scans, test evidence, and multi-model fallback routing.',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Supabase',
      'Groq Llama 3.3',
      'Gemini 2.5 Flash',
      'GitHub App API',
    ],
    imageUrl: '/images/devguard-ai-card.svg',
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
    frontendImplementation:
      'Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.',
    evidence: [
      {
        label: 'Model Failover Paths',
        value: '3-tier router (Groq -> Gemini -> AST rules)',
        source: 'github.com/rajendrabist07/dev-guard-ai',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Test & Evaluation Suite',
        value: 'Vitest + automated eval runner scripts',
        source: 'github.com/rajendrabist07/dev-guard-ai/blob/main/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
    ],
    draft: false,
  },
])

// ---------------------------------------------------------------------------
// DRAFT PROJECTS — Kept in facts for non-rendered tracking
// ---------------------------------------------------------------------------

export const DRAFT_PROJECTS = z.array(ProjectSchema).parse([
  {
    slug: 'edumethod-ai',
    title: 'EduMethod AI',
    status: 'Archived',
    timeframe: '2025',
    description: 'AI-assisted learning platform prototype.',
    stack: ['React', 'Node.js', 'MongoDB'],
    imageUrl: '/images/edumethod-ai-card.svg',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
    frontendImplementation: 'Interactive student workspace.',
    evidence: [],
    draft: true,
  },
])

// ---------------------------------------------------------------------------
// SITE_CONFIG
// ---------------------------------------------------------------------------

export const SITE_CONFIG = SiteConfigSchema.parse({
  SITE_URL: 'https://www.bistrajendra.com.np',
  SITE_NAME: 'Rajendra Bist Portfolio',
  SITE_TITLE: 'Full-Stack Developer & Backend Engineer | Rajendra Bist',
  SITE_DESCRIPTION:
    'Full-stack developer shipping complete apps: Next.js, Node.js, PostgreSQL — schema design to deployment. Open to SDE-1 roles in Delhi NCR and remote.',
})
