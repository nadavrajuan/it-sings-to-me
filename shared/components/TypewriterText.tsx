import React from 'react';
import { fonts } from '../theme';

interface TypewriterTextProps {
  text: string;
  progress: number;
  font?: string;
  fontSize?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

export function TypewriterText({
  text,
  progress,
  font,
  fontSize = 24,
  color = '#f5e6d3',
  style,
}: TypewriterTextProps) {
  const visibleCount = Math.round(progress * text.length);
  const visible = text.slice(0, visibleCount);
  const hidden = text.slice(visibleCount);

  return (
    <div
      style={{
        fontFamily: font ?? fonts.body,
        fontSize,
        color,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        ...style,
      }}
    >
      {visible}
      {/* Invisible placeholder keeps layout stable */}
      <span style={{ opacity: 0 }}>{hidden}</span>
    </div>
  );
}
