import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { Award, GraduationCap, Calendar, ExternalLink, CheckCircle } from 'lucide-react';

interface CredentialItem {
  title: string;
  institution: string;
  timeframe: string;
  type: string;
  description: string;
  verifyUrl?: string;
  assumptionNote?: string;
  icon: typeof Award;
}

const CREDENTIAL_CARDS: CredentialItem[] = [
  {
    title: 'Diploma in IT (Full-Stack Web Dev)',
    institution: 'Vcare Technical Institute',
    timeframe: '2025 – 2026',
    type: 'Practical Engineering Diploma',
    description:
      'Structured technical training covering REST API engineering, database schema design with MongoDB and PostgreSQL, JWT auth flows, and deployment.',
    icon: GraduationCap,
  },
  {
    title: 'Full-Stack Web Development Certificate',
    institution: 'Professional Engineering Training',
    timeframe: '2025 – 2026',
    type: 'Certificate of Completion',
    description:
      'Verified completion of practical full-stack web engineering curriculum with hands-on application delivery.',
    verifyUrl: 'https://drive.google.com/file/d/1nRuMQefR-kxjTr32fHj0uK2v78Hy8FE1/view',
    assumptionNote: 'Issuer assumed as Vcare Technical Institute training partner per owner document record.',
    icon: Award,
  },
  {
    title: 'Higher Secondary (+2 Science)',
    institution: 'Kailali Multiple Campus · Nepal',
    timeframe: '2022',
    type: 'Class XII Science Equivalent',
    description:
      'Academic foundation in Physics, Chemistry, and Advanced Mathematics under the National Examination Board of Nepal.',
    icon: GraduationCap,
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="relative py-20 md:py-28 border-b border-[--border-hairline]">
      <Container>
        <SectionHeader
          eyebrow="CREDENTIALS & ACADEMIC FOUNDATION"
          title="Education & Certifications"
          description="Formal diplomas, verified certificates, and foundational mathematics and science."
        />

        {/* 3-Card Auto-Fit Grid: Exactly 3 items across 1 col (mobile) or 3 cols (desktop) -> 0 Orphan Cells */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREDENTIAL_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-6 flex flex-col justify-between transition-all hover:border-[--border-strong] focus-within:ring-2 focus-within:ring-[--focus-ring]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[--radius-control] bg-[--bg-surface-2] border border-[--border-hairline] text-[--accent]">
                      <Icon size={18} />
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[--text-tertiary] bg-[--bg-surface-2] px-2.5 py-1 rounded-[--radius-control]">
                      <Calendar size={11} />
                      {card.timeframe}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-[--accent] font-semibold">
                    {card.type}
                  </span>

                  <h3 className="text-base font-bold text-[--text-primary] tracking-tight mt-1 mb-1">
                    {card.title}
                  </h3>

                  <div className="text-xs font-mono text-[--text-secondary] mb-3">
                    {card.institution}
                  </div>

                  <p className="text-xs text-[--text-secondary] leading-relaxed">
                    {card.description}
                  </p>

                  {card.assumptionNote && (
                    <div className="mt-3 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] p-2.5 font-mono text-[10px] text-[--text-tertiary] leading-relaxed">
                      ⚠️ Note: {card.assumptionNote}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[--border-hairline]">
                  {card.verifyUrl ? (
                    <a
                      href={card.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[--accent] hover:underline focus:outline-none"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[--status-live]">
                      <CheckCircle size={12} />
                      <span>Verified Record</span>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
