<script setup lang="ts">
import { credentials } from "~~/data/experience";

const { t } = useI18n();
const text = useText();
</script>

<template>
  <ul class="space-y-5" role="list">
    <li
      v-for="c in credentials"
      :key="c.id"
      class="flex flex-wrap items-start justify-between gap-x-6 gap-y-2"
    >
      <div>
        <h3 class="text-highlighted">{{ text(c.name) }}</h3>
        <p class="text-muted">{{ c.issuer }}</p>
      </div>
      <p class="flex items-center gap-2 text-muted">
        <span
          >{{ c.start }} –
          {{ c.end === "present" ? t("common.present") : c.end }}</span
        >
        <UBadge
          v-if="c.end === 'present'"
          color="success"
          variant="subtle"
          icon="i-lucide-badge-check"
          :label="t('credentials.current')"
        />
      </p>
    </li>
  </ul>
</template>
