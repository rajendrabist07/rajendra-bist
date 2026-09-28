import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { BLOG_POSTS } from '@/lib/blog'
import { CASE_STUDIES } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    { url: `${SITE_URL}/projects`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    ...CASE_STUDIES.map((study) => ({ url: `${SITE_URL}/projects/${study.slug}`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${SITE_URL}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: new Date(`${post.date}T00:00:00Z`), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
