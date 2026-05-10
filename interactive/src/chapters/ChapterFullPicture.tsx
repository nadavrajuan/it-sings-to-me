import React from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { useIsMobile } from '../lib/useIsMobile';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const IMAGES = [
  '/assets/images/mj-06-cosmic-face.png',
  '/assets/images/mj-03-girl-jar.png',
  '/assets/images/mj-01-cotton-stars.png',
  '/assets/images/mj-05-marionette-dancer.png',
  '/assets/images/mj-04-girl-doll.png',
  '/assets/images/mj-02-galaxy.png',
];

const FLOW = [
  { from: 'Piano improvisation', arrow: '→', to: 'song', tool: 'Suno', color: palette.candle },
  { from: 'Gibberish language', arrow: '→', to: 'lyrics → symbols', tool: 'ChatGPT', color: palette.teal },
  { from: 'Symbols', arrow: '→', to: 'visual world', tool: 'Midjourney', color: '#c77b4a' },
];

export function ChapterFullPicture({ onNavigate }: ChapterProps) {
  const isMobile = useIsMobile();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src="/assets/images/mj-03-girl-jar.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'saturate(0.2) brightness(0.12)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(160deg, ${palette.ink}E0 0%, ${palette.ink}A8 55%, ${palette.ink}CC 100%)`,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `clamp(18px, 4vh, 42px) clamp(18px, 5vw, 72px) calc(clamp(18px, 4vh, 36px) + env(safe-area-inset-bottom))`,
          gap: 'clamp(14px, 2.4vh, 26px)',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontWeight: isMobile ? 600 : 400,
            fontSize: isMobile ? 'clamp(18px, 5vw, 24px)' : 'clamp(15px, 2.2vw, 24px)',
            color: palette.cream,
            lineHeight: isMobile ? 1.5 : 1.58,
            textAlign: 'center',
            maxWidth: isMobile ? '30ch' : '44ch',
            margin: 0,
            textShadow: '0 2px 16px rgba(0,0,0,0.82)',
          }}
        >
          A music video built through a dialogue between human improvisation and machine subconscious — translating sound into language, language into symbols, and symbols into a visual world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, minmax(0, 1fr))' : 'repeat(6, minmax(0, 1fr))',
            gap: 'clamp(6px, 0.9vw, 10px)',
            width: 'min(100%, 1180px)',
          }}
        >
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22 + i * 0.07, duration: 0.45 }}
              style={{
                aspectRatio: '3/4',
                borderRadius: 8,
                overflow: 'hidden',
                border: `1px solid ${palette.teal}35`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={src}
                alt=""
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48, duration: 0.55 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(9px, 1.1vw, 12px)',
            color: `${palette.cream}60`,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          the full picture
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 1.4vh, 16px)',
            alignItems: 'center',
            alignSelf: 'center',
            maxWidth: 820,
          }}
        >
          {FLOW.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.58 + i * 0.16, duration: 0.55 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(6px, 1vw, 12px)',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontStyle: 'italic',
                  fontSize: 'clamp(15px, 2.2vw, 22px)',
                  color: palette.cream,
                }}
              >
                {row.from}
              </span>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 'clamp(14px, 2vw, 20px)',
                  color: `${palette.cream}55`,
                }}
              >
                {row.arrow}
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontStyle: 'italic',
                  fontSize: 'clamp(15px, 2.2vw, 22px)',
                  color: palette.cream,
                }}
              >
                {row.to}
              </span>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 'clamp(8px, 0.95vw, 10px)',
                  color: row.color,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '2px 9px',
                  border: `1px solid ${row.color}55`,
                  borderRadius: 20,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.tool}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(8px, 0.9vw, 10px)',
            color: `${palette.cream}35`,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          ↓ continue
        </motion.div>
      </div>
    </div>
  );
}
