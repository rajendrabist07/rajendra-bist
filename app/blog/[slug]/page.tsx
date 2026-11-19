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
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Rajendra Bist`,
      description: post.description,
      url: `/blog/${slug}`,
      type: "article",
      locale: "en_IN",
      publishedTime: post.date,
      authors: ["Rajendra Bist"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${post.title} — Engineering Note by Rajendra Bist`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Rajendra Bist`,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
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

  const jsonLd = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.bistrajendra.com.np",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Engineering Notes",
          item: "https://www.bistrajendra.com.np/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://www.bistrajendra.com.np/blog/${slug}`,
        },
      ],
    },
  ];

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
