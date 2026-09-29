import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import { BLOG_POSTS } from "@/lib/blog";
import { renderBlogPost } from "@/lib/blog-content";

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${slug}` },
      }
    : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();
  const html = await renderBlogPost(slug);

  return (
    <main className="min-h-screen bg-[--bg-void] py-32 text-[--text-primary]">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-[--text-tertiary] transition-colors hover:text-[--accent-warm] mb-6"
        >
          <ArrowLeft size={14} />
          Back to Notes
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent-warm]">
          Engineering note // {post.date}
        </p>
        <article
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </main>
  );
}
