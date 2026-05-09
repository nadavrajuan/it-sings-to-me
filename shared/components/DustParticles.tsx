import React, { useMemo } from 'react';
import { seededRandom } from '../utils';

interface DustParticlesProps {
  count: number;
  progress: number;
  color: string;
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  dx: number;
  dy: number;
  phase: number;
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const s = (n: number) => seededRandom(i * 7 + n);
    return {
      x: s(0) * 100,
      y: s(1) * 100,
      size: 1 + s(2) * 2,
      opacity: 0.08 + s(3) * 0.25,
      dx: (s(4) - 0.5) * 6,
      dy: (s(5) - 0.5) * 6 - 2, // slight upward bias
      phase: s(6),
    };
  });
}

export function DustParticles({ count, progress, color, speed = 1 }: DustParticlesProps) {
  const particles = useMemo(() => buildParticles(count), [count]);
  const t = ((progress * speed) % 1 + 1) % 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {particles.map((p, i) => {
        const cycle = (t + p.phase) % 1;
        const x = ((p.x + p.dx * cycle) % 100 + 100) % 100;
        const y = ((p.y + p.dy * cycle) % 100 + 100) % 100;
        // Soft twinkle via opacity modulation
        const opacityMod = 0.7 + 0.3 * Math.sin(cycle * Math.PI * 2 + p.phase * 6.28);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: p.opacity * opacityMod,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
}
