import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { VIMEO_BACKGROUND_URL, VIMEO_PLAYER_URL } from '../lib/media';
import { useIsMobile } from '../lib/useIsMobile';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const CREDITS = [
  ['Piano', 'Nadav Rajuan'],
  ['Lyrics', 'Nadav Rajuan + GPT-4'],
  ['Visuals', 'Midjourney'],
  ['Song', 'Suno AI'],
  ['Year', '2025'],
];

function VimeoOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.96, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(96vw, 1120px)',
          aspectRatio: '16/9',
          borderRadius: 14,
          overflow: 'hidden',
          border: `1px solid ${palette.teal}40`,
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          background: palette.ink,
        }}
      >
        <iframe
          src={VIMEO_PLAYER_URL}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </motion.div>

      <button
        onClick={onClose}
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          color: `${palette.cream}70`,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        close preview
      </button>
    </motion.div>
  );
}

export function Chapter06_Film({ onNavigate }: ChapterProps) {
  const isMobile = useIsMobile();
  const [showVimeo, setShowVimeo] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: palette.ink }}>
      <div style={{ position: 'absolute', inset: '-10%', zIndex: 0, pointerEvents: 'none' }}>
        <iframe
          src={VIMEO_BACKGROUND_URL}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `linear-gradient(to bottom, ${palette.ink}D6 0%, ${palette.ink}82 35%, ${palette.ink}C8 100%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `clamp(22px, 5vh, 46px) clamp(18px, 4vw, 42px) calc(clamp(22px, 4vh, 34px) + env(safe-area-inset-bottom))`,
        }}
      >
        <div
          style={{
            width: 'min(100%, 820px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: isMobile ? 14 : 18,
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 'clamp(10px, 1.2vw, 12px)',
                color: `${palette.candle}CC`,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              watch the clip
            </div>

            <h1
              style={{
                fontFamily: fonts.body,
                fontStyle: 'italic',
                fontSize: 'clamp(30px, 6vw, 58px)',
                color: palette.cream,
                lineHeight: 1.02,
                marginBottom: 12,
              }}
            >
              Watch the full video with sound
            </h1>

            <p
              style={{
                fontFamily: fonts.body,
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 2vw, 20px)',
                color: `${palette.cream}D6`,
                lineHeight: 1.6,
              }}
            >
              The background stays muted as atmosphere. Tap below to open the full clip with sound right here in the page.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <button
              onClick={() => setShowVimeo(true)}
              style={{
                fontFamily: fonts.mono,
                fontSize: 'clamp(12px, 1.45vw, 15px)',
                color: palette.ink,
                background: palette.candle,
                border: 'none',
                borderRadius: 999,
                padding: '14px 26px',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                minWidth: isMobile ? '100%' : 0,
                maxWidth: isMobile ? 340 : 'none',
              }}
            >
              Watch the full clip
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'clamp(10px, 2vw, 22px)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 760,
            }}
          >
            {CREDITS.map(([role, credit]) => (
              <span
                key={role}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: `${palette.cream}55`,
                  letterSpacing: '0.06em',
                }}
              >
                <span style={{ color: `${palette.candle}88`, marginRight: 4 }}>{role}</span>
                {credit}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showVimeo && <VimeoOverlay onClose={() => setShowVimeo(false)} />}
      </AnimatePresence>
    </div>
  );
}
