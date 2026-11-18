import test from "node:test";
import assert from "node:assert/strict";
import {
  CENTER,
  INNER_RADIUS,
  INTERACT_RADIUS,
  MAX_SPEED,
  OUTER_RADIUS,
  PARTICLE_COUNT,
  createParticles,
  stepParticleField,
  type PointerState,
} from "./particle-physics";

test("createParticles generates tiny white particles inside the O annulus", () => {
  const particles = createParticles();
  assert.equal(particles.length, PARTICLE_COUNT);

  for (const p of particles) {
    const distFromCenter = Math.hypot(p.homeX - CENTER, p.homeY - CENTER);
    assert.ok(
      distFromCenter >= INNER_RADIUS - 0.01 && distFromCenter <= OUTER_RADIUS + 0.01,
      `particle radial distance ${distFromCenter} outside annulus`
    );
    assert.ok(p.radius >= 0.5 && p.radius <= 1.25, `particle radius ${p.radius} should be tiny`);
    assert.ok(p.baseR >= 244 && p.baseG >= 244 && p.baseB >= 244, "particles should be white");
    assert.ok(p.driftSpeed <= 0.45, `ambient driftSpeed ${p.driftSpeed} should be calm`);
  }
});

test("hovering physics smoothly repels and swirls particles within generous radius", () => {
  const particles = createParticles(200);
  // Pick a particle on the right edge of the O
  const target = particles.reduce((best, curr) => (curr.homeX > best.homeX ? curr : best), particles[0]);

  const pointer: PointerState = {
    x: target.homeX - 20,
    y: target.homeY,
    vx: 120,
    vy: 0,
    active: true,
  };

  // Simulate 0.4s at 60fps
  for (let i = 0; i < 24; i++) {
    stepParticleField(particles, pointer, i / 60, 1 / 60);
  }

  const displacement = Math.hypot(target.x - target.homeX, target.y - target.homeY);
  const speed = Math.hypot(target.vx, target.vy);

  assert.ok(displacement > 8, `expected noticeable hover displacement, got ${displacement}`);
  assert.ok(speed <= MAX_SPEED + 0.01, `speed ${speed} exceeded MAX_SPEED`);
  assert.ok(target.heat > 0.1, "hovered particle should gain luminous heat");

  // Particles far outside INTERACT_RADIUS stay near home
  const farParticle = particles.find(
    (p) => Math.hypot(p.homeX - pointer.x, p.homeY - pointer.y) > INTERACT_RADIUS + 20
  );
  if (farParticle) {
    const farDist = Math.hypot(farParticle.x - farParticle.homeX, farParticle.y - farParticle.homeY);
    assert.ok(farDist < 5, `far particle should only gently drift, got ${farDist}`);
  }
});

test("spring return is unhurried and frame-rate independent (60Hz vs 120Hz)", () => {
  const particles60 = createParticles(60);
  const particles120 = createParticles(60);

  const pointer: PointerState = {
    x: CENTER + (INNER_RADIUS + OUTER_RADIUS) / 2,
    y: CENTER,
    vx: 0,
    vy: 0,
    active: true,
  };

  // Hover for 0.3s in both 60Hz and 120Hz
  for (let i = 0; i < 18; i++) {
    stepParticleField(particles60, pointer, i / 60, 1 / 60);
  }
  for (let i = 0; i < 36; i++) {
    stepParticleField(particles120, pointer, i / 120, 1 / 120);
  }

  // Release pointer and let return for 0.25s (should still be gliding back, not snapped home)
  const idle: PointerState = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
  for (let i = 0; i < 15; i++) {
    stepParticleField(particles60, idle, 0.3 + i / 60, 1 / 60);
  }
  for (let i = 0; i < 30; i++) {
    stepParticleField(particles120, idle, 0.3 + i / 120, 1 / 120);
  }

  const maxDisp60 = Math.max(...particles60.map((p) => Math.hypot(p.x - p.homeX, p.y - p.homeY)));
  const maxDisp120 = Math.max(...particles120.map((p) => Math.hypot(p.x - p.homeX, p.y - p.homeY)));

  assert.ok(maxDisp60 > 4, `expected slow unhurried return after 0.25s, got ${maxDisp60}`);
  assert.ok(
    Math.abs(maxDisp60 - maxDisp120) < 3.5,
    `60Hz (${maxDisp60.toFixed(2)}) and 120Hz (${maxDisp120.toFixed(2)}) should match closely`
  );
});
