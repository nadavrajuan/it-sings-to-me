import React from 'react';
import {
  useCurrentFrame,
  Sequence,
  Audio,
  OffthreadVideo,
  staticFile,
  interpolate,
} from 'remotion';
import {
  Scene01_Hook,
  Scene02_Piano,
  Scene03_Lyrics,
  Scene04_Jar,
  Scene05_Suno,
  Scene06_Reveal,
} from '../../../shared';
import { scenes } from '../../../shared/theme';

const ASPECT = '9:16' as const;
const S = scenes;

const VIDEO_BG: Record<string, number> = {
  scene01: 0    * 30,
  scene02: 35   * 30,
  scene03: 70   * 30,
  scene04: 110  * 30,
  scene06: 165  * 30,
};

const IMAGES = [
  staticFile('assets/images/mj-01-cotton-stars.png'),
  staticFile('assets/images/mj-02-galaxy.png'),
  staticFile('assets/images/mj-03-girl-jar.png'),
  staticFile('assets/images/mj-04-girl-doll.png'),
  staticFile('assets/images/mj-05-marionette-dancer.png'),
  staticFile('assets/images/mj-06-cosmic-face.png'),
];

const SCREENSHOTS = {
  gptPrompt:    staticFile('assets/screenshots/gpt-prompt.png'),
  gptLyrics:    staticFile('assets/screenshots/gpt-lyrics.png'),
  gptEtymology: staticFile('assets/screenshots/gpt-etymology.png'),
  sunoUpload:   staticFile('assets/screenshots/suno-upload.png'),
};

function sceneProgress(frame: number, start: number, duration: number): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

function VideoBackground({ startFrom }: { startFrom: number }) {
  return (
    <OffthreadVideo
      src={staticFile('assets/video/music-video-clip.mp4')}
      startFrom={startFrom}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      muted
    />
  );
}

export function Vertical() {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: 1080, height: 1920, position: 'relative', overflow: 'hidden' }}>

      <Audio
        src={staticFile('assets/audio/it-sings-to-me.mp3')}
        startFrom={0}
        volume={1}
      />

      <Sequence from={S.Scene01_Hook.start} durationInFrames={S.Scene01_Hook.duration}>
        <Scene01_Hook
          progress={sceneProgress(frame, S.Scene01_Hook.start, S.Scene01_Hook.duration)}
          aspectRatio={ASPECT}
          backgroundSlot={<VideoBackground startFrom={VIDEO_BG.scene01} />}
        />
      </Sequence>

      <Sequence from={S.Scene02_Piano.start} durationInFrames={S.Scene02_Piano.duration}>
        <Scene02_Piano
          progress={sceneProgress(frame, S.Scene02_Piano.start, S.Scene02_Piano.duration)}
          aspectRatio={ASPECT}
          backgroundSlot={<VideoBackground startFrom={VIDEO_BG.scene02} />}
        />
      </Sequence>

      <Sequence from={S.Scene03_Lyrics.start} durationInFrames={S.Scene03_Lyrics.duration}>
        <Scene03_Lyrics
          progress={sceneProgress(frame, S.Scene03_Lyrics.start, S.Scene03_Lyrics.duration)}
          aspectRatio={ASPECT}
          backgroundSlot={<VideoBackground startFrom={VIDEO_BG.scene03} />}
          screenshotLeft={SCREENSHOTS.gptPrompt}
          screenshotRight={SCREENSHOTS.gptLyrics}
        />
      </Sequence>

      <Sequence from={S.Scene04_Jar.start} durationInFrames={S.Scene04_Jar.duration}>
        <Scene04_Jar
          progress={sceneProgress(frame, S.Scene04_Jar.start, S.Scene04_Jar.duration)}
          aspectRatio={ASPECT}
          backgroundSlot={<VideoBackground startFrom={VIDEO_BG.scene04} />}
          screenshotSrc={SCREENSHOTS.gptEtymology}
        />
      </Sequence>

      <Sequence from={S.Scene05_Suno.start} durationInFrames={S.Scene05_Suno.duration}>
        <Scene05_Suno
          progress={sceneProgress(frame, S.Scene05_Suno.start, S.Scene05_Suno.duration)}
          aspectRatio={ASPECT}
          imageSrcs={IMAGES}
        />
      </Sequence>

      <Sequence from={S.Scene06_Reveal.start} durationInFrames={S.Scene06_Reveal.duration}>
        <Scene06_Reveal
          progress={sceneProgress(frame, S.Scene06_Reveal.start, S.Scene06_Reveal.duration)}
          aspectRatio={ASPECT}
          backgroundSlot={<VideoBackground startFrom={VIDEO_BG.scene06} />}
          screenshotSrc={SCREENSHOTS.sunoUpload}
        />
      </Sequence>
    </div>
  );
}
