<script setup lang="ts">
// The favicon blossom: five round petals on the wallpaper's ring geometry.
const petals = Array.from({ length: 5 }, (_, i) => {
  const rad = ((-90 + i * 72) * Math.PI) / 180;
  return [16 + 7 * Math.cos(rad), 16 + 7 * Math.sin(rad)] as const;
});
</script>

<template>
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <circle
      v-for="([x, y], i) in petals"
      :key="i"
      :cx="x"
      :cy="y"
      r="5"
      fill="var(--mark-petal)"
    />
    <circle cx="16" cy="16" r="2.8" fill="var(--mark-bloom)" />
  </svg>
</template>
