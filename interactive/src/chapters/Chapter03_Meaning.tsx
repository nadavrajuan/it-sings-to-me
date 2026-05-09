import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const ETYMOLOGY = [
  {
    word: 'Looli',
    root: 'lull',
    language: 'Old Norse',
    meaning: 'To make drowsy through repetitive sounds — from Old Norse lulla. The opening and closing syllable of the entire song. A lullaby that doesn\'t need a language.',
    script: null,
  },
  {
    word: 'Marru',
    root: 'מָרָה',
    language: 'Hebrew',
    meaning: 'Bitter. Root of the name Miriam. Root of the Marah spring in Exodus — the waters the Israelites couldn\'t drink. Marru deh, marru deh: bitter here, bitter here. The repetition is the river.',
    script: "'Noto Serif Hebrew', serif",
  },
  {
    word: 'Tonda + Luna',
    root: 'tondo · luna',
    language: 'Italian + Latin',
    meaning: 'Tondo from Latin rotundus (wheel, round). Luna from Proto-Indo-European *leuk- (light). Together: the round moon — a circular painting of light. In Māori, luna also carries a rising, climbing quality.',
    script: null,
  },
  {
    word: 'Shree',
    root: 'श्री',
    language: 'Sanskrit',
    meaning: 'Radiance, prosperity, the sacred mark of abundance. Written ॐ श्री in devotional texts. The closing benediction of the song — the word that blesses everything that came before it.',
    script: "'Noto Serif Devanagari', serif",
  },
  {
    word: 'Kandee · Muru',
    root: 'candy · to wipe',
    language: 'English + Māori',
    meaning: 'Kandee from candy — sweetness, pleasure. Muru (Māori) — to strip away, to wipe clean. Kandee muru: sweet loss. The line holds both at once.',
    script: null,
  },
];

// Auto-expand cards with a "simulated click" feel
const EXPAND_DELAY = 1400;
const EXPAND_INTERVAL = 1800;

export function Chapter03_Meaning({ onNavigate }: ChapterProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showShot, setShowShot] = useState(false);

  // Show the screenshot first, then start opening cards
  useEffect(() => {
    const t = setTimeout(() => setShowShot(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Auto-expand cards one by one after a brief pause
  useEffect(() => {
    let i = 0;
    const scheduleNext = () => {
      if (i >= ETYMOLOGY.length) return;
      const delay = i === 0 ? EXPAND_DELAY : EXPAND_INTERVAL;
      const t = setTimeout(() => {
        setExpanded((prev) => new Set([...prev, i]));
        i++;
        scheduleNext();
      }, delay);
      return t;
    };
    const first = scheduleNext();
    return () => { if (first) clearTimeout(first); };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Background */}
      <img
        src="/assets/images/mj-05-marionette-dancer.png"
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
          filter: 'saturate(0.35) brightness(0.22)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(160deg, ${palette.ink}CC 0%, ${palette.cobalt}66 50%, ${palette.ink}BB 100%)`,
      }} />

      {/* Two-column layout: etymology cards + screenshot */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', gap: 'clamp(12px, 2vw, 32px)',
        padding: 'clamp(18px, 3vh, 36px) clamp(16px, 3vw, 44px)',
      }}>

        {/* Left column: etymology cards */}
        <div style={{
          flex: '0 0 55%',
          display: 'flex', flexDirection: 'column',
          gap: 'clamp(5px, 0.8vh, 9px)', overflowY: 'hidden',
        }}>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 'clamp(6px, 1vh, 12px)' }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: palette.candle, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 3 }}>
              04 — search for meaning
            </div>
            <h2 style={{
              fontFamily: fonts.body, fontStyle: 'italic',
              fontSize: 'clamp(20px, 3.2vw, 36px)', color: palette.cream, lineHeight: 1.1,
            }}>
              The Hidden Roots
            </h2>
            <p style={{
              fontFamily: fonts.body, fontStyle: 'italic',
              fontSize: 'clamp(12px, 1.6vw, 15px)', color: `${palette.candle}AA`, marginTop: 4,
            }}>
              every "made-up" word already existed somewhere
            </p>
          </motion.div>

          {ETYMOLOGY.map((entry, i) => {
            const isOpen = expanded.has(i);
            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, ${palette.cobalt}EE, ${palette.cobalt}99)`
                    : `${palette.ink}88`,
                  border: `1px solid ${isOpen ? palette.candle : `${palette.teal}40`}`,
                  borderRadius: 8,
                  padding: 'clamp(7px, 1.1vh, 12px) clamp(10px, 1.5vw, 16px)',
                  backdropFilter: 'blur(4px)',
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{
                    fontFamily: fonts.body, fontStyle: 'italic',
                    fontSize: 'clamp(16px, 2.4vw, 24px)', color: palette.cream,
                  }}>
                    {entry.word}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontFamily: entry.script ?? fonts.body,
                      fontSize: entry.script ? 'clamp(13px, 2vw, 19px)' : 'clamp(12px, 1.6vw, 15px)',
                      color: palette.candle, opacity: 0.9,
                    }}>
                      {entry.root}
                    </span>
                    <span style={{
                      fontFamily: fonts.mono, fontSize: 9,
                      color: `${palette.cream}45`, textTransform: 'uppercase',
                      letterSpacing: '0.07em', maxWidth: 90, textAlign: 'right',
                    }}>
                      {entry.language}
                    </span>
                    {/* Animated expand indicator */}
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ fontSize: 10, color: `${palette.cream}50` }}
                    >
                      ›
                    </motion.span>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        overflow: 'hidden', fontFamily: fonts.body, fontStyle: 'italic',
                        fontSize: 'clamp(11px, 1.5vw, 14px)',
                        color: `${palette.cream}CC`, lineHeight: 1.55,
                      }}
                    >
                      {entry.meaning}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Right column: etymology screenshot */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 'clamp(40px, 6vh, 64px)' }}>
          <AnimatePresence>
            {showShot && (
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: '100%', maxWidth: 'clamp(180px, 30vw, 400px)',
                  borderRadius: 10, overflow: 'hidden',
                  boxShadow: `0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px ${palette.teal}40`,
                }}
              >
                <div style={{
                  background: `${palette.cobalt}CC`, padding: '6px 10px',
                  fontFamily: fonts.mono, fontSize: 9,
                  color: `${palette.cream}70`, letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  ChatGPT · etymology table
                </div>
                <img
                  src="/assets/screenshots/gpt-etymology.png"
                  alt=""
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  style={{ width: '100%', display: 'block', filter: 'brightness(0.92)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
