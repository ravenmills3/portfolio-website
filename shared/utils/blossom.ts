// The sakura blossom shared by the hero, wallpaper, header mark, favicon and OG image.

export const SAKURA_PETAL =
  "M0 0C-8 -6 -17 -20 -17 -34C-16 -45 -10 -52 -5 -51C-2 -50 -1 -47 0 -43C1 -47 2 -50 5 -51C10 -52 16 -45 17 -34C17 -20 8 -6 0 0Z";
export const PETAL_LENGTH = 52;
export const BLUSH_SCALE = 0.45;

const round = (n: number) => Number(n.toFixed(2));

// One transform per petal, placing them evenly around (cx, cy), clockwise from `start`.
export function petalTransforms(
  cx: number,
  cy: number,
  length: number,
  count = 5,
  start = -90,
) {
  const scale = round(length / PETAL_LENGTH);
  return Array.from({ length: count }, (_, i) => {
    const angle = round(start + 90 + (i * 360) / count);
    return `translate(${round(cx)} ${round(cy)}) rotate(${angle}) scale(${scale})`;
  });
}

// Stamens: a line from `inner` to `outer`, with a pollen tip, between each pair of petals.
export function stamens(
  count: number,
  inner: number,
  outer: number,
  start = -54,
) {
  return Array.from({ length: count }, (_, i) => {
    const rad = ((start + (i * 360) / count) * Math.PI) / 180;
    const [cos, sin] = [Math.cos(rad), Math.sin(rad)];
    return {
      x1: round(inner * cos),
      y1: round(inner * sin),
      x2: round(outer * cos),
      y2: round(outer * sin),
    };
  });
}

// The 32×32 mark shared by BloomMark.vue and the favicon.
export const MARK = {
  size: 32,
  length: 13.5,
  core: 2.6,
  stamens: { count: 5, radius: 4.6, r: 0.9 },
} as const;

export function markPetals() {
  const c = MARK.size / 2;
  return petalTransforms(c, c, MARK.length);
}

// Pollen dots between the petals, around the core.
export function markStamens() {
  const c = MARK.size / 2;
  const { count, radius } = MARK.stamens;
  return stamens(count, 0, radius, -54).map(({ x2, y2 }) => [
    Number((c + x2).toFixed(2)),
    Number((c + y2).toFixed(2)),
  ]);
}
