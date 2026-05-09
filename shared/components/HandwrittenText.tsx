import React from 'react';
import { fonts } from '../theme';
import { seededRandom } from '../utils';

interface HandwrittenTextProps {
  text: string;
  progress: number;
  fontSize?: number | string;
  color?: string;
  rotation?: number;
  style?: React.CSSProperties;
}

export function HandwrittenText({
  text,
  progress,
  fontSize = 32,
  color = '#f5e6d3',
  rotation,
  style,
}: HandwrittenTextProps) {
  // Deterministic subtle rotation based on first char
  const charSeed = text.charCodeAt(0) || 0;
  const autoRotation = (seededRandom(charSeed) - 0.5) * 2; // -1..1 deg
  const finalRotation = rotation ?? autoRotation;

  // Reveal: clip from left → right
  const clipRight = (1 - Math.min(1, progress)) * 100;

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `rotate(${finalRotation}deg)`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize,
          color,
          lineHeight: 1.2,
          letterSpacing: '0.02em',
          clipPath: `inset(0 ${clipRight}% 0 0)`,
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </div>
    </div>
  );
}
