import React from 'react';
import { motion } from 'framer-motion';
import { palette } from '@looli/shared';

interface DotIndicatorProps {
  total: number;
  current: number;
  titles: string[];
  onChange: (index: number) => void;
}

export function DotIndicator({ total, current, titles, onChange }: DotIndicatorProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 1000,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          title={titles[i]}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 8,
            height: i === current ? 24 : 8,
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            background: i === current ? palette.candle : `${palette.cream}50`,
            padding: 0,
            transition: 'height 0.3s ease, background 0.3s ease',
          }}
          aria-label={`Go to chapter ${i + 1}: ${titles[i]}`}
        />
      ))}
    </div>
  );
}
