<script setup lang="ts">
// Pause or play every animation on the site (WCAG 2.2.2). Pressed means animations are on.
const { t } = useI18n();
const { enabled, setEnabled } = useMotionPref();
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    size="lg"
    :icon="enabled ? 'i-lucide-play' : 'i-lucide-pause'"
    :aria-pressed="enabled"
    :aria-label="t('settings.animations')"
    :title="t('settings.animations')"
    @click="setEnabled(!enabled)"
  />
</template>
