import { expect, test } from "@playwright/test";
import { contrast, ready, toRgb } from "./helpers";

const SEMANTIC = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

test("OS dark mode applies with nothing stored, and light can be chosen", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await ready(page);
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "Theme" }).click();
  await page.getByRole("menuitemcheckbox", { name: "Light" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await ready(page);
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("theme and motion classes are set before hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("motion", "off"));
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(page.locator("html")).toHaveClass(/light|dark/);
});

for (const scheme of ["light", "dark"] as const) {
  test(`${scheme} theme: semantic colours are distinct and readable`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    await ready(page);
    const read = (name: string) =>
      page.evaluate(
        (n) =>
          getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
        name,
      );
    const bg = await toRgb(page, await read("--ui-bg"));
    for (const name of SEMANTIC) {
      const value = await read(`--ui-${name}`);
      expect(value, `--ui-${name} resolved`).not.toBe("");
      expect(
        contrast(await toRgb(page, value), bg),
        `${name} on background`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
}

test("each semantic colour differs between light and dark", async ({
  page,
}) => {
  const values: Record<string, string[]> = {};
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    await ready(page);
    for (const name of [...SEMANTIC, "text", "bg", "border"]) {
      const v = await page.evaluate(
        (n) =>
          getComputedStyle(document.documentElement)
            .getPropertyValue(`--ui-${n}`)
            .trim(),
        name,
      );
      (values[name] ??= []).push(v);
    }
  }
  for (const [name, [light, dark]] of Object.entries(values))
    expect(light, `--ui-${name}`).not.toBe(dark);
});

const runningAnimations = (page: import("@playwright/test").Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            (a.effect?.getComputedTiming().activeDuration ?? 0) > 50,
        ).length,
  );

test("animations run by default and stop when switched off", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect.poll(() => runningAnimations(page)).toBeGreaterThan(0);

  const toggle = page.getByRole("button", { name: "Animations" });
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect.poll(() => runningAnimations(page)).toBe(0);

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await ready(page);
  await page.getByRole("button", { name: "Animations" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await page.reload();
  await expect.poll(() => runningAnimations(page)).toBeGreaterThan(0);
});

test("OS reduced motion stops animations without any stored choice", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await ready(page);
  await expect.poll(() => runningAnimations(page)).toBe(0);
  await expect(
    page.getByRole("button", { name: "Animations" }),
  ).toHaveAttribute("aria-pressed", "false");
});

const runningPetals = (page: import("@playwright/test").Page) =>
  page.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            (a.effect as KeyframeEffect | null)?.target instanceof Element &&
            (a.effect as KeyframeEffect).target!.closest(".petal-fall"),
        ).length,
  );

test("petals fall on Home, pause off-screen and hide when animations are off", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await ready(page);
  await expect.poll(() => runningPetals(page)).toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator(".petal-fall")).toHaveAttribute("data-paused", "");
  await expect.poll(() => runningPetals(page)).toBe(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".petal-fall")).not.toHaveAttribute("data-paused");

  await page.getByRole("button", { name: "Animations" }).click();
  await expect(page.locator(".petal-fall")).toBeHidden();
});

test("OS reduced motion hides the petal fall", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await ready(page);
  await expect(page.locator(".petal-fall")).toBeHidden();
});

test("petals stay out of the text column", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await ready(page);
  const fall = await page.locator(".petal-fall").boundingBox();
  const heading = await page.locator("h1").boundingBox();
  expect(fall!.x).toBeGreaterThanOrEqual(heading!.x + heading!.width);
});
