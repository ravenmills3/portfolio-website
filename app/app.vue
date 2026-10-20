<script setup lang="ts">
import { en, fr, vi } from "@nuxt/ui/locale";
import type { LocaleCode } from "~~/data/routes";

const { locale } = useI18n();
const uiLocales = { en, "fr-ca": fr, "vi-vn": vi };
const uiLocale = computed(() => uiLocales[locale.value as LocaleCode]);

useSiteHead();

// Move focus to the page heading after in-app navigation.
const router = useRouter();
router.afterEach((_to, from) => {
  if (!from.name || !import.meta.client) return;
  nextTick(() => {
    const h1 = document.querySelector<HTMLElement>("main h1");
    h1?.setAttribute("tabindex", "-1");
    h1?.focus({ preventScroll: false });
  });
});
</script>

<template>
  <UApp :locale="uiLocale">
    <a href="#main" class="skip-link" @click.prevent="focusMain">{{
      $t("nav.skip")
    }}</a>
    <NuxtRouteAnnouncer />
    <SiteHeader class="no-print" />
    <main id="main" tabindex="-1" class="outline-none">
      <NuxtPage />
    </main>
    <SiteFooter class="no-print" />
  </UApp>
</template>
