import React from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

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
  { from: 'Piano improvisation', arrow: '→', to: 'song',            tool: 'Suno',       color: palette.candle },
  { from: 'Gibberish language',  arrow: '→', to: 'lyrics → symbols', tool: 'ChatGPT',    color: palette.teal  },
  { from: 'Symbols',             arrow: '→', to: 'visual world',     tool: 'Midjourney', color: '#c77b4a'     },
];

export function ChapterFullPicture({ onNavigate }: ChapterProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Background: ghost image */}
      <img
        src="/assets/images/mj-03-girl-jar.png"
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
          filter: 'saturate(0.2) brightness(0.12)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(160deg, ${palette.ink}E0 0%, ${palette.ink}A8 55%, ${palette.ink}CC 100%)`,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(24px, 4vh, 48px) clamp(32px, 6vw, 80px)',
        gap: 'clamp(16px, 2.5vh, 28px)',
      }}>

        {/* Image strip — centred */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex', gap: 'clamp(4px, 0.6vw, 8px)',
            justifyContent: 'center',
          }}
        >
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
              style={{
                width: 'clamp(80px, 11vw, 160px)',
                aspectRatio: '3/4',
                borderRadius: 8, overflow: 'hidden',
                border: `1px solid ${palette.teal}35`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={src} alt=""
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* "THE FULL PICTURE" label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{
            fontFamily: fonts.mono, fontSize: 'clamp(9px, 1.1vw, 12px)',
            color: `${palette.cream}60`, letterSpacing: '0.25em', textTransform: 'uppercase',
          }}
        >
          the full picture
        </motion.div>

        {/* Flow chain — left-aligned block */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(8px, 1.4vh, 16px)',
          alignSelf: 'flex-start',
          paddingLeft: 'clamp(0px, 2vw, 40px)',
        }}>
          {FLOW.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.16, duration: 0.55 }}
              style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1vw, 12px)', flexWrap: 'wrap' }}
            >
              <span style={{
                fontFamily: fonts.body, fontStyle: 'italic',
                fontSize: 'clamp(15px, 2.4vw, 22px)', color: palette.cream,
              }}>
                {row.from}
              </span>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: 'clamp(14px, 2vw, 20px)', color: `${palette.cream}55`,
              }}>
                {row.arrow}
              </span>
              <span style={{
                fontFamily: fonts.body, fontStyle: 'italic',
                fontSize: 'clamp(15px, 2.4vw, 22px)', color: palette.cream,
              }}>
                {row.to}
              </span>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: 'clamp(8px, 0.9vw, 10px)',
                color: row.color, letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '2px 9px', border: `1px solid ${row.color}55`, borderRadius: 20,
                whiteSpace: 'nowrap',
              }}>
                {row.tool}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            height: 1, width: 'clamp(80px, 28vw, 320px)',
            background: `${palette.teal}45`, transformOrigin: 'center',
            alignSelf: 'center',
          }}
        />

        {/* Marketing paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{
            fontFamily: fonts.body, fontStyle: 'italic',
            fontSize: 'clamp(13px, 2vw, 20px)',
            color: palette.cream,
            lineHeight: 1.65, textAlign: 'center',
            maxWidth: '58ch', margin: 0,
            textShadow: '0 2px 16px rgba(0,0,0,0.8)',
          }}
        >
          A music video built through a dialogue between human improvisation and machine subconscious — translating sound into language, language into symbols, and symbols into a visual world.
        </motion.p>

        {/* Continue hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            fontFamily: fonts.mono, fontSize: 'clamp(8px, 0.9vw, 10px)',
            color: `${palette.cream}35`, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}
        >
          ↓ continue
        </motion.div>
      </div>
    </div>
  );
}
