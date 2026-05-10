import React from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { assetPath, VIMEO_SHARE_URL } from '../lib/media';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

export function Chapter07_Closing({ onNavigate }: ChapterProps) {
  const [shareLabel, setShareLabel] = React.useState('Share this page');

  const handleShare = React.useCallback(async () => {
    const shareUrl = typeof window !== 'undefined'
      ? window.location.href
      : 'https://workflow.withnadav.com/sing-to-me/';

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'It Sings To Me',
          text: 'Explore the workflow behind It Sings To Me.',
          url: shareUrl,
        });
        setShareLabel('Shared');
        window.setTimeout(() => setShareLabel('Share this page'), 2200);
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareLabel('Link copied');
      window.setTimeout(() => setShareLabel('Share this page'), 2200);
    } catch (error) {
      // Ignore aborted share sheets and clipboard denials.
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setShareLabel('Copy failed');
      window.setTimeout(() => setShareLabel('Share this page'), 2200);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Background image */}
      <img
        src={assetPath('assets/images/mj-03-girl-jar.png')}
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
          Watch the full video
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 2.1vw, 20px)',
            color: `${palette.cream}D6`,
            maxWidth: '30ch',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Contact me for questions
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            height: 1, width: 'clamp(80px, 20vw, 240px)',
            background: `${palette.teal}60`, transformOrigin: 'center',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.4vw, 24px)',
            color: palette.cream,
          }}>
            Nadav Rajuan
          </span>
          <a
            href="mailto:nadavrajuan@gmail.com"
            style={{
              fontFamily: fonts.mono,
              fontSize: 'clamp(11px, 1.6vw, 15px)',
              color: `${palette.teal}DD`,
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            nadavrajuan@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          style={{
            height: 1, width: 'clamp(80px, 20vw, 240px)',
            background: `${palette.teal}40`, transformOrigin: 'center',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <a
            href={VIMEO_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: fonts.mono,
              fontSize: 'clamp(10px, 1.3vw, 13px)',
              color: palette.ink,
              background: palette.candle,
              border: 'none',
              borderRadius: 20,
              padding: 'clamp(9px, 1.2vh, 12px) clamp(18px, 2.5vw, 28px)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Watch the full video ↗
          </a>

          <button
            type="button"
            onClick={handleShare}
            style={{
              fontFamily: fonts.mono,
              fontSize: 'clamp(10px, 1.3vw, 13px)',
              color: palette.cream,
              background: 'transparent',
              border: `1px solid ${palette.teal}66`,
              borderRadius: 20,
              padding: 'clamp(9px, 1.2vh, 12px) clamp(18px, 2.5vw, 28px)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {shareLabel}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
