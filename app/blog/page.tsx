import Link from "next/link";
import Container from "@/components/ui/Container";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata = {
  title: "Engineering Notes",
  description: "Engineering notes on backend systems and applied AI.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[--bg-void] py-32 text-[--text-primary]">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent-warm]">
          Notes // Engineering
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Backend and AI systems, explained plainly.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="surface-panel rounded-xl p-6 hover:border-[--border-strong]"
            >
              <p className="font-mono text-xs text-[--text-tertiary]">
                {post.date} // {post.readingTime}
              </p>
              <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[--text-secondary]">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
