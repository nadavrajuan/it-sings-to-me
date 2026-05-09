import React from 'react';
import { PaperGrain } from '../components/PaperGrain';
import { DustParticles } from '../components/DustParticles';
import { palette, fonts, motion as mc } from '../theme';
import { lerp, sceneFade } from '../utils';
import type { SceneProps } from '../types';

const MJ_IMAGES = [
  '/assets/images/mj-01-cotton-stars.png',
  '/assets/images/mj-02-galaxy.png',
  '/assets/images/mj-03-girl-jar.png',
  '/assets/images/mj-04-girl-doll.png',
  '/assets/images/mj-05-marionette-dancer.png',
  '/assets/images/mj-06-cosmic-face.png',
];

const OVERLAY_BOTTOM = `linear-gradient(to top,
  ${palette.ink}F8 0%,
  ${palette.ink}DD 20%,
  transparent 45%
)`;

export default function Scene05_Suno({ progress, aspectRatio, backgroundSlot, imageSrcs }: SceneProps) {
  const isVertical = aspectRatio === '9:16';
  const opacity = sceneFade(progress);
  const pc = isVertical ? mc.particleCount.vertical : mc.particleCount.horizontal;

  const labelOpacity = lerp(progress, [0.10, 0.24], [0, 1]);
  const titleOpacity = lerp(progress, [0.18, 0.36], [0, 1]);
  const titleY       = lerp(progress, [0.18, 0.36], [28, 0]);
  const body1Opacity = lerp(progress, [0.32, 0.50], [0, 1]);
  const body2Opacity = lerp(progress, [0.44, 0.62], [0, 1]);

  const titlePx = isVertical ? 72 : 82;
  const bodyPx  = isVertical ? 28 : 34;
  const padH    = isVertical ? 70 : 100;
  const padB    = isVertical ? 130 : 90;

  // Grid layout: 2 cols × 3 rows (vertical) or 3 cols × 2 rows (horizontal)
  const cols = isVertical ? 3 : 3;
  const rows = isVertical ? 2 : 2;
  const gridH = isVertical ? '52%' : '58%';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', opacity, background: palette.ink }}>

      {/* Image grid — fills the top portion */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: gridH,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 3,
        zIndex: 0,
      }}>
        {(imageSrcs ?? MJ_IMAGES).map((src, i) => {
          const imgOpacity = lerp(progress, [0.04 + i * 0.05, 0.18 + i * 0.05], [0, 1]);
          return (
            <div
              key={i}
              style={{ overflow: 'hidden', opacity: imgOpacity }}
            >
              <img
                src={src}
                alt=""
                onError={(e) => {
                  (e.target as HTMLImageElement).style.background = palette.cobalt;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          );
        })}
      </div>

      {/* Gradient from grid into ink at bottom */}
      <div style={{ position: 'absolute', inset: 0, background: OVERLAY_BOTTOM, zIndex: 1 }} />
      <DustParticles count={pc} progress={progress} color={palette.candle} speed={0.25} />

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
          05
        </div>

        <h1 style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: titlePx, color: palette.cream,
          lineHeight: 1.0, margin: 0,
        }}>
          Develop Concepts
        </h1>

        <p style={{
          opacity: body1Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}EE`,
          lineHeight: 1.55, margin: 0,
          maxWidth: isVertical ? 860 : 1300,
        }}>
          The hidden meanings became visual ideas —
        </p>

        <p style={{
          opacity: body2Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}BB`,
          lineHeight: 1.55, margin: 0,
          maxWidth: isVertical ? 860 : 1300,
        }}>
          a moon in a jar, dolls, stars, memory, colors, textures, and worlds.
        </p>
      </div>

      <PaperGrain />
    </div>
  );
}
