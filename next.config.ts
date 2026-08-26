import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'rajendra-bist.vercel.app',
          },
        ],
        destination: 'https://bistrajendra.com.np/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
