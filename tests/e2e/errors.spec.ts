import { expect, test } from "@playwright/test";
import { ready, trackConsole } from "./helpers";

const cases = [
  { path: "/no-such-page", heading: "This page doesn't exist", lang: "en-US" },
  {
    path: "/fr-ca/no-such-page",
    heading: "Cette page n’existe pas",
    lang: "fr-CA",
  },
  {
    path: "/vi-vn/learning/no-such-note",
    heading: "Trang này không tồn tại",
    lang: "vi-VN",
  },
  {
    path: "/learning/no-such-note",
    heading: "This page doesn't exist",
    lang: "en-US",
  },
];

for (const c of cases) {
  test(`${c.path} shows a helpful 404`, async ({ page }) => {
    const problems = trackConsole(page);
    const response = await page.goto(c.path);
    await ready(page);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.heading);
    await expect(page.locator("html")).toHaveAttribute("lang", c.lang);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(
      page.getByRole("main").getByRole("link").first(),
    ).toBeVisible();
    // Only the expected 404 resource error is allowed.
    expect(
      problems.filter((p) => !/404|Failed to load resource/.test(p)),
    ).toEqual([]);
  });
}

test("the 404 page home link works", async ({ page }) => {
  await page.goto("/fr-ca/no-such-page");
  await ready(page);
  await page
    .getByRole("main")
    .getByRole("link", { name: "Aller à la page d’accueil" })
    .click();
  await expect(page).toHaveURL(/\/fr-ca\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Raven-Lee Mills",
  );
});
