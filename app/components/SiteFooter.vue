<script setup lang="ts">
import { profile } from "~~/data/profile";

const { t } = useI18n();
const year = new Date().getFullYear();
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
  <footer class="mt-24 border-t border-default py-10">
    <UContainer
      class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="font-display text-lg text-highlighted">{{ profile.name }}</p>
        <p class="text-sm text-muted">{{ profile.location }}</p>
        <p class="mt-2 text-sm text-muted">
          {{ t("footer.rights", { year }) }}
        </p>
      </div>
      <ul class="flex items-center gap-2" role="list">
        <li>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-mail"
            size="lg"
            :to="`mailto:${profile.email}`"
            :aria-label="t('contact.emailMe')"
          />
        </li>
        <li v-for="s in social" :key="s.name">
          <UButton
            color="neutral"
            variant="ghost"
            :icon="s.icon"
            size="lg"
            :to="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${s.name} ${t('common.newTab')}`"
          />
        </li>
      </ul>
    </UContainer>
  </footer>
</template>
