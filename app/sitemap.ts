import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

const lastModified = new Date('2026-08-26')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/Resume/resume.pdf`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
