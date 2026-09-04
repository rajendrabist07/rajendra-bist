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
          backgroundColor: '#06080d',
          backgroundImage:
            'radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.18), transparent 60%), radial-gradient(circle at 90% 90%, rgba(37, 99, 235, 0.15), transparent 50%)',
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
            backgroundColor: '#0c1017',
            border: '2px solid #38bdf8',
            borderRadius: '16px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}>R</span>
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#38bdf8' }}>B</span>
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#38bdf8', marginLeft: '2px' }}>.</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#94a3b8',
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
            color: '#f8fafc',
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Rajendra Bist
        </div>

        {/* Role with Sky Blue Gradient */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: 700,
            color: '#38bdf8',
            marginTop: '12px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          Backend Developer &amp; AI Systems Engineer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            color: '#94a3b8',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '850px',
            lineHeight: 1.5,
          }}
        >
          Building scalable APIs, database-driven products, RAG pipelines, and production AI integrations.
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
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#e2e8f0',
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
