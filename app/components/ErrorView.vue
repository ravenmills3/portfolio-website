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
        viewBox="-72 -72 144 144"
        class="size-32 shrink-0 opacity-90"
        aria-hidden="true"
        focusable="false"
      >
        <g v-for="i in 5" :key="i" :transform="`rotate(${(i - 1) * 72 + 20})`">
          <path
            d="M0 0C-24 -16 -24 -48 0 -58C24 -48 24 -16 0 0Z"
            :fill="i % 2 ? 'var(--bloom-petal-deep)' : 'var(--bloom-petal)'"
            :transform="`rotate(${i * 9}) translate(0 -8)`"
          />
        </g>
        <circle r="10" cy="-4" fill="var(--bloom-pollen)" />
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
        <p class="mt-4 max-w-prose text-lg text-muted">
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
        <ul class="mt-2 flex flex-wrap gap-4" role="list">
          <li v-for="l in LOCALES" :key="l.code">
            <a
              :href="l.prefix || '/'"
              :lang="l.language"
              :hreflang="l.language"
              class="underline underline-offset-4"
              >{{ l.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>
