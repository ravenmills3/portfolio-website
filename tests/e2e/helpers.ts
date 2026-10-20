// Shared route list and small page helpers for the e2e suite.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "@playwright/test";
import { LOCALES, NOTE_BASE, PAGE_PATHS } from "../../data/routes";

export const NOTE_SLUGS = readdirSync(join(import.meta.dirname, "../../content/notes"), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

export const ROUTES = LOCALES.flatMap((locale) =>
  [...PAGE_PATHS, ...NOTE_SLUGS.map((s) => `${NOTE_BASE}/${s}`)].map((path) => ({
    locale,
    path: path === "/" ? locale.prefix || "/" : `${locale.prefix}${path}`,
  })),
);

export const VIEWPORTS = [320, 375, 768, 1024, 1440];

// Collect console errors and warnings while a test runs.
export function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type()))
      problems.push(`${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  return problems;
}

// Wait for hydration so clicks reach Vue handlers.
export async function ready(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

// Convert any CSS colour to [r, g, b] through a canvas.
export function toRgb(page: Page, css: string) {
  return page.evaluate((value) => {
    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
  }, css);
}

const lin = (c: number) =>
  (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const luminance = ([r, g, b]: number[]) =>
  0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);

export function contrast(a: number[], b: number[]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}
