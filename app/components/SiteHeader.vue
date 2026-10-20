<script setup lang="ts">
import { profile } from "~~/data/profile";

const { t } = useI18n();
const localePath = useLocalePath();
const open = ref(false);

const items = computed(() =>
  (["experience", "learning", "resume", "contact"] as const).map(
    (key) => ({
      label: t(`nav.${key}`),
      to: localePath(`/${key}`),
      onSelect: () => {
        open.value = false;
      },
    }),
  ),
);
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-default bg-default/90 backdrop-blur"
  >
    <UContainer class="flex h-16 items-center gap-4">
      <NuxtLinkLocale
        to="/"
        class="flex min-h-11 min-w-11 items-center gap-2 rounded-md font-display text-lg font-semibold text-highlighted"
      >
        <BloomMark class="size-8" />
        <span translate="no" class="max-[400px]:sr-only">{{
          profile.name
        }}</span>
        <span class="sr-only">, {{ t("nav.home") }}</span>
      </NuxtLinkLocale>

      <UNavigationMenu
        :items="items"
        :aria-label="t('nav.label')"
        :ui="{ link: 'min-h-11 min-w-11 justify-center' }"
        class="ml-auto hidden md:flex"
      />

      <div class="ml-auto flex items-center gap-1 md:ml-0">
        <LanguageMenu />
        <ThemeMenu />
        <MotionToggle />
        <UButton
          class="md:hidden"
          color="neutral"
          variant="ghost"
          icon="i-lucide-menu"
          size="lg"
          :aria-label="t('nav.openMenu')"
          @click="open = true"
        />
      </div>
    </UContainer>

    <USlideover
      v-model:open="open"
      side="right"
      :title="t('nav.menu')"
      :description="t('nav.label')"
      :ui="{ description: 'sr-only' }"
    >
      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :aria-label="t('nav.label')"
          :ui="{ link: 'min-h-11' }"
        />
      </template>
    </USlideover>
  </header>
</template>
