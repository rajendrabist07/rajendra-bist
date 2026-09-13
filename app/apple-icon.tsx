import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(135deg, #211a15 0%, #080806 58%, #15110e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '40px',
          border: '5px solid rgba(152, 189, 201, 0.9)',
          boxShadow: '0 0 28px rgba(152, 189, 201, 0.22)',
        }}
      >
        <span style={{ color: '#ffffff' }}>R</span>
        <span style={{ color: '#98bdc9', marginLeft: 4 }}>B</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
