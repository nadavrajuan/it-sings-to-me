import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

export function Chapter01_Opening({ onNavigate }: ChapterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Full-bleed video — muted loop, slowed */}
      <video
        ref={videoRef}
        src="/assets/video/music-video-clip.mp4"
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse at 50% 50%, transparent 20%, ${palette.ink}CC 80%),
          linear-gradient(to bottom, ${palette.ink}99 0%, transparent 22%, transparent 62%, ${palette.ink}EE 100%)
        `,
      }} />

      {/* Centre title block */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(10px, 2vh, 18px)', padding: '0 10%', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: palette.candle,
          }}
        >
          a workflow video by Nadav Rajuan
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(38px, 8.5vw, 80px)',
            color: palette.cream, lineHeight: 1.0, letterSpacing: '0.01em',
            textShadow: `0 4px 32px ${palette.ink}CC`,
          }}
        >
          It Sings To Me
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.display,
            fontSize: 'clamp(14px, 3vw, 22px)',
            color: palette.candle,
            textShadow: `0 2px 12px ${palette.ink}`,
          }}
        >
          a song in a language that doesn't exist
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          style={{
            fontFamily: fonts.body, fontStyle: 'italic',
            fontSize: 'clamp(12px, 2vw, 17px)',
            color: `${palette.cream}70`, lineHeight: 1.55, maxWidth: '55ch',
          }}
        >
          From gibberish lyrics to music video — a workflow for discovering themes, symbols, and visual worlds with ChatGPT.
        </motion.p>
      </div>

      {/* Bottom: subtle scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '5%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ color: `${palette.cream}40`, fontSize: 18 }}
        >
          ↓
        </motion.div>
        <span style={{
          fontFamily: fonts.mono, fontSize: 10,
          color: `${palette.cream}30`, letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          watch the clip first
        </span>
      </motion.div>
    </div>
  );
}
