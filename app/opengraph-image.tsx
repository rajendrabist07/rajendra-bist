import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B1220',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(56, 208, 240, 0.15), transparent 40%), radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.04), transparent 45%), radial-gradient(circle at 86% 92%, rgba(56, 208, 240, 0.12), transparent 42%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Monogram Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #101A2E, #0B1220)',
            border: '1.5px solid rgba(56, 208, 240, 0.5)',
            borderRadius: '16px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.6)',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#E8EEFB' }}>R</span>
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#38D0F0', marginLeft: '2px' }}>B</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#A9B6D3',
              marginLeft: '14px',
              letterSpacing: '2px',
            }}
          >
            PORTFOLIO • 2026
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 900,
            color: '#E8EEFB',
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Rajendra Bist
        </div>

        {/* Role with Blueprint Cyan */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: 700,
            color: '#38D0F0',
            marginTop: '12px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          Full-Stack Developer &amp; Backend Engineer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            color: '#A9B6D3',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '850px',
            lineHeight: 1.5,
          }}
        >
          Full-stack developer in New Delhi. Next.js, Node.js and PostgreSQL applications from schema to deployment.
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '36px',
          }}
        >
          {[
            'TypeScript',
            'Next.js',
            'Node.js',
            'PostgreSQL (RLS)',
            'Inngest',
            'Prisma',
            'Docker',
            'Zod',
          ].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: '#101A2E',
                border: '1px solid rgba(148, 178, 255, 0.14)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#E8EEFB',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
