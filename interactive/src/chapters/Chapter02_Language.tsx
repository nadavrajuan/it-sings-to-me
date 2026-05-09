import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const LINES = [
  { text: 'Looli looli baneh doo',      translation: 'Lull · lull · build · two',        note: 'Old Norse lulla' },
  { text: 'Saffa ranji tilu too',        translation: 'Shore · sorrow · sesame · you',     note: 'Arabic safa, Māori Ranginui' },
  { text: 'Marru deh, marru deh',        translation: 'מָרָה bitter here, bitter here',     note: 'Hebrew marah — Miriam, Exodus' },
  { text: 'Blinko blonko, ooh ooh yeah', translation: 'Sound · colour · release',          note: 'Pure phonetics — breath letting go' },
  { text: 'Shimma lay, tirra low',       translation: 'Shimmer · lie · draw · low',        note: 'Shimmer on water, tirra-lirra birdsong' },
  { text: 'Kandee muru, valla snow',     translation: 'Sweet · bitter · vale · snow',      note: 'Candy + Māori muru (wipe away)' },
  { text: 'Ooh la la, beep beep ba',     translation: 'Wonder · machine · beat',           note: 'French wonder meets mechanical world' },
  { text: 'Tondaluna, shree shree sha',  translation: 'Round moon · श्री blessed · now',   note: 'Tondo+Luna · Sanskrit radiance' },
];

export function Chapter02_Language({ onNavigate }: ChapterProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [connectedCount, setConnectedCount] = useState(0);

  // Reveal one lyric row every 900ms
  useEffect(() => {
    if (visibleCount >= LINES.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 900);
    return () => clearTimeout(t);
  }, [visibleCount]);

  // Draw the connecting line 350ms after each lyric appears
  useEffect(() => {
    if (visibleCount === 0) return;
    const t = setTimeout(() => setConnectedCount(visibleCount), 350);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Background */}
      <img
        src="/assets/images/mj-06-cosmic-face.png" alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top', zIndex: 0,
          filter: 'saturate(0.5) brightness(0.18)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(to bottom, ${palette.ink}DD 0%, ${palette.ink}55 30%, ${palette.ink}BB 100%)`,
      }} />

      {/* Main layout: header + rows */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: 'clamp(12px, 2vh, 22px) clamp(16px, 4vw, 56px) clamp(10px, 1.5vh, 16px)',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(4px, 0.8vh, 10px)', flexShrink: 0 }}
        >
          <div style={{
            fontFamily: fonts.body, fontStyle: 'italic',
            fontSize: 'clamp(16px, 3vw, 26px)', color: palette.cream, lineHeight: 1.1,
          }}>
            Looli Baneh
          </div>
          <div style={{
            fontFamily: fonts.display, fontSize: 'clamp(10px, 1.3vw, 12px)',
            color: `${palette.cream}80`, marginTop: 2,
          }}>
            gibberish that turned out to mean something
          </div>
        </motion.div>

        {/* Column labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', flexShrink: 0, marginBottom: 4, alignItems: 'center' }}
        >
          <div style={{
            flex: '0 0 44%', fontFamily: fonts.mono, fontSize: 9,
            color: `${palette.teal}CC`, letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>
            original
          </div>
          <div style={{ flex: '0 0 12%' }} />
          <div style={{
            flex: 1, fontFamily: fonts.mono, fontSize: 9,
            color: `${palette.candle}CC`, letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>
            meaning · root
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            height: 1, background: `${palette.teal}30`,
            transformOrigin: 'left', marginBottom: 2, flexShrink: 0,
          }}
        />

        {/* Lyrics rows — each row is flex 1 so they divide space equally */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {LINES.map((line, i) => {
            const isVisible   = i < visibleCount;
            const isConnected = i < connectedCount;

            return (
              <div
                key={i}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center',
                  borderBottom: i < LINES.length - 1 ? `1px solid ${palette.teal}18` : 'none',
                }}
              >
                {/* Left: lyric text */}
                <motion.div
                  style={{ flex: '0 0 44%' }}
                  initial={{ opacity: 0, x: -14 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{
                    fontFamily: fonts.body, fontStyle: 'italic',
                    fontSize: 'clamp(12px, 2vw, 19px)',
                    color: palette.cream, lineHeight: 1.25,
                  }}>
                    {line.text}
                  </div>
                </motion.div>

                {/* Centre: per-row connecting arc */}
                <div style={{
                  flex: '0 0 12%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  overflow: 'visible',
                }}>
                  <svg
                    viewBox="0 0 60 24"
                    width="100%"
                    height="24"
                    style={{ overflow: 'visible' }}
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 0 12 C 18 2, 42 2, 60 12"
                      fill="none"
                      stroke={palette.candle}
                      strokeWidth="1.2"
                      strokeOpacity={0.7}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isConnected
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </div>

                {/* Right: translation + root note */}
                <motion.div
                  style={{ flex: 1 }}
                  initial={{ opacity: 0, x: 14 }}
                  animate={isConnected ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{
                    fontFamily: fonts.display,
                    fontSize: 'clamp(11px, 1.7vw, 16px)',
                    color: palette.candle, lineHeight: 1.25,
                  }}>
                    {line.translation}
                  </div>
                  <div style={{
                    fontFamily: fonts.mono,
                    fontSize: 'clamp(8px, 0.9vw, 10px)',
                    color: `${palette.cream}80`,
                    letterSpacing: '0.05em', marginTop: 1,
                  }}>
                    {line.note}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
