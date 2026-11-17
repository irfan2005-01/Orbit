"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseR: number;
  baseG: number;
  baseB: number;
  baseAlpha: number;
  phase: number;
  driftSpeed: number;
  driftAmp: number;
  heat: number; // 0 = base color, 1 = full Brick Rose (#BC806A)
}

const LOGICAL_SIZE = 420;
const CENTER = LOGICAL_SIZE / 2;
const OUTER_RADIUS = 145;
const INNER_RADIUS = 88;
const INTERACT_RADIUS = 95;
const FRICTION = 0.86;
const SPRING_EASE = 0.065;

// Exact Petroleum & Brick Rose RGB tuples
const COLOR_IVORY = [239, 231, 228] as const; // #EFE7E4
const COLOR_SAND = [181, 146, 137] as const;  // #B59289
const COLOR_BRICK = [188, 128, 106] as const; // #BC806A

function createParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  const rOutSq = OUTER_RADIUS * OUTER_RADIUS;
  const rInSq = INNER_RADIUS * INNER_RADIUS;

  // Deterministic pseudo-random generator for clean, balanced distribution
  let seed = 4219;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;

    // 16% of particles hug the inner/outer rims tightly for crisp architectural definition
    let r: number;
    if (i < count * 0.08) {
      r = OUTER_RADIUS - rand() * 3.5;
    } else if (i < count * 0.16) {
      r = INNER_RADIUS + rand() * 3.5;
    } else {
      // Uniform area distribution across the annulus
      r = Math.sqrt(rand() * (rOutSq - rInSq) + rInSq);
    }

    const homeX = CENTER + Math.cos(angle) * r;
    const homeY = CENTER + Math.sin(angle) * r;

    // Color distribution: ~20% Brick Rose accent, ~45% Warm Sand-White, ~35% Rosy Sand
    const colorPick = rand();
    const baseColor =
      colorPick < 0.2
        ? COLOR_BRICK
        : colorPick < 0.65
        ? COLOR_IVORY
        : COLOR_SAND;

    const radius = 1.2 + rand() * 1.0; // 1.2px – 2.2px
    const baseAlpha = 0.65 + rand() * 0.25; // 65% – 90%

    particles.push({
      homeX,
      homeY,
      x: homeX,
      y: homeY,
      vx: 0,
      vy: 0,
      radius,
      baseR: baseColor[0],
      baseG: baseColor[1],
      baseB: baseColor[2],
      baseAlpha,
      phase: rand() * Math.PI * 2,
      driftSpeed: 0.45 + rand() * 0.55,
      driftAmp: 1.0 + rand() * 1.4,
      heat: 0,
    });
  }

  return particles;
}

export function OrbiteParticleO() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = createParticles(1050);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animFrame = 0;
    let currentScale = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const displaySize = Math.max(240, Math.min(rect.width || LOGICAL_SIZE, LOGICAL_SIZE));

      canvas.width = Math.round(displaySize * dpr);
      canvas.height = Math.round(displaySize * dpr);
      canvas.style.width = `${displaySize}px`;
      canvas.style.height = `${displaySize}px`;

      currentScale = displaySize / LOGICAL_SIZE;
      ctx.setTransform(dpr * currentScale, 0, 0, dpr * currentScale, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) {
        drawFrame(0, true);
      }
    });
    resizeObserver.observe(container);

    const drawGuideRings = () => {
      // Subtle outer hairline guide ring (#484A43 at 35% opacity)
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, OUTER_RADIUS + 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(72, 74, 67, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Delicate inner reference hairline
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, INNER_RADIUS - 14, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(72, 74, 67, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Minimal cardinal calibration ticks on outer ring
      const tickInner = OUTER_RADIUS + 16;
      const tickOuter = OUTER_RADIUS + 24;
      ctx.beginPath();
      ctx.moveTo(CENTER, CENTER - tickOuter);
      ctx.lineTo(CENTER, CENTER - tickInner);
      ctx.moveTo(CENTER, CENTER + tickInner);
      ctx.lineTo(CENTER, CENTER + tickOuter);
      ctx.moveTo(CENTER - tickOuter, CENTER);
      ctx.lineTo(CENTER - tickInner, CENTER);
      ctx.moveTo(CENTER + tickInner, CENTER);
      ctx.lineTo(CENTER + tickOuter, CENTER);
      ctx.strokeStyle = "rgba(188, 128, 106, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawFrame = (timeSec: number, isStatic: boolean) => {
      ctx.clearRect(0, 0, LOGICAL_SIZE, LOGICAL_SIZE);
      drawGuideRings();

      const pointer = pointerRef.current;
      const interactSq = INTERACT_RADIUS * INTERACT_RADIUS;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isStatic) {
          // Gentle living micro-drift around home position
          const driftX = Math.cos(timeSec * p.driftSpeed + p.phase) * p.driftAmp;
          const driftY = Math.sin(timeSec * p.driftSpeed * 0.85 + p.phase) * p.driftAmp;
          const targetX = p.homeX + driftX;
          const targetY = p.homeY + driftY;

          // Cursor repulsion inside 95px radius
          let displaced = false;
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < interactSq && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              const proximity = 1 - dist / INTERACT_RADIUS;
              const force = proximity * proximity * 5.2;

              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
              p.heat = Math.min(1, p.heat + proximity * 0.35);
              displaced = true;
            }
          }

          // Smooth spring return back to home coordinate
          p.vx += (targetX - p.x) * SPRING_EASE;
          p.vy += (targetY - p.y) * SPRING_EASE;

          // Velocity damping (friction: 0.86)
          p.vx *= FRICTION;
          p.vy *= FRICTION;

          p.x += p.vx;
          p.y += p.vy;

          // Smoothly cool Brick Rose tint back to base color when returning home
          if (!displaced && p.heat > 0) {
            const homeDist = Math.hypot(p.x - targetX, p.y - targetY);
            const targetHeat = Math.min(1, homeDist / 45);
            p.heat += (targetHeat - p.heat) * 0.1;
            if (p.heat < 0.01) p.heat = 0;
          }
        }

        // Interpolate tint toward Brick Rose (#BC806A) when displaced
        const h = p.heat;
        const r = Math.round(p.baseR + (COLOR_BRICK[0] - p.baseR) * h);
        const g = Math.round(p.baseG + (COLOR_BRICK[1] - p.baseG) * h);
        const b = Math.round(p.baseB + (COLOR_BRICK[2] - p.baseB) * h);
        const alpha = Math.min(0.98, p.baseAlpha + h * 0.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
        ctx.fill();
      }
    };

    if (reducedMotion) {
      drawFrame(0, true);
    } else {
      const startTime = performance.now();
      const loop = (now: number) => {
        drawFrame((now - startTime) / 1000, false);
        animFrame = requestAnimationFrame(loop);
      };
      animFrame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = LOGICAL_SIZE / rect.width;
    const scaleY = LOGICAL_SIZE / rect.height;

    pointerRef.current.x = (e.clientX - rect.left) * scaleX;
    pointerRef.current.y = (e.clientY - rect.top) * scaleY;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    pointerRef.current.x = -9999;
    pointerRef.current.y = -9999;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="block cursor-crosshair touch-none"
        aria-label="Interactive Orbite particle letter O graphic"
        role="img"
      />
    </div>
  );
}
