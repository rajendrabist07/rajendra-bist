import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import IdentityBlock from '@/components/ui/IdentityBlock';
import { getIdentityBlockHtml } from '@/lib/shiki-highlight';
import { Database, ShieldCheck, CheckCircle2, CloudLightning } from 'lucide-react';

const ENGINEERING_STEPS = [
  {
    number: '01',
    title: 'Schema & Migrations',
    description: 'PostgreSQL RLS modeling with Prisma; zero-drift migrations run before app boot.',
    evidence: 'Chronicle prisma/migrations · Sovereign enable_rls',
    icon: Database,
  },
  {
    number: '02',
    title: 'Contract Validation',
    description: 'Runtime Zod schemas enforce boundaries on all REST inputs and tool-calling agent outputs.',
    evidence: 'DevGuard lib/schemas · Chronicle api/validators',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Automated CI Gates',
    description: 'Vitest unit & integration test suites, linting, and GitHub Actions CI blocking regressions.',
    evidence: 'DevGuard evals/run-eval · Chronicle vitest suite',
    icon: CheckCircle2,
  },
  {
    number: '04',
    title: 'Resilient Deployment',
    description: 'Multi-provider model fallback router and graceful degradation across Vercel and Render.',
    evidence: 'DevGuard router.ts (Groq → Gemini → rules)',
    icon: CloudLightning,
  },
];

export default async function About() {
  const { html, code } = await getIdentityBlockHtml();

  return (
    <section id="about" className="relative py-20 md:py-28 border-b border-[--border-hairline]">
      <Container>
        <SectionHeader
          eyebrow="ENGINEERING PHILOSOPHY & CAPABILITY"
          title="Building Systems from Schema to Deployment"
          description="Focusing on contract integrity, verifiable tenant boundaries, and failure resilience."
        />

        {/* Two-Column About Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 3 Narrative Paragraphs (<= 68ch) */}
          <div className="lg:col-span-6 space-y-6 max-w-[68ch] text-[--text-secondary] text-base sm:text-lg leading-relaxed font-sans">
            <p>
              I&apos;m a full-stack developer in New Delhi who builds complete web applications:
              database schema, API, authentication, interface and deployment. My daily stack is{' '}
              <strong className="text-[--text-primary] font-semibold">
                Node.js, TypeScript, PostgreSQL, Next.js and React
              </strong>
              .
            </p>

            <p>
              I learn by building, alongside a Diploma in IT. Since July 2026 I have shipped{' '}
              <strong className="text-[--text-primary] font-semibold">DevGuard AI</strong>, a GitHub App
              that reviews pull requests, and{' '}
              <strong className="text-[--text-primary] font-semibold">Chronicle</strong>, a publishing
              platform with AI writing tools.{' '}
              <strong className="text-[--text-primary] font-semibold">Sovereign</strong>, a
              multi-tenant SaaS for AI workflow agents, is in active development.
            </p>

            <p>
              I care about the parts that break: input validation, safe database migrations, and what an
              app does when a service fails. I&apos;m available immediately in Delhi NCR or remote, and I can
              work in India without sponsorship under the 1950 Indo-Nepal Treaty.
            </p>
          </div>

          {/* Right Column: Sticky Identity Block (Build-time Shiki highlighted) */}
          <div className="lg:col-span-6 sticky top-24">
            <IdentityBlock highlightedHtml={html} rawCode={code} />
          </div>
        </div>

        {/* Process / Engineering Systems Compact Strip */}
        <div id="process" className="mt-20 pt-12 border-t border-[--border-hairline]">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[--accent] font-semibold">
              Delivery Sequence · Engineering Discipline
            </h3>
            <span className="text-xs font-mono text-[--text-tertiary]">
              Practices verified across shipped project repositories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGINEERING_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-5 flex flex-col justify-between transition-colors hover:border-[--border-strong] group"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-3">
                      <span className="font-bold text-[--accent]">{step.number}</span>
                      <Icon size={16} className="text-[--text-tertiary] group-hover:text-[--accent] transition-colors" />
                    </div>
                    <h4 className="text-sm font-semibold text-[--text-primary] mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[--text-secondary] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[--border-hairline] font-mono text-[10px] text-[--text-tertiary]">
                    {step.evidence}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
