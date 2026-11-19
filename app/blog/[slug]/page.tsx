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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Rajendra Bist",
      url: "https://www.bistrajendra.com.np",
    },
    publisher: {
      "@type": "Person",
      name: "Rajendra Bist",
    },
  };

  return (
    <main className="min-h-screen bg-[--bg-page] py-32 text-[--text-primary]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-[--text-tertiary] transition-colors hover:text-[--accent] mb-6"
        >
          <ArrowLeft size={14} />
          Back to Notes
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent]">
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
