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
          backgroundColor: '#080806',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(232, 243, 242, 0.16), transparent 38%), radial-gradient(circle at 76% 22%, rgba(224, 185, 166, 0.20), transparent 42%), radial-gradient(circle at 86% 92%, rgba(183, 154, 130, 0.18), transparent 42%)',
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
            background: 'linear-gradient(135deg, #15110e, #211a15)',
            border: '1.5px solid rgba(224, 185, 166, 0.58)',
            borderRadius: '16px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.34)',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#fffaf3' }}>R</span>
          <span style={{ fontSize: '28px', fontWeight: 850, color: '#e0b9a6', marginLeft: '2px' }}>B</span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#9d9084',
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
            color: '#fffaf3',
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
            color: '#e0b9a6',
            marginTop: '12px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          Full-Stack Developer &amp; AI Systems Engineer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            color: '#d8ccc0',
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
                backgroundColor: 'rgba(255, 250, 243, 0.05)',
                border: '1px solid rgba(224, 185, 166, 0.22)',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#e8ddd2',
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
