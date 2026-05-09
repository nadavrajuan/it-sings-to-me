export const palette = {
  ink: '#0a1628',
  cobalt: '#1e3a5f',
  teal: '#3a6b8a',
  candle: '#d4a574',
  rust: '#c4633c',
  cream: '#f5e6d3',
  crystal: '#ffffff',
} as const;

export const fonts = {
  display: "'Caveat', cursive",
  body: "'Cormorant Garamond', serif",
  mono: "'JetBrains Mono', monospace",
  hebrew: "'Noto Serif Hebrew', serif",
  devanagari: "'Noto Serif Devanagari', serif",
} as const;

export const motion = {
  baseEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
  driftScale: 1.03,
  textStrokeDuration: 600,
  particleCount: {
    vertical: 50,
    horizontal: 80,
  },
} as const;

// 60 seconds total @ 30fps — 6 scenes × 10s each
export const scenes = {
  Scene01_Hook:    { start: 0,    duration: 300 }, // SECRET LANGUAGE
  Scene02_Piano:   { start: 300,  duration: 300 }, // PIANO IMPROV
  Scene03_Lyrics:  { start: 600,  duration: 300 }, // EXPLORE THE GIBBERISH
  Scene04_Jar:     { start: 900,  duration: 300 }, // SEARCH FOR MEANING
  Scene05_Suno:    { start: 1200, duration: 300 }, // DEVELOP CONCEPTS
  Scene06_Reveal:  { start: 1500, duration: 300 }, // MUSIC PRODUCTION
} as const;

export const TOTAL_FRAMES = 1800; // 60s
export const FPS = 30;
