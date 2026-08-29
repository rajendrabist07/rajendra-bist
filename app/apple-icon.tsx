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
          fontSize: 84,
          background: '#06080d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '40px',
          border: '6px solid #38bdf8',
          boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
        }}
      >
        <span style={{ color: '#ffffff' }}>R</span>
        <span style={{ color: '#38bdf8' }}>B</span>
        <span style={{ color: '#38bdf8', fontSize: 68, marginLeft: 4 }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
