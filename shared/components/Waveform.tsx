import React, { useMemo } from 'react';
import { generateFakePeaks } from '../utils';

interface WaveformProps {
  progress: number;
  audioPeaks?: number[];
  color?: string;
  style?: 'piano' | 'song';
  width?: number;
  height?: number;
}

export function Waveform({
  progress,
  audioPeaks,
  color = '#d4a574',
  style = 'piano',
  width = 320,
  height = 60,
}: WaveformProps) {
  const barCount = style === 'piano' ? 32 : 64;
  const peaks = useMemo(
    () => audioPeaks ?? generateFakePeaks(barCount, style === 'piano' ? 7 : 42),
    [audioPeaks, barCount, style],
  );

  const barWidth = style === 'piano' ? 3 : 2;
  const gap = style === 'piano' ? 4 : 2.5;
  const totalWidth = barCount * (barWidth + gap) - gap;
  const xOffset = (width - totalWidth) / 2;
  const visibleBars = Math.round(progress * barCount);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {peaks.map((peak, i) => {
        if (i >= visibleBars) return null;
        const barH = Math.max(2, peak * height * 0.9);
        const x = xOffset + i * (barWidth + gap);
        const y = (height - barH) / 2;
        // Bars toward the center of the reveal are slightly brighter
        const fadeIn = Math.min(1, (visibleBars - i) / 4);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barH}
            rx={barWidth / 2}
            fill={color}
            opacity={0.6 + 0.4 * fadeIn}
          />
        );
      })}
    </svg>
  );
}
