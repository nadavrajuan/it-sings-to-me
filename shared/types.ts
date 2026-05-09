import type React from 'react';

export type AspectRatio = '9:16' | '16:9';

export interface SceneProps {
  progress: number;
  aspectRatio: AspectRatio;
  backgroundSlot?: React.ReactNode;
  /** Pass staticFile()-resolved paths from Remotion compositions; scenes fall back to /assets/... if omitted */
  imageSrcs?: string[];       // Scene05: 6 MJ image paths
  screenshotLeft?: string;    // Scene03: gpt-prompt.png
  screenshotRight?: string;   // Scene03: gpt-lyrics.png
  screenshotSrc?: string;     // Scene04: gpt-etymology.png / Scene06: suno-upload.png
}
