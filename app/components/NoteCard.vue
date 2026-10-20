<script setup lang="ts">
import { NOTE_BASE } from "~~/data/routes";

defineProps<{
  note: {
    slug: string;
    title: string;
    date: string;
    summary: string;
    fallback: boolean;
  };
}>();

const { t, locale } = useI18n();
const fmt = computed(
  () =>
    new Intl.DateTimeFormat(locale.value === "en" ? "en-US" : locale.value, {
      dateStyle: "long",
    }),
);
</script>

<template>
  <article class="paper swatch-lilac">
    <div class="wallpaper swatch-strip" aria-hidden="true" />
    <div class="p-6">
      <h3 class="text-2xl">
        <NuxtLinkLocale
          :to="`${NOTE_BASE}/${note.slug}`"
          class="text-highlighted underline-offset-4 hover:underline"
          >{{ note.title }}</NuxtLinkLocale
        >
      </h3>
      <p class="mt-1 text-sm text-muted">
        <time :datetime="note.date">{{
          fmt.format(new Date(`${note.date}T12:00:00`))
        }}</time>
      </p>
      <p class="mt-3 max-w-prose">{{ note.summary }}</p>
      <UBadge
        v-if="note.fallback"
        class="mt-3"
        color="neutral"
        variant="outline"
        icon="i-lucide-languages"
        :label="t('notes.englishOnly')"
      />
    </div>
  </article>
</template>
