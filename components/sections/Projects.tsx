import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/ui/Container';
import CaseFile from '@/components/ui/CaseFile';
import { CASE_FILES } from '@/content/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-28" aria-label="Selected Projects">
      <Container>
        <SectionHeader
          eyebrow="Case Files · Shipped Systems"
          title="Architected & Built"
          description="Production systems built with multi-tenant boundaries, event-driven orchestration, and verifiable repository proof. Interactive architecture diagrams and live public captures."
        />

        <div className="mt-12 flex flex-col gap-12 sm:gap-16">
          {CASE_FILES.map((project) => (
            <CaseFile key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
