<script setup lang="ts">
const { t, locale } = useI18n();
const { data: notes } = await useFetch(`/api/notes/${locale.value}`, {
  key: `notes-${locale.value}`,
});
usePageSeo("learning");
</script>

<template>
  <div>
    <PageHeader :title="t('learning.title')" :intro="t('learning.intro')" />
    <UContainer class="pb-12 lg:pb-16">
      <!-- <section class="mt-12" aria-labelledby="now-title">
        <h2 id="now-title" class="mb-6">{{ t("home.nowTitle") }}</h2>
        <LearningNow />
      </section> -->

      <section id="notes" class="mt-16" aria-labelledby="notes-title">
        <h2 id="notes-title">{{ t("learning.notesTitle") }}</h2>
        <p class="mt-3 max-w-(--container-prose) text-muted">
          {{ t("learning.notesIntro") }}
        </p>
        <div v-if="notes?.length" class="mt-6 grid max-w-3xl gap-5">
          <NoteCard v-for="note in notes" :key="note.slug" :note="note" />
        </div>
        <p v-else class="mt-6 text-muted">{{ t("notes.empty") }}</p>
      </section>

      <section class="mt-16 max-w-3xl" aria-labelledby="cred-title">
        <h2 id="cred-title" class="mb-6">
          {{ t("learning.credentialsTitle") }}
        </h2>
        <CredentialList />
      </section>
    </UContainer>
  </div>
</template>
