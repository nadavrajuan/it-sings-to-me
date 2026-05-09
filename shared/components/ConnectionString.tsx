import React from 'react';
import { seededRandom } from '../utils';

interface Point {
  x: number;
  y: number;
}

interface ConnectionStringProps {
  from: Point;
  to: Point;
  progress: number;
  color?: string;
  strokeWidth?: number;
  seed?: number;
}

export function ConnectionString({
  from,
  to,
  progress,
  color = '#d4a574',
  strokeWidth = 1.5,
  seed = 1,
}: ConnectionStringProps) {
  // Slight control-point offset for hand-drawn quadratic bezier
  const midX = (from.x + to.x) / 2 + (seededRandom(seed) - 0.5) * 30;
  const midY = (from.y + to.y) / 2 + (seededRandom(seed + 1) - 0.5) * 20;

  const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

  // Approximate path length for stroke-dasharray trick
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const pathLen = Math.sqrt(dx * dx + dy * dy) * 1.2; // approx with curve overhead

  const dashOffset = pathLen * (1 - Math.min(1, progress));

  // Bounding box for svg viewport
  const minX = Math.min(from.x, to.x, midX) - 20;
  const minY = Math.min(from.y, to.y, midY) - 20;
  const maxX = Math.max(from.x, to.x, midX) + 20;
  const maxY = Math.max(from.y, to.y, midY) + 20;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={pathLen}
        strokeDashoffset={dashOffset}
        opacity={0.85}
      />
    </svg>
  );
}
