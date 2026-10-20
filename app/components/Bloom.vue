<script setup lang="ts">
// One flower: petals around a centre. Bud mode keeps a slow breathing loop.
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
    petals: 8,
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
</script>

<template>
  <g
    :transform="`translate(${x} ${y}) scale(${scale})`"
    :class="{ bud }"
    :style="{ '--delay': `${delay}ms` }"
  >
    <g v-for="(angle, i) in angles" :key="i" :transform="`rotate(${angle})`">
      <path
        class="petal"
        :style="{ '--i': i }"
        :fill="i % 2 ? 'var(--bloom-petal-deep)' : 'var(--bloom-petal)'"
        d="M0 0C-17 -12 -17 -40 0 -52C17 -40 17 -12 0 0Z"
      />
    </g>
    <circle class="bloom-core" r="9" fill="var(--bloom-pollen)" />
  </g>
</template>
