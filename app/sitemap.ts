import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { BLOG_POSTS } from '@/lib/blog'

const PROJECT_DATES: Record<string, string> = {
  sovereign: '2026-10-15T00:00:00Z',
  chronicle: '2026-09-29T00:00:00Z',
  'devguard-ai': '2026-08-20T00:00:00Z',
}

const PUBLIC_PROJECT_SLUGS = ['sovereign', 'devguard-ai', 'chronicle'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Real dates derived from verified repository milestones and publication dates
  const homeLastModified = new Date('2026-11-19T12:00:00Z')
  const projectsIndexLastModified = new Date('2026-10-15T00:00:00Z')
  const blogIndexLastModified = new Date('2026-09-29T00:00:00Z')

  return [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: projectsIndexLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...PUBLIC_PROJECT_SLUGS.map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: new Date(PROJECT_DATES[slug] || '2026-09-01T00:00:00Z'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
