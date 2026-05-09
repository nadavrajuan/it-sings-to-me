import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DotIndicator } from './components/DotIndicator';
import { useIsMobile } from './lib/useIsMobile';
import { Chapter01_Opening }        from './chapters/Chapter01_Opening';
import { Chapter06_Film }           from './chapters/Chapter06_Film';
import { ChapterFullPicture }       from './chapters/ChapterFullPicture';
import { ChapterWorkflowOverview }  from './chapters/ChapterWorkflowOverview';
import { Chapter07_Closing }        from './chapters/Chapter07_Closing';

// Narrative order: intro → clip → full picture → workflow steps → credits
const CHAPTERS = [
  Chapter01_Opening,
  Chapter06_Film,
  ChapterFullPicture,
  ChapterWorkflowOverview,
  Chapter07_Closing,
];

const CHAPTER_TITLES = [
  'Opening',
  'Watch the Clip',
  'The Full Picture',
  'The Workflow',
  'Credits & Contact',
];

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
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) navigate(current + (delta > 0 ? 1 : -1));
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [current, navigate]);

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
