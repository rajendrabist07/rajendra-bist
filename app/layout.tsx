import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Rajendra Bist — Systems-First Full-Stack Developer',
  description:
    'Systems-first full-stack developer from Nepal focused on backend engineering, web architecture, performance, scale, and AI-integrated products.',
  keywords: [
    'Full-Stack Developer Nepal',
    'Next.js Developer',
    'Node.js',
    'MongoDB',
    'React Developer',
    'Rajendra Bist',
    'backend engineer',
    'system design',
  ],
  metadataBase: new URL('https://rajendrabist.vercel.app'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Rajendra Bist — Systems-First Full-Stack Developer',
    description:
      'Personal portfolio showcasing full-stack development, AI integration, and real projects. Built with Next.js, MongoDB, and Gemini AI.',
    url: 'https://rajendrabist.vercel.app',
    siteName: 'Rajendra Bist',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rajendra Bist - Full-Stack Web Developer',
        type: 'image/svg+xml',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajendra Bist — Systems-First Full-Stack Developer',
    description: 'Portfolio with AI chat, backend engineering, and production-ready web development.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.svg',
  },
  authors: [{ name: 'Rajendra Bist', url: 'https://github.com/rajendrabist07' }],
  creator: 'Rajendra Bist',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://rajendrabist.vercel.app" />
      </head>
      <body className="bg-[--bg-primary] text-[--text-primary]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
