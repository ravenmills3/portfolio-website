<script setup lang="ts">
const petals = markPetals();
const dots = markStamens();
const centre = MARK.size / 2;
</script>

<template>
  <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path
      v-for="(transform, i) in petals"
      :key="i"
      :transform="transform"
      :d="SAKURA_PETAL"
      fill="var(--mark-petal)"
    />
    <circle :cx="centre" :cy="centre" :r="MARK.core" fill="var(--mark-bloom)" />
    <circle
      v-for="([x, y], i) in dots"
      :key="`s${i}`"
      :cx="x"
      :cy="y"
      :r="MARK.stamens.r"
      fill="var(--mark-bloom)"
    />
  </svg>
</template>
