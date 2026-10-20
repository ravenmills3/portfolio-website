<script setup lang="ts">
import { profile } from "~~/data/profile";
import { summary } from "~~/data/experience";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const text = useText();
const years = new Date().getFullYear() - profile.careerStartYear;
const { data: notes } = await useFetch(`/api/notes/${locale.value}`, {
  key: `notes-${locale.value}`,
});

usePageSeo("home");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: profile.domain,
        email: profile.email,
        jobTitle: "Full-Stack Developer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ottawa",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        sameAs: Object.values(profile.links),
      }),
    },
  ],
});
</script>

<template>
  <div>
    <section class="py-12 lg:py-24">
      <UContainer class="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 translate="no">{{ profile.name }}</h1>
          <p class="mt-4 font-display text-2xl text-highlighted sm:text-3xl">
            {{ t("hero.role") }}
          </p>
          <p class="mt-4 max-w-prose text-lg text-muted">
            {{ t("hero.tagline", { count: years }) }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <UButton
              size="xl"
              icon="i-lucide-mail"
              :to="`mailto:${profile.email}`"
              >{{ t("hero.email") }}</UButton
            >
            <UButton
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-lucide-sprout"
              :to="localePath('/learning')"
              >{{ t("hero.learning") }}</UButton
            >
          </div>
        </div>
        <div class="relative order-first flex justify-center lg:order-last">
          <PetalFall />
          <HeroBloom class="relative max-w-64 lg:max-w-md" />
        </div>
      </UContainer>
    </section>

    <section class="py-12" aria-labelledby="about-title">
      <UContainer>
        <h2 id="about-title">{{ t("home.aboutTitle") }}</h2>
        <p class="mt-4 max-w-prose text-lg">{{ text(summary) }}</p>
        <UButton
          class="mt-6"
          color="neutral"
          variant="link"
          :to="localePath('/experience')"
          >{{ t("home.seeExperience") }}</UButton
        >
      </UContainer>
    </section>

    <!-- <section class="py-12" aria-labelledby="now-title">
      <UContainer>
        <h2 id="now-title">{{ t("home.nowTitle") }}</h2>
        <p class="mb-6 mt-3 max-w-prose text-muted">{{ t("home.nowIntro") }}</p>
        <LearningNow />
      </UContainer>
    </section> -->

    <section v-if="notes?.length" class="py-12" aria-labelledby="latest-title">
      <UContainer>
        <h2 id="latest-title">{{ t("home.latestTitle") }}</h2>
        <div class="mt-6 max-w-3xl"><NoteCard :note="notes[0]!" /></div>
        <UButton
          class="mt-4"
          color="neutral"
          variant="link"
          :to="localePath({ path: '/learning', hash: '#notes' })"
          >{{ t("home.allNotes") }}</UButton
        >
      </UContainer>
    </section>
  </div>
</template>
