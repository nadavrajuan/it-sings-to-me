import React from 'react';
import { palette } from '../theme';
import { lerp } from '../utils';

interface JarProps {
  progress: number;
  contents?: React.ReactNode;
  width?: number;
  height?: number;
}

export function Jar({ progress, contents, width = 200, height = 280 }: JarProps) {
  const neckW = width * 0.45;
  const neckH = height * 0.12;
  const bodyW = width;
  const bodyH = height * 0.78;
  const lidH = height * 0.07;
  const rx = bodyW * 0.15;

  // Glow pulses with progress
  const glowOpacity = lerp(progress, [0.2, 0.8], [0.3, 0.7]);
  const clipId = `jar-clip-${Math.round(progress * 100)}`;

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
      >
        <defs>
          {/* Clip path for jar body — contents render inside this */}
          <clipPath id={clipId}>
            <rect
              x={(width - bodyW) / 2}
              y={neckH + lidH}
              width={bodyW}
              height={bodyH}
              rx={rx}
            />
          </clipPath>
          {/* Radial glow gradient */}
          <radialGradient id="jar-glow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={palette.candle} stopOpacity={glowOpacity} />
            <stop offset="100%" stopColor={palette.candle} stopOpacity={0} />
          </radialGradient>
          {/* Glass highlight gradient */}
          <linearGradient id="jar-glass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.cobalt} stopOpacity={0.6} />
            <stop offset="30%" stopColor={palette.crystal} stopOpacity={0.12} />
            <stop offset="70%" stopColor={palette.cobalt} stopOpacity={0.4} />
            <stop offset="100%" stopColor={palette.cobalt} stopOpacity={0.8} />
          </linearGradient>
        </defs>

        {/* Glow behind jar */}
        <ellipse
          cx={width / 2}
          cy={height * 0.7}
          rx={bodyW * 0.7}
          ry={bodyH * 0.5}
          fill="url(#jar-glow)"
        />

        {/* Lid */}
        <rect
          x={(width - neckW * 1.1) / 2}
          y={neckH}
          width={neckW * 1.1}
          height={lidH}
          rx={3}
          fill={palette.cobalt}
          stroke={palette.teal}
          strokeWidth={1}
        />

        {/* Neck */}
        <rect
          x={(width - neckW) / 2}
          y={0}
          width={neckW}
          height={neckH + lidH}
          rx={4}
          fill={palette.cobalt}
          stroke={palette.teal}
          strokeWidth={1}
        />

        {/* Jar body (fill) */}
        <rect
          x={(width - bodyW) / 2}
          y={neckH + lidH}
          width={bodyW}
          height={bodyH}
          rx={rx}
          fill={palette.ink}
          stroke={palette.teal}
          strokeWidth={1.5}
        />

        {/* Contents clipped to jar body */}
        <foreignObject
          x={(width - bodyW) / 2}
          y={neckH + lidH}
          width={bodyW}
          height={bodyH}
          clipPath={`url(#${clipId})`}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {contents}
          </div>
        </foreignObject>

        {/* Glass sheen overlay */}
        <rect
          x={(width - bodyW) / 2}
          y={neckH + lidH}
          width={bodyW}
          height={bodyH}
          rx={rx}
          fill="url(#jar-glass)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
