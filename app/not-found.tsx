import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Page Not Found',
  description: 'The requested system route does not exist.',
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-[--bg-page] px-4 py-32 text-center text-[--text-primary]">
      <Container className="max-w-md">
        <p className="font-mono text-xs uppercase tracking-widest text-[--accent]">
          404 // ROUTE_NOT_FOUND
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
          System route offline.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[--text-secondary]">
          The address you requested does not map to any live service, project case study, or blog entry on this domain.
        </p>

        <div className="mt-8 flex justify-center gap-3 font-mono text-xs">
          <Link
            href="/"
            className="premium-button-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <Home size={14} />
            Return Home
          </Link>
          <Link
            href="/#projects"
            className="premium-button-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all hover:border-[--accent]"
          >
            <ArrowLeft size={14} />
            Explore Projects
          </Link>
        </div>
      </Container>
    </main>
  );
}
