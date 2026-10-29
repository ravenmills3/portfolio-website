<script setup lang="ts">
import { LOCALES } from "~~/data/routes";

const { t, locale } = useI18n();
// Tooltips only in the desktop layout; the mobile view goes without.
const wide = useWideScreen();
const switchLocalePath = useSwitchLocalePath();

const items = computed(() =>
  LOCALES.map(({ code, language, name }) => ({
    label: name,
    to: switchLocalePath(code),
    locale: false,
    lang: language,
    hreflang: language,
    icon: code === locale.value ? "i-lucide-check" : undefined,
    "aria-current": code === locale.value ? ("true" as const) : undefined,
  })),
);
</script>

<template>
  <UDropdownMenu :items="items" :modal="false" :content="{ align: 'end' }">
    <UTooltip :text="t('lang.label')" :disabled="!wide">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-languages"
        size="lg"
        :aria-label="t('lang.label')"
      />
    </UTooltip>
  </UDropdownMenu>
</template>
