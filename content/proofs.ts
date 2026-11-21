export interface SkillProof {
  name: string;
  tier: 'Core' | 'Working';
  proofUrl: string;
  regex: string;
}

export interface ClaimProof {
  name: string;
  claim: string;
  proofUrl: string;
  regex: string;
}

export const SKILL_PROOFS: SkillProof[] = [
  // Core (8 technologies verified across shipped production applications)
  {
    name: 'TypeScript',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
    regex: '"typescript":\\s*"\\^?5',
  },
  {
    name: 'Node.js',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/package.json',
    regex: '"node":\\s*">=22',
  },
  {
    name: 'PostgreSQL',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/packages/db/prisma/migrations/20261002111243_enable_rls/migration.sql',
    regex: 'ENABLE ROW LEVEL SECURITY',
  },
  {
    name: 'Next.js',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
    regex: '"next":\\s*"16',
  },
  {
    name: 'React',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
    regex: '"react":\\s*"19',
  },
  {
    name: 'Prisma ORM',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/package.json',
    regex: '"@prisma/client":\\s*"\\^?6',
  },
  {
    name: 'Zod',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/validation/schemas.ts',
    regex: 'z\\.object\\(\\{',
  },
  {
    name: 'Express.js',
    tier: 'Core',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/package.json',
    regex: '"express":\\s*"\\^?5',
  },

  // Working (8 technologies verified in shipped projects and active repository)
  {
    name: 'Tailwind CSS',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
    regex: '"tailwindcss":\\s*"\\^?4',
  },
  {
    name: 'Inngest',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
    regex: '"inngest":\\s*"\\^?4',
  },
  {
    name: 'Upstash Redis',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/package.json',
    regex: '"@upstash/ratelimit":',
  },
  {
    name: 'Supabase',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/package.json',
    regex: '"@supabase/supabase-js":',
  },
  {
    name: 'Vitest',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
    regex: '"vitest":',
  },
  {
    name: 'GitHub Actions',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/.github/workflows/ci.yml',
    regex: 'uses:\\s*actions/checkout@v4',
  },
  {
    name: 'Turborepo',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/package.json',
    regex: '"turbo":\\s*"\\^?2',
  },
  {
    name: 'Framer Motion',
    tier: 'Working',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/rajendra-bist/main/package.json',
    regex: '"framer-motion":',
  },
];

export const ARCHITECTURAL_CLAIMS: ClaimProof[] = [
  {
    name: 'Sovereign: Human Approval Wait',
    claim: 'Workflow execution sleeps durably awaiting manual human approval decision event with timeout',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/inngest/run-workflow.ts',
    regex: 'step\\.waitForEvent\\(`step-\\$\\{i\\}-wait`',
  },
  {
    name: 'Sovereign: Agent Tool Loop',
    claim: 'Iterative tool execution loop bounded by maximum step iterations with JSON validation',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/lib/agent/executor.ts',
    regex: 'for \\(let iteration = 1; iteration <= limits\\.maxIterations; iteration\\+\\+\\)',
  },
  {
    name: 'Sovereign: Hard Timeouts / Limits',
    claim: 'Explicit bounded agent resource limits (max iterations, max total tokens, max tool calls per turn)',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/lib/agent/executor.ts',
    regex: 'export const DEFAULT_LIMITS: AgentLimits =',
  },
  {
    name: 'Sovereign: Untrusted-Input Wrapper',
    claim: 'Outside data sanitization and boundary tagging to isolate instructions from untrusted data',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/lib/agent/untrusted.ts',
    regex: 'export function wrapUntrusted\\(',
  },
];
