import { CaseFileProject } from './types';

export const DEVGUARD_PROJECT: CaseFileProject = {
  slug: 'devguard-ai',
  title: 'DevGuard AI',
  status: 'Live',
  timeframe: 'Jul 2026 – Aug 2026',
  isLead: false,
  headline:
    'Automated GitHub PR review agent combining AST security checks, CVE scans, and a 3-tier resilient model router.',
  summary:
    'An autonomous GitHub review agent combining deterministic AST security linting, OSV.dev CVE database checks, and a 3-tier model router to produce verified pull request feedback.',
  problem:
    'Automated code review relying solely on single-shot LLM prompts on raw diffs produces unverified comments. Collecting deterministic static analysis, AST linting, and dependency vulnerability scans prior to inference grounds findings in concrete repository evidence.',
  constraints: [
    'GitHub webhook delivery must be verified with HMAC SHA-256 signatures.',
    'External model providers can rate-limit or fail, requiring resilient multi-provider fallback.',
    'Review output must remain strictly tied to collected repository evidence.',
  ],
  whatNext: [
    'Custom organizational rule packs authored in Rego/OPA for enterprise policy compliance.',
    'PR comment threading with interactive review suggestion acceptance directly on GitHub.',
    'Local tree-sitter AST parser compiled to WebAssembly for sub-100ms local developer reviews.',
  ],
  builtBullets: [
    'GitHub App webhook service validating HMAC-SHA256 signatures with replay protection before queuing review execution.',
    'Three-path model fallback router (Groq Llama 3.3 → Gemini 2.5 Flash → AST rule engine) with strict timeout budgets.',
    'AST security linting and OSV.dev CVE scanning engine posting inline comments and annotations via GitHub Checks API.',
  ],
  decision: {
    title: 'Static Analysis Before LLM Generation',
    description:
      'Structured the analysis so static AST and CVE checks run first; the LLM is only invoked to explain and contextualize findings rather than detect them from raw text.',
    tradeoff:
      'Guarantees high-severity vulnerabilities are never hallucinated or dropped during provider outages, but requires maintaining static security rules.',
  },
  frontendNote: {
    summary:
      'Agent telemetry dashboard displaying live tool-calling steps, PR review simulation, and security findings.',
    filePath: 'app/dashboard/page.tsx',
  },
  evidence: [
    {
      label: 'Model Failover Router',
      value: '3-tier router (Groq -> Gemini -> AST rules)',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/agent/router.ts',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Runtime Schema Validation',
      value: 'Zod schemas for webhook payloads and findings',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/validation/schemas.ts',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Automated Eval Runner',
      value: 'Offline evaluation benchmark suite',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/evals/run-eval.ts',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Webhook Signature Auth',
      value: 'HMAC verification suite with replay defense',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/__tests__/github/webhook-verify.test.ts',
      verifiedOn: '2026-11-19',
    },
  ],
  links: {
    live: 'https://dev-guard-ai.vercel.app/',
    code: 'https://github.com/rajendrabist07/dev-guard-ai',
    caseStudy: '/projects/devguard-ai',
  },
  stack: ['Next.js 15', 'TypeScript', 'Groq', 'Gemini Flash', 'Upstash Redis', 'Supabase', 'GitHub API'],
  screenshot: {
    desktopWebp: '/images/projects/devguard-ai/desktop.webp',
    desktopAvif: '/images/projects/devguard-ai/desktop.avif',
    mobileWebp: '/images/projects/devguard-ai/mobile.webp',
    mobileAvif: '/images/projects/devguard-ai/mobile.avif',
    alt: 'DevGuard AI automated pull request review and security intelligence platform',
  },
  architecture: {
    title: 'Architecture (simplified)',
    flowDescription:
      'GitHub Webhook → HMAC Verification → Upstash Redis Rate Limiter → AST & CVE Scanner → Model Router (Groq/Gemini/Rules) → GitHub Checks API',
    requestPath: [
      'GitHub Webhook: PR opened or synchronized event received.',
      'HMAC Signature: Validates sha256 signature against webhook secret.',
      'Upstash Redis: Enforces token-bucket rate limits per installation.',
      'AST & CVE Engine: Runs static linting and queries OSV.dev vulnerability database.',
      'Model Router: 3-tier fallback routing (Groq → Gemini → rule engine) formats explanation.',
      'Checks API: Severity-tagged findings posted directly as inline code review comments.',
    ],
    nodes: [
      { id: 'github', label: 'GitHub Webhook', sublabel: 'PR Event', type: 'service', tooltip: 'GitHub App event delivered via HTTPS POST', x: 8, y: 35 },
      { id: 'hmac', label: 'HMAC Validator', sublabel: 'Sha256 Auth', type: 'auth', tooltip: 'Timing-safe signature verification & replay defense', x: 26, y: 35 },
      { id: 'redis', label: 'Upstash Redis', sublabel: 'Rate Limiting', type: 'database', tooltip: 'Token-bucket rate limiter per installation', x: 44, y: 35 },
      { id: 'ast', label: 'AST & CVE Engine', sublabel: 'Static Analysis', type: 'service', tooltip: 'Deterministic linting and vulnerability scanning', x: 62, y: 35 },
      { id: 'router', label: 'Model Router', sublabel: '3-tier Failover', type: 'ai', tooltip: 'Groq Llama 3.3 → Gemini 2.5 Flash → AST rules', x: 80, y: 35 },
      { id: 'checks', label: 'Checks API', sublabel: 'Inline Comments', type: 'client', tooltip: 'Severity-tagged review annotations on PR diff', x: 95, y: 35 },
    ],
    edges: [
      { from: 'github', to: 'hmac', label: 'POST' },
      { from: 'hmac', to: 'redis', label: 'Check' },
      { from: 'redis', to: 'ast', label: 'Scan' },
      { from: 'ast', to: 'router', label: 'Findings' },
      { from: 'router', to: 'checks', label: 'Review' },
    ],
  },
};
