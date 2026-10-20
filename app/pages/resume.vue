<script setup lang="ts">
import { profile } from "~~/data/profile";
import {
  credentials,
  headline,
  roles,
  skills,
  spokenLanguages,
  summary,
} from "~~/data/experience";

const { t } = useI18n();
const text = useText();
const { range } = useDates();
usePageSeo("resume");
const print = () => window.print();
</script>

<template>
  <div>
    <div
      class="wallpaper no-print h-10 border-b border-default [--tile:40px] sm:h-12 sm:[--tile:48px]"
      aria-hidden="true"
    />
    <UContainer class="py-12 lg:py-16">
      <div
        class="no-print mb-8 flex flex-wrap items-center justify-between gap-3"
      >
        <p class="max-w-prose text-muted">{{ t("resume.hint") }}</p>
        <UButton icon="i-lucide-printer" size="lg" @click="print">{{
          t("resume.print")
        }}</UButton>
      </div>

      <article class="print-plain max-w-3xl">
        <header>
          <h1 class="text-4xl sm:text-5xl">{{ profile.name }}</h1>
          <p class="mt-2 font-display text-xl text-highlighted">
            {{ text(headline) }}
          </p>
          <p class="mt-2 text-muted">
            {{ profile.location }},
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a
            >,
            <a :href="profile.links.LinkedIn"
              >linkedin.com/in/raven-lee-mills</a
            >
          </p>
        </header>

        <section class="mt-8" aria-labelledby="r-summary">
          <h2 id="r-summary" class="text-2xl">{{ t("resume.summary") }}</h2>
          <p class="mt-2">{{ text(summary) }}</p>
        </section>

        <section class="mt-8" aria-labelledby="r-skills">
          <h2 id="r-skills" class="text-2xl">{{ t("resume.skills") }}</h2>
          <dl class="mt-2 space-y-2">
            <div v-for="g in skills" :key="g.id">
              <dt class="font-semibold text-highlighted">
                {{ text(g.title) }}
              </dt>
              <dd>{{ g.items.join(", ") }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-highlighted">
                {{ t("experience.spokenTitle") }}
              </dt>
              <dd>
                {{
                  spokenLanguages
                    .map((l) => `${text(l.name)}: ${text(l.level)}`)
                    .join("; ")
                }}
              </dd>
            </div>
          </dl>
        </section>

        <section class="mt-8" aria-labelledby="r-exp">
          <h2 id="r-exp" class="text-2xl">{{ t("resume.experience") }}</h2>
          <div
            v-for="role in roles"
            :key="role.id"
            class="mt-4 break-inside-avoid"
          >
            <h3 class="text-highlighted">
              {{ text(role.title) }}, {{ role.company }}, {{ role.place }}
            </h3>
            <p class="text-muted">{{ range(role.start, role.end) }}</p>
            <ul class="mt-2 list-disc space-y-1 pl-5" role="list">
              <li v-for="(b, i) in role.bullets" :key="i">{{ text(b) }}</li>
            </ul>
          </div>
        </section>

        <section class="mt-8" aria-labelledby="r-edu">
          <h2 id="r-edu" class="text-2xl">{{ t("resume.education") }}</h2>
          <ul class="mt-2 space-y-1" role="list">
            <li v-for="c in credentials" :key="c.id">
              <strong>{{ text(c.name) }}</strong
              >, {{ c.issuer }}, {{ c.start }} –
              {{ c.end === "present" ? t("common.present") : c.end }}
            </li>
          </ul>
        </section>
      </article>
    </UContainer>
  </div>
</template>
