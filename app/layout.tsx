import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { PERSONAL, PROJECTS, SKILLS } from "@/lib/portfolio-data";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-config";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSONAL.name}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  applicationName: SITE_NAME,
  category: "portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rajendra Bist - Full-Stack Developer and AI Systems Engineer Portfolio Preview",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  authors: [{ name: PERSONAL.name, url: PERSONAL.github }],
  creator: PERSONAL.name,
  publisher: PERSONAL.name,
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
};

const themeInitScript = `
(() => {
  try {
    const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
    const cookieTheme = match ? decodeURIComponent(match[1]) : null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const resolvedTheme = (cookieTheme === 'light' || cookieTheme === 'dark') ? cookieTheme : systemTheme;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

const personId = `${SITE_URL}/#rajendra-bist`;
const websiteId = `${SITE_URL}/#website`;
const webPageId = `${SITE_URL}/#webpage`;

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: PERSONAL.name,
      alternateName: [
        "Rajendra",
        "Rajendra Bist Full-Stack Developer",
        "Rajendra Bist Backend Engineer",
        "Rajendra Bist Delhi NCR",
        "Rajendra Bist India",
      ],
      url: SITE_URL,
      mainEntityOfPage: webPageId,
      image: `${SITE_URL}/images/Rajendra-Bist.png`,
      jobTitle: PERSONAL.role,
      description: SITE_DESCRIPTION,
      telephone: "+91-8700918036",
      seeks: {
        "@type": "Demand",
        name: "Full-Stack Developer & Backend Engineering Roles in Delhi NCR & Remote",
        description:
          "Based in New Delhi, India. Nepali national with complete legal authorization to work across India under the 1950 Indo-Nepal Treaty (no visa sponsorship or work permit required). Open to Delhi NCR and remote engineering roles.",
        areaServed: [
          {
            "@type": "Place",
            name: "Delhi NCR, India",
          },
          {
            "@type": "Place",
            name: "India",
          },
          {
            "@type": "Place",
            name: "Worldwide (Remote)",
          },
        ],
      },
      email: `mailto:${PERSONAL.email}`,
      sameAs: [PERSONAL.github, PERSONAL.linkedin],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS v4",
        "Node.js",
        "Express.js",
        "REST APIs",
        "PostgreSQL",
        "PostgreSQL Row-Level Security (RLS)",
        "Supabase",
        "pgvector",
        "Inngest Durable Workflows",
        "Turborepo Monorepos",
        "MongoDB Atlas",
        "Upstash Redis",
        "RAG Pipelines",
        "LLM Agent Tool Calling",
        "Groq API",
        "Gemini API",
        "System Design",
        "WebSockets",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Vcare Technical Institute",
        },
        {
          "@type": "EducationalOrganization",
          name: "Kailali Multiple Campus",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressRegion: "Delhi NCR",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      alternateName: ["Rajendra Bist Portfolio", "bistrajendra.com.np"],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: {
        "@id": personId,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": webPageId,
      name: SITE_TITLE,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": personId,
      },
      mainEntity: {
        "@id": personId,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/Rajendra-Bist.png`,
      },
      breadcrumb: {
        "@id": `${SITE_URL}/#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#featured-projects`,
      name: "Featured software engineering projects by Rajendra Bist",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.description,
          url: project.liveUrl,
          codeRepository: project.githubUrl,
          programmingLanguage: "TypeScript",
          author: {
            "@id": personId,
          },
          keywords: project.stack.join(", "),
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="preload"
          as="image"
          href="/images/rajendra-bist-portrait-sm.webp"
          type="image/webp"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/rajendra-bist-portrait.webp"
          type="image/webp"
          media="(min-width: 641px)"
          fetchPriority="high"
        />
        <meta name="author" content={PERSONAL.name} />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${monoFont.variable} bg-[--bg-primary] text-[--text-primary] antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[--accent] focus:text-[--accent-ink] focus:rounded-[--radius-control] focus:font-mono focus:text-xs focus:font-semibold focus:shadow-2xl"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
