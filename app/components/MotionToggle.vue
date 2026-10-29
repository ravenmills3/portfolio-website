<script setup lang="ts">
// Pause or play every animation on the site (WCAG 2.2.2)
const { t } = useI18n();
// Tooltips only in the desktop layout; the mobile view goes without.
const wide = useWideScreen();
const { enabled, setEnabled } = useMotionPref();
</script>

<template>
  <UTooltip :text="t('settings.animations')" :disabled="!wide">
    <UButton
      color="neutral"
      variant="ghost"
      size="lg"
      square
      :aria-pressed="enabled"
      :aria-label="t('settings.animations')"
      @click="setEnabled(!enabled)"
    >
      <UIcon name="i-lucide-play" class="motion-icon-paused size-5 shrink-0" />
      <UIcon
        name="i-lucide-pause"
        class="motion-icon-running size-5 shrink-0"
      />
    </UButton>
  </UTooltip>
</template>
