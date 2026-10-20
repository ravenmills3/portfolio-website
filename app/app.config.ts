// Map Nuxt UI's semantic colours to the bloom palettes in palettes.css.
export default defineAppConfig({
  ui: {
    colors: {
      primary: "peony",
      secondary: "lilac",
      success: "hellebore",
      info: "cornflower",
      warning: "marigold",
      error: "poppy",
      neutral: "plum",
    },
    // Pill-shaped controls suit the petals; 44px minimum targets as policy (WCAG 2.5.8).
    button: {
      slots: { base: "rounded-full min-h-11 min-w-11 justify-center" },
    },
    badge: { slots: { base: "rounded-full" } },
  },
});
