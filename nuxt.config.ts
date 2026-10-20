import { readdirSync } from "node:fs";
import { LOCALES, NOTE_BASE, PAGE_PATHS } from "./data/routes";

const isDev = process.env.NODE_ENV === "development";
const noteSlugs = readdirSync("./content/notes", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const allPaths = [...PAGE_PATHS, ...noteSlugs.map((slug) => `${NOTE_BASE}/${slug}`)];

export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/i18n", ...(isDev ? ["@nuxt/a11y"] : [])],
  css: ["~/assets/css/main.css"],
  colorMode: { preference: "system", fallback: "light" },

  fonts: {
    families: [
      {
        name: "Fraunces",
        provider: "google",
        weights: ["400 700"],
        styles: ["normal"],
        subsets: ["latin", "latin-ext", "vietnamese"],
        // Soft terminals and wonky glyphs give petal-like display type.
        // @ts-expect-error passed through to unifont;
        experimental: { variableAxis: { SOFT: ["100"], WONK: ["1"] } },
      },
      {
        name: "Be Vietnam Pro",
        provider: "google",
        weights: [400, 500, 600],
        styles: ["normal"],
        subsets: ["latin", "latin-ext", "vietnamese"],
      },
    ],
  },

  i18n: {
    baseUrl: "https://ravenleemills.dev",
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: LOCALES.map(({ code, language, name }) => ({
      code,
      language,
      name,
      file: `${language}.ts`,
    })),
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
      fallbackLocale: "en",
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en-US" },
      meta: [
        {
          name: "theme-color",
          content: "#fdf7f9",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#241520",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      // Set animation preference before first paint to avoid a flash.
      script: [
        {
          innerHTML: `try{var m=localStorage.getItem('motion');document.documentElement.dataset.motion=m||'system'}catch(e){document.documentElement.dataset.motion='system'}`,
          tagPosition: "head",
        },
      ],
    },
    // Smooth page changes where the browser supports View Transitions.
    pageTransition: false,
  },
  experimental: { viewTransition: true },

  nitro: {
    // Plain static output; stops Cloudflare CI auto-detecting a Worker preset with its own wrangler config.
    preset: "static",
    serverAssets: [{ baseName: "notes", dir: "./content/notes" }],
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        "/sitemap.xml",
        ...LOCALES.flatMap(({ prefix }) =>
          allPaths.map((path) =>
            path === "/" ? prefix || "/" : `${prefix}${path}`,
          ),
        ),
      ],
    },
  },
});
