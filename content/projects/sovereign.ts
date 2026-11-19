import { CaseFileProject } from './types';

export const SOVEREIGN_PROJECT: CaseFileProject = {
  slug: 'sovereign',
  title: 'Sovereign',
  status: 'In Development',
  timeframe: '2026',
  isLead: true, // Leads the section and is visibly larger
  headline:
    'Multi-tenant B2B workflow platform where organizations define autonomous AI agents with fail-closed database isolation.',
  summary:
    'A multi-tenant B2B SaaS platform in a Turborepo monorepo where organizations define autonomous AI workflow agents with PostgreSQL Row-Level Security tenant isolation and Inngest durable orchestration.',
  problem:
    'Multi-tenant AI SaaS platforms often rely on leaky application-level tenant filters and fragile, stateless LLM executions that fail silently or leak confidential data across organizational boundaries.',
  constraints: [
    'Tenant isolation must be mathematically guaranteed at the database layer with PostgreSQL RLS.',
    'Agent workflows must be durable, resumable, and support human-in-the-loop approvals before high-risk actions.',
    'LLM tool outputs must be schema-validated before modifying persistent state.',
  ],
  whatNext: [
    'Fine-grained per-tool execution quotas and rate limiting per tenant tier.',
    'Self-hosted Ollama runner fallback for zero-external-API enterprise deployments.',
    'End-to-end cryptographic proof verification for immutable audit log entries.',
  ],
  builtBullets: [
    'PostgreSQL Row-Level Security architecture enforcing fail-closed tenant isolation at the database layer across all tables.',
    'Durable workflow execution with Inngest step functions and human-in-the-loop approvals that pause runs until authorized in the UI.',
    'Append-only immutable audit logging enforced by database migration revoking UPDATE and DELETE capabilities.',
  ],
  decision: {
    title: 'Database-Level Isolation Over Application-Level Filters',
    description:
      'Enforced multi-tenant isolation directly in PostgreSQL via FORCE ROW LEVEL SECURITY and session variables rather than relying on WHERE tenant_id clauses in ORM queries.',
    tradeoff:
      'Guarantees zero tenant cross-talk even if application code has a bug, at the cost of managing database session context on pooled connections.',
  },
  frontendNote: {
    summary:
      'Human-in-the-loop workflow approvals interface with execution inspection, reviewer actions, and run history.',
    filePath: 'apps/web/app/(app)/approvals/page.tsx',
  },
  evidence: [
    {
      label: 'Database Isolation (RLS)',
      value: 'PostgreSQL RLS with fail-closed tenant policies',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/packages/db/prisma/migrations/20261002111243_enable_rls/migration.sql',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Workflow Approvals UI',
      value: 'Human-in-the-loop review routes & components',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/app/(app)/approvals/page.tsx',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Audit Log Immutability',
      value: 'Revoked UPDATE and DELETE on audit log tables',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/packages/db/prisma/migrations/20261010104804_audit_log_revoke_update_delete/migration.sql',
      verifiedOn: '2026-11-19',
    },
    {
      label: 'Monorepo Architecture',
      value: 'Turborepo workspace with web, db, and shared packages',
      source:
        'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
      verifiedOn: '2026-11-19',
    },
  ],
  links: {
    live: 'https://sovereign-saas-platform.vercel.app/',
    code: 'https://github.com/rajendrabist07/sovereign',
    caseStudy: '/projects/sovereign',
  },
  stack: ['Next.js 15', 'React', 'TypeScript', 'PostgreSQL (RLS)', 'Prisma', 'Inngest', 'Turborepo'],
  screenshot: {
    desktopWebp: '/images/projects/sovereign/desktop.webp',
    desktopAvif: '/images/projects/sovereign/desktop.avif',
    mobileWebp: '/images/projects/sovereign/mobile.webp',
    mobileAvif: '/images/projects/sovereign/mobile.avif',
    alt: 'Sovereign multi-tenant B2B workflow SaaS landing interface',
  },
  architecture: {
    title: 'Architecture (simplified)',
    flowDescription:
      'Browser Client → tRPC API → Inngest Durable Execution → Prisma Client → PostgreSQL (Row-Level Security) → Immutable Audit Log',
    requestPath: [
      'Browser: User triggers workflow execution via tRPC client query.',
      'Next.js 15: Validates organization session context and dispatches to Inngest.',
      'Inngest: Executes durable step function, pausing at human approval step if configured.',
      'Prisma: Connects with tenant session context set in database connection.',
      'PostgreSQL: Enforces fail-closed Row-Level Security policies before reading or writing data.',
      'Audit Log: Migration revokes UPDATE and DELETE; changes written to append-only log.',
    ],
    nodes: [
      { id: 'browser', label: 'Browser Client', sublabel: 'Next.js 15 App Router', type: 'client', tooltip: 'React 19 interface with tRPC query hooks', x: 8, y: 35 },
      { id: 'trpc', label: 'tRPC API Router', sublabel: 'Type-safe endpoints', type: 'service', tooltip: 'App Router API handlers validating input schemas', x: 28, y: 35 },
      { id: 'inngest', label: 'Inngest Workflow', sublabel: 'Durable execution', type: 'queue', tooltip: 'Resumable step functions with human approval gates', x: 50, y: 35 },
      { id: 'prisma', label: 'Prisma Client', sublabel: 'ORM & Session Pool', type: 'service', tooltip: 'Session-aware connection management', x: 72, y: 35 },
      { id: 'postgres', label: 'PostgreSQL RLS', sublabel: 'Tenant isolation', type: 'database', tooltip: 'Enforces fail-closed FORCE ROW LEVEL SECURITY', x: 92, y: 35 },
      { id: 'audit', label: 'Audit Log', sublabel: 'Append-only storage', type: 'database', tooltip: 'UPDATE & DELETE revoked by database migration', x: 92, y: 80 },
    ],
    edges: [
      { from: 'browser', to: 'trpc', label: 'tRPC' },
      { from: 'trpc', to: 'inngest', label: 'Dispatch' },
      { from: 'inngest', to: 'prisma', label: 'Execute' },
      { from: 'prisma', to: 'postgres', label: 'SQL (RLS)' },
      { from: 'postgres', to: 'audit', label: 'Append', dashed: true },
    ],
  },
};
