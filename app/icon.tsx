import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 48,
  height: 48,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#06080d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '12px',
          border: '2px solid #38bdf8',
          boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
        }}
      >
        <span style={{ color: '#ffffff' }}>R</span>
        <span style={{ color: '#38bdf8' }}>B</span>
        <span style={{ color: '#38bdf8', fontSize: 18, marginLeft: 1 }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
