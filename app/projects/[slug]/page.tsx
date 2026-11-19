import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  ShieldCheck,
  FileCode,
  ArrowRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ArchitectureDiagram from '@/components/ui/ArchitectureDiagram';
import TenantIsolationSimulator from '@/components/ui/TenantIsolationSimulator';
import { CropMarks } from '@/components/primitives/CropMarks';
import { CASE_FILES, getProjectBySlug } from '@/content/projects';

export function generateStaticParams() {
  return CASE_FILES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getProjectBySlug(slug);
  if (!study) return {};

  const description = study.headline;
  return {
    title: `${study.title} Case Study`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${study.title} Case Study | Rajendra Bist`,
      description,
      url: `/projects/${slug}`,
      type: 'article',
      locale: 'en_IN',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${study.title} Architecture Case Study — Rajendra Bist`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} Case Study | Rajendra Bist`,
      description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getProjectBySlug(slug);
  if (!study) notFound();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: study.title,
      description: study.headline,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: study.links.live || undefined,
      codeRepository: study.links.code || undefined,
      author: {
        '@type': 'Person',
        name: 'Rajendra Bist',
        url: 'https://www.bistrajendra.com.np',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.bistrajendra.com.np',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Case Files',
          item: 'https://www.bistrajendra.com.np/projects',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${study.title} Case Study`,
          item: `https://www.bistrajendra.com.np/projects/${slug}`,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[--bg-page] py-28 sm:py-36 text-[--text-primary]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-4xl">
        {/* Navigation & Header */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-[--text-tertiary] transition-colors hover:text-[--accent] mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent] font-semibold">
            Case File // {study.slug}
          </p>
          <span
            className={`font-mono text-[11px] px-2 py-0.5 rounded-[--radius-control] border ${
              study.status === 'Live'
                ? 'border-[--status-live] text-[--status-live] bg-[--status-live-dim]'
                : 'border-[--accent] text-[--accent] bg-[--accent-dim]'
            }`}
          >
            {study.status === 'Live' ? '● Live Service' : '◐ In Development'}
          </span>
          <span className="font-mono text-[11px] text-[--text-tertiary]">
            {study.timeframe}
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          {study.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[--text-secondary] leading-relaxed">
          {study.headline}
        </p>

        {/* Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
          {study.links.live && (
            <a
              href={study.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[--radius-control] bg-[--accent] text-[--accent-ink] font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
            >
              <span>Live Application</span>
              <ExternalLink size={13} />
            </a>
          )}
          {study.links.code && (
            <a
              href={study.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
            >
              <Github size={13} />
              <span>Source Repository</span>
            </a>
          )}
        </div>

        {/* Problem & Constraints Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {study.problem && (
            <article className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold">
                The Problem
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[--text-secondary]">
                {study.problem}
              </p>
            </article>
          )}

          {study.constraints && study.constraints.length > 0 && (
            <article className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold">
                Core Constraints
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[--text-secondary] leading-relaxed">
                {study.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[--accent] font-mono text-xs mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>

        {/* What I Built */}
        <div className="mt-10 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold mb-4">
            What I Built · Core Deliverables
          </h2>
          <ul className="space-y-3 text-sm text-[--text-secondary] leading-relaxed">
            {study.builtBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[--accent] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Diagram */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
            System Architecture
          </h2>
          <ArchitectureDiagram
            architecture={study.architecture}
            projectTitle={study.title}
          />
        </section>

        {/* Key Architectural Decision Callout */}
        <div className="mt-10 rounded-[--radius-card] border border-[--border-strong] bg-[--bg-surface-2] p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[--accent] font-semibold uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Key Architectural Decision</span>
          </div>
          <h3 className="mt-3 text-base sm:text-lg font-bold text-[--text-primary]">
            {study.decision.title}
          </h3>
          <p className="mt-2 text-sm text-[--text-secondary] leading-relaxed">
            {study.decision.description}
          </p>
          <div className="mt-4 pt-3 border-t border-[--border-hairline] font-mono text-xs text-[--text-tertiary]">
            <span className="text-[--text-secondary] font-semibold">Trade-off: </span>
            {study.decision.tradeoff}
          </div>
        </div>

        {/* Sovereign Interactive Isolation Proof */}
        {study.slug === 'sovereign' && (
          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
              Interactive Isolation Proof
            </h2>
            <TenantIsolationSimulator />
          </section>
        )}

        {/* Frontend Implementation Note */}
        {study.frontendNote && (
          <div className="mt-10 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-[--text-primary] font-semibold mb-2">
              <FileCode size={16} className="text-[--accent]" />
              <span>Frontend Implementation Architecture</span>
            </div>
            <p className="text-[--text-secondary] leading-relaxed mb-3 font-sans text-sm">
              {study.frontendNote.summary}
            </p>
            <span className="text-[11px] text-[--text-tertiary] bg-[--bg-surface-2] px-2.5 py-1 rounded-[--radius-control] border border-[--border-hairline]">
              Source Component: {study.frontendNote.filePath}
            </span>
          </div>
        )}

        {/* Public Production Capture (Picture element) */}
        {study.screenshot && (
          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
              Live Capture
            </h2>
            <CropMarks size={14}>
              <div className="overflow-hidden rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2]">
                <div className="flex items-center justify-between border-b border-[--border-hairline] bg-[--bg-surface-3] px-4 py-2 text-xs font-mono text-[--text-tertiary]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                    <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                    <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                    <span className="ml-2 text-[11px] text-[--text-secondary] hidden sm:inline">
                      {study.links.live}
                    </span>
                  </div>
                  <span className="text-[10px]">Verified Public URL</span>
                </div>
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet={study.screenshot.mobileAvif}
                    type="image/avif"
                  />
                  <source
                    media="(max-width: 640px)"
                    srcSet={study.screenshot.mobileWebp}
                    type="image/webp"
                  />
                  <source srcSet={study.screenshot.desktopAvif} type="image/avif" />
                  <source srcSet={study.screenshot.desktopWebp} type="image/webp" />
                  <img
                    src={study.screenshot.desktopWebp}
                    alt={study.screenshot.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover max-h-[600px]"
                  />
                </picture>
              </div>
            </CropMarks>
          </section>
        )}

        {/* Verifiable Repository Evidence */}
        <section className="mt-12 pt-8 border-t border-[--border-hairline]">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold mb-4">
            Verifiable Repository Evidence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {study.evidence.map((ev) => (
              <div
                key={ev.label}
                className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-3 text-xs font-mono flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-[--text-tertiary] block mb-1">
                    {ev.label}
                  </span>
                  <span className="text-xs font-semibold text-[--text-primary] block leading-snug">
                    {ev.value}
                  </span>
                </div>
                <a
                  href={ev.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 pt-2 border-t border-[--border-hairline] text-[10px] text-[--accent] hover:underline inline-flex items-center gap-1 truncate"
                >
                  <span>Verify Source</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* What I Would Do Next */}
        {study.whatNext && study.whatNext.length > 0 && (
          <section className="mt-12 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold mb-3">
              Architectural Roadmap · Next Iterations
            </h2>
            <ul className="space-y-2.5 text-sm text-[--text-secondary] leading-relaxed">
              {study.whatNext.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ArrowRight size={14} className="text-[--accent] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </main>
  );
}
