<template>
  <svg
    viewBox="0 0 440 420"
    class="w-full max-w-md"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M110 380C130 300 190 250 250 200M250 200C300 170 330 130 340 90"
      fill="none"
      stroke="var(--ui-border-accented)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <Bloom :x="280" :y="170" :scale="2.1" :petals="8" :delay="0" />
    <Bloom
      :x="110"
      :y="100"
      :scale="1.3"
      :petals="5"
      :delay="350"
      :turn="20"
      bud
    />
    <Bloom
      :x="370"
      :y="350"
      :scale="1.1"
      :petals="7"
      :delay="600"
      :turn="10"
      bud
    />
    <Bloom :x="140" :y="315" :scale="0.8" :petals="6" :delay="900" />
  </svg>
</template>
