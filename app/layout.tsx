import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { SITE_URL } from '@/lib/site-config';

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rajendra Bist — Backend Developer (Full-Stack Capable)',
  description:
    'Rajendra Bist is a backend developer from Nepal specializing in Node.js, Next.js, MongoDB, PostgreSQL, and production AI integration for scalable web platforms.',
  keywords: [
    'Rajendra Bist',
    'Backend Developer Nepal',
    'Full-Stack Developer Nepal',
    'Node.js Developer',
    'Next.js Developer',
    'MongoDB Developer',
    'PostgreSQL',
    'AI Integration',
    'RAG Pipelines',
    'System Design',
    'Software Engineer Nepal',
  ],
  metadataBase: new URL(SITE_URL),
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
    title: 'Rajendra Bist — Backend Developer',
    description:
      'Rajendra Bist is a backend developer from Nepal specializing in Node.js, Next.js, MongoDB, PostgreSQL, and production AI integration for scalable web platforms.',
    url: SITE_URL,
    siteName: 'Rajendra Bist Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rajendra Bist — Backend Developer Portfolio OpenGraph Image',
        type: 'image/svg+xml',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajendra Bist — Backend Developer',
    description:
      'Rajendra Bist is a backend developer from Nepal specializing in Node.js, Next.js, MongoDB, PostgreSQL, and production AI integration for scalable web platforms.',
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

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajendra Bist',
  url: SITE_URL,
  image: `${SITE_URL}/images/rajendra-bist.jpeg`,
  jobTitle: 'Backend Developer',
  description:
    'Systems-first backend developer from Nepal building scalable web architectures, AI-integrated platforms, and high-throughput systems.',
  sameAs: [
    'https://github.com/rajendrabist07',
    'https://www.linkedin.com/in/rajendra-bist-169926370',
  ],
  knowsAbout: [
    'Node.js',
    'Next.js',
    'MongoDB',
    'PostgreSQL',
    'System Design',
    'AI Integration',
    'LLM Integration',
    'RAG Pipelines',
    'TypeScript',
    'REST APIs',
    'WebSockets',
    'Tailwind CSS',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Open to work / Freelance',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Nepal',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rajendra Bist — Backend Developer Portfolio',
  url: SITE_URL,
  description:
    'Rajendra Bist is a backend developer from Nepal specializing in Node.js, Next.js, MongoDB, PostgreSQL, and production AI integration for scalable web platforms.',
  author: {
    '@type': 'Person',
    name: 'Rajendra Bist',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} bg-[--bg-primary] text-[--text-primary] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
