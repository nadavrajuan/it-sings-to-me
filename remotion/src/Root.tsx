import React from 'react';
import { Composition } from 'remotion';
import { Vertical } from './compositions/Vertical';
import { Horizontal } from './compositions/Horizontal';
import { TOTAL_FRAMES, FPS } from '../../shared/theme';

// Load Google Fonts before compositions render
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono';

loadCaveat();
loadCormorant();
loadJetBrains();

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="Vertical"
        component={Vertical}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Horizontal"
        component={Horizontal}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
}
