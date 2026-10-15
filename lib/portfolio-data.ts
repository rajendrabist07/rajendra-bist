export const PERSONAL = {
  name: 'Rajendra Bist',
  role: 'Full-Stack Developer & Backend Engineer',
  tagline:
    'Backend-focused full-stack developer (Node.js, TypeScript, PostgreSQL) who designs and ships complete applications end to end: schema design, REST APIs, authentication, tenant isolation, and deployment.',
  location: 'New Delhi, India',
  phone: '+91 8700918036',
  email: 'rajendrabist396@gmail.com',
  github: 'https://github.com/rajendrabist07',
  linkedin: 'https://www.linkedin.com/in/rajendra-bist-169926370',
  facebook: 'https://www.facebook.com/rajendra.bist.302275',
  website: 'https://www.bistrajendra.com.np',
  resumeUrl: '/Resume/resume.pdf',
  workAuthorization: 'Nepali national; eligible to work in India without a work permit under the India-Nepal treaty',
  availability: '1 month notice; Delhi NCR or remote',
  languages: ['English', 'Hindi (Proficient)', 'Nepali (Native)'],
}

export const FEATURED_LINKS = {
  chronicle: 'https://chronicle-platform.vercel.app/',
  sovereign: 'https://github.com/rajendrabist07/sovereign',
  devguard: 'https://dev-guard-ai.vercel.app/',
}

export const EDUCATION = [
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
]

export const CREDENTIALS = [
  {
    institution: 'Vcare Technical Institute',
    title: 'Diploma in IT (Full-Stack Web Development)',
    credentialType: 'Professional Engineering Training',
    timeframe: '2025 – 2026',
    status: 'Completed' as const,
    description:
      'Rigorous practical engineering diploma covering Node.js, Express.js, React, MongoDB, REST APIs, database modeling, and production deployment patterns in India.',
    topics: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs', 'PostgreSQL'],
  },
  {
    institution: 'Kailali Multiple Campus',
    title: 'Higher Secondary (+2 Science)',
    credentialType: 'Class XII Science Equivalent',
    timeframe: '2022',
    status: 'Completed' as const,
    description:
      'Formal academic foundation in physical sciences, advanced calculus, physics, and computational reasoning in Nepal.',
    topics: ['Mathematics', 'Physics', 'Scientific Computing', 'Logic & Analysis'],
  },
  {
    institution: 'Project-Based Engineering Practice',
    title: 'Continuous Systems Engineering',
    credentialType: 'Applied Self-Directed Engineering',
    timeframe: 'Ongoing',
    status: 'Ongoing' as const,
    description:
      'Architecting and shipping production-focused platforms including Sovereign (Multi-Tenant B2B SaaS on PostgreSQL RLS), Chronicle (two-service publishing platform), and DevGuard AI (autonomous GitHub code review agent).',
    topics: ['PostgreSQL RLS', 'Turborepo Monorepo', 'Inngest Workflows', 'Zod Guards', 'AST Security Analysis'],
  },
]

export const EXPERIENCE = [
  {
    role: 'Full-Stack Developer (Self-Employed)',
    company: 'Independent Projects',
    timeframe: 'Feb 2025 – Present',
    location: 'Remote',
    description:
      'Design, build, and deploy full-stack applications end to end across Next.js (Vercel) and Express (Render) with PostgreSQL (Prisma) and MongoDB, owning schema design, REST APIs, authentication, CI, and production deployment.',
    achievements: [
      'Architecting Sovereign: multi-tenant B2B SaaS in a Turborepo monorepo where organizations define autonomous AI workflow agents; PostgreSQL Row-Level Security enforces tenant isolation at the database layer alongside RBAC, audit logging, and quota enforcement.',
      'Built workflow execution on Inngest for durable, resumable, and idempotent runs with human-in-the-loop approval steps, and an agent tool-calling loop treating the LLM as an untrusted dependency via JSON-mode requests, Zod-validated outputs, hard timeouts, and prompt-injection tag defenses.',
      'Built and deployed Chronicle: two-service platform with Next.js SSR/ISR on Vercel and Express REST API (JWT) on Render backed by PostgreSQL via Prisma; schema-guarded Gemini tools with transactional email (Brevo) and boot-time zero-drift Prisma migrations.',
      'Engineered DevGuard AI: GitHub App with LLM tool-calling loop (AST-based security linting & OSV.dev CVE scanning), 3-path model failover (Groq → Gemini → rule engine), HMAC-verified webhooks, Zod validation, and Redis rate limiting.',
    ],
    stack: ['TypeScript', 'Turborepo', 'PostgreSQL (RLS)', 'Inngest', 'Node.js', 'Express', 'Prisma', 'Next.js 15', 'Zod', 'Gemini 2.5', 'Vitest', 'GitHub Actions'],
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
]

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js 15 (App Router, ISR)', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Zod Validation', 'Prisma ORM', 'Inngest', 'WebSockets', 'Server-Sent Events'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL (RLS, pgvector)', 'MongoDB', 'Redis (Upstash)', 'Supabase', 'Mongoose'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub Actions (CI/CD)', 'Vitest', 'Turborepo', 'Vercel', 'Render', 'Docker (basic)', 'Linux CLI'],
  },
  {
    category: 'AI & APIs',
    items: ['Gemini API', 'Groq API', 'Tool-Calling Agents', 'Structured JSON Output', 'Multi-Provider Fallback', 'RAG Pipelines'],
  },
]

export const PROJECTS = [
  {
    title: 'Sovereign',
    status: 'In Development' as const,
    description:
      'Multi-tenant B2B SaaS platform in a Turborepo monorepo with PostgreSQL Row-Level Security (RLS), Inngest durable workflows, and schema-guarded AI agents.',
    stack: ['TypeScript', 'Turborepo', 'PostgreSQL (RLS)', 'Inngest', 'Zod', 'Node.js', 'Next.js 15'],
    imageUrl: '/images/sovereign-card.svg',
    liveUrl: 'https://github.com/rajendrabist07/sovereign',
    githubUrl: 'https://github.com/rajendrabist07/sovereign',
    frontendImplementation:
      'Architected organization workspace in a Turborepo monorepo featuring human-in-the-loop agent review queues, audit logs, and tenant isolation dashboards.',
  },
  {
    title: 'Chronicle',
    status: 'Live' as const,
    description:
      'Two-service technical publishing platform with server-rendered public pages, email-verified accounts, and schema-guarded Gemini AI writing tools.',
    stack: ['Next.js 15', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Gemini 2.5', 'Brevo Email', 'Vitest', 'GitHub Actions'],
    imageUrl: '/images/chronicle-card.svg',
    liveUrl: FEATURED_LINKS.chronicle,
    githubUrl: 'https://github.com/rajendrabist07/chronicle.git',
    frontendImplementation:
      'Server-rendered public reading pages with ISR, per-page metadata and dynamic social cards, plus a client-side writer workspace with markdown preview, draft autosave, and AI assist panels on a tokenized dark/light design system.',
  },
  {
    title: 'DevGuard AI',
    status: 'Live' as const,
    description:
      'Autonomous GitHub review agent using AST checks, CVE scans, test evidence, and multi-model fallback routing.',
    stack: ['Next.js 15', 'React 18.3', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Groq Llama 3.3', 'Gemini 2.5 Flash', 'GitHub App'],
    imageUrl: '/images/devguard-ai-card.svg',
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
    frontendImplementation:
      'Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.',
  },
  {
    title: 'EduMethod AI',
    status: 'Live' as const,
    description:
      'Adaptive learning platform with learner memory, pgvector RAG grounding, verification audits, and SM-2 spaced repetition.',
    stack: ['Next.js 15', 'React 18.3', 'TypeScript', 'Tailwind CSS v4', 'Clerk Auth', 'Supabase (pgvector)', 'Upstash Redis', 'Groq Model Router', 'Gemini 2.5 Flash API'],
    imageUrl: '/images/edumethod-ai-card.svg',
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
    frontendImplementation:
      'Built the learning workspace around authenticated Next.js/React flows that connect upload, memory, verification, and spaced-repetition states to typed backend responses.',
  },
]
