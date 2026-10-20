<script setup lang="ts">
// Inner-page title with a wallpaper band above it; text never sits on the pattern.
defineProps<{ title: string; intro?: string }>();
</script>

<template>
  <div>
    <div
      class="wallpaper no-print h-10 border-b border-default [--tile:40px] sm:h-12 sm:[--tile:48px]"
      aria-hidden="true"
    />
    <UContainer class="pb-4 pt-10 lg:pt-14">
      <h1>{{ title }}</h1>
      <p v-if="intro" class="mt-4 max-w-prose text-lg text-muted">
        {{ intro }}
      </p>
      <slot />
    </UContainer>
  </div>
</template>
