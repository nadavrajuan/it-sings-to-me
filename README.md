# It Sings To Me — Workflow Video

**"Making a Music Video From a Secret Language"**  
Creator: Nadav Rajuan · 2026

---

## The Story Arc

1. Played a free piano improvisation — no plan, just feeling.
2. Asked GPT-4 to invent a gibberish language for the lyrics.
3. The gibberish words turned out to echo real roots across Hebrew, Italian, Sanskrit, and Māori.
4. Generated visuals in Midjourney — one image per lyric idea.
5. Uploaded the original piano recording to Suno along with the invented lyrics.
6. Suno generated the final song. Then assembled the music video in Remotion.

The workflow video is a 32-second cinematic piece that doubles as an interactive web experience.  
Aesthetic: dream archive, cosmic music box, behind-the-scenes spellbook. Handmade. Painterly. Slightly melancholy.

---

## Tech Stack

| Layer | Tools |
|---|---|
| Video render | Remotion 4, TypeScript, React 18 |
| Interactive app | Vite 5, React 18, TypeScript, Framer Motion |
| Shared scenes | Framework-agnostic React components |
| Fonts | Google Fonts via @remotion/google-fonts + HTML link tags |
| Monorepo | npm workspaces |

---

## Project Structure

```
looli-workflow/
├── shared/                    ← scene components, theme, utils (shared by both apps)
│   ├── theme.ts               ← palette, fonts, motion constants, scene timing
│   ├── types.ts               ← SceneProps, AspectRatio
│   ├── utils.ts               ← lerp(), sceneFade(), generateFakePeaks(), seededRandom()
│   ├── index.ts               ← barrel export
│   ├── components/
│   │   ├── PaperGrain.tsx     ← SVG noise overlay (film grain)
│   │   ├── DustParticles.tsx  ← deterministic slow-drifting particles
│   │   ├── HandwrittenText.tsx← Caveat font with left→right clip-path reveal
│   │   ├── TypewriterText.tsx ← character-by-character reveal
│   │   ├── Jar.tsx            ← SVG glass jar with clipped contents
│   │   ├── ConnectionString.tsx← animated SVG bezier stroke
│   │   ├── Waveform.tsx       ← animated bar waveform (piano / song styles)
│   │   └── SceneFrame.tsx     ← wrapper: background, safe areas, grain, dust, fade
│   └── scenes/
│       ├── Scene01_Hook.tsx   ← cold open, 4 quick cuts, handwritten text
│       ├── Scene02_Piano.tsx  ← piano keys, waveform growing, handwritten note
│       ├── Scene03_Lyrics.tsx ← typewriter lyrics + etymology footnote cards
│       ├── Scene04_Jar.tsx    ← phrases fall into jar, motif images bloom out
│       ├── Scene05_Suno.tsx   ← Suno screenshot, piano→song waveform transform
│       └── Scene06_Reveal.tsx ← full-bleed video → title card (accepts videoSlot prop)
│
├── remotion/                  ← Remotion render pipeline
│   ├── remotion.config.ts     ← points publicDir to ../public
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts           ← registerRoot
│       ├── Root.tsx           ← registers Vertical + Horizontal compositions; loads fonts
│       └── compositions/
│           ├── Vertical.tsx   ← 1080×1920, 9:16 — Sequences + Audio crossfades
│           └── Horizontal.tsx ← 1920×1080, 16:9 — same structure
│
├── interactive/               ← Vite+React interactive web experience
│   ├── vite.config.ts         ← publicDir: ../public, alias @looli/shared → ../shared
│   ├── index.html             ← Google Fonts link tags
│   └── src/
│       ├── App.tsx            ← chapter navigation (keyboard + swipe + AnimatePresence)
│       ├── components/
│       │   └── DotIndicator.tsx
│       └── chapters/
│           ├── Chapter01_Opening.tsx  ← Scene01 visual + 6 clickable stars
│           ├── Chapter02_Language.tsx ← Scene03 visual + tap-to-reveal lyrics
│           ├── Chapter03_Meaning.tsx  ← etymology cards
│           ├── Chapter04_Jar.tsx      ← Scene04 visual + MJ gallery + prompt lightbox
│           ├── Chapter05_Workflow.tsx ← SVG pipeline diagram with expandable nodes
│           └── Chapter06_Film.tsx     ← video player + credits
│
└── public/assets/             ← all media (shared by both apps)
    ├── images/                ← mj-01..06 PNGs
    ├── video/                 ← music-video-clip.mp4
    ├── audio/                 ← piano-improv.wav, it-sings-to-me.mp3
    └── screenshots/           ← suno-upload.png
```

---

## Setup

### 1. Install all dependencies

```bash
cd looli-workflow
npm install
```

This installs dependencies for `shared`, `remotion`, and `interactive` via npm workspaces.

### 2. Verify assets

```bash
ls public/assets/images/
ls public/assets/audio/
ls public/assets/video/
ls public/assets/screenshots/
```

See `public/assets/README.md` for the full checklist.

---

## Asset Checklist

| File | Required | Status |
|---|---|---|
| `public/assets/images/mj-01-cotton-stars.png` | Scene 1, 4 | ✅ |
| `public/assets/images/mj-02-galaxy.png` | Scene 4 | ✅ |
| `public/assets/images/mj-03-girl-jar.png` | Scene 1, 5 | ✅ |
| `public/assets/images/mj-04-girl-doll.png` | Scene 4 | ✅ |
| `public/assets/images/mj-05-marionette-dancer.png` | Scene 1, 4 | ✅ |
| `public/assets/images/mj-06-cosmic-face.png` | Scene 1, 4 | ✅ |
| `public/assets/audio/piano-improv.wav` | Scene 2–5 | ✅ |
| `public/assets/audio/it-sings-to-me.mp3` | Scene 5–6 | ✅ extracted |
| `public/assets/video/music-video-clip.mp4` | Scene 6 | ✅ |
| `public/assets/screenshots/suno-upload.png` | Scene 5 | ✅ |

> **Image mapping note:** The 4 "Still" files from the raw project folder are frames from the final  
> music video, not original Midjourney outputs. Filenames were guessed from context. Rename/replace  
> if a scene's visual doesn't match the intended image (e.g. mj-01 should feel like "cotton stars").

---

## ffmpeg Audio Extraction

If you only have the video and need the standalone MP3:

```bash
ffmpeg -i public/assets/video/music-video-clip.mp4 \
       -vn -acodec libmp3lame -q:a 2 \
       public/assets/audio/it-sings-to-me.mp3
```

---

## Remotion Studio

```bash
cd remotion
npm run studio
# → opens http://localhost:3000
```

- Select "Vertical" (1080×1920) or "Horizontal" (1920×1080)
- Use the timeline scrubber to navigate between scenes
- Edit any `shared/scenes/Scene0X_*.tsx` file → hot-reloads instantly

---

## Render Commands

```bash
# From /remotion directory
npm run render:vertical    # → out/it-sings-to-me-vertical.mp4
npm run render:horizontal  # → out/it-sings-to-me-horizontal.mp4
npm run render:both        # renders both sequentially

# Or from monorepo root
npm run render:vertical
```

---

## Interactive App

```bash
cd interactive
npm run dev
# → opens http://localhost:5173
```

**Navigation:**
- Mobile: vertical swipe up/down
- Desktop: arrow keys or scroll
- Dots on right side: click to jump to any chapter

---

## Iterating on a Scene

1. Open `shared/scenes/Scene0X_YourScene.tsx`
2. Each scene receives `{ progress: 0→1, aspectRatio: '9:16' | '16:9' }`
3. Save → Remotion studio hot-reloads, interactive app hot-reloads
4. Use `lerp(progress, [start, end], [outMin, outMax])` from `shared/utils.ts` for all animation math
5. No Remotion-specific APIs in `shared/` — keep scenes framework-agnostic

---

## Design System

### Palette

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0a1628` | Deep background |
| `cobalt` | `#1e3a5f` | Mid background |
| `teal` | `#3a6b8a` | Accents, washes |
| `candle` | `#d4a574` | Warm beige glow, highlights |
| `rust` | `#c4633c` | Marmalade accent |
| `cream` | `#f5e6d3` | Text, highlights |
| `crystal` | `#ffffff` | Pure highlights — use sparingly |

### Fonts

| Role | Family | Use |
|---|---|---|
| Display (handwritten) | Caveat | Poetic text, handwritten notes |
| Body (serif) | Cormorant Garamond | Scene headers, lyrics, captions |
| Mono | JetBrains Mono | System/UI moments, credits |
| Hebrew | Noto Serif Hebrew | Etymology cards |
| Devanagari | Noto Serif Devanagari | Sanskrit text |

### Motion Constants

```ts
baseEase: 'cubic-bezier(0.22, 1, 0.36, 1)'   // smooth entry
driftScale: 1.03                               // subtle camera drift (3%)
textStrokeDuration: 600                        // ms for handwritten reveal
particleCount: { vertical: 60, horizontal: 100 }
```

### Scene Utilities

```ts
import { lerp, sceneFade, generateFakePeaks, seededRandom } from '@looli/shared';

lerp(value, [inMin, inMax], [outMin, outMax]) // clamped linear interp
sceneFade(progress)                           // 0→1 fade in (0–10%), 1→0 fade out (90–100%)
```

---

## Storyboard

| # | Scene | Frames | Duration | Beat |
|---|---|---|---|---|
| 1 | Hook | 0–90 | 3s | Cold open: 4 quick cuts → handwritten title |
| 2 | Piano | 90–240 | 5s | Piano keys animate, waveform grows |
| 3 | Lyrics | 240–420 | 6s | Typewriter lyrics → etymology footnotes |
| 4 | Jar | 420–600 | 6s | Phrases fall into jar → images bloom out |
| 5 | Suno | 600–750 | 5s | Screenshot + piano→song waveform transform |
| 6 | Reveal | 750–960 | 7s | Full-bleed video → title card |

### Recurring Motifs

- **The Jar** — scenes 4 and 5; words go in, images come out
- **The String/Thread** — SVG bezier strokes; etymology connections, marionette implied
- **Paper Grain + Dust** — every scene via `SceneFrame`; film-grain SVG + slow particles

---

## Audio Timing

| Asset | Composition start | Source offset | Notes |
|---|---|---|---|
| `piano-improv.wav` | Frame 90 (scene 2) | 0 | Fades out frames 690→750 |
| `it-sings-to-me.mp3` | Frame 690 | `SONG_START_FROM` (default 0) | Fades in frames 690→720 |

Adjust `SONG_START_FROM` in `remotion/src/compositions/Vertical.tsx` and `Horizontal.tsx`  
to skip into a strong moment of the song (e.g. `8 * 30 = 240` to skip the first 8 seconds).

---

## Common Gotchas

**Font loading in Remotion**  
Fonts are loaded at the top of `Root.tsx` via `@remotion/google-fonts`. If text renders as a fallback  
serif on first frame, confirm that `loadCaveat()`, `loadCormorant()`, `loadJetBrains()` are called  
before any Composition renders.

**Asset paths**  
All asset paths use `/assets/...` (absolute from public root). In Remotion, `remotion.config.ts` sets  
`Config.setPublicDir('../public')`. In Vite, `vite.config.ts` sets `publicDir: '../public'`.  
If you get 404s, confirm both configs point to the right folder.

**Audio not playing in studio**  
The studio preview requires audio files to be present. Missing `it-sings-to-me.mp3` will  
throw a network error but won't crash the render. Extract it first with the ffmpeg command above.

**OffthreadVideo in scene 6**  
The `videoSlot` prop receives the Remotion `<OffthreadVideo>` element at the composition level,  
not inside the shared scene component. This keeps scenes framework-agnostic. If you need to  
adjust the video start frame, change `startFrom={0}` in `Vertical.tsx` / `Horizontal.tsx`.

**Deterministic particles**  
`DustParticles` uses a seeded LCG for reproducible Remotion frame renders. Never use `Math.random()`  
inside shared scenes — it produces different values per frame and creates visible jitter.

**Progress vs frame**  
Scenes never call `useCurrentFrame()`. All animation is driven by the `progress` prop (0→1).  
The Remotion compositions calculate progress via `interpolate()`. The interactive app drives  
progress via component state or hardcodes it at `1` to show the scene's settled state.

---

## Making Changes

### Add a new shared component
1. Create `shared/components/MyComponent.tsx`
2. Export from `shared/index.ts`
3. Import as `import { MyComponent } from '@looli/shared'` in either app

### Adjust scene timing
Edit the `scenes` object in `shared/theme.ts`.  
The compositions read from this object, so both Vertical and Horizontal update automatically.

### Add a new composition variant
Copy `remotion/src/compositions/Vertical.tsx`, register in `Root.tsx` with a new `id`.
