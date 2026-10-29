import { expect, test } from "@playwright/test";
import { NOTE_SLUGS, ROUTES, VIEWPORTS, ready, trackConsole } from "./helpers";

for (const { locale, path } of ROUTES) {
  test(`${path} loads cleanly`, async ({ page }) => {
    const problems = trackConsole(page);
    const response = await page.goto(path);
    await ready(page);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.locator("html").getAttribute("lang")).toBe(
      locale.language,
    );
    expect((await page.title()).length).toBeGreaterThan(5);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{20,}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    // Only translated locales are offered to search engines.
    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(hreflangs).toContain("en-US");
    expect(hreflangs.filter((h) => h === "fr-CA" || h === "vi-VN")).toEqual([]);
    const robots = page.locator('meta[name="robots"]');
    if (locale.translated) await expect(robots).toHaveCount(0);
    else await expect(robots.first()).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://ravenleemills.dev/og-image.png",
    );

    for (const width of VIEWPORTS) {
      await page.setViewportSize({ width, height: 800 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(
        0,
      );
    }
    expect(problems).toEqual([]);
  });
}

test("Learning lists every note and the old Notes page is gone", async ({
  page,
}) => {
  await page.goto("/learning");
  await ready(page);
  const notes = page.locator("#notes");
  for (const slug of NOTE_SLUGS)
    await expect(notes.locator(`a[href="/learning/${slug}"]`)).toHaveCount(1);
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link"),
  ).toHaveCount(4);
  expect((await page.goto("/notes"))?.status()).toBe(404);
});

test("client-side navigation stays on this origin and within the CSP", async ({
  page,
  baseURL,
}) => {
  const problems = trackConsole(page);
  const external: string[] = [];
  page.on("request", (r) => {
    const { origin, protocol } = new URL(r.url());
    if (protocol.startsWith("http") && origin !== new URL(baseURL!).origin)
      external.push(r.url());
  });
  await page.goto("/");
  await ready(page);
  const nav = page.getByRole("navigation", { name: "Main" });
  // Icons drawn after hydration must come from the bundle, not Iconify's API.
  for (const [name, path] of [
    ["Experience", "/experience"],
    ["Learning", "/learning"],
    ["Résumé", "/resume"],
    ["Contact", "/contact"],
  ] as const) {
    await nav.getByRole("link", { name }).click();
    await expect(page).toHaveURL((url) => url.pathname === path);
    await page.waitForLoadState("networkidle");
  }
  await page.getByRole("button", { name: "Animations" }).click();
  await page.getByRole("button", { name: "Change language" }).click();
  await page.getByRole("menuitem", { name: "Français" }).click();
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
  expect(problems).toEqual([]);
});
