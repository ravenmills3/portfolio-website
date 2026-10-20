// Title, description and social tags for a page, from i18n keys or overrides.
import { profile } from "~~/data/profile";

export function usePageSeo(
  key: string,
  override?: { title?: string; description?: string },
) {
  const { t } = useI18n();
  const title = override?.title ?? t(`seo.${key}.title`);
  const description = override?.description ?? t(`seo.${key}.description`);
  const image = `${profile.domain}/og-image.png`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: t("seo.imageAlt"),
    ogSiteName: profile.name,
    ogType: "website",
    twitterCard: "summary_large_image",
  });
}
