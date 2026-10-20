<script setup lang="ts">
import { profile } from "~~/data/profile";

const { t } = useI18n();
const toast = useToast();

async function copy() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast.add({
      title: t("contact.copied"),
      color: "success",
      icon: "i-lucide-check",
    });
  } catch {
    toast.add({
      title: t("contact.copyFailed", { email: profile.email }),
      color: "error",
      icon: "i-lucide-circle-alert",
    });
  }
}
</script>

<template>
  <UButton
    color="neutral"
    variant="outline"
    size="xl"
    icon="i-lucide-copy"
    @click="copy"
    >{{ t("contact.copy") }}</UButton
  >
</template>
