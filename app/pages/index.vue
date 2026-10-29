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
    <section class="py-8 lg:py-14">
      <UContainer>
        <div
          class="hero-panel relative isolate overflow-hidden px-6 py-10 sm:px-10 lg:flex lg:min-h-[34rem] lg:items-center lg:px-16 lg:py-16"
        >
          <FloatingBlossoms />
          <!-- Phones and tablets: the blossoms fill the band above the text. Desktop: they sit to its right. -->
          <div class="relative z-10 pt-56 md:pt-64 lg:w-[54%] lg:pt-0">
            <h1 translate="no">
              <template v-for="(word, i) in profile.name.split(' ')" :key="i"
                >{{ i ? " " : ""
                }}<span class="whitespace-nowrap">{{ word }}</span></template
              >
            </h1>
            <p class="mt-4 font-display text-2xl text-highlighted sm:text-3xl">
              {{ t("hero.role") }}
            </p>
            <p class="mt-4 max-w-(--container-prose) text-lg text-muted">
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
        </div>
      </UContainer>
    </section>

    <section class="py-12" aria-labelledby="about-title">
      <UContainer>
        <h2 id="about-title">{{ t("home.aboutTitle") }}</h2>
        <p class="mt-4 max-w-(--container-prose) text-lg">
          {{ text(summary) }}
        </p>
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
        <p class="mb-6 mt-3 max-w-(--container-prose) text-muted">{{ t("home.nowIntro") }}</p>
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
