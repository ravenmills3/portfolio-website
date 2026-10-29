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

// Running animations whose target sits inside `selector`.
const runningIn = (page: import("@playwright/test").Page, selector: string) =>
  page.evaluate(
    (sel) =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            (a.effect as KeyframeEffect | null)?.target instanceof Element &&
            (a.effect as KeyframeEffect).target!.closest(sel),
        ).length,
    selector,
  );
test("floating blossoms drift, pause off-screen and rest when animations are off", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await ready(page);
  const blossoms = page.locator(".floating-blossoms");
  await expect
    .poll(() => runningIn(page, ".floating-blossoms"))
    .toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(blossoms).toHaveAttribute("data-paused", "");
  await expect.poll(() => runningIn(page, ".floating-blossoms")).toBe(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(blossoms).not.toHaveAttribute("data-paused");

  await page.getByRole("button", { name: "Animations" }).click();
  await expect.poll(() => runningIn(page, ".floating-blossoms")).toBe(0);
  await expect(page.locator(".floating-blossom").first()).toBeVisible();
});

test("OS reduced motion keeps the floating blossoms still", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await ready(page);
  await expect.poll(() => runningIn(page, ".floating-blossoms")).toBe(0);
  await expect(page.locator(".floating-blossom").first()).toBeVisible();
});

for (const width of [320, 768, 1024, 1440]) {
  test(`floating blossoms stay clear of hero text at ${width}px`, async ({
    page,
  }) => {
    // Buds and blooms overlapping but text stays clear.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await ready(page);
    const boxes = (selector: string) =>
      page
        .locator(selector)
        .evaluateAll((els) =>
          els
            .filter((el) => el.getClientRects().length)
            .map((el) => el.getBoundingClientRect().toJSON() as DOMRect),
        );
    const blossoms = await boxes(".floating-blossom");
    const texts = await boxes(".hero-panel :is(h1, p, a)");
    expect(blossoms.length).toBeGreaterThan(0);
    const gap = 12;
    for (const b of blossoms)
      for (const t of texts)
        expect(
          b.right + gap <= t.left ||
            t.right + gap <= b.left ||
            b.bottom + gap <= t.top ||
            t.bottom + gap <= b.top,
          `blossom at ${Math.round(b.left)},${Math.round(b.top)} overlaps text at ${Math.round(t.left)},${Math.round(t.top)}`,
        ).toBe(true);
  });
}

test("every hero blossom is a five-petal sakura", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  const counts = await page
    .locator(".hero-panel svg g[transform^='translate']")
    .evaluateAll((groups) =>
      groups
        .filter((g) => g.querySelector(":scope > g > .petal"))
        .map((g) => g.querySelectorAll(".petal").length),
    );
  expect(counts.length).toBeGreaterThan(0);
  expect(new Set(counts)).toEqual(new Set([5]));
  expect(
    await page.locator(".floating-blossom:visible .bud").count(),
  ).toBeGreaterThan(0);
});

// Before hydration only the inline head script has run; the icon must already match.
for (const [stored, reducedMotion, icon] of [
  [null, "reduce", "pause"],
  [null, "no-preference", "play"],
  ["off", "no-preference", "pause"],
  ["on", "reduce", "play"],
] as const) {
  test(`Animations icon is "${icon}" before hydration (stored ${stored ?? "none"}, OS ${reducedMotion})`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion });
    await context.addInitScript((value) => {
      if (value) localStorage.setItem("motion", value);
    }, stored);
    const page = await context.newPage();
    await page.route("**/_nuxt/**/*.js", (route) => route.abort());
    await page.goto("/");
    const shown = await page
      .locator(".motion-icon-running, .motion-icon-paused")
      .evaluateAll((els) =>
        els
          .filter((el) => getComputedStyle(el).display !== "none")
          .map((el) =>
            el.classList.contains("motion-icon-running") ? "play" : "pause",
          ),
      );
    expect(shown).toEqual([icon]);
    await context.close();
  });
}
