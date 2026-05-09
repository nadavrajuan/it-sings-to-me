import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const PREVIEW_DURATION = 20;
const VIMEO_BG_URL = 'https://player.vimeo.com/video/1190697407?h=5a08ca6045&autoplay=1&loop=1&background=1&muted=1';
const VIMEO_URL = 'https://player.vimeo.com/video/1190697407?h=5a08ca6045&autoplay=1&color=d4a574&title=0&byline=0&portrait=0#t=20s';

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
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.92)', zIndex: 1000,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90vw', maxWidth: 1100, aspectRatio: '16/9',
          borderRadius: 12, overflow: 'hidden',
          border: `1px solid ${palette.teal}40`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.8)`,
        }}
      >
        <iframe
          src={VIMEO_URL}
          width="100%" height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ display: 'block' }}
        />
      </motion.div>
      <button
        onClick={onClose}
        style={{
          fontFamily: fonts.mono, fontSize: 12,
          color: `${palette.cream}60`,
          background: 'none', border: 'none', cursor: 'pointer',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}
      >
        close ✕
      </button>
    </motion.div>
  );
}

export function Chapter06_Film({ onNavigate }: ChapterProps) {
  const [showVimeo, setShowVimeo] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setShowVimeo(true), PREVIEW_DURATION * 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: palette.ink }}>

      {/* Vimeo background player (muted, looping, no controls) */}
      <div style={{ position: 'absolute', inset: '-10%', zIndex: 0, pointerEvents: 'none' }}>
        <iframe
          src={VIMEO_BG_URL}
          width="100%" height="100%"
          frameBorder="0"
          allow="autoplay"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* Top/bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(to bottom, ${palette.ink}CC 0%, transparent 20%, transparent 65%, ${palette.ink}EE 100%)`,
      }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 'clamp(20px, 4vh, 40px)', left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <h1 style={{
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: 'clamp(22px, 4vw, 42px)',
          color: palette.cream, letterSpacing: '0.01em',
        }}>
          It Sings To Me
        </h1>
      </div>

      {/* Always-visible Watch button */}
      <div style={{
        position: 'absolute', bottom: 'clamp(48px, 8vh, 72px)', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 10,
      }}>
        <button
          onClick={() => setShowVimeo(true)}
          style={{
            fontFamily: fonts.mono, fontSize: 'clamp(12px, 1.6vw, 16px)',
            color: palette.ink, background: palette.candle,
            border: 'none', borderRadius: 24,
            padding: 'clamp(10px, 1.5vh, 16px) clamp(22px, 3.5vw, 40px)',
            cursor: 'pointer', letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
          }}
        >
          Watch full video clip ↗
        </button>
      </div>

      {/* Credits bar */}
      <div style={{
        position: 'absolute', bottom: 'clamp(14px, 2.5vh, 24px)', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 10,
      }}>
        <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 28px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CREDITS.map(([role, credit]) => (
            <span key={role} style={{ fontFamily: fonts.mono, fontSize: 11, color: `${palette.cream}50`, letterSpacing: '0.06em' }}>
              <span style={{ color: `${palette.candle}80`, marginRight: 4 }}>{role}</span>
              {credit}
            </span>
          ))}
        </div>
      </div>

      {/* Vimeo overlay — opens automatically after 20s */}
      <AnimatePresence>
        {showVimeo && <VimeoOverlay onClose={() => setShowVimeo(false)} />}
      </AnimatePresence>
    </div>
  );
}
