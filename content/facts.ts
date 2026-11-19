// ---------------------------------------------------------------------------
// TypeScript Type Interfaces
// ---------------------------------------------------------------------------

export interface Availability {
  status: string;
  noticePeriodDays: number;
  formatted: string;
}

export interface Personal {
  name: string;
  role: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  resumeUrl: string;
  workAuthorization: string;
  availability: Availability;
  noticePeriod: string;
  languages: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  timeframe: string;
  location: string;
  description: string;
}

export interface Credential {
  institution: string;
  title: string;
  credentialType: string;
  timeframe: string;
  status: 'Completed' | 'Ongoing';
  description: string;
  topics: string[];
  verifyUrl?: string;
  draft?: boolean;
}

export interface TimelineEvent {
  lane: 'Building' | 'Learning';
  role: string;
  organization: string;
  timeframe: string;
  start: string;
  end: string;
  label: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  timeframe: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Evidence {
  label: string;
  value: string;
  source: string;
  verifiedOn?: string;
  draft?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  status: 'Live' | 'In Development' | 'Archived';
  timeframe: string;
  description: string;
  stack: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  frontendImplementation: string;
  evidence: Evidence[];
  draft?: boolean;
}

export interface SiteConfig {
  SITE_URL: string;
  SITE_NAME: string;
  SITE_TITLE: string;
  SITE_DESCRIPTION: string;
}

// ---------------------------------------------------------------------------
// PERSONAL
// ---------------------------------------------------------------------------

export const PERSONAL: Personal = {
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
}

// ---------------------------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------------------------

export const EDUCATION: EducationItem[] = [
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
]

// ---------------------------------------------------------------------------
// CREDENTIALS — only real credentials with verifyUrl and draft flag
// ---------------------------------------------------------------------------

export const CREDENTIALS: Credential[] = [
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
]

// ---------------------------------------------------------------------------
// TIMELINE EVENTS — Dual-Lane: Building vs Learning
// ---------------------------------------------------------------------------

export const TIMELINE_EVENTS: TimelineEvent[] = [
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
]

// ---------------------------------------------------------------------------
// EXPERIENCE (Backward-compatible export for existing components)
// ---------------------------------------------------------------------------

export const EXPERIENCE: ExperienceItem[] = [
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
]

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------

export const SKILLS: SkillCategory[] = [
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
]

// ---------------------------------------------------------------------------
// PROJECTS — 3 canonical projects with real package.json stacks & evidence
// ---------------------------------------------------------------------------

export const PROJECTS: Project[] = [
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
        label: 'Database Isolation (RLS)',
        value: 'PostgreSQL RLS with 8 migration policies',
        source: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/packages/db/prisma/migrations/20261002111243_enable_rls/migration.sql',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Durable Workflows',
        value: 'Inngest multi-step orchestrator',
        source: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Monorepo Stack',
        value: 'Turborepo with Next.js 15 & React 19',
        source: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/package.json',
        verifiedOn: '2026-11-18',
        draft: false,
      },
      {
        label: 'Workflow Approvals UI',
        value: 'Dedicated approval route & components',
        source: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/app/(app)/approvals/page.tsx',
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
        label: 'Automated Test Suite',
        value: '22 test files (SSR, auth, claims, validation)',
        source: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/__tests__/validation.test.ts',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Continuous Integration',
        value: 'GitHub Actions lint, typecheck & Vitest workflow',
        source: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/.github/workflows/ci.yml',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Grounded AI Reader',
        value: 'In-article AI assistant with source-referenced responses',
        source: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/app/components/reading/AskThisArticle.tsx',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Sanitized Markdown Editor',
        value: 'Rehype-sanitized rich preview editor',
        source: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/app/components/editor/MarkdownEditor.tsx',
        verifiedOn: '2026-11-19',
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
        label: 'Model Failover Router',
        value: '3-tier router (Groq -> Gemini -> AST rules)',
        source: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/agent/router.ts',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Runtime Schema Validation',
        value: 'Zod schemas for webhook payloads and findings',
        source: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/validation/schemas.ts',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Automated Eval Runner',
        value: 'Offline evaluation benchmark suite',
        source: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/evals/run-eval.ts',
        verifiedOn: '2026-11-19',
        draft: false,
      },
      {
        label: 'Webhook Signature Auth',
        value: 'HMAC verification suite with replay defense',
        source: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/__tests__/github/webhook-verify.test.ts',
        verifiedOn: '2026-11-19',
        draft: false,
      },
    ],
    draft: false,
  },
]

// ---------------------------------------------------------------------------
// DRAFT PROJECTS — Kept in facts for non-rendered tracking
// ---------------------------------------------------------------------------

export const DRAFT_PROJECTS: Project[] = [
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
]

// ---------------------------------------------------------------------------
// SITE_CONFIG
// ---------------------------------------------------------------------------

export const SITE_CONFIG: SiteConfig = {
  SITE_URL: 'https://www.bistrajendra.com.np',
  SITE_NAME: 'Rajendra Bist Portfolio',
  SITE_TITLE: 'Full-Stack Developer & Backend Engineer | Rajendra Bist',
  SITE_DESCRIPTION:
    'Full-stack developer shipping complete apps: Next.js, Node.js, PostgreSQL — schema design to deployment. Open to SDE-1 roles in Delhi NCR and remote.',
};

// Unified FACTS export aggregating verified facts
export const FACTS = {
  personal: PERSONAL,
  education: EDUCATION,
  credentials: CREDENTIALS,
  timelineEvents: TIMELINE_EVENTS,
  experience: EXPERIENCE,
  skills: SKILLS,
  projects: PROJECTS,
  siteConfig: SITE_CONFIG,
  availability: PERSONAL.availability,
  resume: {
    url: PERSONAL.resumeUrl,
  },
  contact: {
    email: PERSONAL.email,
    github: PERSONAL.github,
    linkedin: PERSONAL.linkedin,
    phone: PERSONAL.phone,
    location: PERSONAL.location,
  },
} as const;
