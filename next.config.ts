import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/dev/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.resend.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/projects/edumethod-ai',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/Resume/resume.pdf',
        destination: '/resume/Rajendra_Bist_Full_Stack_Developer.pdf',
        permanent: true,
      },
      {
        source: '/resume/resume.pdf',
        destination: '/resume/Rajendra_Bist_Full_Stack_Developer.pdf',
        permanent: true,
      },
      {
        source: '/Resume/:path*',
        destination: '/resume/:path*',
        permanent: true,
      },
      {
        source: '/projects/socratic-ai',
        destination: '/projects/chronicle',
        permanent: true,
      },
      {
        source: '/blog/rss.xml',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'rajendra-bist.vercel.app',
          },
        ],
        destination: 'https://www.bistrajendra.com.np/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
