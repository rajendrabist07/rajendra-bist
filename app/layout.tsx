import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Rajendra Bist — Full-Stack Web Developer',
  description: "Full-stack web developer from Nepal. Passionate about backend architecture, API design, and AI-integrated products. Built with Next.js, MongoDB, and Gemini AI.",
  keywords: ['full-stack developer', 'backend engineer', 'React', 'Next.js', 'Node.js', 'MongoDB', 'portfolio'],
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
    title: 'Rajendra Bist — Full-Stack Web Developer',
    description: 'Personal portfolio showcasing full-stack development, AI integration, and real projects. Built with Next.js, MongoDB, and Gemini AI.',
    url: 'https://rajendrabist.vercel.app',
    siteName: 'Rajendra Bist Portfolio',
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
    title: 'Rajendra Bist — Full-Stack Web Developer',
    description: 'Portfolio with AI chat, backend engineering, and production-ready web development.',
    images: ['/og-image.svg'],
    creator: '@rajendrabist07',
  },
  icons: {
    icon: '/favicon.svg',
  },
  authors: [{ name: 'Rajendra Bist', url: 'https://github.com/rajendrabist07' }],
  creator: 'Rajendra Bist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  )
}
