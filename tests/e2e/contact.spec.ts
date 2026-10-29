import { expect, test } from "@playwright/test";
import { ready } from "./helpers";

test("contact links point to the right places", async ({ page }) => {
  await page.goto("/contact");
  await ready(page);
  const main = page.getByRole("main");
  const mail = main.locator("a[href^='mailto:']");
  await expect(mail).toHaveCount(1);
  await expect(mail).toHaveText("ravenleemills@gmail.com");
  await expect(mail).toHaveAttribute("href", "mailto:ravenleemills@gmail.com");
  expect((await mail.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await expect(main.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/ravenmills3",
  );
  await expect(main.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/raven-lee-mills/",
  );
  await expect(main.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "rel",
    /noopener/,
  );
});

test("copying the email announces the result", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await ready(page);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(
    page.getByText("Email address copied", { exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "ravenleemills@gmail.com",
  );
  await expect(
    page
      .locator('[role="status"], [role="alert"], [aria-live]')
      .filter({ hasText: "Email address copied" })
      .first(),
  ).toBeAttached();
});

test("the résumé prints without site chrome", async ({ page }) => {
  await page.goto("/resume");
  await ready(page);
  await expect(page.getByRole("banner")).toBeVisible();
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("banner")).toBeHidden();
  await expect(page.getByRole("contentinfo")).toBeHidden();
  await expect(
    page.getByRole("heading", { level: 1, name: "Raven-Lee Mills" }),
  ).toBeVisible();
});

test("the résumé shows the real roles and credentials", async ({ page }) => {
  await page.goto("/resume");
  await ready(page);
  for (const text of [
    "Four Eyes Financial",
    "Samawada",
    "Professional Engineers Ontario",
    "University of New Brunswick",
  ]) {
    await expect(page.getByRole("main").getByText(text).first()).toBeVisible();
  }
});
