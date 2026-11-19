import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { CASE_FILES } from "@/content/projects";

export const metadata = {
  title: "Projects | Rajendra Bist",
  description: "Production system case files, architecture specifications, and verified repository evidence.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Rajendra Bist",
    description: "Production system case files, architecture specifications, and verified repository evidence.",
    url: "/projects",
    locale: "en_IN",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-[--bg-page] py-28 sm:py-36 text-[--text-primary]">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[--text-tertiary] transition-colors hover:text-[--accent] mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
        >
          <ArrowLeft size={14} />
          Back to Overview
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent] font-semibold">
          Case Files // Shipped Systems
        </p>
        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Systems built around real constraints.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[--text-secondary] max-w-2xl leading-relaxed">
          Detailed technical specifications, interactive architecture diagrams, decisions, and verifiable repository evidence.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_FILES.map((study) => (
            <Link
              key={study.slug}
              href={`/projects/${study.slug}`}
              className="group flex flex-col justify-between rounded-[--radius-feature] border border-[--border-hairline] bg-[--bg-surface-1] p-6 transition-all hover:border-[--border-strong] hover:bg-[--bg-surface-2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-[--radius-control] border ${
                      study.status === 'Live'
                        ? 'border-[--status-live] text-[--status-live] bg-[--status-live-dim]'
                        : 'border-[--accent] text-[--accent] bg-[--accent-dim]'
                    }`}
                  >
                    {study.status === 'Live' ? '● Live' : '◐ In Dev'}
                  </span>
                  <span className="font-mono text-[11px] text-[--text-tertiary]">{study.timeframe}</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-[--text-primary] group-hover:text-[--accent] transition-colors">
                  {study.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[--text-secondary]">
                  {study.headline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[--border-hairline] flex items-center justify-between font-mono text-xs text-[--accent]">
                <span>Read case file</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
