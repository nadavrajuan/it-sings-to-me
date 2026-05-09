import React from 'react';
import { PaperGrain } from '../components/PaperGrain';
import { DustParticles } from '../components/DustParticles';
import { palette, fonts, motion as mc } from '../theme';
import { lerp, sceneFade } from '../utils';
import type { SceneProps } from '../types';

const OVERLAY = `linear-gradient(to top,
  ${palette.ink}F5 0%,
  ${palette.ink}BB 28%,
  ${palette.ink}55 58%,
  ${palette.ink}22 80%,
  transparent 100%
)`;

function Screenshot({ src, opacity, rotation, style }: {
  src: string; opacity: number; rotation: number; style: React.CSSProperties;
}) {
  if (opacity <= 0) return null;
  return (
    <div style={{
      opacity,
      transform: `rotate(${rotation}deg)`,
      boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${palette.teal}50`,
      borderRadius: 10,
      overflow: 'hidden',
      ...style,
    }}>
      <img
        src={src}
        alt=""
        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        style={{ width: '100%', display: 'block', filter: 'brightness(0.92)' }}
      />
    </div>
  );
}

export default function Scene03_Lyrics({ progress, aspectRatio, backgroundSlot, screenshotLeft, screenshotRight }: SceneProps) {
  const isVertical = aspectRatio === '9:16';
  const opacity = sceneFade(progress);
  const pc = isVertical ? mc.particleCount.vertical : mc.particleCount.horizontal;

  const bgOpacity      = lerp(progress, [0.00, 0.12], [0, 1]);
  const labelOpacity   = lerp(progress, [0.10, 0.24], [0, 1]);
  const titleOpacity   = lerp(progress, [0.18, 0.36], [0, 1]);
  const titleY         = lerp(progress, [0.18, 0.36], [28, 0]);
  const body1Opacity   = lerp(progress, [0.32, 0.50], [0, 1]);
  const body2Opacity   = lerp(progress, [0.44, 0.62], [0, 1]);
  const shot1Opacity   = lerp(progress, [0.20, 0.42], [0, 1]);
  const shot2Opacity   = lerp(progress, [0.35, 0.55], [0, 1]);

  const titlePx = isVertical ? 72 : 82;
  const bodyPx  = isVertical ? 28 : 34;
  const padH    = isVertical ? 70 : 100;
  const padB    = isVertical ? 130 : 90;

  // Screenshot card widths
  const shotW = isVertical ? 340 : 420;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', opacity, background: palette.ink }}>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
        {backgroundSlot ?? (
          <img
            src="/assets/images/mj-01-cotton-stars.png"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />
      <DustParticles count={pc} progress={progress} color={palette.candle} speed={0.25} />

      {/* GPT Screenshots — float in the upper/mid area */}
      <div style={{ position: 'absolute', zIndex: 5, ...(isVertical
        ? { top: '8%', left: '4%' }
        : { top: '6%', left: '4%' }
      )}}>
        <Screenshot
          src={screenshotLeft ?? '/assets/screenshots/gpt-prompt.png'}
          opacity={shot1Opacity}
          rotation={-3}
          style={{ width: shotW }}
        />
      </div>

      <div style={{ position: 'absolute', zIndex: 6, ...(isVertical
        ? { top: '22%', right: '4%' }
        : { top: '8%', right: '4%' }
      )}}>
        <Screenshot
          src={screenshotRight ?? '/assets/screenshots/gpt-lyrics.png'}
          opacity={shot2Opacity}
          rotation={2.5}
          style={{ width: shotW * 0.88 }}
        />
      </div>

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
          03
        </div>

        <h1 style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: titlePx, color: palette.cream,
          lineHeight: 1.0, margin: 0,
        }}>
          Explore the Gibberish
        </h1>

        <p style={{
          opacity: body1Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}EE`,
          lineHeight: 1.55, margin: 0,
          maxWidth: isVertical ? 860 : 1300,
        }}>
          Using ChatGPT's "subconscious" to invent a secret language —
        </p>

        <p style={{
          opacity: body2Opacity,
          fontFamily: fonts.body, fontStyle: 'italic',
          fontSize: bodyPx, color: `${palette.cream}BB`,
          lineHeight: 1.55, margin: 0,
          maxWidth: isVertical ? 860 : 1300,
        }}>
          made from sound, instinct, and hidden associations.
        </p>
      </div>

      <PaperGrain />
    </div>
  );
}
