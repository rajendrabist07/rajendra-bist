import { ImageResponse } from 'next/og';
import { getProjectBySlug, CASE_FILES } from '@/content/projects';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function generateStaticParams() {
  return CASE_FILES.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug) || {
    title: 'Architecture Case Study',
    headline: 'Production system case study by Rajendra Bist',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL'],
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
              CASE FILE // SPECIFICATION
            </span>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#A9B6D3', letterSpacing: '1px' }}>
            RB // bistrajendra.com.np
          </span>
        </div>

        {/* Center: Title & Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#E8EEFB',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#A9B6D3',
              lineHeight: 1.45,
              maxWidth: '960px',
            }}
          >
            {project.headline}
          </div>
        </div>

        {/* Bottom: Stack Badges & Author */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.stack?.slice(0, 5).map((tech) => (
              <div
                key={tech}
                style={{
                  backgroundColor: '#16233B',
                  border: '1px solid rgba(148, 178, 255, 0.2)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#E8EEFB',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
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
