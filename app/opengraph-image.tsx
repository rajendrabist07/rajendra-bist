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
          backgroundColor: '#000c1e',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(1, 138, 190, 0.25), transparent 40%), radial-gradient(circle at 76% 22%, rgba(2, 69, 122, 0.35), transparent 45%), radial-gradient(circle at 86% 92%, rgba(56, 189, 248, 0.20), transparent 42%)',
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
            background: 'linear-gradient(135deg, #001b48, #02457a)',
            border: '1.5px solid rgba(1, 138, 190, 0.65)',
            borderRadius: '16px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 18px 48px rgba(0, 12, 30, 0.5)',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#f0f7fb' }}>R</span>
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#018abe', marginLeft: '2px' }}>B</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#97cadb',
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
            color: '#f0f7fb',
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Rajendra Bist
        </div>

        {/* Role with Oceanic Electric Blue */}
        <div
          style={{
            fontSize: '34px',
            fontWeight: 700,
            color: '#018abe',
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
            color: '#d6e8ee',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '850px',
            lineHeight: 1.5,
          }}
        >
          Building typed React interfaces, scalable APIs, RAG pipelines, and production AI integrations.
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
                backgroundColor: 'rgba(2, 69, 122, 0.25)',
                border: '1px solid rgba(1, 138, 190, 0.35)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#d6e8ee',
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
