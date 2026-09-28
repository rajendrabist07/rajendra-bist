import Link from "next/link";
import Container from "@/components/ui/Container";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata = {
  title: "Projects",
  description: "Engineering case studies by Rajendra Bist.",
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-[--bg-void] py-32 text-[--text-primary]">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent-warm]">
          Projects // Case studies
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Systems built around real constraints.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/projects/${study.slug}`}
              className="surface-panel rounded-xl p-6 transition-transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold">{study.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[--text-secondary]">
                {study.summary}
              </p>
              <span className="mt-6 inline-block font-mono text-xs text-[--accent-warm]">
                Read case study -&gt;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
