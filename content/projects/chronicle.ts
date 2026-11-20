import { CaseFileProject } from './types';

export const CHRONICLE_PROJECT: CaseFileProject = {
  slug: 'chronicle',
  title: 'Chronicle',
  status: 'Live',
  timeframe: '2026',
  isLead: false,
  headline:
    'Two-service content publishing platform with server-rendered public pages, on-demand ISR, and schema-validated AI tooling.',
  summary:
    'A two-service technical publishing platform combining server-rendered public pages, email-verified accounts, boot-time Prisma migrations, and schema-validated Gemini AI writing assistance.',
  problem:
    'Technical publishing platforms require verified accounts, abuse resistance, schema-validated AI tooling, and server-rendered public pages to maintain editorial trust and search visibility.',
  constraints: [
    'Free-tier hosting requires resilient cold-start handling and boot-time migrations.',
    'LLM structured outputs can be malformed and must be schema-validated before reaching the editor.',
    'Transactional email delivery must not block or crash core HTTP request paths.',
  ],
  whatNext: [
    'Collaborative real-time editing via CRDTs (Yjs) with awareness presence.',
    'Custom domain routing with automated SSL provisioning per publication.',
    'Semantic vector search across published technical articles using pgvector.',
  ],
  builtBullets: [
    'Two-service architecture with Next.js App Router on Vercel and Express REST API backend with JWT authentication.',
    'Schema-validated Gemini AI integration operating in JSON mode with Zod runtime verification on all outputs.',
    'Automated testing pipeline with 22 Vitest test files covering authentication flows, claims, and validation contracts.',
  ],
  decision: {
    title: 'Fail-Safe Schema Validation on AI Outputs',
    description:
      'All AI generation runs in structured JSON mode and passes through strict Zod validators before being ingested into the editor state.',
    tradeoff:
      'Guarantees invalid AI output returns a clean user-facing error and never corrupts editor state, but requires explicit schema handling for partial streaming.',
  },
  frontendNote: {
    summary:
      'Public reading experience with sanitized Markdown, interactive comprehension quiz, and in-article AI assistant.',
    filePath: 'app/components/reading/ArticleReaderView.tsx',
  },
  evidence: [
    {
      label: 'Automated Test Suite',
      value: '22 test files (SSR, auth, claims, validation)',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/__tests__/validation.test.ts',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Continuous Integration',
      value: 'GitHub Actions lint, typecheck & Vitest workflow',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/.github/workflows/ci.yml',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Grounded AI Reader',
      value: 'In-article AI assistant with source-referenced responses',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/app/components/reading/AskThisArticle.tsx',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Sanitized Markdown Editor',
      value: 'Rehype-sanitized rich preview editor',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/app/components/editor/MarkdownEditor.tsx',
      verifiedOn: '2026-11-19',
    },
  ],
  links: {
    live: 'https://chronicle-platform.vercel.app/',
    code: 'https://github.com/rajendrabist07/chronicle.git',
    caseStudy: '/projects/chronicle',
  },
  stack: ['Next.js', 'React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Gemini AI', 'Vitest'],
  screenshot: {
    desktopWebp: '/images/projects/chronicle/desktop.webp',
    desktopAvif: '/images/projects/chronicle/desktop.avif',
    mobileWebp: '/images/projects/chronicle/mobile.webp',
    mobileAvif: '/images/projects/chronicle/mobile.avif',
    alt: 'Chronicle technical content and publishing platform reading interface',
  },
  architecture: {
    title: 'Architecture (simplified)',
    flowDescription:
      'Browser Client → Next.js (Vercel ISR) → Express REST API (Render) → Gemini AI → Zod Validation → PostgreSQL Database',
    requestPath: [
      'Browser: Reader requests public article or writer edits draft.',
      'Next.js 15: Serves ISR-cached public reading page or routes editor actions.',
      'Express REST API: Authenticates JWT token and processes CRUD requests.',
      'Gemini AI: Generates writing suggestions and article quizzes in structured JSON mode.',
      'Zod Validation: Runtime schema boundary verifies output integrity.',
      'PostgreSQL: Persists article records and discussion state via Prisma ORM.',
    ],
    nodes: [
      { id: 'browser', label: 'Browser Client', sublabel: 'Reader & Editor', type: 'client', tooltip: 'Next.js frontend with markdown preview and quiz components', x: 8, y: 35 },
      { id: 'nextjs', label: 'Next.js 15', sublabel: 'Vercel ISR & SSR', type: 'service', tooltip: 'On-demand revalidation for public articles', x: 26, y: 35 },
      { id: 'express', label: 'Express API', sublabel: 'Node.js Backend', type: 'service', tooltip: 'REST API with JWT authentication and rate limiting', x: 46, y: 35 },
      { id: 'gemini', label: 'Gemini AI', sublabel: 'Structured JSON', type: 'ai', tooltip: 'Assistant generating structured content', x: 66, y: 35 },
      { id: 'zod', label: 'Zod Validator', sublabel: 'Contract Boundary', type: 'service', tooltip: 'Fails closed if AI output violates schema', x: 82, y: 35 },
      { id: 'postgres', label: 'PostgreSQL DB', sublabel: 'Neon / Prisma', type: 'database', tooltip: 'Database holding articles, users, and tags', x: 95, y: 35 },
    ],
    edges: [
      { from: 'browser', to: 'nextjs', label: 'HTTPS' },
      { from: 'nextjs', to: 'express', label: 'JWT REST' },
      { from: 'express', to: 'gemini', label: 'Prompt' },
      { from: 'gemini', to: 'zod', label: 'Verify' },
      { from: 'zod', to: 'postgres', label: 'Save' },
    ],
  },
};
