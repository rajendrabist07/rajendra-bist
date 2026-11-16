import { z } from 'zod'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

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
  availability: z.string(),
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

const ProjectStatusSchema = z.enum(['Live', 'In Development', 'Archived'])

const ProjectSchema = z.object({
  title: z.string(),
  status: ProjectStatusSchema,
  description: z.string(),
  stack: z.array(z.string()),
  imageUrl: z.string(),
  liveUrl: z.string().url(),
  githubUrl: z.string().url(),
  frontendImplementation: z.string(),
})

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
  resumeUrl: '/Resume/resume.pdf',
  workAuthorization:
    'Nepali national; eligible to work in India without sponsorship under the 1950 Indo-Nepal Treaty.',
  availability: '15-day notice · Delhi NCR / remote',
  noticePeriod: '15 days',
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
    description: 'Physics, Mathematics, and computational foundations',
  },
])

// ---------------------------------------------------------------------------
// CREDENTIALS — only real credentials (no "Project-Based Engineering Practice")
// ---------------------------------------------------------------------------

export const CREDENTIALS = z.array(CredentialSchema).parse([
  {
    institution: 'Vcare Technical Institute',
    title: 'Diploma in IT (Full-Stack Web Development)',
    credentialType: 'Professional Engineering Training',
    timeframe: '2025 – 2026',
    status: 'Completed',
    description:
      'Rigorous practical engineering diploma covering Node.js, Express.js, React, MongoDB, REST APIs, database modeling, and production deployment patterns in India.',
    topics: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs', 'PostgreSQL'],
  },
  {
    institution: 'Kailali Multiple Campus',
    title: 'Higher Secondary (+2 Science)',
    credentialType: 'Class XII Science',
    timeframe: '2022',
    status: 'Completed',
    description:
      '+2 Science stream (physics, chemistry, and mathematics).',
    topics: ['Science Stream', 'Mathematics', 'Physics'],
  },
])

// ---------------------------------------------------------------------------
// EXPERIENCE
// ---------------------------------------------------------------------------

export const EXPERIENCE = z.array(ExperienceItemSchema).parse([
  {
    role: 'Full-Stack Developer (Self-Employed)',
    company: 'Independent Projects',
    timeframe: 'Feb 2025 – Present',
    location: 'Remote',
    description:
      'Design, build, and deploy full-stack applications end to end across Next.js (Vercel) and Express (Render) with PostgreSQL (Prisma) and MongoDB, owning schema design, REST APIs, authentication, CI, and production deployment.',
    achievements: [
      'Architecting Sovereign: multi-tenant B2B SaaS in a Turborepo monorepo where organizations define autonomous AI workflow agents; PostgreSQL Row-Level Security enforces tenant isolation at the database layer alongside RBAC, audit logging, and quota enforcement.',
      'Built workflow execution on Inngest for durable, resumable, and idempotent runs with human-in-the-loop approval steps, and an agent tool-calling loop using JSON-mode requests, Zod-validated outputs, hard timeouts, and prompt-injection tag defenses.',
      'Built and deployed Chronicle: two-service platform with Next.js SSR/ISR on Vercel and Express REST API (JWT) on Render backed by PostgreSQL via Prisma; schema-guarded Gemini tools with transactional email (Brevo) and boot-time zero-drift Prisma migrations.',
      'Engineered DevGuard AI: GitHub App with LLM tool-calling loop (AST-based security linting & OSV.dev CVE scanning), 3-path model failover (Groq → Gemini → rule engine), HMAC-verified webhooks, Zod validation, and Redis rate limiting.',
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
      'Practiced production workflows including Git, environment variables, CI deployment checks, and debugging discipline.',
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
// PROJECTS
// ---------------------------------------------------------------------------

export const PROJECTS = z.array(ProjectSchema).parse([
  {
    title: 'Sovereign',
    status: 'In Development',
    description:
      'Multi-tenant B2B SaaS platform in a Turborepo monorepo with PostgreSQL Row-Level Security (RLS), Inngest durable workflows, and schema-guarded AI agents.',
    stack: [
      'TypeScript',
      'Turborepo',
      'PostgreSQL (RLS)',
      'Inngest',
      'Zod',
      'Node.js',
      'Next.js 15',
    ],
    imageUrl: '/images/sovereign-card.svg',
    liveUrl: 'https://sovereign-saas-platform.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/sovereign',
    frontendImplementation:
      'Architected organization workspace in a Turborepo monorepo with PostgreSQL RLS tenant isolation, Inngest durable workflow execution, and schema-guarded AI tool calling.',
  },
  {
    title: 'Chronicle',
    status: 'Live',
    description:
      'Two-service technical publishing platform with server-rendered public pages, email-verified accounts, and schema-guarded Gemini AI writing tools.',
    stack: [
      'Next.js 15',
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
      'Server-rendered public reading pages with ISR, per-page metadata and dynamic social cards, plus a client-side writer workspace with markdown preview, draft autosave, and AI assist panels on a tokenized dark/light design system.',
  },
  {
    title: 'DevGuard AI',
    status: 'Live',
    description:
      'Autonomous GitHub review agent using AST checks, CVE scans, test evidence, and multi-model fallback routing.',
    stack: [
      'Next.js 15',
      'React 18.3',
      'TypeScript',
      'Tailwind CSS v4',
      'Supabase',
      'Groq Llama 3.3',
      'Gemini 2.5 Flash',
      'GitHub App',
    ],
    imageUrl: '/images/devguard-ai-card.svg',
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
    frontendImplementation:
      'Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.',
  },
  {
    title: 'EduMethod AI',
    status: 'Live',
    description:
      'Adaptive learning platform with learner memory, pgvector RAG grounding, verification audits, and SM-2 spaced repetition.',
    stack: [
      'Next.js 15',
      'React 18.3',
      'TypeScript',
      'Tailwind CSS v4',
      'Clerk Auth',
      'Supabase (pgvector)',
      'Upstash Redis',
      'Groq Model Router',
      'Gemini 2.5 Flash API',
    ],
    imageUrl: '/images/edumethod-ai-card.svg',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
    frontendImplementation:
      'Built the learning workspace around authenticated Next.js/React flows that connect upload, memory, verification, and spaced-repetition states to typed backend responses.',
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
