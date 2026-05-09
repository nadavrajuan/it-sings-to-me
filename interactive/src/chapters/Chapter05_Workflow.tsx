import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette, fonts } from '@looli/shared';

interface ChapterProps {
  onNavigate: (index: number) => void;
  currentIndex: number;
}

const STEPS = [
  {
    n: '01',
    title: 'Piano Improv',
    subtitle: 'The raw material',
    description:
      'A free improvisation recorded at home — no sheet music, no plan. Nadav played until the sketch felt complete. This recording became the emotional spine of the entire song: the source material Suno would later orchestrate around.',
    bg: '/assets/images/mj-02-galaxy.png',
    visual: null as string | null,
    images: null as string[] | null,
    accent: palette.teal,
  },
  {
    n: '02',
    title: 'GPT → Secret Language',
    subtitle: 'Inventing the gibberish',
    description:
      'Prompt approach: ask GPT-4 to work like the "subconscious" — inventing phonemes that feel ancient and human without meaning anything in a real language. The goal was sound-first lyrics: words that carry emotion before they carry translation. GPT generated "Looli Baneh" — eight lines that sound like they remember something.',
    bg: '/assets/images/mj-03-girl-jar.png',
    visual: '/assets/screenshots/gpt-prompt.png',
    images: null,
    accent: palette.candle,
  },
  {
    n: '03',
    title: 'Etymology Hunt',
    subtitle: 'Finding hidden roots',
    description:
      'After the lyrics existed, we ran every invented word backward through etymology and GPT. The discovery: none of the words were truly made up. Each one had echoes in real languages — Hebrew, Sanskrit, Māori, Italian, Old Norse. The "secret language" had been speaking all along.',
    bg: '/assets/images/mj-05-marionette-dancer.png',
    visual: '/assets/screenshots/gpt-etymology.png',
    images: null,
    accent: '#c77b4a',
  },
  {
    n: '04',
    title: 'Midjourney Visuals',
    subtitle: 'Words becoming images',
    description:
      'Each lyric-plus-etymology became a visual prompt. The emotional world revealed by the etymology — bitterness, moonlight, memory, sweetness-and-loss — guided each Midjourney generation. Six images emerged: cotton stars, a cosmic face, a girl with a jar, a marionette dancer, a galaxy, a doll.',
    bg: null as string | null,
    visual: null,
    images: [
      '/assets/images/mj-01-cotton-stars.png',
      '/assets/images/mj-02-galaxy.png',
      '/assets/images/mj-03-girl-jar.png',
      '/assets/images/mj-04-girl-doll.png',
      '/assets/images/mj-05-marionette-dancer.png',
      '/assets/images/mj-06-cosmic-face.png',
    ],
    accent: palette.cobalt,
  },
  {
    n: '05',
    title: 'Suno Production',
    subtitle: 'Piano + AI orchestration',
    description:
      'The piano recording was uploaded as a stem into Suno AI alongside the "Looli Baneh" lyrics and a style prompt. Suno wove them into a full orchestrated track. The final song has Nadav\'s piano touch as its skeleton — strings, voice, and production built around it by the model.',
    bg: '/assets/images/mj-06-cosmic-face.png',
    visual: '/assets/screenshots/suno-upload.png',
    images: null,
    accent: palette.candle,
  },
];

export function Chapter05_Workflow({ onNavigate, currentIndex }: ChapterProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeStepRef = useRef(activeStep);
  activeStepRef.current = activeStep;

  // Capture keyboard events before App.tsx sees them
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const isNext = e.key === 'ArrowDown' || e.key === 'ArrowRight';
      const isPrev = e.key === 'ArrowUp'   || e.key === 'ArrowLeft';
      if (!isNext && !isPrev) return;

      e.stopImmediatePropagation();

      if (isNext) {
        if (activeStepRef.current < STEPS.length - 1) {
          setDirection(1);
          setActiveStep(activeStepRef.current + 1);
        } else {
          onNavigate(currentIndex + 1);
        }
      } else {
        if (activeStepRef.current > 0) {
          setDirection(-1);
          setActiveStep(activeStepRef.current - 1);
        } else {
          onNavigate(currentIndex - 1);
        }
      }
    };
    // Capture phase fires before App.tsx's bubble handler
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [currentIndex, onNavigate]);

  // Touch swipe handling
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const delta = startY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      e.stopImmediatePropagation();
      if (delta > 0) {
        if (activeStepRef.current < STEPS.length - 1) {
          setDirection(1);
          setActiveStep(activeStepRef.current + 1);
        } else {
          onNavigate(currentIndex + 1);
        }
      } else {
        if (activeStepRef.current > 0) {
          setDirection(-1);
          setActiveStep(activeStepRef.current - 1);
        } else {
          onNavigate(currentIndex - 1);
        }
      }
    };
    window.addEventListener('touchstart', onStart, { capture: true, passive: true });
    window.addEventListener('touchend',   onEnd,   { capture: true, passive: false });
    return () => {
      window.removeEventListener('touchstart', onStart, true);
      window.removeEventListener('touchend',   onEnd,   true);
    };
  }, [currentIndex, onNavigate]);

  const step = STEPS[activeStep];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: palette.ink }}>

      {/* Step background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${activeStep}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          {step.bg ? (
            <img src={step.bg} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'saturate(0.25) brightness(0.18)',
            }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `radial-gradient(ellipse at 40% 40%, ${palette.cobalt}55 0%, ${palette.ink} 70%)`,
            }} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(135deg, ${palette.ink}E0 0%, ${palette.ink}A0 55%, ${palette.ink}CC 100%)`,
      }} />

      {/* Step pills at top */}
      <div style={{
        position: 'absolute', top: 'clamp(14px, 2.5vh, 24px)', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 8, zIndex: 20,
      }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === activeStep ? 32 : 8,
              background: i === activeStep ? step.accent : `${palette.cream}25`,
            }}
            transition={{ duration: 0.3 }}
            style={{ height: 4, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Navigation hint — bottom */}
      <div style={{
        position: 'absolute', bottom: 'clamp(10px, 2vh, 20px)',
        left: 0, right: 0, textAlign: 'center', zIndex: 20,
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: 10,
          color: `${palette.cream}40`, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          {activeStep < STEPS.length - 1
            ? `↑↓  step ${activeStep + 1} of ${STEPS.length}`
            : `↑ back · ↓ continue`}
        </span>
      </div>

      {/* Main step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeStep}
          custom={direction}
          initial={{ opacity: 0, y: direction * 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction * -40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            padding: 'clamp(44px, 8vh, 72px) clamp(24px, 5vw, 72px) clamp(36px, 6vh, 56px)',
          }}
        >
          {/* Ghost step number */}
          <div style={{
            position: 'absolute', top: '6%', right: '4%',
            fontFamily: fonts.mono, fontSize: 'clamp(72px, 16vw, 160px)',
            color: `${step.accent}14`, lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
            fontWeight: 700, letterSpacing: '-0.05em',
          }}>
            {step.n}
          </div>

          {/* Label */}
          <div style={{
            fontFamily: fonts.mono, fontSize: 'clamp(9px, 1.1vw, 11px)',
            color: step.accent, letterSpacing: '0.22em',
            textTransform: 'uppercase', marginBottom: 'clamp(6px, 1vh, 10px)',
          }}>
            step {step.n} of {STEPS.length} · {step.subtitle}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: fonts.body, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(26px, 4.5vw, 52px)',
            color: palette.cream, lineHeight: 1.0,
            margin: '0 0 clamp(6px, 1.2vh, 14px)',
          }}>
            {step.title}
          </h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              height: 1, maxWidth: 'clamp(120px, 22vw, 300px)',
              background: `${step.accent}70`, transformOrigin: 'left',
              marginBottom: 'clamp(10px, 1.8vh, 18px)',
            }}
          />

          {/* Content row */}
          <div style={{
            display: 'flex', gap: 'clamp(14px, 2.5vw, 40px)',
            flex: 1, alignItems: 'flex-start', minHeight: 0,
          }}>
            {/* Description */}
            <div style={{ flex: '0 0 auto', maxWidth: step.visual || step.images ? '50%' : '70%' }}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  fontFamily: fonts.body, fontStyle: 'italic',
                  fontSize: 'clamp(14px, 2vw, 19px)',
                  color: palette.cream,
                  lineHeight: 1.65, margin: 0,
                }}
              >
                {step.description}
              </motion.p>
            </div>

            {/* Screenshot */}
            {step.visual && (
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                transition={{ delay: 0.3, duration: 0.55 }}
                style={{
                  flex: 1, maxWidth: 'clamp(180px, 36vw, 500px)',
                  borderRadius: 10, overflow: 'hidden',
                  boxShadow: `0 20px 60px rgba(0,0,0,0.75), 0 0 0 1px ${step.accent}35`,
                }}
              >
                <img
                  src={step.visual} alt=""
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  style={{ width: '100%', display: 'block' }}
                />
              </motion.div>
            )}

            {/* 3×2 image grid (Midjourney step) */}
            {step.images && (
              <div style={{
                flex: 1, display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 4, maxWidth: 'clamp(180px, 38vw, 520px)',
                borderRadius: 8, overflow: 'hidden',
                boxShadow: `0 20px 60px rgba(0,0,0,0.6)`,
              }}>
                {step.images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                    style={{ aspectRatio: '1', overflow: 'hidden' }}
                  >
                    <img src={src} alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
