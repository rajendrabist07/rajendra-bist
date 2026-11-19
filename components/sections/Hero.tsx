'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FACTS } from '@/content/facts';
import {
  Container,
  Chip,
  Button,
  Icon,
  Tooltip,
  Annotation,
  CropMarks,
} from '@/components/primitives';
import TypedRole from '@/components/ui/TypedRole';
import HeroSvgTrace from '@/components/ui/HeroSvgTrace';

export default function Hero() {
  const [istTime, setIstTime] = useState<string>('');
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  // Clock: Rendered after mount to avoid hydration mismatch
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const updateClock = () => {
      setIstTime(`New Delhi · ${formatter.format(new Date())} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 10_000);
    return () => clearInterval(interval);
  }, []);

  // Hover tilt of at most 4° on pointer devices only; none under reduced motion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 4;
    const rotateY = (x / (rect.width / 2)) * 4;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Exactly ONE slow background circuit trace */}
      <HeroSvgTrace />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Big Name, Role, Pitch, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Availability status chip */}
            <Chip variant="status" activeDot>
              {FACTS.availability.formatted}
            </Chip>

            {/* H1: Large, Space Grotesk 700, tight tracking, no coloured letters */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[--text-primary] leading-[1.05]">
              Rajendra Bist
            </h1>

            {/* Typed role line with zero layout shift */}
            <TypedRole />

            {/* Two-sentence plain-language engineering pitch */}
            <p className="text-base sm:text-lg text-[--text-secondary] leading-relaxed max-w-[62ch]">
              I build complete web apps, from the database schema to the deployed site, with Next.js, Node.js and PostgreSQL.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects" className="focus-visible:outline-none">
                <Button variant="primary" size="lg">
                  View projects <Icon name="arrow-right" size={16} />
                </Button>
              </a>
              <a
                href={FACTS.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:outline-none"
              >
                <Button variant="secondary" size="lg">
                  Download resume
                </Button>
              </a>
            </div>

            {/* Verified Social & Contact Links */}
            <div className="flex items-center gap-5 pt-4 text-[--text-secondary]">
              <Tooltip content="GitHub Profile: @rajendrabist07">
                <a
                  href={FACTS.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[--text-primary] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] rounded-[--radius-control] p-1.5"
                  aria-label="GitHub Profile"
                >
                  <Icon name="github" size={20} />
                </a>
              </Tooltip>

              <Tooltip content="LinkedIn Profile: Rajendra Bist">
                <a
                  href={FACTS.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[--text-primary] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] rounded-[--radius-control] p-1.5"
                  aria-label="LinkedIn Profile"
                >
                  <Icon name="linkedin" size={20} />
                </a>
              </Tooltip>

              <Tooltip content="Direct Email: rajendrabist396@gmail.com">
                <a
                  href={`mailto:${FACTS.contact.email}`}
                  className="hover:text-[--text-primary] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] rounded-[--radius-control] p-1.5"
                  aria-label="Email Rajendra Bist"
                >
                  <Icon name="mail" size={20} />
                </a>
              </Tooltip>
            </div>
          </div>

          {/* Right Column: 4:5 Rectangular Viewfinder Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[380px] sm:max-w-[400px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
            >
              <CropMarks size={18}>
                <div className="relative aspect-[4/5] w-full rounded-[--radius-control] overflow-hidden border border-[--border-hairline] bg-[--bg-surface-2] shadow-[0_0_32px_var(--accent-dim)]">
                  <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet="/images/rajendra-bist-portrait-sm.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 640px)"
                      srcSet="/images/rajendra-bist-portrait-sm.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/images/rajendra-bist-portrait.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/rajendra-bist-portrait.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/rajendra-bist-portrait.webp"
                      alt="Rajendra Bist - Full-Stack Developer & Backend Engineer"
                      width={400}
                      height={500}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </picture>

                  {/* Two real-data annotation chips */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    <Annotation>
                      {FACTS.availability.status}
                    </Annotation>
                  </div>

                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    {istTime ? (
                      <Annotation>{istTime}</Annotation>
                    ) : (
                      <Annotation>New Delhi · IST</Annotation>
                    )}
                  </div>
                </div>
              </CropMarks>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
