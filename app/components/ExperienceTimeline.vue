<script setup lang="ts">
import { roles } from '~~/data/experience'

const text = useText()
const { range } = useDates()

const items = computed(() =>
  roles.map((role) => ({
    value: role.id,
    date: range(role.start, role.end),
    title: text(role.title),
    description: role.company,
    icon: 'i-lucide-flower-2',
    role,
  })),
)
</script>

<template>
  <UTimeline :items="items" :default-value="roles.length" size="lg" color="primary" class="max-w-3xl">
    <template #title="{ item }">
      <h3 class="text-highlighted">{{ item.title }}</h3>
    </template>
    <template #description="{ item }">
      <p class="font-medium text-default">{{ item.role.company }}, {{ item.role.place }}</p>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-muted" role="list">
        <li v-for="(b, i) in item.role.bullets" :key="i">{{ text(b) }}</li>
      </ul>
    </template>
  </UTimeline>
</template>
