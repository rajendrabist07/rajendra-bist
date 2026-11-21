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
          title="Architected & Built"
          description="Three projects I designed and built, with the architecture and the code behind each."
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
