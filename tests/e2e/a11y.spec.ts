import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES, ready } from "./helpers";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function audit(page: import("@playwright/test").Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(TAGS)
    .analyze();
  return violations
    .filter((v) => v.impact === "critical" || v.impact === "serious")
    .map(
      (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`,
    );
}

for (const scheme of ["light", "dark"] as const) {
  for (const { path } of ROUTES) {
    test(`axe ${scheme} ${path}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(path);
      await ready(page);
      expect(await audit(page)).toEqual([]);
    });
  }
}

test("axe with animations off and menus open", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("motion", "off"));
  await page.goto("/");
  await ready(page);
  await page.getByRole("button", { name: "Theme" }).click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "Dark" }),
  ).toBeVisible();
  expect(await audit(page)).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Change language" }).click();
  await expect(page.getByRole("menuitem", { name: "Français" })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await ready(page);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await audit(page)).toEqual([]);
});
