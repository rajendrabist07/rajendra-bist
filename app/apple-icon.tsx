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
          background: 'linear-gradient(135deg, #101A2E 0%, #0B1220 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E8EEFB',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '40px',
          border: '5px solid rgba(56, 208, 240, 0.6)',
          boxShadow: '0 0 32px rgba(56, 208, 240, 0.25)',
        }}
      >
        <span style={{ color: '#E8EEFB' }}>R</span>
        <span style={{ color: '#38D0F0', marginLeft: 4 }}>B</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
