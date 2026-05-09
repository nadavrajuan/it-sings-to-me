import React from 'react';
import { PaperGrain } from '../components/PaperGrain';
import { DustParticles } from '../components/DustParticles';
import { palette, fonts, motion as mc } from '../theme';
import { lerp, sceneFade } from '../utils';
import type { SceneProps } from '../types';

const OVERLAY = `linear-gradient(to top,
  ${palette.ink}F8 0%,
  ${palette.ink}CC 25%,
  ${palette.ink}66 55%,
  ${palette.ink}22 78%,
  transparent 100%
)`;

export default function Scene02_Piano({ progress, aspectRatio, backgroundSlot }: SceneProps) {
  const isVertical = aspectRatio === '9:16';
  const opacity = sceneFade(progress);
  const pc = isVertical ? mc.particleCount.vertical : mc.particleCount.horizontal;

  const bgOpacity    = lerp(progress, [0.00, 0.12], [0, 1]);
  const labelOpacity = lerp(progress, [0.10, 0.24], [0, 1]);
  const titleOpacity = lerp(progress, [0.18, 0.36], [0, 1]);
  const titleY       = lerp(progress, [0.18, 0.36], [28, 0]);
  const body1Opacity = lerp(progress, [0.32, 0.50], [0, 1]);
  const body2Opacity = lerp(progress, [0.44, 0.62], [0, 1]);

  const titlePx = isVertical ? 80 : 90;
  const bodyPx  = isVertical ? 32 : 38;
  const padH    = isVertical ? 80 : 120;
  const padB    = isVertical ? 140 : 100;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', opacity, background: palette.ink }}>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
        {backgroundSlot ?? (
          <img
            src="/assets/images/nadav-piano.jpg"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.src = '/assets/images/mj-02-galaxy.png';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />
      <DustParticles count={pc} progress={progress} color={palette.candle} speed={0.25} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: `0 ${padH}px ${padB}px`,
        zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{
          opacity: labelOpacity,
          fontFamily: fonts.mono, fontSize: 14,
          color: palette.candle, letterSpacing: '0.24em', textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          02
        </div>

        <h1 style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: titlePx, color: palette.cream,
          lineHeight: 1.0, margin: 0,
        }}>
          Piano Improv
        </h1>

        <p style={{
          opacity: body1Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}EE`,
          lineHeight: 1.5, margin: 0,
        }}>
          It began with a piano improvisation.
        </p>

        <p style={{
          opacity: body2Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}BB`,
          lineHeight: 1.5, margin: 0,
        }}>
          A raw emotional sketch — before words.
        </p>
      </div>

      <PaperGrain />
    </div>
  );
}
