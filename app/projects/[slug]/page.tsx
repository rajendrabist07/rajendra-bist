import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return study ? { title: study.title, description: study.summary } : {};
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-[--bg-void] py-32 text-[--text-primary]">
      <Container className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent-warm]">
          Case study // {study.slug}
        </p>
        <h1 className="mt-5 text-4xl font-semibold md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[--text-secondary]">
          {study.summary}
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article>
            <h2 className="text-2xl font-semibold">Problem</h2>
            <p className="mt-3 leading-8 text-[--text-secondary]">
              {study.problem}
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold">Constraints</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[--text-secondary]">
              {study.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Architecture</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[--border-subtle] bg-[--bg-surface-2] p-5 font-mono text-sm leading-7 text-[--accent-warm]">
            {study.architecture}
          </pre>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Data model</h2>
          <p className="mt-3 leading-8 text-[--text-secondary]">
            {study.dataModel}
          </p>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Key decisions and trade-offs
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[--text-secondary]">
            {study.decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Failure modes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[--text-secondary]">
            {study.failureModes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-12 grid gap-10 md:grid-cols-2">
          <article>
            <h2 className="text-2xl font-semibold">Result</h2>
            <p className="mt-3 leading-8 text-[--text-secondary]">
              {study.result}
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold">Lesson learned</h2>
            <p className="mt-3 leading-8 text-[--text-secondary]">
              {study.lessons}
            </p>
          </article>
        </section>
      </Container>
    </main>
  );
}
