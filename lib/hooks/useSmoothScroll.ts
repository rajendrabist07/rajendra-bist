'use client';

export function useSmoothScroll() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return { scrollToSection };
}
