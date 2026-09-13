import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          background: 'linear-gradient(135deg, #211a15 0%, #080806 58%, #15110e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '8px',
          border: '1.5px solid rgba(224, 185, 166, 0.9)',
          boxShadow: '0 0 8px rgba(224, 185, 166, 0.24)',
        }}
      >
        <span style={{ color: '#ffffff' }}>R</span>
        <span style={{ color: '#e0b9a6', marginLeft: 1 }}>B</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
