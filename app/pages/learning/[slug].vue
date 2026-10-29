<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const slug = String(route.params.slug);
const { data: note } = await useFetch(`/api/notes/${locale.value}/${slug}`, {
  key: `note-${locale.value}-${slug}`,
});

if (note.value)
  usePageSeo("learning", {
    title: note.value.title,
    description: note.value.summary,
  });

const date = computed(() =>
  new Intl.DateTimeFormat(locale.value === "en" ? "en-US" : locale.value, {
    dateStyle: "long",
  }).format(new Date(`${note.value?.date}T12:00:00`)),
);
</script>

<template>
  <ErrorView v-if="!note" :status-code="404" />
  <UContainer v-else class="py-12 lg:py-16">
    <NuxtLinkLocale
      :to="{ path: '/learning', hash: '#notes' }"
      class="inline-flex min-h-11 items-center gap-1 text-muted hover:text-highlighted"
    >
      <UIcon name="i-lucide-arrow-left" aria-hidden="true" />{{
        t("notes.back")
      }}
    </NuxtLinkLocale>
    <article class="mt-6">
      <h1 class="max-w-3xl">{{ note.title }}</h1>
      <p class="mt-3 text-muted">
        <time :datetime="note.date">{{ date }}</time>
      </p>
      <UAlert
        v-if="note.fallback"
        class="mt-6 max-w-(--container-prose)"
        color="info"
        variant="subtle"
        icon="i-lucide-languages"
        :description="t('notes.englishOnlyLong')"
      />
      <div
        class="prose-note mt-8"
        :lang="note.fallback ? 'en' : undefined"
        v-html="note.html"
      />
    </article>
  </UContainer>
</template>
