import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { VIMEO_SHARE_URL } from '../lib/media';

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

export function Chapter07_Closing({ onNavigate }: ChapterProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'It Sings To Me', url: VIMEO_SHARE_URL }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(VIMEO_SHARE_URL).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Background image */}
      <img
        src="/assets/images/mj-03-girl-jar.png"
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
          filter: 'brightness(0.28) saturate(0.5)',
        }}
      />

      {/* Warm gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse at 50% 60%, ${palette.cobalt}88 0%, transparent 65%),
          linear-gradient(to bottom, ${palette.ink}CC 0%, ${palette.ink}55 40%, ${palette.ink}99 100%)
        `,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 64px)',
        gap: 'clamp(12px, 2.5vh, 24px)',
        textAlign: 'center',
      }}>
        {/* Thank you line */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontFamily: fonts.mono, fontSize: 11,
            color: `${palette.candle}CC`, letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          thank you for watching
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(32px, 6vw, 64px)',
            color: palette.cream, lineHeight: 1.0, margin: 0,
            textShadow: `0 4px 32px ${palette.ink}`,
          }}
        >
          It Sings To Me
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{
            fontFamily: fonts.display,
            fontSize: 'clamp(13px, 2vw, 18px)',
            color: `${palette.candle}CC`,
          }}
        >
          a song in a language that doesn't exist
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            height: 1, width: 'clamp(80px, 20vw, 240px)',
            background: `${palette.teal}60`, transformOrigin: 'center',
          }}
        />

        {/* Credits grid */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            columnGap: 'clamp(20px, 4vw, 48px)',
            rowGap: 'clamp(5px, 0.8vh, 10px)',
            textAlign: 'left',
          }}
        >
          {CREDITS.map(([role, name]) => (
            <React.Fragment key={role}>
              <span style={{
                fontFamily: fonts.mono, fontSize: 'clamp(9px, 1.2vw, 12px)',
                color: `${palette.candle}AA`, letterSpacing: '0.12em',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>
                {role}
              </span>
              <span style={{
                fontFamily: fonts.body, fontStyle: 'italic',
                fontSize: 'clamp(11px, 1.5vw, 15px)',
                color: palette.cream, whiteSpace: 'nowrap',
              }}>
                {name}
              </span>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          style={{
            height: 1, width: 'clamp(80px, 20vw, 240px)',
            background: `${palette.teal}40`, transformOrigin: 'center',
          }}
        />

        {/* Contact */}
        <motion.a
          href="mailto:nadavrajuan@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: `${palette.teal}DD`,
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}
        >
          nadavrajuan@gmail.com
        </motion.a>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{ display: 'flex', gap: 'clamp(10px, 2vw, 20px)', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href={VIMEO_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: fonts.mono, fontSize: 'clamp(10px, 1.3vw, 13px)',
              color: palette.ink, background: palette.candle,
              border: 'none', borderRadius: 20,
              padding: 'clamp(8px, 1.2vh, 12px) clamp(16px, 2.5vw, 28px)',
              cursor: 'pointer', letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Watch full video clip ↗
          </a>

          <button
            onClick={handleShare}
            style={{
              fontFamily: fonts.mono, fontSize: 'clamp(10px, 1.3vw, 13px)',
              color: palette.cream,
              background: 'none',
              border: `1px solid ${palette.cream}50`,
              borderRadius: 20,
              padding: 'clamp(8px, 1.2vh, 12px) clamp(16px, 2.5vw, 28px)',
              cursor: 'pointer', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {copied ? 'Link copied ✓' : 'Share ⬡'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
