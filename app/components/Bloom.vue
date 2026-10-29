<script setup lang="ts">
// One sakura blossom: notched petals around stamens. Bud mode keeps a slow breathing loop.
const props = withDefaults(
  defineProps<{
    x: number;
    y: number;
    scale?: number;
    petals?: number;
    delay?: number;
    bud?: boolean;
    turn?: number;
  }>(),
  {
    scale: 1,
    petals: 5,
    delay: 0,
    bud: false,
    turn: 0,
  },
);
const angles = computed(() =>
  Array.from(
    { length: props.petals },
    (_, i) => props.turn + (360 / props.petals) * i,
  ),
);
const stamenLines = stamens(10, 5, 15);
</script>

<template>
  <g
    :transform="`translate(${x} ${y}) scale(${scale})`"
    :class="{ bud }"
    :style="{ '--delay': `${delay}ms` }"
  >
    <g v-for="(angle, i) in angles" :key="i" :transform="`rotate(${angle})`">
      <g class="petal" :style="{ '--i': i }">
        <path fill="var(--bloom-petal)" :d="SAKURA_PETAL" />
        <path
          fill="var(--bloom-petal-deep)"
          opacity="0.6"
          :d="SAKURA_PETAL"
          :transform="`scale(${BLUSH_SCALE})`"
        />
      </g>
    </g>
    <g class="bloom-core">
      <circle :r="bud ? 5 : 7" fill="var(--bloom-petal-deep)" />
      <!-- Buds have no stamens -->
      <g v-for="(s, i) in bud ? [] : stamenLines" :key="i">
        <line
          :x1="s.x1"
          :y1="s.y1"
          :x2="s.x2"
          :y2="s.y2"
          stroke="var(--bloom-stamen)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
        <circle :cx="s.x2" :cy="s.y2" r="1.8" fill="var(--bloom-pollen)" />
      </g>
    </g>
  </g>
</template>
