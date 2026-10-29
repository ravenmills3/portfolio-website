import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { NOTE_SLUGS, ROUTES, ready } from "./helpers";

const KEY_LEAK =
  /\b(nav|home|hero|settings|lang|footer|common|experience|learning|credentials|notes|contact|resume|error|seo)\.[a-z][a-zA-Z.]+\b/;

test("no message key leaks into any page", async ({ page }) => {
  for (const { path } of ROUTES) {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    expect(text.match(KEY_LEAK)?.[0], path).toBeUndefined();
  }
});

test("language menu switches to the same page in another language", async ({
  page,
}) => {
  await page.goto("/experience");
  await ready(page);
  await page.getByRole("button", { name: "Change language" }).click();
  await page.getByRole("menuitem", { name: "Français" }).click();
  await expect(page).toHaveURL(/\/fr-ca\/experience$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Expérience",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "fr-CA");

  await page.getByRole("button", { name: "Changer de langue" }).click();
  await page.getByRole("menuitem", { name: "Tiếng Việt" }).click();
  await expect(page).toHaveURL(/\/vi-vn\/experience$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kinh nghiệm",
  );
});

for (const { from, button } of [
  { from: "/fr-ca/experience", button: "Changer de langue" },
  { from: "/vi-vn/experience", button: "Đổi ngôn ngữ" },
]) {
  test(`language menu switches ${from} back to English`, async ({ page }) => {
    await page.goto(from);
    await ready(page);
    await page.getByRole("button", { name: button }).click();
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page).toHaveURL((url) => url.pathname === "/experience");
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Experience",
    );
    await page.goto("/");
    await ready(page);
    await expect(page).toHaveURL((url) => url.pathname === "/");
  });
}

test("the chosen language is remembered on the next visit to /", async ({
  page,
}) => {
  await page.goto("/learning");
  await ready(page);
  await page.getByRole("button", { name: "Change language" }).click();
  await page.getByRole("menuitem", { name: "Français" }).click();
  await expect(page).toHaveURL(/\/fr-ca\/learning$/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr-ca\/?$/);
});

test("a French browser is sent from / to the French site once", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "fr-CA" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr-ca\/?$/);
  await context.close();
});

test("Vietnamese diacritics render with the loaded font", async ({ page }) => {
  await page.goto("/vi-vn/");
  await ready(page);
  const loaded = await page.evaluate(() =>
    [...document.fonts]
      .filter((f) => f.status === "loaded")
      .map((f) => `${f.family}|${f.unicodeRange}`),
  );
  expect(
    loaded.some((f) => f.includes("Be Vietnam Pro") && f.includes("1EA0")),
  ).toBe(true);
  const family = await page.evaluate(
    () => getComputedStyle(document.querySelector("h1")!).fontFamily,
  );
  expect(family).toContain("Fraunces");
  expect(
    await page.evaluate(() =>
      document.fonts.check("600 24px Fraunces", "Tiếng Việt ệ"),
    ),
  ).toBe(true);
});

test("notes without a translation say so", async ({ page }) => {
  const untranslated = NOTE_SLUGS.find(
    (s) =>
      !existsSync(
        join(import.meta.dirname, "../../content/notes", s, "vi-VN.md"),
      ),
  );
  test.skip(!untranslated, "Every note has a Vietnamese translation.");
  await page.goto(`/vi-vn/learning/${untranslated}`);
  await ready(page);
  await expect(
    page.getByText("Ghi chú này chỉ có bằng tiếng Anh"),
  ).toBeVisible();
});

test("the sitemap lists translated locales only", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("<loc>https://ravenleemills.dev/experience</loc>");
  expect(xml).not.toContain("/fr-ca");
  expect(xml).not.toContain("/vi-vn");
});
