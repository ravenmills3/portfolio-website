<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
useSiteHead();
</script>

<template>
  <UApp>
    <a href="#main" class="skip-link" @click.prevent="focusMain">{{
      $t("nav.skip")
    }}</a>
    <SiteHeader />
    <main id="main" tabindex="-1" class="outline-none">
      <ErrorView :status-code="error.statusCode ?? 500" />
    </main>
    <SiteFooter />
  </UApp>
</template>
