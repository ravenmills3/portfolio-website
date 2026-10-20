<script setup lang="ts">
import { LOCALES } from '~~/data/routes'

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed(() =>
  LOCALES.map(({ code, language, name }) => ({
    label: name,
    to: switchLocalePath(code),
    // Already localized; stop Nuxt UI re-prefixing the unprefixed English path.
    locale: false,
    lang: language,
    hreflang: language,
    icon: code === locale.value ? 'i-lucide-check' : undefined,
    'aria-current': code === locale.value ? ('true' as const) : undefined,
  })),
)
</script>

<template>
  <UDropdownMenu :items="items" :modal="false" :content="{ align: 'end' }">
    <UButton color="neutral" variant="ghost" icon="i-lucide-languages" size="lg" :aria-label="t('lang.label')" />
  </UDropdownMenu>
</template>
