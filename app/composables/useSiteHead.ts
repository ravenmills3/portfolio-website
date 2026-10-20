// Language, canonical and hreflang tags shared by the app and error pages.
import { LOCALES } from "~~/data/routes";

const untranslated = new Set<string>(
  LOCALES.filter((l) => !l.translated).map((l) => l.language),
);

export function useSiteHead() {
  const { locale } = useI18n();
  const head = useLocaleHead({ dir: true, seo: true });
  const current = computed(() => LOCALES.find((l) => l.code === locale.value));

  useHead(() => ({
    htmlAttrs: { lang: head.value.htmlAttrs?.lang },
    // Only point search engines at translations that are ready.
    link: head.value.link?.filter(
      (link) =>
        !(link.rel === "alternate" && untranslated.has(String(link.hreflang))),
    ),
    meta: [
      ...(head.value.meta ?? []),
      ...(current.value?.translated
        ? []
        : [{ name: "robots", content: "noindex" }]),
    ],
    titleTemplate: (title?: string) => title ?? "Raven-Lee Mills",
  }));
}
