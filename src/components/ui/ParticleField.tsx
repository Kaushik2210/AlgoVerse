"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "@/lib/store/theme";
import { useMounted } from "@/lib/hooks/useMounted";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
}

/** Dark mode: bright cyan dots + violet constellation lines on navy — reads
 * as a HUD starfield. Light mode: the same motion, but inverted to soft
 * ink-navy dots at low opacity on the warm paper background — a bright
 * neon glow on white would just look like a rendering bug, not "premium". */
const PALETTE = {
  dark: { dot: "0, 240, 255", line: "168, 85, 247", dotAlpha: 0.35, dotBase: 0.1, lineAlpha: 0.08 },
  light: { dot: "13, 19, 38", line: "0, 137, 168", dotAlpha: 0.16, dotBase: 0.04, lineAlpha: 0.05 },
};

/**
 * Subtle, slow-moving constellation background. Pure canvas, no deps.
 * Respects prefers-reduced-motion by rendering a static frame only.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useThemeStore((s) => s.theme);
  const mounted = useMounted();
  // Avoid a flash of the wrong palette before the persisted theme hydrates.
  const activeTheme = mounted ? theme : "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = PALETTE[activeTheme];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let animationId: number;
    const COUNT = 90;
    const MAX_DIST = 130;

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5 + 0.15,
        r: Math.random() * 1.4 + 0.4,
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${palette.dot}, ${palette.dotAlpha})`;

      for (const s of stars) {
        ctx.beginPath();
        ctx.globalAlpha = palette.dotAlpha * s.z + palette.dotBase;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.strokeStyle = `rgba(${palette.line}, ${palette.lineAlpha * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function tick() {
      for (const s of stars) {
        s.y += s.z * 0.08;
        s.x += s.z * 0.03;
        if (s.y > height) s.y = 0;
        if (s.x > width) s.x = 0;
      }
      draw();
      animationId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      draw();
    } else {
      animationId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [activeTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none opacity-60"
    />
  );
}
