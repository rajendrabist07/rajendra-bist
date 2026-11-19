import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  Surface,
  Button,
  Chip,
  Link,
  CodeWindow,
  Tabs,
  Timeline,
  Field,
  Toast,
  Tooltip,
  Icon,
  Annotation,
  DimensionLine,
  CropMarks,
  ThemeToggle,
} from '@/components/primitives';

export const metadata: Metadata = {
  title: 'Blueprint Design System & Primitives (Dev Only)',
  description: 'Internal design catalog showcasing all Blueprint tokens and primitives.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DevDesignPage() {
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    notFound();
  }

  const sampleCode = `-- PostgreSQL Row-Level Security Policy
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON tenants
  USING ("tenantId" = current_setting('app.tenant_id', true));`;

  const timelineEntries = [
    {
      date: 'OCT 2026 – PRESENT',
      title: 'Sovereign SaaS Platform',
      organization: 'Independent Architecture',
      description: 'Multi-tenant workflow orchestration with PostgreSQL RLS and Inngest durable executions.',
      tag: 'RLS // 04 POLICIES',
    },
    {
      date: 'AUG – SEP 2026',
      title: 'Chronicle Publishing Engine',
      organization: 'Two-Service Architecture',
      description: 'Next.js 15 front-end on Vercel with Express 4 REST API on Render, 48 Vitest suites passing.',
      tag: 'CI // 48 SUITES',
    },
  ];

  const tabItems = [
    {
      id: 'backend',
      label: 'Backend & Schema',
      content: (
        <div className="p-4 font-mono text-xs text-[--text-secondary] space-y-2">
          <p>• Node.js & Express REST APIs with Zod schema validation</p>
          <p>• PostgreSQL Row-Level Security & pgvector similarity search</p>
          <p>• Prisma ORM with strict migration pipelines</p>
        </div>
      ),
    },
    {
      id: 'frontend',
      label: 'Frontend & UI',
      content: (
        <div className="p-4 font-mono text-xs text-[--text-secondary] space-y-2">
          <p>• Next.js 15 App Router with server-rendered reading surfaces</p>
          <p>• Tailwind CSS v4 design tokens and semantic variables</p>
          <p>• Keyboard-accessible dialogs and WAI-ARIA command palettes</p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[--bg-page] text-[--text-primary] py-12 selection:bg-[--accent-dim] selection:text-[--text-primary]">
      <Container>
        {/* Header bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[--border-hairline]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Annotation>Design Specification</Annotation>
              <Chip variant="blueprint">Direction A Blueprint</Chip>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[--text-primary]">
              Design System & Primitives
            </h1>
            <p className="mt-1 text-sm text-[--text-secondary] max-w-[68ch]">
              Complete catalog of accessible, WCAG 2.2 compliant tokens and UI primitives built for the Rajendra Bist portfolio rebuild.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        <DimensionLine label="Primitives Catalog" />

        {/* Section 1: Buttons & Links */}
        <Section id="buttons">
          <div className="mb-4">
            <Annotation>Interactive Actions</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Buttons & Links</h2>
          </div>
          <Surface level={1} className="p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md">
                Primary Action <Icon name="arrow-right" size={14} />
              </Button>
              <Button variant="secondary" size="md">
                Secondary Action
              </Button>
              <Button variant="ghost" size="md">
                Ghost Action
              </Button>
              <Button variant="primary" size="sm">
                Small (sm)
              </Button>
              <Button variant="primary" size="lg">
                Large (lg)
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-[--border-hairline]">
              <Link href="/">Internal Link</Link>
              <Link href="https://github.com/rajendrabist07/chronicle" isExternal>
                External GitHub Link
              </Link>
            </div>
          </Surface>
        </Section>

        {/* Section 2: Surfaces & Elevation */}
        <Section id="surfaces">
          <div className="mb-4">
            <Annotation>Elevation Tiers</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Surface Levels (3 Tiers)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Surface level={1} interactive className="p-6">
              <span className="font-mono text-xs text-[--accent]">Surface Level 1</span>
              <h3 className="text-base font-semibold mt-2 text-[--text-primary]">Card Base</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Base card surface (<code className="text-xs">--bg-surface-1</code>) with hairline border.
              </p>
            </Surface>
            <Surface level={2} interactive className="p-6">
              <span className="font-mono text-xs text-[--accent]">Surface Level 2</span>
              <h3 className="text-base font-semibold mt-2 text-[--text-primary]">Elevated Surface</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Elevated card (<code className="text-xs">--bg-surface-2</code>) with strong border.
              </p>
            </Surface>
            <Surface level={3} className="p-6">
              <span className="font-mono text-xs text-[--accent]">Surface Level 3</span>
              <h3 className="text-base font-semibold mt-2 text-[--text-primary]">Code Container</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Inset container (<code className="text-xs">--bg-surface-3</code>) for code and data.
              </p>
            </Surface>
          </div>
        </Section>

        {/* Section 3: Chips, Badges & Tooltips */}
        <Section id="chips">
          <div className="mb-4">
            <Annotation>Status & Metadata</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Chips, Annotations & Tooltips</h2>
          </div>
          <Surface level={1} className="p-6 flex flex-wrap items-center gap-4">
            <Chip variant="status" activeDot>
              Available immediately
            </Chip>
            <Chip variant="tech">PostgreSQL 16</Chip>
            <Chip variant="tech">Next.js 15 App Router</Chip>
            <Chip variant="blueprint">Deployed Services: 2</Chip>
            <Annotation>New Delhi, India</Annotation>
            <Tooltip content="Live in New Delhi, India (IST UTC+5:30)">
              <button className="px-3 py-1 font-mono text-xs text-[--text-secondary] border border-[--border-hairline] rounded-[--radius-control] hover:border-[--border-strong] cursor-help">
                Hover for Tooltip
              </button>
            </Tooltip>
          </Surface>
        </Section>

        {/* Section 4: CodeWindow */}
        <Section id="code">
          <div className="mb-4">
            <Annotation>Schema Definition</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">CodeWindow (Blueprint CAD Frame)</h2>
          </div>
          <CodeWindow
            title="migration.sql"
            tag="Prisma RLS"
            code={sampleCode}
            language="sql"
          />
        </Section>

        {/* Section 5: Tabs & Timeline */}
        <Section id="tabs-timeline">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <Annotation>Category Filters</Annotation>
                <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Tabs (WAI-ARIA)</h2>
              </div>
              <Surface level={1} className="p-6">
                <Tabs items={tabItems} />
              </Surface>
            </div>
            <div>
              <div className="mb-4">
                <Annotation>Milestone Log</Annotation>
                <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Timeline (Dual-Lane Log)</h2>
              </div>
              <Surface level={1} className="p-6">
                <Timeline entries={timelineEntries} />
              </Surface>
            </div>
          </div>
        </Section>

        {/* Section 6: Fields & Forms */}
        <Section id="fields">
          <div className="mb-4">
            <Annotation>Input Fields</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Form Fields & Validation</h2>
          </div>
          <Surface level={1} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Engineering Contact"
              placeholder="name@company.com"
              helperText="Direct dispatch to rajendrabist396@gmail.com"
            />
            <Field
              label="Validated Field (Error State)"
              defaultValue="invalid-email-format"
              error="Please enter a valid engineering contact address."
            />
            <div className="md:col-span-2">
              <Field
                label="Message Brief"
                isTextArea
                rows={3}
                placeholder="Discuss architecture, full-stack roles, or technical collaboration..."
              />
            </div>
          </Surface>
        </Section>

        {/* Section 7: Viewfinder & CropMarks */}
        <Section id="cropmarks">
          <div className="mb-4">
            <Annotation>Identity Viewfinder</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">CropMarks & 4:5 Portrait Viewfinder</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-64 max-w-[400px]">
              <CropMarks size={18}>
                <div className="relative aspect-[4/5] w-full rounded-[--radius-control] overflow-hidden border border-[--border-hairline] bg-[--bg-surface-2]">
                  <Image
                    src="/images/rajendra-bist-portrait.webp"
                    alt="Rajendra Bist"
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-2 right-2 bg-[--bg-page] border border-[--border-strong] px-2 py-0.5 rounded-[--radius-control] font-mono text-[10px] text-[--accent]">
                    New Delhi, India
                  </div>
                </div>
              </CropMarks>
            </div>
            <div className="space-y-4 max-w-[68ch]">
              <h3 className="text-lg font-semibold text-[--text-primary]">
                Technical Viewfinder Anatomy
              </h3>
              <p className="text-sm text-[--text-secondary] leading-relaxed">
                Replaces conventional AI template rounded avatars with an engineering drafting viewfinder.
                Corner L-brackets (CropMarks) frame the portrait with high-contrast coordinate chips and WebP/AVIF 4:5 derivatives under 35 KB.
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip variant="tech">AVIF: 31 KB</Chip>
                <Chip variant="tech">WebP: 28 KB</Chip>
                <Chip variant="blueprint">4:5 Aspect Ratio</Chip>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 8: Toast & Icons */}
        <Section id="toasts-icons">
          <div className="mb-4">
            <Annotation>System Notifications</Annotation>
            <h2 className="text-xl font-bold mt-1 text-[--text-primary]">Toasts & Icons</h2>
          </div>
          <Surface level={1} className="p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Toast message="Email copied to clipboard (rajendrabist396@gmail.com)" variant="success" />
              <Toast message="System status: Available immediately" variant="info" />
            </div>
            <div className="pt-4 border-t border-[--border-hairline] flex items-center gap-6 text-[--text-primary]">
              <Icon name="github" size={20} label="GitHub" />
              <Icon name="linkedin" size={20} label="LinkedIn" />
              <Icon name="mail" size={20} label="Email" />
              <Icon name="terminal" size={20} label="Terminal" />
              <Icon name="copy" size={20} label="Copy" />
              <Icon name="check" size={20} label="Check" />
              <Icon name="sun" size={20} label="Light Theme" />
              <Icon name="moon" size={20} label="Dark Theme" />
            </div>
          </Surface>
        </Section>

        <DimensionLine label="End of Specification" />
      </Container>
    </main>
  );
}
