<script setup lang="ts">
import { currentlyLearning } from "~~/data/experience";

const { t } = useI18n();
const text = useText();
const { month } = useDates();
</script>

<template>
  <ul class="grid gap-4 md:grid-cols-3" role="list">
    <li
      v-for="item in currentlyLearning"
      :key="item.id"
      class="paper swatch-cornflower"
    >
      <div class="wallpaper swatch-strip" aria-hidden="true" />
      <div class="p-5">
        <UBadge
          color="info"
          variant="subtle"
          icon="i-lucide-sprout"
          :label="t('learning.since', { date: month(item.since) })"
        />
        <h3 class="mt-3 text-highlighted">{{ text(item.topic) }}</h3>
        <p class="mt-2 text-muted">{{ text(item.why) }}</p>
      </div>
    </li>
  </ul>
</template>
