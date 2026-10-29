<script setup lang="ts">
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
      <p v-if="intro" class="mt-4 max-w-(--container-prose) text-lg text-muted">
        {{ intro }}
      </p>
      <slot />
    </UContainer>
  </div>
</template>
