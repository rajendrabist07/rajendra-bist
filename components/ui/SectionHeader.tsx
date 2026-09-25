'use client';

import React from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
};

export default function SectionHeader({ title, subtitle, eyebrow, description }: SectionHeaderProps) {
  const tag = eyebrow || subtitle;

  return (
    <div className="mb-10 max-w-3xl">
      {tag && (
        <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[--accent-warm] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[--accent-warm]" />
          <span>{tag}</span>
        </div>
      )}
      <h2 className="mt-2 fluid-h2 font-black tracking-tight text-[--text-primary]">{title}</h2>
      {description && (
        <p className="mt-3 text-sm text-[--text-secondary] sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
