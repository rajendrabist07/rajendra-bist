import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { PERSONAL, PROJECTS, SKILLS } from '@/lib/portfolio-data';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site-config';

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
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSONAL.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  applicationName: SITE_NAME,
  category: 'portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Rajendra Bist - Backend Developer and AI Systems Engineer Portfolio OpenGraph Image',
        type: 'image/svg+xml',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.svg',
  },
  authors: [{ name: PERSONAL.name, url: PERSONAL.github }],
  creator: PERSONAL.name,
  publisher: PERSONAL.name,
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
};

const personId = `${SITE_URL}/#rajendra-bist`;
const websiteId = `${SITE_URL}/#website`;
const webPageId = `${SITE_URL}/#webpage`;

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: PERSONAL.name,
      alternateName: ['Rajendra', 'Rajendra Bist Backend Developer'],
      url: SITE_URL,
      mainEntityOfPage: webPageId,
      image: `${SITE_URL}/images/rajendra-bist.jpeg`,
      jobTitle: PERSONAL.role,
      description: SITE_DESCRIPTION,
      email: `mailto:${PERSONAL.email}`,
      sameAs: [PERSONAL.github, PERSONAL.linkedin],
      knowsAbout: [
        ...SITE_KEYWORDS,
        ...SKILLS.flatMap((skill) => skill.items),
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Full-Stack Web Development Training',
          credentialCategory: 'Professional Engineering Training',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Vcare Technical Institute',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Bachelor of Technology (B.Tech)',
          credentialCategory: 'Undergraduate Degree',
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: 'Indira Gandhi National Open University',
          },
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NP',
        addressRegion: 'Nepal',
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      alternateName: ['Rajendra Bist Portfolio', 'bistrajendra.com.np'],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: {
        '@id': personId,
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': webPageId,
      name: SITE_TITLE,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': personId,
      },
      mainEntity: {
        '@id': personId,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/rajendra-bist.jpeg`,
      },
      breadcrumb: {
        '@id': `${SITE_URL}/#breadcrumb`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#featured-projects`,
      name: 'Featured software engineering projects by Rajendra Bist',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          url: project.liveUrl,
          codeRepository: project.githubUrl,
          creator: {
            '@id': personId,
          },
          keywords: project.stack.join(', '),
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Rajendra Bist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rajendra Bist is a backend developer and AI systems engineer from Nepal building scalable APIs, database-driven products, RAG pipelines, LLM integrations, and full-stack applications.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Rajendra Bist specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rajendra specializes in Node.js, Next.js, TypeScript, MongoDB, PostgreSQL, Supabase pgvector, RAG pipelines, LLM integration, REST APIs, and production-ready AI workflows.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="author" content={PERSONAL.name} />
        <meta name="classification" content="Portfolio, Software Engineering, Backend Development, AI Systems" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} bg-[--bg-primary] text-[--text-primary] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
