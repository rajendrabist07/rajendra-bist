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
          background: 'linear-gradient(135deg, #10131a 0%, #050608 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#edeff2',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '40px',
          border: '5px solid rgba(255, 122, 51, 0.6)',
          boxShadow: '0 0 32px rgba(255, 122, 51, 0.25)',
        }}
      >
        <span style={{ color: '#edeff2' }}>R</span>
        <span style={{ color: '#ff7a33', marginLeft: 4 }}>B</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
