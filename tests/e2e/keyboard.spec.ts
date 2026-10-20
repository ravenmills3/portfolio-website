import { expect, test } from "@playwright/test";
import { ready } from "./helpers";

test("skip link is the first tab stop and works", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("every focused control shows a visible focus indicator", async ({
  page,
}) => {
  await page.goto("/contact");
  await ready(page);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const s = getComputedStyle(el);
      return {
        style: s.outlineStyle,
        width: parseFloat(s.outlineWidth),
        shadow: s.boxShadow,
      };
    });
    expect(
      (outline.style !== "none" && outline.width >= 2) ||
        outline.shadow !== "none",
      `tab stop ${i + 1}`,
    ).toBe(true);
  }
});

test("Escape closes menus and returns focus to the trigger", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  for (const name of ["Change language", "Theme"]) {
    // Open menus hide the rest of the page from role queries, so select by attribute.
    const trigger = page.locator(`button[aria-label="${name}"]`);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  }
});

test("keyboard navigation moves focus to the new page heading", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Experience" })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
});
