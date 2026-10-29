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

// Icon-only controls: visible buttons and links in the header and footer with no text.
const iconControls = (page: import("@playwright/test").Page) =>
  page
    .locator("header, footer")
    .locator("button:visible, a:visible")
    .filter({ hasNotText: /\S/ });

test("every icon button shows a tooltip in the desktop layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await ready(page);
  const controls = iconControls(page);
  const count = await controls.count();
  expect(count).toBe(6);
  for (let i = 0; i < count; i++) {
    const control = controls.nth(i);
    const name = (await control.getAttribute("aria-label")) ?? "";
    const tooltip = page.getByRole("tooltip");
    await control.hover();
    await expect(tooltip).toBeVisible();
    // The tooltip text is part of the accessible name (WCAG 2.5.3).
    expect(name).toContain((await tooltip.textContent())!.trim());
    // Escape dismisses it without moving the pointer (WCAG 1.4.13).
    await page.keyboard.press("Escape");
    await expect(tooltip).toBeHidden();
    await page.mouse.move(0, 0);
  }
});

test("the mobile layout has no tooltips", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await ready(page);
  const controls = iconControls(page);
  const count = await controls.count();
  expect(count).toBe(7);
  for (let i = 0; i < count; i++) {
    await controls.nth(i).hover();
    await page.waitForTimeout(800);
    await expect(page.getByRole("tooltip")).toHaveCount(0);
  }
});

test("keyboard focus shows a tooltip and the menu still opens", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  const trigger = page.getByRole("button", { name: "Theme" });
  await trigger.focus();
  await expect(page.getByRole("tooltip")).toHaveText("Theme");
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("menuitemcheckbox", { name: "Light" })).toBeVisible();
  await page.keyboard.press("Escape");
});
