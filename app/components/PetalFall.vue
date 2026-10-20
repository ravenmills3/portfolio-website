<script setup lang="ts">
// A light, ambient petal fall behind the hero art. Stopped by the header Animations toggle.
interface Petal {
  left: string;
  size: string;
  fall: string;
  delay: string;
  sway: string;
  spin: string;
  alpha: number;
  deep?: boolean;
}

// Fixed values, never random, so prerendered and hydrated markup match.
const petals: Petal[] = [
  {
    left: "12%",
    size: "14px",
    fall: "17s",
    delay: "1.8s",
    sway: "28px",
    spin: "220deg",
    alpha: 0.85,
  },
  {
    left: "34%",
    size: "11px",
    fall: "21s",
    delay: "5.5s",
    sway: "-22px",
    spin: "-180deg",
    alpha: 0.7,
    deep: true,
  },
  {
    left: "52%",
    size: "16px",
    fall: "19s",
    delay: "3.2s",
    sway: "18px",
    spin: "260deg",
    alpha: 0.8,
  },
  {
    left: "68%",
    size: "10px",
    fall: "23s",
    delay: "9s",
    sway: "-30px",
    spin: "-240deg",
    alpha: 0.65,
    deep: true,
  },
  {
    left: "82%",
    size: "13px",
    fall: "18s",
    delay: "7s",
    sway: "24px",
    spin: "200deg",
    alpha: 0.75,
  },
  {
    left: "24%",
    size: "12px",
    fall: "25s",
    delay: "12s",
    sway: "-16px",
    spin: "-200deg",
    alpha: 0.6,
  },
];

const root = useTemplateRef<HTMLElement>("root");

let observer: IntersectionObserver | undefined;

// Pause the loop while the hero is scrolled out of view.
onMounted(() => {
  if (!root.value || !("IntersectionObserver" in window)) return;
  observer = new IntersectionObserver(([entry]) => {
    root.value?.toggleAttribute("data-paused", !entry?.isIntersecting);
  });
  observer.observe(root.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="root" class="petal-fall" aria-hidden="true">
    <svg
      v-for="(p, i) in petals"
      :key="i"
      class="falling-petal"
      viewBox="-18 -54 36 56"
      :style="{
        left: p.left,
        '--size': p.size,
        '--fall': p.fall,
        '--delay': p.delay,
        '--sway': p.sway,
        '--spin': p.spin,
        '--alpha': p.alpha,
      }"
    >
      <path
        d="M0 0C-17 -12 -17 -40 0 -52C17 -40 17 -12 0 0Z"
        :fill="p.deep ? 'var(--bloom-petal-deep)' : 'var(--bloom-petal)'"
      />
    </svg>
  </div>
</template>
