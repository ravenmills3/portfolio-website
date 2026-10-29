import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { currentlyLearning, howIWork } from "../../data/experience";
import { ready } from "./helpers";

const notesDir = join(import.meta.dirname, "../../content/notes");

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
  // Petals are a sakura mask coloured by ::before; centres and florets are ::after gradients.
  const paint = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => {
        const before = getComputedStyle(el, "::before");
        return {
          petal: before.backgroundColor,
          mask:
            before.maskImage || before.getPropertyValue("-webkit-mask-image"),
          dots: getComputedStyle(el, "::after").backgroundImage,
        };
      });
  const tiles = [
    await paint("main .wallpaper"),
    await paint(".swatch-cornflower .wallpaper"),
    await paint(".swatch-lilac .wallpaper"),
  ];
  expect(new Set(tiles.map((t) => t.petal)).size).toBe(3);
  expect(new Set(tiles.map((t) => t.dots)).size).toBe(3);
  for (const t of tiles) {
    expect(t.mask).toContain("svg");
    expect(t.dots).toContain("radial-gradient");
  }
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
