"use client";

import React, { useEffect, useRef } from "react";
import {
  CENTER,
  INNER_RADIUS,
  LOGICAL_SIZE,
  OUTER_RADIUS,
  PARTICLE_COUNT,
  createParticles,
  stepParticleField,
  type PointerState,
} from "@/lib/particle-physics";

export function OrbiteParticleO() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<PointerState>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    active: false,
  });
  const prevPointerPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = createParticles(PARTICLE_COUNT);
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
        drawFrame(0, 0.016, true);
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

    const drawFrame = (timeSec: number, dt: number, isStatic: boolean) => {
      ctx.clearRect(0, 0, LOGICAL_SIZE, LOGICAL_SIZE);
      drawGuideRings();

      const pointer = pointerRef.current;

      if (!isStatic) {
        stepParticleField(particles, pointer, timeSec, dt);

        // Smoothly decay pointer wake velocity when cursor pauses
        const wakeDecay = Math.exp(-8 * Math.min(dt, 0.04));
        pointer.vx *= wakeDecay;
        pointer.vy *= wakeDecay;
      }

      // Batch tiny white particles into 6 opacity buckets (6 draw calls total per frame)
      const BUCKETS = 6;
      const bucketIndices: number[][] = Array.from({ length: BUCKETS }, () => []);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = Math.min(1, p.baseAlpha + p.heat * 0.42);
        const idx = Math.min(BUCKETS - 1, Math.max(0, Math.floor(((alpha - 0.4) / 0.6) * BUCKETS)));
        bucketIndices[idx].push(i);
      }

      for (let b = 0; b < BUCKETS; b++) {
        const list = bucketIndices[b];
        if (list.length === 0) continue;

        const bucketAlpha = Math.min(1, 0.45 + (b / (BUCKETS - 1)) * 0.55);
        ctx.beginPath();
        for (let j = 0; j < list.length; j++) {
          const p = particles[list[j]];
          const drawRadius = p.radius + p.heat * 0.25;
          ctx.moveTo(p.x + drawRadius, p.y);
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${bucketAlpha.toFixed(2)})`;
        ctx.fill();
      }
    };

    if (reducedMotion) {
      drawFrame(0, 0.016, true);
    } else {
      const startTime = performance.now();
      let lastTime = startTime;
      const loop = (now: number) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        drawFrame((now - startTime) / 1000, dt, false);
        animFrame = requestAnimationFrame(loop);
      };
      animFrame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
    };
  }, []);

  const updatePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const scaleX = LOGICAL_SIZE / rect.width;
    const scaleY = LOGICAL_SIZE / rect.height;
    const nextX = (e.clientX - rect.left) * scaleX;
    const nextY = (e.clientY - rect.top) * scaleY;
    const now = performance.now();

    const prev = prevPointerPosRef.current;
    if (prev) {
      const dt = Math.max(0.008, (now - prev.time) / 1000);
      const rawVx = Math.max(-500, Math.min(500, (nextX - prev.x) / dt));
      const rawVy = Math.max(-500, Math.min(500, (nextY - prev.y) / dt));
      pointerRef.current.vx = pointerRef.current.vx * 0.5 + rawVx * 0.5;
      pointerRef.current.vy = pointerRef.current.vy * 0.5 + rawVy * 0.5;
    }

    prevPointerPosRef.current = { x: nextX, y: nextY, time: now };
    pointerRef.current.x = nextX;
    pointerRef.current.y = nextY;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    pointerRef.current.x = -9999;
    pointerRef.current.y = -9999;
    pointerRef.current.vx = 0;
    pointerRef.current.vy = 0;
    prevPointerPosRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        data-testid="orbite-particle-o"
        onPointerEnter={updatePointer}
        onPointerMove={updatePointer}
        onPointerDown={updatePointer}
        onPointerLeave={handlePointerLeave}
        className="block cursor-crosshair touch-none"
        aria-label="Interactive Orbite particle letter O graphic"
        role="img"
      />
    </div>
  );
}
