import React from 'react';
import { palette, motion as motionConstants } from '../theme';
import { sceneFade } from '../utils';
import { PaperGrain } from './PaperGrain';
import { DustParticles } from './DustParticles';
import type { AspectRatio } from '../types';

interface SceneFrameProps {
  aspectRatio: AspectRatio;
  progress: number;
  children: React.ReactNode;
  disableDust?: boolean;
}

export function SceneFrame({ aspectRatio, progress, children, disableDust = false }: SceneFrameProps) {
  const isVertical = aspectRatio === '9:16';
  const padding = isVertical ? '8%' : '6%';
  const particleCount = isVertical
    ? motionConstants.particleCount.vertical
    : motionConstants.particleCount.horizontal;

  const opacity = sceneFade(progress);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity,
        background: `radial-gradient(ellipse at 30% 40%, ${palette.cobalt} 0%, ${palette.ink} 70%)`,
      }}
    >
      {/* Ambient dust */}
      {!disableDust && (
        <DustParticles
          count={particleCount}
          progress={progress}
          color={palette.candle}
          speed={0.4}
        />
      )}

      {/* Scene content with safe-area padding */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding,
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {children}
      </div>

      {/* Paper grain sits on top of everything */}
      <PaperGrain />
    </div>
  );
}
