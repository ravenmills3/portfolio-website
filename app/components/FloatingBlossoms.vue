<script setup lang="ts">
// The hero art: sakura blooms and buds across the panel background, clear of the text.
interface Blossom {
  place: Record<"top" | "bottom" | "left" | "right", string | undefined>;
  size: string;
  alpha: number;
  drift: string;
  delay: string;
  dx: string;
  dy: string;
  rot: string;
  turn: number;
  // Where it shows: phones, tablets (stacked, wider band), desktop (beside the text), or everywhere.
  show: "all" | "sm" | "md" | "lg";
  // Milliseconds before the petals open; buds breathe instead.
  open?: number;
  bud?: boolean;
}

const at = (place: Partial<Blossom["place"]>) => ({
  top: undefined,
  bottom: undefined,
  left: undefined,
  right: undefined,
  ...place,
});

// Fixed values, never random, so prerendered and hydrated markup match.
const blossoms: Blossom[] = [
  // Desktop cluster, right of the text column.
  {
    place: at({ top: "10%", left: "68%" }),
    size: "240px",
    alpha: 1,
    drift: "20s",
    delay: "-3s",
    dx: "-6px",
    dy: "8px",
    rot: "4deg",
    turn: 10,
    show: "lg",
    open: 0,
  },
  {
    place: at({ bottom: "-10px", right: "68%" }),
    size: "84px",
    alpha: 0.85,
    drift: "17s",
    delay: "-8s",
    dx: "6px",
    dy: "6px",
    rot: "-6deg",
    turn: 30,
    show: "lg",
    open: 900,
  },
  {
    place: at({ top: "65%", left: "56%" }),
    size: "130px",
    alpha: 0.95,
    drift: "19s",
    delay: "-5s",
    dx: "8px",
    dy: "-6px",
    rot: "-5deg",
    turn: 45,
    show: "lg",
    open: 350,
  },
  {
    place: at({ top: "48%", left: "88%" }),
    size: "150px",
    alpha: 0.95,
    drift: "22s",
    delay: "-10s",
    dx: "-8px",
    dy: "-6px",
    rot: "6deg",
    turn: 20,
    show: "lg",
    open: 600,
  },
  {
    place: at({ top: "4%", right: "88%" }),
    size: "56px",
    alpha: 0.9,
    drift: "16s",
    delay: "-6s",
    dx: "-6px",
    dy: "8px",
    rot: "8deg",
    turn: 0,
    show: "lg",
    bud: true,
  },
  {
    place: at({ top: "72%", left: "76%" }),
    size: "56px",
    alpha: 0.9,
    drift: "18s",
    delay: "-2s",
    dx: "6px",
    dy: "-6px",
    rot: "-8deg",
    turn: 60,
    show: "lg",
    bud: true,
  },
  {
    place: at({ top: "2%", right: "38%" }),
    size: "64px",
    alpha: 0.9,
    drift: "14s",
    delay: "-6s",
    dx: "-6px",
    dy: "8px",
    rot: "8deg",
    turn: 0,
    show: "lg",
    bud: true,
  },
  // Mobile cluster, in the band above the stacked text.
  {
    place: at({ top: "20px", left: "36%" }),
    size: "180px",
    alpha: 1,
    drift: "20s",
    delay: "-3s",
    dx: "-6px",
    dy: "6px",
    rot: "4deg",
    turn: 10,
    show: "sm",
    open: 0,
  },
  {
    place: at({ top: "44px", left: "6%" }),
    size: "104px",
    alpha: 0.95,
    drift: "18s",
    delay: "-7s",
    dx: "6px",
    dy: "6px",
    rot: "-6deg",
    turn: 40,
    show: "sm",
    open: 350,
  },
  {
    place: at({ top: "150px", right: "4%" }),
    size: "72px",
    alpha: 0.9,
    drift: "17s",
    delay: "-9s",
    dx: "-6px",
    dy: "-6px",
    rot: "6deg",
    turn: 25,
    show: "sm",
    open: 600,
  },
  {
    place: at({ top: "160px", left: "10%" }),
    size: "52px",
    alpha: 0.9,
    drift: "16s",
    delay: "-4s",
    dx: "6px",
    dy: "-4px",
    rot: "-8deg",
    turn: 0,
    show: "sm",
    bud: true,
  },
  {
    place: at({ top: "30px", right: "8%" }),
    size: "56px",
    alpha: 0.9,
    drift: "19s",
    delay: "-11s",
    dx: "-6px",
    dy: "6px",
    rot: "7deg",
    turn: 50,
    show: "sm",
    bud: true,
  },
  // Tablet cluster: larger blooms spread across the wider band above the text.
  {
    place: at({ top: "24px", left: "38%" }),
    size: "230px",
    alpha: 1,
    drift: "20s",
    delay: "-3s",
    dx: "-6px",
    dy: "6px",
    rot: "4deg",
    turn: 10,
    show: "md",
    open: 0,
  },
  {
    place: at({ top: "52px", left: "8%" }),
    size: "140px",
    alpha: 0.95,
    drift: "18s",
    delay: "-7s",
    dx: "6px",
    dy: "6px",
    rot: "-6deg",
    turn: 40,
    show: "md",
    open: 350,
  },
  {
    place: at({ top: "64px", right: "7%" }),
    size: "150px",
    alpha: 0.95,
    drift: "21s",
    delay: "-10s",
    dx: "-6px",
    dy: "-6px",
    rot: "6deg",
    turn: 25,
    show: "md",
    open: 600,
  },
  {
    place: at({ top: "176px", left: "27%" }),
    size: "84px",
    alpha: 0.9,
    drift: "17s",
    delay: "-5s",
    dx: "6px",
    dy: "-4px",
    rot: "-7deg",
    turn: 55,
    show: "md",
    open: 900,
  },
  {
    place: at({ top: "206px", left: "4%" }),
    size: "56px",
    alpha: 0.9,
    drift: "16s",
    delay: "-4s",
    dx: "6px",
    dy: "-4px",
    rot: "-8deg",
    turn: 0,
    show: "md",
    bud: true,
  },
  {
    place: at({ top: "196px", right: "30%" }),
    size: "60px",
    alpha: 0.9,
    drift: "19s",
    delay: "-9s",
    dx: "-6px",
    dy: "-6px",
    rot: "7deg",
    turn: 30,
    show: "md",
    bud: true,
  },
  {
    place: at({ top: "22px", right: "3%" }),
    size: "56px",
    alpha: 0.9,
    drift: "18s",
    delay: "-2s",
    dx: "-6px",
    dy: "6px",
    rot: "6deg",
    turn: 50,
    show: "md",
    bud: true,
  },
  // Faint blossoms at the panel edges, partly clipped, in the padding.
  {
    place: at({ top: "-22px", left: "-22px" }),
    size: "56px",
    alpha: 0.6,
    drift: "16s",
    delay: "-2s",
    dx: "8px",
    dy: "6px",
    rot: "8deg",
    turn: 10,
    show: "all",
    open: 1200,
  },
  {
    place: at({ top: "-18px", right: "-18px" }),
    size: "48px",
    alpha: 0.5,
    drift: "19s",
    delay: "-6s",
    dx: "-6px",
    dy: "8px",
    rot: "-6deg",
    turn: 30,
    show: "all",
    open: 1200,
  },
  {
    place: at({ bottom: "-28px", right: "10%" }),
    size: "52px",
    alpha: 0.55,
    drift: "21s",
    delay: "-9s",
    dx: "-8px",
    dy: "-6px",
    rot: "7deg",
    turn: 0,
    show: "all",
    open: 1200,
  },
  {
    place: at({ bottom: "-18px", left: "10%" }),
    size: "40px",
    alpha: 0.4,
    drift: "17s",
    delay: "-4s",
    dx: "10px",
    dy: "-4px",
    rot: "-8deg",
    turn: 45,
    show: "all",
    open: 1200,
  },
  {
    place: at({ top: "-20px", left: "36%" }),
    size: "36px",
    alpha: 0.4,
    drift: "22s",
    delay: "-11s",
    dx: "-8px",
    dy: "6px",
    rot: "6deg",
    turn: 20,
    show: "lg",
    open: 1200,
  },
];

const visibility = {
  all: "",
  sm: "md:hidden",
  md: "hidden md:block lg:hidden",
  lg: "hidden lg:block",
};

usePausedOffscreen(useTemplateRef<HTMLElement>("root"));
</script>

<template>
  <div
    ref="root"
    class="floating-blossoms pointer-events-none absolute inset-0 z-0"
    aria-hidden="true"
  >
    <svg
      v-for="(b, i) in blossoms"
      :key="i"
      class="floating-blossom"
      :class="visibility[b.show]"
      viewBox="-60 -60 120 120"
      focusable="false"
      :style="{
        ...b.place,
        '--size': b.size,
        '--alpha': b.alpha,
        '--drift': b.drift,
        '--delay': b.delay,
        '--dx': b.dx,
        '--dy': b.dy,
        '--rot': b.rot,
      }"
    >
      <Bloom :x="0" :y="0" :turn="b.turn" :bud="b.bud" :delay="b.open ?? 0" />
    </svg>
  </div>
</template>
