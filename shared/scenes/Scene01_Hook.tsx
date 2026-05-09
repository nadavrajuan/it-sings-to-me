import React from 'react';
import { PaperGrain } from '../components/PaperGrain';
import { DustParticles } from '../components/DustParticles';
import { palette, fonts, motion as mc } from '../theme';
import { lerp, sceneFade } from '../utils';
import type { SceneProps } from '../types';

const OVERLAY = `linear-gradient(to top,
  ${palette.ink}F8 0%,
  ${palette.ink}DD 22%,
  ${palette.ink}88 52%,
  ${palette.ink}33 75%,
  transparent 100%
)`;

export default function Scene01_Hook({ progress, aspectRatio, backgroundSlot }: SceneProps) {
  const isVertical = aspectRatio === '9:16';
  const opacity = sceneFade(progress);
  const pc = isVertical ? mc.particleCount.vertical : mc.particleCount.horizontal;

  const bgOpacity    = lerp(progress, [0.00, 0.14], [0, 1]);
  const labelOpacity = lerp(progress, [0.12, 0.26], [0, 1]);
  const titleOpacity = lerp(progress, [0.20, 0.38], [0, 1]);
  const titleY       = lerp(progress, [0.20, 0.38], [28, 0]);
  const sub1Opacity  = lerp(progress, [0.32, 0.50], [0, 1]);
  const sub2Opacity  = lerp(progress, [0.44, 0.62], [0, 1]);

  const titlePx    = isVertical ? 80 : 90;
  const subPx      = isVertical ? 36 : 42;
  const bodyPx     = isVertical ? 28 : 34;
  const padH       = isVertical ? 80 : 120;
  const padB       = isVertical ? 140 : 100;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', opacity, background: palette.ink }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
        {backgroundSlot ?? (
          <img
            src="/assets/images/mj-03-girl-jar.png"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        )}
      </div>

      <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />
      <DustParticles count={pc} progress={progress} color={palette.candle} speed={0.25} />

      {/* Text — pinned to bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: `0 ${padH}px ${padB}px`,
        zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{
          opacity: labelOpacity,
          fontFamily: fonts.mono, fontSize: 14,
          color: palette.candle,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          01
        </div>

        <h1 style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: titlePx, color: palette.cream,
          lineHeight: 1.0, margin: 0,
        }}>
          Secret Language
        </h1>

        <p style={{
          opacity: sub1Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: subPx, color: palette.candle,
          lineHeight: 1.35, margin: 0,
        }}>
          From gibberish lyrics to music video
        </p>

        <p style={{
          opacity: sub2Opacity,
          fontFamily: fonts.body,
          fontSize: bodyPx, color: `${palette.cream}BB`,
          lineHeight: 1.55, margin: 0,
          maxWidth: isVertical ? 880 : 1400,
        }}>
          A workflow for discovering themes, symbols, and visual worlds with ChatGPT
        </p>
      </div>

      <PaperGrain />
    </div>
  );
}
