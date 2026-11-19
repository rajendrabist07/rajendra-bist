import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';
import { CaseFileProject } from '@/content/projects/types';
import ArchitectureDiagram from './ArchitectureDiagram';
import { CropMarks } from '@/components/primitives/CropMarks';

export interface CaseFileProps {
  project: CaseFileProject;
}

export default function CaseFile({ project }: CaseFileProps) {
  const isLead = Boolean(project.isLead);

  return (
    <article
      id={`project-${project.slug}`}
      className={`relative rounded-[--radius-feature] border bg-[--bg-surface-1] p-6 sm:p-8 lg:p-10 transition-all hover:border-[--border-strong] ${
        isLead
          ? 'border-[--border-strong] shadow-2xl ring-1 ring-[--accent-dim]'
          : 'border-[--border-hairline] shadow-lg'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[--border-hairline]">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`font-mono text-xs px-2.5 py-1 rounded-[--radius-control] border ${
              project.status === 'Live'
                ? 'border-[--status-live] text-[--status-live] bg-[--status-live-dim] font-semibold'
                : 'border-[--accent] text-[--accent] bg-[--accent-dim] font-semibold'
            }`}
          >
            {project.status === 'Live' ? '● Live Service' : '◐ In Development'}
          </span>
          <h3
            className={`font-bold tracking-tight text-[--text-primary] ${
              isLead ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {project.title}
          </h3>
          {isLead && (
            <span className="font-mono text-[11px] text-[--accent] bg-[--accent-dim] px-2 py-0.5 rounded-[--radius-pill] border border-[--accent]">
              Primary Architecture Spec
            </span>
          )}
        </div>

        {/* Project External Links */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-primary] hover:border-[--border-strong] hover:text-[--accent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              aria-label={`Open live service for ${project.title}`}
            >
              <span>Live Site</span>
              <ExternalLink size={13} />
            </a>
          )}
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] hover:text-[--text-primary] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              aria-label={`View source code for ${project.title}`}
            >
              <Github size={13} />
              <span>Code</span>
            </a>
          )}
          <Link
            href={project.links.caseStudy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[--radius-control] bg-[--accent] text-[--accent-ink] font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
          >
            <span>Case Study</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Headline Outcome */}
      <p className="mt-6 text-base sm:text-lg text-[--text-secondary] leading-relaxed font-sans max-w-4xl">
        {project.headline}
      </p>

      {/* Grid: What I Built & Key Decision */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: What I Built (3 bullets) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold">
            What I Built · Core Deliverables
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[--text-secondary] leading-relaxed">
            {project.builtBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[--accent] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Frontend UI Note with Repo File Path */}
          {project.frontendNote && (
            <div className="mt-6 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2] p-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[--text-primary] font-semibold mb-1">
                <FileCode size={14} className="text-[--accent]" />
                <span>Frontend Implementation:</span>
              </div>
              <p className="text-[--text-secondary] leading-relaxed mb-2 font-sans">
                {project.frontendNote.summary}
              </p>
              <span className="text-[11px] text-[--text-tertiary] bg-[--bg-surface-3] px-2 py-0.5 rounded-[--radius-control] border border-[--border-hairline]">
                Source: {project.frontendNote.filePath}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Key Decision & Tradeoff */}
        <div className="lg:col-span-5 rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2] p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[--accent] font-semibold uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>Key Decision & Trade-Off</span>
          </div>

          <h5 className="text-sm font-bold text-[--text-primary] tracking-tight">
            {project.decision.title}
          </h5>

          <p className="text-xs text-[--text-secondary] leading-relaxed font-sans">
            {project.decision.description}
          </p>

          <div className="pt-3 border-t border-[--border-hairline] font-mono text-xs text-[--text-tertiary]">
            <span className="text-[--text-secondary] font-semibold">Trade-off: </span>
            {project.decision.tradeoff}
          </div>
        </div>
      </div>

      {/* Signature Architecture Diagram */}
      <div className="mt-10">
        <ArchitectureDiagram
          architecture={project.architecture}
          projectTitle={project.title}
        />
      </div>

      {/* Real Screenshot in Browser Viewfinder Frame */}
      {project.screenshot && (
        <div className="mt-10">
          <CropMarks size={14}>
            <div className="overflow-hidden rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2]">
              {/* Browser Mockup Chrome */}
              <div className="flex items-center justify-between border-b border-[--border-hairline] bg-[--bg-surface-3] px-4 py-2 text-xs font-mono text-[--text-tertiary]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                  <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                  <span className="w-2 h-2 rounded-full bg-[--border-strong]" />
                  <span className="ml-2 text-[11px] text-[--text-secondary] hidden sm:inline">
                    {project.links.live}
                  </span>
                </div>
                <span className="text-[10px]">Public Production Capture</span>
              </div>

              {/* Responsive Picture: WebP & AVIF */}
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet={project.screenshot.mobileAvif}
                  type="image/avif"
                />
                <source
                  media="(max-width: 640px)"
                  srcSet={project.screenshot.mobileWebp}
                  type="image/webp"
                />
                <source srcSet={project.screenshot.desktopAvif} type="image/avif" />
                <source srcSet={project.screenshot.desktopWebp} type="image/webp" />
                <img
                  src={project.screenshot.desktopWebp}
                  alt={project.screenshot.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </picture>
            </div>
          </CropMarks>
        </div>
      )}

      {/* Measurable Evidence Strip (Auto-fit grid, no orphan cells) */}
      <div className="mt-8 pt-6 border-t border-[--border-hairline]">
        <h4 className="font-mono text-xs uppercase tracking-wider text-[--accent] font-semibold mb-3">
          Verifiable Repository Evidence
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {project.evidence.map((ev) => (
            <div
              key={ev.label}
              className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2] p-3 text-xs font-mono flex flex-col justify-between"
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
      </div>
    </article>
  );
}
