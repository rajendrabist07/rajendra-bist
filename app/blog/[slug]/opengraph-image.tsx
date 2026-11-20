import { ImageResponse } from 'next/og';
import { BLOG_POSTS } from '@/lib/blog';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug) || {
    title: 'Engineering Note',
    description: 'Technical deep-dive on backend systems and architecture by Rajendra Bist.',
    date: '2026',
    readingTime: '4 min read',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B1220',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(56, 208, 240, 0.15), transparent 45%), radial-gradient(circle at 86% 92%, rgba(56, 208, 240, 0.12), transparent 45%)',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#101A2E',
              border: '1.5px solid rgba(56, 208, 240, 0.4)',
              borderRadius: '8px',
              padding: '6px 16px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#38D0F0', letterSpacing: '1px' }}>
              ENGINEERING NOTE // ARCHITECTURE
            </span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#A9B6D3', letterSpacing: '1px' }}>
            RB // bistrajendra.com.np
          </span>
        </div>

        {/* Center: Title & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#E8EEFB',
              letterSpacing: '-1.2px',
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#A9B6D3',
              lineHeight: 1.45,
              maxWidth: '960px',
            }}
          >
            {post.description}
          </div>
        </div>

        {/* Bottom: Date & Author */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '16px', color: '#8A98B8', letterSpacing: '0.5px' }}>
            {post.date} • {post.readingTime}
          </span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#38D0F0' }}>
            Rajendra Bist
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
