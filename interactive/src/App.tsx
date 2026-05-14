import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DotIndicator } from './components/DotIndicator';
import { useIsMobile } from './lib/useIsMobile';
import { Chapter01_Opening }        from './chapters/Chapter01_Opening';
import { ChapterFullPicture }       from './chapters/ChapterFullPicture';
import { ChapterWorkflowOverview }  from './chapters/ChapterWorkflowOverview';
import { Chapter07_Closing }        from './chapters/Chapter07_Closing';

// Narrative order: intro + clip → full picture → workflow steps → credits
const CHAPTERS = [
  Chapter01_Opening,
  ChapterFullPicture,
  ChapterWorkflowOverview,
  Chapter07_Closing,
];

const CHAPTER_TITLES = [
  'Opening & Clip',
  'The Full Picture',
  'The Workflow',
  'Credits & Contact',
];

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    && Boolean(target.closest('button, a, audio, input, textarea, select, iframe, [data-no-swipe="true"]'));
}

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function App() {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const wheelIntent = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);
  const wheelUnlockTimer = useRef<number | null>(null);
  const wheelLocked = useRef(false);

  const navigate = useCallback(
    (next: number) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(CHAPTERS.length - 1, next));
      if (clamped === current) return;
      isAnimating.current = true;
      setDirection(clamped > current ? 1 : -1);
      setCurrent(clamped);
      setTimeout(() => { isAnimating.current = false; }, 600);
    },
    [current],
  );

  // Keyboard — ChapterWorkflowOverview steals its own keys via capture phase
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'VIDEO' || tag === 'AUDIO') {
        (e.target as HTMLElement).blur();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  navigate(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, navigate]);

  // Touch swipe
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target)) return;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target) || touchStartY.current === 0) {
        touchStartY.current = 0;
        return;
      }
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = 0;
      if (Math.abs(delta) > 50) navigate(current + (delta > 0 ? 1 : -1));
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [current, navigate]);

  // Desktop wheel / trackpad navigation between top-level chapters.
  // ChapterWorkflowOverview listens in capture phase and will steal the wheel
  // when the user is inside its internal step flow.
  useEffect(() => {
    if (isMobile) return;

    const onWheel = (e: WheelEvent) => {
      if (isInteractiveTarget(e.target)) return;
      if (e.target instanceof HTMLElement && e.target.closest('[data-wheel-scope="workflow"]')) return;

      e.preventDefault();

      if (wheelLocked.current) {
        wheelIntent.current = 0;
        if (wheelResetTimer.current) window.clearTimeout(wheelResetTimer.current);
        wheelResetTimer.current = window.setTimeout(() => {
          wheelIntent.current = 0;
        }, 180);
        return;
      }

      wheelIntent.current += e.deltaY;

      if (wheelResetTimer.current) window.clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = window.setTimeout(() => {
        wheelIntent.current = 0;
      }, 180);

      if (Math.abs(wheelIntent.current) < 80) return;

      const nextDirection = wheelIntent.current > 0 ? 1 : -1;
      wheelIntent.current = 0;
      wheelLocked.current = true;

      if (wheelUnlockTimer.current) window.clearTimeout(wheelUnlockTimer.current);
      wheelUnlockTimer.current = window.setTimeout(() => {
        wheelLocked.current = false;
        wheelIntent.current = 0;
      }, 900);

      navigate(current + nextDirection);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelResetTimer.current) window.clearTimeout(wheelResetTimer.current);
      if (wheelUnlockTimer.current) window.clearTimeout(wheelUnlockTimer.current);
      wheelIntent.current = 0;
      wheelLocked.current = false;
    };
  }, [current, isMobile, navigate]);

  const ActiveChapter = CHAPTERS[current];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden', background: '#0a1628' }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <ActiveChapter onNavigate={navigate} currentIndex={current} />
        </motion.div>
      </AnimatePresence>

      {!isMobile && (
        <DotIndicator
          total={CHAPTERS.length}
          current={current}
          titles={CHAPTER_TITLES}
          onChange={navigate}
        />
      )}
    </div>
  );
}
