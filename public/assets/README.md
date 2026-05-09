# Asset Checklist

Place files here before running `npm run studio` or rendering.  
All paths are relative to `public/assets/`.

---

## images/  (Midjourney stills)

| Filename | Status | Description |
|---|---|---|
| `mj-01-cotton-stars.png` | ✅ copied | Music video still — cotton-star night sky |
| `mj-02-galaxy.png` | ✅ copied | Music video still — galaxy / painted stars |
| `mj-03-girl-jar.png` | ✅ copied | Music video still — woman with jar (used in scene 5 framing) |
| `mj-04-girl-doll.png` | ✅ copied | Music video still — woman kissing doll |
| `mj-05-marionette-dancer.png` | ✅ copied | Midjourney — female dancer on marionette strings |
| `mj-06-cosmic-face.png` | ✅ copied | Midjourney — singer dissolving into star-studded cosmos |

> **Note:** The 4 "Still" files are frames from the music video, not original Midjourney renders.
> The "best guess" mapping was made from filenames. Rename them if the visual doesn't match the scene intent.
> If you have the original six Midjourney outputs, replace the corresponding files.

---

## audio/

| Filename | Status | Description |
|---|---|---|
| `piano-improv.wav` | ✅ copied | 15-second original piano improvisation |
| `it-sings-to-me.mp3` | ✅ extracted | Final song (extracted from music-video-clip.mp4 via ffmpeg) |

### Extract audio from video

```bash
ffmpeg -i public/assets/video/music-video-clip.mp4 \
       -vn -acodec libmp3lame -q:a 2 \
       public/assets/audio/it-sings-to-me.mp3
```

---

## video/

| Filename | Status | Description |
|---|---|---|
| `music-video-clip.mp4` | ✅ copied | Full music video (used in Scene 6, ~32s) |

---

## screenshots/

| Filename | Status | Description |
|---|---|---|
| `suno-upload.png` | ✅ copied | Screenshot of Suno's "+ Audio / Upload" interface |
