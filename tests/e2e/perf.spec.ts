import { expect, test } from "@playwright/test";
import { ready } from "./helpers";

test("home page meets LCP and CLS budgets", async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __lcp: number; __cls: number };
    w.__lcp = 0;
    w.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) w.__lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries() as unknown as {
        hadRecentInput: boolean;
        value: number;
      }[])
        if (!e.hadRecentInput) w.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await ready(page);
  await page.waitForTimeout(1000);
  const { lcp, cls } = await page.evaluate(() => ({
    lcp: (window as any).__lcp as number,
    cls: (window as any).__cls as number,
  }));
  expect(lcp, "LCP ms").toBeLessThan(2500);
  expect(cls, "CLS").toBeLessThan(0.1);
});
