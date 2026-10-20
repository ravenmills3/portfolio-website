// Run with pnpm test:content: fails while sample or placeholder content remains.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { currentlyLearning, howIWork } from "../../data/experience";
import { ready } from "./helpers";

const notesDir = join(import.meta.dirname, "../../content/notes");

test("currently learning has no placeholders", () => {
  expect(
    currentlyLearning.filter((item) => item.placeholder).map((i) => i.id),
  ).toEqual([]);
});

test("How I work has been approved", () => {
  expect(howIWork.placeholder).toBe(false);
});

test("no sample notes remain", () => {
  const samples = readdirSync(notesDir, {
    recursive: true,
    encoding: "utf8",
  }).filter(
    (f) =>
      f.endsWith(".md") &&
      /^placeholder:\s*true$/m.test(readFileSync(join(notesDir, f), "utf8")),
  );
  expect(samples).toEqual([]);
});

test("header controls are at least 44 by 44", async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await ready(page);
    const boxes = await page
      .locator("header")
      .first()
      .locator("a:visible, button:visible")
      .evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return {
            name: el.textContent?.trim() || el.getAttribute("aria-label"),
            w: r.width,
            h: r.height,
          };
        }),
      );
    for (const box of boxes) {
      expect(box.h, `${box.name} height at ${width}`).toBeGreaterThanOrEqual(
        44,
      );
      expect(box.w, `${box.name} width at ${width}`).toBeGreaterThanOrEqual(44);
    }
  }
});

test("each card swatch paints the shared tile in its own colours", async ({
  page,
}) => {
  await page.goto("/learning");
  await ready(page);
  const paint = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundImage);
  const band = await paint("main .wallpaper");
  const learning = await paint(".swatch-cornflower .wallpaper");
  const notes = await paint(".swatch-lilac .wallpaper");
  expect(new Set([band, learning, notes]).size).toBe(3);
  expect(learning).toContain("radial-gradient");
});

test("text never sits directly on the wallpaper", async ({ page }) => {
  await page.goto("/experience");
  await ready(page);
  const texts = await page
    .locator(".wallpaper")
    .evaluateAll((els) =>
      els.map((el) => el.textContent?.trim()).filter(Boolean),
    );
  expect(texts).toEqual([]);
});
