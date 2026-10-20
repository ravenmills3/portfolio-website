import { LOCALES, NOTE_BASE, PAGE_PATHS } from "~~/data/routes";
import { profile } from "~~/data/profile";
import { buildSitemap } from "#shared/utils/sitemap";

export default defineEventHandler(async (event) => {
  const notes = await listNotes("en");
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return buildSitemap({
    domain: profile.domain,
    locales: LOCALES.filter((l) => l.translated),
    defaultLanguage: "en-US",
    paths: [...PAGE_PATHS, ...notes.map((n) => `${NOTE_BASE}/${n.slug}`)],
  });
});
