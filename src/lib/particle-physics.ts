export interface Particle {
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
  heat: number; // 0 = resting white, 1 = energized luminous white
}

export interface PointerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

export const LOGICAL_SIZE = 420;
export const CENTER = LOGICAL_SIZE / 2;
export const OUTER_RADIUS = 145;
export const INNER_RADIUS = 88;

// Generous hover interaction radius & slow, fluid zero-gravity physics (in seconds)
export const INTERACT_RADIUS = 145;
export const STIFFNESS = 6.2; // s^-2 — unhurried, weightless spring return (~1.9s settle)
export const DAMPING = 4.2; // s^-1 — silky fluid drag (zeta ~ 0.84, zero harsh bounce)
export const REPEL_STRENGTH = 2200; // px/s^2 — lush, expressive parting around pointer
export const SWIRL_STRENGTH = 620; // px/s^2 — graceful orbital curl during hover
export const WAKE_COUPLING = 0.18; // pointer velocity wake transfer
export const MAX_SPEED = 190; // px/s — serene speed ceiling so sweeps never snap
export const PARTICLE_COUNT = 1950;

// Crisp pure white & subtle cool/warm starlight white for micro-depth
const COLOR_PURE_WHITE = [255, 255, 255] as const;
const COLOR_SOFT_WHITE = [244, 246, 248] as const;

export function createParticles(count: number = PARTICLE_COUNT): Particle[] {
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

    // 18% of particles hug the inner/outer rims tightly for crisp architectural "O" definition
    let r: number;
    if (i < count * 0.09) {
      r = OUTER_RADIUS - rand() * 2.5;
    } else if (i < count * 0.18) {
      r = INNER_RADIUS + rand() * 2.5;
    } else {
      // Uniform area distribution across the annulus
      r = Math.sqrt(rand() * (rOutSq - rInSq) + rInSq);
    }

    const homeX = CENTER + Math.cos(angle) * r;
    const homeY = CENTER + Math.sin(angle) * r;

    const baseColor = rand() < 0.82 ? COLOR_PURE_WHITE : COLOR_SOFT_WHITE;

    // Tiny white stardust particles (0.55px – 1.20px)
    const radius = 0.55 + rand() * 0.65;
    const baseAlpha = 0.42 + rand() * 0.5; // 42% – 92%

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
      // Serene, slow ambient micro-drift
      driftSpeed: 0.12 + rand() * 0.18,
      driftAmp: 0.9 + rand() * 1.3,
      heat: 0,
    });
  }

  return particles;
}

export function stepParticleField(
  particles: Particle[],
  pointer: PointerState,
  timeSec: number,
  rawDt: number
): void {
  // Clamp dt so tab-switching or frame hitches never explode physics
  const dt = Math.max(0.001, Math.min(rawDt, 0.04));
  const interactSq = INTERACT_RADIUS * INTERACT_RADIUS;
  const drag = Math.exp(-DAMPING * dt);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Gentle living micro-drift around home position
    const driftX = Math.cos(timeSec * p.driftSpeed + p.phase) * p.driftAmp;
    const driftY = Math.sin(timeSec * p.driftSpeed * 0.85 + p.phase) * p.driftAmp;
    const targetX = p.homeX + driftX;
    const targetY = p.homeY + driftY;

    let displaced = false;
    if (pointer.active) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < interactSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const proximity = 1 - dist / INTERACT_RADIUS;
        const nx = dx / dist;
        const ny = dy / dist;

        // Smooth radial parting + subtle tangential swirl
        const radialAccel = proximity * proximity * REPEL_STRENGTH;
        const swirlAccel = proximity * SWIRL_STRENGTH;

        p.vx += (nx * radialAccel - ny * swirlAccel) * dt;
        p.vy += (ny * radialAccel + nx * swirlAccel) * dt;

        // Subtle fluid wake carried from pointer motion
        p.vx += pointer.vx * proximity * WAKE_COUPLING * dt;
        p.vy += pointer.vy * proximity * WAKE_COUPLING * dt;

        p.heat = Math.min(1, p.heat + proximity * dt * 3.5);
        displaced = true;
      }
    }

    // Soft, unhurried spring return back to home coordinate
    p.vx += (targetX - p.x) * STIFFNESS * dt;
    p.vy += (targetY - p.y) * STIFFNESS * dt;

    // Frame-rate-independent fluid damping
    p.vx *= drag;
    p.vy *= drag;

    // Soft speed ceiling so fast cursor sweeps feel silky, never twitchy
    const speedSq = p.vx * p.vx + p.vy * p.vy;
    if (speedSq > MAX_SPEED * MAX_SPEED) {
      const scale = MAX_SPEED / Math.sqrt(speedSq);
      p.vx *= scale;
      p.vy *= scale;
    }

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Smoothly relax energized glow back to resting opacity
    if (!displaced && p.heat > 0) {
      const homeDist = Math.hypot(p.x - targetX, p.y - targetY);
      const targetHeat = Math.min(1, homeDist / 45);
      p.heat += (targetHeat - p.heat) * Math.min(1, dt * 3.2);
      if (p.heat < 0.01) p.heat = 0;
    }
  }
}
