'use client';

export function useSmoothScroll() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return { scrollToSection };
}
