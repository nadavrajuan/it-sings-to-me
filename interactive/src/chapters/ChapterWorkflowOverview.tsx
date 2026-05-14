import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette, fonts } from '@looli/shared';
import { assetPath, RAW_PIANO_AUDIO_PATH } from '../lib/media';
import { useIsMobile } from '../lib/useIsMobile';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

// ─── Section data ───────────────────────────────────────────────────────────

const MOTIFS = [
  { src: assetPath('assets/images/mj-04-girl-doll.png'),    phrase: 'Looli looli baneh doo',    label: 'Cotton Stars' },
  { src: assetPath('assets/images/mj-06-cosmic-face.png'),  phrase: 'Marru deh, marru deh',     label: 'A doll became a memory' },
  { src: assetPath('assets/images/mj-05-marionette-dancer.png'), phrase: 'Saffa ranji tilu too', label: 'Marionette Dancer' },
  { src: assetPath('assets/images/clip-cosmic-face.png'),   phrase: 'Tondaluna, shree shree sha', label: 'Cosmic Face' },
];

const LYRICS_LINES = [
  'Looli looli baneh doo',
  'Saffa ranji tilu too',
  'Marru deh, marru deh',
  'Blinko blonko, ooh ooh yeah',
  'Shimma lay, tirra low',
  'Kandee muru, valla snow',
  'Ooh la la, beep beep ba',
  'Tondaluna, shree shree sha',
];

type SectionKind = 'intro' | 'standard' | 'jar' | 'tagline';

interface SectionDef {
  kind: SectionKind;
  step: string | null;
  title: string;
  lines: string[];
  bg: string | null;
  visual: string | null;
  frameImage?: string;   // shown as a floating image card when visual is null
  audioSrc?: string;
  showLyrics?: boolean;
  accent: string;
}

const SECTIONS: SectionDef[] = [
  {
    kind: 'standard',
    step: '01',
    title: 'Piano Improv',
    lines: [
      'It began with a piano improvisation.',
      'A raw emotional sketch — before words.',
    ],
    bg: assetPath('assets/images/piano-play.png'),
    visual: null,
    frameImage: assetPath('assets/images/piano-play.png'),
    audioSrc: RAW_PIANO_AUDIO_PATH,
    accent: palette.teal,
  },
  {
    kind: 'standard',
    step: '02',
    title: 'Explore the Gibberish',
    lines: [
      'Using ChatGPT\'s "subconscious" to invent a secret language —',
      'made from sound, instinct, and hidden associations.',
    ],
    bg: assetPath('assets/images/mj-01-cotton-stars.png'),
    visual: assetPath('assets/screenshots/gpt-prompt.png'),
    showLyrics: true,
    accent: palette.candle,
  },
  {
    kind: 'standard',
    step: '03',
    title: 'Search for Meaning',
    lines: [
      'After the gibberish was created,',
      'ChatGPT and I searched for the meanings hidden inside it.',
    ],
    bg: assetPath('assets/images/mj-05-marionette-dancer.png'),
    visual: assetPath('assets/screenshots/gpt-etymology.png'),
    accent: '#c77b4a',
  },
  {
    kind: 'jar',
    step: '04',
    title: 'Develop Concepts',
    lines: [
      'The hidden meanings became visual ideas —',
      'a moon in a jar, dolls, stars, memory, colors, textures, and worlds.',
    ],
    bg: null,
    visual: null,
    accent: palette.cobalt,
  },
  {
    kind: 'standard',
    step: '05',
    title: 'Music Production',
    lines: [
      'Using the piano improv as source material,',
      'I explored style, voice, and production',
      'around the secret-language lyrics.',
    ],
    bg: assetPath('assets/images/mj-04-girl-doll.png'),
    visual: assetPath('assets/screenshots/suno-upload.png'),
    accent: palette.candle,
  },
];

// ─── Sub-layouts ─────────────────────────────────────────────────────────────

function GhostStep({ n, color }: { n: string; color: string }) {
  return (
    <div style={{
      position: 'absolute', top: '5%', right: '4%',
      fontFamily: fonts.mono, fontSize: 'clamp(70px, 14vw, 150px)',
      color: `${color}16`, lineHeight: 1,
      userSelect: 'none', pointerEvents: 'none', fontWeight: 700,
    }}>
      {n}
    </div>
  );
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    && Boolean(target.closest('button, a, audio, input, textarea, select, [data-no-swipe="true"]'));
}

function AudioSketchPlayer({ src, accent }: { src: string; accent: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const waveformBars = [16, 30, 18, 38, 22, 28, 20, 36, 18, 32, 24, 40, 19, 30, 17, 34, 22, 28];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncState = () => setIsPlaying(!audio.paused);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setHasError(true);

    audio.addEventListener('play', syncState);
    audio.addEventListener('pause', syncState);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', syncState);
      audio.removeEventListener('pause', syncState);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasError(false);
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (_error) {
      setHasError(true);
    }
  };

  return (
    <div
      data-no-swipe="true"
      style={{
        marginTop: 'clamp(10px, 1.8vh, 18px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 'clamp(9px, 1vw, 11px)',
          color: `${accent}D9`,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        play original piano improv
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          width: '100%',
          maxWidth: 460,
        }}
      >
        <button
          type="button"
          data-no-swipe="true"
          onClick={togglePlayback}
          style={{
            fontFamily: fonts.mono,
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            color: palette.ink,
            background: accent,
            border: 'none',
            borderRadius: '999px',
            width: 58,
            height: 58,
            minWidth: 58,
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 12px 26px rgba(0,0,0,0.3)',
          }}
          aria-label={isPlaying ? 'Pause original piano improv' : 'Play original piano improv'}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>
            {isPlaying ? '❚❚' : '▶'}
          </span>
        </button>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            minHeight: 58,
            padding: '0 16px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${accent}30`,
            overflow: 'hidden',
          }}
        >
          {waveformBars.map((height, index) => (
            <motion.div
              key={index}
              animate={{
                scaleY: isPlaying
                  ? [0.42, 1, 0.55, 0.88]
                  : 0.5,
                opacity: isPlaying ? [0.5, 1, 0.72, 0.92] : 0.55,
              }}
              transition={{
                duration: 0.9,
                repeat: isPlaying ? Infinity : 0,
                delay: index * 0.03,
                ease: 'easeInOut',
              }}
              style={{
                width: 4,
                height,
                borderRadius: 999,
                background: `linear-gradient(180deg, ${accent} 0%, ${palette.candle} 100%)`,
                transformOrigin: 'center bottom',
                boxShadow: `0 0 14px ${accent}22`,
              }}
            />
          ))}
        </div>
      </div>

      {hasError && (
        <div
          style={{
            fontFamily: fonts.body,
            fontStyle: 'italic',
            fontSize: 'clamp(12px, 1.4vw, 14px)',
            color: `${palette.cream}B2`,
          }}
        >
          Tap once more if the audio was blocked before loading.
        </div>
      )}

      <audio
        ref={audioRef}
        preload="auto"
        src={src}
        data-no-swipe="true"
        style={{ display: 'none' }}
      />
    </div>
  );
}

function IntroSection({ s, isMobile }: { s: SectionDef; isMobile: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      padding: `clamp(20px, 5vh, 56px) clamp(18px, 5vw, 72px) calc(clamp(18px, 4vh, 32px) + env(safe-area-inset-bottom))`,
      gap: 'clamp(20px, 4vw, 44px)',
    }}>
      {/* Left: text */}
      <div style={{ flex: isMobile ? '0 0 auto' : '0 0 52%', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.8vh, 18px)', textAlign: isMobile ? 'center' : 'left' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: fonts.mono, fontSize: 10, color: s.accent, letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          a workflow video · it sings to me
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(30px, 6vw, 66px)',
            color: palette.cream, lineHeight: 1.0, margin: 0,
            textShadow: '0 4px 32px rgba(0,0,0,0.9)',
          }}
        >
          {s.title}
        </motion.h1>

        {s.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + i * 0.18, duration: 0.7 }}
            style={{
              fontFamily: i === 0 ? fonts.display : fonts.body,
              fontStyle: i === 0 ? 'normal' : 'italic',
              fontSize: i === 0 ? 'clamp(14px, 2.2vw, 20px)' : 'clamp(13px, 1.8vw, 17px)',
              color: i === 0 ? s.accent : `${palette.cream}CC`,
              lineHeight: 1.55, margin: 0, whiteSpace: 'pre-line',
              textShadow: '0 2px 16px rgba(0,0,0,0.8)',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Right: framed image */}
      {s.frameImage && (
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            width: isMobile ? 'min(100%, 360px)' : 'auto',
            maxWidth: isMobile ? 'min(100%, 360px)' : 'clamp(180px, 36vw, 460px)',
            aspectRatio: '3/4',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: `0 28px 72px rgba(0,0,0,0.8), 0 0 0 1px ${s.accent}30`,
          }}
        >
          <img src={s.frameImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
      )}
    </div>
  );
}

function StandardSection({ s, isMobile }: { s: SectionDef; isMobile: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      padding: `clamp(22px, 5vh, 52px) clamp(18px, 4.5vw, 48px) calc(clamp(20px, 4vh, 34px) + env(safe-area-inset-bottom))`,
    }}>
      {s.step && <GhostStep n={s.step} color={s.accent} />}

      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: s.accent, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>
        {s.step ? `step ${s.step}` : ''}
      </div>

      <h1 style={{
        fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
        fontSize: 'clamp(24px, 4.5vw, 52px)',
        color: palette.cream, lineHeight: 1.0, margin: '0 0 clamp(8px, 1.5vh, 16px)',
        textShadow: '0 2px 16px rgba(0,0,0,0.85)',
      }}>
        {s.title}
      </h1>

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ height: 1, maxWidth: 'clamp(100px, 20vw, 280px)', background: `${s.accent}70`, transformOrigin: 'left', marginBottom: 'clamp(10px, 1.8vh, 18px)' }}
      />

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 'clamp(14px, 2.5vw, 32px)', flex: 1, alignItems: isMobile ? 'stretch' : 'flex-start', minHeight: 0, justifyContent: 'center' }}>

        {/* Left: body text + optional lyrics */}
        <div style={{ flex: s.visual ? '0 0 46%' : '0 0 70%', display: 'flex', flexDirection: 'column', gap: 8, order: isMobile && (s.visual || s.frameImage) ? 2 : 1 }}>
          {s.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
              style={{
                fontFamily: fonts.body, fontStyle: 'italic',
                fontSize: 'clamp(14px, 2vw, 20px)',
                color: palette.cream, lineHeight: 1.6, margin: 0,
                textShadow: '0 2px 12px rgba(0,0,0,0.8)',
              }}
            >
              {line}
            </motion.p>
          ))}

          {s.audioSrc && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              <AudioSketchPlayer src={s.audioSrc} accent={s.accent} />
            </motion.div>
          )}

          {/* Printed lyrics for step 02 */}
          {s.showLyrics && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ marginTop: 'clamp(8px, 1.5vh, 16px)' }}
            >
              <div style={{ fontFamily: fonts.mono, fontSize: 9, color: `${s.accent}CC`, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                generated lyrics — "Looli Baneh"
              </div>
              {LYRICS_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.07, duration: 0.35 }}
                  style={{
                    fontFamily: fonts.body, fontStyle: 'italic',
                    fontSize: 'clamp(11px, 1.6vw, 15px)',
                    color: `${palette.cream}CC`,
                    lineHeight: 1.55, paddingLeft: 8,
                    borderLeft: i % 2 === 0 ? `2px solid ${s.accent}50` : 'none',
                    marginBottom: 1,
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: screenshot OR framed image */}
        {(s.visual || s.frameImage) && (
          <motion.div
            initial={{ opacity: 0, y: 22, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1,
              order: isMobile ? 1 : 2,
              width: '100%',
              maxWidth: isMobile ? '100%' : (s.showLyrics ? 'clamp(160px, 28vw, 400px)' : 'clamp(200px, 40vw, 520px)'),
              margin: isMobile ? '0 auto' : 0,
              borderRadius: 10, overflow: 'hidden',
              boxShadow: `0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px ${s.accent}35`,
              ...(s.frameImage && !s.visual ? { aspectRatio: '4/3' } : {}),
              ...(s.visual && isMobile ? { aspectRatio: '4/3' } : {}),
            }}
          >
            <img
              src={s.visual ?? s.frameImage!} alt=""
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              style={{ width: '100%', height: '100%', objectFit: s.visual ? (isMobile ? 'contain' : 'initial') : 'cover', display: 'block', background: s.visual ? 'rgba(10,22,40,0.35)' : 'transparent' }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function JarSection({ s, isMobile }: { s: SectionDef; isMobile: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{ padding: 'clamp(18px, 3vh, 32px) clamp(18px, 4vw, 44px) clamp(8px, 1.2vh, 16px)', flexShrink: 0, textAlign: isMobile ? 'center' : 'left' }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 10, color: s.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
          step {s.step}
        </div>
        <h2 style={{
          fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(22px, 4vw, 44px)', color: palette.cream, lineHeight: 1.1, margin: 0,
        }}>
          {s.title}
        </h2>
        {s.lines.map((line, i) => (
          <p key={i} style={{
            fontFamily: fonts.body, fontStyle: 'italic',
            fontSize: 'clamp(12px, 1.7vw, 17px)',
            color: `${palette.cream}CC`, lineHeight: 1.5, margin: '4px 0 0',
          }}>
            {line}
          </p>
        ))}
      </motion.div>

      {/* 2×2 image grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 'clamp(5px, 0.8vw, 10px)',
        padding: '0 clamp(10px, 1.8vw, 20px) clamp(10px, 1.8vh, 20px)',
        minHeight: 0,
      }}>
        {MOTIFS.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', borderRadius: 10, overflow: 'hidden',
              border: `1px solid ${palette.teal}45`, minHeight: 0,
            }}
          >
            <img
              src={m.src} alt={m.label}
              onError={(e) => ((e.target as HTMLImageElement).style.background = palette.cobalt)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to top, ${palette.ink}EE 0%, ${palette.ink}55 45%, transparent 70%)`,
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(7px, 1vw, 12px)' }}>
              <p style={{
                fontFamily: fonts.body, fontStyle: 'italic',
                fontSize: 'clamp(9px, 1.3vw, 13px)', color: palette.candle, lineHeight: 1.2, marginBottom: 2,
              }}>
                {m.phrase}
              </p>
              <p style={{
                fontFamily: fonts.display, fontSize: 'clamp(11px, 1.6vw, 15px)',
                color: palette.cream, lineHeight: 1.1,
              }}>
                {m.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const FLOW_CHAIN = [
  { from: 'Piano improvisation', arrow: '→', to: 'song', tool: 'Suno', toolColor: palette.candle },
  { from: 'Gibberish language', arrow: '→', to: 'lyrics → symbols', tool: 'ChatGPT', toolColor: palette.teal },
  { from: 'Symbols', arrow: '→', to: 'visual world', tool: 'Midjourney', toolColor: '#c77b4a' },
];

const ALL_IMAGES = [
  assetPath('assets/images/mj-01-cotton-stars.png'),
  assetPath('assets/images/mj-02-galaxy.png'),
  assetPath('assets/images/mj-03-girl-jar.png'),
  assetPath('assets/images/mj-04-girl-doll.png'),
  assetPath('assets/images/mj-05-marionette-dancer.png'),
  assetPath('assets/images/mj-06-cosmic-face.png'),
];

function TaglineSection({ s, isMobile }: { s: SectionDef; isMobile: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(16px, 3vh, 36px) clamp(24px, 5vw, 80px)',
      gap: 'clamp(10px, 1.8vh, 20px)',
    }}>
      {/* Image strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, minmax(0, 1fr))' : 'repeat(6, minmax(0, 1fr))', gap: 6, width: '100%', maxWidth: 920, flexShrink: 0 }}
      >
        {ALL_IMAGES.map((src, i) => (
          <div key={i} style={{ flex: 1, aspectRatio: '1', borderRadius: 6, overflow: 'hidden', border: `1px solid ${palette.teal}30` }}>
            <img src={src} alt="" onError={(e) => ((e.target as HTMLImageElement).style.display='none')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.7) brightness(0.85)' }} />
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{ fontFamily: fonts.mono, fontSize: 10, color: `${palette.candle}CC`, letterSpacing: '0.2em', textTransform: 'uppercase' }}
      >
        the full picture
      </motion.div>

      {/* Flow chain */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vh, 16px)', alignSelf: 'stretch', maxWidth: 700 }}>
        {FLOW_CHAIN.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.55 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
          >
            <span style={{ fontFamily: fonts.body, fontStyle: 'italic', fontSize: 'clamp(14px, 2.2vw, 20px)', color: palette.cream }}>
              {row.from}
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 'clamp(14px, 2vw, 20px)', color: `${palette.cream}60` }}>
              {row.arrow}
            </span>
            <span style={{ fontFamily: fonts.body, fontStyle: 'italic', fontSize: 'clamp(14px, 2.2vw, 20px)', color: palette.cream }}>
              {row.to}
            </span>
            <span style={{
              fontFamily: fonts.mono, fontSize: 'clamp(9px, 1.1vw, 11px)',
              color: row.toolColor, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '2px 8px', border: `1px solid ${row.toolColor}50`, borderRadius: 20,
            }}>
              {row.tool}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        style={{ height: 1, width: 'clamp(80px, 30vw, 320px)', background: `${palette.teal}40`, transformOrigin: 'center' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        style={{
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: 'clamp(13px, 2vw, 19px)',
          color: `${palette.cream}EE`, lineHeight: 1.65,
          textAlign: 'center', maxWidth: '60ch',
          textShadow: '0 2px 16px rgba(0,0,0,0.9)',
        }}
      >
        {s.lines[0]}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ fontFamily: fonts.mono, fontSize: 10, color: `${palette.cream}40`, letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        ↓ continue
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ChapterWorkflowOverview({ onNavigate, currentIndex }: ChapterProps) {
  const isMobile = useIsMobile();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const idxRef = useRef(idx);
  const wheelIntentRef = useRef(0);
  const wheelLockUntilRef = useRef(0);
  idxRef.current = idx;

  const goNext = () => {
    if (idxRef.current < SECTIONS.length - 1) {
      setDir(1);
      setIdx(i => i + 1);
    } else {
      onNavigate(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (idxRef.current > 0) {
      setDir(-1);
      setIdx(i => i - 1);
    } else {
      onNavigate(currentIndex - 1);
    }
  };

  // Keyboard: capture before App.tsx sees it
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const isNext = e.key === 'ArrowDown' || e.key === 'ArrowRight';
      const isPrev = e.key === 'ArrowUp'   || e.key === 'ArrowLeft';
      if (!isNext && !isPrev) return;
      e.stopImmediatePropagation();
      if (isNext) goNext();
      else goPrev();
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [currentIndex, onNavigate]);

  // Desktop wheel navigation
  useEffect(() => {
    if (isMobile) return;

    const onWheel = (e: WheelEvent) => {
      if (isInteractiveTarget(e.target)) return;

      const now = Date.now();
      if (now < wheelLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      wheelIntentRef.current += e.deltaY;
      if (Math.abs(wheelIntentRef.current) < 45) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const direction = wheelIntentRef.current > 0 ? 1 : -1;
      wheelIntentRef.current = 0;
      wheelLockUntilRef.current = now + 480;

      if (direction > 0) goNext();
      else goPrev();
    };

    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => window.removeEventListener('wheel', onWheel, true);
  }, [currentIndex, isMobile, onNavigate]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target)) return;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target) || startY === 0) {
        startY = 0;
        return;
      }
      const delta = startY - e.changedTouches[0].clientY;
      startY = 0;
      if (Math.abs(delta) < 50) return;
      e.stopImmediatePropagation();
      if (delta > 0) goNext();
      else goPrev();
    };
    window.addEventListener('touchstart', onStart, { capture: true, passive: true });
    window.addEventListener('touchend',   onEnd,   { capture: true, passive: false });
    return () => {
      window.removeEventListener('touchstart', onStart, true);
      window.removeEventListener('touchend',   onEnd,   true);
    };
  }, [currentIndex, onNavigate]);

  const section = SECTIONS[idx];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: palette.ink }}>

      {/* Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${idx}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          {section.bg ? (
            <img
              src={section.bg} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.48) brightness(0.34)' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `radial-gradient(ellipse at 40% 35%, ${palette.cobalt}55 0%, ${palette.ink} 68%)` }} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay — ensures text always readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(160deg, ${palette.ink}B6 0%, rgba(10, 22, 40, 0.5) 52%, ${palette.ink}A5 100%)`,
      }} />

      {/* Step progress pills */}
      <div style={{ position: 'absolute', top: 'clamp(12px, 2vh, 22px)', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 7, zIndex: 20, paddingInline: 16 }}>
        {SECTIONS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === idx ? 28 : 7, background: i === idx ? section.accent : `${palette.cream}22` }}
            transition={{ duration: 0.28 }}
            style={{ height: 3, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Nav hint */}
      <div style={{ position: 'absolute', bottom: `calc(clamp(8px, 1.5vh, 16px) + env(safe-area-inset-bottom))`, left: 0, right: 0, textAlign: 'center', zIndex: 20, display: isMobile ? 'none' : 'block' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 9, color: `${palette.cream}35`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          ↑↓  {idx + 1} / {SECTIONS.length}
        </span>
      </div>

      {/* Content layer */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          initial={{ opacity: 0, y: (dir as number) * 55 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: (dir as number) * -45 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        >
          {section.kind === 'intro'    && <IntroSection s={section} isMobile={isMobile} />}
          {section.kind === 'standard' && <StandardSection s={section} isMobile={isMobile} />}
          {section.kind === 'jar'      && <JarSection s={section} isMobile={isMobile} />}
          {section.kind === 'tagline'  && <TaglineSection s={section} isMobile={isMobile} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
