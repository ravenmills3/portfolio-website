<script setup lang="ts">
import { skills } from "~~/data/experience";

const text = useText();
</script>

<template>
  <div class="grid gap-8 md:grid-cols-2">
    <section
      v-for="group in skills"
      :key="group.id"
      :aria-labelledby="`skills-${group.id}`"
    >
      <h3 :id="`skills-${group.id}`" class="text-highlighted">
        {{ text(group.title) }}
      </h3>
      <ul class="mt-3 flex flex-wrap gap-2" role="list">
        <li v-for="item in group.items" :key="item">
          <UBadge color="secondary" variant="subtle" size="lg" :label="item" />
        </li>
      </ul>
    </section>
  </div>
</template>
