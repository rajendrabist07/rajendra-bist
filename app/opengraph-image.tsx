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
          backgroundColor: '#050608',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(255, 122, 51, 0.15), transparent 40%), radial-gradient(circle at 76% 22%, rgba(255, 255, 255, 0.04), transparent 45%), radial-gradient(circle at 86% 92%, rgba(255, 122, 51, 0.12), transparent 42%)',
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
            background: 'linear-gradient(135deg, #10131a, #050608)',
            border: '1.5px solid rgba(255, 122, 51, 0.5)',
            borderRadius: '16px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.6)',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#edeff2' }}>R</span>
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#ff7a33', marginLeft: '2px' }}>B</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#8e97a3',
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
            color: '#edeff2',
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Rajendra Bist
        </div>

        {/* Role with Molten Amber */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: 700,
            color: '#ff7a33',
            marginTop: '12px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          Backend-First Full-Stack &amp; AI Systems Engineer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            color: '#8e97a3',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '850px',
            lineHeight: 1.5,
          }}
        >
          Designing and shipping production-oriented full-stack products with typed contracts, database integrity, and bounded AI integrations.
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
            'Node.js',
            'Next.js 15',
            'TypeScript',
            'PostgreSQL',
            'Supabase pgvector',
            'MongoDB',
            'Groq',
            'Gemini',
          ].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: '#10131a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#edeff2',
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
