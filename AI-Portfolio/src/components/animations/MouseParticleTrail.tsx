"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
  color: string;
  alpha: number;
  decay: number;
}

const PALETTE = [
  "#713dff", // Wope Ultraviolet Core
  "#3b82f6", // Electric Blue
  "#06b6d4", // Cyan
  "#ec4899", // Lilac Pink
  "#ffffff", // Soft White
];

const MAX_PARTICLES = 100;
const MIN_MOVE_DISTANCE = 3; // minimum px moved before emitting particle

export default function MouseParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop: draws glowing circles, updates position, alpha, and size
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size = Math.max(0, p.initialSize * (p.alpha > 0 ? p.alpha : 0));

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // If particles remain, continue loop; otherwise sleep to save 100% CPU/GPU
      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        animFrameIdRef.current = null;
      }
    };

    const startAnimation = () => {
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!lastPosRef.current) {
        lastPosRef.current = { x: currentX, y: currentY };
        return;
      }

      const dx = currentX - lastPosRef.current.x;
      const dy = currentY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Spawn particles on movement
      if (dist >= MIN_MOVE_DISTANCE) {
        const particles = particlesRef.current;
        const spawnCount = dist > 20 ? 3 : 2;

        for (let i = 0; i < spawnCount; i++) {
          if (particles.length >= MAX_PARTICLES) {
            particles.shift();
          }

          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.9 + 0.3;
          const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
          const size = Math.random() * 2.5 + 2.5; // 2.5px to 5.0px radius

          particles.push({
            x: currentX + (Math.random() - 0.5) * 6,
            y: currentY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed + dx * 0.05,
            vy: Math.sin(angle) * speed + dy * 0.05,
            size,
            initialSize: size,
            color: randomColor,
            alpha: 0.95,
            decay: Math.random() * 0.012 + 0.01, // ~70-90 frames (~1.2-1.5s)
          });
        }

        lastPosRef.current = { x: currentX, y: currentY };
        startAnimation();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
    />
  );
}
