// Locales and page paths shared by Nuxt config, sitemap and tests.
// translated: false keeps a locale noindex and out of the sitemap until a native speaker approves it.
export const LOCALES = [
  {
    code: "en",
    language: "en-US",
    name: "English",
    prefix: "",
    translated: true,
  },
  {
    code: "fr-ca",
    language: "fr-CA",
    name: "Français",
    prefix: "/fr-ca",
    translated: false,
  },
  {
    code: "vi-vn",
    language: "vi-VN",
    name: "Tiếng Việt",
    prefix: "/vi-vn",
    translated: false,
  },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

// Static pages; note pages are discovered from content/notes.
export const PAGE_PATHS = [
  "/",
  "/experience",
  "/learning",
  "/resume",
  "/contact",
] as const;

// Notes are listed on Learning and served beneath it.
export const NOTE_BASE = "/learning";
