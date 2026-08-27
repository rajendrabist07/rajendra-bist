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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette matching clean deep blue & celestial sky
    const colors = [
      "rgba(255, 255, 255,",      // Pure starlight
      "rgba(56, 189, 248,",       // Sky Blue (Tailwind sky-400)
      "rgba(96, 165, 250,",       // Electric Blue (Tailwind blue-400)
      "rgba(147, 197, 253,",      // Soft Blue (Tailwind blue-300)
      "rgba(186, 230, 253,",      // Pale Cyan
    ];

    // Compute particle density based on screen dimensions
    const particleCount = Math.min(Math.floor((width * height) / 12000), 140);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const initialAlpha = 0.15 + Math.random() * 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: initialAlpha,
        targetAlpha: initialAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: 0.004 + Math.random() * 0.012,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle oscillation
        if (Math.abs(p.alpha - p.targetAlpha) < 0.05) {
          p.targetAlpha = 0.12 + Math.random() * 0.8;
        }
        p.alpha += (p.targetAlpha - p.alpha) * p.twinkleSpeed;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Interactive mouse gravity / glow field
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let extraAlpha = 0;
        if (dist < 140) {
          extraAlpha = (1 - dist / 140) * 0.5;
        }

        const effectiveAlpha = Math.min(p.alpha + extraAlpha, 1);

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${effectiveAlpha})`;
        ctx.shadowBlur = p.radius > 1.2 ? 8 : 4;
        ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
        ctx.fill();

        // Connect nearby particles with subtle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 80) {
            const lineAlpha = (1 - distBetween / 80) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Architectural Alignment Grid */}
      <div 
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Celestial Starry Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />
    </div>
  );
}
