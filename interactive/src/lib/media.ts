export const VIMEO_VIDEO_ID = '1190697407';
export const VIMEO_VIDEO_HASH = '5a08ca6045';

export function assetPath(relativePath: string) {
  return `${import.meta.env.BASE_URL}${relativePath.replace(/^\/+/, '')}`;
}

export const VIMEO_PLAYER_URL =
  `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?h=${VIMEO_VIDEO_HASH}&autoplay=1&muted=0&playsinline=1&title=0&byline=0&portrait=0&color=d4a574`;

export const CLIP_PREVIEW_VIDEO_PATH = assetPath('assets/video/sing-to-me-preview-20s.mp4');
export const RAW_PIANO_AUDIO_PATH = assetPath('assets/audio/piano-improv-15s.mp3');
export const VIMEO_SHARE_URL = `https://vimeo.com/${VIMEO_VIDEO_ID}`;
