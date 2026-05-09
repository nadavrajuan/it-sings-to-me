import React from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const MOTIFS = [
  {
    src: '/assets/images/mj-01-cotton-stars.png',
    phrase: 'Looli looli baneh doo',
    label: 'Cotton Stars',
  },
  {
    src: '/assets/images/mj-04-girl-doll.png',
    phrase: 'Marru deh, marru deh',
    label: 'A doll became a memory',
  },
  {
    src: '/assets/images/mj-05-marionette-dancer.png',
    phrase: 'Saffa ranji tilu too',
    label: 'Marionette Dancer',
  },
  {
    src: '/assets/images/mj-06-cosmic-face.png',
    phrase: 'Tondaluna, shree shree sha',
    label: 'Cosmic Face',
  },
];

export function Chapter04_Jar({ onNavigate }: ChapterProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: `radial-gradient(ellipse at 40% 35%, ${palette.cobalt} 0%, ${palette.ink} 65%)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        style={{
          padding: 'clamp(20px, 3vh, 36px) clamp(20px, 4vw, 48px) clamp(10px, 1.5vh, 20px)',
          flexShrink: 0,
        }}
      >
        <h2
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 4vw, 40px)',
            color: palette.cream,
            lineHeight: 1.1,
          }}
        >
          The Jar of Motifs
        </h2>
        <p
          style={{
            fontFamily: fonts.display,
            fontSize: 'clamp(13px, 1.8vw, 17px)',
            color: `${palette.candle}BB`,
            marginTop: 4,
          }}
        >
          a lyric became an image became a scene
        </p>
      </motion.div>

      {/* 2×2 image grid — fills remaining space */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 'clamp(6px, 1vw, 12px)',
          padding: '0 clamp(12px, 2vw, 24px) clamp(12px, 2vh, 24px)',
          minHeight: 0,
        }}
      >
        {MOTIFS.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              borderRadius: 10,
              overflow: 'hidden',
              border: `1px solid ${palette.teal}50`,
              minHeight: 0,
            }}
          >
            <img
              src={m.src}
              alt={m.label}
              onError={(e) => {
                (e.target as HTMLImageElement).style.background = palette.cobalt;
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Gradient overlay so text is always legible */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${palette.ink}EE 0%, ${palette.ink}55 45%, transparent 70%)`,
              }}
            />

            {/* Text labels */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(8px, 1.2vw, 14px)',
              }}
            >
              <p
                style={{
                  fontFamily: fonts.body,
                  fontStyle: 'italic',
                  fontSize: 'clamp(10px, 1.5vw, 14px)',
                  color: palette.candle,
                  lineHeight: 1.2,
                  marginBottom: 2,
                }}
              >
                {m.phrase}
              </p>
              <p
                style={{
                  fontFamily: fonts.display,
                  fontSize: 'clamp(12px, 1.8vw, 16px)',
                  color: palette.cream,
                  lineHeight: 1.15,
                }}
              >
                {m.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
