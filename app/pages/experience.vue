<script setup lang="ts">
import { howIWork, spokenLanguages } from "~~/data/experience";

const { t } = useI18n();
const text = useText();
usePageSeo("experience");
</script>

<template>
  <div>
    <PageHeader :title="t('experience.title')" :intro="t('experience.intro')" />
    <UContainer class="pb-12 lg:pb-16">
      <section class="mt-8 max-w-prose" aria-labelledby="how-title">
        <h2 id="how-title" class="mb-4">{{ t("experience.howTitle") }}</h2>
        <p
          v-for="(para, i) in howIWork.paragraphs"
          :key="i"
          class="mt-3 text-lg"
        >
          {{ text(para) }}
        </p>
      </section>

      <section class="mt-16" aria-labelledby="roles-title">
        <h2 id="roles-title" class="mb-8">{{ t("experience.rolesTitle") }}</h2>
        <ExperienceTimeline />
      </section>

      <section class="mt-16" aria-labelledby="skills-title">
        <h2 id="skills-title" class="mb-8">
          {{ t("experience.skillsTitle") }}
        </h2>
        <SkillGroups />
      </section>

      <section class="mt-16" aria-labelledby="spoken-title">
        <h2 id="spoken-title" class="mb-6">
          {{ t("experience.spokenTitle") }}
        </h2>
        <ul class="space-y-2" role="list">
          <li v-for="lang in spokenLanguages" :key="lang.id">
            <span class="font-medium text-highlighted">{{
              text(lang.name)
            }}</span
            >: {{ text(lang.level) }}
          </li>
        </ul>
      </section>
    </UContainer>
  </div>
</template>
