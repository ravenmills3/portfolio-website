<script setup lang="ts">
import { profile } from "~~/data/profile";

const { t } = useI18n();
usePageSeo("contact");
const social = [
  { name: "GitHub", href: profile.links.GitHub, icon: "i-simple-icons-github" },
  {
    name: "LinkedIn",
    href: profile.links.LinkedIn,
    icon: "i-simple-icons-linkedin",
  },
];
</script>

<template>
  <div>
    <PageHeader :title="t('contact.title')" :intro="t('contact.intro')" />
    <UContainer class="pb-12 lg:pb-16">
      <p class="mt-8 font-display text-2xl text-highlighted sm:text-3xl">
        <a
          :href="`mailto:${profile.email}`"
          class="underline decoration-[var(--bloom-petal-deep)] decoration-2 underline-offset-8 hover:decoration-[var(--ui-primary)]"
          >{{ profile.email }}</a
        >
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <UButton
          size="xl"
          icon="i-lucide-mail"
          :to="`mailto:${profile.email}`"
          >{{ t("contact.emailMe") }}</UButton
        >
        <CopyEmail />
      </div>

      <section class="mt-14" aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title">{{ t("contact.elsewhere") }}</h2>
        <ul class="mt-5 flex flex-wrap gap-3" role="list">
          <li v-for="s in social" :key="s.name">
            <UButton
              color="neutral"
              variant="outline"
              size="lg"
              :icon="s.icon"
              :to="s.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ s.name }}<span class="sr-only"> {{ t("common.newTab") }}</span>
            </UButton>
          </li>
        </ul>
        <p class="mt-6 text-muted">
          {{ t("contact.where", { place: profile.location }) }}
        </p>
      </section>
    </UContainer>
  </div>
</template>
