/** Clamped linear interpolation — same semantics as Remotion's interpolate() */
export function lerp(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  clamp = true,
): number {
  const [iMin, iMax] = inputRange;
  const [oMin, oMax] = outputRange;
  let t = (value - iMin) / (iMax - iMin);
  if (clamp) t = Math.max(0, Math.min(1, t));
  return oMin + t * (oMax - oMin);
}

/** Deterministic pseudo-random in [0, 1) based on seed */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

/** Scene fade — 10% fade in, 10% fade out */
export function sceneFade(progress: number): number {
  if (progress < 0.1) return progress * 10;
  if (progress > 0.9) return (1 - progress) * 10;
  return 1;
}

/** Generate a believable sine-based fake waveform */
export function generateFakePeaks(count: number, seed = 42): number[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / count;
    const v =
      0.5 +
      0.3 * Math.sin(t * Math.PI * 7 + seed) +
      0.2 * Math.sin(t * Math.PI * 13 + seed * 0.7) +
      0.1 * Math.sin(t * Math.PI * 29 + seed * 1.3);
    return Math.max(0.05, Math.min(1, v));
  });
}
