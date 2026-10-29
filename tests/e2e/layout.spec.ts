import { expect, test } from "@playwright/test";
import { ready } from "./helpers";

test("phone link targets are at least 44px tall", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  const heights = async (selector: string) =>
    page
      .locator(selector)
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
  await page.goto("/learning/building-this-site");
  await ready(page);
  for (const h of await heights("main a[href$='#notes']"))
    expect(h).toBeGreaterThanOrEqual(44);
  await page.goto("/no-such-page");
  await ready(page);
  const languages = await heights("main li a[hreflang]");
  expect(languages).toHaveLength(3);
  for (const h of languages) expect(h).toBeGreaterThanOrEqual(44);
});

test("the whole note card opens the note", async ({ page }) => {
  await page.goto("/learning");
  await ready(page);
  const card = (await page.locator("article.paper").first().boundingBox())!;
  await page.mouse.click(card.x + card.width - 8, card.y + card.height - 8);
  await expect(page).toHaveURL(/\/learning\/[a-z0-9-]+$/);
});

test("the contact email stays inside the side margins at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/contact");
  await ready(page);
  const right = await page
    .locator("main p a[href^='mailto:']")
    .first()
    .evaluate((a) => Math.max(...[...a.getClientRects()].map((r) => r.right)));
  expect(right).toBeLessThanOrEqual(320 - 16);
});

for (const path of [
  "/",
  "/experience",
  "/resume",
  "/learning/building-this-site",
]) {
  test(`body lines on ${path} stay under 80 characters`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    await ready(page);
    // Characters per rendered line, for every multi-line paragraph and list item.
    const longest = await page.evaluate(() =>
      Math.max(
        0,
        ...[...document.querySelectorAll("main p, main li")].map((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          const lines = new Set(
            [...range.getClientRects()].map((r) => Math.round(r.top)),
          ).size;
          return lines > 1 ? el.textContent!.trim().length / lines : 0;
        }),
      ),
    );
    expect(longest).toBeLessThan(80);
  });
}
