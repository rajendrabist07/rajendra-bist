"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  twinkleSpeed: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Check for user reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Theme Blue Accent Color Palette (Sky Blue / Electric Blue / White Starlight)
    const colors = [
      "rgba(255, 255, 255,",   // Pure white starlight
      "rgba(56, 189, 248,",    // Sky-400 brand blue
      "rgba(96, 165, 250,",    // Blue-400 electric blue
      "rgba(147, 197, 253,",   // Blue-300 soft ambient
    ];

    // 40–70 ambient particles based on viewport
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 22000), 45), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const initialAlpha = 0.2 + Math.random() * 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.75 + Math.random() * 1.35,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: initialAlpha,
        targetAlpha: initialAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowBlur = p.radius > 1.2 ? 6 : 3;
        ctx.shadowColor = "rgba(56, 189, 248, 0.35)";
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      drawStatic();
      return;
    }

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient twinkle fade in/out
        if (Math.abs(p.alpha - p.targetAlpha) < 0.04) {
          p.targetAlpha = 0.15 + Math.random() * 0.75;
        }
        p.alpha += (p.targetAlpha - p.alpha) * p.twinkleSpeed;

        // Slow ambient drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Draw ambient glowing star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowBlur = p.radius > 1.2 ? 6 : 3;
        ctx.shadowColor = "rgba(56, 189, 248, 0.35)";
        ctx.fill();

        // Subtle proximity constellation links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 75) {
            const lineAlpha = (1 - dist / 75) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause animation when tab is not active to optimize CPU & Lighthouse score
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    };

    const handleResize = () => {
      resizeCanvas();
      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isRunning = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Faint static architectural graph-paper grid */}
      <div
        className="absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Ambient Celestial Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />
    </div>
  );
}
