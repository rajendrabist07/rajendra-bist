"use client";

import { useEffect } from "react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio page error");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[--bg-void] px-6 text-[--text-primary]">
      <section className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent-warm]">
          500 // SYSTEM ERROR
        </p>
        <h1 className="mt-4 text-3xl font-semibold">
          This page failed to load.
        </h1>
        <p className="mt-3 text-[--text-secondary]">
          The error was recorded locally. Try the page again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="premium-button-primary mt-6 rounded-lg px-5 py-3 font-mono text-sm"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
