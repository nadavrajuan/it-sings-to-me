import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { assetPath, CLIP_PREVIEW_VIDEO_PATH, VIMEO_PLAYER_URL } from '../lib/media';
import { useIsMobile } from '../lib/useIsMobile';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

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
        background: 'rgba(0, 0, 0, 0.92)',
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

export function Chapter01_Opening({ onNavigate }: ChapterProps) {
  const isMobile = useIsMobile();
  const [showVimeo, setShowVimeo] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '-6%', zIndex: 0, overflow: 'hidden' }}>
        <video
          src={CLIP_PREVIEW_VIDEO_PATH}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={assetPath('assets/images/mj-03-girl-jar.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(0.7) brightness(0.72)',
            transform: 'scale(1.06)',
          }}
        />
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse at 50% 42%, rgba(10, 22, 40, 0.12) 0%, rgba(10, 22, 40, 0.78) 76%),
          linear-gradient(to bottom, ${palette.ink}D4 0%, rgba(10, 22, 40, 0.42) 28%, rgba(10, 22, 40, 0.82) 100%)
        `,
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(12px, 2vh, 20px)',
        padding: `clamp(22px, 5vh, 46px) clamp(18px, 6vw, 72px) calc(clamp(20px, 4vh, 34px) + env(safe-area-inset-bottom))`,
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(10px, 1.3vw, 12px)',
            letterSpacing: '0.24em',
            textTransform: 'uppercase', color: palette.candle,
          }}
        >
          watch the clip
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: isMobile ? 'clamp(40px, 13vw, 62px)' : 'clamp(44px, 8.5vw, 86px)',
            color: palette.cream, lineHeight: 1.0, letterSpacing: '0.01em',
            textShadow: `0 4px 32px ${palette.ink}CC`,
            maxWidth: '11ch',
            margin: 0,
          }}
        >
          Watch the full clip with sound
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(16px, 4.8vw, 20px)' : 'clamp(16px, 2.2vw, 22px)',
            color: `${palette.cream}E0`,
            lineHeight: 1.55,
            maxWidth: '34ch',
            margin: 0,
            textShadow: `0 2px 16px ${palette.ink}`,
          }}
        >
          The page carries a muted visual fragment. Open the full clip here to hear the complete piece from inside the world itself.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.75 }}
          onClick={() => setShowVimeo(true)}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(12px, 1.5vw, 15px)',
            color: palette.ink,
            background: palette.candle,
            border: 'none',
            borderRadius: 999,
            padding: isMobile ? '15px 24px' : '16px 30px',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 16px 34px rgba(0,0,0,0.38)',
            minWidth: isMobile ? 'min(100%, 320px)' : 0,
          }}
        >
          Watch the full clip
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.75 }}
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(14px, 4vw, 17px)' : 'clamp(13px, 1.8vw, 17px)',
            color: `${palette.cream}B2`,
            lineHeight: 1.55,
            maxWidth: '34ch',
            margin: 0,
          }}
        >
          Or keep scrolling to see how the clip came together.
        </motion.p>
      </div>

      <AnimatePresence>
        {showVimeo && <VimeoOverlay onClose={() => setShowVimeo(false)} />}
      </AnimatePresence>
    </div>
  );
}
