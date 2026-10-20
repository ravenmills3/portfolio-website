<script setup lang="ts">
const { t } = useI18n();
const colorMode = useColorMode();

const options = [
  { value: "system", icon: "i-lucide-monitor" },
  { value: "light", icon: "i-lucide-sun" },
  { value: "dark", icon: "i-lucide-moon" },
] as const;

const icon = computed(
  () =>
    options.find((o) => o.value === colorMode.preference)?.icon ??
    "i-lucide-monitor",
);
const items = computed(() =>
  options.map((o) => ({
    label: t(`settings.${o.value}`),
    icon: o.icon,
    type: "checkbox" as const,
    checked: colorMode.preference === o.value,
    onSelect: () => {
      colorMode.preference = o.value;
    },
  })),
);
</script>

<template>
  <UDropdownMenu :items="items" :modal="false" :content="{ align: 'end' }">
    <UButton
      color="neutral"
      variant="ghost"
      size="lg"
      :icon="icon"
      :aria-label="t('settings.theme')"
    />
  </UDropdownMenu>
</template>
