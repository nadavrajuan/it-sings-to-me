import React from 'react';
import { PaperGrain } from '../components/PaperGrain';
import { DustParticles } from '../components/DustParticles';
import { palette, fonts, motion as mc } from '../theme';
import { lerp, sceneFade } from '../utils';
import type { SceneProps } from '../types';

const OVERLAY = `linear-gradient(to top,
  ${palette.ink}F5 0%,
  ${palette.ink}BB 26%,
  ${palette.ink}55 55%,
  ${palette.ink}22 78%,
  transparent 100%
)`;

export default function Scene06_Reveal({ progress, aspectRatio, backgroundSlot, screenshotSrc }: SceneProps) {
  const isVertical = aspectRatio === '9:16';
  const opacity = sceneFade(progress);
  const pc = isVertical ? mc.particleCount.vertical : mc.particleCount.horizontal;

  const bgOpacity    = lerp(progress, [0.00, 0.12], [0, 1]);
  const labelOpacity = lerp(progress, [0.10, 0.24], [0, 1]);
  const titleOpacity = lerp(progress, [0.18, 0.36], [0, 1]);
  const titleY       = lerp(progress, [0.18, 0.36], [28, 0]);
  const body1Opacity = lerp(progress, [0.32, 0.50], [0, 1]);
  const body2Opacity = lerp(progress, [0.44, 0.62], [0, 1]);
  const body3Opacity = lerp(progress, [0.56, 0.72], [0, 1]);
  const shotOpacity  = lerp(progress, [0.30, 0.52], [0, 1]);
  const shotY        = lerp(progress, [0.30, 0.52], [30, 0]);

  const titlePx = isVertical ? 72 : 82;
  const bodyPx  = isVertical ? 28 : 34;
  const padH    = isVertical ? 70 : 100;
  const padB    = isVertical ? 130 : 90;
  const shotW   = isVertical ? 680 : 800;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', opacity, background: palette.ink }}>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
        {backgroundSlot ?? (
          <img
            src="/assets/images/mj-05-marionette-dancer.png"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />
      <DustParticles count={pc} progress={progress} color={palette.candle} speed={0.25} />

      {/* Suno screenshot */}
      {shotOpacity > 0 && (
        <div style={{
          position: 'absolute',
          zIndex: 5,
          left: '50%',
          top: isVertical ? '8%' : '4%',
          transform: `translateX(-50%) translateY(${shotY}px) rotate(-2deg)`,
          width: shotW,
          opacity: shotOpacity,
          boxShadow: `0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px ${palette.teal}50`,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          <img
            src={screenshotSrc ?? '/assets/screenshots/suno-upload.png'}
            alt=""
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            style={{ width: '100%', display: 'block', filter: 'brightness(0.9)' }}
          />
        </div>
      )}

      {/* Text */}
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
          06
        </div>

        <h1 style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: titlePx, color: palette.cream,
          lineHeight: 1.0, margin: 0,
        }}>
          Music Production
        </h1>

        <p style={{
          opacity: body1Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}EE`,
          lineHeight: 1.55, margin: 0,
        }}>
          Using the piano improv as source material,
        </p>

        <p style={{
          opacity: body2Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}CC`,
          lineHeight: 1.55, margin: 0,
        }}>
          I explored style, voice, and production
        </p>

        <p style={{
          opacity: body3Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}BB`,
          lineHeight: 1.55, margin: 0,
        }}>
          around the secret-language lyrics.
        </p>
      </div>

      <PaperGrain />
    </div>
  );
}
