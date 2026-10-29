<script setup lang="ts">
import { LOCALES } from "~~/data/routes";

const props = defineProps<{ statusCode: number }>();
const { t } = useI18n();
const localePath = useLocalePath();

// 404 is a missing page, other 4xx a bad request, the rest - server.
const kind = computed(() =>
  props.statusCode === 404
    ? "notFound"
    : props.statusCode < 500
      ? "badRequest"
      : "server",
);
useHead({ title: () => t(`error.${kind.value}.title`) });
useSeoMeta({ robots: "noindex" });
</script>

<template>
  <UContainer class="py-16 lg:py-24">
    <div class="flex flex-col items-start gap-8 md:flex-row md:items-center">
      <svg
        viewBox="-60 -60 120 120"
        class="size-32 shrink-0 opacity-90"
        aria-hidden="true"
        focusable="false"
      >
        <Bloom :x="0" :y="0" :turn="20" />
      </svg>
      <div>
        <p class="text-lg text-error">
          <UIcon
            name="i-lucide-circle-alert"
            class="mr-1 align-text-bottom"
            aria-hidden="true"
          />{{ t("error.code", { code: statusCode }) }}
        </p>
        <h1 class="mt-2">{{ t(`error.${kind}.title`) }}</h1>
        <p class="mt-4 max-w-(--container-prose) text-lg text-muted">
          {{ t(`error.${kind}.body`) }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton size="xl" icon="i-lucide-house" :to="localePath('/')">{{
            t("error.home")
          }}</UButton>
          <UButton
            size="xl"
            color="neutral"
            variant="outline"
            icon="i-lucide-sprout"
            :to="localePath('/learning')"
            >{{ t("hero.learning") }}</UButton
          >
        </div>
        <p class="mt-8 text-muted">{{ t("error.languages") }}</p>
        <ul class="mt-1 flex flex-wrap gap-x-4" role="list">
          <li v-for="l in LOCALES" :key="l.code">
            <a
              :href="l.prefix || '/'"
              :lang="l.language"
              :hreflang="l.language"
              class="inline-flex min-h-11 items-center underline underline-offset-4"
              >{{ l.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>
