import { BLOG_POSTS } from '@/lib/blog'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site-config'

export function GET() {
    const items = BLOG_POSTS.map((post) => `<item><title><![CDATA[${post.title}]]></title><link>${SITE_URL}/blog/${post.slug}</link><guid>${SITE_URL}/blog/${post.slug}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description><![CDATA[${post.description}]]></description></item>`).join('')
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME} Engineering Notes</title><link>${SITE_URL}/blog</link><description>${SITE_DESCRIPTION}</description>${items}</channel></rss>`
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}